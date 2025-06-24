import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import apiService, { ContactFormData } from '../../utils/api';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Form status
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus('submitting');
    
    try {
      // Submit form data to API
      await apiService.submitContactForm(formData);
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setFormStatus('success');
      
      // Reset success status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  // Social links data
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/pitamber-dhungel',
      color: 'bg-[#0077B5]',
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/pitamberdhungel',
      color: 'bg-[#333]',
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/pitamberdhungel',
      color: 'bg-[#1DA1F2]',
    },
  ];

  // Contact info
  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'sumandhungel9@gmail.com',
      href: 'mailto:sumandhungel9@gmail.com',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+977 9843095670',
      href: 'tel:+9779843095670',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Imadol, Lalitpur, Nepal',
      href: 'https://maps.app.goo.gl/m9sd9YN76Gja2gCT7',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle"
          >
            Have a project in mind or want to chat? Send me a message!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="card p-8"
          >
            <motion.h3 
              variants={itemVariants} 
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Send me a message
            </motion.h3>

            <form onSubmit={handleSubmit}>
              <motion.div variants={itemVariants} className="mb-6">
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label 
                  htmlFor="subject" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`input ${errors.subject ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Project Inquiry"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`input ${errors.message ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Hi, I'd like to talk about..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn btn-primary w-full"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                
                {formStatus === 'success' && (
                  <p className="mt-4 text-sm text-green-600 dark:text-green-400">
                    Your message has been sent successfully! I'll get back to you soon.
                  </p>
                )}
                
                {formStatus === 'error' && (
                  <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                    There was an error sending your message. Please try again later.
                  </p>
                )}
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-between"
          >
            {/* Contact details */}
            <div>
              <motion.h3 
                variants={itemVariants} 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Contact Information
              </motion.h3>
              
              <div className="space-y-4 mb-8">
                {contactInfo.map((info, _) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="flex items-center group"
                    target={info.label === 'Location' ? '_blank' : undefined}
                    rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                  >
                    <div className="flex items-center justify-center bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                      <info.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {info.label}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <motion.h3 
                variants={itemVariants} 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Connect With Me
              </motion.h3>
              
              <div className="flex space-x-4 mb-8">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className={`${social.color} text-white p-3 rounded-full hover:opacity-80 transition-all duration-300`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map (optional) */}
            <motion.div 
              variants={itemVariants}
              className="rounded-lg overflow-hidden shadow-md h-64 mt-8 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              <a 
                href="https://maps.app.goo.gl/m9sd9YN76Gja2gCT7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center p-6"
              >
                <FaMapMarkerAlt className="text-primary-600 dark:text-primary-400 text-4xl mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">My Location</h3>
                <p className="text-gray-600 dark:text-gray-400">Imadol, Lalitpur, Nepal</p>
                <span className="mt-3 text-primary-600 dark:text-primary-400 underline">View on Google Maps</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 