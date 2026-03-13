// Flexible types for Supabase records - structure depends on your schema

export interface ProductImage {
  id?: string
  product_id?: string
  url: string
  alt?: string
  sort_order?: number
}

export interface Product {
  id: string
  name: string
  description?: string | null
  price?: number | string | null
  slug?: string | null
  featured?: boolean
  category_id?: string | null
  tenant_id?: string
  product_images?: ProductImage[]
  [key: string]: unknown
}

export interface Category {
  id: string
  name: string
  slug?: string | null
  tenant_id?: string
  [key: string]: unknown
}

export interface PageContent {
  id?: string
  slug: string
  title?: string | null
  content?: string | null
  hero_title?: string | null
  hero_subtitle?: string | null
  meta_description?: string | null
  sections?: Record<string, unknown>[] | null
  [key: string]: unknown
}

export interface Settings {
  id?: string
  tenant_id?: string
  store_name?: string | null
  logo_url?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  opening_hours?: string | null
  map_embed?: string | null
  [key: string]: unknown
}
