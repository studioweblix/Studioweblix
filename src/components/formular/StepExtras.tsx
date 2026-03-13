'use client'

const SONDERFUNKTIONEN = [
  { id: 'terminbuchung', label: 'Online-Terminbuchung' },
  { id: 'kontaktformular', label: 'Kontaktformular' },
  { id: 'google-maps', label: 'Google Maps' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'whatsapp', label: 'WhatsApp-Button' },
  { id: 'cookie-banner', label: 'Cookie-Banner (DSGVO)' },
  { id: 'mehrsprachigkeit', label: 'Mehrsprachigkeit' },
  { id: 'live-chat', label: 'Live-Chat' },
  { id: 'animationen', label: 'Animationen / Effekte' },
]

const ERFAHREN_VON_OPTIONS = [
  { value: '', label: 'Bitte wählen …' },
  { value: 'google', label: 'Google' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'empfehlung', label: 'Empfehlung' },
  { value: 'sonstiges', label: 'Sonstiges' },
]

export type StepExtrasData = {
  sonderfunktionen: string[]
  sonstigeWünsche: string
  goLiveTermin: string
  erfahrenVon: string
}

export type SummaryEntry = { label: string; value: string }

const inputBase =
  'w-full px-4 py-3 rounded-xl border border-white/15 bg-[#243d38] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:border-[#4A7C6B] transition-colors'
const labelBase = 'block text-sm font-medium text-white/80 mb-2'

type Props = {
  data: StepExtrasData
  onChange: (updates: Partial<StepExtrasData>) => void
  summaryEntries?: SummaryEntry[]
  onSubmit: () => void
  isSubmitting: boolean
  submitError?: string
}

function toggleArray(arr: string[], id: string): string[] {
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]
}

export function StepExtras({
  data,
  onChange,
  summaryEntries = [],
  onSubmit,
  isSubmitting,
  submitError,
}: Props) {
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold text-white">Besondere Wünsche & Absenden</h2>

      {/* 1. Sonderfunktionen */}
      <section>
        <h3 className={labelBase}>Gewünschte Sonderfunktionen</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {SONDERFUNKTIONEN.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-[#243d38]/60 border border-white/10 cursor-pointer hover:border-white/20"
            >
              <input
                type="checkbox"
                checked={data.sonderfunktionen.includes(opt.id)}
                onChange={() => onChange({ sonderfunktionen: toggleArray(data.sonderfunktionen, opt.id) })}
                className="rounded text-[#4A7C6B] focus:ring-[#4A7C6B]"
              />
              <span className="text-white/90 text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 2. Sonstige Wünsche */}
      <section>
        <label htmlFor="sonstigeWünsche" className={labelBase}>Sonstige Wünsche</label>
        <textarea
          id="sonstigeWünsche"
          value={data.sonstigeWünsche}
          onChange={(e) => onChange({ sonstigeWünsche: e.target.value })}
          rows={5}
          className={inputBase + ' resize-y'}
          placeholder="Haben Sie weitere Wünsche, Anmerkungen oder spezielle Anforderungen?"
        />
      </section>

      {/* 3. Go-Live Termin */}
      <section>
        <label htmlFor="goLiveTermin" className={labelBase}>Gewünschter Go-Live Termin</label>
        <input
          id="goLiveTermin"
          type="date"
          value={data.goLiveTermin}
          onChange={(e) => onChange({ goLiveTermin: e.target.value })}
          className={inputBase}
        />
      </section>

      {/* 4. Wie erfahren */}
      <section>
        <label htmlFor="erfahrenVon" className={labelBase}>Wie haben Sie von uns erfahren?</label>
        <select
          id="erfahrenVon"
          value={data.erfahrenVon}
          onChange={(e) => onChange({ erfahrenVon: e.target.value })}
          className={inputBase + ' cursor-pointer'}
        >
          {ERFAHREN_VON_OPTIONS.map((opt) => (
            <option key={opt.value || 'empty'} value={opt.value} className="bg-[#243d38] text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </section>

      {/* 5. Zusammenfassung */}
      <section>
        <h3 className="text-base font-medium text-white/90 mb-3">Zusammenfassung</h3>
        <div className="rounded-xl border border-white/15 bg-[#243d38]/80 p-4 space-y-2 max-h-64 overflow-y-auto">
          {summaryEntries.length > 0 ? (
            summaryEntries.map((entry, i) => (
              <div key={i} className="flex flex-wrap gap-x-2 text-sm">
                <span className="text-white/55 shrink-0">{entry.label}:</span>
                <span className="text-white/90 break-words">{entry.value || '–'}</span>
              </div>
            ))
          ) : (
            <p className="text-white/50 text-sm">Übersicht wird aus Ihren Angaben erzeugt.</p>
          )}
        </div>
      </section>

      {/* 6. Absenden – Parent ruft submitFormData(payload) auf, lädt Bilder hoch, zeigt Erfolg */}
      {submitError && (
        <p className="text-red-400 text-sm rounded-lg bg-red-400/10 border border-red-400/30 px-4 py-3">
          {submitError}
        </p>
      )}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-[#4A7C6B] text-white font-semibold text-lg hover:bg-[#3d6b5c] focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:ring-offset-2 focus:ring-offset-[#2C4B44] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? 'Wird gesendet …' : (
          <>
            Formular absenden
            <span aria-hidden>✓</span>
          </>
        )}
      </button>
    </div>
  )
}
