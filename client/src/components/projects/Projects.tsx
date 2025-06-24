import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Project type definition
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

const Projects = () => {
  // Sample projects data
  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce platform with shopping cart, user authentication, product management, and payment processing.',
      image: 'https://via.placeholder.com/600x400',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/e-commerce',
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop interface, and team collaboration features.',
      image: 'https://via.placeholder.com/600x400',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/task-app',
    },
    {
      id: '3',
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media accounts with data visualization, engagement metrics, and content scheduling.',
      image: 'https://via.placeholder.com/600x400',
      tags: ['React', 'Chart.js', 'Node.js', 'Express'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/social-dashboard',
    },
    {
      id: '4',
      title: 'Real Estate Marketplace',
      description: 'Platform for buying, selling, and renting properties with advanced filtering, map integration, and messaging system.',
      image: 'https://via.placeholder.com/600x400',
      tags: ['React', 'MongoDB', 'Node.js', 'Express', 'Google Maps API'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/real-estate',
    },
    {
      id: '5',
      title: 'Weather Forecast App',
      description: 'Weather application that provides current conditions and 5-day forecasts with interactive maps and location search.',
      image: 'https://via.placeholder.com/600x400',
      tags: ['React', 'OpenWeather API', 'Tailwind CSS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/weather-app',
    },
    {
      id: '6',
      title: 'Fitness Tracking App',
      description: 'Personal fitness tracker with workout logging, progress visualization, and personalized workout recommendations.',
      image: 'https://via.placeholder.com/600x400',
      tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/fitness-tracker',
    },
  ];

  // All unique tags for filtering
  const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];
  
  // Filter state
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Filtered projects
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: { 
      y: 20, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            My Projects
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle"
          >
            Take a look at some of my featured work
          </motion.p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeFilter === tag
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={projectVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="card overflow-hidden group"
              >
                {/* Project image */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex space-x-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-full p-2 text-gray-900 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                        aria-label="GitHub Repository"
                      >
                        <FaGithub className="h-5 w-5" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-full p-2 text-gray-900 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                        aria-label="Live Demo"
                      >
                        <FaExternalLinkAlt className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more button (optional) */}
        {filteredProjects.length > 6 && (
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline"
            >
              View More Projects
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects; 