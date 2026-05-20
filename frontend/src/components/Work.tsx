import { AnimatePresence, motion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

interface PortfolioProject {
  title: string
  description: string
  tags: string[]
  tech: string[]
  github: string
  live: string
  year: string
  previewHeight: string
  accent: string
  gradient: string
  showcase: string[]
}

const filters = ['All', 'Commerce', 'Platform', 'Brand']

const projects: PortfolioProject[] = [
  {
    title: "Men's Cart",
    description:
      "A modern e-commerce experience for men's fashion with product discovery, category browsing, cart flow, order placement, and a clean admin-facing dashboard for managing the catalog.",
    tags: ['Commerce'],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Responsive UI', 'Component Design'],
    github: 'https://github.com/surya3665/Mens-Cart',
    live: 'https://mens-cart.vercel.app/register',
    year: '2025',
    previewHeight: 'min-h-[24rem]',
    accent: '#F6A57A',
    gradient: 'linear-gradient(160deg, rgba(246,165,122,0.96) 0%, rgba(252,231,225,0.94) 58%, rgba(255,255,255,0.82) 100%)',
    showcase: ['Editorial product cards', 'Checkout clarity', 'Admin oversight'],
  },
  {
    title: 'TalentPicker',
    description:
      'A polished job platform where candidates browse and apply for roles, companies manage listings, and admins oversee the experience through structured dashboards and streamlined application flows.',
    tags: ['Platform'],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Dashboard UI', 'Responsive Design'],
    github: 'https://github.com/surya3665/TalentPicker',
    live: 'https://talent-picker.vercel.app/admin',
    year: '2025',
    previewHeight: 'min-h-[28rem]',
    accent: '#9FCFF5',
    gradient: 'linear-gradient(160deg, rgba(220,239,253,0.98) 0%, rgba(159,207,245,0.84) 52%, rgba(255,255,255,0.82) 100%)',
    showcase: ['Role-based dashboards', 'Live application states', 'Operational control'],
  },
  {
    title: 'Portfolio Experience',
    description:
      'A modern, responsive portfolio website built with Vite + React, TypeScript, TailwindCSS, and Framer Motion. Features smooth scroll animations, a direct email contact form, fully responsive design with a clean pastel gradient aesthetic.',
    tags: ['Brand'],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/surya3665/surya-portfolio',
    live: '#contact',
    year: '2026',
    previewHeight: 'min-h-[22rem]',
    accent: '#E8B2A3',
    gradient: 'linear-gradient(160deg, rgba(252,231,225,0.98) 0%, rgba(247,244,243,0.94) 48%, rgba(220,239,253,0.88) 100%)',
    showcase: ['Parallax hero', 'Glass UI layers', 'Direct email delivery'],
  },
]

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useRef<HTMLElement | null>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((project) => project.tags.includes(activeFilter))

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !sectionRef.current) {
      return undefined
    }

    const cards = cardRefs.current.filter((card): card is HTMLElement => Boolean(card))

    const context = gsap.context(() => {
      cards.forEach((card, index) => {
        const preview = card.querySelector('[data-project-preview]')

        gsap.fromTo(
          card,
          { opacity: 0, y: 34, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            delay: index * 0.06,
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
            },
          },
        )

        if (preview) {
          gsap.to(preview, {
            yPercent: -8 - index * 2,
            rotate: index % 2 === 0 ? -1.2 : 1.2,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.15,
            },
          })
        }
      })
    }, sectionRef)

    return () => context.revert()
  }, [filteredProjects])

  return (
    <section ref={sectionRef} id="work" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="section-kicker mx-auto">Portfolio</span>
          <h2 className="section-title mt-6">My Work</h2>
          <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            A selection of projects I&apos;ve built using modern web technologies.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`filter-button relative overflow-hidden ${activeFilter === filter ? 'filter-button-active' : ''}`}
            >
              {activeFilter === filter && (
                <motion.span
                  layoutId="work-filter-pill"
                  className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(246,165,122,0.26),rgba(221,239,252,0.3))]"
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 columns-1 gap-6 md:columns-2 xl:columns-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                registerCard={(element, cardIndex) => {
                  cardRefs.current[cardIndex] = element
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  registerCard,
}: {
  project: PortfolioProject
  index: number
  registerCard: (element: HTMLElement | null, index: number) => void
}) {
  return (
    <motion.article
      ref={(element) => registerCard(element, index)}
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
      whileHover={{ y: -10 }}
      className="mb-6 break-inside-avoid overflow-hidden rounded-[34px] border border-[var(--line)] bg-[color:var(--surface-strong)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl"
    >
      <div
        data-project-preview
        className={`group relative overflow-hidden rounded-[28px] p-5 will-change-transform ${project.previewHeight}`}
        style={{ background: project.gradient }}
      >
        <div className="absolute inset-0 scale-100 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.76),transparent_46%)] transition-transform duration-700 group-hover:scale-110" />

        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
            </div>
            <span className="rounded-full border border-white/45 bg-white/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-primary)] backdrop-blur-xl">
              {project.year}
            </span>
          </div>

          <div className="space-y-3">
            {project.showcase.map((item) => (
              <div
                key={item}
                className="rounded-[22px] border border-white/45 bg-white/28 px-4 py-3 text-sm font-medium text-[var(--text-primary)] shadow-[0_14px_24px_rgba(31,31,31,0.06)] backdrop-blur-2xl"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-[24px] border border-white/45 bg-white/38 p-4 backdrop-blur-2xl">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-secondary)]">
                Project direction
              </p>
              <p className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                {project.tags[0]}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/55 bg-white/58 text-[var(--text-primary)] transition-transform duration-500 group-hover:rotate-6">
              <ArrowUpRightIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 pt-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{
                borderColor: `${project.accent}80`,
                background: `${project.accent}1F`,
                color: 'var(--text-primary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--line)] bg-white/55 px-3 py-1 text-xs text-[var(--text-secondary)] dark:bg-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-button px-4 py-3 text-sm"
          >
            GitHub
          </a>
          <a
            href={project.live}
            target={project.live.startsWith('http') ? '_blank' : undefined}
            rel={project.live.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="primary-button px-4 py-3 text-sm"
          >
            {project.live.startsWith('http') ? 'Live Preview' : 'See Contact Flow'}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}
