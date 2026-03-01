import type { Request, Response } from 'express'
import { Contact } from '../models/Contact'

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body as { name?: unknown; email?: unknown; message?: unknown }

    // Basic presence validation
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message',
      })
      return
    }

    const contact = await Contact.create({ name, email, message })

    res.status(201).json({
      success: true,
      message: 'Your message has been received. I will get back to you shortly!',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt,
      },
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: error.message,
      })
      return
    }

    console.error('Contact controller error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
    })
  }
}

export const getContacts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}