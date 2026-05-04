export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'apcc2',
    category: 'APCC 2',
    title: 'Projeto Interdisciplinar: QuiverVision',
    description: 'Transformando o aprendizado da Língua Portuguesa através da realidade aumentada, permitindo que a criatividade e a tecnologia deem vida a histórias de forma interativa e inovadora.',
    link: 'https://prezi.com/p/uttomgcuopao/apresentacao-de-atividade-apcc-utfpr/',
    tags: ['Realidade Aumentada', 'Educação', 'Inovação']
  },
  {
    id: 'apcc3',
    category: 'APCC 3',
    title: 'Projeto Interdisciplinar: DuoHora',
    description: 'Um sistema didático desenvolvido para auxiliar crianças de 8 a 11 anos a aprender a ler as horas de forma lúdica e intuitiva.',
    link: 'https://lucasleniar.com.br/duohora/home.html',
    tags: ['Gamificação', 'Matemática', 'Ensino']
  }
];

export const SKILLS = [
  { name: 'Pensamento Computacional', level: 90 },
  { name: 'Desenvolvimento Web', level: 85 },
  { name: 'Tecnologias Educacionais', level: 95 },
  { name: 'Algoritmos & Estruturas', level: 80 }
];
