'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function CheckoutFeedback() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'success' | 'canceled' | null>(null)

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setStatus('success')
      window.history.replaceState({}, '', '/preis')
    } else if (searchParams.get('canceled') === 'true') {
      setStatus('canceled')
      window.history.replaceState({}, '', '/preis')
    }
  }, [searchParams])

  useEffect(() => {
    if (!status) return
    const t = setTimeout(() => setStatus(null), 5000)
    return () => clearTimeout(t)
  }, [status])

  if (!status) return null

  return (
    <div
      className={`mb-8 rounded-xl border px-4 py-3 ${
        status === 'success'
          ? 'bg-[#5a6d6b]/10 border-[#5a6d6b]/30 text-[#5a6d6b]'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
      }`}
    >
      {status === 'success' ? (
        <p>Vielen Dank! Die Zahlung wurde erfolgreich abgeschlossen.</p>
      ) : (
        <p>Die Zahlung wurde abgebrochen. Sie können jederzeit erneut zahlen.</p>
      )}
    </div>
  )
}
