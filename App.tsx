import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Brain, 
  Terminal, 
  User, 
  ChevronRight,
  Github,
  Linkedin,
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
  ArrowRight
} from 'lucide-react';

// --- Types ---
type SectionId = 'home' | 'computational' | 'tech' | 'life';

interface Section {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

const SECTIONS: Section[] = [
  { id: 'home', label: 'Início', icon: <Home size={20} /> },
  { id: 'computational', label: 'Pensam. Computacional', icon: <Brain size={20} /> },
  { id: 'tech', label: 'TI & Técnico', icon: <Terminal size={20} /> },
  { id: 'life', label: 'Sobre Mim', icon: <User size={20} /> },
];

// --- Sub-Components (Sections) ---

const HomeSection = ({ onNext }: { onNext: () => void }) => (
  <div className="h-full flex flex-col justify-center max-w-6xl">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 order-2 md:order-1"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-mono tracking-widest uppercase mb-6 border border-emerald-500/20">
          Olá, Mundo.
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6 text-black">
          Eu sou o <span className="text-emerald-600">Professor Lucas Mercer Leniar</span>.
        </h1>
        <p className="text-lg md:text-xl text-black/50 max-w-2xl leading-relaxed mb-10">
          Explorando as fronteiras entre a educação e a tecnologia. Especialista em 
          <span className="text-black/80 font-semibold"> pensamento computacional</span> e infraestrutura de TI, 
          ajudando a formar a próxima geração de técnicos em informática.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Code2 size={24} />, label: "Desenvolvimento" },
            { icon: <Cpu size={24} />, label: "Hardware" },
            { icon: <GraduationCap size={24} />, label: "Educação" },
            { icon: <Laptop size={24} />, label: "Sistemas" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="p-3 rounded-xl border border-black/[0.05] bg-black/[0.01] flex flex-col items-center gap-2 hover:border-emerald-500/30 transition-colors group cursor-default"
            >
              <div className="text-black/20 group-hover:text-emerald-600 transition-colors">
                {item.icon}
              </div>
              <span className="text-[10px] font-semibold text-black/40 text-center">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-full text-sm uppercase tracking-widest hover:bg-emerald-500 transition-colors shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
          onClick={onNext}
        >
          Ver Pilares <ArrowRight size={18} />
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-shrink-0 order-1 md:order-2"
      >
        <div className="relative group">
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700" />
          <div className="relative w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-emerald-500/10">
             <img 
               src="https://lucasleniar.com.br/image/home.png" 
               alt="Lucas Leniar" 
               className="w-full h-full object-contain scale-x-[-1] bg-white/5"
               referrerPolicy="no-referrer"
             />
          </div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 opacity-20 pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(black 1px, transparent 0)', backgroundSize: '10px 10px' }} 
          />
        </div>
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
    <div className="h-full flex flex-col pt-12 md:pt-20 uppercase tracking-tighter">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 italic font-serif text-black">Pensamento Computacional</h2>
        <p className="text-black/30 max-w-2xl mb-12 uppercase text-[10px] tracking-[0.2em] font-mono font-bold">Os 4 pilares para resolver qualquer problema.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    <div className="h-full flex flex-col pt-12 md:pt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2">
          <h2 className="text-4xl font-bold mb-8 text-black tracking-tighter">Tecnologia da Informação</h2>
          <div className="space-y-8">
            <p className="text-black/50 leading-relaxed text-lg italic">Foco em infraestrutura e formação técnica para empoderamento.</p>
            <div className="grid grid-cols-2 gap-4">
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
  <div className="h-full flex flex-col pt-12 md:pt-20">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative mb-8 group inline-block">
          <div className="absolute inset-0 bg-emerald-600 rounded-2xl blur-xl opacity-10" />
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-black/[0.02] border border-black/5 flex items-center justify-center">
             <User size={64} className="text-black/10" />
          </div>
        </div>
        <h2 className="text-4xl font-bold mb-6 italic text-black tracking-tighter">Minha História</h2>
        <div className="space-y-4 text-black/50 leading-relaxed max-w-md">
          <p>Professor entusiasta da educação e tecnologia. Acredito que o conhecimento compartilhado transforma realidades.</p>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
        <h3 className="text-xl font-bold mb-6 uppercase tracking-widest text-emerald-700 font-mono text-[11px]">Conecte-se</h3>
        <div className="space-y-4">
          {[
            { icon: <Mail size={18} />, label: "Email", value: "lucasleniar@gmail.com" },
            { icon: <MapPin size={18} />, label: "Localização", value: "Brasil" },
            { icon: <Coffee size={18} />, label: "Interesses", value: "Tecnologia, Educação" },
            { icon: <Calendar size={18} />, label: "Experiência", value: "Desde 2010" },
          ].map((info, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-black/[0.03] bg-black/[0.01] hover:bg-white transition-all">
              <div className="text-emerald-600">{info.icon}</div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-black/30 font-bold">{info.label}</p>
                <p className="text-sm font-semibold text-black/80">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

// --- Main App Component ---

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
              className={`w-full flex items-center justify-start gap-4 px-3 py-3 rounded-lg transition-all duration-300 group ${
                activeSection === section.id 
                  ? 'bg-emerald-500/10 text-emerald-600' 
                  : 'text-black/40 hover:text-black/80 hover:bg-black/5'
              }`}
            >
              <div className={`flex-shrink-0 ${activeSection === section.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {section.icon}
              </div>
              <div className="hidden md:block font-semibold text-sm tracking-tight">{section.label}</div>
              {activeSection === section.id && (
                <div className="ml-auto hidden md:block">
                  <ChevronRight size={14} className="text-emerald-600" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="px-6 space-y-4 pt-6 border-t border-black/5 md:block hidden text-black/30">
           <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-600 transition-colors"><Github size={18} /></a>
              <a href="#" className="hover:text-emerald-600 transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="hover:text-emerald-600 transition-colors"><Globe size={18} /></a>
           </div>
           <p className="text-[10px] font-mono">© {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.02)_0%,transparent_100%)]">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        <div className="relative z-10 w-full h-full p-6 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full"
            >
              {activeSection === 'home' && <HomeSection onNext={() => setActiveSection('computational')} />}
              {activeSection === 'computational' && <ComputationalThinking />}
              {activeSection === 'tech' && <ITSection />}
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

