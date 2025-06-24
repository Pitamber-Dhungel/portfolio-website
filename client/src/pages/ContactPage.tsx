import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Contact from '../components/contact/Contact';

const ContactPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Contact | John Doe';
  }, []);

  return (
    <Layout>
      <div className="pt-16">
        <Contact />
      </div>
    </Layout>
  );
};

export default ContactPage; 