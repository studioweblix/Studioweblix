import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

function getProductUrl(product: Product): string {
  return `/produkte/${product.slug ?? product.id}`
}

function getFirstImage(product: Product): string | null {
  const images = product.product_images
  if (Array.isArray(images) && images.length > 0) {
    const sorted = [...images].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    return sorted[0]?.url ?? null
  }
  return null
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const imageUrl = getFirstImage(product)
  const price = product.price
  const hasPrice = price !== undefined && price !== null && price !== ''

  return (
    <Link
      href={getProductUrl(product)}
        className={`group block rounded-2xl overflow-hidden border border-white/10 bg-[#243d38]/50 hover:border-[#5a6d6b]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#5a6d6b]/5 ${
        featured ? 'md:flex md:flex-row' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden bg-muted ${
          featured ? 'aspect-[4/3] md:aspect-square md:w-1/2' : 'aspect-[4/3]'
        } bg-[#243d38]`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 640px) 100vw, 33vw'}
            quality={100}
            priority={featured}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#5a6d6b]/20 to-[#5a6d6b]/5">
            <span className="text-6xl font-bold text-[#5a6d6b]/30">
              {product.name.charAt(0)}
            </span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#5a6d6b] text-white text-xs font-medium">
            Empfohlen
          </span>
        )}
      </div>
      <div
        className={`p-6 flex flex-col justify-center ${
          featured ? 'md:w-1/2' : ''
        }`}
      >
        <h3 className="font-semibold text-lg text-white group-hover:text-[#5a6d6b] transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-white/60 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>
        )}
        {hasPrice && (
          <p className="mt-3 font-medium text-[#5a6d6b]">
            {typeof price === 'number' ? `${price.toFixed(2)} €` : String(price)}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-2 text-sm text-[#5a6d6b] group-hover:gap-3 transition-all">
          Mehr erfahren
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  )
}
