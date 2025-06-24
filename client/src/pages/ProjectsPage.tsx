import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Projects from '../components/projects/Projects';

const ProjectsPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Projects | John Doe';
  }, []);

  return (
    <Layout>
      <div className="pt-16">
        <Projects />
      </div>
    </Layout>
  );
};

export default ProjectsPage; 