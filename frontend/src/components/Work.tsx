import { motion } from 'framer-motion'
import type { Project } from '../types/index'

interface ProjectExtended extends Project {
  emoji: string
  color: string
  colorLight: string
}

const projects: ProjectExtended[] = [
  {
    title: "Men's Cart",
    description:
      "A production-ready full-stack e-commerce application for men's fashion. Features user authentication with JWT, bcrypt password hashing, product search and category filtering with pagination, shopping cart, order placement, and a full admin dashboard to manage products, users, and orders. Images handled via Multer file upload — deployed on Vercel and Render.",
    tech: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS', 'Multer'],
    github: 'https://github.com/surya3665/Mens-Cart',
    live: 'https://mens-cart.vercel.app/register',
    emoji: '🛍️',
    color: '#FF8A4C',
    colorLight: '#FFF0E8',
  },
  {
    title: 'TalentPicker',
    description:
      'A production-ready job portal platform with role-based access for candidates, companies, and admins. Candidates browse and apply for jobs, companies post listings and manage applicants, and admins oversee the entire platform. Built with JWT auth, 20+ RESTful API endpoints, resume uploads, and real-time application tracking — deployed on Vercel and Render.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS', 'REST API'],
    github: 'https://github.com/surya3665/TalentPicker',
    live: 'https://talent-picker.vercel.app/admin',
    emoji: '💼',
    color: '#4F46E5',
    colorLight: '#EEF2FF',
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'A modern, responsive portfolio website built with Vite + React, TypeScript, TailwindCSS, and Framer Motion. Features smooth scroll animations, a contact form backed by a Node.js + MongoDB API, fully responsive design with a clean pastel gradient aesthetic.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Node.js', 'MongoDB'],
    github: 'https://github.com/surya3665',
    live: '#',
    emoji: '🌐',
    color: '#10B981',
    colorLight: '#ECFDF5',
  },
]

const viewport = { once: true, margin: '-80px' }

export default function Work() {
  return (
    <section
      id="work"
      style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FFF0E8 60%, #EEF2FF 100%)' }}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#FF8A4C] text-sm font-semibold tracking-widest uppercase">Portfolio</span>
          <h2 className="font-display text-4xl font-bold text-[#1F2937] mt-2">My Work</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            A selection of projects I've built using the MERN stack and modern web technologies.
          </p>
        </motion.div>

        {/* Top row — 2 featured projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {projects.slice(0, 2).map((project, i) => (
            <ProjectCard key={project.title} project={project} i={i} />
          ))}
        </div>

        {/* Bottom row — centered */}
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            {projects.slice(2).map((project, i) => (
              <ProjectCard key={project.title} project={project} i={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, i }: { project: ProjectExtended; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* Card header */}
      <div
        className="h-40 flex items-center justify-center text-6xl relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.colorLight}, ${project.color}22)` }}
      >
        <span
          className="emoji-float"
          style={{
            display: 'inline-block',
            animation: `floatEmoji 3s ease-in-out ${i * 0.5}s infinite`,
          }}
        >
          {project.emoji}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
      </div>

      <div className="p-7">
        <h3 className="font-display text-xl font-bold text-[#1F2937] mb-3 group-hover:text-[#FF8A4C] transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-semibold px-3 py-1 rounded-lg border"
              style={{
                background: `${project.color}10`,
                color: project.color,
                borderColor: `${project.color}30`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 items-center">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#FF8A4C] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          {project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-white px-4 py-1.5 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: project.color }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}