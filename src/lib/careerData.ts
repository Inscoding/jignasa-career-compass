// Comprehensive career database with eligibility rules and unique roadmaps

export interface Career {
  id: string;
  title: string;
  type: 'government' | 'private' | 'self-employed';
  description: string;
  salaryRange: { min: number; max: number; display: string };
  timeToAchieve: string;
  
  // Eligibility rules
  eligibility: {
    minEducation: string[]; // '10th', '12th', 'graduate', 'postgraduate'
    requiredSubjects: { subject: string; minScore: number }[];
    preferredInterests: string[];
    budgetLevel: string[]; // 'low', 'medium', 'high'
    durationFit: string[]; // '6months', '1year', '2years', '4years'
    relocationRequired: boolean;
    urbanRequired: boolean;
  };
  
  // Scoring weights for this career
  weights: {
    academic: number;
    skill: number;
    interest: number;
    opportunity: number;
  };
  
  // Unique roadmap
  roadmap: RoadmapStep[];
  
  // State-specific opportunities
  stateOpportunities: Record<string, string[]>;
  
  // AI reasoning templates
  reasoningTemplates: {
    summary: string;
    strengths: string[];
    considerations: string[];
  };
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  type: 'education' | 'skill' | 'experience' | 'goal';
}

export const careers: Career[] = [
  // TECHNOLOGY CAREERS
  {
    id: 'software-developer',
    title: 'Software Developer',
    type: 'private',
    description: 'Build applications and software solutions. High demand in IT sector with excellent remote work opportunities.',
    salaryRange: { min: 400000, max: 1500000, display: '₹4-15 LPA' },
    timeToAchieve: '2-3 Years',
    eligibility: {
      minEducation: ['12th', 'graduate', 'postgraduate'],
      requiredSubjects: [
        { subject: 'mathematics', minScore: 60 },
        { subject: 'computers', minScore: 50 }
      ],
      preferredInterests: ['technology', 'engineering'],
      budgetLevel: ['low', 'medium', 'high'],
      durationFit: ['1year', '2years', '4years'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 25, skill: 35, interest: 25, opportunity: 15 },
    roadmap: [
      { title: 'Learn Programming Fundamentals', description: 'Start with Python or JavaScript through free platforms like freeCodeCamp, NPTEL, or Coursera. Build basic programs.', duration: '3 Months', type: 'education' },
      { title: 'Master Web Development', description: 'Learn HTML, CSS, React or similar frameworks. Create responsive websites and understand APIs.', duration: '4 Months', type: 'skill' },
      { title: 'Build Portfolio Projects', description: 'Create 5-6 real projects: e-commerce site, blog, todo app, API project. Push to GitHub.', duration: '3 Months', type: 'skill' },
      { title: 'Get Certified', description: 'Complete certifications from Google, Microsoft, or AWS. These add credibility to your profile.', duration: '2 Months', type: 'education' },
      { title: 'Internship or Freelance', description: 'Apply for internships or take freelance projects. Build real-world experience.', duration: '6 Months', type: 'experience' },
      { title: 'Land Full-Time Role', description: 'Apply to product companies and startups. Prepare for technical interviews.', duration: 'Ongoing', type: 'goal' }
    ],
    stateOpportunities: {
      'Telangana': ['Hyderabad IT Hub', 'TASK Training Programs', 'T-Hub Startup Ecosystem'],
      'Karnataka': ['Bangalore Tech Park', 'KEONICS Centers', 'Startup Karnataka'],
      'Maharashtra': ['Pune IT Corridor', 'Mumbai Fintech Hub', 'Nasscom Foundation'],
      'Tamil Nadu': ['Chennai IT Expressway', 'ELCOT Centers', 'Startup TN'],
      'Andhra Pradesh': ['Vizag IT SEZ', 'Amaravati Tech City', 'AP Innovation Society'],
      'default': ['Remote Work Opportunities', 'Online Freelancing', 'Government IT Training Centers']
    },
    reasoningTemplates: {
      summary: 'Your strong analytical abilities and interest in technology make Software Development an excellent match. The field offers flexibility, remote work options, and high earning potential.',
      strengths: [
        'Strong foundation in mathematics and logical thinking',
        'Demonstrated interest in technology and computers',
        'Industry has high demand and growth trajectory',
        'Can start with free resources and self-study'
      ],
      considerations: [
        'Requires consistent self-learning and practice',
        'Initial investment in laptop/internet needed',
        'Competition is high - specialization helps',
        'Fast-changing field requires continuous updates'
      ]
    }
  },
  
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    type: 'private',
    description: 'Analyze data to derive business insights. Growing field with opportunities in all industries.',
    salaryRange: { min: 350000, max: 1200000, display: '₹3.5-12 LPA' },
    timeToAchieve: '1-2 Years',
    eligibility: {
      minEducation: ['12th', 'graduate', 'postgraduate'],
      requiredSubjects: [
        { subject: 'mathematics', minScore: 70 },
        { subject: 'computers', minScore: 40 }
      ],
      preferredInterests: ['technology', 'business'],
      budgetLevel: ['low', 'medium', 'high'],
      durationFit: ['6months', '1year', '2years'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 30, skill: 30, interest: 20, opportunity: 20 },
    roadmap: [
      { title: 'Excel & Statistics Mastery', description: 'Master advanced Excel functions, pivot tables, and basic statistics concepts.', duration: '2 Months', type: 'skill' },
      { title: 'Learn SQL & Databases', description: 'Learn to query databases, understand data structures, practice on sample datasets.', duration: '2 Months', type: 'skill' },
      { title: 'Python for Data Analysis', description: 'Learn pandas, numpy, and data manipulation. Complete hands-on projects.', duration: '3 Months', type: 'education' },
      { title: 'Visualization Tools', description: 'Master Power BI, Tableau or similar tools. Create compelling dashboards.', duration: '2 Months', type: 'skill' },
      { title: 'Capstone Projects', description: 'Complete 3-4 end-to-end analysis projects. Document insights and methodology.', duration: '2 Months', type: 'experience' },
      { title: 'Entry-Level Position', description: 'Apply to analyst roles in startups, consultancies, or large companies.', duration: 'Ongoing', type: 'goal' }
    ],
    stateOpportunities: {
      'Telangana': ['Hyderabad Analytics Hub', 'Data Science Training at TASK'],
      'Karnataka': ['Bangalore Data Centers', 'IIIT-B Programs'],
      'Maharashtra': ['Mumbai Financial Analytics', 'Pune IT Companies'],
      'default': ['Remote Analytics Jobs', 'Freelance Data Projects']
    },
    reasoningTemplates: {
      summary: 'Your mathematical aptitude and analytical mindset align perfectly with Data Analysis. This field bridges business and technology, offering stable career growth.',
      strengths: [
        'Excellent mathematical and analytical skills',
        'Shorter learning curve compared to full development',
        'High demand across all industries',
        'Can work remotely or locally'
      ],
      considerations: [
        'Requires attention to detail and accuracy',
        'Need to learn business domain knowledge',
        'Tools and technologies evolve frequently',
        'Communication skills are essential'
      ]
    }
  },
  
  // GOVERNMENT CAREERS
  {
    id: 'bank-po',
    title: 'Bank Officer (IBPS PO)',
    type: 'government',
    description: 'Manage banking operations and customer services. Stable government job with excellent benefits and pension.',
    salaryRange: { min: 500000, max: 900000, display: '₹5-9 LPA' },
    timeToAchieve: '1-2 Years',
    eligibility: {
      minEducation: ['graduate', 'postgraduate'],
      requiredSubjects: [
        { subject: 'mathematics', minScore: 50 },
        { subject: 'languages', minScore: 60 }
      ],
      preferredInterests: ['government', 'business'],
      budgetLevel: ['low', 'medium'],
      durationFit: ['1year', '2years'],
      relocationRequired: true,
      urbanRequired: false
    },
    weights: { academic: 35, skill: 20, interest: 20, opportunity: 25 },
    roadmap: [
      { title: 'Understand Exam Pattern', description: 'Study IBPS PO syllabus: Quantitative Aptitude, Reasoning, English, General Awareness, Computer Knowledge.', duration: '1 Month', type: 'education' },
      { title: 'Foundation Building', description: 'Strengthen basics in maths, reasoning, and English. Use free resources and previous papers.', duration: '3 Months', type: 'skill' },
      { title: 'Mock Tests & Practice', description: 'Take daily mock tests. Analyze mistakes and improve speed and accuracy.', duration: '4 Months', type: 'skill' },
      { title: 'Current Affairs Preparation', description: 'Follow banking news, economic updates, and current affairs daily.', duration: 'Ongoing', type: 'skill' },
      { title: 'Clear Prelims', description: 'Attempt IBPS PO Prelims. Qualify for Mains examination.', duration: '1 Attempt', type: 'goal' },
      { title: 'Mains & Interview', description: 'Prepare for descriptive paper and personal interview. Join a bank as Probationary Officer.', duration: '2-3 Months', type: 'goal' }
    ],
    stateOpportunities: {
      'Telangana': ['SBI Hyderabad Circle', 'Andhra Bank Regional Offices'],
      'Maharashtra': ['Mumbai Banking Hub', 'RBI Regional Office'],
      'Uttar Pradesh': ['Large Network of Bank Branches', 'Regional Rural Banks'],
      'default': ['Posted Anywhere in India', 'Rural Service Options Available']
    },
    reasoningTemplates: {
      summary: 'Your educational background and interest in stable government employment make Banking a strong career choice. It offers job security, good salary, and work-life balance.',
      strengths: [
        'Strong academic foundation for competitive exams',
        'Job security with government benefits',
        'Clear promotion path and career growth',
        'Posted in your home state possible'
      ],
      considerations: [
        'Competitive exam - requires dedicated preparation',
        'Initial postings may be in rural areas',
        'Transfer policy applies after joining',
        'Need to clear multiple exam stages'
      ]
    }
  },
  
  {
    id: 'ssc-cgl',
    title: 'SSC CGL Officer',
    type: 'government',
    description: 'Central government jobs in various ministries and departments. Multiple post options available.',
    salaryRange: { min: 450000, max: 800000, display: '₹4.5-8 LPA' },
    timeToAchieve: '1-2 Years',
    eligibility: {
      minEducation: ['graduate', 'postgraduate'],
      requiredSubjects: [
        { subject: 'mathematics', minScore: 50 },
        { subject: 'languages', minScore: 50 }
      ],
      preferredInterests: ['government'],
      budgetLevel: ['low', 'medium'],
      durationFit: ['1year', '2years'],
      relocationRequired: true,
      urbanRequired: false
    },
    weights: { academic: 35, skill: 20, interest: 25, opportunity: 20 },
    roadmap: [
      { title: 'Study Exam Pattern', description: 'Understand SSC CGL Tier 1, 2, 3, 4 pattern. Know the post preferences available.', duration: '2 Weeks', type: 'education' },
      { title: 'Quantitative Aptitude', description: 'Master arithmetic, algebra, geometry, trigonometry. Practice speed maths.', duration: '3 Months', type: 'skill' },
      { title: 'Reasoning & English', description: 'Build strong reasoning skills and English comprehension. Daily practice essential.', duration: '3 Months', type: 'skill' },
      { title: 'General Awareness', description: 'Study static GK, polity, history, geography, economics, and current affairs.', duration: 'Ongoing', type: 'education' },
      { title: 'Mock Test Series', description: 'Take full-length mock tests. Maintain accuracy above 80% with speed.', duration: '4 Months', type: 'skill' },
      { title: 'Clear All Tiers', description: 'Pass Tier 1, 2, 3 (descriptive), and Tier 4 (computer proficiency test).', duration: '6-12 Months', type: 'goal' }
    ],
    stateOpportunities: {
      'default': ['Central Government Posts Across India', 'Income Tax Department', 'Customs & Excise', 'Ministry Positions']
    },
    reasoningTemplates: {
      summary: 'Your academic profile and preference for government service align well with SSC CGL. It offers diverse posting options across central government departments.',
      strengths: [
        'Multiple post options based on rank',
        'Central government job security',
        'Good salary with DA and HRA',
        'Opportunity for nationwide postings'
      ],
      considerations: [
        'Highly competitive examination',
        'Long exam process (multiple tiers)',
        'Postings may be anywhere in India',
        'Requires consistent preparation for 12-18 months'
      ]
    }
  },
  
  {
    id: 'state-psc',
    title: 'State Civil Services Officer',
    type: 'government',
    description: 'Administrative positions at state level. Prestigious career with decision-making authority.',
    salaryRange: { min: 600000, max: 1200000, display: '₹6-12 LPA' },
    timeToAchieve: '2-4 Years',
    eligibility: {
      minEducation: ['graduate', 'postgraduate'],
      requiredSubjects: [
        { subject: 'social', minScore: 60 },
        { subject: 'languages', minScore: 60 }
      ],
      preferredInterests: ['government', 'social'],
      budgetLevel: ['low', 'medium', 'high'],
      durationFit: ['2years', '4years'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 30, skill: 25, interest: 25, opportunity: 20 },
    roadmap: [
      { title: 'Understand State PSC Pattern', description: 'Study your state PSC exam pattern, previous papers, and syllabus thoroughly.', duration: '1 Month', type: 'education' },
      { title: 'NCERT Foundation', description: 'Complete NCERT books for history, geography, polity, economics (Class 6-12).', duration: '4 Months', type: 'education' },
      { title: 'Optional Subject Preparation', description: 'Choose and master your optional subject. This is crucial for mains.', duration: '6 Months', type: 'skill' },
      { title: 'Current Affairs & State Focus', description: 'Daily newspaper reading, state-specific issues, and current affairs compilation.', duration: 'Ongoing', type: 'skill' },
      { title: 'Answer Writing Practice', description: 'Practice answer writing daily. Get feedback and improve continuously.', duration: '6 Months', type: 'skill' },
      { title: 'Clear Prelims, Mains & Interview', description: 'Systematic attempt strategy. Join as state civil servant.', duration: '1-2 Years', type: 'goal' }
    ],
    stateOpportunities: {
      'Telangana': ['TSPSC Exams', 'Group 1, 2, 3 Services'],
      'Andhra Pradesh': ['APPSC Exams', 'District Collector Path'],
      'Karnataka': ['KPSC Exams', 'KAS Services'],
      'Tamil Nadu': ['TNPSC Exams', 'TN Civil Services'],
      'Maharashtra': ['MPSC Exams', 'State Services'],
      'default': ['State PSC Exams', 'Administrative Services']
    },
    reasoningTemplates: {
      summary: 'Your educational background and interest in public administration make State Civil Services an aspirational yet achievable goal. It offers prestige and the opportunity to serve your community.',
      strengths: [
        'Posted within your home state',
        'High social prestige and respect',
        'Direct impact on governance',
        'Excellent salary and benefits'
      ],
      considerations: [
        'Very competitive - success rate is low',
        'Requires 2-3 years dedicated preparation',
        'Optional subject choice is critical',
        'Multiple attempts may be needed'
      ]
    }
  },
  
  // TEACHING CAREERS
  {
    id: 'school-teacher',
    title: 'School Teacher (TET/CTET)',
    type: 'government',
    description: 'Teach students in government schools. Stable job with vacation benefits and good work-life balance.',
    salaryRange: { min: 300000, max: 600000, display: '₹3-6 LPA' },
    timeToAchieve: '1-2 Years',
    eligibility: {
      minEducation: ['12th', 'graduate', 'postgraduate'],
      requiredSubjects: [
        { subject: 'languages', minScore: 50 }
      ],
      preferredInterests: ['education'],
      budgetLevel: ['low', 'medium'],
      durationFit: ['1year', '2years'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 25, skill: 25, interest: 30, opportunity: 20 },
    roadmap: [
      { title: 'Complete B.Ed/D.El.Ed', description: 'Enroll in B.Ed (for secondary) or D.El.Ed (for primary) from recognized institution.', duration: '1-2 Years', type: 'education' },
      { title: 'CTET/TET Preparation', description: 'Study Child Development, Pedagogy, subject-specific methodology.', duration: '4 Months', type: 'skill' },
      { title: 'Clear TET Exam', description: 'Attempt state TET or central CTET. Qualify with good score.', duration: '1 Attempt', type: 'goal' },
      { title: 'Apply for Vacancies', description: 'Apply to state teacher recruitment. Prepare for interview.', duration: '2-3 Months', type: 'experience' },
      { title: 'Join as Teacher', description: 'Get posted in government school. Begin teaching career.', duration: 'Ongoing', type: 'goal' }
    ],
    stateOpportunities: {
      'Telangana': ['TS TET', 'DSC Recruitment', 'Gurukul Schools'],
      'Andhra Pradesh': ['AP TET', 'DSC', 'Model Schools'],
      'Karnataka': ['Karnataka TET', 'Teacher Recruitment Board'],
      'default': ['CTET', 'State TETs', 'KVS/NVS Schools']
    },
    reasoningTemplates: {
      summary: 'Your interest in education and desire for stable employment make Teaching an excellent career. It offers work-life balance and the satisfaction of shaping young minds.',
      strengths: [
        'Job security with government benefits',
        'School vacation holidays',
        'Good work-life balance',
        'Can serve in local community'
      ],
      considerations: [
        'Need B.Ed/D.El.Ed qualification',
        'State-specific TET requirements',
        'Competition for urban postings',
        'Initial salary may be modest'
      ]
    }
  },
  
  // HEALTHCARE CAREERS
  {
    id: 'nursing',
    title: 'Staff Nurse / ANM',
    type: 'government',
    description: 'Provide patient care in hospitals and health centers. Essential healthcare role with job security.',
    salaryRange: { min: 250000, max: 500000, display: '₹2.5-5 LPA' },
    timeToAchieve: '2-4 Years',
    eligibility: {
      minEducation: ['12th', 'graduate'],
      requiredSubjects: [
        { subject: 'science', minScore: 50 }
      ],
      preferredInterests: ['healthcare'],
      budgetLevel: ['low', 'medium'],
      durationFit: ['2years', '4years'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 25, skill: 30, interest: 30, opportunity: 15 },
    roadmap: [
      { title: 'Choose Nursing Course', description: 'Enroll in GNM (3 years), B.Sc Nursing (4 years), or ANM (2 years) based on eligibility.', duration: '2-4 Years', type: 'education' },
      { title: 'Clinical Training', description: 'Complete mandatory hospital training and internship hours.', duration: 'Part of Course', type: 'experience' },
      { title: 'Register with Nursing Council', description: 'Get registered with State Nursing Council after passing exams.', duration: '1-2 Months', type: 'skill' },
      { title: 'Prepare for Recruitment', description: 'Apply for government hospital positions, railway, defense medical services.', duration: '3-6 Months', type: 'skill' },
      { title: 'Join Healthcare System', description: 'Get posted in PHC, CHC, district hospital, or major government hospital.', duration: 'Ongoing', type: 'goal' }
    ],
    stateOpportunities: {
      'Telangana': ['Government Nursing Colleges', 'NIMS Hospital', 'District Hospitals'],
      'Andhra Pradesh': ['AP Government Nursing Schools', 'SVIMS', 'Medical Colleges'],
      'Kerala': ['Kerala Nursing Council', 'Medical Colleges'],
      'default': ['Government Nursing Schools', 'AIIMS Nursing', 'Railway Hospital Services']
    },
    reasoningTemplates: {
      summary: 'Your interest in healthcare and science aptitude make Nursing a rewarding career. It offers job security, the ability to help others, and opportunities close to home.',
      strengths: [
        'High demand for nursing professionals',
        'Jobs available in rural and urban areas',
        'Government job security and benefits',
        'Noble profession with social respect'
      ],
      considerations: [
        'Requires 2-4 years of training',
        'Physically demanding work',
        'Shift duties and night shifts',
        'Emotional challenges in patient care'
      ]
    }
  },
  
  {
    id: 'pharmacy',
    title: 'Pharmacist',
    type: 'private',
    description: 'Dispense medicines and provide drug information. Can work in hospitals, retail, or start own pharmacy.',
    salaryRange: { min: 250000, max: 600000, display: '₹2.5-6 LPA' },
    timeToAchieve: '2-4 Years',
    eligibility: {
      minEducation: ['12th', 'graduate'],
      requiredSubjects: [
        { subject: 'science', minScore: 50 },
        { subject: 'mathematics', minScore: 40 }
      ],
      preferredInterests: ['healthcare', 'business'],
      budgetLevel: ['medium', 'high'],
      durationFit: ['2years', '4years'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 30, skill: 25, interest: 25, opportunity: 20 },
    roadmap: [
      { title: 'D.Pharm or B.Pharm Course', description: 'Enroll in Diploma in Pharmacy (2 years) or Bachelor of Pharmacy (4 years).', duration: '2-4 Years', type: 'education' },
      { title: 'Register with Pharmacy Council', description: 'Get registered with State Pharmacy Council to practice.', duration: '1 Month', type: 'skill' },
      { title: 'Gain Experience', description: 'Work in hospital pharmacy or retail to gain practical experience.', duration: '1-2 Years', type: 'experience' },
      { title: 'Specialization Options', description: 'Consider clinical pharmacy, industrial pharmacy, or pharmaceutical marketing.', duration: 'Optional', type: 'skill' },
      { title: 'Open Own Pharmacy', description: 'With experience and capital, open own medical store with drug license.', duration: 'Optional', type: 'goal' }
    ],
    stateOpportunities: {
      'Telangana': ['Pharmacy Colleges', 'Jan Aushadhi Kendras', 'Pharma Companies in Hyderabad'],
      'Gujarat': ['Pharma Industry Hub', 'Ahmedabad Pharmaceutical Zone'],
      'Maharashtra': ['Mumbai Pharma Companies', 'Pune Biotech Corridor'],
      'default': ['Hospital Pharmacies', 'Retail Medical Stores', 'Pharma Companies']
    },
    reasoningTemplates: {
      summary: 'Your science aptitude and interest in healthcare make Pharmacy a practical career choice. It offers flexibility between employment and self-employment options.',
      strengths: [
        'Can start with diploma (D.Pharm)',
        'Option to own your own business',
        'Consistent demand for pharmacists',
        'Work available in local areas'
      ],
      considerations: [
        'Registration and licensing required',
        'Investment needed for own pharmacy',
        'Need to keep updated on new drugs',
        'Competitive field in urban areas'
      ]
    }
  },
  
  // AGRICULTURE & SELF-EMPLOYMENT
  {
    id: 'agri-entrepreneur',
    title: 'Agricultural Entrepreneur',
    type: 'self-employed',
    description: 'Start farming-related business - organic farming, dairy, poultry, food processing, or agri-tech.',
    salaryRange: { min: 200000, max: 1000000, display: '₹2-10 LPA' },
    timeToAchieve: '1-2 Years',
    eligibility: {
      minEducation: ['10th', '12th', 'graduate', 'postgraduate'],
      requiredSubjects: [],
      preferredInterests: ['agriculture', 'business'],
      budgetLevel: ['low', 'medium', 'high'],
      durationFit: ['6months', '1year', '2years'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 15, skill: 30, interest: 30, opportunity: 25 },
    roadmap: [
      { title: 'Identify Your Niche', description: 'Research options: organic farming, dairy, poultry, mushroom, beekeeping, food processing.', duration: '1 Month', type: 'education' },
      { title: 'Get Training', description: 'Join KVK, NABARD, or agricultural university training programs. Many are free.', duration: '1-3 Months', type: 'skill' },
      { title: 'Study Government Schemes', description: 'Explore PM-KISAN, MUDRA loans, state subsidies, Startup India Agriculture.', duration: '1 Month', type: 'education' },
      { title: 'Start Small Scale', description: 'Begin with pilot project to learn and minimize risk. Document learnings.', duration: '6 Months', type: 'experience' },
      { title: 'Scale Up Business', description: 'Expand based on market demand. Add value through processing or direct marketing.', duration: 'Ongoing', type: 'goal' }
    ],
    stateOpportunities: {
      'Telangana': ['Telangana Rythu Bandhu', 'KVK Hyderabad', 'Organic Farming Clusters'],
      'Andhra Pradesh': ['Rythu Bharosa', 'Zero Budget Natural Farming', 'FPO Support'],
      'Punjab': ['Progressive Farming', 'Dairy Development', 'Agri Processing'],
      'default': ['NABARD Schemes', 'KVK Training', 'PM-KISAN', 'MUDRA Loans']
    },
    reasoningTemplates: {
      summary: 'Your interest in agriculture and local roots make Agri-entrepreneurship ideal. Government support is strong, and you can build a sustainable business in your own community.',
      strengths: [
        'Work from home/village',
        'Government subsidies and support available',
        'Low investment options exist',
        'Growing demand for organic products'
      ],
      considerations: [
        'Income can be seasonal/variable',
        'Weather and market risks exist',
        'Requires hands-on work and patience',
        'Success depends on market access'
      ]
    }
  },
  
  {
    id: 'dairy-farming',
    title: 'Dairy Farming Business',
    type: 'self-employed',
    description: 'Start dairy farm with cattle/buffalo. Steady income with government support and local demand.',
    salaryRange: { min: 150000, max: 600000, display: '₹1.5-6 LPA' },
    timeToAchieve: '6 Months - 1 Year',
    eligibility: {
      minEducation: ['10th', '12th', 'graduate'],
      requiredSubjects: [],
      preferredInterests: ['agriculture', 'business'],
      budgetLevel: ['low', 'medium'],
      durationFit: ['6months', '1year'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 10, skill: 30, interest: 30, opportunity: 30 },
    roadmap: [
      { title: 'Basic Training', description: 'Attend dairy training at local KVK or veterinary college. Learn cattle management.', duration: '1 Month', type: 'education' },
      { title: 'Secure Financing', description: 'Apply for dairy loan under NABARD, Mudra, or state dairy development schemes.', duration: '1-2 Months', type: 'skill' },
      { title: 'Purchase Cattle', description: 'Buy 2-5 high-yield cattle (HF, Jersey, or Murrah buffalo). Set up shed.', duration: '1 Month', type: 'experience' },
      { title: 'Set Up Operations', description: 'Establish milking routine, fodder management, health care protocols.', duration: '2 Months', type: 'skill' },
      { title: 'Market Your Milk', description: 'Sell to dairy cooperative, local sweet shops, or directly to consumers.', duration: 'Ongoing', type: 'goal' }
    ],
    stateOpportunities: {
      'Gujarat': ['Amul Model', 'Dairy Cooperatives', 'Milk Collection Centers'],
      'Punjab': ['Verka Dairy', 'Progressive Dairy Farming'],
      'Haryana': ['Vita Dairy Network', 'Murrah Buffalo Breeding'],
      'default': ['NABARD Dairy Loans', 'State Dairy Federations', 'Village Cooperatives']
    },
    reasoningTemplates: {
      summary: 'Your rural background and practical mindset make Dairy Farming a viable business. It offers regular income and can be done alongside other activities.',
      strengths: [
        'Daily income from milk sales',
        'Low-cost loans available',
        'Can start with just 2-3 animals',
        'Strong local demand exists'
      ],
      considerations: [
        'Daily commitment required',
        'Animal health risks to manage',
        'Fodder costs can be significant',
        'Need basic infrastructure'
      ]
    }
  },
  
  // SKILLED TRADES
  {
    id: 'electrician',
    title: 'Electrician / Electrical Technician',
    type: 'self-employed',
    description: 'Install and maintain electrical systems. High demand skill with options for employment or self-employment.',
    salaryRange: { min: 200000, max: 500000, display: '₹2-5 LPA' },
    timeToAchieve: '6 Months - 2 Years',
    eligibility: {
      minEducation: ['10th', '12th'],
      requiredSubjects: [
        { subject: 'mathematics', minScore: 40 }
      ],
      preferredInterests: ['engineering', 'technology'],
      budgetLevel: ['low', 'medium'],
      durationFit: ['6months', '1year', '2years'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 15, skill: 40, interest: 25, opportunity: 20 },
    roadmap: [
      { title: 'ITI Electrician Course', description: 'Enroll in ITI Electrician trade (2 years) or short-term courses (6 months).', duration: '6 Months - 2 Years', type: 'education' },
      { title: 'Apprenticeship', description: 'Join apprenticeship program with electrical contractor or industry.', duration: '1 Year', type: 'experience' },
      { title: 'Get Wireman License', description: 'Apply for electrical wireman/supervisor license from electricity board.', duration: '1-2 Months', type: 'skill' },
      { title: 'Build Client Base', description: 'Start taking small jobs - house wiring, repairs, installations.', duration: '6 Months', type: 'experience' },
      { title: 'Grow Your Business', description: 'Expand to commercial projects, solar installations, industrial work.', duration: 'Ongoing', type: 'goal' }
    ],
    stateOpportunities: {
      'default': ['ITI Colleges', 'NSDC Skill Centers', 'Pradhan Mantri Kaushal Vikas Yojana', 'Solar Installation Training']
    },
    reasoningTemplates: {
      summary: 'Your practical aptitude and interest in engineering make Electrician work a solid choice. It\'s a skill in constant demand with good earning potential.',
      strengths: [
        'Always in demand - every building needs electricity',
        'Can work locally or anywhere',
        'Low training cost through ITI',
        'Self-employment freedom'
      ],
      considerations: [
        'Physical work, sometimes in difficult conditions',
        'Safety precautions essential',
        'License required for independent work',
        'Income varies with job availability'
      ]
    }
  },
  
  {
    id: 'mobile-repair',
    title: 'Mobile/Electronics Repair Technician',
    type: 'self-employed',
    description: 'Repair smartphones, laptops, and electronic devices. Growing demand with low startup cost.',
    salaryRange: { min: 150000, max: 400000, display: '₹1.5-4 LPA' },
    timeToAchieve: '3-6 Months',
    eligibility: {
      minEducation: ['10th', '12th'],
      requiredSubjects: [],
      preferredInterests: ['technology', 'engineering'],
      budgetLevel: ['low'],
      durationFit: ['6months', '1year'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 10, skill: 40, interest: 30, opportunity: 20 },
    roadmap: [
      { title: 'Basic Electronics Course', description: 'Learn fundamentals of electronics, circuits, and components.', duration: '1 Month', type: 'education' },
      { title: 'Mobile Repair Training', description: 'Join mobile repair course - software and hardware both. Practice on old phones.', duration: '2-3 Months', type: 'skill' },
      { title: 'Chip-Level Repair', description: 'Learn advanced motherboard repair, micro-soldering techniques.', duration: '2 Months', type: 'skill' },
      { title: 'Start Small Shop', description: 'Open repair shop in local market or work from home initially.', duration: '1 Month', type: 'experience' },
      { title: 'Expand Services', description: 'Add laptop repair, accessory sales, used phone trading.', duration: 'Ongoing', type: 'goal' }
    ],
    stateOpportunities: {
      'default': ['Private Training Institutes', 'Online Courses', 'PMKVY Centers', 'Local Market Shops']
    },
    reasoningTemplates: {
      summary: 'Your interest in technology and practical mindset make Mobile Repair a quick-start career. Low investment, local demand, and fast learning curve.',
      strengths: [
        'Very short training period',
        'Low startup investment',
        'Demand exists everywhere',
        'Can work from home or small shop'
      ],
      considerations: [
        'Technology changes fast - continuous learning needed',
        'Competition in urban areas',
        'Spare parts sourcing important',
        'Customer service skills essential'
      ]
    }
  },
  
  // BUSINESS & COMMERCE
  {
    id: 'accountant',
    title: 'Accountant / Tax Consultant',
    type: 'private',
    description: 'Handle financial records, tax filing, and compliance. Steady demand from businesses and individuals.',
    salaryRange: { min: 250000, max: 700000, display: '₹2.5-7 LPA' },
    timeToAchieve: '1-3 Years',
    eligibility: {
      minEducation: ['12th', 'graduate', 'postgraduate'],
      requiredSubjects: [
        { subject: 'mathematics', minScore: 50 }
      ],
      preferredInterests: ['business'],
      budgetLevel: ['low', 'medium'],
      durationFit: ['1year', '2years', '4years'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 30, skill: 30, interest: 25, opportunity: 15 },
    roadmap: [
      { title: 'Commerce Foundation', description: 'Complete B.Com or start with Tally and GST certification courses.', duration: '6 Months - 3 Years', type: 'education' },
      { title: 'Learn Accounting Software', description: 'Master Tally Prime, QuickBooks, or similar accounting software.', duration: '2 Months', type: 'skill' },
      { title: 'GST & Tax Knowledge', description: 'Learn GST filing, income tax returns, TDS compliance thoroughly.', duration: '3 Months', type: 'skill' },
      { title: 'Internship/Practice', description: 'Work with CA firm or tax consultant to gain practical experience.', duration: '6-12 Months', type: 'experience' },
      { title: 'Build Client Base', description: 'Start taking clients for GST filing, ITR, and bookkeeping services.', duration: 'Ongoing', type: 'goal' }
    ],
    stateOpportunities: {
      'default': ['CA Firms', 'Tax Consultancies', 'Corporate Accounts Departments', 'Freelance Practice']
    },
    reasoningTemplates: {
      summary: 'Your aptitude for numbers and business interest make Accounting a stable career path. Every business needs accounting services, ensuring consistent demand.',
      strengths: [
        'Steady demand from all businesses',
        'Can work locally or remotely',
        'Option for self-employment',
        'Clear career progression path'
      ],
      considerations: [
        'Peak work during tax seasons',
        'Need to stay updated on regulations',
        'Accuracy is critical',
        'Building client base takes time'
      ]
    }
  },
  
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    type: 'private',
    description: 'Help businesses grow online through social media, SEO, and advertising. Remote-friendly career.',
    salaryRange: { min: 250000, max: 800000, display: '₹2.5-8 LPA' },
    timeToAchieve: '6 Months - 1 Year',
    eligibility: {
      minEducation: ['12th', 'graduate', 'postgraduate'],
      requiredSubjects: [
        { subject: 'languages', minScore: 50 }
      ],
      preferredInterests: ['technology', 'creative', 'business', 'media'],
      budgetLevel: ['low', 'medium'],
      durationFit: ['6months', '1year'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 15, skill: 40, interest: 30, opportunity: 15 },
    roadmap: [
      { title: 'Learn Digital Marketing Basics', description: 'Take Google Digital Garage, HubSpot, or Coursera courses (free).', duration: '2 Months', type: 'education' },
      { title: 'Master Social Media', description: 'Learn Facebook, Instagram, LinkedIn marketing. Create sample campaigns.', duration: '2 Months', type: 'skill' },
      { title: 'SEO & Content Marketing', description: 'Understand search engine optimization, content strategy, and analytics.', duration: '2 Months', type: 'skill' },
      { title: 'Build Portfolio', description: 'Run campaigns for local businesses or personal projects. Document results.', duration: '3 Months', type: 'experience' },
      { title: 'Freelance or Join Agency', description: 'Apply to digital marketing agencies or start freelancing on Upwork/Fiverr.', duration: 'Ongoing', type: 'goal' }
    ],
    stateOpportunities: {
      'default': ['Remote Work', 'Digital Agencies', 'Startup Marketing Teams', 'Freelance Platforms']
    },
    reasoningTemplates: {
      summary: 'Your creative interests and communication skills align well with Digital Marketing. It\'s a field where you can work remotely and help businesses grow.',
      strengths: [
        'Can learn through free resources',
        'Work from anywhere',
        'Growing industry with high demand',
        'Creative and analytical balance'
      ],
      considerations: [
        'Results-driven field',
        'Platforms change frequently',
        'Competition from freelancers',
        'Need to continuously learn new tools'
      ]
    }
  },
  
  // CREATIVE CAREERS
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    type: 'private',
    description: 'Create visual content for brands, marketing, and digital media. Freelance or agency options.',
    salaryRange: { min: 200000, max: 600000, display: '₹2-6 LPA' },
    timeToAchieve: '6 Months - 1 Year',
    eligibility: {
      minEducation: ['10th', '12th', 'graduate'],
      requiredSubjects: [
        { subject: 'arts', minScore: 50 }
      ],
      preferredInterests: ['creative', 'technology', 'media'],
      budgetLevel: ['low', 'medium'],
      durationFit: ['6months', '1year'],
      relocationRequired: false,
      urbanRequired: false
    },
    weights: { academic: 10, skill: 45, interest: 30, opportunity: 15 },
    roadmap: [
      { title: 'Learn Design Fundamentals', description: 'Study color theory, typography, composition through free resources and courses.', duration: '1 Month', type: 'education' },
      { title: 'Master Design Tools', description: 'Learn Canva (free), then Adobe Photoshop and Illustrator.', duration: '3 Months', type: 'skill' },
      { title: 'Build Portfolio', description: 'Create 15-20 design pieces: logos, social media posts, posters, branding projects.', duration: '2 Months', type: 'skill' },
      { title: 'Find First Clients', description: 'Offer services to local businesses, join Fiverr, Upwork, or 99designs.', duration: '2 Months', type: 'experience' },
      { title: 'Specialize & Grow', description: 'Choose niche: branding, UI design, social media. Build reputation.', duration: 'Ongoing', type: 'goal' }
    ],
    stateOpportunities: {
      'default': ['Freelance Platforms', 'Design Agencies', 'Marketing Teams', 'Remote Work Globally']
    },
    reasoningTemplates: {
      summary: 'Your artistic abilities and interest in creative work make Graphic Design a natural fit. It offers flexibility, creative satisfaction, and remote work options.',
      strengths: [
        'Express creativity professionally',
        'Work from anywhere',
        'Low barrier to entry',
        'Portfolio speaks louder than degree'
      ],
      considerations: [
        'Competitive field',
        'Need to handle client feedback',
        'Income can be irregular initially',
        'Continuous skill development needed'
      ]
    }
  },
  
  // HOSPITALITY
  {
    id: 'hotel-management',
    title: 'Hotel/Hospitality Professional',
    type: 'private',
    description: 'Work in hotels, restaurants, or tourism industry. Opportunities for travel and customer service roles.',
    salaryRange: { min: 200000, max: 600000, display: '₹2-6 LPA' },
    timeToAchieve: '1-3 Years',
    eligibility: {
      minEducation: ['10th', '12th', 'graduate'],
      requiredSubjects: [
        { subject: 'languages', minScore: 50 }
      ],
      preferredInterests: ['hospitality', 'business'],
      budgetLevel: ['low', 'medium', 'high'],
      durationFit: ['1year', '2years', '4years'],
      relocationRequired: true,
      urbanRequired: true
    },
    weights: { academic: 20, skill: 30, interest: 30, opportunity: 20 },
    roadmap: [
      { title: 'Hospitality Course', description: 'Join hotel management diploma (1-3 years) or short-term certificate course.', duration: '1-3 Years', type: 'education' },
      { title: 'Industrial Training', description: 'Complete mandatory internship in hotel or restaurant.', duration: '6 Months', type: 'experience' },
      { title: 'Entry-Level Position', description: 'Join as trainee in front office, F&B service, or housekeeping.', duration: '6-12 Months', type: 'experience' },
      { title: 'Specialization', description: 'Choose department: front office, culinary, events, or revenue management.', duration: 'Ongoing', type: 'skill' },
      { title: 'Management Role', description: 'Progress to supervisory and management positions.', duration: '3-5 Years', type: 'goal' }
    ],
    stateOpportunities: {
      'Kerala': ['Tourism Hub', 'Beach Resorts', 'Ayurveda Hotels'],
      'Rajasthan': ['Heritage Hotels', 'Palace Properties', 'Tourist Destinations'],
      'Goa': ['Beach Resorts', 'International Hotel Chains'],
      'default': ['Hotel Chains', 'Restaurants', 'Airlines', 'Cruise Ships']
    },
    reasoningTemplates: {
      summary: 'Your interest in hospitality and people skills make this a fulfilling career choice. It offers diverse opportunities from local hotels to international chains.',
      strengths: [
        'Dynamic work environment',
        'Career progression opportunities',
        'Tips and service charges add to income',
        'Can work in tourist destinations'
      ],
      considerations: [
        'Often requires relocation',
        'Long working hours and shifts',
        'Weekend and holiday work common',
        'Initial positions may be entry-level'
      ]
    }
  },
];

// Helper function to get careers filtered by criteria
export function getFilteredCareers(
  education: string,
  interests: string[],
  budget: string,
  duration: string,
  canRelocate: boolean,
  areaType: string
): Career[] {
  return careers.filter(career => {
    // Check education eligibility
    const eduOrder = ['10th', '12th', 'graduate', 'postgraduate'];
    const userEduIndex = eduOrder.indexOf(education);
    const minEduIndex = Math.min(...career.eligibility.minEducation.map(e => eduOrder.indexOf(e)));
    if (userEduIndex < minEduIndex) return false;
    
    // Check budget fit
    if (!career.eligibility.budgetLevel.includes(budget)) return false;
    
    // Check duration fit
    if (!career.eligibility.durationFit.includes(duration)) return false;
    
    // Check relocation requirement
    if (career.eligibility.relocationRequired && !canRelocate) return false;
    
    // Check urban requirement
    if (career.eligibility.urbanRequired && areaType === 'rural') return false;
    
    return true;
  });
}
