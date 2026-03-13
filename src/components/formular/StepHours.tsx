'use client'

const DAY_IDS = ['mo', 'di', 'mi', 'do', 'fr', 'sa', 'so'] as const
const DAY_LABELS: Record<(typeof DAY_IDS)[number], string> = {
  mo: 'Montag',
  di: 'Dienstag',
  mi: 'Mittwoch',
  do: 'Donnerstag',
  fr: 'Freitag',
  sa: 'Samstag',
  so: 'Sonntag',
}

const TIME_OPTIONS: string[] = []
for (let h = 6; h <= 23; h++) {
  TIME_OPTIONS.push(`${String(h).padStart(2, '0')}:00`)
  if (h < 23) TIME_OPTIONS.push(`${String(h).padStart(2, '0')}:30`)
}
TIME_OPTIONS.push('23:30')

export type DayHours = {
  id: (typeof DAY_IDS)[number]
  open: boolean
  from: string
  to: string
}

export type StepHoursData = {
  days: DayHours[]
  besonderheiten: string
}

export function createDefaultDays(): DayHours[] {
  return DAY_IDS.map((id) => ({
    id,
    open: id !== 'sa' && id !== 'so',
    from: '09:00',
    to: '18:00',
  }))
}

const inputBase =
  'w-full px-3 py-2 rounded-lg border border-white/15 bg-[#243d38] text-white focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:border-[#4A7C6B] transition-colors text-sm'
const labelBase = 'block text-sm font-medium text-white/80 mb-2'

type Props = {
  data: StepHoursData
  onChange: (updates: Partial<StepHoursData>) => void
}

export function StepHours({ data, onChange }: Props) {
  const days = data.days.length === 7 ? data.days : createDefaultDays()

  const updateDay = (index: number, updates: Partial<DayHours>) => {
    const next = [...days]
    next[index] = { ...next[index]!, ...updates }
    onChange({ days: next })
  }

  const applyMoToWerktage = () => {
    const mo = days[0]
    if (!mo) return
    const next = days.map((d, i) => {
      if (i >= 1 && i <= 4) return { ...d, open: mo.open, from: mo.from, to: mo.to }
      return d
    })
    onChange({ days: next })
  }

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold text-white">Öffnungszeiten</h2>

      <div>
        <button
          type="button"
          onClick={applyMoToWerktage}
          className="mb-4 px-4 py-2 rounded-lg border border-[#4A7C6B] text-[#4A7C6B] text-sm font-medium hover:bg-[#4A7C6B]/15 transition-colors"
        >
          Gleiche Zeiten für alle Werktage übernehmen
        </button>

        <div className="rounded-xl border border-white/15 bg-[#243d38]/60 overflow-hidden">
          {DAY_IDS.map((id, index) => {
            const day = days[index] ?? { id, open: true, from: '09:00', to: '18:00' }
            const isOpen = day.open
            return (
              <div
                key={id}
                className={`grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 md:gap-4 p-4 border-b border-white/10 last:border-b-0 ${!isOpen ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center">
                  <span className="font-bold text-white">{DAY_LABELS[id]}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer shrink-0">
                    <span className="text-white/70 text-sm">Geschlossen</span>
                    <span
                      role="switch"
                      aria-checked={isOpen}
                      tabIndex={0}
                      onClick={() => updateDay(index, { open: !isOpen })}
                      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); updateDay(index, { open: !isOpen }) } }}
                      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:ring-offset-2 focus:ring-offset-[#243d38] ${isOpen ? 'border-[#4A7C6B] bg-[#4A7C6B]' : 'border-white/30 bg-white/10'}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform ${
                          isOpen ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </span>
                    <span className="text-white/70 text-sm">Geöffnet</span>
                  </label>
                  {isOpen && (
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <label htmlFor={`hours-from-${id}`} className="text-white/60 text-xs shrink-0">von</label>
                        <select
                          id={`hours-from-${id}`}
                          value={day.from}
                          onChange={(e) => updateDay(index, { from: e.target.value })}
                          className={inputBase + ' w-24'}
                        >
                          {TIME_OPTIONS.map((t) => (
                            <option key={t} value={t} className="bg-[#243d38] text-white">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <label htmlFor={`hours-to-${id}`} className="text-white/60 text-xs shrink-0">bis</label>
                        <select
                          id={`hours-to-${id}`}
                          value={day.to}
                          onChange={(e) => updateDay(index, { to: e.target.value })}
                          className={inputBase + ' w-24'}
                        >
                          {TIME_OPTIONS.map((t) => (
                            <option key={t} value={t} className="bg-[#243d38] text-white">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <label htmlFor="besonderheiten" className={labelBase}>Besonderheiten</label>
        <input
          id="besonderheiten"
          type="text"
          value={data.besonderheiten}
          onChange={(e) => onChange({ besonderheiten: e.target.value })}
          className={inputBase.replace('text-sm', '') + ' py-3'}
          placeholder="z.B. Mittagspause von 12-13 Uhr, im Winter andere Zeiten"
        />
      </div>
    </div>
  )
}
