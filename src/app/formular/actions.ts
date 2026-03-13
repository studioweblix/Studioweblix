'use server'

import { createAdminClient } from '@/lib/supabase/admin'

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
    token: submissionId, // Spalte "token" = Einreichungs-ID (kein Form-Token mehr)
    payload: cleanPayload,
    created_at: new Date().toISOString(),
  })

  if (insertError) return { success: false, error: insertError.message }
  return { success: true }
}
