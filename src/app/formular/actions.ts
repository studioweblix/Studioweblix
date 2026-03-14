'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { sendFormNotification } from '@/lib/email'

const FORM_STORAGE_BUCKET = 'form-uploads'

function randomId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const randomValues = new Uint8Array(12)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(randomValues)
  }
  for (let i = 0; i < 12; i++) {
    result += chars[randomValues[i]! % chars.length]
  }
  return result
}

type MediaFile = { name: string; data: string }

function getBase64(data: string): string {
  return data.includes(',') ? data.split(',')[1]! : data
}

/** Server Action: Formular absenden – Upload Bilder, speichern in DB, E-Mail-Benachrichtigung. Tabelle: id (UUID), data (JSONB), submitted_at (TIMESTAMPTZ). */
export async function submitForm(
  formData: Record<string, unknown>
): Promise<{ success: true; id: string } | { success: false; error: string }> {
  const supabase = createAdminClient()
  const storagePathId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${randomId()}`

  const cleanPayload: Record<string, unknown> = {}
  for (const key of Object.keys(formData)) {
    const v = formData[key]
    if (key === 'logo' || key === 'fotos') continue
    cleanPayload[key] = v
  }

  const logo = formData.logo as MediaFile | null | undefined
  if (logo?.data) {
    try {
      const base64 = getBase64(logo.data as string)
      const ext = (logo.name.split('.').pop() || 'png').toLowerCase().replace('jpeg', 'jpg')
      const path = `${storagePathId}/logo/logo.${ext}`
      const buf = Buffer.from(base64, 'base64')
      const { error: uploadError } = await supabase.storage
        .from(FORM_STORAGE_BUCKET)
        .upload(path, buf, { contentType: `image/${ext}`, upsert: true })
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from(FORM_STORAGE_BUCKET).getPublicUrl(path)
        cleanPayload.logoUrl = urlData.publicUrl
      }
    } catch (e) {
      console.error('[submitForm] Logo upload failed:', e)
    }
  }

  const fotos = formData.fotos as MediaFile[] | null | undefined
  if (Array.isArray(fotos) && fotos.length > 0) {
    const urls: string[] = []
    for (let i = 0; i < fotos.length; i++) {
      const f = fotos[i]!
      if (!f?.data) continue
      try {
        const base64 = getBase64(f.data)
        const ext = (f.name.split('.').pop() || 'jpg').toLowerCase().replace('jpeg', 'jpg')
        const path = `${storagePathId}/photos/${i}.${ext}`
        const buf = Buffer.from(base64, 'base64')
        const { error: uploadError } = await supabase.storage
          .from(FORM_STORAGE_BUCKET)
          .upload(path, buf, { contentType: `image/${ext}`, upsert: true })
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from(FORM_STORAGE_BUCKET).getPublicUrl(path)
          urls.push(urlData.publicUrl)
        }
      } catch (e) {
        console.error(`[submitForm] Photo ${i} upload failed:`, e)
      }
    }
    cleanPayload.photoUrls = urls
  }

  const { data: row, error: insertError } = await supabase
    .from('form_submissions')
    .insert({
      data: cleanPayload,
      submitted_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (insertError) return { success: false, error: insertError.message }

  const submissionId = row?.id != null ? String(row.id) : ''
  if (!submissionId) return { success: false, error: 'Submission konnte nicht erstellt werden.' }

  const companyName = String(formData.companyName ?? '')
  const contactName = String(formData.contactName ?? formData.companyName ?? '')
  const branch = String(formData.companyType ?? formData.branch ?? '')
  const phone = String(formData.phone ?? '')
  const email = String(formData.email ?? '')
  const packageChoice = String(formData.selectedPackage ?? formData.packageChoice ?? '')
  const goLiveDate = String(formData.goLiveTermin ?? formData.goLiveDate ?? '')

  await sendFormNotification({
    submissionId,
    companyName,
    contactName,
    branch,
    phone,
    email,
    packageChoice,
    goLiveDate,
  })

  return { success: true, id: submissionId }
}

export async function submitFormData(
  payload: Record<string, unknown>
): Promise<{ success: true } | { success: false; error: string }> {
  const supabase = createAdminClient()
  const submissionId = `${Date.now()}-${randomId()}`

  const cleanPayload: Record<string, unknown> = {}
  for (const key of Object.keys(payload)) {
    const v = payload[key]
    if (key === 'logo' || key === 'fotos') continue
    cleanPayload[key] = v
  }

  const logo = payload.logo as MediaFile | null | undefined
  if (logo?.data) {
    try {
      const base64 = logo.data.includes(',') ? (logo.data as string).split(',')[1] : logo.data
      const ext = logo.name.split('.').pop() || 'png'
      const path = `${submissionId}/logo.${ext}`
      const buf = Buffer.from(base64!, 'base64')
      const { error: uploadError } = await supabase.storage
        .from(FORM_STORAGE_BUCKET)
        .upload(path, buf, { contentType: `image/${ext}`, upsert: true })
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from(FORM_STORAGE_BUCKET).getPublicUrl(path)
        cleanPayload.logoUrl = urlData.publicUrl
      }
    } catch {
      // Logo-Upload überspringen
    }
  }

  const fotos = payload.fotos as MediaFile[] | null | undefined
  if (Array.isArray(fotos) && fotos.length > 0) {
    const urls: string[] = []
    for (let i = 0; i < fotos.length; i++) {
      const f = fotos[i]!
      if (!f?.data) continue
      try {
        const base64 = f.data.includes(',') ? f.data.split(',')[1] : f.data
        const ext = f.name.split('.').pop() || 'jpg'
        const path = `${submissionId}/foto-${i}.${ext}`
        const buf = Buffer.from(base64, 'base64')
        const { error: uploadError } = await supabase.storage
          .from(FORM_STORAGE_BUCKET)
          .upload(path, buf, { contentType: `image/${ext}`, upsert: true })
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from(FORM_STORAGE_BUCKET).getPublicUrl(path)
          urls.push(urlData.publicUrl)
        }
      } catch {
        // Einzelnes Foto überspringen
      }
    }
    cleanPayload.fotoUrls = urls
  }

  const { error: insertError } = await supabase.from('form_submissions').insert({
    data: cleanPayload,
    submitted_at: new Date().toISOString(),
  })

  if (insertError) return { success: false, error: insertError.message }
  return { success: true }
}
