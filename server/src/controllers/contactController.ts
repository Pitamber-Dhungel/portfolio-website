import { Request, Response } from 'express';
import Contact from '../models/Contact';
import sendEmail from '../utils/emailService';

/**
 * @desc   Submit a contact form
 * @route  POST /api/contact
 * @access Public
 */
export const submitContactForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
      return;
    }

    // Create contact entry in database
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Prepare email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Send notification email
    await sendEmail({
      to: 'sumandhungel9@gmail.com',
      subject: `New Contact: ${subject}`,
      html: emailContent,
      replyTo: email,
    });

    // Send confirmation email to the user
    await sendEmail({
      to: email,
      subject: 'Thank you for contacting us',
      html: `
        <h2>Thank you for contacting us</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Your message:</p>
        <blockquote>${message}</blockquote>
        <p>Best regards,</p>
        <p>Portfolio Team</p>
      `,
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
};

/**
 * @desc   Get all contact form submissions
 * @route  GET /api/contact
 * @access Private
 */
export const getContactSubmissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact submissions',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}; 