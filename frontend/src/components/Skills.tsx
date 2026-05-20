import { motion, useInView } from 'framer-motion'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const skillGroups = [
  {
    category: 'Frontend',
    color: '#FF8A4C',
    icon: '🎨',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'],
  },
  {
    category: 'UI Styling',
    color: '#4F46E5',
    icon: '⚙️',
    skills: ['Tailwind CSS', 'Responsive UI', 'Framer Motion', 'Glassmorphism'],
  },
  {
    category: 'Tools',
    color: '#10B981',
    icon: '🗄️',
    skills: ['Git', 'Postman', 'Vite', 'Figma'],
  },
  {
    category: 'Workflow',
    color: '#F59E0B',
    icon: '🛠️',
    skills: ['Performance', 'UI Polish', 'Accessibility', 'Deployment'],
  },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !ref.current) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-skill-card]',
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 78%',
          },
        },
      )
    }, ref)

    return () => context.revert()
  }, [])

  return (
    <section id="skills" className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:mb-16"
        >
          <span className="text-[#FF8A4C] text-sm font-semibold tracking-widest uppercase">Expertise</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-[#1F2937] sm:text-4xl">My Skills</h2>
          <p className="mx-auto mt-3 max-w-xl px-4 text-gray-400 sm:px-0">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              data-skill-card
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.1 + 0.2, duration: 0.5 }}
              whileHover={{ y: -10, rotate: gi % 2 === 0 ? -0.4 : 0.4 }}
              className="group rounded-3xl border border-gray-100 bg-[#F9FAFB] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >
              <div
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl text-xl shadow-md transition-transform duration-500 group-hover:rotate-[6deg] sm:h-12 sm:w-12"
                style={{ background: `${group.color}22`, border: `1.5px solid ${group.color}44` }}
              >
                {group.icon}
              </div>
              <h3
                className="font-display font-bold text-base mb-4"
                style={{ color: group.color }}
              >
                {group.category}
              </h3>
              <div className="flex flex-col gap-2">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: gi * 0.1 + si * 0.05 + 0.4, duration: 0.4 }}
                    className="flex items-center gap-2 text-gray-600 text-sm"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: group.color }}
                    />
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
