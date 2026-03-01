import { useState, ChangeEvent, FormEvent } from 'react'
import type { ContactForm } from '../types'

interface UseContactFormReturn {
  formData: ContactForm
  loading: boolean
  success: boolean
  error: string | null
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent) => Promise<void>
  reset: () => void
}

const initialState: ContactForm = { name: '', email: '', message: '' }

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactForm>(initialState)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('https://surya-portfolio-qjzl.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      setSuccess(true)
      setFormData(initialState)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setSuccess(false)
    setError(null)
  }

  return { formData, loading, success, error, handleChange, handleSubmit, reset }
}