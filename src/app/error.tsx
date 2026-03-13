'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-[#2C4B44]">
      <h1 className="text-xl font-semibold text-white mb-2">Etwas ist schiefgelaufen</h1>
      <p className="text-white/60 text-center mb-6 max-w-md">
        Bitte versuchen Sie die Seite neu zu laden oder zur Startseite zurückzukehren.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-colors"
        >
          Erneut versuchen
        </button>
        <Link
          href="/"
          className="px-6 py-2 rounded-xl bg-[#5a6d6b] text-white hover:bg-[#4A5D5B] transition-colors"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  )
}
