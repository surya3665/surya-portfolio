import Hero from '../components/Hero'
import About from '../components/About'
import Work from '../components/Work'
import Skills from '../components/Skills'
import Services from '../components/Services'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Skills />
      <Services />
      <Contact />
    </main>
  )
}