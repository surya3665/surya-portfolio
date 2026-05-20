import { motion } from 'framer-motion'

const particles = [
  { left: '8%', top: '18%', size: 10, delay: 0.2 },
  { left: '20%', top: '72%', size: 14, delay: 0.7 },
  { left: '38%', top: '14%', size: 8, delay: 0.4 },
  { left: '62%', top: '68%', size: 12, delay: 1.1 },
  { left: '80%', top: '24%', size: 16, delay: 0.9 },
  { left: '90%', top: '74%', size: 9, delay: 0.5 },
]

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/45 bg-[linear-gradient(140deg,rgba(252,231,225,0.92),rgba(220,239,253,0.92),rgba(246,165,122,0.68))] px-8 py-16 shadow-[var(--shadow-soft)] sm:px-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.58),transparent_54%)]" />
        {particles.map((particle) => (
          <motion.span
            key={`${particle.left}-${particle.top}`}
            className="absolute rounded-full bg-white/55 blur-[1px]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ y: [0, -22, 0], opacity: [0.45, 0.9, 0.45] }}
            transition={{
              duration: 4.2,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span className="section-kicker mx-auto">Premium Product Presence</span>
          <h2 className="section-title mt-6">
            Ready to turn your next idea into a polished, modern digital experience?
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            From portfolio storytelling to full-stack product launches, I design and build soft, immersive
            interfaces that feel calm, premium, and conversion-ready.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="primary-button justify-center px-7 py-4 text-sm sm:text-base"
            >
              Start a Conversation
            </motion.a>
            <motion.a
              href="mailto:suryaprakash882578@gmail.com"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="secondary-button justify-center px-7 py-4 text-sm sm:text-base"
            >
              Email Me Directly
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
