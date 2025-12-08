import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Mail, Linkedin, Download, GraduationCap, Briefcase, Code, Award, Menu, X, Database, TrendingUp, BarChart3, Cpu, Network, Server, Camera, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  image: string;
  title: string;
  category: string;
}

function InfiniteGallery({ items, isDark }: { items: GalleryItem[], isDark: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Create tripled array for seamless infinite scroll
  const tripledItems = [...items, ...items, ...items];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Start at the middle set of items
    const itemWidth = 320 + 24; // width + gap
    const startPosition = items.length * itemWidth;
    container.scrollLeft = startPosition;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isScrolling) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const singleSetWidth = items.length * itemWidth;

        // If scrolled past the second set, jump back to first set
        if (scrollLeft >= singleSetWidth * 2 - itemWidth) {
          setIsScrolling(true);
          container.scrollLeft = scrollLeft - singleSetWidth;
          setTimeout(() => setIsScrolling(false), 50);
        }
        // If scrolled before the first set, jump to second set
        else if (scrollLeft <= itemWidth) {
          setIsScrolling(true);
          container.scrollLeft = scrollLeft + singleSetWidth;
          setTimeout(() => setIsScrolling(false), 50);
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [items.length, isScrolling]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {tripledItems.map((item, idx) => (
        <div
          key={idx}
          className={`flex-shrink-0 w-80 h-80 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl snap-center cursor-pointer ${isDark ? 'bg-neutral-700' : 'bg-white'}`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.classList.remove('hidden-scroll');
        } else {
          entry.target.classList.remove('revealed');
          entry.target.classList.add('hidden-scroll');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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

  const portfolioItems = [
  {
    image: '/CAPSTONE.JPG',
    title: 'Senior Capstone Presentation',
    category: 'Capstone Project'
  },
  {
    image: '/CHARTER_GROUP.JPG',
    title: 'Delta Chi Chartering Group',
    category: 'Leadership'
  },
  {
    image: '/CHARTER_SPEECH.JPG',
    title: 'Chartering Speech',
    category: 'Public Speaking'
  },
  {
    image: '/MICHELIN_GROUP.jpg',
    title: 'Michelin Internship',
    category: 'Professional Experience'
  },
  {
    image: '/PRESIDENT.JPG',
    title: 'President’s Reception',
    category: 'Recognition'
  }
];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-neutral-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDark ? 'bg-neutral-900/95 border-neutral-800' : 'bg-white/95 border-gray-200'} border-b backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold" style={{ color: garnet }}>Bryce Shartle</h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="transition-colors hover:opacity-80" style={{ ['--hover-color' as string]: garnet }} onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Home</button>
              <button onClick={() => scrollToSection('about')} className="transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>About</button>
              <button onClick={() => scrollToSection('experience')} className="transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Experience</button>
              <button onClick={() => scrollToSection('skills')} className="transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Skills</button>
              <button onClick={() => scrollToSection('leadership')} className="transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Leadership</button>
              <button onClick={() => scrollToSection('gallery')} className="transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Gallery</button>
              <button onClick={() => scrollToSection('resume')} className="transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Resume</button>
              <button onClick={() => scrollToSection('contact')} className="transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Contact</button>
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
              <button onClick={() => scrollToSection('home')} className="text-left transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Home</button>
              <button onClick={() => scrollToSection('about')} className="text-left transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>About</button>
              <button onClick={() => scrollToSection('experience')} className="text-left transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Experience</button>
              <button onClick={() => scrollToSection('skills')} className="text-left transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Skills</button>
              <button onClick={() => scrollToSection('leadership')} className="text-left transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Leadership</button>
              <button onClick={() => scrollToSection('gallery')} className="text-left transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Gallery</button>
              <button onClick={() => scrollToSection('resume')} className="text-left transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Resume</button>
              <button onClick={() => scrollToSection('contact')} className="text-left transition-colors hover:opacity-80" onMouseEnter={(e) => e.currentTarget.style.color = garnet} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Contact</button>
            </div>
          )}
        </div>
      </nav>

      {
/* Hero Section */}
      <section id="home" className="pt-24 pb-20 px-6 relative overflow-hidden min-h-[70vh] md:min-h-[75vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <Database className={`absolute top-20 left-10 animate-...acity-0' : 'opacity-0'}`} size={60} style={{ color: garnet }} />
          <BarChart3 className={`absolute top-40 right-20 animat...acity-0' : 'opacity-0'}`} size={50} style={{ color: garnet }} />
          <Cpu className={`absolute bottom-20 left-1/4 animate-f...acity-0' : 'opacity-0'}`} size={55} style={{ color: garnet }} />
          <Network className={`absolute top-60 right-1/3 animate...acity-0' : 'opacity-0'}`} size={45} style={{ color: garnet }} />
          <TrendingUp className={`absolute top-1/4 left-1/3 anim...acity-0' : 'opacity-0'}`} size={52} style={{ color: garnet }} />
          <Server className={`absolute bottom-40 right-10 animat...acity-0' : 'opacity-0'}`} size={48} style={{ color: garnet }} />
          <Code className={`absolute top-1/3 right-1/4 animate-f...acity-0' : 'opacity-0'}`} size={58} style={{ color: garnet }} />
          <Database className={`absolute bottom-1/3 left-20 anim...acity-0' : 'opacity-0'}`} size={54} style={{ color: garnet }} />
          <BarChart3 className={`absolute top-1/2 left-1/2 anima...acity-0' : 'opacity-0'}`} size={46} style={{ color: garnet }} />
          <Network className={`absolute bottom-1/4 right-1/3 ani...acity-0' : 'opacity-0'}`} size={50} style={{ color: garnet }} />
          <Cpu className={`absolute top-1/3 left-10 animate-fade...acity-0' : 'opacity-0'}`} size={56} style={{ color: garnet }} />
          <TrendingUp className={`absolute bottom-32 left-1/2 animate-fadeInOut6 ${isDark ? 'opacity-0' : 'opacity-0'}`} size={44} style={{ color: garnet }} />
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text content */}
          <div className="flex-1 max-w-3xl scroll-reveal animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Bryce Shartle</h2>
            <p className="text-2xl md:text-3xl mb-6">Data Analyst & Technology Leader</p>
            <p
              className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-200'}`}
            >
              Recent graduate from the University of South Carolina seeking opportunities in data analytics,
              business intelligence, and technology leadership. Passionate about data-driven solutions, AI innovation,
              and operational excellence with experience in logistics optimization and strategic leadership.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 rounded-lg text-white font-semibold transform transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-2xl shadow-lg"
                style={{ backgroundColor: garnet }}
              >
                Get In Touch
              </button>
              <button
                onClick={() => scrollToSection('resume')}
                className={`px-8 py-3 rounded-lg font-semibold transform transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 ${
                  isDark
                    ? 'bg-neutral-800 text-white border border-neutral-600 hover:bg-neutral-700'
                    : 'bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200'
                }`}
              >
                View Resume
              </button>
            </div>
          </div>

          {/* Headshot */}
          <div className="flex-1 mt-10 md:mt-0 flex justify-center md:justify-end relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/20 blur-3xl opacity-40 pointer-events-none" />
            <img
              src="/subject2.png"
              alt="Bryce Shartle"
              className="relative h-[38vh] md:h-[49vh] lg:h-[56vh] max-h-[520px] w-auto object-contain object-bottom"
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))'
              }}
            />
          </div>
        </div>
      </section>

