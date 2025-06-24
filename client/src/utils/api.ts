import axios from 'axios';

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://pitamberdhungel.com.np/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contact form type
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// API services
const apiService = {
  // Submit contact form
  submitContactForm: async (formData: ContactFormData) => {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
};

export default apiService; 