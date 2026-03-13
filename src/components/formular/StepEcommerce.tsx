'use client'

export type StepEcommerceData = {
  produktAnzahl: string
  produktKategorien: string
  zahlungsarten: string[]
  versandoptionen: string[]
  versandKostenlosAb: string
}

const ZAHLUNGSARTEN = [
  { id: 'kreditkarte', label: 'Kreditkarte' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'klarna', label: 'Klarna' },
  { id: 'ueberweisung', label: 'Überweisung' },
  { id: 'bar', label: 'Barzahlung bei Abholung' },
  { id: 'apple-google', label: 'Apple Pay / Google Pay' },
]

const VERSANDOPTIONEN = [
  { id: 'standard', label: 'Standardversand' },
  { id: 'express', label: 'Expressversand' },
  { id: 'abholung', label: 'Abholung im Laden' },
  { id: 'digital', label: 'Nur digital / kein Versand' },
]

const inputBase =
  'w-full px-4 py-3 rounded-xl border border-white/15 bg-[#243d38] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:border-[#4A7C6B] transition-colors'
const labelBase = 'block text-sm font-medium text-white/80 mb-2'

type Props = {
  data: StepEcommerceData
  onChange: (updates: Partial<StepEcommerceData>) => void
  onSkip?: () => void
}

function toggleArray(arr: string[], id: string): string[] {
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]
}

export function StepEcommerce({ data, onChange, onSkip }: Props) {
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold text-white">E-Commerce</h2>

      {/* Hinweis + Überspringen */}
      <div className="rounded-xl border border-[#4A7C6B]/50 bg-[#4A7C6B]/10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-white/90 text-sm">
          Dieser Schritt ist nur relevant, wenn Sie das E-Commerce-Paket gewählt haben. Ansonsten können Sie diesen Schritt überspringen.
        </p>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="shrink-0 px-4 py-2.5 rounded-lg border border-[#4A7C6B] text-[#4A7C6B] text-sm font-medium hover:bg-[#4A7C6B]/15 transition-colors flex items-center gap-2"
          >
            Schritt überspringen
            <span aria-hidden>→</span>
          </button>
        )}
      </div>

      {/* Formular-Inhalt */}
      <div className="space-y-6">
        <div>
          <label htmlFor="produktAnzahl" className={labelBase}>Anzahl der Produkte (ca.)</label>
          <input
            id="produktAnzahl"
            type="text"
            inputMode="numeric"
            value={data.produktAnzahl}
            onChange={(e) => onChange({ produktAnzahl: e.target.value })}
            className={inputBase}
            placeholder="z.B. 50"
          />
        </div>

        <div>
          <label htmlFor="produktKategorien" className={labelBase}>Produktkategorien</label>
          <input
            id="produktKategorien"
            type="text"
            value={data.produktKategorien}
            onChange={(e) => onChange({ produktKategorien: e.target.value })}
            className={inputBase}
            placeholder="z.B. T-Shirts, Hosen, Accessoires"
          />
        </div>

        <fieldset>
          <legend className={labelBase}>Gewünschte Zahlungsarten</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {ZAHLUNGSARTEN.map((opt) => (
              <label key={opt.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#243d38]/60 border border-white/10 cursor-pointer hover:border-white/20">
                <input
                  type="checkbox"
                  checked={data.zahlungsarten.includes(opt.id)}
                  onChange={() => onChange({ zahlungsarten: toggleArray(data.zahlungsarten, opt.id) })}
                  className="rounded text-[#4A7C6B] focus:ring-[#4A7C6B]"
                />
                <span className="text-white/90 text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={labelBase}>Versandoptionen</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {VERSANDOPTIONEN.map((opt) => (
              <label key={opt.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#243d38]/60 border border-white/10 cursor-pointer hover:border-white/20">
                <input
                  type="checkbox"
                  checked={data.versandoptionen.includes(opt.id)}
                  onChange={() => onChange({ versandoptionen: toggleArray(data.versandoptionen, opt.id) })}
                  className="rounded text-[#4A7C6B] focus:ring-[#4A7C6B]"
                />
                <span className="text-white/90 text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="versandKostenlosAb" className={labelBase}>Kostenloser Versand ab (€)</label>
          <input
            id="versandKostenlosAb"
            type="text"
            inputMode="numeric"
            value={data.versandKostenlosAb}
            onChange={(e) => onChange({ versandKostenlosAb: e.target.value })}
            className={inputBase}
            placeholder="z.B. 50"
          />
        </div>
      </div>
    </div>
  )
}
