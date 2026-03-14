import { Resend } from 'resend'

export type FormNotificationParams = {
  submissionId: string
  companyName: string
  contactName: string
  branch: string
  phone: string
  email: string
  packageChoice: string
  goLiveDate: string
}

const FROM = 'StudioWeblix Formular <formular@studioweblix.com>'

function buildHtml(params: FormNotificationParams): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.studioweblix.com'
  const viewUrl = `${baseUrl}/formular/ansicht/${params.submissionId}`

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; font-family: system-ui, -apple-system, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 24px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color: #2D4A3E; color: #ffffff; font-size: 20px; font-weight: 700; padding: 20px 24px;">
              StudioWeblix
            </td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <p style="margin: 0 0 16px; color: #333; font-size: 15px; line-height: 1.5;"><strong>Neues Kundenformular</strong></p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 14px; color: #444; line-height: 1.6;">
                <tr><td style="padding: 4px 0;"><strong>Firma:</strong></td><td style="padding: 4px 0;">${escapeHtml(params.companyName) || '–'}</td></tr>
                <tr><td style="padding: 4px 0;"><strong>Name:</strong></td><td style="padding: 4px 0;">${escapeHtml(params.contactName) || '–'}</td></tr>
                <tr><td style="padding: 4px 0;"><strong>Branche:</strong></td><td style="padding: 4px 0;">${escapeHtml(params.branch) || '–'}</td></tr>
                <tr><td style="padding: 4px 0;"><strong>Telefon:</strong></td><td style="padding: 4px 0;">${escapeHtml(params.phone) || '–'}</td></tr>
                <tr><td style="padding: 4px 0;"><strong>E-Mail:</strong></td><td style="padding: 4px 0;">${escapeHtml(params.email) || '–'}</td></tr>
                <tr><td style="padding: 4px 0;"><strong>Paket:</strong></td><td style="padding: 4px 0;">${escapeHtml(params.packageChoice) || '–'}</td></tr>
                <tr><td style="padding: 4px 0;"><strong>Go-Live Wunsch:</strong></td><td style="padding: 4px 0;">${escapeHtml(params.goLiveDate) || '–'}</td></tr>
              </table>
              <p style="margin: 24px 0 12px;"><a href="${escapeHtml(viewUrl)}" style="display: inline-block; background-color: #4A7C6B; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">Formular ansehen →</a></p>
              <p style="margin: 0; font-size: 13px; color: #666;">${escapeHtml(viewUrl)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 24px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
              StudioWeblix – Webentwicklung & Design
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim()
}

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

export async function sendFormNotification(params: FormNotificationParams): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFICATION_EMAIL

  if (!apiKey) {
    console.log('[email] RESEND_API_KEY not set – skipping send. Params:', params)
    return { success: true }
  }

  if (!to) {
    console.warn('[email] NOTIFICATION_EMAIL not set')
    return { success: false, error: 'NOTIFICATION_EMAIL not set' }
  }

  const subject = `Neues Kundenformular: ${params.companyName || '–'} – ${params.contactName || '–'}`
  const html = buildHtml(params)

  try {
    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [to],
      subject,
      html,
    })
    if (error) {
      console.error('[email] Resend error:', error)
      return { success: false, error: error.message }
    }
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[email] Send failed:', message)
    return { success: false, error: message }
  }
}
