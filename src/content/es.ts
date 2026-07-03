import type { CVData } from '../types/cv'

const es: CVData = {
  name: 'Vinícius Ernani',
  title: 'Ingeniero de Software Senior',
  contact: {
    phone: '+55 84 99147-9189',
    email: 'viniciusernanicarvalho@gmail.com',
    location: 'Natal, Rio Grande do Norte, Brasil',
    github: 'github.com/erneani',
  },
  about:
    'Soy un ingeniero de software full-cycle con 7 años de experiencia en algunas de las principales empresas del mundo. Mis especialidades son el desarrollo Front End y la Arquitectura de Software.',
  experience: [
    {
      company: 'Mercado Libre',
      role: 'Ingeniero de Software Senior',
      period: 'feb. 2024 – presente',
      description: 'Me uní a Mercado Libre para mejorar los productos del Marketplace.',
      competencies: [
        'Crear aplicaciones escalables y centradas en el usuario con fuerte accesibilidad, internacionalización y resiliencia.',
        'Diseñar y crear un servicio para notificar a los usuarios de forma rápida y global a través de la UI de la aplicación.',
      ],
      technologies: [
        'JavaScript (React) para desarrollo Front End.',
        'Java (Spring) para desarrollo Back End.',
        'GitHub Actions para CI y CD.',
        'React Testing Library y Jest para calidad de código.',
      ],
    },
    {
      company: 'Thoughtworks',
      role: 'Consultor de Software',
      period: 'may. 2021 – ene. 2024',
      description:
        'Me uní a Thoughtworks para brindar experiencia tecnológica a otras empresas alrededor del mundo.',
      competencies: [
        'Proporcioné mantenimiento y escalabilidad para una aplicación de hoja de cálculo financiera legada y crítica para una gran empresa de Real Estate de EE.UU.',
        'Trabajé en la creación de una aplicación matemática distribuida globalmente con datos en tiempo real para una gran empresa de Petróleo y Gas de EE.UU.',
        'Proporcioné experiencia técnica y de negocio para mejorar la retención de clientes en productos de una gran empresa de Petróleo y Gas.',
      ],
      technologies: [
        'JavaScript y TypeScript (React y Angular) para desarrollo Front End.',
        'Python (FastAPI), C# (.NET), Node.js (Express) y Java (Spring) para desarrollo Back End.',
        'AWS, Google Cloud y Azure para servicios en la nube.',
        'Postgres, Redis, MariaDB y MySQL para bases de datos.',
        'Kafka, RabbitMQ y Azure Service Bus para message brokers.',
        'GitHub Actions, Jenkins y CircleCI para CI y CD.',
        'React Testing Library, Jest, Pytest, SonarQube y otras herramientas de prueba para calidad de código.',
      ],
    },
    {
      company: 'Globo.com',
      role: 'Ingeniero de Software SmartTV',
      period: 'sep. 2020 – abr. 2021',
      description:
        'Me uní a Globo.com para investigar y crear soluciones para el entorno SmartTV en la mayor empresa de streaming de LATAM, Globoplay.',
      competencies: [
        'Entregué componentes web pixel-perfect, rápidos y ligeros para una plataforma de streaming con más de 5 millones de usuarios mensuales.',
        'Investigué y refiné tecnologías para mejorar la usabilidad y responsividad de la aplicación usando React y Canvas.',
        'Co-implementé un robusto sistema de respaldo que aumentó el tiempo en pantalla de los usuarios durante las horas pico.',
        'Cambié la arquitectura del proyecto para evitar la re-obtención de información de hardware en cada componente.',
      ],
      technologies: [
        'JavaScript (React y vanilla) para desarrollo Front End.',
        'GraphQL para consultas en la base de datos.',
        'Redux para gestión de estado global.',
        'React Testing Library y Jest para pruebas unitarias.',
        'Cypress para pruebas E2E.',
        'Storybook para documentación de componentes.',
      ],
    },
  ],
  education: [
    {
      institution: 'Universidad Federal de Rio Grande do Norte (UFRN)',
      institutionUrl: 'https://www.ufrn.br/',
      degree: 'Licenciatura en Tecnología de la Información',
      period: '2019 – 2024',
    },
    {
      institution:
        'Instituto Federal de Educación, Ciencia y Tecnología de Rio Grande do Norte (IFRN)',
      institutionUrl: 'https://portal.ifrn.edu.br/',
      degree: 'Técnico en Informática',
      period: '2015 – 2019',
    },
    {
      institution: 'Instituto Metrópolis Digital (IMD)',
      institutionUrl: 'https://www.metropoledigital.ufrn.br/portal/',
      degree: 'Técnico en Informática para Internet',
      period: '2017 – 2020',
    },
  ],
  languages: [
    { language: 'Portugués', proficiency: 'nativo' },
    { language: 'Inglés', proficiency: 'profesional' },
    { language: 'Español', proficiency: 'profesional' },
    { language: 'Francés', proficiency: 'conversacional' },
  ],
  interests: [
    'Mejoras de calidad de código y pruebas.',
    'Arquitecturas de software reactivas.',
    'Matemáticas discretas y grafos.',
    'Rendimiento de algoritmos y notación asintótica.',
  ],
  community: [
    'Placeholder: agrega tus contribuciones a la comunidad aquí.',
  ],
}

export default es
