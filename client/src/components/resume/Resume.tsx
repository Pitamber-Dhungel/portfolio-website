import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaPrint, FaGraduationCap, FaBriefcase, FaCode, FaAward, FaUserTie } from 'react-icons/fa';

const Resume = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setTimeout(() => setIsPrinting(false), 1000);
  };

  // Resume data can be moved to a separate file or fetched from an API
  const resumeData = {
    name: "Pitamber Dhungel",
    title: "MERN Stack Developer",
    contactInfo: {
      email: "pitamber@email.com",
      phone: "+1 123-456-7890",
      location: "Kathmandu, Nepal",
      website: "https://pitamberdhungel.com",
      github: "https://github.com/Pitamber-Dhungel",
      linkedin: "https://linkedin.com/in/pitamber-dhungel"
    },
    summary: "Experienced MERN Stack Developer with a passion for creating responsive, user-friendly web applications. Proficient in React, Node.js, Express, and MongoDB. Strong background in front-end development with a focus on clean, maintainable code and modern development practices.",
    experience: [
      {
        id: 1,
        title: "Senior MERN Stack Developer",
        company: "Tech Innovations",
        location: "Kathmandu, Nepal",
        period: "Jan 2021 - Present",
        description: "Lead developer for enterprise web applications using React, Node.js, Express, and MongoDB. Implemented CI/CD pipelines and mentored junior developers.",
        achievements: [
          "Reduced page load time by 40% through code optimization and implementing lazy loading",
          "Architected and built a scalable e-commerce platform serving 10,000+ daily users",
          "Implemented automated testing, achieving 90% code coverage"
        ]
      },
      {
        id: 2,
        title: "Full Stack Developer",
        company: "Digital Solutions",
        location: "Kathmandu, Nepal",
        period: "Mar 2019 - Dec 2020",
        description: "Developed web applications using React and Node.js. Collaborated with design and product teams to implement features and fix bugs.",
        achievements: [
          "Built custom CMS solution for content management",
          "Integrated multiple third-party APIs for payment processing and data analysis",
          "Implemented responsive designs for mobile and desktop platforms"
        ]
      },
      {
        id: 3,
        title: "Front-end Developer",
        company: "WebCreations",
        location: "Kathmandu, Nepal",
        period: "Jun 2017 - Feb 2019",
        description: "Created responsive UIs using HTML, CSS, and JavaScript. Worked with jQuery and vanilla JavaScript to build interactive features.",
        achievements: [
          "Developed 15+ websites for various clients in different industries",
          "Improved site accessibility to meet WCAG 2.1 standards",
          "Created reusable component library to speed up development"
        ]
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Computer Science",
        institution: "Kathmandu University",
        location: "Kathmandu, Nepal",
        period: "2013 - 2017",
        gpa: "3.8/4.0",
        description: "Focus on web technologies and software engineering. President of the Computer Science Club."
      },
      {
        id: 2,
        degree: "Web Development Bootcamp",
        institution: "Code Academy",
        location: "Online",
        period: "2017",
        description: "Intensive 12-week program focused on full-stack JavaScript development."
      }
    ],
    skills: {
      technical: [
        "React.js", "Node.js", "Express", "MongoDB", "JavaScript (ES6+)",
        "TypeScript", "HTML5", "CSS3/SCSS", "Redux", "REST API Design",
        "GraphQL", "Jest/React Testing Library", "Git", "Docker", "AWS"
      ],
      soft: [
        "Problem Solving", "Team Leadership", "Communication", "Project Management",
        "Agile Methodologies", "Time Management", "Critical Thinking"
      ]
    },
    languages: [
      { name: "English", proficiency: "Professional" },
      { name: "Nepali", proficiency: "Native" },
      { name: "Hindi", proficiency: "Fluent" }
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Developer - Associate",
        issuer: "Amazon Web Services",
        date: "2022"
      },
      {
        id: 2,
        name: "MongoDB Certified Developer",
        issuer: "MongoDB, Inc.",
        date: "2021"
      },
      {
        id: 3,
        name: "Professional Scrum Master I (PSM I)",
        issuer: "Scrum.org",
        date: "2020"
      }
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Full-stack e-commerce application with product management, cart functionality, and payment processing.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"]
      },
      {
        id: 2,
        title: "Task Management System",
        description: "Collaborative task management tool with real-time updates and team collaboration features.",
        technologies: ["React", "Redux", "Node.js", "Socket.io", "MongoDB"]
      }
    ]
  };

  return (
    <section id="resume" className={`py-20 ${isPrinting ? 'print-mode' : 'bg-gray-50 dark:bg-gray-900'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 print:px-0 print:max-w-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12 print:hidden"
        >
          <h2 className="section-title">Resume</h2>
          <p className="section-subtitle">
            My professional journey and qualifications
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <a
              href="/resume.pdf"
              download="Pitamber_Dhungel_Resume.pdf"
              className="btn-primary flex items-center"
            >
              <FaDownload className="mr-2" /> Download PDF
            </a>
            <button
              onClick={handlePrint}
              className="btn-secondary flex items-center"
            >
              <FaPrint className="mr-2" /> Print Resume
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden print:shadow-none print:rounded-none print:max-w-none print:bg-white print:dark:bg-white print:text-black"
        >
          <div className="p-8 print:p-4">
            {/* Header */}
            <div className="text-center mb-8 print:mb-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white print:text-black">{resumeData.name}</h1>
              <p className="text-xl text-primary-600 dark:text-primary-400 print:text-gray-800 mt-1">{resumeData.title}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400 print:text-gray-700">
                <div>{resumeData.contactInfo.email}</div>
                <div>{resumeData.contactInfo.phone}</div>
                <div>{resumeData.contactInfo.location}</div>
                <div>{resumeData.contactInfo.website}</div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8 print:mb-4">
              <div className="flex items-center mb-4 print:mb-2">
                <FaUserTie className="text-primary-600 dark:text-primary-400 print:text-gray-800 text-xl mr-2" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white print:text-black">Professional Summary</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 print:text-black">{resumeData.summary}</p>
            </div>

            {/* Experience */}
            <div className="mb-8 print:mb-4">
              <div className="flex items-center mb-4 print:mb-2">
                <FaBriefcase className="text-primary-600 dark:text-primary-400 print:text-gray-800 text-xl mr-2" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white print:text-black">Work Experience</h2>
              </div>
              <div className="space-y-6 print:space-y-3">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="print:page-break-inside-avoid">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white print:text-black">{exp.title}</h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400 print:text-gray-700">{exp.period}</span>
                    </div>
                    <p className="text-primary-600 dark:text-primary-400 print:text-gray-800 mb-1">{exp.company}, {exp.location}</p>
                    <p className="text-gray-700 dark:text-gray-300 print:text-black mb-2">{exp.description}</p>
                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 print:text-black text-sm">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8 print:mb-4">
              <div className="flex items-center mb-4 print:mb-2">
                <FaGraduationCap className="text-primary-600 dark:text-primary-400 print:text-gray-800 text-xl mr-2" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white print:text-black">Education</h2>
              </div>
              <div className="space-y-4 print:space-y-2">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="print:page-break-inside-avoid">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white print:text-black">{edu.degree}</h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400 print:text-gray-700">{edu.period}</span>
                    </div>
                    <p className="text-primary-600 dark:text-primary-400 print:text-gray-800 mb-1">{edu.institution}, {edu.location}</p>
                    {edu.gpa && <p className="text-sm text-gray-700 dark:text-gray-300 print:text-black mb-1">GPA: {edu.gpa}</p>}
                    <p className="text-gray-700 dark:text-gray-300 print:text-black">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8 print:mb-4">
              <div className="flex items-center mb-4 print:mb-2">
                <FaCode className="text-primary-600 dark:text-primary-400 print:text-gray-800 text-xl mr-2" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white print:text-black">Skills</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white print:text-black mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.technical.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 dark:bg-gray-700 print:bg-gray-100 print:text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white print:text-black mb-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.soft.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 dark:bg-gray-700 print:bg-gray-100 print:text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-8 print:mb-4">
              <div className="flex items-center mb-4 print:mb-2">
                <FaAward className="text-primary-600 dark:text-primary-400 print:text-gray-800 text-xl mr-2" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white print:text-black">Certifications</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
                {resumeData.certifications.map((cert) => (
                  <div 
                    key={cert.id} 
                    className="bg-gray-50 dark:bg-gray-700/50 print:bg-white print:border print:border-gray-200 p-3 rounded-lg"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white print:text-black">{cert.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 print:text-gray-700">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-8 print:mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white print:text-black mb-4 print:mb-2">Languages</h2>
              <div className="flex flex-wrap gap-6 print:gap-4">
                {resumeData.languages.map((language, index) => (
                  <div key={index} className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white print:text-black mr-2">{language.name}:</span>
                    <span className="text-gray-600 dark:text-gray-400 print:text-gray-700">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white print:text-black mb-4 print:mb-2">Notable Projects</h2>
              <div className="space-y-4 print:space-y-2">
                {resumeData.projects.map((project) => (
                  <div key={project.id} className="print:page-break-inside-avoid">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white print:text-black">{project.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 print:text-black mb-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 text-sm">
                      <span className="text-gray-600 dark:text-gray-400 print:text-gray-700">Technologies:</span>
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="text-primary-600 dark:text-primary-400 print:text-gray-800">
                          {tech}{index < project.technologies.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .print-mode, .print-mode * {
            visibility: visible;
          }
          .print-mode {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print-hidden {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 0.5cm;
          }
          html, body {
            width: 210mm;
            height: 297mm;
          }
        }
      `}} />
    </section>
  );
};

export default Resume; 