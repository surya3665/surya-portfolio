import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { smoothScrollTo } from '../lib/smoothScroll'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const sections = ['home', ...links.map((link) => link.href.replace('#', ''))]
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        rootMargin: '-22% 0px -58% 0px',
        threshold: [0.2, 0.4, 0.65],
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const handleNavigate = (href: string) => {
    smoothScrollTo(href)
    setMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled
            ? 'border border-[var(--line)] bg-[color:var(--surface-strong)] shadow-[var(--shadow-card)] backdrop-blur-2xl'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <motion.button
          type="button"
          className="group flex items-center gap-3"
          whileHover={{ scale: 1.01 }}
          onClick={() => smoothScrollTo(0)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/60 text-sm font-semibold tracking-[0.24em] text-[var(--text-primary)] shadow-[0_12px_24px_rgba(31,31,31,0.08)] backdrop-blur-xl dark:bg-white/10 dark:text-[var(--text-primary)]">
            SP
          </span>
          <span className="text-left">
            <span className="block font-display text-sm font-semibold uppercase tracking-[0.3em] text-[var(--text-secondary)]">
              Portfolio
            </span>
            <span className="block font-display text-base font-semibold text-[var(--text-primary)]">
              Surya Prakash
            </span>
          </span>
        </motion.button>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavigate(link.href)}
              className="group relative rounded-full px-1 py-1 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)]"
            >
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-x-0 -bottom-2 h-8 rounded-full bg-white/55 shadow-[0_16px_30px_rgba(31,31,31,0.06)] backdrop-blur-xl dark:bg-white/8"
                  transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-[var(--text-primary)] transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/55 text-[var(--text-primary)] shadow-[0_16px_28px_rgba(31,31,31,0.08)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 dark:bg-white/10"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault()
              handleNavigate('#contact')
            }}
            className="primary-button px-5 py-3 text-sm"
          >
            Hire Me
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/55 text-[var(--text-primary)] shadow-[0_16px_28px_rgba(31,31,31,0.08)] backdrop-blur-xl dark:bg-white/10"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[color:var(--surface-strong)] backdrop-blur-2xl"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 rounded-full bg-[var(--text-primary)] transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-0.5 w-5 rounded-full bg-[var(--text-primary)] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-5 rounded-full bg-[var(--text-primary)] transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-[28px] border border-[var(--line)] bg-[color:var(--surface-strong)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavigate(link.href)}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-white/45 hover:text-[var(--text-primary)] dark:hover:bg-white/5"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault()
                  handleNavigate('#contact')
                }}
                className="primary-button mt-2 justify-center px-5 py-3 text-sm"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function SunIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4.25" />
      <path strokeLinecap="round" d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23L5.46 5.46" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.42A8.75 8.75 0 1 1 9.58 3.75a7 7 0 1 0 10.67 10.67Z"
      />
    </svg>
  )
}
