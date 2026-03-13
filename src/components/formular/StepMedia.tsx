'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ACCEPT_LOGO = '.png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml'
const ACCEPT_PHOTOS = 'image/*'

export type MediaFile = { name: string; data: string }

export type StepMediaData = {
  unternehmensBeschreibung: string
  slogan: string
  texteErstellenLassen: boolean
  logo: MediaFile | null
  fotos: MediaFile[]
}

const inputBase =
  'w-full px-4 py-3 rounded-xl border border-white/15 bg-[#243d38] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:border-[#4A7C6B] transition-colors'
const labelBase = 'block text-sm font-medium text-white/80 mb-2'

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

type Props = {
  data: StepMediaData
  onChange: (updates: Partial<StepMediaData>) => void
}

export function StepMedia({ data, onChange }: Props) {
  const [logoDrag, setLogoDrag] = useState(false)
  const [fotosDrag, setFotosDrag] = useState(false)
  const [sizeError, setSizeError] = useState<string | null>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const fotosInputRef = useRef<HTMLInputElement>(null)

  async function handleLogoFiles(files: FileList | null) {
    setSizeError(null)
    if (!files?.length) return
    const file = files[0]!
    if (file.size > MAX_FILE_SIZE) {
      setSizeError(`Die Datei "${file.name}" ist zu groß. Max. 10 MB pro Datei.`)
      return
    }
    const data = await fileToBase64(file)
    onChange({ logo: { name: file.name, data } })
  }

  async function handleFotosFiles(files: FileList | null) {
    setSizeError(null)
    if (!files?.length) return
    const tooBig = Array.from(files).find((f) => f.size > MAX_FILE_SIZE)
    if (tooBig) {
      setSizeError(`Die Datei "${tooBig.name}" ist zu groß. Max. 10 MB pro Datei.`)
      return
    }
    const newFotos: MediaFile[] = await Promise.all(
      Array.from(files).map(async (f) => ({ name: f.name, data: await fileToBase64(f) }))
    )
    onChange({ fotos: [...data.fotos, ...newFotos] })
  }

  return (
    <div className="space-y-10">
      <h2 className="text-lg font-semibold text-white">Texte & Medien</h2>

      {/* 1. TEXTE */}
      <section className="space-y-4">
        <h3 className="text-base font-medium text-white/90">Texte</h3>
        <div>
          <label htmlFor="unternehmensBeschreibung" className={labelBase}>
            Kurzbeschreibung Ihres Unternehmens
          </label>
          <textarea
            id="unternehmensBeschreibung"
            value={data.unternehmensBeschreibung}
            onChange={(e) => onChange({ unternehmensBeschreibung: e.target.value })}
            rows={4}
            className={inputBase + ' resize-y'}
            placeholder="Beschreiben Sie Ihr Unternehmen in 2-3 Sätzen. Dieser Text kann auf der Website verwendet werden."
          />
        </div>
        <div>
          <label htmlFor="slogan" className={labelBase}>Slogan / Claim</label>
          <input
            id="slogan"
            type="text"
            value={data.slogan}
            onChange={(e) => onChange({ slogan: e.target.value })}
            className={inputBase}
            placeholder="z.B. 'Ihr Friseur mit Herz'"
          />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.texteErstellenLassen}
            onChange={(e) => onChange({ texteErstellenLassen: e.target.checked })}
            className="rounded text-[#4A7C6B] focus:ring-[#4A7C6B]"
          />
          <span className="text-white/90 text-sm">Studio Weblix soll die Texte für mich erstellen</span>
        </label>
      </section>

      {/* 2. LOGO UPLOAD */}
      <section>
        <h3 className="text-base font-medium text-white/90 mb-2">Logo Upload</h3>
        <input
          ref={logoInputRef}
          type="file"
          accept={ACCEPT_LOGO}
          className="hidden"
          onChange={(e) => handleLogoFiles(e.target.files)}
        />
        {data.logo ? (
          <div className="rounded-xl border border-white/15 bg-[#243d38] p-4 flex items-center gap-4">
            <Image
              src={data.logo.data}
              alt="Logo Vorschau"
              width={200}
              height={64}
              unoptimized
              className="h-16 w-auto max-w-[200px] object-contain rounded bg-white/5"
            />
            <span className="text-white/80 text-sm truncate flex-1">{data.logo.name}</span>
            <button
              type="button"
              onClick={() => onChange({ logo: null })}
              className="shrink-0 px-3 py-2 rounded-lg border border-red-400/50 text-red-400 text-sm hover:bg-red-400/10 transition-colors"
            >
              Löschen
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => { e.preventDefault(); setLogoDrag(true) }}
            onDragLeave={() => setLogoDrag(false)}
            onDrop={(e) => { e.preventDefault(); setLogoDrag(false); handleLogoFiles(e.dataTransfer.files) }}
            onClick={() => logoInputRef.current?.click()}
            className={`rounded-xl border-2 border-dashed py-10 px-6 text-center cursor-pointer transition-colors ${
              logoDrag ? 'border-[#4A7C6B] bg-[#4A7C6B]/10' : 'border-white/20 hover:border-white/30 bg-[#243d38]/60'
            }`}
          >
            <p className="text-white/80 text-sm">Ziehen Sie Ihr Logo hierher oder klicken Sie zum Auswählen</p>
            <p className="text-white/50 text-xs mt-1">PNG, JPG oder SVG · max. 10 MB</p>
          </div>
        )}
      </section>

      {/* 3. FOTOS UPLOAD */}
      <section>
        <h3 className="text-base font-medium text-white/90 mb-2">Fotos Upload</h3>
        <input
          ref={fotosInputRef}
          type="file"
          accept={ACCEPT_PHOTOS}
          multiple
          className="hidden"
          onChange={(e) => { handleFotosFiles(e.target.files); e.target.value = '' }}
        />
        <div
          onDragOver={(e) => { e.preventDefault(); setFotosDrag(true) }}
          onDragLeave={() => setFotosDrag(false)}
          onDrop={(e) => { e.preventDefault(); setFotosDrag(false); handleFotosFiles(e.dataTransfer.files) }}
          onClick={() => fotosInputRef.current?.click()}
          className={`rounded-xl border-2 border-dashed py-8 px-6 text-center cursor-pointer transition-colors mb-4 ${
            fotosDrag ? 'border-[#4A7C6B] bg-[#4A7C6B]/10' : 'border-white/20 hover:border-white/30 bg-[#243d38]/60'
          }`}
        >
          <p className="text-white/80 text-sm">Fotos vom Geschäft, Team, Produkten etc.</p>
          <p className="text-white/50 text-xs mt-1">Mehrere Dateien möglich · max. 10 MB pro Bild</p>
        </div>
        {data.fotos.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {data.fotos.map((foto, index) => (
              <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-[#243d38] border border-white/10">
                <Image
                  src={foto.data}
                  alt={foto.name}
                  width={200}
                  height={200}
                  unoptimized
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onChange({ fotos: data.fotos.filter((_, i) => i !== index) }) }}
                  className="absolute top-1 right-1 w-7 h-7 rounded-full bg-red-500/90 text-white flex items-center justify-center text-sm font-bold hover:bg-red-500 transition-colors"
                  aria-label="Bild entfernen"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {sizeError && (
        <p className="text-red-400 text-sm rounded-lg bg-red-400/10 border border-red-400/30 px-4 py-3">
          {sizeError}
        </p>
      )}
    </div>
  )
}
