import type { CVData } from '../types/cv'

const ptBr: CVData = {
  name: 'Vinícius Ernani',
  title: 'Engenheiro de Software Sênior',
  contact: {
    phone: '+55 84 99147-9189',
    email: 'viniciusernanicarvalho@gmail.com',
    location: 'Natal, Rio Grande do Norte, Brasil',
    github: 'github.com/erneani',
  },
  about:
    'Sou um engenheiro de software full-cycle com 7 anos de experiência em algumas das maiores empresas do mundo. Minhas especialidades são desenvolvimento Front End e Arquitetura de Software.',
  experience: [
    {
      company: 'Mercado Livre',
      role: 'Engenheiro de Software Sênior',
      period: 'fev. 2024 – presente',
      description: 'Ingressei no Mercado Livre para melhorar os produtos do Marketplace.',
      competencies: [
        'Criar aplicações escaláveis e centradas no usuário com forte acessibilidade, internacionalização e resiliência.',
        'Projetar e criar um serviço para notificar usuários de forma rápida e global através da UI da aplicação.',
      ],
      technologies: [
        'JavaScript (React) para desenvolvimento Front End.',
        'Java (Spring) para desenvolvimento Back End.',
        'GitHub Actions para CI e CD.',
        'React Testing Library e Jest para qualidade de código.',
      ],
    },
    {
      company: 'Thoughtworks',
      role: 'Consultor de Software',
      period: 'mai. 2021 – jan. 2024',
      description:
        'Ingressei na Thoughtworks para fornecer expertise tecnológica para empresas ao redor do mundo.',
      competencies: [
        'Providenciei manutenção e escalabilidade para uma aplicação de planilha financeira legada e crítica de uma grande empresa de Real Estate dos EUA.',
        'Trabalhei na criação de uma aplicação matemática globalmente distribuída com dados em tempo real para uma grande empresa de Petróleo e Gás dos EUA.',
        'Forneci expertise técnica e de negócio para melhorar a retenção de clientes em produtos de uma grande empresa de Petróleo e Gás.',
      ],
      technologies: [
        'JavaScript e TypeScript (React e Angular) para desenvolvimento Front End.',
        'Python (FastAPI), C# (.NET), Node.js (Express) e Java (Spring) para desenvolvimento Back End.',
        'AWS, Google Cloud e Azure para serviços em nuvem.',
        'Postgres, Redis, MariaDB e MySQL para bancos de dados.',
        'Kafka, RabbitMQ e Azure Service Bus para message brokers.',
        'GitHub Actions, Jenkins e CircleCI para CI e CD.',
        'React Testing Library, Jest, Pytest, SonarQube e outras ferramentas de teste para qualidade de código.',
      ],
    },
    {
      company: 'Globo.com',
      role: 'Engenheiro de Software SmartTV',
      period: 'set. 2020 – abr. 2021',
      description:
        'Ingressei na Globo.com para pesquisar e criar soluções para o ambiente SmartTV na maior empresa de streaming da LATAM, o Globoplay.',
      competencies: [
        'Entregue componentes web pixel-perfect, rápidos e leves para uma plataforma de streaming com mais de 5 milhões de usuários mensais.',
        'Pesquisei e refinei tecnologias para melhorar a usabilidade e responsividade da aplicação usando React e Canvas.',
        'Co-implementei um robusto sistema de fallback que aumentou o tempo de tela dos usuários nos horários de pico.',
        'Alterei a arquitetura do projeto para evitar a re-busca de informações de hardware em cada componente.',
      ],
      technologies: [
        'JavaScript (React e vanilla) para desenvolvimento Front End.',
        'GraphQL para consultas no banco de dados.',
        'Redux para gerenciamento de estado global.',
        'React Testing Library e Jest para testes unitários.',
        'Cypress para testes E2E.',
        'Storybook para documentação de componentes.',
      ],
    },
  ],
  education: [
    {
      institution: 'Universidade Federal do Rio Grande do Norte (UFRN)',
      institutionUrl: 'https://www.ufrn.br/',
      degree: 'Bacharelado em Tecnologia da Informação',
      period: '2019 – 2024',
    },
    {
      institution:
        'Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte (IFRN)',
      institutionUrl: 'https://portal.ifrn.edu.br/',
      degree: 'Técnico em Informática',
      period: '2015 – 2019',
    },
    {
      institution: 'Instituto Metrópole Digital (IMD)',
      institutionUrl: 'https://www.metropoledigital.ufrn.br/portal/',
      degree: 'Técnico em Informática para Internet',
      period: '2017 – 2020',
    },
  ],
  languages: [
    { language: 'Português', proficiency: 'nativo' },
    { language: 'Inglês', proficiency: 'profissional' },
    { language: 'Espanhol', proficiency: 'profissional' },
    { language: 'Francês', proficiency: 'conversacional' },
  ],
  interests: [
    'Melhorias de qualidade de código e testes.',
    'Arquiteturas de software reativas.',
    'Matemática discreta e grafos.',
    'Desempenho de algoritmos e notação assintótica.',
  ],
  community: [
    'Placeholder: adicione suas contribuições comunitárias aqui.',
  ],
}

export default ptBr
