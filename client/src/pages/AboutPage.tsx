import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import About from '../components/about/About';

const AboutPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'About Me | John Doe';
  }, []);

  return (
    <Layout>
      <div className="pt-16">
        <About />
      </div>
    </Layout>
  );
};

export default AboutPage; 