import {
  getProducts,
  getProductById,
  getCategories,
  getFeaturedProducts,
  getPageContent,
  getSettings,
} from './data'
import type { Product, Category, PageContent, Settings } from './types'

const DATA_FETCH_TIMEOUT_MS = 4000

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ])
}

export async function safeGetProducts(): Promise<Product[]> {
  try {
    return (await getProducts()) as Product[]
  } catch {
    return []
  }
}

export async function safeGetProductById(id: string): Promise<Product | null> {
  try {
    return (await getProductById(id)) as Product | null
  } catch {
    return null
  }
}

export async function safeGetCategories(): Promise<Category[]> {
  try {
    return (await getCategories()) as Category[]
  } catch {
    return []
  }
}

export async function safeGetFeaturedProducts(): Promise<Product[]> {
  try {
    return (await getFeaturedProducts()) as Product[]
  } catch {
    return []
  }
}

export async function safeGetPageContent(slug: string): Promise<PageContent | null> {
  try {
    return (await withTimeout(
      getPageContent(slug) as Promise<PageContent | null>,
      DATA_FETCH_TIMEOUT_MS,
      null
    )) as PageContent | null
  } catch {
    return null
  }
}

export async function safeGetSettings(): Promise<Settings | null> {
  try {
    return (await withTimeout(
      getSettings() as Promise<Settings | null>,
      DATA_FETCH_TIMEOUT_MS,
      null
    )) as Settings | null
  } catch {
    return null
  }
}
