import { Router } from 'express'
import { createContact, getContacts } from '../controllers/contact.controller'

const router = Router()

/**
 * @route   POST /api/contact
 * @desc    Submit a contact message
 * @access  Public
 */
router.post('/', createContact)

/**
 * @route   GET /api/contact
 * @desc    Get all contact messages (admin use)
 * @access  Private (no auth for now — protect in production)
 */
router.get('/', getContacts)

export default router