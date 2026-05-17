/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Brain, 
  Terminal, 
  User, 
  ChevronRight,
  Linkedin,
  Instagram,
  Facebook,
  Globe,
  Code2, 
  Cpu, 
  GraduationCap, 
  Laptop,
  Layers, 
  Search, 
  Ghost, 
  GitBranch,
  Server, 
  ShieldCheck, 
  Database, 
  LayoutGrid,
  Mail, 
  MapPin, 
  Coffee, 
  Calendar,
  ArrowRight,
  Box,
  Bot,
  FileCode,
  Copy,
  Check
} from 'lucide-react';

type SectionId = 'home' | 'computational' | 'robotics' | 'tech' | 'life' | 'utfpr' | 'certificados' | 'horarios' | 'scripts';

interface Section {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

const SECTIONS: Section[] = [
  { id: 'home', label: 'Início', icon: <Home size={20} /> },
  { id: 'computational', label: 'Pensamento Computacional', icon: <Brain size={20} /> },
  { id: 'robotics', label: 'Robótica Educacional', icon: <Bot size={20} /> },
  { id: 'tech', label: 'TI & Técnico', icon: <Terminal size={20} /> },
  { id: 'utfpr', label: 'UTFPR', icon: <GraduationCap size={20} /> },
  { id: 'certificados', label: 'Certificados', icon: <ShieldCheck size={20} /> },
  { id: 'horarios', label: 'Horários', icon: <Calendar size={20} /> },
  { id: 'scripts', label: 'Arquivos SH', icon: <FileCode size={20} /> },
  { id: 'life', label: 'Sobre Lucas', icon: <User size={20} /> },
];

const ProfileImage = () => (
  <div className="relative group w-full max-w-xs md:max-w-none flex justify-center">
    <div className="absolute inset-0 bg-emerald-600 rounded-2xl blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
    <div className="relative w-full aspect-[3/4] md:w-96 md:h-[500px] rounded-2xl bg-black/[0.02] border border-black/5 overflow-hidden shadow-2xl flex items-end">
      <img
        src="https://lucasleniar.com.br/home.gif"
        alt="Lucas Leniar"
        className="w-full h-full object-contain scale-x-[-1] transform-gpu origin-bottom"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/40 to-transparent">
        <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Professor Lucas Leniar</p>
      </div>
    </div>
  </div>
);

const HomeSection = ({ onNavigate }: { onNavigate: (id: SectionId) => void }) => (
  <div className="min-h-full flex flex-col justify-center py-12 md:py-0 max-w-6xl">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 order-1 md:order-1"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-mono tracking-widest uppercase mb-6 border border-emerald-500/20">
          Olá, Mundo.
        </span>
        <h1 className="text-[32px] md:text-[54px] font-bold tracking-tighter leading-tight mb-6 text-black">
          Eu sou o <span className="text-emerald-600">Professor Lucas Mercer Leniar</span>.
        </h1>

        {/* Mobile Profile Image */}
        <div className="md:hidden mb-10 flex justify-center w-full">
          <ProfileImage />
        </div>

        <div className="text-[17.5px] md:text-[19.5px] text-black/50 max-w-2xl leading-normal mb-10">
          <p className="mb-2">
            Explorando as fronteiras entre a educação e a tecnologia.
          </p>
          <p>
            Especialista em <span className="text-black font-semibold">pensamento computacional</span> e <span className="text-black font-semibold">infraestrutura de TI</span>, 
            atuo na formação de estudantes por meio dos quatro pilares essenciais: decompor problemas, identificar padrões, abstrair informações e construir algoritmos.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Code2 size={24} />, label: "Desenvolvimento", color: "emerald" },
            { icon: <Cpu size={24} />, label: "Hardware", color: "blue" },
            { icon: <GraduationCap size={24} />, label: "Educação", color: "purple" },
            { icon: <Laptop size={24} />, label: "Sistemas", color: "orange" },
          ].map((item, i) => {
            const hoverBorderColor = {
              emerald: 'hover:border-emerald-500/30',
              blue: 'hover:border-blue-500/30',
              purple: 'hover:border-purple-500/30',
              orange: 'hover:border-orange-500/30',
            }[item.color as 'emerald' | 'blue' | 'purple' | 'orange'];

            const hoverIconColor = {
              emerald: 'group-hover:text-emerald-600',
              blue: 'group-hover:text-blue-600',
              purple: 'group-hover:text-purple-600',
              orange: 'group-hover:text-orange-600',
            }[item.color as 'emerald' | 'blue' | 'purple' | 'orange'];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className={`p-3 rounded-xl border border-black/[0.05] bg-black/[0.01] flex flex-col items-center gap-2 ${hoverBorderColor} transition-colors group cursor-default`}
              >
                <div className={`text-black/20 ${hoverIconColor} transition-colors`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-semibold text-black/40 text-center">{item.label}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          {/* Ver Pilares */}
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-emerald-600 text-white font-bold rounded-full text-xs md:text-sm uppercase tracking-widest hover:bg-emerald-500 transition-colors shadow-[0_10px_30px_rgba(16,185,129,0.2)] cursor-pointer"
            onClick={() => onNavigate('computational')}
          >
            Ver Pilares <ArrowRight size={18} />
          </motion.button>

          {/* UTFPR */}
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => onNavigate('utfpr')}
            className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border border-black/10 text-black/70 font-bold rounded-full text-xs md:text-sm uppercase tracking-widest hover:bg-yellow-400 hover:border-yellow-500 hover:text-black hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            UTFPR <ArrowRight size={18} />
          </motion.button>

          {/* Certificados */}
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => onNavigate('certificados')}
            className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border border-black/10 text-black/70 font-bold rounded-full text-xs md:text-sm uppercase tracking-widest hover:bg-[#003366] hover:border-[#004a8f] hover:text-white transition-all duration-300 cursor-pointer"
          >
            Gerador Certificados <ArrowRight size={18} />
          </motion.button>

          {/* HORARIO */}
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => onNavigate('horarios')}
            className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border border-black/10 text-black/70 font-bold rounded-full text-xs md:text-sm uppercase tracking-widest hover:bg-[#657c36] hover:border-[#2d3818] hover:text-white hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            Gerador Horários <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 order-2 md:order-2 hidden md:flex justify-center w-full"
      >
        <ProfileImage />
      </motion.div>
    </div>
  </div>
);

const ComputationalThinking = () => {
  const pillars = [
    { title: "Decomposição", desc: "Quebrar problemas complexos em partes menores.", icon: <Layers className="text-emerald-500" size={32} /> },
    { title: "Reconhecimento", desc: "Identificar semelhanças e tendências entre problemas.", icon: <Search className="text-blue-500" size={32} /> },
    { title: "Abstração", desc: "Focar no que é importante, ignorando detalhes.", icon: <Ghost className="text-purple-500" size={32} /> },
    { title: "Algoritmos", desc: "Desenvolver instruções passo a passo.", icon: <GitBranch className="text-orange-500" size={32} /> }
  ];

  return (
    <div className="h-full flex flex-col pt-6 md:pt-20 uppercase tracking-tighter overflow-visible">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 italic font-serif text-black px-1">Pensamento Computacional</h2>
        <p className="text-black/30 max-w-2xl mb-8 md:mb-12 uppercase text-[10px] tracking-[0.2em] font-mono font-bold px-1">Os 4 pilares para resolver qualquer problema.</p>
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-1">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-black/[0.01] border border-black/[0.05] hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10">{pillar.icon}</div>
                <div className="relative z-10">
                  <div className="mb-4">{pillar.icon}</div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-emerald-600 transition-colors text-black/80">{pillar.title}</h3>
                  <p className="text-black/40 leading-relaxed text-sm font-sans normal-case tracking-normal">{pillar.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-600 rounded-3xl blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative rounded-3xl border border-black/5 overflow-hidden shadow-2xl bg-black/[0.02]">
                <img 
                  src="https://lucasleniar.com.br/certificado.gif" 
                  alt="Lucas Mercer" 
                  className="w-full h-auto scale-105 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/20 to-transparent">
                  <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Professor com Certificado de Qualidade</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const RoboticsSection = () => {
  const features = [
    { title: "Arduino & ESP32", desc: "Desenvolvimento de protótipos e sistemas embarcados.", icon: <Cpu className="text-orange-500" size={32} /> },
    { title: "Lógica de Programação", desc: "Aplicação prática de algoritmos em hardware.", icon: <Layers className="text-blue-500" size={32} /> },
    { title: "Projetos Maker", desc: "Criação de soluções interativas e automatizadas.", icon: <Box className="text-emerald-500" size={32} /> },
    { title: "Educação Tecnológica", desc: "Metodologias ativas aplicadas à robótica.", icon: <GraduationCap className="text-purple-500" size={32} /> }
  ];

  return (
    <div className="h-full flex flex-col pt-6 md:pt-20 uppercase tracking-tighter">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 italic font-serif text-black px-1">Robótica Educacional</h2>
        <p className="text-black/30 max-w-2xl mb-8 md:mb-12 uppercase text-[10px] tracking-[0.2em] font-mono font-bold px-1">Transformando teoria em movimento e inovação.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-black/[0.01] border border-black/[0.05] hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10">{feature.icon}</div>
              <div className="relative z-10">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-emerald-600 transition-colors text-black/80">{feature.title}</h3>
                <p className="text-black/40 leading-relaxed text-sm font-sans normal-case tracking-normal">{feature.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ITSection = () => {
  const skills = [
    { name: "Suporte Técnico", level: 95 },
    { name: "Redes", level: 85 },
    { name: "Hardware", level: 98 },
    { name: "Desenvolvimento Web", level: 80 },
    { name: "Sistemas Operacionais", level: 90 },
  ];

  return (
    <div className="h-full flex flex-col pt-6 md:pt-20 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-black tracking-tighter">Tecnologia da Informação</h2>
          <div className="space-y-6 md:space-y-8">
            <p className="text-black/50 leading-relaxed text-base md:text-lg italic">
              Atuação sólida em Tecnologia da Informação, com foco em infraestrutura, redes, hardware e sistemas operacionais, voltada à formação de profissionais técnicos preparados para os desafios do mundo real.
              <br className="hidden md:block" />
              O processo de ensino vai além da execução de tarefas: busca desenvolver pensamento crítico, raciocínio lógico e autonomia na resolução de problemas.
              <br className="hidden md:block" />
              A proposta integra teoria e prática de forma estratégica, capacitando os alunos a compreenderem profundamente o funcionamento das tecnologias, diagnosticar falhas e construir soluções eficientes em diferentes contextos profissionais.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl border border-black/[0.05] bg-black/[0.01] space-y-4 hover:border-emerald-600/20 transition-colors group">
                 <Server className="text-black/30 group-hover:text-emerald-600 transition-colors" size={24} />
                 <h4 className="font-bold text-black/80">Infraestrutura</h4>
              </div>
              <div className="p-6 rounded-xl border border-black/[0.05] bg-black/[0.01] space-y-4 hover:border-blue-600/20 transition-colors group">
                 <ShieldCheck className="text-black/30 group-hover:text-blue-600 transition-colors" size={24} />
                 <h4 className="font-bold text-black/80">Segurança</h4>
              </div>
              <div className="p-6 rounded-xl border border-black/[0.05] bg-black/[0.01] space-y-4 hover:border-orange-600/20 transition-colors group">
                 <Database className="text-black/30 group-hover:text-orange-600 transition-colors" size={24} />
                 <h4 className="font-bold text-black/80">Dados</h4>
              </div>
              <div className="p-6 rounded-xl border border-black/[0.05] bg-black/[0.01] space-y-4 hover:border-purple-600/20 transition-colors group">
                 <LayoutGrid className="text-black/30 group-hover:text-purple-600 transition-colors" size={24} />
                 <h4 className="font-bold text-black/80">Design</h4>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-black/[0.02] border border-black/[0.05] rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2 italic uppercase tracking-tighter text-black">
            <span className="w-8 h-[2px] bg-emerald-600"></span> Expertises
          </h3>
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between text-xs mb-2 uppercase tracking-widest font-mono text-black/40 font-bold">
                  <span>{skill.name}</span>
                  <span className="text-emerald-700">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-black/[0.05] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ duration: 1, delay: 0.5 + (i * 0.1) }} className="h-full bg-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const LifeSection = () => (
  <div className="h-full flex flex-col pt-6 md:pt-20 pb-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative mb-6 md:mb-8 group inline-block">
          <div className="absolute inset-0 bg-emerald-600 rounded-2xl blur-xl opacity-10" />
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-black/[0.02] border border-black/5 flex items-center justify-center overflow-hidden">
               <img
                   src="https://lucasleniar.com.br/lucas.png"
                   alt="Lucas Leniar"
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                 />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 italic text-black tracking-tighter">Minha História</h2>
        <div className="space-y-4 text-black/50 leading-relaxed max-w-md">
          <p>
            Professor entusiasta da educação e tecnologia. Sempre curioso, Lucas explora o mundo da programação e do design, ajustando projetos, corrigindo erros de deploy e aprimorando cada detalhe como se cada linha de código fosse uma peça de um quebra-cabeça maior.
            Essa mesma dedicação aparece quando ele trabalha com conteúdos educativos, como quizzes, aulas e materiais interativos voltados para seus alunos.
            <br className="mt-4" />
            No fim, Lucas é alguém que constrói pontes — entre educação e tecnologia, lógica e criatividade, código e pedagogia.
          </p>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
        <h3 className="text-xl font-bold mb-6 uppercase tracking-widest text-emerald-700 font-mono text-[11px]">Conecte-se</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {[
            { icon: <Mail size={18} />, label: "Email", value: "lucasleniar@gmail.com" },
            { icon: <MapPin size={18} />, label: "Localização", value: "Paraná - Brasil" },
            { icon: <Coffee size={18} />, label: "Interesses", value: "Tecnologia, Educação" },
            { icon: <Calendar size={18} />, label: "Experiência", value: "Desde 2006" },
          ].map((info, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-black/[0.03] bg-black/[0.01] hover:bg-white transition-all shadow-sm">
              <div className="text-emerald-600">{info.icon}</div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-black/30 font-bold">{info.label}</p>
                <p className="text-sm font-semibold text-black/80 truncate">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

const IFrameSection = ({ url, title }: { url: string; title: string }) => (
  <div className="w-full h-full flex flex-col pt-6 md:pt-4">
    <div className="mb-4 flex items-center justify-between px-1">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight italic font-serif text-black">{title}</h2>
      <div className="flex gap-2">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-widest font-mono font-bold text-emerald-600 hover:text-emerald-500 flex items-center gap-1 transition-colors"
        >
          Abrir em nova aba <Globe size={12} />
        </a>
      </div>
    </div>
    <div className="flex-1 w-full bg-white rounded-2xl border border-black/5 overflow-hidden shadow-2xl relative">
      <iframe 
        src={url} 
        className="w-full h-full border-0" 
        title={title}
        referrerPolicy="no-referrer"
      />
    </div>
  </div>
);

const ShellFilesSection = () => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const SH_FILES = [
    { name: 'civico.sh', url: 'https://lucasleniar.com.br/mint/civico.sh', description: 'Script para configuração do Civico no Mint' },
    { name: 'wallpaper.sh', url: 'https://lucasleniar.com.br/mint/wallpaper.sh', description: 'Script para gerenciar wallpapers customizados' },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'lucas123') { // Senha padrão solicitada: lucas123 (ou similar)
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-8 rounded-3xl bg-white border border-black/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600" />
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-600">
              <ShieldCheck size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-black">Repositório Protegido</h2>
              <p className="text-sm text-black/40 font-sans normal-case tracking-normal">Insira a senha de acesso para visualizar os scripts .sh</p>
            </div>
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input 
                type="password" 
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de acesso"
                className="w-full px-5 py-4 rounded-2xl border border-black/10 bg-black/[0.01] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono text-center text-lg tracking-widest"
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500 font-bold uppercase tracking-wider"
                >
                  {error}
                </motion.p>
              )}
              <button 
                type="submit"
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-all active:scale-[0.98] shadow-lg shadow-emerald-600/20"
              >
                Acessar Repositório
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col pt-6 md:pt-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl w-full">
         <div className="flex items-center justify-between mb-8 px-1">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight italic font-serif text-black mb-2">Arquivos SH</h2>
              <p className="text-black/30 uppercase text-[10px] tracking-[0.2em] font-mono font-bold">Repositório privado de automação e scripts Bash.</p>
            </div>
            <button 
              onClick={() => setIsAuthorized(false)}
              className="px-4 py-2 border border-black/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              Sair
            </button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SH_FILES.map((file, i) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-black/[0.05] shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <Terminal size={64} />
                </div>
                
                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between">
                     <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600">
                        <FileCode size={24} />
                     </div>
                     <span className="text-[10px] font-mono font-bold text-black/20 group-hover:text-emerald-600/40 transition-colors">.sh extension</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-3 tracking-tight">{file.name}</h3>
                  <p className="text-sm text-black/40 mb-6 font-sans normal-case leading-relaxed">{file.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-black/30">Comando de download</label>
                      <div className="relative group/copy">
                        <code className="block w-full p-4 bg-black/[0.03] border border-black/5 rounded-xl text-[11px] font-mono text-emerald-700 break-all pr-12">
                          wget {file.url.replace('https://', '')}
                        </code>
                        <button 
                          onClick={() => handleCopy(`wget ${file.url.replace('https://', '')}`, file.name + '-download')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-black/20 hover:text-emerald-600 transition-colors"
                        >
                          {copiedId === file.name + '-download' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] text-emerald-800 leading-relaxed mb-2">
                        <span className="font-bold block mb-1 uppercase">Como Executar:</span>
                        Para rodar o comando precisa estar no usuário <span className="font-bold underline">Administrador</span> da máquina e executar:
                      </p>
                      <div className="relative group/exec">
                        <code className="block font-mono font-bold text-emerald-900 bg-emerald-900/10 p-3 rounded-xl pr-10 text-[11px]">
                          sudo bash {file.name}
                        </code>
                        <button 
                          onClick={() => handleCopy(`sudo bash ${file.name}`, file.name + '-exec')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-800/30 hover:text-emerald-900 transition-colors"
                        >
                          {copiedId === file.name + '-exec' ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <a 
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-3 bg-black text-white text-[10px] font-bold rounded-xl hover:bg-emerald-600 transition-all uppercase tracking-widest"
                    >
                       Visualizar
                    </a>
                    <a 
                      href={file.url}
                      download={file.name}
                      className="p-3 border border-black/5 rounded-xl hover:bg-black/5 transition-colors text-black/40 hover:text-black"
                      title="Download"
                    >
                       <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
         </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  return (
    <div className="flex h-screen w-full bg-white text-[#1a1a1a] font-sans overflow-hidden selection:bg-emerald-500/20 selection:text-emerald-600">
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 border-r border-black/5 flex flex-col py-8 bg-[#fcfcfc] z-20">
        <div className="px-6 mb-12 hidden md:block">
          <h1 className="text-xl font-bold tracking-tighter text-emerald-600">LUCAS LENIAR</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-mono font-semibold">Systems Architect & Educator</p>
        </div>

        <div className="flex-1 space-y-2 px-3">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full cursor-pointer flex items-center justify-start gap-3 px-3 py-3 rounded-lg transition-all duration-300 group ${
                activeSection === section.id 
                  ? 'bg-emerald-500/10 text-emerald-600' 
                  : 'text-black/40 hover:text-black/80 hover:bg-black/5'
              }`}
            >
              <div className={`flex-shrink-0 ${activeSection === section.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {section.icon}
              </div>
              <div className="hidden md:block font-semibold text-xs lg:text-sm tracking-tight text-left leading-tight">{section.label}</div>
              {activeSection === section.id && (
                <div className="ml-auto hidden md:block">
                  <ChevronRight size={14} className="text-emerald-600" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="px-6 space-y-4 pt-6 border-t border-black/5 md:block hidden text-black/30 text-center">
           <div className="flex gap-4 justify-center">
              <a href="https://www.linkedin.com/in/lucasleniar/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors"><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/lucasmercerl/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors"><Instagram size={18} /></a>
              <a href="https://www.facebook.com/lucasmercerl/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors"><Facebook size={18} /></a>
              <a href="https://lucasleniar.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors"><Globe size={18} /></a>
           </div>
           <p className="text-[10px] font-mono">© {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.02)_0%,transparent_100%)]">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        <div className="relative z-10 w-full h-full min-h-full p-6 md:p-12 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full"
            >
              {activeSection === 'home' && <HomeSection onNavigate={setActiveSection} />}
              {activeSection === 'computational' && <ComputationalThinking />}
              {activeSection === 'robotics' && <RoboticsSection />}
              {activeSection === 'tech' && <ITSection />}
              {activeSection === 'utfpr' && <IFrameSection url="https://lucasleniar.com.br/utfpr/" title="UTFPR" />}
              {activeSection === 'certificados' && <IFrameSection url="https://lucasmercer.github.io/certificado/" title="Gerador de Certificados" />}
              {activeSection === 'horarios' && <IFrameSection url="https://lucasmercer.github.io/horario/" title="Gerador de Horários" />}
              {activeSection === 'scripts' && <ShellFilesSection />}
              {activeSection === 'life' && <LifeSection />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-emerald-600/10 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-emerald-600/10 pointer-events-none" />
      </main>
    </div>
  );
}
