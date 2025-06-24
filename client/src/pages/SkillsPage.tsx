import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Skills from '../components/skills/Skills';

const SkillsPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Skills | John Doe';
  }, []);

  return (
    <Layout>
      <div className="pt-16">
        <Skills />
      </div>
    </Layout>
  );
};

export default SkillsPage; 