{/* About Section */}
      <section id="about" className={`py-20 px-6 ${isDark ? 'bg-neutral-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 scroll-reveal">
            <GraduationCap size={32} style={{ color: garnet }} />
            <h3 className="text-4xl font-bold">About Me</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="scroll-reveal">
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                My professional journey has been shaped by impactful internships at Michelin, where I led the development of AI-enhanced logistics solutions that optimize warehouse operations across North America. I combine technical expertise in data analytics, SQL, Power BI, Python, and machine learning with strong leadership skills honed through roles as a Resident Assistant and Delta Chi Fraternity Vice President.
              </p>
            </div>
            <div className="space-y-6 scroll-reveal">
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm passionate about leveraging technology to solve complex business challenges and drive operational efficiency. My interests span across artificial intelligence, data analytics, motorsports, and exploring how data shapes modern society. I thrive in collaborative environments where I can apply both technical skills and strategic thinking to create meaningful impact.
              </p>
            </div>
          </div>

          <div className={`mt-12 p-8 rounded-lg ${isDark ? 'bg-neutral-700' : 'bg-white'} shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl scroll-reveal`}>
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
      <section id="experience" className={`py-20 px-6 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 scroll-reveal">
            <Briefcase size={32} style={{ color: garnet }} />
            <h3 className="text-4xl font-bold">Professional Experience</h3>
          </div>
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className={`p-8 rounded-lg ${isDark ? 'bg-neutral-800' : 'bg-gray-50'} shadow-lg transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl scroll-reveal`}>
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
      <section id="skills" className={`py-20 px-6 ${isDark ? 'bg-neutral-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 scroll-reveal">
            <Code size={32} style={{ color: garnet }} />
            <h3 className="text-4xl font-bold">Technical Skills</h3>
          </div>
          <div className="flex flex-wrap gap-4 justify-center scroll-reveal">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className={`px-6 py-3 rounded-full text-lg font-semibold ${isDark ? 'bg-neutral-700' : 'bg-white'} shadow-lg cursor-default transition-transform duration-300 hover:scale-110 hover:shadow-2xl`}
                style={{ borderLeft: `4px solid ${garnet}` }}
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-16 scroll-reveal">
            <h4 className="text-2xl font-semibold mb-8 text-center">Programs & Communities</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg ${isDark ? 'bg-neutral-700' : 'bg-white'} shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl`}>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Formula SAE (Tractive Team)</p>
              </div>
              <div className={`p-6 rounded-lg ${isDark ? 'bg-neutral-700' : 'bg-white'} shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl`}>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Rhodos Fellows Innovation Community</p>
              </div>
              <div className={`p-6 rounded-lg ${isDark ? 'bg-neutral-700' : 'bg-white'} shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl`}>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Delta Chi Fraternity</p>
              </div>
              <div className={`p-6 rounded-lg ${isDark ? 'bg-neutral-700' : 'bg-white'} shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl`}>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>IDEA Community</p>
              </div>
            </div>
          </div>
          <div className="mt-12 scroll-reveal">
            <h4 className="text-2xl font-semibold mb-6 text-center">Interests</h4>
            <p className={`text-lg text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Motorsport • Artificial Intelligence • Impact of Data on Modern Society • Automation • Implementation of Power BI
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className={`py-20 px-6 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 scroll-reveal">
            <Award size={32} style={{ color: garnet }} />
            <h3 className="text-4xl font-bold">Leadership & Community Engagement</h3>
          </div>
          <div className="space-y-8">
            {leadership.map((item, idx) => (
              <div key={idx} className={`p-8 rounded-lg ${isDark ? 'bg-neutral-800' : 'bg-gray-50'} shadow-lg transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl scroll-reveal`}>
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
          <div className={`mt-8 p-8 rounded-lg ${isDark ? 'bg-neutral-800' : 'bg-gray-50'} shadow-lg transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl scroll-reveal`}>
            <div className="flex items-center gap-3 mb-4">
              <Award size={28} style={{ color: garnet }} />
              <h4 className="text-2xl font-bold" style={{ color: garnet }}>Awards & Honors</h4>
            </div>
            <ul className="space-y-2">
              <li className={`flex gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <Award size={20} style={{ color: garnet }} />
                <span>President's List (Multiple Recipient)</span>
              </li>
              <li className={`flex gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <Award size={20} style={{ color: garnet }} />
                <span>Duane and Mary Meyer Scholarship</span>
              </li>
              <li className={`flex gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <Award size={20} style={{ color: garnet }} />
                <span>Engineering & Computing Scholarship</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className={`py-20 px-6 ${isDark ? 'bg-neutral-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 scroll-reveal">
            <Camera size={32} style={{ color: garnet }} />
            <h3 className="text-4xl font-bold">Gallery</h3>
          </div>

          <div className="scroll-reveal">
            <InfiniteGallery items={portfolioItems} isDark={isDark} />
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className={`py-20 px-6 ${isDark ? 'bg-neutral-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8 scroll-reveal">
            <Download size={32} style={{ color: garnet }} />
            <h3 className="text-4xl font-bold">Resume</h3>
          </div>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'} scroll-reveal`}>
            Download my complete resume to learn more about my experience and qualifications.
          </p>
          <div className="scroll-reveal">
            <a
              href="/Shartle-Bryce-Resume.pdf"
  download="Bryce_Shartle_Resume.pdf"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-2xl shadow-lg text-lg"
              style={{ backgroundColor: garnet }}
            >
              <Download size={24} />
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 ${isDark ? 'bg-neutral-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8 scroll-reveal">Get In Touch</h3>
          <p className={`text-lg mb-12 ${isDark ? 'text-gray-300' : 'text-gray-700'} scroll-reveal`}>
            I'm always open to discussing new opportunities, collaborations, or just connecting with fellow technology enthusiasts.
          </p>
          <div className="flex gap-6 justify-center flex-wrap scroll-reveal">
            <a
              href="mailto:bshartle@email.sc.edu"
              className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${isDark ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-gray-100 hover:bg-gray-200'} shadow-lg hover:scale-105 hover:shadow-2xl`}
            >
              <Mail size={24} style={{ color: garnet }} />
              bshartle@email.sc.edu
            </a>
            <a
              href="https://www.linkedin.com/in/bryceshartle/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${isDark ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-gray-100 hover:bg-gray-200'} shadow-lg hover:scale-105 hover:shadow-2xl`}
            >
              <Linkedin size={24} style={{ color: garnet }} />
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 border-t ${isDark ? 'border-neutral-800' : 'border-gray-200'}`}>
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
