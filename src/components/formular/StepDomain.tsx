'use client'

export type StepDomainData = {
  domainWunsch: string
  domainBereits: 'ja' | 'nein'
  domainAnbieter: string
  emailBedarf: 'ja' | 'nein' | 'vorhanden'
}

const inputBase =
  'w-full px-4 py-3 rounded-xl border border-white/15 bg-[#243d38] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:border-[#4A7C6B] transition-colors'
const labelBase = 'block text-sm font-medium text-white/80 mb-2'

type Props = {
  data: StepDomainData
  onChange: (updates: Partial<StepDomainData>) => void
}

export function StepDomain({ data, onChange }: Props) {
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold text-white">Domain & Technisches</h2>

      <div>
        <label htmlFor="domainWunsch" className={labelBase}>Gewünschte Domain</label>
        <input
          id="domainWunsch"
          type="text"
          value={data.domainWunsch}
          onChange={(e) => onChange({ domainWunsch: e.target.value })}
          className={inputBase}
          placeholder="z.B. www.mein-unternehmen.de"
        />
      </div>

      <fieldset>
        <legend className={labelBase}>Haben Sie bereits eine Domain?</legend>
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="domainBereits"
              value="ja"
              checked={data.domainBereits === 'ja'}
              onChange={() => onChange({ domainBereits: 'ja' })}
              className="mt-1.5 text-[#4A7C6B] focus:ring-[#4A7C6B]"
            />
            <span className="text-white/90 text-sm">Ja, bei folgendem Anbieter:</span>
          </label>
          {data.domainBereits === 'ja' && (
            <div className="ml-6">
              <input
                type="text"
                value={data.domainAnbieter}
                onChange={(e) => onChange({ domainAnbieter: e.target.value })}
                className={inputBase}
                placeholder="z.B. Strato, IONOS, GoDaddy"
              />
            </div>
          )}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="domainBereits"
              value="nein"
              checked={data.domainBereits === 'nein'}
              onChange={() => onChange({ domainBereits: 'nein' })}
              className="text-[#4A7C6B] focus:ring-[#4A7C6B]"
            />
            <span className="text-white/90 text-sm">Nein, Studio Weblix soll eine registrieren</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelBase}>
          Benötigen Sie geschäftliche E-Mail-Adressen? (z.B. info@firma.de)
        </legend>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="emailBedarf"
              value="ja"
              checked={data.emailBedarf === 'ja'}
              onChange={() => onChange({ emailBedarf: 'ja' })}
              className="text-[#4A7C6B] focus:ring-[#4A7C6B]"
            />
            <span className="text-white/90 text-sm">Ja</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="emailBedarf"
              value="nein"
              checked={data.emailBedarf === 'nein'}
              onChange={() => onChange({ emailBedarf: 'nein' })}
              className="text-[#4A7C6B] focus:ring-[#4A7C6B]"
            />
            <span className="text-white/90 text-sm">Nein</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="emailBedarf"
              value="vorhanden"
              checked={data.emailBedarf === 'vorhanden'}
              onChange={() => onChange({ emailBedarf: 'vorhanden' })}
              className="text-[#4A7C6B] focus:ring-[#4A7C6B]"
            />
            <span className="text-white/90 text-sm">Bereits vorhanden</span>
          </label>
        </div>
      </fieldset>
    </div>
  )
}
