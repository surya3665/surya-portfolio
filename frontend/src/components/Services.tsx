import { motion, useInView } from 'framer-motion'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const services = [
  {
    title: 'Web Development',
    description: 'Building fast, accessible, and visually stunning websites using modern frameworks and best practices.',
    gradient: 'linear-gradient(145deg, rgba(246,165,122,0.22), rgba(252,231,225,0.62))',
    icon: PortfolioIcon,
  },
  {
    title: 'Portfolio Websites',
    description: 'Personal portfolio websites with refined layout, smooth animation, and clear storytelling for your work and skills.',
    gradient: 'linear-gradient(145deg, rgba(220,239,253,0.34), rgba(159,207,245,0.42))',
    icon: InterfaceIcon,
  },
  {
    title: 'Landing Page Design',
    description: 'Elegant landing pages with premium layout, soft visual direction, and conversion-focused sections.',
    gradient: 'linear-gradient(145deg, rgba(252,231,225,0.36), rgba(220,239,253,0.3))',
    icon: StackIcon,
  },
  {
    title: 'Responsive UI Development',
    description: 'Pixel-perfect responsive interfaces that look great on every device using React and TailwindCSS.',
    gradient: 'linear-gradient(145deg, rgba(246,165,122,0.2), rgba(220,239,253,0.44))',
    icon: LaunchIcon,
  },
]

export default function Services() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !ref.current) {
      return undefined
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      gsap.fromTo(
        '[data-service-card]',
        { opacity: 0, y: 28, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 74%',
          },
        },
      )

      media.add('(min-width: 768px)', () => {
        gsap.to('[data-service-card]', {
          y: (index) => (index % 2 === 0 ? -8 : 10),
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        })
      })

      return () => media.revert()
    }, ref)

    return () => context.revert()
  }, [])

  return (
    <section id="services" className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="section-kicker mx-auto">What I Offer</span>
          <h2 className="section-title mt-6">Services</h2>
          <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            I help businesses and individuals build impactful digital products.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.article
                key={service.title}
                data-service-card
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.12, duration: 0.55 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[24px] border border-[var(--line)] bg-[color:var(--surface-strong)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-7"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: service.gradient }} />
                <div className="service-card-glow absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="service-icon-shell mb-6 flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/55 bg-white/65 shadow-[0_18px_32px_rgba(31,31,31,0.08)] backdrop-blur-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[8deg] dark:bg-white/10">
                    <Icon />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{service.description}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function iconBase(path: string) {
  return (
    <svg className="h-6 w-6 text-[var(--text-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  )
}

function PortfolioIcon() {
  return iconBase('M4 7.5h16M7 4.5h10A2.5 2.5 0 0 1 19.5 7v10A2.5 2.5 0 0 1 17 19.5H7A2.5 2.5 0 0 1 4.5 17V7A2.5 2.5 0 0 1 7 4.5Z')
}

function InterfaceIcon() {
  return iconBase('M4.5 7A2.5 2.5 0 0 1 7 4.5h10A2.5 2.5 0 0 1 19.5 7v10A2.5 2.5 0 0 1 17 19.5H7A2.5 2.5 0 0 1 4.5 17V7Zm0 4.5h15M9 19.5v-8')
}

function StackIcon() {
  return iconBase('m12 4.5 7.5 4.25L12 13 4.5 8.75 12 4.5Zm7.5 8L12 16.75 4.5 12.5M19.5 16.25 12 20.5l-7.5-4.25')
}

function LaunchIcon() {
  return iconBase('m6 18 12-12M10 6h8v8M5 13.5v4A1.5 1.5 0 0 0 6.5 19h4')
}
