import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import profile from '../assets/profile.png'
import { gsap } from '../lib/gsap'
import { smoothScrollTo } from '../lib/smoothScroll'

const stats = [
  { label: 'Projects', value: '3+' },
  { label: 'Technologies', value: '10+' },
  { label: 'Experience', value: '1Y' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.14 * index, duration: 0.7, ease: 'easeOut' },
  }),
}

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -72])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -112])
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 96])
  const orbSecondaryY = useTransform(scrollYProgress, [0, 1], [0, 72])
  const orbTertiaryY = useTransform(scrollYProgress, [0, 1], [0, -48])
  const atmosphereScale = useTransform(scrollYProgress, [0, 1], [1, 1.16])
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [9, -9]), { stiffness: 140, damping: 18 })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-9, 9]), { stiffness: 140, damping: 18 })

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    pointerX.set(x)
    pointerY.set(y)
  }

  const resetTilt = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !ref.current) {
      return undefined
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      gsap.fromTo(
        '[data-hero-panel]',
        { opacity: 0, scale: 0.96, filter: 'blur(10px)', y: 32 },
        { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 1.1, ease: 'power3.out', delay: 0.12 },
      )

      media.add('(min-width: 768px)', () => {
        gsap.to('[data-hero-panel]', {
          yPercent: -10,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.25,
          },
        })

        gsap.to('[data-hero-float="left"]', {
          yPercent: -24,
          xPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.15,
          },
        })

        gsap.to('[data-hero-float="right"]', {
          yPercent: 18,
          xPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.15,
          },
        })

        gsap.to('[data-hero-stat]', {
          y: (index) => (index % 2 === 0 ? -16 : 20),
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 10%',
            end: 'bottom top',
            scrub: 1.35,
          },
        })
      })

      return () => media.revert()
    }, ref)

    return () => context.revert()
  }, [])

  return (
    <section ref={ref} id="home" className="relative overflow-hidden px-6 pb-20 pt-32 sm:pb-24 sm:pt-36">
      <motion.div style={{ scale: atmosphereScale }} className="hero-atmosphere" />
      <motion.div style={{ y: orbY }} className="hero-blob hero-blob-one" />
      <motion.div style={{ y: orbSecondaryY }} className="hero-blob hero-blob-two" />
      <motion.div style={{ y: orbTertiaryY }} className="hero-blob hero-blob-three" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div style={{ y: contentY }} className="relative z-10">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="section-kicker"
          >
            Soft luxury UI for modern brands
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{' '}
            <span className="bg-[linear-gradient(90deg,#F6A57A,#9FCFF5)] bg-clip-text text-transparent">
              Surya Prakash J
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 font-display text-2xl font-semibold text-[#5f85b5]"
          >
            Web Developer
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg"
          >
            I build scalable and modern web applications. Passionate about crafting clean, performant, and
            beautiful digital experiences.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <MagneticLink href="#work" className="primary-button justify-center px-7 py-4 text-sm sm:text-base">
              View My Work
            </MagneticLink>
            <MagneticLink href="#contact" className="secondary-button justify-center px-7 py-4 text-sm sm:text-base">
              Contact Me
            </MagneticLink>
          </motion.div>

          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div key={stat.label} data-hero-stat className="soft-card rounded-[24px] p-5">
                <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.25, ease: 'easeOut' }}
          className="relative"
        >
          <motion.div
            style={{ y: imageY, rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            className="relative mx-auto max-w-[520px]"
          >
            <div data-hero-panel className="glass-panel relative overflow-hidden rounded-[38px] p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.65),transparent_46%)]" />
              <div className="relative overflow-hidden rounded-[30px] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.26))]">
                <div className="flex items-center justify-between px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--text-secondary)]">
                  <span>Surya Prakash J</span>
                  <span>Web Developer</span>
                </div>

                <div className="px-5 pb-5">
                  <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#fce7e1_0%,#dceffd_58%,#ffffff_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.75),transparent_48%)]" />
                    <img
                      src={profile}
                      alt="Surya Prakash J"
                      className="relative z-10 h-[30rem] w-full object-cover sm:h-[35rem]"
                    />

                    <div className="absolute inset-x-5 bottom-5 rounded-[24px] border border-white/50 bg-white/38 p-4 shadow-[0_20px_35px_rgba(31,31,31,0.1)] backdrop-blur-2xl">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-secondary)]">
                        Surya Prakash
                      </p>
                      <div className="mt-3 flex items-end justify-between gap-4">
                        <div>
                          <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                            Web Developer
                          </p>
                          <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Building the web with clean code, thoughtful UI, and modern experiences.
                          </p>
                        </div>
                        <span className="hidden rounded-full border border-white/50 bg-white/65 px-3 py-1 text-[11px] font-semibold text-[var(--text-primary)] sm:inline-flex">
                          Available for Work
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              data-hero-float="left"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-4 top-10 hidden rounded-[24px] border border-white/50 bg-white/70 px-4 py-3 shadow-[0_20px_35px_rgba(31,31,31,0.08)] backdrop-blur-2xl sm:block"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-secondary)]">
                Core Stack
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">React • TypeScript</p>
            </motion.div>

            <motion.div
              data-hero-float="right"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-5 right-0 rounded-[24px] border border-white/50 bg-white/70 px-4 py-3 shadow-[0_20px_35px_rgba(31,31,31,0.08)] backdrop-blur-2xl"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-secondary)]">
                Focus
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">Clean, responsive builds</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function MagneticLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18 })
  const springY = useSpring(y, { stiffness: 220, damping: 18 })

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const strength = Math.min(bounds.width, bounds.height) * 0.12
    const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * strength
    const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * strength

    x.set(offsetX)
    y.set(offsetY)
  }

  return (
    <motion.a
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      onClick={(event) => {
        if (href.startsWith('#')) {
          event.preventDefault()
          smoothScrollTo(href)
        }
      }}
      whileTap={{ scale: 0.98 }}
      className={`${className} magnetic-surface`}
    >
      {children}
    </motion.a>
  )
}
