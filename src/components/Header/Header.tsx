import { motion } from 'framer-motion'
import { theme } from '../../lib/theme'

type HeaderProps = {
  crestSrc?: string
  onTitleClick?: () => void
}

export default function Header({ crestSrc, onTitleClick }: HeaderProps) {
  const fallback = '/assets/crest-placeholder.png'
  const src = crestSrc ?? fallback

  return (
    <header className="relative w-full max-w-6xl mx-auto pt-16 pb-8 px-6 text-center">
      <motion.img
        src={src}
        alt="Crest"
        className="mx-auto -mb-6 h-20 w-auto drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)]"
        onError={(e) => { e.currentTarget.src = fallback }}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <motion.h1
        className="tracking-wide text-4xl sm:text-5xl md:text-6xl"
        style={{ fontFamily: theme.titleFont }}
        initial={{ opacity: 0, letterSpacing: '0.2em' }}
        animate={{ opacity: 1, letterSpacing: '0.06em' }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        onClick={onTitleClick}
      >
        <span className="gold">The</span> Gentlemen
      </motion.h1>
      <p className="mt-3 text-sm opacity-80">oh goodie...another bottle</p>
    </header>
  )
}
