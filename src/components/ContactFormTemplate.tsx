'use client'

import { useState } from 'react'

export function ContactFormTemplate() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const formData = new FormData(form)
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

  const inputClass =
    'w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/30 transition-colors'
  const labelClass = 'block text-white/70 text-xs font-medium uppercase tracking-wider mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            className={inputClass}
            placeholder="NAME"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            E-Mail
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            className={inputClass}
            placeholder="EMAIL"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Telefon
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            className={inputClass}
            placeholder="TELEFON"
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className={labelClass}>
            Betreff
          </label>
          <input
            type="text"
            id="contact-subject"
            name="subject"
            className={inputClass}
            placeholder="BETREFF"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Nachricht
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="NACHRICHT"
        />
      </div>
      {status === 'success' && (
        <p className="text-green-400 text-sm">Vielen Dank! Ihre Nachricht wurde gesendet.</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-sm">
          Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
        </p>
      )}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-8 py-4 bg-white/10 border border-white/20 text-white text-sm font-medium uppercase tracking-wider hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Wird gesendet...' : 'Senden'}
        </button>
      </div>
    </form>
  )
}
