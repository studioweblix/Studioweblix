'use client'

export type DesignStyleId =
  | 'modern-minimal'
  | 'klassisch-elegant'
  | 'verspielt-bunt'
  | 'dunkel-edel'
  | 'hell-freundlich'
  | 'sonstiges'

export type StepDesignData = {
  styleId: DesignStyleId | ''
  wunschfarben: string
  referenzWebsites: string
}

const STYLE_OPTIONS: Array<{
  id: DesignStyleId
  label: string
  colors: string[] // CSS-Farben für die Farbvorschau
}> = [
  { id: 'modern-minimal', label: 'Modern & Minimalistisch', colors: ['#000000', '#ffffff', '#333333', '#f5f5f5'] },
  { id: 'klassisch-elegant', label: 'Klassisch & Elegant', colors: ['#B8860B', '#8B4513', '#DAA520', '#654321'] },
  { id: 'verspielt-bunt', label: 'Verspielt & Bunt', colors: ['#FF69B4', '#9370DB', '#00CED1', '#FFD700'] },
  { id: 'dunkel-edel', label: 'Dunkel & Edel', colors: ['#1a1a1a', '#2d2d2d', '#4a4a4a', '#6b6b6b'] },
  { id: 'hell-freundlich', label: 'Hell & Freundlich', colors: ['#FFE4E1', '#E6E6FA', '#F0FFF0', '#FFF8DC'] },
  { id: 'sonstiges', label: 'Sonstiges', colors: ['#5a6d6b', '#7a8d8b', '#9aadaa', '#bac9c7'] },
]

const inputBase =
  'w-full px-4 py-3 rounded-xl border border-white/15 bg-[#243d38] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:border-[#4A7C6B] transition-colors'
const labelBase = 'block text-sm font-medium text-white/80 mb-2'

type Props = {
  data: StepDesignData
  onChange: (updates: Partial<StepDesignData>) => void
}

export function StepDesign({ data, onChange }: Props) {
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold text-white">Design & Stil</h2>

      <div>
        <p className={labelBase}>Stil-Auswahl</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {STYLE_OPTIONS.map((opt) => {
            const isSelected = data.styleId === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange({ styleId: opt.id })}
                className={`relative text-left p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:ring-offset-2 focus:ring-offset-[#2C4B44] ${
                  isSelected
                    ? 'border-[#4A7C6B] bg-[#243d38] ring-2 ring-[#4A7C6B]/50'
                    : 'border-white/15 bg-[#243d38]/60 hover:border-white/25 hover:bg-[#243d38]'
                }`}
              >
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {opt.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-6 h-6 rounded-md border border-white/20 shrink-0"
                      style={{ backgroundColor: color }}
                      aria-hidden
                    />
                  ))}
                </div>
                <span className="text-white text-sm font-medium leading-tight block">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label htmlFor="wunschfarben" className={labelBase}>Wunschfarben</label>
        <input
          id="wunschfarben"
          type="text"
          value={data.wunschfarben}
          onChange={(e) => onChange({ wunschfarben: e.target.value })}
          className={inputBase}
          placeholder="z.B. Blau und Gold, oder 'keine Präferenz'"
        />
      </div>

      <div>
        <label htmlFor="referenzWebsites" className={labelBase}>Referenz-Websites</label>
        <textarea
          id="referenzWebsites"
          value={data.referenzWebsites}
          onChange={(e) => onChange({ referenzWebsites: e.target.value })}
          rows={3}
          className={inputBase + ' resize-y'}
          placeholder="URLs von Websites die Ihnen gefallen"
        />
      </div>
    </div>
  )
}
