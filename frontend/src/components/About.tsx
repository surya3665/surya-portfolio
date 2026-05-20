import { motion, useInView } from 'framer-motion'
import { useLayoutEffect, useRef } from 'react'
import profile from '../assets/profile.png'
import { gsap } from '../lib/gsap'

const stats = [
  { label: 'Degree', value: 'M.Com', sub: '2024' },
  { label: 'Degree', value: 'B.Com', sub: '2022' },
  { label: 'Certified', value: 'Web', sub: 'Development' },
]

const languages = ['English', 'Tamil', 'Telugu']

export default function About() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !ref.current) {
      return undefined
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      gsap.fromTo(
        '[data-about-panel]',
        { opacity: 0, y: 26, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 72%',
          },
        },
      )

      media.add('(min-width: 768px)', () => {
        gsap.to('[data-about-image-shell]', {
          yPercent: -8,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })

        gsap.to('[data-about-float="left"]', {
          xPercent: -14,
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3,
          },
        })

        gsap.to('[data-about-float="right"]', {
          xPercent: 12,
          yPercent: 16,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3,
          },
        })
      })
    }, ref)

    return () => context.revert()
  }, [])

  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-10 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-[380px] sm:max-w-[460px] lg:mx-0"
        >
          <div data-about-image-shell className="glass-panel relative overflow-hidden rounded-[28px] p-3 sm:rounded-[38px] sm:p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_45%)]" />
            <div className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(150deg,rgba(252,231,225,0.92),rgba(220,239,253,0.88),rgba(255,255,255,0.92))] sm:rounded-[30px]">
              <img
                src={profile}
                alt="Surya Prakash J"
                className="h-[24rem] w-full object-cover object-center sm:h-[31rem]"
              />

              <div data-about-panel className="absolute inset-x-4 bottom-4 rounded-[20px] border border-white/55 bg-white/42 p-3 backdrop-blur-2xl sm:inset-x-5 sm:bottom-5 sm:rounded-[24px] sm:p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-secondary)]">
                  Certification
                </p>
                <p className="mt-2 font-display text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-xl">
                  Web Development Certification
                </p>
              </div>
            </div>
          </div>

          <motion.div
            data-about-float="left"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="absolute -left-3 top-10 hidden rounded-[24px] border border-white/55 bg-white/78 px-4 py-3 shadow-[0_22px_38px_rgba(31,31,31,0.08)] backdrop-blur-2xl md:block"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-secondary)]">
              Languages
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">English • Tamil • Telugu</p>
          </motion.div>

          <motion.div
            data-about-float="right"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -bottom-5 right-0 hidden rounded-[24px] border border-white/55 bg-white/78 px-4 py-3 shadow-[0_22px_38px_rgba(31,31,31,0.08)] backdrop-blur-2xl sm:block"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-secondary)]">
              Degree
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">M.Com • 2024</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="text-center lg:text-left"
        >
          <span className="section-kicker mx-auto lg:mx-0">About Me</span>
          <h2 className="section-title mt-6">Who I Am</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8 lg:mx-0">
            A motivated web developer with strong skills in JavaScript, React, and modern UI development.
            Seeking to leverage my knowledge and hands-on project experience to contribute effectively to a
            dynamic development team.
          </p>

          <div className="mt-8">
            <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">Languages</h3>
            <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
              {languages.map((language) => (
                <span
                  key={language}
                  data-about-panel
                  className="rounded-full border border-[var(--line)] bg-white/60 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] shadow-[0_10px_24px_rgba(31,31,31,0.05)] dark:bg-white/5"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          <div data-about-panel className="mt-8 rounded-[24px] border border-[var(--line)] bg-[linear-gradient(145deg,rgba(246,165,122,0.12),rgba(159,207,245,0.12))] p-4 sm:p-5">
            <div className="flex items-center gap-4 text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6A57A] text-lg text-white shadow-[0_18px_34px_rgba(246,165,122,0.28)]">
                🏅
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Web Development Certification</p>
                <p className="text-sm text-[var(--text-secondary)]">Full Stack Web Development</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={`${stat.label}-${stat.value}`}
                data-about-panel
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * index + 0.2, duration: 0.55 }}
                className="soft-card rounded-[24px] p-5"
              >
                <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">{stat.label}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
