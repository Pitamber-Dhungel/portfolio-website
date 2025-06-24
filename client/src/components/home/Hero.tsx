import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
import { ArrowDownIcon, DocumentArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 -z-10" />
      
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 dark:bg-primary-900/20 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary-200 dark:bg-secondary-900/20 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="block">Hi, I'm</span>
                <span className="text-primary-600 dark:text-primary-400">Pitamber Dhungel</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium mb-6">
              <Typewriter
                options={{
                  strings: [
                    'MERN Stack Developer',
                    'Full-Stack Engineer',
                    'UI/UX Enthusiast',
                    'Problem Solver'
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              I build stunning, high-performance web applications with modern technologies.
              Specialized in creating seamless user experiences with React, Node.js, and MongoDB.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/projects" className="btn btn-primary">
                View Projects
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <a 
                href="/resume.pdf" 
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
                <DocumentArrowDownIcon className="ml-2 h-5 w-5" />
              </a>
              <Link to="/contact" className="btn btn-secondary">
                Hire Me
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image/Animation */}
          <motion.div 
            className="flex-1 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative mx-auto w-fit">
              {/* Replace with your profile image or a Lottie animation */}
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full p-1">
                <div className="bg-white dark:bg-gray-900 rounded-full p-2">
                  <img 
                    src="/suman.jpeg" 
                    alt="Profile" 
                    className="rounded-full h-72 w-72 object-cover"
                  />
                </div>
              </div>
              
              {/* Floating badges */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="h-8 w-8" />
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="h-8 w-8" />
              </motion.div>
              
              <motion.div
                className="absolute right-0 bottom-10 -translate-x-1/3 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="h-8 w-8" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
          <ArrowDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 