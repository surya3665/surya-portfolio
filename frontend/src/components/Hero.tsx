import { motion } from 'framer-motion'
import profile from '../assets/profile.png'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center"
      style={{
        background: 'linear-gradient(135deg, #F9FAFB 0%, #FFF0E8 40%, #EEF2FF 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#FF8A4C]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-[#4F46E5]/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left */}
        <div>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-[#FF8A4C]/10 text-[#FF8A4C] text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF8A4C] animate-pulse" />
            Available for Work
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl md:text-6xl font-extrabold text-[#1F2937] leading-tight mb-4"
          >
            Hi, I'm{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #FF8A4C, #4F46E5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Surya Prakash J
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display text-2xl font-semibold text-[#4F46E5] mb-4"
          >
            MERN Stack Developer
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg"
          >
            I build scalable and modern web applications. Passionate about crafting clean, performant, and beautiful digital experiences.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#FF8A4C] text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:bg-[#e07a3f] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-[#1F2937] text-[#1F2937] px-8 py-3.5 rounded-xl font-semibold hover:border-[#FF8A4C] hover:text-[#FF8A4C] transition-all duration-300"
            >
              Contact Me
            </button>
          </motion.div>

          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex gap-6 mt-10"
          >
            {[
              { label: 'Projects', value: '3+' },
              { label: 'Technologies', value: '10+' },
              { label: 'Experience', value: '1Y' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl font-bold text-[#FF8A4C]">{s.value}</p>
                <p className="text-gray-400 text-xs">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Avatar placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="flex justify-center items-center"
        >
          <div className="relative">
            <div
              className="w-72 h-72 md:w-96 md:h-96 rounded-3xl shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF8A4C22, #4F46E522)',
                border: '3px solid #FF8A4C30',
              }}
            >
              {/* Profile placeholder */}
              <div
                className="w-72 h-72 md:w-96 md:h-96 rounded-3xl shadow-2xl overflow-hidden"
                style={{
                  border: '3px solid #FF8A4C30',
                }}
              >
                <img
                  src={profile}
                  alt="Surya Prakash J"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2"
            >
              <span className="text-xl">⚛️</span>
              <span className="font-semibold text-sm text-[#1F2937]">React</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2"
            >
              <span className="text-xl">🟢</span>
              <span className="font-semibold text-sm text-[#1F2937]">Node.js</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400">Scroll down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center pt-1"
        >
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}