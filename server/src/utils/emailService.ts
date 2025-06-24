import nodemailer from 'nodemailer';

// Email data interface
interface EmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

/**
 * Send email using nodemailer
 * @param emailData - Email data including recipient, subject, and content
 * @returns Promise resolving to sending result
 */
const sendEmail = async (emailData: EmailData): Promise<any> => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'sumandhungel9@gmail.com',
        pass: process.env.EMAIL_PASS, // Make sure this is set in your environment variables
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Portfolio Contact" <sumandhungel9@gmail.com>',
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      replyTo: emailData.replyTo || undefined,
    });

    console.log(`Message sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendEmail; 