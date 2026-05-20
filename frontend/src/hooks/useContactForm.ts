import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { ContactForm } from '../types'

interface UseContactFormReturn {
  formData: ContactForm
  loading: boolean
  successMessage: string | null
  error: string | null
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent) => Promise<void>
  reset: () => void
}

const initialState: ContactForm = { name: '', email: '', message: '' }
const contactEmail = 'suryaprakash882578@gmail.com'

function openMailtoFallback(formData: ContactForm) {
  const subject = `Portfolio inquiry from ${formData.name}`
  const body = [`Name: ${formData.name}`, `Email: ${formData.email}`, '', formData.message].join('\n')
  const query = new URLSearchParams({ subject, body })

  window.location.href = `mailto:${contactEmail}?${query.toString()}`
}

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactForm>(initialState)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    }

    if (!payload.name || !payload.email || !payload.message) {
      setError('Please fill in your name, email, and project details.')
      return
    }

    setLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          _subject: `Portfolio inquiry from ${payload.name}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: payload.email,
        }),
      })

      let data: { message?: string } = {}

      try {
        data = await res.json()
      } catch {
        data = {}
      }

      if (!res.ok) {
        throw new Error(data.message || 'Unable to send the message automatically.')
      }

      setSuccessMessage("Thanks for reaching out. I'll get back to you soon.")
      setFormData(initialState)
    } catch (err) {
      try {
        openMailtoFallback(payload)
        setSuccessMessage('Your mail app opened with the message prefilled. Press send to complete the inquiry.')
        setFormData(initialState)
      } catch {
        setError(err instanceof Error ? err.message : `Unable to send the message. Please email me at ${contactEmail}.`)
      }
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setSuccessMessage(null)
    setError(null)
  }

  return { formData, loading, successMessage, error, handleChange, handleSubmit, reset }
}
