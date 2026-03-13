'use client'

import { useState } from 'react'

export function CTASection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const formData = new FormData(form)
    const phone = formData.get('phone') as string
    formData.set('message', `Telefon: ${phone || '–'}\n\nUnverbindliche Anfrage von der Startseite.`)
    formData.set('subject', 'Website-Anfrage')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" className="relative py-16 md:py-24 overflow-hidden">
      {/* Dunkler, leicht verschwommener Hintergrund */}
      <div className="absolute inset-0 bg-[#2C4B44]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(94, 234, 212, 0.15) 0%, transparent 70%)',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Wir Kontaktieren Sie
        </h2>
        <p className="text-white/70 mb-2 max-w-2xl mx-auto">
          Lassen auch Sie Ihre Website professionell erstellen.
        </p>
        <p className="text-white/60 text-sm md:text-base mb-10 max-w-2xl mx-auto">
          Wir kontaktieren Sie und buchen ein Meeting per E-Mail bei Interesse.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
            <input
              type="text"
              name="name"
              required
              placeholder="Ihr Name"
              className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-[#243d38] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#5a6d6b] focus:border-transparent"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefonnummer"
              className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-[#243d38] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#5a6d6b] focus:border-transparent"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Ihre E-Mail"
              className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-[#243d38] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#5a6d6b] focus:border-transparent"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="shrink-0 px-8 py-3 rounded-lg bg-[#5a6d6b] text-white font-semibold uppercase tracking-wide hover:bg-[#4A5D5B] focus:outline-none focus:ring-2 focus:ring-[#5a6d6b] focus:ring-offset-2 focus:ring-offset-[#2C4B44] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Wird gesendet...' : 'Senden'}
            </button>
          </div>
          {status === 'success' && (
            <p className="text-[#5a6d6b] text-sm">
              Vielen Dank! Wir melden uns in Kürze bei Ihnen.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm">
              Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
