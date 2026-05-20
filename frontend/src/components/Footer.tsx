import { motion } from 'framer-motion'
import { smoothScrollTo } from '../lib/smoothScroll'

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6">
      <div className="mx-auto max-w-6xl border-t border-[var(--line)] pt-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
              Surya Prakash J<span className="text-[#F6A57A]">.</span>
            </p>
            <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
              Web Developer · Building the web, one component at a time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              href="https://github.com/surya3665"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.04 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/55 text-[var(--text-primary)] shadow-[0_14px_28px_rgba(31,31,31,0.06)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 dark:bg-white/5"
              aria-label="GitHub"
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              href="mailto:suryaprakash882578@gmail.com"
              whileHover={{ y: -4, scale: 1.04 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/55 text-[var(--text-primary)] shadow-[0_14px_28px_rgba(31,31,31,0.06)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 dark:bg-white/5"
              aria-label="Email"
            >
              <MailIcon />
            </motion.a>
            <button
              type="button"
              onClick={() => smoothScrollTo(0)}
              className="secondary-button w-full justify-center px-4 py-3 text-sm sm:w-auto"
            >
              Back to top
            </button>
          </div>
        </div>

        <p className="mt-6 text-xs text-[var(--text-secondary)]">
          © {new Date().getFullYear()} Surya Prakash J. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function GithubIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .75C5.786.75.75 5.786.75 12a11.246 11.246 0 0 0 7.69 10.676c.563.104.77-.245.77-.547 0-.27-.01-.984-.015-1.931-3.127.68-3.787-1.508-3.787-1.508-.511-1.298-1.248-1.644-1.248-1.644-1.021-.699.077-.685.077-.685 1.128.079 1.722 1.159 1.722 1.159 1.002 1.715 2.628 1.22 3.269.932.101-.726.392-1.22.714-1.5-2.496-.284-5.122-1.248-5.122-5.555 0-1.227.438-2.23 1.157-3.016-.116-.285-.5-1.43.11-2.982 0 0 .944-.302 3.093 1.153A10.71 10.71 0 0 1 12 6.173c.95.004 1.907.128 2.8.375 2.147-1.455 3.09-1.153 3.09-1.153.612 1.552.228 2.697.113 2.982.72.786 1.156 1.789 1.156 3.016 0 4.317-2.63 5.268-5.135 5.546.403.347.762 1.032.762 2.08 0 1.5-.014 2.71-.014 3.08 0 .305.204.656.777.545A11.25 11.25 0 0 0 23.25 12C23.25 5.786 18.214.75 12 .75Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15A1.75 1.75 0 0 1 21.25 8.5v7A1.75 1.75 0 0 1 19.5 17.25h-15A1.75 1.75 0 0 1 2.75 15.5v-7A1.75 1.75 0 0 1 4.5 6.75Zm0 0 7.5 5.5 7.5-5.5" />
    </svg>
  )
}
