import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { safeGetProducts } from '@/lib/safe-data'
import type { Product } from '@/lib/types'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

async function findProduct(slug: string): Promise<Product | null> {
  const products = await safeGetProducts()
  return products.find((p) => p.slug === slug || p.id === slug) ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await findProduct(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description ?? undefined,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await findProduct(slug)

  if (!product) notFound()

  const images = Array.isArray(product.product_images)
    ? [...product.product_images].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
      )
    : []
  const firstImage = images[0]?.url

  return (
    <article className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/produkte"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent text-sm mb-8 transition-colors"
        >
          ← Zurück zu Produkten
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            {firstImage ? (
              <Image
                src={firstImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-8xl font-bold text-accent/20">
                {product.name.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            {product.price !== undefined &&
              product.price !== null &&
              product.price !== '' && (
                <p className="text-2xl text-accent font-semibold mb-6">
                  {typeof product.price === 'number'
                    ? `${product.price.toFixed(2)} €`
                    : String(product.price)}
                </p>
              )}
            {product.description && (
              <div className="prose prose-invert prose-accent max-w-none">
                <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}
            <Link
              href="/kontakt"
              className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
            >
              Anfrage senden
            </Link>
          </div>
        </div>

        {images.length > 1 && (
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.slice(1, 5).map((img, i) => (
              <div
                key={img.id ?? i}
                className="relative aspect-square rounded-lg overflow-hidden bg-muted"
              >
                <Image
                  src={img.url}
                  alt={img.alt ?? `${product.name} Bild ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
