import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Mail, Linkedin, Download, GraduationCap, Briefcase, Code, Award, Menu, X, Database, TrendingUp, BarChart3, Cpu, Network, Server, Camera, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  image: string;
  title: string;
  category: string;
}

function InfiniteGallery({ items, isDark }: { items: GalleryItem[], isDark: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = scrollStart.current - dx;
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  return (
    <div className="relative">
      <style>{`
        .gallery-scroll::-webkit-scrollbar { display: none; }
        .gallery-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div
        ref={trackRef}
        className="gallery-scroll flex gap-6 overflow-x-auto pb-2 select-none"
        style={{ cursor: 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:shadow-2xl ${isDark ? 'bg-neutral-700' : 'bg-white'}`}
            style={{ width: 300, height: 300 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
      {/* Subtle fade edges */}
      <div className="absolute inset-y-0 left-0 w-8 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--fade-color, transparent), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-8 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--fade-color, transparent), transparent)' }} />
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
    'AI & Machine Learning', 'Data Analytics', 'Business Intelligence', 'Power BI',
    'SQL', 'Python', 'Databricks', 'Azure Storage',
    'Stakeholder Management', 'Supply Chain Analytics', 'Process Optimization',
    'Strategic Planning', 'Microsoft Suite', 'Java', 'Linux', 'Cisco Networking', 'VMware'
  ];

  const experiences = [
    {
      company: 'Michelin',
      location: 'Greenville, SC (Hybrid)',
      positions: [
        {
          title: 'Pipeline Data Analyst – Supply Chain & Logistics',
          period: 'January 2026 – Present',
          highlights: [
            'Serving in a pipeline role within the Supply Chain & Logistics department designed to build cross-functional business acumen through immersive, hands-on experience.',
            'Partner with stakeholders across operations to deliver data-driven insights, support executive decision-making, and identify opportunities to improve efficiency, reduce costs, and strengthen overall supply chain performance.',
            'Led and executed a full-day, department-wide program for supply chain and logistics staff — managing budget, aligning cross-functional stakeholders, and driving end-to-end coordination to ensure effective delivery.',
            'Actively investing in professional development through industry conferences and ongoing learning, strengthening the ability to contribute strategically and support broader business objectives.'
          ]
        },
        {
          title: 'Logistics Data Analyst Intern',
          period: 'May 2025 – December 2025',
          highlights: [
            'Led the development of a standardized tire stacking solution aimed at improving warehouse space utilization across the North American logistics network.',
            'Reverse-engineered an underutilized pallet stacking formula and enhanced it to better reflect real-world warehouse constraints, improving accuracy and usability.',
            'Integrated the solution into an interactive Power BI tool backed by SQL-managed data, validating the model through site visits and hands-on collaboration with warehouse teams to ensure successful adoption.',
            'Leveraged Python and Databricks to streamline and accelerate data extraction from an Azure Data Lake, enabling faster access to insights and supporting data-driven initiatives.'
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
          period: 'April 2023 – December 2025 (Seasonal)',
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
    },
    {
      company: 'Cox, Kliewer & Company, P.C.',
      location: 'Virginia Beach, VA',
      positions: [
        {
          title: 'Front End Assistant',
          period: 'June 2019 – September 2019 (Part-time)',
          highlights: [
            'Digitized archival documents to improve organizational accessibility and records management efficiency.',
            'Managed front-desk operations including directing calls, coordinating meetings, and maintaining office supplies in a fast-paced professional accounting environment.',
            'Provided technical support to staff, developing a foundational understanding of office systems and professional service standards.',
            'Gained early exposure to operational management and client-facing service, establishing a strong foundation for future professional roles.'
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
            'As a Founding Father and Vice President, played a central role in establishing the chapter\'s presence on campus — building the strategic calendar, defining leadership roles, and managing the day-to-day operations of a growing organization.',
            'The experience closely paralleled an entrepreneurial venture, requiring skills in brand development, community building, budget management, marketing, team leadership, and long-term planning.',
            'Came away with a strong, practical foundation in organizational leadership that continues to inform how I approach professional challenges.'
          ]
        }
      ]
    }
  ];

  const portfolioItems = [
    { image: '/CAPSTONE.JPG',         title: 'Senior Capstone Presentation',  category: 'Capstone Project' },
    { image: '/CHARTER_GROUP.JPG',    title: 'Delta Chi Chartering Group',     category: 'Leadership' },
    { image: '/CHARTER_SPEECH.JPG',   title: 'Chartering Speech',              category: 'Public Speaking' },
    { image: '/GRADUATION.JPG',       title: 'Graduation',                     category: 'Milestone' },
    { image: '/IMG_0661.JPG',         title: 'Campus Life',                    category: 'Personal' },
    { image: '/MICHELIN_ABWTS.jpg',   title: 'Michelin ABWTS',                 category: 'Professional Experience' },
    { image: '/MICHELIN_GROUP.jpg',   title: 'Michelin Team',                  category: 'Professional Experience' },
    { image: '/MICHELIN_UT_CONF.jpeg',title: 'Michelin UT Conference',         category: 'Professional Experience' },
    { image: '/PRESIDENT.JPG',        title: "President's Reception",          category: 'Recognition' },
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
      <section id="home" className="pt-24 pb-12 px-6 relative overflow-hidden min-h-[auto] md:min-h-[75vh] flex items-center">
        
        <div className="absolute inset-0 pointer-events-none">
          <Database className="absolute top-20 left-6 animate-fadeInOut1 opacity-10" size={60} style={{ color: garnet }} />
          <BarChart3 className="absolute top-40 right-10 animate-fadeInOut2 opacity-10" size={50} style={{ color: garnet }} />
          <Cpu className="absolute bottom-20 left-1/4 animate-fadeInOut3 opacity-10" size={55} style={{ color: garnet }} />
          <Network className="absolute top-60 right-1/3 animate-fadeInOut4 opacity-10" size={45} style={{ color: garnet }} />
          <TrendingUp className="absolute top-1/4 left-1/3 animate-fadeInOut5 opacity-10" size={52} style={{ color: garnet }} />
          <Server className="absolute bottom-40 right-10 animate-fadeInOut6 opacity-10" size={48} style={{ color: garnet }} />
        </div>


        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text content */}
          <div className="flex-1 max-w-3xl scroll-reveal animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Bryce Shartle</h2>
            <p className="text-2xl md:text-3xl mb-6">Business Professional & Analytical Thinker</p>
            <p
              className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              2025 graduate of the University of South Carolina with a foundation in business strategy, data analytics,
              and information technology. Committed to bridging analytical insight with operational impact — leveraging
              data, AI, and cross-functional collaboration to drive smarter decisions and sustainable business growth.
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
          <div className="flex-shrink-0 flex justify-center md:justify-end mt-4 md:mt-0">
            <div
              className={`rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'bg-neutral-800' : 'bg-gray-100'}`}
              style={{ width: 200, height: 250, border: `2px solid ${garnet}33` }}
            >
              <img
                src="/subject2.png"
                alt="Bryce Shartle"
                className="w-full h-full object-cover object-center"
              />
            </div>
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
                My career has been built on a commitment to turning information into action. Whether analyzing complex datasets, coordinating cross-functional initiatives, or supporting strategic decisions, I focus on delivering work that creates real business value. I bring a blend of analytical capability and operational awareness that allows me to contribute meaningfully across functions and industries.
              </p>
            </div>
            <div className="space-y-6 scroll-reveal">
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                I thrive at the intersection of people, process, and technology — applying structured thinking to ambiguous problems and collaborating with stakeholders to move ideas forward. I'm energized by environments where continuous improvement is the standard and where thoughtful use of data and tools can meaningfully change outcomes.
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
              Motorsport • Business Strategy • Emerging Technology • Artificial Intelligence • Process Innovation • How Data Shapes Decision-Making
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
            Whether you're looking to connect professionally, explore a potential collaboration, or simply have a conversation — I'd be glad to hear from you.
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
