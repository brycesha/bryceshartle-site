import { useState } from 'react';
import { Moon, Sun, Mail, Linkedin, Download, GraduationCap, Briefcase, Code, Award, Menu, X } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const garnet = '#73000A';

  const skills = [
    'AI', 'Java', 'Python', 'SQL', 'Cisco Networking', 'Azure Storage',
    'Linux', 'Power BI', 'Databricks', 'Microsoft Suite', 'VMware'
  ];

  const experiences = [
    {
      company: 'Michelin',
      location: 'Greenville, SC (Hybrid)',
      positions: [
        {
          title: 'Logistics Data Analyst Intern',
          period: 'May 2025 – Present',
          highlights: [
            'Led the development of a standardized tire stacking solution aimed at improving warehouse space utilization across the North American logistics network.',
            'Reverse-engineered an underutilized pallet stacking formula and enhanced it to better reflect real-world warehouse constraints, improving accuracy and usability.',
            'Integrated the solution into an interactive Power BI tool backed by SQL-managed data, validating the model through site visits and hands-on collaboration with warehouse teams to ensure successful adoption.',
            'Currently continuing internship through the school year with a focus on leveraging Python and Databricks to streamline and accelerate data extraction from an Azure Data Lake, enabling faster access to insights and supporting data-driven initiatives.'
          ]
        },
        {
          title: 'Logistics Data Analyst Intern',
          period: 'May 2024 – August 2024',
          highlights: [
            'Focused on data-driven logistics optimization, leading initiatives to reduce tire aging and support smarter logistics diversions.',
            'Developed dashboards and analytics models using SQL, Power BI, Azure Data Lake, and Databricks that informed inventory rotation strategies, reduced emissions, and improved service levels.',
            'Deepened ability to turn complex datasets into actionable, impactful logistics solutions.'
          ]
        }
      ]
    },
    {
      company: 'University of South Carolina',
      location: 'Columbia, SC',
      positions: [
        {
          title: 'Resident Assistant',
          period: 'April 2023 – Present (Seasonal)',
          highlights: [
            'Contributed significantly to campus community midway through freshman year by aiding in annual closing procedures, swiftly fostering a sense of community.',
            'The following year, spearheaded the opening of a brand-new residence hall, which demanded quick problem-solving and adaptability.',
            'Overarching goal has always been to nurture a community and ensure a positive, secure environment for incoming freshmen.',
            'As a Junior and Senior, served as a peer leader to lead and teach many of the new and returning RAs, utilizing knowledge and experiences.'
          ]
        }
      ]
    },
    {
      company: 'Harris Teeter',
      location: 'Virginia Beach, VA',
      positions: [
        {
          title: 'Front End Supervisor',
          period: 'December 2021 – May 2024 (Part-time)',
          highlights: [
            'At the forefront of front end operations, ensuring seamless personnel coordination and precise financial transactions.',
            'Role encompassed a broad spectrum of responsibilities, from maintaining cash register accuracy to addressing diverse customer service needs, including the issuance of money orders and check cashing services.',
            'Commitment to operational excellence and customer satisfaction was paramount in driving the front end\'s success.'
          ]
        }
      ]
    }
  ];

  const leadership = [
    {
      organization: 'Delta Chi Fraternity',
      location: 'Columbia, SC',
      roles: [
        {
          title: 'Founding Father & Vice President',
          period: 'January 2024 – Present',
          description: [
            'As a founding father and Vice President, instrumental in cementing the fraternity\'s footprint on campus, encompassing devising a strategic calendar, creating and curating leadership roles, and steering the chapter\'s day-to-day activities.',
            'Journey mirrored many entrepreneurial endeavors, honing skills in brand development, fostering community, fiscal management, marketing initiatives, team leadership, and strategic foresight.',
            'Journey has equipped with a robust toolkit for organizational leadership.'
          ]
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDark ? 'bg-black/95 border-gray-800' : 'bg-white/95 border-gray-200'} border-b backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold" style={{ color: garnet }}>Bryce Shartle</h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className={`transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Home</button>
              <button onClick={() => scrollToSection('about')} className={`transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>About</button>
              <button onClick={() => scrollToSection('experience')} className={`transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Experience</button>
              <button onClick={() => scrollToSection('skills')} className={`transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Skills</button>
              <button onClick={() => scrollToSection('leadership')} className={`transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Leadership</button>
              <button onClick={() => scrollToSection('resume')} className={`transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Resume</button>
              <button onClick={() => scrollToSection('contact')} className={`transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Contact</button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full transition-colors"
                style={{ color: garnet }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full"
                style={{ color: garnet }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              <button onClick={() => scrollToSection('home')} className={`text-left transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Home</button>
              <button onClick={() => scrollToSection('about')} className={`text-left transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>About</button>
              <button onClick={() => scrollToSection('experience')} className={`text-left transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Experience</button>
              <button onClick={() => scrollToSection('skills')} className={`text-left transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Skills</button>
              <button onClick={() => scrollToSection('leadership')} className={`text-left transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Leadership</button>
              <button onClick={() => scrollToSection('resume')} className={`text-left transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Resume</button>
              <button onClick={() => scrollToSection('contact')} className={`text-left transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>Contact</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4" style={{ borderColor: garnet }}>
                <img
                  src="./IMG_0661.JPG"
                  alt="Bryce Shartle"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">Bryce Shartle</h2>
              <p className="text-2xl md:text-3xl mb-6" style={{ color: garnet }}>Data Analyst & Technology Leader</p>
              <p className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl`}>
                Recent graduate from the University of South Carolina seeking opportunities in data analytics, business intelligence, and technology leadership. Passionate about data-driven solutions, AI innovation, and operational excellence with experience in logistics optimization and strategic leadership.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90 shadow-lg"
                  style={{ backgroundColor: garnet }}
                >
                  Get In Touch
                </button>
                <button
                  onClick={() => scrollToSection('resume')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  View Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-6 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap size={32} style={{ color: garnet }} />
            <h3 className="text-4xl font-bold">About Me</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                My professional journey has been shaped by impactful internships at Michelin, where I led the development of AI-enhanced logistics solutions that optimize warehouse operations across North America. I combine technical expertise in data analytics, SQL, Power BI, Python, and machine learning with strong leadership skills honed through roles as a Resident Assistant and Delta Chi Fraternity Vice President.
              </p>
            </div>
            <div className="space-y-6">
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm passionate about leveraging technology to solve complex business challenges and drive operational efficiency. My interests span across artificial intelligence, data analytics, motorsports, and exploring how data shapes modern society. I thrive in collaborative environments where I can apply both technical skills and strategic thinking to create meaningful impact.
              </p>
            </div>
          </div>

          <div className={`mt-12 p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h4 className="text-2xl font-semibold mb-6" style={{ color: garnet }}>Education</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-xl mb-2">University of South Carolina</p>
                <p className={`text-lg mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Molinaroli College of Engineering and Computing</p>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Graduated December 2025</p>
              </div>
              <div>
                <p className={`text-lg mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}><span className="font-semibold">Major:</span> Integrated Information Technology</p>
                <p className={`text-lg mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}><span className="font-semibold">Minors:</span> Computer Science, Cybersecurity Operations</p>
                <p className="text-xl font-bold" style={{ color: garnet }}>GPA: 3.93</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase size={32} style={{ color: garnet }} />
            <h3 className="text-4xl font-bold">Professional Experience</h3>
          </div>
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className={`p-8 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} shadow-lg`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-bold mb-2" style={{ color: garnet }}>{exp.company}</h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{exp.location}</p>
                  </div>
                </div>
                <div className="space-y-8">
                  {exp.positions.map((pos, posIdx) => (
                    <div key={posIdx}>
                      <div className="mb-4">
                        <h5 className="text-xl font-semibold mb-1">{pos.title}</h5>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{pos.period}</p>
                      </div>
                      <ul className="space-y-3">
                        {pos.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className={`flex gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span style={{ color: garnet }}>•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-6 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Code size={32} style={{ color: garnet }} />
            <h3 className="text-4xl font-bold">Technical Skills</h3>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all hover:scale-105 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                style={{ borderLeft: `4px solid ${garnet}` }}
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-16">
            <h4 className="text-2xl font-semibold mb-8 text-center">Programs & Communities</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Formula SAE (Tractive Team)</p>
              </div>
              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Rhodos Fellows Innovation Community</p>
              </div>
              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Delta Chi Fraternity</p>
              </div>
              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>IDEA Community</p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h4 className="text-2xl font-semibold mb-6 text-center">Interests</h4>
            <p className={`text-lg text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Motorsport • Artificial Intelligence • Impact of Data on Modern Society • Automation • Implementation of Power BI
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Award size={32} style={{ color: garnet }} />
            <h3 className="text-4xl font-bold">Leadership & Community Engagement</h3>
          </div>
          <div className="space-y-8">
            {leadership.map((item, idx) => (
              <div key={idx} className={`p-8 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} shadow-lg`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-bold mb-2" style={{ color: garnet }}>{item.organization}</h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.location}</p>
                  </div>
                </div>
                <div className="space-y-8">
                  {item.roles.map((role, roleIdx) => (
                    <div key={roleIdx}>
                      <div className="mb-4">
                        <h5 className="text-xl font-semibold mb-1">{role.title}</h5>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{role.period}</p>
                      </div>
                      <ul className="space-y-3">
                        {role.description.map((desc, dIdx) => (
                          <li key={dIdx} className={`flex gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span style={{ color: garnet }}>•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-8 p-8 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} shadow-lg`}>
            <h4 className="text-2xl font-bold mb-4" style={{ color: garnet }}>Awards & Honors</h4>
            <ul className="space-y-2">
              <li className={`flex gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <span style={{ color: garnet }}>•</span>
                <span>President's List (Multiple Recipient)</span>
              </li>
              <li className={`flex gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <span style={{ color: garnet }}>•</span>
                <span>Duane and Mary Meyer Scholarship</span>
              </li>
              <li className={`flex gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <span style={{ color: garnet }}>•</span>
                <span>Engineering & Computing Scholarship</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className={`py-20 px-6 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Download size={32} style={{ color: garnet }} />
            <h3 className="text-4xl font-bold">Resume</h3>
          </div>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Download my complete resume to learn more about my experience and qualifications.
          </p>
          <a
            href="./Shartle-Bryce-College-Resume.pdf"
            download="Bryce_Shartle_Resume.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-white font-semibold transition-all hover:opacity-90 shadow-lg text-lg"
            style={{ backgroundColor: garnet }}
          >
            <Download size={24} />
            Download Resume
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8">Get In Touch</h3>
          <p className={`text-lg mb-12 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            I'm always open to discussing new opportunities, collaborations, or just connecting with fellow technology enthusiasts.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="mailto:bshartle@email.sc.edu"
              className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} shadow-lg`}
            >
              <Mail size={24} style={{ color: garnet }} />
              bshartle@email.sc.edu
            </a>
            <a
              href="https://www.linkedin.com/in/bryce-shartle-15692a214/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} shadow-lg`}
            >
              <Linkedin size={24} style={{ color: garnet }} />
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Bryce Shartle. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;