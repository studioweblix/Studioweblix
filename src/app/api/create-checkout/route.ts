import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not configured')
  return new Stripe(key)
}

const PRODUCTS = {
  monthly: {
    name: 'Monatliches Paket',
    description: 'Professionelle Website – flexibel kündbar, Hosting & Domain inklusive',
    amount: 9900, // 99€ in Cent
    recurring: true,
  },
  once: {
    name: 'Einmalzahlung',
    description: 'Professionelle Website – alles inklusive, keine laufenden Kosten',
    amount: 69900,
    recurring: false,
  },
  ecommerce: {
    name: 'E-COM STORE',
    description: 'Professioneller Online-Shop für Ihr E-Commerce-Geschäft',
    amount: 29900,
    recurring: true,
  },
  logo: {
    name: 'Logo erstellen',
    description: 'Professionelles Logo für Ihr Unternehmen – individuell und markenprägend',
    amount: 14900,
    recurring: false,
  },
} as const

export type ProductId = keyof typeof PRODUCTS

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000'
  const protocol = request.headers.get('x-forwarded-proto') || 'http'
  return `${protocol}://${host}`
}

export async function POST(request: NextRequest) {
  try {
    const { productId } = (await request.json()) as { productId: ProductId }

    if (!productId || !(productId in PRODUCTS)) {
      return NextResponse.json(
        { error: 'Ungültiges Produkt' },
        { status: 400 }
      )
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          error:
            'Stripe ist nicht konfiguriert. Fügen Sie STRIPE_SECRET_KEY in die Datei .env.local ein. Den Schlüssel erhalten Sie unter https://dashboard.stripe.com/apikeys',
        },
        { status: 503 }
      )
    }

    const stripe = getStripe()
    const product = PRODUCTS[productId]
    const baseUrl = getBaseUrl(request)

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = product.recurring
      ? {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.amount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        }
      : {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.amount,
          },
          quantity: 1,
        }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: product.recurring ? 'subscription' : 'payment',
      line_items: [lineItem],
      success_url: `${baseUrl}/preis?success=true`,
      cancel_url: `${baseUrl}/preis?canceled=true`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe Checkout Error:', err)
    const message = err instanceof Error ? err.message : 'Zahlung konnte nicht gestartet werden'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
