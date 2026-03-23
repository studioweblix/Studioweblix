'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { StudioWeblixLogo } from './StudioWeblixLogo'
import type { Settings } from '@/lib/types'

interface HeaderProps {
  settings: Settings | null
}

const navLinks = [
  { href: '/#so-funktionierts', label: "So funktioniert's" },
  { href: '/preis', label: 'Preis' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/produkte', label: 'Unsere Designs' },
  { href: '/formular', label: 'Call Buchen' },
]

export function Header({ settings }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const storeName = settings?.store_name ?? 'Studio Weblix'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/5 flex items-center justify-between h-16 md:h-20 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8">
      {/* Logo immer ganz links: erstes Kind des Headers mit festem Abstand */}
      <Link href="/" className="flex items-center gap-3 group shrink-0">
        {settings?.logo_url ? (
          <Image
            src={settings.logo_url}
            alt={storeName}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            quality={100}
          />
        ) : (
          <StudioWeblixLogo className="h-11 w-auto group-hover:opacity-90 transition-opacity" />
        )}
        {settings?.logo_url && (
          <span className="font-semibold text-base md:text-lg text-white">
            {storeName}
          </span>
        )}
      </Link>

      <div className="flex items-center gap-6 xl:gap-8">
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="text-white hover:text-white/80 transition-colors text-sm font-medium whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white"
          aria-label="Menü öffnen"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
          <nav className="lg:hidden py-4 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#2C4B44]/95 backdrop-blur-sm animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white hover:text-white/80 transition-colors py-2 block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
    </header>
  )
}
