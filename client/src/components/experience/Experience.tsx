import { motion } from 'framer-motion';
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

// Experience type definition
interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string[];
  type: 'work' | 'education';
}

const Experience = () => {
  // Experience data
  const experiences: ExperienceItem[] = [
    {
      id: '1',
      title: 'Web Development Project',
      company: 'University Course Project',
      location: 'Tribhuvan University',
      date: 'Jan 2023 - Apr 2023',
      description: [
        'Developed a responsive e-commerce website using HTML, CSS, and JavaScript',
        'Implemented user authentication and shopping cart functionality',
        'Designed and integrated with a backend API for product management',
        'Received an A grade for implementation and documentation'
      ],
      type: 'work',
    },
    {
      id: '2',
      title: 'Database Management System',
      company: 'Academic Project',
      location: 'Kathmandu, Nepal',
      date: 'Aug 2022 - Dec 2022',
      description: [
        'Created a database system for a local business using MySQL',
        'Designed entity-relationship diagrams and normalized database structure',
        'Built a basic frontend interface using PHP for data entry and retrieval',
        'Implemented data validation and error handling techniques'
      ],
      type: 'work',
    },
    {
      id: '3',
      title: 'IT Volunteer',
      company: 'Local Community Center',
      location: 'Lalitpur, Nepal',
      date: 'May 2022 - Aug 2022',
      description: [
        'Assisted with basic computer training for community members',
        'Helped maintain and troubleshoot computer systems',
        'Created simple websites for community events',
        'Provided technical support for digital literacy programs'
      ],
      type: 'work',
    },
    {
      id: '4',
      title: 'Bachelor of Information Management',
      company: 'Tribhuvan University',
      location: 'New Baneshwor, Kathmandu',
      date: 'Apr 2022 - Apr 2026 (Expected)',
      description: [
        'Currently pursuing Bachelor of Information Management',
        'Focusing on modern web development technologies',
        'Gaining skills in software development and project management',
        'Actively seeking job opportunities in the tech industry'
      ],
      type: 'education',
    },
  ];

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            Experience & Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle"
          >
            My professional journey and qualifications
          </motion.p>
        </div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto relative"
        >
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex flex-col md:flex-row`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 flex items-center justify-center">
                <div className="rounded-full border-4 border-white dark:border-gray-900 bg-primary-500 h-8 w-8 flex items-center justify-center z-10">
                  {exp.type === 'work' ? (
                    <BriefcaseIcon className="h-4 w-4 text-white" />
                  ) : (
                    <AcademicCapIcon className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div
                className={`w-full md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                } relative mt-8 md:mt-0`}
              >
                <div className="card p-6 hover:shadow-lg transition-shadow duration-300">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 mb-4">
                    {exp.date}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <div className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {exp.company}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {exp.location}
                  </div>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block h-1.5 w-1.5 bg-primary-500 rounded-full mt-2 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 