'use client'

import { useState } from 'react'
import type { ProductId } from '@/lib/stripe-products'

interface ZahlButtonProps {
  productId: ProductId
  className?: string
  children?: React.ReactNode
  fullWidth?: boolean
}

export function ZahlButton({
  productId,
  className = '',
  children = 'Zahlen',
  fullWidth = false,
}: ZahlButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })

      const contentType = res.headers.get('content-type')
      const data = contentType?.includes('application/json')
        ? await res.json()
        : { error: 'Serverfehler' }

      if (!res.ok) {
        const msg = data?.error || 'Fehler beim Erstellen der Zahlung'
        throw new Error(msg)
      }

      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error('Keine Zahlungs-URL erhalten')
      }
    } catch (err) {
      console.error('ZahlButton Error:', err)
      alert(
        err instanceof Error ? err.message : 'Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es später erneut.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold transition-colors hover:border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed ${className} ${fullWidth ? 'w-full' : ''}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Wird geladen…
        </span>
      ) : (
        children
      )}
    </button>
  )
}
