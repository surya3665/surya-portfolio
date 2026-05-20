import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useContactForm } from '../hooks/useContactForm'

export default function Contact() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { formData, loading, successMessage, error, handleChange, handleSubmit, reset } = useContactForm()

  return (
    <section id="contact" className="px-6 py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="section-kicker mx-auto">Get In Touch</span>
          <h2 className="section-title mt-6">Contact Me</h2>
          <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="soft-card rounded-[32px] p-8 md:p-10"
          >
            <span className="section-kicker">Direct Inbox Flow</span>
            <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
              Let&apos;s talk about your next project.
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              Share your name, email, and project idea. I&apos;ll review the details and reply using{' '}
              <a className="underline decoration-[var(--text-secondary)]" href="mailto:suryaprakash882578@gmail.com">
                suryaprakash882578@gmail.com
              </a>
              .
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:suryaprakash882578@gmail.com"
                className="flex items-center gap-4 rounded-[24px] border border-[var(--line)] bg-white/55 p-4 shadow-[0_14px_28px_rgba(31,31,31,0.06)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 dark:bg-white/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/70 dark:bg-white/10">
                  <MailIcon />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                    Email
                  </span>
                  <span className="mt-1 block text-sm font-medium text-[var(--text-primary)]">
                    suryaprakash882578@gmail.com
                  </span>
                </span>
              </a>

              <a
                href="https://github.com/surya3665"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-[24px] border border-[var(--line)] bg-white/55 p-4 shadow-[0_14px_28px_rgba(31,31,31,0.06)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 dark:bg-white/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/70 dark:bg-white/10">
                  <GithubIcon />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                    GitHub
                  </span>
                  <span className="mt-1 block text-sm font-medium text-[var(--text-primary)]">
                    github.com/surya3665
                  </span>
                </span>
              </a>
            </div>

            <div className="mt-8 rounded-[28px] border border-[var(--line)] bg-[linear-gradient(145deg,rgba(252,231,225,0.7),rgba(220,239,253,0.65))] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-secondary)]">
                Form behavior
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                The form sends your details straight to my inbox. If sending is blocked, it opens a prefilled
                email in the visitor&apos;s mail app so the message can still reach me.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="glass-panel rounded-[32px] p-8 md:p-10"
          >
            <AnimatePresence mode="wait">
              {successMessage ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/55 bg-white/70 shadow-[0_20px_40px_rgba(31,31,31,0.08)] backdrop-blur-xl dark:bg-white/10">
                    <CheckIcon />
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                    Message Sent!
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-secondary)]">{successMessage}</p>
                  <button type="button" onClick={reset} className="primary-button mt-8 px-6 py-3 text-sm">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="field-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="message">
                      Project details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell me what you want to build, the style you like, and any timeline details."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={7}
                      className="field resize-none"
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-[20px] border border-[#F6A57A]/35 bg-[#FCE7E1]/80 px-4 py-3 text-sm text-[#7A4B33] dark:bg-[#33221B]"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="primary-button w-full justify-center px-6 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MailIcon() {
  return (
    <svg className="h-5 w-5 text-[var(--text-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15A1.75 1.75 0 0 1 21.25 8.5v7A1.75 1.75 0 0 1 19.5 17.25h-15A1.75 1.75 0 0 1 2.75 15.5v-7A1.75 1.75 0 0 1 4.5 6.75Zm0 0 7.5 5.5 7.5-5.5" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg className="h-5 w-5 text-[var(--text-primary)]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .75C5.786.75.75 5.786.75 12a11.246 11.246 0 0 0 7.69 10.676c.563.104.77-.245.77-.547 0-.27-.01-.984-.015-1.931-3.127.68-3.787-1.508-3.787-1.508-.511-1.298-1.248-1.644-1.248-1.644-1.021-.699.077-.685.077-.685 1.128.079 1.722 1.159 1.722 1.159 1.002 1.715 2.628 1.22 3.269.932.101-.726.392-1.22.714-1.5-2.496-.284-5.122-1.248-5.122-5.555 0-1.227.438-2.23 1.157-3.016-.116-.285-.5-1.43.11-2.982 0 0 .944-.302 3.093 1.153A10.71 10.71 0 0 1 12 6.173c.95.004 1.907.128 2.8.375 2.147-1.455 3.09-1.153 3.09-1.153.612 1.552.228 2.697.113 2.982.72.786 1.156 1.789 1.156 3.016 0 4.317-2.63 5.268-5.135 5.546.403.347.762 1.032.762 2.08 0 1.5-.014 2.71-.014 3.08 0 .305.204.656.777.545A11.25 11.25 0 0 0 23.25 12C23.25 5.786 18.214.75 12 .75Z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="h-8 w-8 text-[var(--text-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  )
}
