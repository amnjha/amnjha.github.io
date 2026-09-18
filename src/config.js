module.exports = {
  email: 'amanjha22@gmail.com',
  bookCallUrl: 'https://topmate.io/amnjha',
  resumePath: '/aman_resume.pdf',
  openToWork: true,

  role: 'Staff Engineer',
  company: { name: 'SwiffyLabs', url: 'https://www.swiffylabs.com/' },

  location: {
    city: 'Bengaluru',
    country: 'India',
    coordinates: '12.9716° N, 77.5946° E',
  },

  skills: [
    'Java',
    'Go',
    'Spring Boot',
    'PostgreSQL',
    'Kafka',
    'Redis',
    'Docker',
    'Kubernetes',
    'Azure',
    'AWS',
  ],

  reading: {
    title: 'The 48 Laws of Power',
    author: 'Robert Greene',
    url: 'https://www.goodreads.com/book/show/1303.The_48_Laws_of_Power',
    // Drop a cover at src/images/books/<cover>.jpg (or .png) and it is picked up automatically
    cover: '48-laws-of-power',
  },

  process: [
    {
      title: 'Discovery Call',
      description:
        'In the first stage, we’ll have a discovery call to discuss your goals, needs and project requirements. This helps us align our vision and set the foundation for a successful collaboration.',
    },
    {
      title: 'Scope & Design',
      description:
        'I map the problem into service boundaries, data models and a delivery plan, and we agree on what ships first and what can wait.',
    },
    {
      title: 'Build',
      description:
        'Focused delivery in short iterations, with configuration over code wherever it lets the team move faster without a release.',
    },
    {
      title: 'Review & Iterate',
      description:
        'Regular demos and code reviews keep quality high and surprises low. Feedback goes straight back into the next iteration.',
    },
    {
      title: 'Ship & Support',
      description:
        'We launch with dashboards and alerting in place, then I stay around to tune, document and hand over cleanly.',
    },
  ],

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/amnjha',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/amnjha',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/amn_jha',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/amnjha',
    },
    {
      name: 'StackOverflow',
      url: 'https://stackoverflow.com/users/3879941/aman-j',
    },
  ],

  navLinks: [
    {
      name: 'Experience',
      url: '/#experience',
    },
    {
      name: 'Work',
      url: '/#work',
    },
    {
      name: 'How I work',
      url: '/#process',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    primary: '#f0874b',
    ink: '#1d1d1f',
    canvas: '#ffffff',
    parchment: '#f5f5f7',
    // kept for gatsby-config manifest colours
    green: '#f0874b',
    navy: '#ffffff',
    darkNavy: '#f5f5f7',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
