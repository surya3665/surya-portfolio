import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skillGroups = [
  {
    category: 'Frontend',
    color: '#FF8A4C',
    icon: '🎨',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    color: '#4F46E5',
    icon: '⚙️',
    skills: ['Node.js', 'Express.js'],
  },
  {
    category: 'Database',
    color: '#10B981',
    icon: '🗄️',
    skills: ['MongoDB','MYSQL'],
  },
  {
    category: 'Tools & Other',
    color: '#F59E0B',
    icon: '🛠️',
    skills: ['Git', 'Postman', 'REST APIs'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 px-6 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#FF8A4C] text-sm font-semibold tracking-widest uppercase">Expertise</span>
          <h2 className="font-display text-4xl font-bold text-[#1F2937] mt-2">My Skills</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.1 + 0.2, duration: 0.5 }}
              className="bg-[#F9FAFB] rounded-3xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-5 shadow-md"
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