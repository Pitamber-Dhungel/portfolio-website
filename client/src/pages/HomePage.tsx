import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import About from '../components/about/About';
import Projects from '../components/projects/Projects';
import Experience from '../components/experience/Experience';
import Skills from '../components/skills/Skills';
import Contact from '../components/contact/Contact';
import GitHubStats from '../components/github/GitHubStats';

const HomePage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Pitamber Dhungel | MERN Stack Developer';
  }, []);

  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <GitHubStats />
      <Contact />
    </Layout>
  );
};

export default HomePage; 