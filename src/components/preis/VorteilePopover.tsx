'use client'

import { useState } from 'react'

interface VorteilePopoverProps {
  title?: string
  vorteile: string[]
  position?: 'top' | 'bottom'
}

export function VorteilePopover({ title, vorteile, position = 'top' }: VorteilePopoverProps) {
  const [open, setOpen] = useState(false)

  const trigger = (
    <button
      type="button"
      className="flex-shrink-0 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-white/70 hover:text-white"
      aria-label="Vorteile anzeigen"
      aria-expanded={open}
    >
      <svg
        className={`w-4 h-4 transition-transform ${open && position === 'top' ? 'rotate-180' : ''} ${open && position === 'bottom' ? '-rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  )

  const popup = open && (
    <div
      className={`absolute z-20 animate-fade-in ${position === 'top' ? 'left-0 right-0 top-full mt-2' : 'right-0 bottom-full mb-2'}`}
    >
      <div className="rounded-xl bg-[#243d38] border border-white/10 shadow-xl p-4 min-w-[220px]">
        <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-3">
          Vorteile
        </p>
        <ul className="space-y-2 text-sm text-white/80">
          {vorteile.map((v) => (
            <li key={v} className="flex items-center gap-2">
              <span className="text-[#5a6d6b]">•</span> {v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {position === 'top' ? (
        <div className="flex items-center justify-between">
          <span className="text-[#5a6d6b] font-bold text-sm uppercase tracking-wider">
            {title}
          </span>
          {trigger}
        </div>
      ) : (
        <>
          {trigger}
          {popup}
        </>
      )}
      {position === 'top' && popup}
    </div>
  )
}
