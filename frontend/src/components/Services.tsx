import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: '🌐',
    title: 'Web Development',
    description: 'Building fast, accessible, and visually stunning websites using modern frameworks and best practices.',
    color: '#FF8A4C',
  },
  {
    icon: '⚡',
    title: 'Full Stack Applications',
    description: 'End-to-end MERN stack applications with robust backend logic and beautiful frontend experiences.',
    color: '#4F46E5',
  },
  {
    icon: '🔗',
    title: 'REST API Development',
    description: 'Designing and building scalable, secure, and well-documented REST APIs using Node.js and Express.',
    color: '#10B981',
  },
  {
    icon: '📱',
    title: 'Responsive UI Development',
    description: 'Pixel-perfect responsive interfaces that look great on every device using React and TailwindCSS.',
    color: '#F59E0B',
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="services"
      className="py-24 px-6"
      style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #FFF0E8 100%)' }}
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#FF8A4C] text-sm font-semibold tracking-widest uppercase">What I Offer</span>
          <h2 className="font-display text-4xl font-bold text-[#1F2937] mt-2">Services</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            I help businesses and individuals build impactful digital products.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-3xl p-7 shadow-md border border-white hover:shadow-xl transition-all duration-300 cursor-default"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-md"
                style={{ background: `${service.color}15`, border: `1.5px solid ${service.color}30` }}
              >
                {service.icon}
              </div>
              <h3 className="font-display font-bold text-[#1F2937] text-base mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}