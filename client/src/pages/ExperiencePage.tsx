import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Experience from '../components/experience/Experience';

const ExperiencePage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Experience | John Doe';
  }, []);

  return (
    <Layout>
      <div className="pt-16">
        <Experience />
      </div>
    </Layout>
  );
};

export default ExperiencePage; 