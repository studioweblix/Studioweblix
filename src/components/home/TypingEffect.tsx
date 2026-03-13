'use client'

import { useState, useEffect } from 'react'

const PHRASES = [
  'Ihre Website. Ihr Erfolg.',
  'Modern. Schnell. Professionell.',
  'Design das überzeugt.',
  'Mehr Kunden. Mehr Umsatz.',
  'Webdesign ab 99€/Monat.',
  'In nur einer Woche online.',
]

const TYPING_SPEED = 65
const DELETING_SPEED = 40
const PAUSE_AFTER_TYPING = 2000
const PAUSE_AFTER_DELETING = 400

export function TypingEffect() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const currentPhrase = PHRASES[phraseIndex]
  const displayedText = currentPhrase.slice(0, charIndex)

  useEffect(() => {
    let delay: number

    if (!isDeleting) {
      if (charIndex < currentPhrase.length) {
        delay = TYPING_SPEED
      } else {
        delay = PAUSE_AFTER_TYPING
      }
    } else {
      if (charIndex > 0) {
        delay = DELETING_SPEED
      } else {
        delay = PAUSE_AFTER_DELETING
      }
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setCharIndex((c) => c + 1)
        } else {
          setIsDeleting(true)
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((c) => c - 1)
        } else {
          setIsDeleting(false)
          setPhraseIndex((p) => (p + 1) % PHRASES.length)
        }
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentPhrase])

  return (
    <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold text-center leading-snug px-4">
      {displayedText}
      <span className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle animate-blink" />
    </p>
  )
}
