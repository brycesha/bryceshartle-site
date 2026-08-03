import { useState, useEffect, useRef, useMemo } from 'react';
import { Moon, Sun, Mail, Linkedin, Download, GraduationCap, Briefcase, Code, Award, Menu, X, Camera, Users, Target, TrendingUp, Handshake, BarChart2 } from 'lucide-react';

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
      <div className="absolute inset-y-0 left-0 w-8 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--fade-color, transparent), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-8 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--fade-color, transparent), transparent)' }} />
    </div>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);
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

  // Randomize icon positions on each page load
  const iconPositions = useMemo(() => {
    const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    return [
      { top: rand(8, 20), left: rand(2, 15), right: undefined, bottom: undefined },
      { top: rand(25, 50), right: rand(2, 15), left: undefined, bottom: undefined },
      { bottom: rand(8, 25), left: rand(15, 35), top: undefined, right: undefined },
      { top: rand(50, 70), right: rand(20, 45), left: undefined, bottom: undefined },
      { top: rand(18, 35), left: rand(30, 50), right: undefined, bottom: undefined },
      { bottom: rand(25, 50), right: rand(5, 20), top: undefined, left: undefined },
    ].map(p => ({
      top:    p.top    !== undefined ? `${p.top}%`    : undefined,
      bottom: p.bottom !== undefined ? `${p.bottom}%` : undefined,
      left:   p.left   !== undefined ? `${p.left}%`   : undefined,
      right:  p.right  !== undefined ? `${p.right}%`  : undefined,
    }));
  }, []);

  // Michelin primary blue
  const michelinBlue = '#27509B';
  const michelinYellow = '#FCE500';
  const accent = michelinBlue;

  const skills = [
    'Sales & Territory Management', 'Account Management', 'Client Relationship Building',
    'Business Development', 'Stakeholder Engagement', 'Strategic Planning',
    'Data-Driven Decision Making', 'Business Intelligence', 'Process Optimization',
    'Cross-Functional Collaboration', 'Microsoft Suite', 'Project Coordination'
  ];

  const experiences = [
    {
      company: 'Michelin',
      location: 'Greenville, SC · NY/NJ Territory',
      positions: [
        {
          title: 'B2C Sales Representative – WDA Channel',
          period: 'August 2026 – Present',
          highlights: [
            'Responsible for managing and developing client relationships across a defined territory in the New York and New Jersey area, serving distributors of varying sizes within Michelin\'s Wholesale Distributor & Associate (WDA) channel.',
            'Focus on understanding each account\'s needs and business dynamics, identifying growth opportunities, and delivering consistent value through strong product knowledge, consultative engagement, and reliable follow-through.',
            'Building a presence in the territory through regular client contact, strengthening existing partnerships, and developing new business across the channel.'
          ]
        },
        {
          title: 'Data Analyst – Supply Chain & Logistics Pipeline',
          period: 'January 2026 – August 2026',
          highlights: [
            'Served within Michelin\'s Supply Chain & Logistics department in a pipeline role designed to build cross-functional business acumen. Working closely with stakeholders across operations, the focus was on translating complex information into clear, actionable insights that supported smarter decision-making and drove measurable improvements in efficiency, cost, and overall performance.',
            'Built and delivered operational tools that gave teams and leadership better visibility into the business — including a logistics tracking solution, a manager-facing budget tool, and an automated communications workflow that streamlined how key information was shared across the organization.',
            'Co-led a recurring cross-functional meeting of roughly 50 people, keeping service centers, distribution centers, logistics teams, and internal partners aligned on shared priorities. Planned and executed a full-day, department-wide conference, managing budget, logistics, and stakeholder coordination from start to finish.',
            'Represented Michelin at the University of Tennessee Supply Chain Forum, engaging with prospective talent and contributing to intern recruitment. Contributed to executive-level reporting that informed how leadership understood and acted on key business metrics.'
          ]
        },
        {
          title: 'Logistics Analyst Intern',
          period: 'May 2025 – December 2025',
          highlights: [
            'Led the development of a standardized solution to improve warehouse space utilization across the North American logistics network, working directly with warehouse teams to validate and refine the approach.',
            'Translated the solution into an interactive operational tool, enabling teams to make better decisions around space planning and resource allocation.',
            'Collaborated closely with site teams through visits and hands-on engagement to ensure the solution met real-world needs and was successfully adopted across locations.'
          ]
        },
        {
          title: 'Logistics Analyst Intern',
          period: 'May 2024 – August 2024',
          highlights: [
            'Focused on operational optimization within the logistics network, leading initiatives that improved inventory management, reduced inefficiencies, and strengthened service performance.',
            'Developed dashboards and reporting tools that gave teams clearer visibility into key metrics, directly informing decisions around routing, inventory strategy, and service levels.',
            'Deepened the ability to translate operational data into practical, impactful business recommendations.'
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
            'Contributed to campus community from early in the program, supporting annual operations and helping foster a welcoming environment for new residents.',
            'Took on increased responsibility the following year, helping open a brand-new residence hall and establishing community standards from the ground up.',
            'In later years, took on a peer leadership role — training, mentoring, and serving as a resource for both new and returning team members throughout the program.'
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
            'Oversaw front-end operations including personnel coordination, transaction accuracy, and day-to-day customer service delivery.',
            'Managed a range of customer-facing responsibilities, building a strong foundation in operational reliability and service excellence.',
            'Developed early leadership and communication skills in a fast-paced, high-volume retail environment.'
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
            'Supported front-office operations at a professional accounting firm, handling client-facing responsibilities and contributing to day-to-day organizational efficiency.',
            'Gained early exposure to professional office environments, client service standards, and operational coordination.',
            'Developed a foundational understanding of professional communication and workplace dynamics.'
          ]
        }
      ]
    }
  ];

  const leadership = [
    {
      organization: 'University of South Carolina – Housing',
      location: 'Columbia, SC',
      roles: [
        {
          title: 'Senior Resident Assistant & Peer Leader',
          period: 'April 2023 – December 2025 (Seasonal)',
          description: [
            'Progressed from Resident Assistant to a recognized peer leader responsible for training, mentoring, and serving as an ongoing resource for both new and returning team members across the program.',
            'In a senior capacity, led training sessions, shared institutional knowledge, and provided guidance on community standards, conflict resolution, and resident support — effectively serving in a supervisory-adjacent role.',
            'Opened a brand-new residence hall, requiring rapid problem-solving, adaptability, and the ability to build community and establish norms from scratch.',
            'Consistently maintained a safe, inclusive, and supportive environment for residents, serving as a first point of contact for a wide range of academic, personal, and logistical needs.'
          ]
        }
      ]
    },
    {
      organization: 'Delta Chi Fraternity',
      location: 'Columbia, SC',
      roles: [
        {
          title: 'Founding Father & Vice President',
          period: 'January 2024 – December 2025',
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
    { image: '/CAPSTONE.JPG',          title: 'Senior Capstone Presentation', category: 'Capstone Project' },
    { image: '/CHARTER_GROUP.JPG',     title: 'Delta Chi Chartering Group',    category: 'Leadership' },
    { image: '/CHARTER_SPEECH.JPG',    title: 'Chartering Speech',             category: 'Public Speaking' },
    { image: '/GRADUATION.JPG',        title: 'Graduation',                    category: 'Milestone' },
    { image: '/MICHELIN_ABWTS.jpg',    title: 'Michelin ABWTS',                category: 'Professional Experience' },
    { image: '/MICHELIN_GROUP.jpg',    title: 'Michelin Team',                 category: 'Professional Experience' },
    { image: '/MICHELIN_UT_CONF.jpeg', title: 'Michelin UT Conference',        category: 'Professional Experience' },
    { image: '/PRESIDENT.JPG',         title: "President's Reception",         category: 'Recognition' },
  ];

  // Dark mode backgrounds use Michelin Dark Blue / Midnight Blue
  const darkBg1 = '#000C34';   // Midnight Blue
  const darkBg2 = '#00205B';   // Dark Blue
  const lightBg1 = '#FFFFFF';
  const lightBg2 = '#F2F2F2';

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDark ? darkBg1 : lightBg1, color: isDark ? '#F2F2F2' : '#1A1A1A' }}>

      {/* Navigation */}
      <nav style={{ backgroundColor: isDark ? `${darkBg1}F5` : `${lightBg1}F5`, borderBottom: `1px solid ${isDark ? '#27509B44' : '#E5E5E5'}` }} className="fixed top-0 w-full z-50 backdrop-blur-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold" style={{ color: michelinBlue }}>Bryce Shartle</h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['home','about','experience','skills','leadership','gallery','resume','contact'].map(sec => (
                <button key={sec} onClick={() => scrollToSection(sec)}
                  className="capitalize transition-colors duration-200"
                  style={{ color: isDark ? '#CCCCCC' : '#404040' }}
                  onMouseEnter={e => (e.currentTarget.style.color = michelinBlue)}
                  onMouseLeave={e => (e.currentTarget.style.color = isDark ? '#CCCCCC' : '#404040')}
                >{sec}</button>
              ))}
              <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full transition-colors" style={{ color: michelinBlue }}>
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full" style={{ color: michelinBlue }}>
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: isDark ? '#F2F2F2' : '#1A1A1A' }}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              {['home','about','experience','skills','leadership','gallery','resume','contact'].map(sec => (
                <button key={sec} onClick={() => scrollToSection(sec)} className="capitalize text-left transition-colors"
                  onMouseEnter={e => (e.currentTarget.style.color = michelinBlue)}
                  onMouseLeave={e => (e.currentTarget.style.color = '')}
                >{sec}</button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 px-6 relative overflow-hidden min-h-[auto] md:min-h-[75vh] flex items-center">
        {/* Background accent icons — positions randomized on each load */}
        <div className="absolute inset-0 pointer-events-none">
          {[Handshake, Users, Target, TrendingUp, BarChart2, Briefcase].map((Icon, i) => (
            <Icon key={i}
              className={`absolute animate-fadeInOut${i + 1} opacity-10`}
              size={[60, 50, 55, 45, 52, 48][i]}
              style={{ color: isDark ? '#87A4D0' : michelinBlue, ...iconPositions[i] }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text content */}
          <div className="flex-1 max-w-3xl scroll-reveal animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Bryce Shartle</h2>
            <p className="text-2xl md:text-3xl mb-6" style={{ color: michelinBlue }}>Business Professional & Sales Leader</p>
            <p className="text-lg md:text-xl mb-8" style={{ color: isDark ? '#CCCCCC' : '#404040' }}>
              2025 graduate of the University of South Carolina with a foundation in business strategy, analytics,
              and cross-functional operations. Committed to building lasting relationships, delivering value to clients,
              and contributing to business growth in any environment.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 rounded-lg font-semibold transform transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-2xl shadow-lg"
                style={{ backgroundColor: michelinBlue, color: '#FFFFFF' }}
              >
                Get In Touch
              </button>
              <button
                onClick={() => scrollToSection('resume')}
                className="px-8 py-3 rounded-lg font-semibold transform transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
                style={{ backgroundColor: isDark ? '#00205B' : '#F2F2F2', color: isDark ? '#F2F2F2' : '#1A1A1A', border: `1px solid ${isDark ? '#27509B' : '#CCCCCC'}` }}
              >
                View Resume
              </button>
            </div>
          </div>

          {/* Headshot */}
          <div className="flex-shrink-0 flex justify-center md:justify-end mt-4 md:mt-0">
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ width: 200, height: 250, border: `2px solid ${michelinBlue}44`, backgroundColor: isDark ? '#00205B' : '#F2F2F2' }}
            >
              <img src="/subject2.png" alt="Bryce Shartle" className="w-full h-full object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6" style={{ backgroundColor: isDark ? darkBg2 : lightBg2 }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 scroll-reveal">
            <GraduationCap size={32} style={{ color: michelinBlue }} />
            <h3 className="text-4xl font-bold">About Me</h3>
          </div>
          <div className="scroll-reveal">
            <p className="text-lg leading-relaxed mb-6" style={{ color: isDark ? '#CCCCCC' : '#404040' }}>
              My career has been shaped by a genuine interest in how businesses grow — whether that means building tools that surface the right information at the right time, or showing up in a territory and earning the trust of the people you serve. I've worked across operations, cross-functional teams, and customer-facing sales, and what connects all of it is a consistent focus on delivering real value to the people around me.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: isDark ? '#CCCCCC' : '#404040' }}>
              I thrive in environments where the work is varied, the stakes are real, and there's always something more to learn. Whether I'm aligning stakeholders around a shared goal, managing a client relationship, or navigating a new challenge, I bring the same energy — structured thinking, a bias toward action, and a genuine investment in doing the job well.
            </p>
          </div>

          <div className="mt-12 p-8 rounded-lg shadow-lg scroll-reveal transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
            style={{ backgroundColor: isDark ? '#00205B' : '#FFFFFF', border: `1px solid ${isDark ? '#27509B44' : '#E5E5E5'}` }}>
            <h4 className="text-2xl font-semibold mb-6" style={{ color: michelinBlue }}>Education</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-xl mb-2">University of South Carolina</p>
                <p className="text-lg mb-1" style={{ color: isDark ? '#CCCCCC' : '#404040' }}>Molinaroli College of Engineering and Computing</p>
                <p style={{ color: isDark ? '#999999' : '#666666' }}>Graduated December 2025</p>
              </div>
              <div>
                <p className="text-lg mb-2" style={{ color: isDark ? '#CCCCCC' : '#404040' }}><span className="font-semibold">Major:</span> Integrated Information Technology</p>
                <p className="text-lg mb-2" style={{ color: isDark ? '#CCCCCC' : '#404040' }}><span className="font-semibold">Minors:</span> Computer Science, Cybersecurity Operations</p>
                <p className="text-xl font-bold" style={{ color: michelinBlue }}>GPA: 3.94</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6" style={{ backgroundColor: isDark ? darkBg1 : lightBg1 }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 scroll-reveal">
            <Briefcase size={32} style={{ color: michelinBlue }} />
            <h3 className="text-4xl font-bold">Professional Experience</h3>
          </div>
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="p-8 rounded-lg shadow-lg scroll-reveal transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl"
                style={{ backgroundColor: isDark ? darkBg2 : lightBg2, border: `1px solid ${isDark ? '#27509B33' : '#E5E5E5'}` }}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-bold mb-2" style={{ color: michelinBlue }}>{exp.company}</h4>
                    <p style={{ color: isDark ? '#999999' : '#666666' }}>{exp.location}</p>
                  </div>
                </div>
                <div className="space-y-8">
                  {exp.positions.map((pos, posIdx) => (
                    <div key={posIdx}>
                      <div className="mb-4">
                        <h5 className="text-xl font-semibold mb-1">{pos.title}</h5>
                        <p style={{ color: isDark ? '#999999' : '#666666' }}>{pos.period}</p>
                      </div>
                      <ul className="space-y-3">
                        {pos.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex gap-3" style={{ color: isDark ? '#CCCCCC' : '#404040' }}>
                            <span style={{ color: michelinBlue }}>•</span>
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
      <section id="skills" className="py-20 px-6" style={{ backgroundColor: isDark ? darkBg2 : lightBg2 }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 scroll-reveal">
            <Code size={32} style={{ color: michelinBlue }} />
            <h3 className="text-4xl font-bold">Skills & Capabilities</h3>
          </div>
          <div className="flex flex-wrap gap-4 justify-center scroll-reveal">
            {skills.map((skill, idx) => (
              <span key={idx}
                className="px-6 py-3 rounded-full text-lg font-semibold shadow-lg cursor-default transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
                style={{ backgroundColor: isDark ? '#00205B' : '#FFFFFF', borderLeft: `4px solid ${michelinBlue}`, color: isDark ? '#F2F2F2' : '#1A1A1A' }}
              >{skill}</span>
            ))}
          </div>

          {/* Programs & Communities */}
          <div className="mt-16 scroll-reveal">
            <h4 className="text-2xl font-semibold mb-8 text-center">Programs & Communities</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: 'Rhodes Fellows Innovation Community', years: 'Freshman – Junior' },
                { name: 'Formula SAE (Tractive Team)', years: 'Junior' },
                { name: 'Resident Assistant Program', years: 'Freshman – Senior' },
                { name: 'Delta Chi Fraternity (Vice President)', years: 'Sophomore – Senior' },
                { name: 'IDEA Community', years: 'Senior' },
                { name: 'Volunteer – St. Thomas More Catholic Church', years: 'Junior – Senior' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl"
                  style={{ backgroundColor: isDark ? '#00205B' : '#FFFFFF', border: `1px solid ${isDark ? '#27509B33' : '#E5E5E5'}` }}>
                  <p className="text-lg font-medium" style={{ color: isDark ? '#CCCCCC' : '#333333' }}>{item.name}</p>
                  <p className="text-sm mt-1" style={{ color: isDark ? '#999999' : '#666666' }}>{item.years}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="mt-12 scroll-reveal">
            <h4 className="text-2xl font-semibold mb-6 text-center">Interests</h4>
            <p className="text-lg text-center" style={{ color: isDark ? '#CCCCCC' : '#404040' }}>
              Motorsport • Business Strategy • Emerging Technology • Sales & Market Development • How Data Shapes Decision-Making
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 px-6" style={{ backgroundColor: isDark ? darkBg1 : lightBg1 }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 scroll-reveal">
            <Award size={32} style={{ color: michelinBlue }} />
            <h3 className="text-4xl font-bold">Leadership & Community Engagement</h3>
          </div>
          <div className="space-y-8">
            {leadership.map((item, idx) => (
              <div key={idx} className="p-8 rounded-lg shadow-lg scroll-reveal transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl"
                style={{ backgroundColor: isDark ? darkBg2 : lightBg2, border: `1px solid ${isDark ? '#27509B33' : '#E5E5E5'}` }}>
                <div className="mb-6">
                  <h4 className="text-2xl font-bold mb-2" style={{ color: michelinBlue }}>{item.organization}</h4>
                  <p style={{ color: isDark ? '#999999' : '#666666' }}>{item.location}</p>
                </div>
                <div className="space-y-8">
                  {item.roles.map((role, roleIdx) => (
                    <div key={roleIdx}>
                      <div className="mb-4">
                        <h5 className="text-xl font-semibold mb-1">{role.title}</h5>
                        <p style={{ color: isDark ? '#999999' : '#666666' }}>{role.period}</p>
                      </div>
                      <ul className="space-y-3">
                        {role.description.map((desc, dIdx) => (
                          <li key={dIdx} className="flex gap-3" style={{ color: isDark ? '#CCCCCC' : '#404040' }}>
                            <span style={{ color: michelinBlue }}>•</span>
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

          {/* Awards & Honors */}
          <div className="mt-8 p-8 rounded-lg shadow-lg scroll-reveal transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl"
            style={{ backgroundColor: isDark ? darkBg2 : lightBg2, border: `1px solid ${isDark ? '#27509B33' : '#E5E5E5'}` }}>
            <div className="flex items-center gap-3 mb-6">
              <Award size={28} style={{ color: michelinBlue }} />
              <h4 className="text-2xl font-bold" style={{ color: michelinBlue }}>Awards & Honors</h4>
            </div>
            <ul className="space-y-4">
              {[
                { title: "President's List (4.0)", sub: 'Fall 2022, Spring 2024, Fall 2024, Spring 2025, Fall 2025' },
                { title: "Dean's List (3.5+)", sub: 'Spring 2023, Fall 2023' },
                { title: 'Engineering & Computing Scholarship', sub: 'Sophomore – Junior' },
                { title: 'Duane and Mary Meyer Scholarship', sub: 'Junior' },
                { title: 'AI and Career Empowerment Certificate', sub: 'University of Maryland – Robert H. Smith School of Business · December 2025' },
              ].map((award, idx) => (
                <li key={idx} className="flex gap-3" style={{ color: isDark ? '#CCCCCC' : '#404040' }}>
                  <Award size={20} className="flex-shrink-0 mt-0.5" style={{ color: michelinBlue }} />
                  <div>
                    <span className="font-medium">{award.title}</span>
                    <p className="text-sm mt-0.5" style={{ color: isDark ? '#999999' : '#666666' }}>{award.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6" style={{ backgroundColor: isDark ? darkBg2 : lightBg2 }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 scroll-reveal">
            <Camera size={32} style={{ color: michelinBlue }} />
            <h3 className="text-4xl font-bold">Gallery</h3>
          </div>
          <div className="scroll-reveal">
            <InfiniteGallery items={portfolioItems} isDark={isDark} />
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 px-6" style={{ backgroundColor: isDark ? darkBg1 : lightBg1 }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8 scroll-reveal">
            <Download size={32} style={{ color: michelinBlue }} />
            <h3 className="text-4xl font-bold">Resume</h3>
          </div>
          <p className="text-lg mb-8 scroll-reveal" style={{ color: isDark ? '#CCCCCC' : '#404040' }}>
            Download my complete resume to learn more about my experience and qualifications.
          </p>
          <div className="scroll-reveal">
            <a
              href="/Shartle-Bryce-Resume.pdf"
              download="Bryce_Shartle_Resume.pdf"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-2xl shadow-lg text-lg"
              style={{ backgroundColor: michelinBlue, color: '#FFFFFF' }}
            >
              <Download size={24} />
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6" style={{ backgroundColor: isDark ? darkBg2 : lightBg2 }}>
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8 scroll-reveal">Get In Touch</h3>
          <p className="text-lg mb-12 scroll-reveal" style={{ color: isDark ? '#CCCCCC' : '#404040' }}>
            Whether you're looking to connect professionally, explore a potential collaboration, or simply have a conversation — I'd be glad to hear from you.
          </p>
          <div className="flex gap-6 justify-center flex-wrap scroll-reveal">
            <a href="mailto:bryceshartle@gmail.com"
              className="flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: isDark ? '#00205B' : '#FFFFFF', border: `1px solid ${isDark ? '#27509B' : '#E5E5E5'}`, color: isDark ? '#F2F2F2' : '#1A1A1A' }}
            >
              <Mail size={24} style={{ color: michelinBlue }} />
              bryceshartle@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/bryceshartle/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: isDark ? '#00205B' : '#FFFFFF', border: `1px solid ${isDark ? '#27509B' : '#E5E5E5'}`, color: isDark ? '#F2F2F2' : '#1A1A1A' }}
            >
              <Linkedin size={24} style={{ color: michelinBlue }} />
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6" style={{ borderTop: `1px solid ${isDark ? '#27509B44' : '#E5E5E5'}`, backgroundColor: isDark ? darkBg1 : lightBg1 }}>
        <div className="max-w-6xl mx-auto text-center">
          <p style={{ color: isDark ? '#666666' : '#999999' }}>
            © {new Date().getFullYear()} Bryce Shartle. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
