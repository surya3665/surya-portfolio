import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '../lib/gsap'
import { setLenisInstance } from '../lib/smoothScroll'

function easing(value: number) {
  return Math.min(1, 1.001 - Math.pow(2, -10 * value))
}

export function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

    if (reduceMotion || isTouchDevice) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.28,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.08,
      wheelMultiplier: 0.92,
      lerp: 0.08,
      easing,
    })

    setLenisInstance(lenis)

    let rafId = 0

    const update = (time: number) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(update)
    }

    lenis.on('scroll', ScrollTrigger.update)
    rafId = window.requestAnimationFrame(update)

    const handleResize = () => lenis.resize()
    window.addEventListener('resize', handleResize)
    ScrollTrigger.refresh()

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      lenis.destroy()
      setLenisInstance(null)
    }
  }, [])
}
