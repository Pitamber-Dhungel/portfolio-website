import express from 'express';
import { submitContactForm, getContactSubmissions } from '../controllers/contactController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// Public route for submitting contact form
router.post('/', submitContactForm);

// Protected route for getting all contact submissions
router.get('/', protect, getContactSubmissions);

export default router; 