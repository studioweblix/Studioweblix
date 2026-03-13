'use client'

import { Instagram, Facebook, Music2 } from 'lucide-react'

export type StepSocialData = {
  instagram: string
  facebook: string
  tiktok: string
  googleProfil: '' | 'ja' | 'nein' | 'weiss nicht'
  weitereProfile: string
}

const inputBase =
  'w-full px-4 py-3 rounded-xl border border-white/15 bg-[#243d38] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:border-[#4A7C6B] transition-colors pl-11'
const labelBase = 'block text-sm font-medium text-white/80 mb-2'
const iconWrapper = 'absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none'

const GOOGLE_OPTIONS = [
  { value: '', label: 'Bitte wählen …' },
  { value: 'ja', label: 'Ja, vorhanden' },
  { value: 'nein', label: 'Nein' },
  { value: 'weiss nicht', label: 'Weiß nicht' },
]

type Props = {
  data: StepSocialData
  onChange: (updates: Partial<StepSocialData>) => void
}

function FieldWithIcon({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  icon: React.ReactNode
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <div>
      <label htmlFor={id} className={labelBase}>{label}</label>
      <div className="relative">
        <span className={iconWrapper} aria-hidden>
          {icon}
        </span>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputBase}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export function StepSocial({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Social Media</h2>

      <FieldWithIcon
        id="instagram"
        label="Instagram"
        icon={<Instagram className="w-5 h-5" />}
        value={data.instagram}
        onChange={(v) => onChange({ instagram: v })}
        placeholder="@ihrprofil oder URL"
      />

      <FieldWithIcon
        id="facebook"
        label="Facebook"
        icon={<Facebook className="w-5 h-5" />}
        value={data.facebook}
        onChange={(v) => onChange({ facebook: v })}
        placeholder="URL Ihrer Facebook-Seite"
      />

      <FieldWithIcon
        id="tiktok"
        label="TikTok"
        icon={<Music2 className="w-5 h-5" />}
        value={data.tiktok}
        onChange={(v) => onChange({ tiktok: v })}
        placeholder="@ihrprofil oder URL"
      />

      <div>
        <label htmlFor="googleProfil" className={labelBase}>Google Unternehmensprofil</label>
        <select
          id="googleProfil"
          value={data.googleProfil}
          onChange={(e) => onChange({ googleProfil: e.target.value as StepSocialData['googleProfil'] })}
          className={inputBase.replace(' pl-11', '') + ' cursor-pointer'}
        >
          {GOOGLE_OPTIONS.map((opt) => (
            <option key={opt.value || 'empty'} value={opt.value} className="bg-[#243d38] text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="weitereProfile" className={labelBase}>Weitere Profile</label>
        <textarea
          id="weitereProfile"
          value={data.weitereProfile}
          onChange={(e) => onChange({ weitereProfile: e.target.value })}
          rows={3}
          className={inputBase.replace(' pl-11', '') + ' resize-y'}
          placeholder="Yelp, TripAdvisor, Jameda etc."
        />
      </div>
    </div>
  )
}
