import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionWrapper from './SectionWrapper'

const stats = [
  { label: 'Degree', value: 'M.Com', sub: '2024' },
  { label: 'Degree', value: 'B.Com', sub: '2022' },
  { label: 'Certified', value: 'MERN', sub: 'Stack Dev' },
]

const languages = ['English', 'Tamil', 'Telugu']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const fadeUp = (i: number) => ({
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } },
  })

  return (
    <SectionWrapper
      id="about"
      className="py-24 px-6"
      style={{ background: '#FFFFFF' } as React.CSSProperties}
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="text-[#FF8A4C] text-sm font-semibold tracking-widest uppercase">About Me</span>
          <h2 className="font-display text-4xl font-bold text-[#1F2937] mt-2">Who I Am</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            variants={fadeUp(1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              A motivated MERN stack developer with strong skills in JavaScript, React, Node.js, and MongoDB.
              Seeking to leverage my knowledge and hands-on project experience to contribute effectively to a
              dynamic development team.
            </p>

            {/* Languages */}
            <h3 className="font-display font-semibold text-[#1F2937] mb-4 text-lg">Languages</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-[#F9FAFB] border border-gray-200 text-gray-600 px-4 py-1.5 rounded-xl text-sm font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* Certification */}
            <div className="bg-gradient-to-r from-[#FF8A4C]/10 to-[#4F46E5]/10 rounded-2xl p-5 border border-[#FF8A4C]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF8A4C] flex items-center justify-center text-white text-lg">🏅</div>
                <div>
                  <p className="font-semibold text-[#1F2937]">MERN Stack Certification</p>
                  <p className="text-gray-400 text-sm">Full Stack Web Development</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Stat cards */}
          <div className="grid grid-cols-1 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={`${stat.value}-${i}`}
                variants={fadeUp(i + 2)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="bg-[#F9FAFB] rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF8A4C] to-[#e07a3f] flex items-center justify-center text-white font-display font-bold text-lg shadow-md">
                  {stat.value.slice(0, 2)}
                </div>
                <div>
                  <p className="font-display font-bold text-xl text-[#1F2937]">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label} · {stat.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}