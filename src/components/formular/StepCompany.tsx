'use client'

export type StepCompanyData = {
  firmenname: string
  ansprechpartnerVorname: string
  ansprechpartnerNachname: string
  branche: string
  strasseHausnummer: string
  plz: string
  ort: string
  telefon: string
  email: string
  websiteUrl: string
}

const BRANCHE_OPTIONS = [
  { value: '', label: 'Bitte wählen …' },
  { value: 'friseur', label: 'Friseur' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'cafe', label: 'Café' },
  { value: 'handwerker', label: 'Handwerker' },
  { value: 'arztpraxis', label: 'Arztpraxis' },
  { value: 'autowerkstatt', label: 'Autowerkstatt' },
  { value: 'einzelhandel', label: 'Einzelhandel' },
  { value: 'sonstiges', label: 'Sonstiges' },
]

const inputBase =
  'w-full px-4 py-3 rounded-xl border border-white/15 bg-[#243d38] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:border-[#4A7C6B] transition-colors'
const labelBase = 'block text-sm font-medium text-white/80 mb-2'

type Props = {
  data: StepCompanyData
  onChange: (updates: Partial<StepCompanyData>) => void
  errors?: Partial<Record<keyof StepCompanyData, string>>
}

export function StepCompany({ data, onChange, errors = {} }: Props) {
  const handleChange = (field: keyof StepCompanyData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange({ [field]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Unternehmensdaten</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Firmenname (Pflicht) - links */}
        <div>
          <label htmlFor="firmenname" className={labelBase}>
            Firmenname <span className="text-red-400">*</span>
          </label>
          <input
            id="firmenname"
            type="text"
            value={data.firmenname}
            onChange={handleChange('firmenname')}
            required
            className={inputBase}
            placeholder="z. B. Muster GmbH"
          />
          {errors.firmenname && <p className="text-red-400 text-xs mt-1">{errors.firmenname}</p>}
        </div>

        {/* Ansprechpartner Vor- & Nachname (Pflicht) - rechts, zwei Zeilen */}
        <div className="space-y-4">
          <div>
            <label htmlFor="ansprechpartnerVorname" className={labelBase}>
              Ansprechpartner Vorname <span className="text-red-400">*</span>
            </label>
            <input
              id="ansprechpartnerVorname"
              type="text"
              value={data.ansprechpartnerVorname}
              onChange={handleChange('ansprechpartnerVorname')}
              required
              className={inputBase}
              placeholder="Vorname"
            />
            {errors.ansprechpartnerVorname && <p className="text-red-400 text-xs mt-1">{errors.ansprechpartnerVorname}</p>}
          </div>
          <div>
            <label htmlFor="ansprechpartnerNachname" className={labelBase}>
              Ansprechpartner Nachname <span className="text-red-400">*</span>
            </label>
            <input
              id="ansprechpartnerNachname"
              type="text"
              value={data.ansprechpartnerNachname}
              onChange={handleChange('ansprechpartnerNachname')}
              required
              className={inputBase}
              placeholder="Nachname"
            />
            {errors.ansprechpartnerNachname && <p className="text-red-400 text-xs mt-1">{errors.ansprechpartnerNachname}</p>}
          </div>
        </div>

        {/* Branche (Dropdown) - volle Breite oder eine Spalte */}
        <div className="md:col-span-2">
          <label htmlFor="branche" className={labelBase}>
            Branche <span className="text-red-400">*</span>
          </label>
          <select
            id="branche"
            value={data.branche}
            onChange={handleChange('branche')}
            required
            className={inputBase + ' cursor-pointer'}
          >
            {BRANCHE_OPTIONS.map((opt) => (
              <option key={opt.value || 'empty'} value={opt.value} className="bg-[#243d38] text-white">
                {opt.label}
              </option>
            ))}
          </select>
          {errors.branche && <p className="text-red-400 text-xs mt-1">{errors.branche}</p>}
        </div>

        {/* Straße & Hausnummer - links */}
        <div>
          <label htmlFor="strasseHausnummer" className={labelBase}>Straße & Hausnummer</label>
          <input
            id="strasseHausnummer"
            type="text"
            value={data.strasseHausnummer}
            onChange={handleChange('strasseHausnummer')}
            className={inputBase}
            placeholder="z. B. Musterstraße 12"
          />
        </div>

        {/* PLZ & Ort - rechts, zwei Felder nebeneinander auf Desktop */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="plz" className={labelBase}>PLZ</label>
            <input
              id="plz"
              type="text"
              value={data.plz}
              onChange={handleChange('plz')}
              className={inputBase}
              placeholder="PLZ"
            />
          </div>
          <div>
            <label htmlFor="ort" className={labelBase}>Ort</label>
            <input
              id="ort"
              type="text"
              value={data.ort}
              onChange={handleChange('ort')}
              className={inputBase}
              placeholder="Ort"
            />
          </div>
        </div>

        {/* Telefon (Pflicht) - links */}
        <div>
          <label htmlFor="telefon" className={labelBase}>
            Telefon <span className="text-red-400">*</span>
          </label>
          <input
            id="telefon"
            type="tel"
            value={data.telefon}
            onChange={handleChange('telefon')}
            required
            className={inputBase}
            placeholder="z. B. 0123 456789"
          />
          {errors.telefon && <p className="text-red-400 text-xs mt-1">{errors.telefon}</p>}
        </div>

        {/* E-Mail (Pflicht, mit Validierung) - rechts */}
        <div>
          <label htmlFor="email" className={labelBase}>
            E-Mail <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={handleChange('email')}
            required
            className={inputBase}
            placeholder="name@firma.de"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Bestehende Website URL (optional) - volle Breite */}
        <div className="md:col-span-2">
          <label htmlFor="websiteUrl" className={labelBase}>Bestehende Website URL (optional)</label>
          <input
            id="websiteUrl"
            type="url"
            value={data.websiteUrl}
            onChange={handleChange('websiteUrl')}
            className={inputBase}
            placeholder="https://www.beispiel.de"
          />
        </div>
      </div>
    </div>
  )
}
