import { motion } from 'framer-motion';
import SkillsVisualization from './SkillsVisualization';

interface Skill {
  name: string;
  icon: string;
  level: number; // 1-5
  category: string;
  description: string;
}

const Skills = () => {
  // Skills data
  const skills: Skill[] = [
    // Frontend
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      level: 5,
      category: 'Frontend',
      description: 'Building interactive UIs with functional components and hooks'
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      level: 5,
      category: 'Frontend',
      description: 'ES6+, async/await, DOM manipulation'
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      level: 4,
      category: 'Frontend',
      description: 'Type-safe code with interfaces and generics'
    },
    {
      name: 'HTML5',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      level: 5,
      category: 'Frontend',
      description: 'Semantic markup and accessibility'
    },
    {
      name: 'CSS3',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      level: 5,
      category: 'Frontend',
      description: 'Flexbox, Grid, Animations, and Responsive design'
    },
    {
      name: 'Tailwind CSS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      level: 5,
      category: 'Frontend',
      description: 'Utility-first CSS framework for rapid UI development'
    },
    {
      name: 'Redux',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
      level: 4,
      category: 'Frontend',
      description: 'State management with Redux Toolkit'
    },
    
    // Backend
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      level: 5,
      category: 'Backend',
      description: 'Server-side JavaScript runtime'
    },
    {
      name: 'Express',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      level: 5,
      category: 'Backend',
      description: 'RESTful API development with middleware'
    },
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      level: 4,
      category: 'Backend',
      description: 'Schema design, aggregation, and indexing'
    },
    {
      name: 'Firebase',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      level: 4,
      category: 'Backend',
      description: 'Authentication, real-time database, and cloud functions'
    },
    {
      name: 'GraphQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
      level: 3,
      category: 'Backend',
      description: 'Query language for APIs'
    },
    
    // DevOps & Tools
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      level: 4,
      category: 'DevOps',
      description: 'Version control and collaboration'
    },
    {
      name: 'Docker',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      level: 3,
      category: 'DevOps',
      description: 'Containerization and deployment'
    },
    {
      name: 'AWS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      level: 3,
      category: 'DevOps',
      description: 'S3, EC2, Lambda, and CloudFront'
    },
    {
      name: 'Jest',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
      level: 4,
      category: 'DevOps',
      description: 'Unit and integration testing'
    }
  ];

  // Group skills by category
  const categories = [...new Set(skills.map(skill => skill.category))];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            Skills & Technologies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle"
          >
            Here are the tools and technologies I work with
          </motion.p>
        </div>

        <div className="space-y-16">
          {categories.map(category => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {category}
              </h3>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
              >
                {skills
                  .filter(skill => skill.category === category)
                  .map(skill => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 relative overflow-hidden flex flex-col items-center transition-all duration-300 border border-transparent hover:border-primary-200 dark:hover:border-primary-800"
                    >
                      {/* Top highlight bar, color intensity based on level */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600"
                      />
                      
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full mb-4">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="h-12 w-12"
                        />
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        {skill.name}
                      </h4>
                      
                      {/* Animated Skill level indicator */}
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Skills Visualization */}
        <SkillsVisualization skills={skills} />
      </div>
    </section>
  );
};

export default Skills;

 