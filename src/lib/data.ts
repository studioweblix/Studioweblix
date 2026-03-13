import { createAdminClient } from '@/lib/supabase/admin'

function getTenantId() {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  if (!tenantId) {
    throw new Error('NEXT_PUBLIC_TENANT_ID is not set')
  }
  return tenantId
}

export async function getProducts() {
  const supabase = createAdminClient()
  const tenantId = getTenantId()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*)
    `)
    .eq('tenant_id', tenantId)

  if (error) throw error
  return data ?? []
}

export async function getProductById(id: string) {
  const supabase = createAdminClient()
  const tenantId = getTenantId()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*)
    `)
    .eq('id', id)
    .eq('tenant_id', tenantId)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function getCategories() {
  const supabase = createAdminClient()
  const tenantId = getTenantId()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('tenant_id', tenantId)

  if (error) throw error
  return data ?? []
}

export async function getFeaturedProducts() {
  const supabase = createAdminClient()
  const tenantId = getTenantId()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*)
    `)
    .eq('tenant_id', tenantId)
    .eq('featured', true)

  if (error) throw error
  return data ?? []
}

export async function getPageContent(slug: string) {
  const supabase = createAdminClient()
  const tenantId = getTenantId()

  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function getSettings() {
  const supabase = createAdminClient()
  const tenantId = getTenantId()

  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('tenant_id', tenantId)
    .maybeSingle()

  if (error) throw error
  return data
}
