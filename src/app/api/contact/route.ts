import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const FROM = 'StudioWeblix Kontakt <formular@studioweblix.com>'

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c)
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = (formData.get('name') as string)?.trim() ?? ''
    const email = (formData.get('email') as string)?.trim() ?? ''
    const phone = (formData.get('phone') as string)?.trim() ?? ''
    const subject = (formData.get('subject') as string)?.trim() || 'Website-Anfrage'
    const message = (formData.get('message') as string)?.trim() ?? ''

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, E-Mail und Nachricht sind erforderlich.' },
        { status: 400 }
      )
    }

    const to = process.env.NOTIFICATION_EMAIL
    const apiKey = process.env.RESEND_API_KEY

    if (apiKey && to) {
      const resend = new Resend(apiKey)
      const html = `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2D4A3E;">Neue Website-Anfrage</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>E-Mail:</strong></td><td style="padding: 8px 0;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Telefon:</strong></td><td style="padding: 8px 0;">${escapeHtml(phone) || '–'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Betreff:</strong></td><td style="padding: 8px 0;">${escapeHtml(subject)}</td></tr>
          </table>
          <h3 style="color: #2D4A3E; margin-top: 16px;">Nachricht</h3>
          <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${escapeHtml(message)}</p>
        </div>
      `
      const { error } = await resend.emails.send({
        from: FROM,
        to: [to],
        subject: `${subject}: ${name}`,
        html,
      })
      if (error) {
        console.error('[api/contact] Resend error:', error)
        return NextResponse.json(
          { error: 'E-Mail konnte nicht gesendet werden.' },
          { status: 500 }
        )
      }
    } else {
      console.log('Contact form (no email sent – RESEND_API_KEY or NOTIFICATION_EMAIL missing):', { name, email, phone, subject, message })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[api/contact]', err)
    return NextResponse.json(
      { error: 'Interner Fehler beim Senden.' },
      { status: 500 }
    )
  }
}
