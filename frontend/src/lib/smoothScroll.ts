import type Lenis from 'lenis'

let lenisInstance: Lenis | null = null

function defaultEasing(value: number) {
  return Math.min(1, 1.001 - Math.pow(2, -10 * value))
}

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance
}

export function smoothScrollTo(target: string | number | HTMLElement, offset = -92) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration: 1.35,
      offset: typeof target === 'number' ? 0 : offset,
      easing: defaultEasing,
    })
    return
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }

  if (typeof target === 'string') {
    const element = document.querySelector(target)

    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
