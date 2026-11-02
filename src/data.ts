export const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

export const skills = [
  'Sales & Territory Management', 'Account Management', 'Client Relationship Building',
  'Business Development', 'Stakeholder Engagement', 'Strategic Planning',
  'Data-Driven Decision Making', 'Business Intelligence', 'Process Optimization',
  'Cross-Functional Collaboration', 'Microsoft Suite', 'Project Coordination'
];

export const experiences = [
  {
    company: 'Michelin',
    location: 'New York, NY · NY/NJ Territory',
    positions: [
      {
        title: 'NY/NJ B2C Sales Account Manager (WDA)',
        period: 'August 2026 – Present',
        highlights: [
          'Responsible for managing and developing client relationships across a defined territory in the New York and New Jersey area, serving distributors of varying sizes within Michelin\'s Wholesale Distributor & Associate (WDA) channel.',
          'Focus on understanding each account\'s needs and business dynamics, identifying growth opportunities, and delivering consistent value through strong product knowledge, consultative engagement, and reliable follow-through.',
          'Building a presence in the territory through regular client contact, strengthening existing partnerships, and developing new business across the channel.'
        ]
      },
      {
        title: 'Data Analyst Pipeline – Supply Chain & Logistics',
        period: 'January 2026 – August 2026',
        highlights: [
          'Served within Michelin\'s Supply Chain & Logistics department in a pipeline role designed to build cross-functional business acumen. Working closely with stakeholders across operations, the focus was on translating complex information into clear, actionable insights that supported smarter decision-making and drove measurable improvements in efficiency, cost, and overall performance.',
          'Built and delivered operational tools that gave teams and leadership better visibility into the business — including a logistics tracking solution, a manager-facing budget tool, and an automated communications workflow that streamlined how key information was shared across the organization.',
          'Co-led a recurring cross-functional meeting of roughly 50 people, keeping service centers, distribution centers, logistics teams, and internal partners aligned on shared priorities. Planned and executed a full-day, department-wide conference, managing budget, logistics, and stakeholder coordination from start to finish.',
          'Represented Michelin at the University of Tennessee Supply Chain Forum, engaging with prospective talent and contributing to intern recruitment. Contributed to executive-level reporting that informed how leadership understood and acted on key business metrics.'
        ]
      },
      {
        title: 'Supply Chain & Logistics Intern',
        period: 'May 2025 – January 2026',
        highlights: [
          'Led the development of a standardized solution to improve warehouse space utilization across the North American logistics network, working directly with warehouse teams to validate and refine the approach.',
          'Translated the solution into an interactive operational tool, enabling teams to make better decisions around space planning and resource allocation.',
          'Collaborated closely with site teams through visits and hands-on engagement to ensure the solution met real-world needs and was successfully adopted across locations.'
        ]
      },
      {
        title: 'IT / Supply Chain & Logistics Intern',
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
        title: 'Front End Supervisor / Customer Service',
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

export const leadership = [
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

export const portfolioItems = [
  { image: asset('CAPSTONE.JPG'), w: 1600, h: 1135,          title: 'Senior Capstone Presentation', category: 'Capstone Project' },
  { image: asset('CHARTER_GROUP.JPG'), w: 1600, h: 1067,     title: 'Delta Chi Chartering Group',    category: 'Leadership' },
  { image: asset('CHARTER_SPEECH.JPG'), w: 1600, h: 1067,    title: 'Chartering Speech',             category: 'Public Speaking' },
  { image: asset('GRADUATION.JPG'), w: 1600, h: 1067,        title: 'Graduation',                    category: 'Milestone' },
  { image: asset('MICHELIN_ABWTS.jpg'), w: 1600, h: 1484,    title: 'Michelin ABWTS',                category: 'Professional Experience' },
  { image: asset('MICHELIN_GROUP.jpg'), w: 1600, h: 1200,    title: 'Michelin Team',                 category: 'Professional Experience' },
  { image: asset('MICHELIN_UT_CONF.jpeg'), w: 1600, h: 1200, title: 'Michelin UT Conference',        category: 'Professional Experience' },
  { image: asset('PRESIDENT.JPG'), w: 1600, h: 1067,         title: "President's Reception",         category: 'Recognition' },
];

