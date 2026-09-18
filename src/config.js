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
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    primary: '#0066cc',
    ink: '#1d1d1f',
    canvas: '#ffffff',
    parchment: '#f5f5f7',
    // kept for gatsby-config manifest colours
    green: '#0066cc',
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
