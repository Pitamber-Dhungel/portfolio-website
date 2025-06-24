import { motion } from 'framer-motion';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const About = () => {
  // Skills data
  const skills = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg' },
      ],
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      ],
    },
    {
      category: 'Tools & DevOps',
      technologies: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      ],
    },
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle"
          >
            Get to know more about me and my expertise
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Personal story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              My Story
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Hi there! I'm Pitamber Dhungel, a passionate MERN stack developer with over 5 years of experience
                building modern web applications that solve real-world problems.
              </p>
              <p>
                My journey began when I built my first website in college, and I've been hooked ever since.
                I've worked on a variety of projects—from small business websites to complex enterprise applications—always
                striving to create intuitive user experiences with clean, maintainable code.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source
                projects, or hiking with my dog. I'm constantly learning and pushing myself to stay
                at the forefront of web development.
              </p>
              <div className="mt-6">
                <a
                  href="/resume.pdf"
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                  <DocumentArrowDownIcon className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 lg:ml-6"
            >
              My Skills
            </motion.h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {skills.map((skillGroup) => (
                <motion.div key={skillGroup.category} variants={itemVariants} className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 lg:ml-6">
                    {skillGroup.category}
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {skillGroup.technologies.map((tech) => (
                      <motion.div
                        key={tech.name}
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                      >
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="h-8 w-8 mb-2"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 