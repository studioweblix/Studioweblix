import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, E-Mail und Nachricht sind erforderlich.' },
        { status: 400 }
      )
    }

    // TODO: Integrate with your email service (e.g. Resend, SendGrid) or Supabase
    // For now we just validate and return success
    console.log('Contact form submission:', { name, email, phone, subject, message })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Interner Fehler beim Senden.' },
      { status: 500 }
    )
  }
}
