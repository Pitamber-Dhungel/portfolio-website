import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  // Social links
  const socialLinks = [
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com/Pitamber-Dhungel' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/pitamber-dhungel-aba79b296/' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://x.com/Pain918493' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 opacity-5"></div>
      
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand and description */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-bold">
                <span className="text-primary-600 dark:text-primary-400">Dhungel</span>
                <span className="text-gray-900 dark:text-white">Portfolio</span>
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
              A passionate MERN stack developer creating modern, responsive web applications
              with a focus on user experience and performance.
            </p>
            
            {/* CTA Button */}
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-sm transition-colors duration-300"
            >
              Let's Connect
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-4 md:mt-0">
            <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="mt-4 md:mt-0">
            <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-6">Connect</h3>
            <div className="flex space-x-5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-gray-700 p-4 rounded-full transition-colors duration-300 shadow-sm"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Dhungel Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 