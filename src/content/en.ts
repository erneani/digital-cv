import type { CVData } from '../types/cv'

const en: CVData = {
  name: 'Vinícius Ernani',
  title: 'Senior Software Engineer',
  contact: {
    phone: '+55 84 99147-9189',
    email: 'viniciusernanicarvalho@gmail.com',
    location: 'Natal, Rio Grande do Norte, Brazil',
    github: 'github.com/erneani',
  },
  about:
    "I am a full-cycle software engineer with 7 years of experience in some of the world's major companies. My specialities are Front End development and Software Architecture.",
  experience: [
    {
      company: 'Mercado Libre',
      role: 'Senior Software Engineer',
      period: 'Feb 2024 – present',
      description: 'Joined Mercado Libre to improve the Marketplace products.',
      competencies: [
        'Create scalable, user-centric applications with strong accessibility, internationalization, and resilience.',
        'Design and create a service to quickly and globally notify users through UI in the application.',
      ],
      technologies: [
        'JavaScript (React) for Front End development.',
        'Java (Spring) for Back End development.',
        'GitHub Actions for CI and CD.',
        'React Testing Library and Jest for code quality.',
      ],
    },
    {
      company: 'Thoughtworks',
      role: 'Software Consultant',
      period: 'May 2021 – Jan 2024',
      description:
        'Joined Thoughtworks to provide technological expertise for other companies around the world.',
      competencies: [
        'Provided maintenance and scalability for a legacy and critical financial spreadsheet application for a US big Real Estate company.',
        'Worked on the creation of a globally distributed mathematical application with real-time data for a US big Oil and Gas company.',
        'Provided technical and business expertise to improve client retention for products in a big Oil and Gas company.',
      ],
      technologies: [
        'JavaScript and TypeScript (React and Angular) for Front End development.',
        'Python (FastAPI), C# (.NET), Node.js (Express), and Java (Spring) for Back End development.',
        'AWS, Google Cloud, and Azure for cloud services.',
        'Postgres, Redis, MariaDB, and MySQL for databases.',
        'Kafka, RabbitMQ and Azure Service Bus for message brokers.',
        'GitHub Actions, Jenkins, and CircleCI for CI and CD.',
        'React Testing Library, Jest, Pytest, SonarQube and many other testing tools for code quality.',
      ],
    },
    {
      company: 'Globo.com',
      role: 'SmartTV Software Engineer',
      period: 'Sep 2020 – Apr 2021',
      description:
        "Joined Globo.com to research and create solutions for the SmartTV environment at LATAM's biggest streaming company, Globoplay.",
      competencies: [
        'Delivered pixel-perfect, fast, and lightweight web components for a streaming platform with more than 5 million monthly users.',
        'Researched and refined technologies to improve application usability and responsiveness using React and Canvas.',
        'Co-implemented a robust fallback system that increased user screen time during peak hours.',
        'Changed project architecture to avoid re-fetching hardware information for each component.',
      ],
      technologies: [
        'JavaScript (React and vanilla) for Front End development.',
        'GraphQL for database queries.',
        'Redux for global state management.',
        'React Testing Library and Jest for unit testing.',
        'Cypress for E2E testing.',
        'Storybook for component documentation.',
      ],
    },
  ],
  education: [
    {
      institution: 'Federal University of Rio Grande do Norte (UFRN)',
      institutionUrl: 'https://www.ufrn.br/',
      degree: 'Information Technology degree',
      period: '2019 – 2024',
    },
    {
      institution:
        'Federal Institute of Education, Science, and Technology of Rio Grande do Norte (IFRN)',
      institutionUrl: 'https://portal.ifrn.edu.br/',
      degree: 'Informatics technical degree',
      period: '2015 – 2019',
    },
    {
      institution: 'Digital Metrópolis Institute (IMD)',
      institutionUrl: 'https://www.metropoledigital.ufrn.br/portal/',
      degree: 'Web Informatics technical degree',
      period: '2017 – 2020',
    },
  ],
  languages: [
    { language: 'Portuguese', proficiency: 'native' },
    { language: 'English', proficiency: 'professional' },
    { language: 'Spanish', proficiency: 'professional' },
    { language: 'French', proficiency: 'conversational' },
  ],
  interests: [
    'Code quality improvements and tests.',
    'Reactive software architectures.',
    'Discrete mathematics and graphs.',
    'Algorithm performance and asymptotic notation.',
  ],
  community: [
    'Placeholder: add your community contributions here.',
  ],
}

export default en
