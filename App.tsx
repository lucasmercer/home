/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
  Check,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Play,
  Award,
  Menu,
  X,
  Network,
  Trash2
} from 'lucide-react';

type SectionId = 'home' | 'computational' | 'robotics' | 'tech' | 'life' | 'utfpr' | 'certificados' | 'horarios' | 'scripts';

interface Section {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

const SECTIONS: Section[] = [
  { id: 'home', label: 'Início', icon: <Home size={20} /> },
  { id: 'life', label: 'Sobre Lucas', icon: <User size={20} /> },
  { id: 'computational', label: 'Pensamento Computacional', icon: <Brain size={20} /> },
  { id: 'robotics', label: 'Robótica Educacional', icon: <Bot size={20} /> },
  { id: 'tech', label: 'TI & Técnico', icon: <Terminal size={20} /> },
  { id: 'utfpr', label: 'UTFPR', icon: <GraduationCap size={20} /> },
  { id: 'certificados', label: 'Certificados', icon: <ShieldCheck size={20} /> },
  { id: 'horarios', label: 'Horários', icon: <Calendar size={20} /> },
  { id: 'scripts', label: 'Arquivos SH', icon: <FileCode size={20} /> },
];

const ProfileImage = ({ isDarkMode }: { isDarkMode?: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rx = -(y / (rect.height / 2)) * 15;
      const ry = (x / (rect.width / 2)) * 15;
      setRotateX(rx);
      setRotateY(ry);
    };
    const handleMouseLeave = () => {
      setRotateX(0); setRotateY(0);
    };
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      const rx = Math.max(-15, Math.min(15, (e.beta - 45) / 3));
      const ry = Math.max(-15, Math.min(15, e.gamma / 3));
      setRotateX(rx); setRotateY(ry);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  return (
    <div className="relative group w-full max-w-xs md:max-w-none flex justify-center" style={{ perspective: '1000px' }}>
      <div className="absolute inset-0 bg-emerald-600 rounded-2xl blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
      <motion.div
        ref={cardRef}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative w-full aspect-[3/4] md:w-96 md:h-[500px] rounded-2xl ${isDarkMode !== false ? 'bg-black/[0.02] border border-black/5' : 'bg-white/[0.02] border border-white/5'} overflow-hidden shadow-2xl flex items-end cursor-pointer`}
      >
        <img
          src="https://lucasleniar.com.br/home.gif"
          alt="Computador retro animado representando a paixão do Professor Lucas Leniar por tecnologia e hardware"
          className="w-full h-full object-contain scale-x-[-1] transform-gpu origin-bottom z-0"
          style={{ transform: 'translateZ(20px) scaleX(-1)' }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent z-10" style={{ transform: 'translateZ(30px)' }}>
          <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Professor Lucas Leniar</p>
        </div>
      </motion.div>
    </div>
  );
};

const HomeSection = ({ onNavigate, isDarkMode }: { onNavigate: (id: SectionId) => void; isDarkMode: boolean }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const expertises = [
    { 
      icon: <Code2 size={24} />, 
      label: "Desenvolvimento", 
      color: "emerald",
      desc: "Experiência robusta em automação com scripts Bash, desenvolvimento web moderno com React/Node.js, e criação de soluções escaláveis em Python." 
    },
    { 
      icon: <Cpu size={24} />, 
      label: "Hardware", 
      color: "blue",
      desc: "Especialista em manutenção e diagnóstico avançado. Projetos de eletrônica com Arduino e ESP32, unindo o mundo físico ao software." 
    },
    { 
      icon: <GraduationCap size={24} />, 
      label: "Educação", 
      color: "purple",
      desc: "Foco no desenvolvimento do pensamento computacional e ensino de robótica educacional. Formando os pensadores e engenheiros do amanhã." 
    },
    { 
      icon: <Laptop size={24} />, 
      label: "Sistemas", 
      color: "orange",
      desc: "Arquitetura e administração de redes, gestão de servidores Linux e infraestrutura com foco em desempenho, segurança e open-source." 
    },
  ];

  return (
  <div className="min-h-full flex flex-col justify-center py-6 md:py-0 max-w-6xl w-full">
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 order-1 md:order-1 relative z-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className={`inline-block px-3 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border ${
            isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
          }`}>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            {getGreeting()}, Mundo.
          </span>
          <span className={`hidden sm:inline-block px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase border border-slate-500/20 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            ROOT_USER_ACTIVE
          </span>
        </div>
        
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          Eu sou o <br className="hidden md:block"/>
          <span className={isDarkMode ? 'text-emerald-400 font-serif italic' : 'text-emerald-600 font-serif italic'}>Prof. Lucas Leniar</span>.
        </h1>

        {/* Mobile Profile Image */}
        <div className="md:hidden mb-8 flex justify-center w-full scale-90">
          <ProfileImage isDarkMode={isDarkMode} />
        </div>

        <div className={`text-base md:text-lg max-w-2xl leading-relaxed mb-10 border-l-2 pl-4 md:pl-6 ${isDarkMode ? 'border-emerald-500/30 text-white/70' : 'border-emerald-500/30 text-slate-600'}`}>
          <p className="mb-3">
            Explorando as fronteiras entre a educação técnica e a engenharia de infraestrutura.
          </p>
          <p>
            Especialista em <strong className={isDarkMode ? 'text-emerald-400 font-semibold' : 'text-emerald-600 font-semibold'}>pensamento computacional</strong> e <strong className={isDarkMode ? 'text-emerald-400 font-semibold' : 'text-emerald-600 font-semibold'}>tecnologia da informação</strong>, construindo sistemas confiáveis e formando mentes críticas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          {expertises.map((item, i) => {
            const hoverBorderColor = {
              emerald: 'hover:border-emerald-500/30',
              blue: 'hover:border-blue-500/30',
              purple: 'hover:border-purple-500/30',
              orange: 'hover:border-orange-500/30',
            }[item.color as 'emerald' | 'blue' | 'purple' | 'orange'];

            const IconColor = {
              emerald: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
              blue: isDarkMode ? 'text-blue-400' : 'text-blue-600',
              purple: isDarkMode ? 'text-purple-400' : 'text-purple-600',
              orange: isDarkMode ? 'text-orange-400' : 'text-orange-600',
            }[item.color as 'emerald' | 'blue' | 'purple' | 'orange'];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className={`p-5 md:p-6 rounded-2xl border flex flex-col items-start gap-4 transition-all duration-300 group h-full ${
                  isDarkMode 
                    ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]' 
                    : 'border-slate-200 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md'
                } ${hoverBorderColor}`}
              >
                <div className={`p-2.5 rounded-xl border transition-colors ${
                  isDarkMode ? 'bg-[#151c24] border-white/5' : 'bg-slate-100 border-slate-200'
                } ${IconColor}`}>
                  {item.icon}
                </div>
                <div className="w-full text-left flex-1 flex flex-col min-w-0">
                  <span className={`block font-bold text-[13px] md:text-sm tracking-tight mb-2 truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`} title={item.label}>{item.label}</span>
                  <p className={`text-[11px] md:text-xs leading-relaxed font-sans normal-case tracking-normal flex-1 ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Lógica */}
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => onNavigate('computational')}
            className={`flex-1 min-w-[120px] flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 shadow-sm
              ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-100 text-emerald-800'}
            `}
          >
            <Brain size={20} className="mb-2" />
            <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-center">Laboratório<br/>Lógico</span>
          </motion.button>

          {/* NOC */}
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => onNavigate('tech')}
            className={`flex-1 min-w-[120px] flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 shadow-sm
              ${isDarkMode ? 'bg-[#1a212b] border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-slate-300' : 'bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700'}
            `}
          >
            <Terminal size={20} className={isDarkMode ? 'text-blue-400 mb-2' : 'text-blue-600 mb-2'} />
            <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-center">NOC<br/>T.I</span>
          </motion.button>

          {/* UTFPR */}
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => onNavigate('utfpr')}
             className={`flex-1 min-w-[80px] flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 shadow-sm
              ${isDarkMode ? 'bg-[#1a212b] border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/10 text-slate-300' : 'bg-white border-slate-200 hover:border-yellow-500 hover:bg-yellow-50 text-slate-700'}
            `}
          >
            <GraduationCap size={20} className={isDarkMode ? 'text-yellow-400 mb-2' : 'text-yellow-600 mb-2'} />
            <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-center">UTFPR</span>
          </motion.button>

          {/* Certificados */}
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => onNavigate('certificados')}
             className={`flex-1 min-w-[80px] flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 shadow-sm
              ${isDarkMode ? 'bg-[#1a212b] border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 text-slate-300' : 'bg-white border-slate-200 hover:border-purple-500 hover:bg-purple-50 text-slate-700'}
            `}
          >
            <Award size={20} className={isDarkMode ? 'text-purple-400 mb-2' : 'text-purple-600 mb-2'} />
            <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-center">Certificados</span>
          </motion.button>

          {/* Horários */}
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => onNavigate('horarios')}
             className={`flex-1 min-w-[80px] flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 shadow-sm
              ${isDarkMode ? 'bg-[#1a212b] border-white/10 hover:border-[#657c36]/50 hover:bg-[#657c36]/20 text-slate-300' : 'bg-white border-slate-200 hover:border-[#657c36] hover:bg-[#657c36]/10 text-slate-700'}
            `}
          >
            <Network size={20} className={isDarkMode ? 'text-[#a3c757] mb-2' : 'text-[#657c36] mb-2'} />
            <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-center">Horários</span>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 order-2 md:order-2 hidden md:flex justify-center w-full"
      >
        <ProfileImage isDarkMode={isDarkMode} />
      </motion.div>
    </div>
  </div>
  );
};

const ComputationalThinking = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const pillars = [
    { title: "Decomposição", desc: "Quebrar problemas complexos em partes menores.", icon: <Layers className="text-emerald-500" size={32} /> },
    { title: "Reconhecimento", desc: "Identificar semelhanças e tendências entre problemas.", icon: <Search className="text-blue-500" size={32} /> },
    { title: "Abstração", desc: "Focar no que é importante, ignorando detalhes.", icon: <Ghost className="text-purple-500" size={32} /> },
    { title: "Algoritmos", desc: "Desenvolver instruções passo a passo.", icon: <GitBranch className="text-orange-500" size={32} /> }
  ];

  type Direction = 'N' | 'E' | 'S' | 'W';
  type Command = 'FORWARD' | 'LEFT' | 'RIGHT';

  const GRID_SIZE = 5;
  const START_POS = { x: 0, y: 4 };
  const TARGET_POS = { x: 4, y: 0 };
  const OBSTACLES = [
    { x: 1, y: 3 }, { x: 2, y: 1 }, { x: 3, y: 2 }, { x: 2, y: 4 }
  ];

  const [gameState, setGameState] = useState<'intro' | 'playing' | 'executing' | 'success' | 'failed'>('intro');
  const [robotPos, setRobotPos] = useState(START_POS);
  const [robotDir, setRobotDir] = useState<Direction>('E');
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentCmdIdx, setCurrentCmdIdx] = useState(-1);
  const [logs, setLogs] = useState<string[]>(["SISTEMA: Aguardando comandos lógicos."]);
  const [score, setScore] = useState(0);
  const [studentName, setStudentName] = useState('');

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const resetGame = () => {
    setGameState('intro');
    setRobotPos(START_POS);
    setRobotDir('E');
    setCommands([]);
    setCurrentCmdIdx(-1);
    setLogs(["SISTEMA: Reiniciado. Aguardando comandos."]);
    setScore(0);
    setStudentName('');
  };

  const clearCommands = () => {
    if (gameState === 'executing') return;
    setCommands([]);
    setRobotPos(START_POS);
    setRobotDir('E');
    setGameState('playing');
    setLogs(["SISTEMA: Fila de comandos limpa."]);
  };

  const removeCommand = (idx: number) => {
    if (gameState === 'executing') return;
    setCommands(prev => prev.filter((_, i) => i !== idx));
  };

  const addCommand = (cmd: Command) => {
    if (gameState !== 'playing' && gameState !== 'failed') return;
    if (commands.length >= 15) {
      addLog("AVISO: Memória cheia (Máx 15 comandos).");
      return;
    }
    setCommands(prev => [...prev, cmd]);
    if (gameState === 'failed') {
      setGameState('playing');
      setRobotPos(START_POS);
      setRobotDir('E');
    }
  };

  const isObstacle = (x: number, y: number) => {
    return OBSTACLES.some(obs => obs.x === x && obs.y === y);
  };

  const executeQueue = () => {
    if (commands.length === 0) {
      addLog("ERRO: Algoritmo vazio. Adicione blocos instrucionais.");
      return;
    }
    
    setGameState('executing');
    setRobotPos(START_POS);
    setRobotDir('E');
    setCurrentCmdIdx(-1);
    addLog("SISTEMA: Compilando e executando comandos...");
    
    let currentX = START_POS.x;
    let currentY = START_POS.y;
    let currentDir = 'E' as Direction;
    let idx = 0;

    const interval = setInterval(() => {
      if (idx >= commands.length) {
        clearInterval(interval);
        setCurrentCmdIdx(-1);
        if (currentX === TARGET_POS.x && currentY === TARGET_POS.y) {
          setGameState('success');
          setScore(100);
          addLog("SUCESSO: Algoritmo atingiu o estado esperado.");
        } else {
          setGameState('failed');
          addLog("FALHA: O robô não alcançou o objetivo final.");
        }
        return;
      }

      const cmd = commands[idx];
      setCurrentCmdIdx(idx);

      if (cmd === 'LEFT') {
        const dirs: Direction[] = ['N', 'W', 'S', 'E'];
        currentDir = dirs[(dirs.indexOf(currentDir) + 1) % 4];
        setRobotDir(currentDir);
        addLog(`Executando [${idx}]: Girar Esquerda`);
      } else if (cmd === 'RIGHT') {
        const dirs: Direction[] = ['N', 'E', 'S', 'W'];
        currentDir = dirs[(dirs.indexOf(currentDir) + 1) % 4];
        setRobotDir(currentDir);
        addLog(`Executando [${idx}]: Girar Direita`);
      } else if (cmd === 'FORWARD') {
        let nX = currentX;
        let nY = currentY;
        if (currentDir === 'N') nY -= 1;
        if (currentDir === 'E') nX += 1;
        if (currentDir === 'S') nY += 1;
        if (currentDir === 'W') nX -= 1;

        if (nX < 0 || nX >= GRID_SIZE || nY < 0 || nY >= GRID_SIZE) {
          clearInterval(interval);
          setGameState('failed');
          setCurrentCmdIdx(-1);
          addLog(`ERRO NO RUNTIME: Limite do ambiente atingido na instrução [${idx}].`);
          return;
        } else if (isObstacle(nX, nY)) {
          clearInterval(interval);
          setGameState('failed');
          setCurrentCmdIdx(-1);
          addLog(`ERRO NO RUNTIME: Colisão detectada na instrução [${idx}].`);
          return;
        } else {
          currentX = nX;
          currentY = nY;
          setRobotPos({ x: currentX, y: currentY });
          addLog(`Executando [${idx}]: Mover Frente`);
        }
      }
      
      idx++;
    }, 600);
  };

  const getRobotIcon = () => {
    switch (robotDir) {
      case 'N': return '↑';
      case 'E': return '→';
      case 'S': return '↓';
      case 'W': return '←';
    }
  };

  return (
    <div className="flex flex-col pt-4 md:pt-12 uppercase tracking-tighter overflow-visible w-full">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl w-full mx-auto px-2">
        <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 italic font-serif ${isDarkMode ? 'text-white' : 'text-black'}`}>Pensamento Computacional</h2>
        <p className={`max-w-2xl mb-8 md:mb-12 uppercase text-[10px] tracking-[0.2em] font-mono font-bold ${isDarkMode ? 'text-emerald-400' : 'text-black/30'}`}>Os 4 pilares para resolver qualquer problema tecnológico e educacional.</p>
        
        <div className="flex flex-col lg:flex-row gap-8 md:gap-11 items-start mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-1">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border transition-all group relative overflow-hidden ${
                  isDarkMode 
                  ? 'bg-black/30 border-white/5 hover:bg-[#12181d] hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/5' 
                  : 'bg-black/[0.01] border-black/[0.05] hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5'
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10">{pillar.icon}</div>
                <div className="relative z-10">
                  <div className="mb-4">{pillar.icon}</div>
                  <h3 className={`text-xl font-bold mb-2 tracking-tight group-hover:text-emerald-500 transition-colors ${isDarkMode ? 'text-white/90' : 'text-black/80'}`}>{pillar.title}</h3>
                  <p className={`leading-relaxed text-sm font-sans normal-case tracking-normal ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{pillar.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-600 rounded-3xl blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className={`relative rounded-3xl border overflow-hidden shadow-2xl transition-colors ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-black/[0.02] border-black/5'}`}>
                <img 
                  src="https://lucasleniar.com.br/certificado.gif" 
                  alt="Animação representativa de Certificação Acadêmica de TI e Redes do Professor Lucas Leniar" 
                  className="w-full h-auto scale-105 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                  <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Professor Lucas Leniar</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* INTERACTIVE COMP_THINKING CHALLENGE CODENAMED "SANDBOX" */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-3xl border p-6 md:p-10 shadow-2xl relative overflow-hidden w-full ${
            isDarkMode 
            ? 'bg-[#0f141a] border-white/5 shadow-black/40' 
            : 'bg-white border-slate-200'
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[120px] pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl text-emerald-600 ${isDarkMode ? 'bg-emerald-500/15' : 'bg-emerald-500/10'}`}>
                <Terminal size={24} />
              </div>
              <div>
                <span className={`text-[10px] uppercase tracking-[0.2em] font-mono font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Laboratório de Lógica</span>
                <h3 className={`text-xl md:text-2xl font-bold tracking-tight font-serif italic ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Desafio de Algoritmos</h3>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {gameState === 'intro' && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <p className={`text-sm md:text-base leading-relaxed font-sans normal-case tracking-normal max-w-3xl ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                  Participe deste laboratório prático. O objetivo é programar o robô para chegar ao bloco de destino utilizando os princípios de <strong>Algoritmos</strong> e <strong>Decomposição</strong>. 
                  Você precisará abstrair os movimentos visuais e dividi-los em comandos de passo simples e sequenciais.
                </p>
                <button
                  onClick={() => setGameState('playing')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-500 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  Iniciar Laboratório Prático <Play size={14} />
                </button>
              </motion.div>
            )}

            {(gameState === 'playing' || gameState === 'executing' || gameState === 'failed') && (
              <motion.div 
                key="workspace"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8"
              >
                {/* Compiler / Blocks panel */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#151c24] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase block mb-3 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>COMANDOS DISPONÍVEIS</span>
                    <div className="grid grid-cols-2 gap-2">
                       <button 
                        onClick={() => addCommand('FORWARD')} 
                        disabled={gameState === 'executing'}
                        className={`py-3 rounded-lg font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition-all shadow-sm ${isDarkMode ? 'bg-[#1c242e] border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white disabled:opacity-50' : 'bg-white border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 disabled:opacity-50'}`}
                       >
                         ↑ AVANÇAR
                       </button>
                       <div className="col-span-2 grid grid-cols-2 gap-2 mt-1">
                        <button 
                          onClick={() => addCommand('LEFT')} 
                          disabled={gameState === 'executing'}
                          className={`py-3 rounded-lg font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition-all shadow-sm ${isDarkMode ? 'bg-[#1c242e] border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white disabled:opacity-50' : 'bg-white border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 disabled:opacity-50'}`}
                        >
                          ↰ ESQUERDA
                        </button>
                        <button 
                          onClick={() => addCommand('RIGHT')} 
                          disabled={gameState === 'executing'}
                          className={`py-3 rounded-lg font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition-all shadow-sm ${isDarkMode ? 'bg-[#1c242e] border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white disabled:opacity-50' : 'bg-white border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 disabled:opacity-50'}`}
                        >
                          DIREITA ↱
                        </button>
                       </div>
                    </div>
                  </div>

                  <div className={`flex-[1] flex flex-col p-4 rounded-2xl border min-h-[220px] ${isDarkMode ? 'bg-[#11171d] border-white/5' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>FILA DE INSTRUÇÕES</span>
                      <span className={`text-[9px] font-mono font-bold ${commands.length === 15 ? 'text-red-500' : isDarkMode ? 'text-emerald-500/50' : 'text-emerald-600/60'}`}>{commands.length}/15</span>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {commands.length === 0 ? (
                        <div className={`h-full flex items-center justify-center text-[10px] font-mono font-bold uppercase tracking-widest text-center italic ${isDarkMode ? 'text-white/20' : 'text-slate-400'}`}>
                          Algoritmo Vazio
                        </div>
                      ) : (
                        commands.map((cmd, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => removeCommand(idx)}
                            className={`px-3 py-2.5 rounded-lg border flex items-center justify-between font-mono text-[10px] font-bold tracking-wider cursor-pointer group transition-all ${
                              currentCmdIdx === idx 
                                ? (isDarkMode ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-emerald-100 border-emerald-500 text-emerald-700')
                                : (isDarkMode ? 'bg-[#161c24] border-white/10 text-slate-300 hover:border-red-500/50' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-red-300')
                            }`}
                          >
                            <div className="flex items-center gap-2 opacity-80">
                              <span className="opacity-50">{String((idx + 1)).padStart(2, '0')}.</span>
                              <span>{cmd === 'FORWARD' ? 'AVANÇAR_FRENTE()' : cmd === 'LEFT' ? 'GIRAR_ESQUERDA()' : 'GIRAR_DIREITA()'}</span>
                            </div>
                            {gameState !== 'executing' && (
                              <X size={12} className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity" />
                            )}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-dashed border-slate-500/20 flex gap-2">
                       <button
                         onClick={clearCommands}
                         disabled={gameState === 'executing'}
                         className={`p-3 rounded-xl border flex items-center justify-center transition-all ${isDarkMode ? 'bg-[#1a212b] border-white/5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50' : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50'}`}
                         title="Limpar Comandos"
                       >
                         <Trash2 size={16} />
                       </button>
                       <button
                         onClick={executeQueue}
                         disabled={gameState === 'executing' || commands.length === 0}
                         className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest border transition-all ${
                           gameState === 'executing' 
                             ? 'bg-emerald-600/50 text-white cursor-not-allowed border-transparent' 
                             : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 cursor-pointer shadow-lg hover:shadow-emerald-500/20'
                         }`}
                       >
                         {gameState === 'executing' ? 'COMPILANDO...' : 'EXECUTAR ALGORITMO'} <Play size={14} />
                       </button>
                    </div>
                  </div>
                </div>

                {/* Grid Visualizer */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className={`relative p-2 md:p-6 rounded-2xl flex items-center justify-center flex-col shrink-0 border ${isDarkMode ? 'bg-[#0b0e13] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                    
                    {gameState === 'failed' && (
                      <div className="absolute top-4 left-0 right-0 z-20 flex justify-center">
                        <span className="px-4 py-1.5 bg-red-500/90 text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-full shadow-lg border border-red-400 animate-pulse">
                          FALHA NO PROCEDIMENTO ESTRUTURAL
                        </span>
                      </div>
                    )}

                    <div 
                      className={`grid gap-1 md:gap-2 p-3 md:p-4 rounded-xl border shadow-inner ${isDarkMode ? 'bg-[#161c24] border-white/5' : 'bg-slate-200 border-slate-300'}`}
                      style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
                    >
                      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                        const x = index % GRID_SIZE;
                        const y = Math.floor(index / GRID_SIZE);
                        
                        const isRobot = robotPos.x === x && robotPos.y === y;
                        const isTarget = TARGET_POS.x === x && TARGET_POS.y === y;
                        const isObs = isObstacle(x, y);

                        let cellClass = isDarkMode ? "bg-[#1c242e] border-white/5" : "bg-white border-slate-200 shadow-sm";
                        if (isTarget) {
                          cellClass = isDarkMode ? "bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "bg-emerald-100 border-emerald-400";
                        } else if (isObs) {
                          cellClass = isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-300 border-slate-400";
                        }

                        return (
                          <div 
                            key={index}
                            className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-md md:rounded-lg border flex items-center justify-center transition-all duration-300 relative ${cellClass}`}
                          >
                            {isTarget && !isRobot && (
                              <Award size={20} className={isDarkMode ? 'text-emerald-400 opacity-80' : 'text-emerald-600 opacity-80'} />
                            )}
                            {isObs && (
                              <div className="w-full h-full p-2 opacity-50">
                                <div className={`w-full h-full rounded ${isDarkMode ? 'bg-slate-700' : 'bg-slate-400'}`} />
                              </div>
                            )}
                            {isRobot && (
                              <motion.div 
                                layoutId="robot"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                className={`w-3/4 h-3/4 rounded-full flex items-center justify-center text-sm md:text-base font-bold shadow-lg z-10 ${gameState === 'failed' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                              >
                                {gameState === 'failed' ? <X size={16} /> : getRobotIcon()}
                              </motion.div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Terminal Logs */}
                  <div className={`p-4 rounded-xl border font-mono text-[9px] md:text-[10px] uppercase leading-relaxed shadow-inner h-32 overflow-y-auto ${isDarkMode ? 'bg-[#05080c] border-white/5 text-blue-400/80' : 'bg-slate-900 border-slate-900 text-emerald-400'}`}>
                    {logs.map((log, i) => (
                      <div key={i} className={`${i === 0 ? (log.includes('ERRO') || log.includes('FALHA') ? 'text-red-400 font-bold' : log.includes('SUCESSO') ? 'text-emerald-400 font-bold' : isDarkMode ? 'text-white' : 'text-emerald-300') : 'opacity-60'}`}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8 flex flex-col items-center justify-center py-6 text-center"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <Award size={40} className="animate-pulse" />
                  </div>
                  <h4 className={`text-2xl md:text-3xl font-bold font-serif italic tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Lógica Estruturada com Sucesso!</h4>
                  <p className={`text-sm max-w-lg font-sans normal-case tracking-normal ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
                    Parabéns! Você aplicou os pilares computacionais (Decomposição e Algoritmos) corretamente ordenando passos finitos. Insira seu nome para emitir o crachá:
                  </p>
                </div>
                
                <div className="w-full max-w-sm space-y-4">
                  <input 
                    type="text" 
                    placeholder="Seu Nome Completo"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    maxLength={32}
                    className={`w-full px-5 py-4 rounded-xl border text-sm font-sans font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all text-center placeholder:text-center ${
                      isDarkMode 
                      ? 'bg-[#151c24] border-white/10 text-white placeholder:text-white/30' 
                      : 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400'
                    }`}
                  />
                  
                  {studentName.length > 2 && (
                    <div className={`p-6 rounded-2xl border text-left mt-6 flex flex-col items-center space-y-4 shadow-xl ${isDarkMode ? 'bg-gradient-to-br from-[#101915] to-[#151c24] border-emerald-500/30' : 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200'}`}>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">CERTIFICADO DIGITAL LÓGICO</span>
                      <h5 className={`text-lg font-bold font-sans uppercase tracking-tight text-center ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {studentName}
                      </h5>
                      <p className={`text-[10px] font-sans normal-case text-center px-4 leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>
                        Validou competências de abstração e formulação algorítmica no laboratório de robótica educacional.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={resetGame}
                    className={`mt-4 w-full px-5 py-3 border rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                      isDarkMode 
                        ? 'border-white/10 hover:bg-white/5 text-white/60 hover:text-white' 
                        : 'border-slate-300 hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Recalibrar e Jogar Novamente
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </motion.div>
    </div>
  );
};

const RoboticsSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const features = [
    { title: "Arduino & ESP32", desc: "Desenvolvimento de protótipos e sistemas embarcados.", icon: <Cpu className="text-orange-500" size={32} /> },
    { title: "Lógica de Programação", desc: "Aplicação prática de algoritmos em hardware.", icon: <Layers className="text-blue-500" size={32} /> },
    { title: "Projetos Maker", desc: "Criação de soluções interativas e automatizadas.", icon: <Box className="text-emerald-500" size={32} /> },
    { title: "Educação Tecnológica", desc: "Metodologias ativas aplicadas à robótica.", icon: <GraduationCap className="text-purple-500" size={32} /> }
  ];

  type ProgramId = 'blink' | 'traffic' | 'sensor';
  const [activeProg, setActiveProg] = useState<ProgramId>('blink');
  const [codeMode, setCodeMode] = useState<'cpp' | 'mblock' | 'tutorial'>('cpp');
  const [isRunning, setIsRunning] = useState(false);
  const [leds, setLeds] = useState({ red: false, yellow: false, green: false });
  const [sensorTriggered, setSensorTriggered] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '-- LL-Arduino IDE v2.1.0 --',
    'Conectado com sucesso na porta COM7.',
    'Selecione um programa e clique em "Carregar Código" para iniciar.',
    'Status: AGUARDANDO FIRMWARE'
  ]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const programs = {
    blink: {
      title: "LED Intermitente (Blink)",
      desc: "Chaveia continuamente o pino digital D13 (LED Vermelho) ligando e desligando a cada 1 segundo.",
      code: `// Projeto: Pisca-Pisca (LED Vermelho)
void setup() {
  pinMode(13, OUTPUT); // Configura pino como Saída
}

void loop() {
  digitalWrite(13, HIGH); // Liga o LED
  delay(1000);            // Aguarda 1000ms
  digitalWrite(13, LOW);  // Desliga o LED
  delay(1000);            // Aguarda 1000ms
}`
    },
    traffic: {
      title: "Semáforo Três Vias",
      desc: "Simula o sequenciamento temporizado padrão de um semáforo de trânsito utilizando os pinos D13, D12 e D11.",
      code: `// Projeto: Semáforo de Tráfego
void setup() {
  pinMode(13, OUTPUT); // LED Vermelho
  pinMode(12, OUTPUT); // LED Amarelo
  pinMode(11, OUTPUT); // LED Verde
}

void loop() {
  digitalWrite(13, HIGH); // VM ativo
  delay(3000);            // Aguarda 3s
  digitalWrite(13, LOW);
  
  digitalWrite(12, HIGH); // AM ativo
  delay(1200);            // Aguarda 1.2s
  digitalWrite(12, LOW);
  
  digitalWrite(11, HIGH); // VD ativo
  delay(3000);            // Aguarda 3s
  digitalWrite(11, LOW);
}`
    },
    sensor: {
      title: "Alarme Automatizado",
      desc: "Monitora a entrada D2 (Sensor de Presença). Ao registrar atividade, gera sinal de alerta e sirene piscante.",
      code: `// Projeto: Alarme com Sensor PIR
void setup() {
  pinMode(2, INPUT);   // Sensor de Presença
  pinMode(13, OUTPUT); // LED de Alerta (D13)
}

void loop() {
  int presenca = digitalRead(2);
  
  if (presenca == HIGH) {
    digitalWrite(13, HIGH); // Liga Alerta
    delay(200);
    digitalWrite(13, LOW);
    delay(200);
  } else {
    digitalWrite(13, LOW);  // Seguro
  }
}`
    }
  };

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 7));
  };

  const startUpload = () => {
    setIsUploading(true);
    setIsRunning(false);
    setUploadProgress(0);
    setLeds({ red: false, yellow: false, green: false });
    addLog(`Compilando "${programs[activeProg].title}"...`);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsRunning(true);
          addLog("Gravação USB concluída! Binário carregado com sucesso (4.2 KB).");
          addLog("Simulador executando loop() principal.");
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setLeds({ red: false, yellow: false, green: false });
    setSensorTriggered(false);
    addLog("Simulação finalizada. GPIO limpo.");
  };

  // State Machine logic for simulation
  useEffect(() => {
    if (!isRunning) return;

    let timer: NodeJS.Timeout;
    let step = 0;

    const runLoop = () => {
      if (activeProg === 'blink') {
        setLeds(prev => {
          const nextVal = !prev.red;
          addLog(`Pino D13 -> ${nextVal ? 'HIGH (V_CC)' : 'LOW (GND)'}`);
          return { red: nextVal, yellow: false, green: false };
        });
        timer = setTimeout(runLoop, 1000);
      } else if (activeProg === 'traffic') {
        if (step === 0) {
          setLeds({ red: true, yellow: false, green: false });
          addLog("D13 (Vermelho) -> HIGH [Aguarde 3s]");
          step = 1;
          timer = setTimeout(runLoop, 3000);
        } else if (step === 1) {
          setLeds({ red: false, yellow: true, green: false });
          addLog("D12 (Amarelo) -> HIGH [Atenção 1.2s]");
          step = 2;
          timer = setTimeout(runLoop, 1200);
        } else {
          setLeds({ red: false, yellow: false, green: true });
          addLog("D11 (Verde) -> HIGH [Siga 3s]");
          step = 0;
          timer = setTimeout(runLoop, 3000);
        }
      } else if (activeProg === 'sensor') {
        if (sensorTriggered) {
          setLeds(prev => {
            const nextVal = !prev.red;
            addLog(`🚨 ALERTA: Sensor D2 ativo! Pino D13 piscando!`);
            return { red: nextVal, yellow: false, green: false };
          });
          timer = setTimeout(runLoop, 250);
        } else {
          setLeds({ red: false, yellow: false, green: false });
          addLog("Sensor D2 está estável (Aguardando movimento...)");
          timer = setTimeout(runLoop, 2000);
        }
      }
    };

    runLoop();

    return () => clearTimeout(timer);
  }, [isRunning, activeProg, sensorTriggered]);

  return (
    <div className="flex flex-col pt-6 md:pt-16 uppercase tracking-tighter overflow-visible">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl w-full">
        {/* Header */}
        <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 italic font-serif px-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Robótica Educacional</h2>
        <p className={`max-w-2xl mb-8 md:mb-12 uppercase text-[10px] tracking-[0.2em] font-mono font-bold px-1 ${isDarkMode ? 'text-emerald-400' : 'text-black/30'}`}>Transformando teoria em movimento e inovação.</p>
        
        {/* Core theory and layout */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-1">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 md:p-8 rounded-2xl border transition-all group relative overflow-hidden ${
                  isDarkMode 
                    ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]' 
                    : 'bg-black/[0.01] border-black/[0.05] hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5'
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10">{feature.icon}</div>
                <div className="relative z-10">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className={`text-lg font-bold mb-2 tracking-tight group-hover:text-emerald-500 transition-colors ${isDarkMode ? 'text-white/90' : 'text-black/80'}`}>{feature.title}</h3>
                  <p className={`leading-relaxed text-xs font-sans normal-case tracking-normal ${isDarkMode ? 'text-white/45' : 'text-black/45'}`}>{feature.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Sticky Robotics GIF */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-600 rounded-3xl blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl border ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'}`}>
                <img 
                  src="https://lucasleniar.com.br/robotica.gif" 
                  alt="Braço robótico industrial animado representando os ensinamentos práticos de robótica escolar" 
                  className="w-full h-auto scale-105 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                  <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-mono leading-none">Protótipos em Movimento</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* WORKBENCH LAB DIVIDER */}
        <div className="mt-8 mb-8 border-t border-emerald-500/10 pt-10 px-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-1 px-2.5 bg-emerald-500/10 text-emerald-500 rounded-lg text-xs font-mono font-bold">PROTOTIPAGEM REALTIME</span>
            <h3 className={`text-xl md:text-2xl font-bold tracking-tight italic font-serif leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}>Mesa de Trabalho Maker</h3>
          </div>
          <p className={`text-xs font-sans normal-case tracking-normal font-medium ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
            Interaja com o microcontrolador virtual abaixo. Teste diferentes algoritmos de hardware executados em tempo real na bancada de circuitos.
          </p>
        </div>

        {/* ARDUINO SANDBOX WORKBENCH */}
        <div className="rounded-3xl border shadow-xl overflow-hidden mb-8 grid grid-cols-1 lg:grid-cols-12 bg-[#0e141f] border-slate-800 text-white">
          {/* 1. Project Selector Sidebar */}
          <div className="lg:col-span-4 p-6 border-r border-slate-800 flex flex-col justify-between bg-[#080d15]">
            <div className="space-y-4">
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase block mb-1 text-emerald-400">1. Instalar Firmware</span>
              
              <div className="space-y-2">
                {(Object.keys(programs) as ProgramId[]).map((progId) => (
                  <button
                    key={progId}
                    onClick={() => {
                      setActiveProg(progId);
                      stopSimulation();
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer block group ${
                      activeProg === progId 
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-md' 
                        : 'border-white/5 bg-[#111724] hover:bg-white/[0.04] text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-mono font-bold text-[10px] uppercase tracking-wider group-hover:text-emerald-400 transition-colors mb-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeProg === progId ? 'bg-emerald-500 animate-ping' : 'bg-slate-600'}`} />
                      {programs[progId].title}
                    </span>
                    <span className={`text-[11px] font-sans normal-case tracking-normal block leading-tight ${activeProg === progId ? 'text-emerald-300/80' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {programs[progId].desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6">
              <span className="text-[8px] font-mono font-bold uppercase text-slate-500 tracking-wider">ESBOÇO MAKER ATIVO:</span>
              <p className="text-[12px] font-bold mt-1 uppercase text-slate-200">
                {programs[activeProg].title}
              </p>
            </div>
          </div>

          {/* 2. Hardware / Breadboard simulation map */}
          <div className="lg:col-span-4 p-6 flex flex-col justify-between items-center bg-[#0a0f18] border-r border-slate-800">
            <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase w-full text-left mb-6">2. Bancada Virtual</span>
            
            {/* Visual Hardware Schematic */}
            <div className="w-full flex flex-col items-center justify-center space-y-8 py-4 relative">
              {/* Virtual Microprocessor circuit card representation */}
              <div className="w-64 bg-[#141b25] border-2 border-emerald-500/30 rounded-3xl p-4 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 bg-blue-600/20 w-16 h-12 rounded-br-2xl border-b border-r border-[#ffffff0a] flex items-center justify-center font-mono text-[9px] text-white/30">USB</div>
                <div className="absolute bottom-2 right-4 text-[9px] font-mono font-bold text-white/10 select-none">LL-UNO R3</div>
                
                {/* Circuit paths */}
                <div className="flex flex-col items-end space-y-1 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-mono text-white/30">D13</span>
                    <div className={`w-3 h-2 rounded ${leds.red ? 'bg-red-500 animate-ping' : 'bg-slate-700'}`} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-mono text-white/30">D12</span>
                    <div className={`w-3 h-2 rounded ${leds.yellow ? 'bg-yellow-500 animate-ping' : 'bg-slate-700'}`} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-mono text-white/30">D11</span>
                    <div className={`w-3 h-2 rounded ${leds.green ? 'bg-green-500 animate-ping' : 'bg-slate-700'}`} />
                  </div>
                </div>

                {/* Microprocessor main processor block */}
                <div className="mx-auto w-32 h-10 bg-slate-900 border border-white/10 rounded-md flex items-center justify-center relative p-2 my-2">
                  <span className="text-[7.5px] font-mono text-white/40 tracking-wider">ATMEGA328P-PU</span>
                  <div className="absolute -inset-x-1 top-2 flex justify-between px-1">
                    <div className="w-1 h-1 bg-white/20 rounded-full" /><div className="w-1 h-1 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Connected Wire Nodes */}
              <div className="flex flex-col gap-3 items-center relative z-20 w-full max-w-[220px]">
                {/* Simulated physical layout of Breadboard components */}
                <div className="w-full bg-[#1e2530] border border-white/5 rounded-2xl p-4 flex flex-col space-y-4 shadow-lg">
                  <div className="flex items-center justify-center gap-8">
                    {/* RED LED with heavy glow filter */}
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative ${
                        leds.red 
                          ? 'bg-red-500 border-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.9)] scale-110' 
                          : 'bg-red-950/40 border-red-900/30 text-red-500/20'
                      }`}>
                        <div className="w-2.5 h-2.5 bg-white/40 rounded-full absolute top-1 right-1" />
                      </div>
                      <span className="text-[8px] font-mono text-white/40 mt-1">D13 VM</span>
                    </div>

                    {/* YELLOW LED */}
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative ${
                        leds.yellow 
                          ? 'bg-yellow-500 border-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.9)] scale-110' 
                          : 'bg-yellow-950/40 border-yellow-900/30 text-yellow-500/20'
                      }`}>
                        <div className="w-2.5 h-2.5 bg-white/40 rounded-full absolute top-1 right-1" />
                      </div>
                      <span className="text-[8px] font-mono text-white/40 mt-1">D12 AM</span>
                    </div>

                    {/* GREEN LED */}
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative ${
                        leds.green 
                          ? 'bg-emerald-500 border-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.9)] scale-110' 
                          : 'bg-emerald-950/40 border-emerald-900/30 text-emerald-500/20'
                      }`}>
                        <div className="w-2.5 h-2.5 bg-white/40 rounded-full absolute top-1 right-1" />
                      </div>
                      <span className="text-[8px] font-mono text-white/40 mt-1">D11 VD</span>
                    </div>
                  </div>

                  {/* SENSOR PRESENCE AREA (Only active for Sensor project) */}
                  {activeProg === 'sensor' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-white/5 pt-3.5 flex flex-col items-center"
                    >
                      <span className="text-[8px] font-mono font-bold text-emerald-400 block mb-2">ENTRADA DIGITAL 2: SENSOR</span>
                      <button
                        onMouseDown={() => setSensorTriggered(true)}
                        onMouseUp={() => setSensorTriggered(false)}
                        onTouchStart={() => setSensorTriggered(true)}
                        onTouchEnd={() => setSensorTriggered(false)}
                        className={`px-4 py-2 text-[10px] font-mono font-bold rounded-xl transition-all cursor-pointer ${
                          sensorTriggered 
                            ? 'bg-red-600 text-white shadow-lg scale-95 shadow-red-500/30' 
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                        }`}
                      >
                        {sensorTriggered ? "📶 MOVIMENTO DETECTADO!" : "🚶 SIMULAR MOVIMENTO (PIR)"}
                      </button>
                      <span className="text-[7.5px] font-sans normal-case tracking-normal text-white/20 mt-1.5">Mantenha pressionado para testar o alarme</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Board online pulse */}
            <div className="flex items-center gap-2 mt-4 self-start">
              <span className={`relative flex h-2 w-2`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRunning ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunning ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              </span>
              <span className="text-[9px] font-mono tracking-wider text-slate-400">
                {isRunning ? 'CHIP ATIVO (RUNNING)' : 'CHIP INATIVO (STOPPED)'}
              </span>
            </div>
          </div>

          {/* 3. Code View and Serial Logs Monitor */}
          <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-[#0b0f15]">
            <div className="flex flex-col space-y-4">
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">3. IDE Editor & mBlock & Serial</span>
              
              {/* Tabs for Code and mBlock Blocks */}
              <div className="flex bg-[#070a0f] p-1 rounded-xl gap-1 border border-white/5">
                <button
                  onClick={() => setCodeMode('cpp')}
                  className={`flex-1 py-1.5 rounded-lg text-center font-semibold text-[8.5px] tracking-wider uppercase font-mono transition-all duration-200 cursor-pointer ${
                    codeMode === 'cpp' 
                      ? 'bg-orange-500/10 border border-orange-500/20 text-orange-400 shadow-sm font-bold'
                      : 'text-slate-500 hover:text-slate-350 hover:bg-white/[0.01]'
                  }`}
                >
                  Arduino C++
                </button>
                <button
                  onClick={() => setCodeMode('mblock')}
                  className={`flex-1 py-1.5 rounded-lg text-center font-semibold text-[8.5px] tracking-wider uppercase font-mono transition-all duration-200 cursor-pointer ${
                    codeMode === 'mblock' 
                      ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-sm font-bold'
                      : 'text-slate-500 hover:text-slate-350 hover:bg-white/[0.01]'
                  }`}
                >
                  mBlock Blocos
                </button>
                <button
                  onClick={() => setCodeMode('tutorial')}
                  className={`flex-1 py-1.5 rounded-lg text-center font-semibold text-[8.5px] tracking-wider uppercase font-mono transition-all duration-200 cursor-pointer ${
                    codeMode === 'tutorial' 
                      ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-sm font-bold'
                      : 'text-slate-500 hover:text-slate-350 hover:bg-white/[0.01]'
                  }`}
                >
                  mBlock Guia
                </button>
              </div>

              {/* Code or Block Panel Window */}
              <div className="bg-[#05080c] rounded-2xl border border-white/5 p-4 overflow-y-auto h-44 transition-all duration-200">
                {codeMode === 'cpp' && (
                  <div className="font-mono text-[10px] leading-relaxed text-slate-300 select-all overflow-x-auto whitespace-pre border-l-2 border-l-orange-500 pl-2">
                    {programs[activeProg].code}
                  </div>
                )}

                {codeMode === 'mblock' && (
                  <div className="flex flex-col space-y-1 select-none font-mono text-[9px] text-white">
                    {activeProg === 'blink' && (
                      <>
                        <div className="bg-[#ffbc33] border border-[#d99f24] rounded-t-xl rounded-b-md px-3 py-1.5 font-bold shadow-sm relative w-fit mb-0.5">
                          🏁 quando o Arduino Uno iniciar
                        </div>
                        <div className="bg-[#f59e0b] border border-[#d97706] rounded-md p-2 flex flex-col space-y-1.5">
                          <div className="font-bold text-[8.5px]">🔄 repetir para sempre:</div>
                          <div className="pl-3 border-l-2 border-amber-600/50 space-y-1.5 py-0.5">
                            <div className="bg-[#10b981] border border-[#059669] rounded-md px-2.5 py-1 text-[8.5px] font-bold">
                              🟢 definir pino digital <span className="bg-black/30 px-1 py-0.5 rounded text-white font-black mx-1">(13)</span> como <span className="bg-[#ffbd22] text-black px-1.5 py-0.2 rounded font-black text-[8px] mx-1">ALTO</span>
                            </div>
                            <div className="bg-[#f59e0b] border border-[#d97706] rounded-md px-2.5 py-1 text-[8.5px] font-bold">
                              ⏱️ esperar <span className="bg-black/30 px-1.5 py-0.5 rounded text-white font-black mx-1">(1)</span> segundos
                            </div>
                            <div className="bg-[#10b981] border border-[#059669] rounded-md px-2.5 py-1 text-[8.5px] font-bold">
                              🔴 definir pino digital <span className="bg-black/30 px-1 py-0.5 rounded text-white font-black mx-1">(13)</span> como <span className="bg-[#2a303c] text-white/50 px-1.5 py-0.2 rounded font-black text-[8px] mx-1">BAIXO</span>
                            </div>
                            <div className="bg-[#f59e0b] border border-[#d97706] rounded-md px-2.5 py-1 text-[8.5px] font-bold">
                              ⏱️ esperar <span className="bg-black/30 px-1.5 py-0.5 rounded text-white font-black mx-1">(1)</span> segundos
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeProg === 'traffic' && (
                      <>
                        <div className="bg-[#ffbc33] border border-[#d99f24] rounded-t-xl rounded-b-md px-3 py-1.5 font-bold shadow-sm relative w-fit mb-0.5">
                          🏁 quando o Arduino Uno iniciar
                        </div>
                        <div className="bg-[#f59e0b] border border-[#d97706] rounded-md p-2 flex flex-col space-y-1.5">
                          <div className="font-bold text-[8.5px]">🔄 repetir para sempre:</div>
                          <div className="pl-3 border-l-2 border-amber-600/50 space-y-1.5 py-0.5">
                            <div className="bg-[#10b981] border border-[#059669] rounded-md px-2.5 py-1 text-[8.5px] font-bold">
                              🔴 definir pino digital <span className="bg-black/30 px-1 py-0.5 rounded text-white font-black mx-1">(13)</span> como <span className="bg-[#ffbd22] text-black px-1.5 py-0.2 rounded font-black text-[8px] mx-1">ALTO</span>
                            </div>
                            <div className="bg-[#f59e0b] border border-[#d97706] rounded-md px-2.5 py-1 text-[8.5px] font-bold">
                              ⏱️ esperar <span className="bg-black/30 px-1.5 py-0.5 rounded text-white font-black mx-1">(3)</span> segundos
                            </div>
                            <div className="bg-[#10b981] border border-[#059669] rounded-md px-2.5 py-1 text-[8.5px] font-bold">
                              🔴 definir pino digital <span className="bg-black/30 px-1 py-0.5 rounded text-white font-black mx-1">(13)</span> como <span className="bg-[#2a303c] text-white/50 px-1.5 py-0.2 rounded font-black text-[8px] mx-1">BAIXO</span>
                            </div>
                            
                            <div className="bg-[#10b981] border border-[#059669] rounded-md px-2.5 py-1 text-[8.5px] font-bold mt-2">
                              🟡 definir pino digital <span className="bg-black/30 px-1 py-0.5 rounded text-white font-black mx-1">(12)</span> como <span className="bg-[#ffbd22] text-black px-1.5 py-0.2 rounded font-black text-[8px] mx-1">ALTO</span>
                            </div>
                            <div className="bg-[#f59e0b] border border-[#d97706] rounded-md px-2.5 py-1 text-[8.5px] font-bold">
                              ⏱️ esperar <span className="bg-black/30 px-1.5 py-0.5 rounded text-white font-black mx-1">(1.2)</span> segundos
                            </div>
                            <div className="bg-[#10b981] border border-[#059669] rounded-md px-2.5 py-1 text-[8.5px] font-bold">
                              🟡 definir pino digital <span className="bg-black/30 px-1 py-0.5 rounded text-white font-black mx-1">(12)</span> como <span className="bg-[#2a303c] text-white/50 px-1.5 py-0.2 rounded font-black text-[8px] mx-1">BAIXO</span>
                            </div>

                            <div className="bg-[#10b981] border border-[#059669] rounded-md px-2.5 py-1 text-[8.5px] font-bold mt-2">
                              🟢 definir pino digital <span className="bg-black/30 px-1 py-0.5 rounded text-white font-black mx-1">(11)</span> como <span className="bg-[#ffbd22] text-black px-1.5 py-0.2 rounded font-black text-[8px] mx-1">ALTO</span>
                            </div>
                            <div className="bg-[#f59e0b] border border-[#d97706] rounded-md px-2.5 py-1 text-[8.5px] font-bold">
                              ⏱️ esperar <span className="bg-black/30 px-1.5 py-0.5 rounded text-white font-black mx-1">(3)</span> segundos
                            </div>
                            <div className="bg-[#10b981] border border-[#059669] rounded-md px-2.5 py-1 text-[8.5px] font-bold">
                              🟢 definir pino digital <span className="bg-black/30 px-1 py-0.5 rounded text-white font-black mx-1">(11)</span> como <span className="bg-[#2a303c] text-white/50 px-1.5 py-0.2 rounded font-black text-[8px] mx-1">BAIXO</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeProg === 'sensor' && (
                      <>
                        <div className="bg-[#ffbc33] border border-[#d99f24] rounded-t-xl rounded-b-md px-3 py-1.5 font-bold shadow-sm relative w-fit mb-0.5">
                          🏁 quando o Arduino Uno iniciar
                        </div>
                        <div className="bg-[#f59e0b] border border-[#d97706] rounded-md p-2 flex flex-col space-y-1.5">
                          <div className="font-bold text-[8.5px]">🔄 repetir para sempre:</div>
                          <div className="pl-3 border-l-2 border-amber-600/50 space-y-1.5 py-0.5">
                            
                            <div className="bg-[#f59e0b] border border-[#d97706] rounded-md p-2 flex flex-col space-y-1.5">
                              <div className="font-bold text-[8.2px] flex items-center flex-wrap gap-y-1 text-[#fefefe]">
                                ❓ se 
                                <span className="bg-[#2563eb] border border-[#1d4ed8] px-1.5 py-0.5 rounded-full text-[8px] text-white mx-1 flex items-center gap-0.5">
                                  🔌 ler pino digital <span className="bg-black/30 px-1 rounded mx-0.5 font-black text-white">(2)</span> = <span className="bg-[#ffbd22] text-black px-1 rounded font-black text-[7.5px] mx-0.5">ALTO</span>
                                </span>
                                então:
                              </div>
                              
                              <div className="pl-2 border-l border-white/20 space-y-1.5 py-0.5">
                                <div className="bg-[#10b981] border border-[#059669] rounded-md px-2 py-0.5 text-[8.5px] font-bold">
                                  🔴 definir pino digital <span className="bg-black/30 px-1 py-0.5 rounded text-white font-black mx-1">(13)</span> como <span className="bg-[#ffbd22] text-black px-1.5 py-0.2 rounded font-black text-[8px] mx-1">ALTO</span>
                                </div>
                                <div className="bg-[#f59e0b] border border-[#d97706] rounded-md px-2 py-0.5 text-[8.5px] font-bold">
                                  ⏱️ esperar <span className="bg-black/30 px-1.5 py-0.5 rounded text-white font-black mx-1">(0.2)</span> segundos
                                </div>
                                <div className="bg-[#10b981] border border-[#059669] rounded-md px-2 py-0.5 text-[8.5px] font-bold">
                                  🔴 definir pino digital <span className="bg-black/30 px-1 py-0.5 rounded text-white font-black mx-1">(13)</span> como <span className="bg-[#2a303c] text-white/50 px-1.5 py-0.2 rounded font-black text-[8px] mx-1">BAIXO</span>
                                </div>
                                <div className="bg-[#f59e0b] border border-[#d97706] rounded-md px-2 py-0.5 text-[8.5px] font-bold">
                                  ⏱️ esperar <span className="bg-black/30 px-1.5 py-0.5 rounded text-white font-black mx-1">(0.2)</span> segundos
                                </div>
                              </div>

                              <div className="font-bold text-[8.2px] text-[#fefefe]">senão:</div>
                              
                              <div className="pl-2 border-l border-white/20 space-y-1.5 py-0.5">
                                <div className="bg-[#10b981] border border-[#059669] rounded-md px-2 py-0.5 text-[8.5px] font-bold">
                                  🔴 definir pino digital <span className="bg-black/30 px-1 py-0.5 rounded text-white font-black mx-1">(13)</span> como <span className="bg-[#2a303c] text-white/50 px-1.5 py-0.2 rounded font-black text-[8px] mx-1">BAIXO</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {codeMode === 'tutorial' && (
                  <div className="text-[9.5px] space-y-2 text-slate-300 font-sans normal-case leading-relaxed select-text">
                    <div className="border-b border-white/5 pb-1 flex items-center justify-between">
                      <span className="font-bold font-mono tracking-wide text-purple-400">COMO INTEGRAR COM O MBLOCK:</span>
                      <span className="text-[8px] bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-mono">Guia mBlock</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-300 px-1">
                      <li>
                        <strong className="text-white">Selecione Arduino Uno:</strong> Vá em <strong className="text-emerald-400">Dispositivos</strong>, clique em <strong className="text-emerald-400">+ Adicionar</strong>, selecione a placa <strong className="text-white underline">Arduino Uno</strong> e clique em OK.
                      </li>
                      <li>
                        <strong className="text-white">Mudança de Modo:</strong> Mude a chave da placa de <strong className="text-white">"Ao Vivo (Live)"</strong> para <strong className="text-purple-400">"Carregar (Upload)"</strong> no canto superior direito para habilitar os blocos de firmware do chip.
                      </li>
                      <li>
                        <strong className="text-white">Recrie os Blocos:</strong> Arraste e posicione os blocos de acordo com o esquema da aba <strong className="text-blue-400">mBlock Blocos</strong> ao lado.
                      </li>
                      <li>
                        <strong className="text-white">Conexão USB:</strong> Conecte sua placa física. Clique em <strong className="text-emerald-400">Conectar</strong> e escolha a porta serial apropriada (Ex: <em className="text-emerald-400 font-mono">COM3, COM7</em>).
                      </li>
                      <li>
                        <strong className="text-white">Gravar no Arduino:</strong> Clique no botão de cor azul <strong className="text-blue-400">"Carregar (Upload)"</strong>. Os blocos mBlock serão compilados e gravados de forma definitiva na placa!
                      </li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Interaction Buttons Container */}
              <div className="flex gap-2">
                {isRunning ? (
                  <button
                    onClick={stopSimulation}
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-red-500 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center leading-none"
                  >
                    Parar Código
                  </button>
                ) : (
                  <button
                    onClick={startUpload}
                    disabled={isUploading}
                    className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-500 disabled:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center leading-none"
                  >
                    {isUploading ? `Gravando... ${uploadProgress}%` : "Carregar Código"}
                  </button>
                )}
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="w-full bg-[#1a222f] h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${uploadProgress}%` }} 
                    className="h-full bg-emerald-500" 
                  />
                </div>
              )}
            </div>

            {/* Simulated Live Serial Monitor Terminal */}
            <div className="mt-6 border-t border-white/5 pt-4">
              <span className="text-[8px] font-mono font-bold text-yellow-500 tracking-widest block mb-2 uppercase">Monitor Serial (9600 Baud)</span>
              <div className="bg-black/40 rounded-xl p-3 h-28 border border-white/5 overflow-y-auto font-mono text-[9px] text-emerald-400 space-y-1 select-text">
                {logs.map((logStr, idx) => (
                  <div key={idx} className="whitespace-pre-wrap leading-normal font-medium">
                    {logStr}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ITSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  type ProblemId = 'dhcp' | 'dns' | 'ram' | 'firewall';
  const [activeProb, setActiveProb] = useState<ProblemId>('dhcp');
  const [probFixed, setProbFixed] = useState<{ dhcp: boolean; dns: boolean; ram: boolean; firewall: boolean }>({
    dhcp: false,
    dns: false,
    ram: false,
    firewall: false
  });
  const [isFixing, setIsFixing] = useState(false);
  const [sysRamUsage, setSysRamUsage] = useState(98);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([
    "NOC Dashboard ativo.",
    "Monitoramento de infraestrutura online.",
    "Status: ALERTA - Uma ou mais falhas críticas detectadas na rede local."
  ]);
  const [score, setScore] = useState(0);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    setDiagnosticLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 7));
  };

  const getOptions = (prob: ProblemId) => {
    switch (prob) {
      case 'dhcp': return [
        { cmd: 'ip r add default via 192.168.1.1', correct: false },
        { cmd: 'sudo dhclient -r && sudo dhclient eth0', correct: true },
        { cmd: 'sudo apt-get install dhcpcd', correct: false }
      ];
      case 'dns': return [
        { cmd: "sudo echo 'nameserver 8.8.8.8' > /etc/resolv.conf", correct: true },
        { cmd: 'ping 8.8.8.8', correct: false },
        { cmd: 'ipconfig /flushdns', correct: false }
      ];
      case 'firewall': return [
        { cmd: 'sudo ufw disable', correct: false },
        { cmd: 'iptables -A FORWARD -p tcp --dport 80 -j REJECT', correct: false },
        { cmd: 'iptables -D FORWARD -p tcp --dport 443 -j REJECT && iptables -A FORWARD -p tcp --dport 443 -j ACCEPT', correct: true }
      ];
      case 'ram': return [
        { cmd: 'sudo rm -rf /var/log/*', correct: false },
        { cmd: 'sudo reboot now', correct: false },
        { cmd: 'sudo kill -9 $(pgrep sysops_backup) && sudo sysctl -w vm.drop_caches=3', correct: true }
      ];
    }
  };

  const solveProblem = (cmd: string, correct: boolean) => {
    setIsFixing(true);
    addLog(`> ${cmd}`);
    
    if (!correct) {
      setTimeout(() => {
        addLog("ERRO: Comando inválido ou ineficiente para a mitigação do problema.");
        setIsFixing(false);
      }, 800);
      return;
    }

    addLog(`Iniciando rotina corretiva para o caso: ${
      activeProb === 'dhcp' ? 'Renovação DHCP' : 
      activeProb === 'dns' ? 'Ajuste de Servidores DNS' : 
      activeProb === 'ram' ? 'Estouro de RAM' : 'Regras de Firewall'
    }...`);

    setTimeout(() => {
      if (activeProb === 'dhcp') {
        setProbFixed(prev => ({ ...prev, dhcp: true }));
        addLog("Requisitando lease de endereço IP via broadcast ethernet...");
        addLog("Sucesso! IP 192.168.100.125 atribuído.");
        setScore(s => s + 100);
      } else if (activeProb === 'dns') {
        setProbFixed(prev => ({ ...prev, dns: true }));
        addLog("Atualizando resolv.conf com DNS Secundário...");
        addLog("Lookup: utfpr.edu.br -> Resolvido p/ 200.134.1.25");
        setScore(s => s + 100);
      } else if (activeProb === 'ram') {
        setProbFixed(prev => ({ ...prev, ram: true }));
        addLog("Eliminando processo zumbi e dropando caches...");
        setSysRamUsage(28);
        addLog("Memória ram reciclada. Servidor estável.");
        setScore(s => s + 100);
      } else if (activeProb === 'firewall') {
        setProbFixed(prev => ({ ...prev, firewall: true }));
        addLog("Adequando regras de firewall (IPTABLES)...");
        addLog("Acesso liberado (ACCEPT) na porta 443 HTTPS.");
        setScore(s => s + 100);
      }
      setIsFixing(false);
    }, 1500);
  };

  const resetAllProblems = () => {
    setProbFixed({ dhcp: false, dns: false, ram: false, firewall: false });
    setSysRamUsage(98);
    setScore(0);
    setDiagnosticLogs([
      "Painel NOC reiniciado com sucesso.",
      "Falhas sintéticas de rede recolocadas para calibração escolar."
    ]);
  };

  return (
    <div className="flex flex-col pt-6 md:pt-16 pb-12 overflow-y-auto w-full">
      {/* Upper informational grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 max-w-6xl w-full mb-10 px-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8 flex flex-col justify-center">
          <h2 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 italic font-serif ${isDarkMode ? 'text-white' : 'text-black'}`}>Tecnologia da Informação</h2>
          <p className={`max-w-xl mb-8 uppercase text-[11px] tracking-[0.2em] font-mono font-bold ${isDarkMode ? 'text-blue-400' : 'text-slate-500'}`}>
            Infraestrutura, Conectividade e Suporte Avançado
          </p>
          <div className={`space-y-5 text-sm md:text-base font-sans normal-case tracking-normal leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
            <p>
              Atuação sólida em Tecnologia da Informação, com foco em infraestrutura, redes, hardware e sistemas operacionais, voltada à formação de profissionais técnicos preparados para os desafios do mundo real.
            </p>
            <p>
              O processo de ensino vai além da execução de tarefas: busca desenvolver pensamento crítico, raciocínio lógico e autonomia na resolução de problemas. A proposta integra teoria e prática de forma estratégica, capacitando os alunos a compreenderem profundamente o funcionamento das tecnologias, diagnosticar falhas e construir soluções eficientes em diferentes contextos profissionais.
            </p>
          </div>
          
          {/* Tech stack bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]' : 'bg-black/[0.02] border-black/10 hover:bg-black/[0.05]'}`}>
              <Server size={22} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              <span className={`text-[10px] uppercase font-mono font-bold tracking-wider ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Infra & SO</span>
            </div>
            <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]' : 'bg-black/[0.02] border-black/10 hover:bg-black/[0.05]'}`}>
              <Network size={22} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />
              <span className={`text-[10px] uppercase font-mono font-bold tracking-wider ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Redes & TCP/IP</span>
            </div>
            <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]' : 'bg-black/[0.02] border-black/10 hover:bg-black/[0.05]'}`}>
              <Cpu size={22} className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} />
              <span className={`text-[10px] uppercase font-mono font-bold tracking-wider ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Hardware</span>
            </div>
            <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]' : 'bg-black/[0.02] border-black/10 hover:bg-black/[0.05]'}`}>
              <ShieldCheck size={22} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
              <span className={`text-[10px] uppercase font-mono font-bold tracking-wider ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Segurança</span>
            </div>
          </div>
        </motion.div>

        {/* Beautiful diagnostic card image directly inside info block */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 flex items-center justify-center">
          <div className="relative group w-full max-w-[320px]">
            <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-15 transition-opacity" />
            <div className={`relative rounded-2xl overflow-hidden shadow-2xl border ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
              <img 
                src="https://lucasleniar.com.br/titecnico.png" 
                alt="Diagrama e mesa técnica de hardware e redes de computadores para suporte de TI" 
                className="w-full h-auto scale-105 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-mono leading-none">Visão de Topologia</p>
                <p className="text-[11px] text-white/70 mt-1 font-sans">Desenho arquitetural de redes.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* DETAILED INTERACTIVE NOC / SIMULATION CONTAINER */}
      <div className="max-w-6xl w-full px-1">
        <div className={`border-t pt-10 mb-8 ${isDarkMode ? 'border-blue-500/10' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className={`p-1 px-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider ${isDarkMode ? 'bg-blue-500/10 text-blue-500' : 'bg-blue-100 text-blue-700'}`}>
              NOC Diagnostics Center
            </span>
            <h3 className={`text-2xl md:text-3xl font-bold tracking-tight italic font-serif leading-none ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Central de Operações (NOC)
            </h3>
          </div>
          <p className={`max-w-3xl text-sm font-sans normal-case tracking-normal font-medium leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-slate-600'}`}>
            Uma simulação interativa de incidentes reais solucionados por administradores de rede. Selecione um ticket de suporte, analise o diagnóstico e aplique a correção via terminal para restabelecer a infraestrutura.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className={`rounded-3xl border shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 ${isDarkMode ? 'bg-[#0e141f] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
          {/* NOC Incident Selection sidebar */}
          <div className={`lg:col-span-4 p-6 border-r flex flex-col justify-between ${isDarkMode ? 'border-slate-800 bg-[#080d15]' : 'border-slate-200 bg-slate-50'}`}>
            <div className="space-y-4">
              <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase block mb-2 ${isDarkMode ? 'text-emerald-400' : 'text-blue-600'}`}>TICKETS DE INCIDENTE</span>
              
              <div className="space-y-2">
                {[
                  { id: 'dhcp', name: 'Lease DHCP Ausente', desc: 'Computador da matriz sem IP configurado para LAN.', fixed: probFixed.dhcp },
                  { id: 'dns', name: 'Falha de Tradução DNS', desc: 'Ping resolve IPs, mas nomes não carregam (NXDOMAIN).', fixed: probFixed.dns },
                  { id: 'firewall', name: 'Bloqueio de Firewall', desc: 'Tráfego seguro impedido na porta 443 internamente.', fixed: probFixed.firewall },
                  { id: 'ram', name: 'Estouro Crítico RAM', desc: 'Servidor instável reportando 98% de carga e swap.', fixed: probFixed.ram }
                ].map((prob) => (
                  <button
                    key={prob.id}
                    onClick={() => setActiveProb(prob.id as ProblemId)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer block ${
                      activeProb === prob.id 
                        ? (isDarkMode ? 'bg-blue-500/15 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-blue-50 border-blue-300 shadow-sm')
                        : (isDarkMode ? 'border-white/5 bg-[#111724] hover:bg-white/[0.04]' : 'border-slate-200 bg-white hover:bg-slate-50')
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-mono font-bold text-[11px] uppercase tracking-wider block ${isDarkMode ? (activeProb === prob.id ? 'text-blue-400' : 'text-slate-200') : (activeProb === prob.id ? 'text-blue-700' : 'text-slate-700')}`}>
                        {prob.name}
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider leading-none ${
                        prob.fixed 
                          ? (isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700')
                          : ['ram', 'firewall'].includes(prob.id) ? (isDarkMode ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-red-100 text-red-600 animate-pulse') : (isDarkMode ? 'bg-yellow-500/20 text-yellow-400 animate-pulse' : 'bg-yellow-100 text-yellow-700 animate-pulse')
                      }`}>
                        {prob.fixed ? 'Resolvido' : 'Crítico'}
                      </span>
                    </div>
                    <span className={`text-[12px] font-sans normal-case tracking-normal block leading-snug mt-2 ${activeProb === prob.id ? (isDarkMode ? 'text-blue-200' : 'text-blue-800') : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`}>
                      {prob.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Maintenance controls */}
            <div className={`pt-6 border-t flex gap-2 mt-6 ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
              <button
                onClick={resetAllProblems}
                className={`flex-1 py-3 rounded-xl text-[10px] font-mono font-bold tracking-widest uppercase border transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'border-white/5 bg-[#161f30] text-slate-300 hover:bg-red-600/20 hover:text-red-400 hover:border-red-500/30' 
                    : 'border-slate-300 bg-white text-slate-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300'
                }`}
              >
                Resetar Infraestrutura
              </button>
            </div>
          </div>

          {/* Topology graphic screen */}
          <div className={`lg:col-span-4 p-6 border-r flex flex-col justify-between items-center text-center ${isDarkMode ? 'bg-[#0a0f18] border-slate-800' : 'bg-slate-100 border-slate-300'}`}>
            <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase w-full text-left ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              TOPOLOGIA E ROTAS
            </span>
            
            {/* Visual network routing diagram based on active problem */}
            <div className="w-full py-10 flex flex-col items-center justify-center relative">
              <div className="flex items-center justify-between w-full max-w-[300px] relative">
                {/* 1. Terminal PC */}
                <div className="flex flex-col items-center relative z-10 group">
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-lg ${
                    probFixed.dhcp 
                      ? (isDarkMode ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-emerald-100 border-emerald-400 text-emerald-600')
                      : activeProb === 'dhcp' ? (isDarkMode ? 'bg-yellow-900/40 border-yellow-500/50 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)] animate-pulse' : 'bg-yellow-100 border-yellow-400 text-yellow-600 animate-pulse') 
                      : (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-300 text-slate-400')
                  }`}>
                    <Laptop size={28} />
                  </div>
                  <span className={`text-[10px] font-mono mt-3 uppercase font-bold tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Estação PC</span>
                  <span className={`text-[9px] font-mono lowercase mt-0.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    {probFixed.dhcp ? "192.168.100.125" : activeProb === 'dhcp' ? "IP Inválido" : "192.168.1.15"}
                  </span>
                </div>

                {/* Connection cable link 1 */}
                <div className={`flex-1 h-[3px] relative overflow-hidden mx-3 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-300'}`}>
                  <div className={`absolute inset-y-0 left-0 w-full rounded-full transition-all duration-1000 ${
                    probFixed.dhcp 
                      ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' 
                      : activeProb === 'dhcp' ? 'bg-yellow-500 shadow-md animate-pulse' : (isDarkMode ? 'bg-emerald-500/30' : 'bg-emerald-400')
                  }`} />
                </div>

                {/* 2. Switch/Router */}
                <div className="flex flex-col items-center relative z-10 group">
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-lg ${
                    probFixed.dns || probFixed.firewall || probFixed.ram
                      ? (isDarkMode ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-emerald-100 border-emerald-400 text-emerald-600')
                      : ['dns', 'firewall', 'ram'].includes(activeProb) ? (isDarkMode ? 'bg-yellow-900/40 border-yellow-500/50 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)] animate-pulse' : 'bg-yellow-100 border-yellow-400 text-yellow-600 animate-pulse') 
                      : (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-300 text-slate-400')
                  }`}>
                    {activeProb === 'firewall' ? <ShieldCheck size={28} /> : <Server size={28} />}
                  </div>
                  <span className={`text-[10px] font-mono mt-3 uppercase font-bold tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Gateway</span>
                  <span className={`text-[9px] font-mono lowercase mt-0.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>192.168.100.1</span>
                </div>

                {/* Connection cable link 2 */}
                <div className={`flex-1 h-[3px] relative overflow-hidden mx-3 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-300'}`}>
                  <div className={`absolute inset-y-0 left-0 w-full rounded-full transition-all duration-1000 ${
                    probFixed.dns && probFixed.firewall
                      ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' 
                      : ['dns', 'firewall'].includes(activeProb) ? 'bg-yellow-500 animate-pulse' : (isDarkMode ? 'bg-emerald-500/30' : 'bg-emerald-400')
                  }`} />
                </div>

                {/* 3. Internet Cloud gateway */}
                <div className="flex flex-col items-center relative z-10 group">
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-lg ${
                    (['dns', 'firewall'].includes(activeProb) && !probFixed[activeProb as 'dns' | 'firewall']) || (activeProb === 'dhcp' && !probFixed.dhcp)
                      ? (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-600' : 'bg-white border-slate-300 text-slate-400')
                      : (isDarkMode ? 'bg-blue-900/30 border-blue-500/40 text-blue-400' : 'bg-blue-50 border-blue-300 text-blue-600')
                  }`}>
                    <Globe size={28} />
                  </div>
                  <span className={`text-[10px] font-mono mt-3 uppercase font-bold tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Internet WAN</span>
                  <span className={`text-[9px] font-mono mt-0.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>WAN LINK OK</span>
                </div>
              </div>

              {/* Extra monitor graphic for RAM Ticket */}
              {activeProb === 'ram' && (
                <div className={`w-full max-w-[280px] mt-8 border rounded-xl p-4 text-left shadow-md ${isDarkMode ? 'bg-[#161c24] border-white/5' : 'bg-white border-slate-200'}`}>
                  <div className="flex justify-between items-center mb-2 text-[10px] font-mono font-bold uppercase tracking-wider">
                    <span className={isDarkMode ? 'text-white/60' : 'text-slate-500'}>MÉTRICA DE CARGA DO LINK:</span>
                    <span className={probFixed.ram ? 'text-emerald-500' : 'text-red-500 animate-pulse'}>
                      {sysRamUsage}% RAM usado
                    </span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full overflow-hidden border ${isDarkMode ? 'bg-[#0d1116] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                    <motion.div 
                      initial={{ width: '98%' }} 
                      animate={{ width: `${sysRamUsage}%` }} 
                      transition={{ duration: 0.8 }}
                      className={`h-full ${probFixed.ram ? 'bg-emerald-500' : 'bg-red-500'}`} 
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={`text-left p-5 rounded-xl text-xs font-sans normal-case tracking-normal leading-relaxed border shadow-md w-full ${isDarkMode ? 'bg-[#141b25] text-white/70 border-white/5' : 'bg-white text-slate-700 border-slate-200'}`}>
              <span className={`block font-bold text-[10px] font-mono uppercase tracking-widest mb-2 ${isDarkMode ? 'text-emerald-400' : 'text-blue-600'}`}>Sintoma Registrado:</span>
              {activeProb === 'dhcp' && (
                <span>O computador de um colaborador perdeu acesso à rede local de arquivos e intranet corporativa, pois o DHCP Server falhou em enviar um Lease IP válido, assumindo um endereço APIPA (169.254.x.x).</span>
              )}
              {activeProb === 'dns' && (
                <span>A estação local comunica perfeitamente com o gateway da empresa (Ping estável), mas o navegador web está retornando erro NXDOMAIN para domínios, devido à tabela cache do roteador corrompida apontando para um provedor offline.</span>
              )}
              {activeProb === 'firewall' && (
                <span>Usuários da VLAN Operacional relatam erro de "Timeout" para sistemas bancários. O log aponta tráfego bloqueado na camada 3, uma regra mal executada de IPTABLES rejeitou pacotes HTTPS (TCP/443).</span>
              )}
              {activeProb === 'ram' && (
                <span>O servidor de autenticação LDAP remoto acionou alarme no Nagios/Zabbix por latência severa. Há um estouro crítico de processos-zumbi provenientes de um script mal sucedido engasgando o Kernel e inflando o Swap.</span>
              )}
            </div>
          </div>

          {/* NOC Diagnostics Console logs & actions */}
          <div className={`lg:col-span-4 p-6 flex flex-col justify-between ${isDarkMode ? 'bg-[#0b0f15]' : 'bg-slate-50'}`}>
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>AÇÃO OPERACIONAL</span>
                <span className={`text-[10px] px-2 py-1 rounded font-mono font-bold uppercase tracking-widest ${isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700'}`}>
                  SCORE: {score}
                </span>
              </div>
              
              {/* Action Button */}
              <div className="mt-4">
                {probFixed[activeProb] ? (
                  <div className={`p-4 border rounded-xl text-center shadow-md ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-300'}`}>
                    <span className={`font-mono text-[12px] font-bold block uppercase tracking-wider ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>✔️ INCIDENTE TRATADO</span>
                    <span className={`text-[11px] font-sans normal-case tracking-normal block mt-1 ${isDarkMode ? 'text-emerald-400/60' : 'text-emerald-700/70'}`}>Infraestrutura operando com estabilidade no setor.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Selecione o Comando de Correção:</label>
                    <div className="flex flex-col gap-2">
                      {getOptions(activeProb).map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => solveProblem(opt.cmd, opt.correct)}
                          disabled={isFixing}
                          className={`w-full text-left p-3 rounded-xl font-mono text-[10px] sm:text-[11px] border leading-snug transition-all cursor-pointer shadow-sm
                            ${isDarkMode 
                              ? 'bg-[#05080c] text-slate-300 border-white/5 hover:border-blue-500/50 hover:bg-blue-500/10' 
                              : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:bg-blue-50'}
                            ${isFixing ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                        >
                          <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`}>&gt;</span>
                          {opt.cmd}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Simulated Live SSH Terminal Logs */}
            <div className={`mt-8 border-t pt-5 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[9px] font-mono font-bold tracking-widest uppercase flex items-center gap-2 ${isDarkMode ? 'text-yellow-500' : 'text-slate-800'}`}>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                  Terminal SSH / Syslog
                </span>
                <span className={`text-[9px] font-mono font-bold ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>root@noc-sv01:~#</span>
              </div>
              <div className={`rounded-xl p-4 h-48 border overflow-y-auto font-mono text-[10px] space-y-2 select-text shadow-inner ${isDarkMode ? 'bg-black/60 border-white/5 text-blue-300/80 shadow-black' : 'bg-slate-900 border-slate-900 text-emerald-400 shadow-slate-900/50'}`}>
                {diagnosticLogs.map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap leading-relaxed font-medium break-words">
                    {log}
                  </div>
                ))}
                {isFixing && (
                  <div className="flex items-center gap-2 opacity-70">
                    <div className="w-1.5 h-3 bg-current animate-ping" />
                    <span>Processando execução do playbook...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LifeSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'timeline' | 'philosophy'>('stats');
  const [activeYear, setActiveYear] = useState<number>(2006);
  const [expandedStat, setExpandedStat] = useState<number | null>(null);

  const handleCopyValue = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  const timelineData = [
    {
      year: 2006,
      title: "O Despertar Tecnológico & Práticas Iniciais",
      desc: "Imersão inicial nos fundamentos técnicos da TI. Período voltado à montagem detalhada de computadores, depuração de hardware herdado e as primeiras experimentações práticas com redes locais de computadores, unindo o interesse científico ao prazer de compartilhar conhecimento técnico.",
      tags: ["Manutenção", "Hardware", "Redes Locais", "Arquitetura"]
    },
    {
      year: 2012,
      title: "Sistemas Corporativos, Servidores & Início Acadêmico",
      desc: "Instalação e administração de servidores Linux e Windows, estruturação de roteamento local e consolidação em automação de infraestruturas lógicas. Início das primeiras experiências de docência em ambientes de laboratório, moldando uma visão prática de ensino focada na autonomia do estudante.",
      tags: ["Linux Admin", "Servidores", "Infraestrutura TI", "Apoio Técnico"]
    },
    {
      year: 2018,
      title: "Consolidação de Metodologias Ativas & Robótica",
      desc: "Introdução estruturada de robótica educacional prática com microcontroladores e modelagem interativa de hardware e software em tempo real. Amplo desenvolvimento nos pilares do Pensamento Computacional, estimulando soluções estruturadas por meio de programação de sensores e atuadores.",
      tags: ["Robótica", "Algoritmos", "Metodologias Ativas", "Eletrônica"]
    },
    {
      year: 2021,
      title: "Docência de Ensino Superior & Novas Metodologias",
      desc: "Início estruturado na docência de programação de softwares, redes e bancos de dados lógicos. Desenvolvimento de trilhas didáticas e laboratórios práticos focados no compartilhamento do saber técnico e capacitação acelerada de novos talentos para o mercado.",
      tags: ["Docência", "Programação", "Bancos de Dados", "Metodologias"]
    },
    {
      year: 2026,
      title: "Inovação Educacional Continuada & UTFPR",
      desc: "Lecionando e projetando ambientes lúdicos e funcionais de aprendizado na UTFPR. Desenvolvimento de ferramentas e simuladores para simplificar conceitos abstratos complexos (como o simulador de NOC nesta própria aplicação!), promovendo o empoderamento técnico e acadêmico.",
      tags: ["UTFPR", "Desenvolvimento Full Stack", "Soluções Didáticas", "NOC Simulation"]
    }
  ];

  const valuePillars = [
    {
      icon: <Terminal size={22} />,
      title: "Instrução Prática (Hands-on)",
      desc: "Teoria sólida é vital, mas se solidifica quando o aluno interage com cenários concretos. Substituímos memorização passiva por soluções experimentais reais.",
      benefit: "Fortalece a segurança na tomada de decisões em ambientes de rede.",
      badge: "Suporte Prático"
    },
    {
      icon: <Brain size={22} />,
      title: "Autonomia do Estudante",
      desc: "Auxiliamos os alunos a formarem sua própria trilha de raciocínio investigativo, capacitando-os a diagnosticar falhas de rede ordinárias de modo autônomo e lógico.",
      benefit: "Desenvolve resiliência técnica e autossuficiência profissional.",
      badge: "Pensamento Crítico"
    },
    {
      icon: <Code2 size={22} />,
      title: "Pensamento Algorítmico",
      desc: "Abordagem que incentiva a decomposição de grandes problemas organizacionais em soluções fracionárias claras, sequenciais e escaláveis em qualquer framework.",
      benefit: "Acelera a resolução de litígios técnicos complexos de TI.",
      badge: "Metodologia"
    },
    {
      icon: <GraduationCap size={22} />,
      title: "Docência Centrada no Ser Humano",
      desc: "Foco integral no acolhimento do aluno. Entendemos as dificuldades individuais e adaptamos as interfaces teóricas para garantir que ninguém seja deixado para trás.",
      benefit: "Garante inclusão técnico-acadêmica com empatia pedagógica.",
      badge: "Educação Humana"
    }
  ];

  const statMetrics = [
    {
      value: "15+ Anos",
      label: "Jornada na Educação & TI",
      info: "Unindo conhecimento prático de sistemas com didática acadêmica ativa inovadora desde 2006.",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      activeColor: "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)] bg-blue-500/5",
      points: ["10.000+ horas de docência", "Certificações Redhat/Cisco", "Evolução contínua"],
      progress: 95
    },
    {
      value: "+3.000",
      label: "Alunos Formados & Impactados",
      info: "Capacitados em conceitos de infraestrutura de rede de computadores, hardware avançado e desenvolvimento.",
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      activeColor: "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] bg-emerald-500/5",
      points: ["Engenharia de Software", "Sistemas de Informação", "Egressos no Mercado Top 10"],
      progress: 88
    },
    {
      value: "+500",
      label: "Lab. Práticos e Simuladores",
      info: "Desafios metodológicos criados para incentivar a depuração ativa de código e redes por experimentação.",
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      activeColor: "border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)] bg-orange-500/5",
      points: ["Troubleshooting em tempo real", "Ambientes Docker/K8s", "Robótica Aplicada ESP32"],
      progress: 92
    },
    {
      value: "100%",
      label: "Comprometimento Empático",
      info: "Prática humanizada que cultiva o pensamento independente, focado no sucesso de cada estudante.",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      activeColor: "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)] bg-purple-500/5",
      points: ["Apoio psico-pedagógico", "Mentoria ativa individual", "Desenvolvimento interpessoal"],
      progress: 100
    }
  ];

  const currentYearData = timelineData.find(d => d.year === activeYear) || timelineData[0];

  return (
    <div className="flex flex-col pt-6 md:pt-16 pb-12 max-w-6xl w-full mx-auto">
      {/* Introduction Card with Photo & Quick Actions */}
      <div className={`rounded-3xl border p-6 md:p-8 mb-10 shadow-xl relative overflow-hidden transition-all ${
        isDarkMode ? 'bg-[#0f141a]/90 border-white/5' : 'bg-white border-black/10'
      }`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Picture on the left */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-center">
            <div className="relative group">
              {/* Animated decorative ring */}
              <div className="absolute inset-x-0 -inset-y-2 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              
              <div className={`relative w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] ${
                isDarkMode ? 'border-white/10 bg-[#161c24]' : 'border-slate-200 bg-slate-50'
              }`}>
                <img
                  src="https://lucasleniar.com.br/lucas.png"
                  alt="Lucas Mercer Leniar - Professor de Programação e Engenheiro de Software"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Floating identity pill */}
                <div className="absolute inset-x-0 bottom-0 py-3 bg-gradient-to-t from-black/95 to-black/20 text-center">
                  <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase leading-none block">
                    PROFESSOR & ENGENHEIRO DE SOFTWARE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text/Bio block on the right */}
          <div className="col-span-1 md:col-span-8 flex flex-col justify-center space-y-4">
            <div className="space-y-1 text-center md:text-left">
              <span className={`text-[10px] font-mono tracking-widest uppercase font-bold px-3 py-1 rounded-full border ${
                isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-500/5 text-emerald-700 border-emerald-500/15'
              }`}>
                Nossa Missão Pedagógica
              </span>
              <h2 className={`text-2xl md:text-4xl font-extrabold tracking-tight mt-2 italic font-serif ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Minha História
              </h2>
            </div>

            <div className={`space-y-4 text-xs md:text-sm font-sans normal-case tracking-normal leading-relaxed text-justify md:text-left ${
              isDarkMode ? 'text-white/70' : 'text-slate-600'
            }`}>
              <p>
                Professor apaixonado e dedicado à forte interposição entre a tecnologia industrial avançada e o aprendizado moderno de sistemas escolares. Com mais de 15 anos de imersão corporativa e acadêmica contínua no setor de TI, o <strong>Professor Lucas Mercer Leniar</strong> atua como um educador focado em desmistificar os quatro pilares do pensamento computacional.
              </p>
              <p>
                Sua abordagem integra o Pensamento Computacional de forma descomplicada, transformando termos complexos em metodologias práticas e instigantes. Lucas acredita firmemente que o desenvolvimento do raciocínio estruturado é o pilar central: capacitar o estudante a decompor problemas complexos, identificar padrões lógicos, focar no essencial por meio da abstração e formular algoritmos precisos é torná-lo autor de sua própria autonomia intelectual e técnica.
              </p>
            </div>

            {/* Quick connectivity section directly below text */}
            <div className="pt-4 border-t border-dashed border-black/5 dark:border-white/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { icon: <Mail size={14} />, label: "Email", value: "lucasleniar@gmail.com", canCopy: true },
                  { icon: <MapPin size={14} />, label: "Localidade", value: "Paraná - Brasil", canCopy: false },
                  { icon: <Terminal size={14} />, label: "Técnico", value: "Desde 2006", canCopy: false },
                  { icon: <Calendar size={14} />, label: "Docência", value: "Desde 2021", canCopy: false },
                  { icon: <Coffee size={14} />, label: "Interesses", value: "Redes, Tech & IA", canCopy: false },
                ].map((item, i) => (
                  item.canCopy ? (
                    <button
                      key={i}
                      onClick={() => handleCopyValue(item.value, item.label)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all relative group cursor-pointer ${
                        isDarkMode 
                          ? 'bg-[#151c24]/50 border-white/5 hover:bg-white/[0.04]' 
                          : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-md'
                      }`}
                      title="Clique para copiar os metadados"
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        isDarkMode ? 'bg-[#1e2733] text-emerald-400' : 'bg-slate-200/50 text-emerald-700'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0 pr-4">
                        <p className={`text-[8.5px] uppercase tracking-wider font-bold leading-none font-mono ${
                          isDarkMode ? 'text-white/40' : 'text-slate-400'
                        }`}>
                          {item.label}
                        </p>
                        <p className={`text-[11px] font-semibold truncate leading-tight ${
                          isDarkMode ? 'text-white/85' : 'text-slate-700'
                        }`}>
                          {copiedLabel === item.label ? 'Copiado!' : item.value}
                        </p>
                      </div>
                      
                      <div className="absolute right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[8px] font-mono text-emerald-500 uppercase font-black">Copiar</span>
                      </div>
                    </button>
                  ) : (
                    <div
                      key={i}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                        isDarkMode 
                          ? 'bg-[#151c24]/30 border-white/5 text-white/80' 
                          : 'bg-slate-50/80 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        isDarkMode ? 'bg-[#1e2733] text-emerald-400' : 'bg-slate-200/50 text-emerald-700'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[8.5px] uppercase tracking-wider font-bold leading-none font-mono ${
                          isDarkMode ? 'text-white/40' : 'text-slate-400'
                        }`}>
                          {item.label}
                        </p>
                        <p className={`text-[11px] font-semibold truncate leading-tight ${
                          isDarkMode ? 'text-white/85' : 'text-slate-700'
                        }`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Menu */}
      <div className="flex justify-center mb-8">
        <div className={`p-1 rounded-2xl border flex gap-1 ${
          isDarkMode ? 'bg-[#0f141a] border-white/5' : 'bg-slate-100 border-black/5'
        }`}>
          {[
            { id: 'stats', label: 'Métricas de Impacto', icon: <Award size={14} /> },
            { id: 'timeline', label: 'Linha do Tempo', icon: <Calendar size={14} /> },
            { id: 'philosophy', label: 'Didática de Ensino', icon: <Brain size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'stats' | 'timeline' | 'philosophy')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-mono text-[10.5px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? isDarkMode 
                    ? 'bg-emerald-500/10 border-0 text-emerald-400 shadow-lg' 
                    : 'bg-white border text-emerald-700 border-slate-200 shadow-md'
                  : 'text-slate-400 hover:text-slate-100 bg-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Tabs Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {/* TAB 1: INTERACTIVE TIMELINE */}
          {activeTab === 'timeline' && (
            <div className={`rounded-3xl border p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-lg ${
              isDarkMode ? 'bg-[#0f141a]/90 border-white/5' : 'bg-slate-50 border-black/10'
            }`}>
              
              {/* Year Selection sidebar (col-span-4) */}
              <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 pr-1 border-b lg:border-b-0 lg:border-r border-dashed border-black/10 dark:border-white/5">
                <span className={`text-[9px] font-mono font-bold tracking-[0.2em] uppercase block mb-2 w-full text-left hidden lg:block ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  Fases da Carreira
                </span>
                
                {timelineData.map((data) => (
                  <button
                    key={data.year}
                    onClick={() => setActiveYear(data.year)}
                    className={`w-full p-3.5 rounded-xl text-left transition-all border shrink-0 flex items-center justify-between cursor-pointer ${
                      activeYear === data.year
                        ? 'bg-blue-500/10 border-blue-500/40 text-blue-400 shadow-sm'
                        : isDarkMode
                          ? 'border-transparent text-white/50 hover:bg-white/[0.02]'
                          : 'border-transparent text-slate-500 hover:bg-black/[0.01]'
                    }`}
                    style={{ minWidth: '160px' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono font-black text-xs px-2 py-0.5 rounded ${
                        activeYear === data.year 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : isDarkMode ? 'bg-white/5' : 'bg-slate-200'
                      }`}>
                        {data.year === 2026 ? 'Hoje' : data.year}
                      </span>
                      <span className="text-[11.5px] font-sans font-bold leading-none hidden sm:inline-block">
                        {data.year === 2006 ? 'Despertar' : data.year === 2012 ? 'Servidores' : data.year === 2018 ? 'Robótica' : data.year === 2021 ? 'Docência' : 'UTFPR'}
                      </span>
                    </div>
                    <ChevronRight size={14} className={`opacity-60 transition-transform ${activeYear === data.year ? 'translate-x-1 text-blue-400' : ''}`} />
                  </button>
                ))}
              </div>

              {/* Explanatory Milestone detail container (col-span-8) */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">MARCO DA INFRAESTRUTURA</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${
                      isDarkMode ? 'bg-[#151c24] text-emerald-400' : 'bg-slate-200 text-emerald-700'
                    }`}>
                      Anos Ativos
                    </span>
                  </div>
                  
                  <h4 className={`text-xl md:text-2xl font-bold font-serif italic mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {currentYearData.title}
                  </h4>
                  
                  <p className={`text-xs md:text-sm font-sans normal-case tracking-normal leading-relaxed text-justify ${
                    isDarkMode ? 'text-white/65' : 'text-slate-600'
                  }`}>
                    {currentYearData.desc}
                  </p>
                </div>

                {/* Sub Tags / Skills mapped */}
                <div>
                  <span className={`block text-[8.5px] font-mono font-bold uppercase tracking-widest mb-2.5 ${
                    isDarkMode ? 'text-white/30' : 'text-slate-400'
                  }`}>
                    Especializações Cultivadas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentYearData.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] font-mono font-semibold px-2.5 py-1 rounded-lg border transition-all hover:scale-105 ${
                          isDarkMode 
                            ? 'bg-[#11161b] border-white/5 text-emerald-300' 
                            : 'bg-white border-slate-200 text-emerald-700 shadow-sm'
                        }`}
                      >
                        ⚡ {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: DIDACTIC VALUE PILLARS */}
          {activeTab === 'philosophy' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {valuePillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-3xl border p-6 flex flex-col justify-between transition-all group hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-[#0f141a]/90 border-white/5 hover:border-emerald-500/20 hover:bg-[#121922]' 
                      : 'bg-white border-black/10 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className={`p-3 rounded-2xl transition-all group-hover:scale-110 ${
                        isDarkMode ? 'bg-[#161c24] text-emerald-400 border border-white/5' : 'bg-slate-100 text-emerald-700 border border-slate-200'
                      }`}>
                        {pillar.icon}
                      </div>
                      <span className={`text-[8.5px] font-mono font-bold uppercase py-1 px-2.5 rounded-full ${
                        isDarkMode ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {pillar.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className={`text-base md:text-lg font-bold font-serif italic ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>
                        {pillar.title}
                      </h4>
                      <p className={`text-xs md:text-sm font-sans normal-case tracking-normal leading-relaxed ${
                        isDarkMode ? 'text-white/65' : 'text-slate-650'
                      }`}>
                        {pillar.desc}
                      </p>
                    </div>
                  </div>

                  <div className={`mt-4 pt-3.5 border-t text-[10.5px] font-medium leading-relaxed border-black/5 dark:border-white/5 flex gap-1.5 items-start ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-700 font-semibold'
                  }`}>
                    <span className="font-bold text-[10px] font-mono">Benefício:</span>
                    <span className="italic">{pillar.benefit}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* TAB 3: STATISTICS & INTERACTIVE DATA GRID */}
          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {statMetrics.map((stat, i) => {
                const isExpanded = expandedStat === i;
                return (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setExpandedStat(isExpanded ? null : i)}
                    className={`rounded-3xl border p-6 flex flex-col justify-start transition-all cursor-pointer overflow-hidden ${
                      isExpanded 
                        ? (isDarkMode ? stat.activeColor : 'bg-white border-none shadow-xl ring-2 ring-emerald-500/20')
                        : (isDarkMode ? 'bg-[#0f141a]/90 border-white/5 hover:border-emerald-500/30' : 'bg-white border-black/10 hover:shadow-lg hover:border-emerald-500/30')
                    }`}
                  >
                    <motion.div layout className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={`inline-block py-1 px-3 text-[9px] font-mono font-bold rounded-lg uppercase tracking-wider ${stat.color}`}>
                          {isExpanded ? 'DETALHES' : 'MÉTRICA ATIVA'}
                        </span>
                        <ChevronRight size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90 text-emerald-500' : 'text-slate-400'}`} />
                      </div>
                      <span className={`block text-3xl md:text-4xl font-extrabold tracking-tight font-serif italic ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {stat.value}
                      </span>
                      <h5 className={`font-mono text-[10.5px] uppercase tracking-wider font-extrabold ${
                        isDarkMode ? 'text-white/40' : 'text-slate-500'
                      }`}>
                        {stat.label}
                      </h5>
                    </motion.div>
                    
                    <motion.div layout>
                      <p className={`text-[11px] font-sans normal-case tracking-normal leading-relaxed mt-4 pt-4 border-t border-black/5 dark:border-white/5 ${
                        isDarkMode ? 'text-white/50' : 'text-slate-500'
                      }`}>
                        {stat.info}
                      </p>
                    </motion.div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="flex flex-col gap-4 overflow-hidden"
                        >
                          <div className="space-y-2 mt-2 pt-4 border-t border-dashed border-black/10 dark:border-white/10">
                            {stat.points.map((point, idx) => (
                              <div key={idx} className="flex gap-2 items-center text-[10px] sm:text-[11px]">
                                <div className={`w-1 h-1 rounded-full ${stat.color.split(' ')[0]}`} />
                                <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{point}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="w-full h-1.5 mt-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.progress}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className={`h-full ${stat.color.split(' ')[0]}`}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const IFrameSection = ({ 
  url, 
  title, 
  isMaximized, 
  onToggleMaximize,
  isDarkMode
}: { 
  url: string; 
  title: string; 
  isMaximized?: boolean; 
  onToggleMaximize?: () => void; 
  isDarkMode: boolean;
}) => (
  <div className={`w-full flex-1 flex flex-col min-h-0 relative ${
    isMaximized ? 'h-full' : ''
  }`}>
    {isMaximized ? (
      <>
        {onToggleMaximize && (
          <button
            onClick={onToggleMaximize}
            className="absolute top-4 right-4 z-50 p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-all duration-250 shadow-2xl border border-emerald-400/20 cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center"
            title="Restaurar Layout"
          >
            <Minimize2 size={16} />
          </button>
        )}
        <div className="w-full h-full bg-white overflow-hidden relative">
          <iframe 
            src={url} 
            className="w-full h-full border-0 m-0 p-0" 
            title={title}
            referrerPolicy="no-referrer"
          />
        </div>
      </>
    ) : (
      <>
        <div className="flex items-center justify-between px-1 mb-3 shrink-0">
          <h2 className={`font-bold tracking-tight italic font-serif leading-none text-xl md:text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>{title}</h2>
          <div className="flex gap-2">
            {onToggleMaximize && (
              <button
                onClick={onToggleMaximize}
                className="uppercase tracking-widest font-mono font-bold text-emerald-600 hover:text-emerald-500 flex items-center gap-1.5 transition-all bg-emerald-500/10 rounded-full border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/20 text-[9.5px] px-3 py-1.2"
              >
                Maximizar <Maximize2 size={11} />
              </button>
            )}
          </div>
        </div>
        <div className={`flex-1 w-full bg-white rounded-2xl border overflow-hidden shadow-2xl relative min-h-0 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
          <iframe 
            src={url} 
            className="w-full h-full border-0" 
            title={title}
            referrerPolicy="no-referrer"
          />
        </div>
      </>
    )}
  </div>
);

const ShellFilesSection = ({ 
  isMaximized, 
  onToggleMaximize,
  isDarkMode
}: { 
  isMaximized?: boolean; 
  onToggleMaximize?: () => void; 
  isDarkMode: boolean;
}) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Terminal Simulator State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to Lucas Leniar Dev Shell (LL-SH) v2.5.1',
    'Copyright (c) 2026 Lucas Leniar. Todos os direitos reservados.',
    'Status: ACESSO AUTORIZADO // MODO SANDBOX ATIVO',
    'Digite "help" para listar as ferramentas disponíveis.',
    ''
  ]);

  const SH_FILES = [
    { name: 'civico.sh', url: 'https://lucasleniar.com.br/mint/civico.sh', description: 'Script para configuração do Civico no Mint' },
    { name: 'wallpaper.sh', url: 'https://lucasleniar.com.br/mint/wallpaper.sh', description: 'Script para gerenciar wallpapers customizados' },
    { name: 'update.sh', url: 'https://lucasleniar.com.br/mint/update.sh', description: 'Script para atualização completa do sistema' },
    { name: 'install.sh', url: 'https://lucasleniar.com.br/mint/install.sh', description: 'Script de instalação de pacotes essenciais' },
    { name: 'cleanup.sh', url: 'https://lucasleniar.com.br/mint/cleanup.sh', description: 'Script para limpeza de cache e arquivos temporários' },
    { name: 'backup.sh', url: 'https://lucasleniar.com.br/mint/backup.sh', description: 'Rotina de backup automatizada' },
    { name: 'setup.sh', url: 'https://lucasleniar.com.br/mint/setup.sh', description: 'Configuração inicial do ambiente de desenvolvimento' },
    { name: 'docker.sh', url: 'https://lucasleniar.com.br/mint/docker.sh', description: 'Configuração e instalação do Docker e ferramentas' },
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

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const parts = cmd.split(' ');
    const commandName = parts[0];
    const arg = parts[1];

    let response: string[] = [];

    switch (commandName) {
      case 'help':
        response = [
          'Comandos Disponíveis:',
          '  ls               Listar scripts automação disponíveis',
          '  cat <arquivo>    Ver código-fonte do script (Ex: cat civico.sh)',
          '  run <arquivo>    Simular execução do script Bash',
          '  whoami           Informações sobre o perfil do Professor Lucas',
          '  neofetch         Especificações e hardware virtual deste sistema',
          '  clear            Limpar a tela do terminal console'
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'ls':
        response = [
          'civico.sh       wallpaper.sh'
        ];
        break;
      case 'whoami':
        response = [
          'Lucas Mercer Leniar - Professor de Programação, Técnico em Redes e Sistemas.',
          'Formando campeões e pensadores computacionais através da tecnologia aplicada.'
        ];
        break;
      case 'neofetch':
        response = [
          ' __                      OS: LucasLeniar-Education Mint v4.2',
          '|  |    _   _  ___ __    Host: UTFPR Hardware Labs Project',
          '|  |   | | | |/ (__ (_|  Kernel: 6.12.0-pro-leniar-lts',
          '|  |___| |_| | (__  _ _  Uptime: Since epoch 2006',
          '|_____|\\__,_|\\___|(_(_|  Shell: LL-SH (Leniar Interactive Hub)',
          '                         CPU: Brain-Core System Architecture @ 5.0 GHz',
          '                         Memory: 16GB / Infinite Curiosity'
        ];
        break;
      case 'cat':
        if (!arg) {
          response = ['Erro: Especifique o arquivo (Ex: cat civico.sh)'];
        } else if (arg === 'civico.sh') {
          response = [
            '#!/bin/bash',
            '# Script de Instalação e Configuração Cívico',
            '# Autor: Professor Lucas Leniar',
            'echo "=> Iniciando configuração do Civico..."',
            'sudo apt-get update && sudo apt-get upgrade -y',
            'sudo apt-get install -y libssl-dev build-essential',
            'echo "=> Finalizado!"'
          ];
        } else if (arg === 'wallpaper.sh') {
          response = [
            '#!/bin/bash',
            '# Script de Customização de Wallpapers e Assets',
            '# Autor: Professor Lucas Leniar',
            'echo "=> Coletando wallpapers oficiais de lucasleniar.com.br..."',
            'mkdir -p ~/.local/share/backgrounds/lucas/',
            'wget -P ~/.local/share/backgrounds/lucas/ https://lucasleniar.com.br/mint/wallpaper.png',
            'echo "=> Configurando plano de fundo..."'
          ];
        } else {
          response = [`Erro: Arquivo "${arg}" não encontrado. Use o comando 'ls'`];
        }
        break;
      case 'run':
        if (!arg) {
          response = ['Erro: Especifique o arquivo (Ex: run civico.sh)'];
        } else if (arg === 'civico.sh') {
          response = [
            '[LL-SH] Executando ./civico.sh ...',
            '[INFO] Atualizando cache de repositórios Apt...',
            '[INFO] Baixando dependências cívicas obrigatórias...',
            '[SUCCESS] Instalação concluída com sucesso!'
          ];
        } else if (arg === 'wallpaper.sh') {
          response = [
            '[LL-SH] Executando ./wallpaper.sh ...',
            '[INFO] Analisando hardware de display Cinnamon...',
            '[INFO] Copiando arquivos para ~/.local/share/backgrounds/lucas/...',
            '[SUCCESS] Nova identidade visual aplicada com sucesso!'
          ];
        } else {
          response = [`Erro: Script "${arg}" não encontrado.`];
        }
        break;
      default:
        response = [`Comando não reconhecido: "${commandName}". Digite "help" para ajuda.`];
    }

    setTerminalHistory(prev => [
      ...prev,
      `lucas@portfolio-sh:~$ ${terminalInput}`,
      ...response,
      ''
    ]);
    setTerminalInput('');
  };

  if (!isAuthorized) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full rounded-xl border border-[#2d3748] bg-[#0a0e11] shadow-2xl overflow-hidden font-mono"
        >
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#11161b]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[11px] text-white/40 tracking-widest flex items-center gap-2 max-w-[200px] truncate">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>root@lucasleniar:~</span>
            </div>
          </div>
          
          <div className="p-6 md:p-10 space-y-6">
            <div className="space-y-1.5 text-sm md:text-base text-emerald-400">
              <p>LL-SH (Lucas Leniar Secure Shell) v2.5.1</p>
              <p>Warning: Restricted Authorization Area.</p>
              <p className="text-white/60 pt-4 pb-2">Please authenticate to decrypt repository.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-emerald-500 font-bold">Password:</span>
                <input 
                  type="password" 
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-emerald-300 font-mono text-lg placeholder-emerald-900/50"
                  placeholder="type password..."
                />
              </div>
              
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 font-mono text-sm"
                >
                  Action denied: {error}
                </motion.p>
              )}
              {/* Invisible submit to allow enter to work */}
              <button type="submit" className="hidden" />
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col ${isMaximized ? 'pt-2' : 'pt-4 md:pt-3'}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl w-full">
         <div className={`flex items-center justify-between px-1 ${isMaximized ? 'mb-4' : 'mb-6 md:mb-8'}`}>
            <div>
              <h2 className={`font-bold tracking-tight italic font-serif leading-none mb-1 md:mb-2 ${isMaximized ? 'text-xl md:text-2xl' : 'text-2xl md:text-4xl'} ${isDarkMode ? 'text-white' : 'text-black'}`}>Arquivos SH</h2>
              <p className={`uppercase text-[9px] tracking-[0.2em] font-mono font-bold ${isDarkMode ? 'text-emerald-400' : 'text-black/30'}`}>Repositório privado de automação e scripts Bash.</p>
            </div>
            <div className="flex gap-2">
              {onToggleMaximize && (
                <button
                  onClick={onToggleMaximize}
                  className={`uppercase tracking-widest font-mono font-bold text-emerald-600 hover:text-emerald-500 flex items-center gap-1.5 transition-all bg-emerald-500/10 rounded-full border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/20 ${
                    isMaximized ? 'text-[9px] px-2.5 py-1' : 'text-[9.5px] px-3 py-1.2'
                  }`}
                >
                  {isMaximized ? (
                    <>
                      Restaurar Layout <Minimize2 size={11} />
                    </>
                  ) : (
                    <>
                      Maximizar <Maximize2 size={11} />
                    </>
                  )}
                </button>
              )}
              <button 
                onClick={() => setIsAuthorized(false)}
                className={`border rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer ${
                  isDarkMode 
                  ? 'border-white/10 text-white hover:bg-white hover:text-black' 
                  : 'border-black/10 text-black hover:bg-black hover:text-white'
                } ${
                  isMaximized ? 'px-3 py-1.5 text-[9px]' : 'px-4 py-2'
                }`}
              >
                Sair
              </button>
            </div>
         </div>

         {/* SH SCRIPT CARDS ROW */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {SH_FILES.map((file, i) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 md:p-5 rounded-2xl border shadow-sm hover:shadow-xl transition-all group relative overflow-hidden flex flex-col ${
                  isDarkMode ? 'bg-[#11161b] border-white/5 shadow-black/40' : 'bg-white border-black/[0.05]'
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <Terminal size={48} />
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="mb-4 flex items-center justify-between">
                     <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-600">
                        <FileCode size={20} />
                     </div>
                     <span className={`text-[9px] font-mono font-bold uppercase transition-colors ${isDarkMode ? 'text-white/20' : 'text-black/20'}`}>.sh</span>
                  </div>
                  
                  <h3 className={`text-base font-bold mb-1 tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>{file.name}</h3>
                  <p className={`text-[11px] mb-4 font-sans normal-case leading-relaxed flex-1 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{file.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="space-y-1.5">
                      <label className={`text-[8.5px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-emerald-400/60' : 'text-black/30'}`}>Download</label>
                      <div className="relative group/copy">
                        <code className={`block w-full p-2.5 border rounded-lg text-[9px] font-mono break-all pr-10 ${
                          isDarkMode ? 'bg-black/50 border-white/5 text-emerald-400' : 'bg-black/[0.03] border-black/5 text-emerald-700'
                        }`}>
                          wget {file.url.replace('https://', '')}
                        </code>
                        <button 
                          onClick={() => handleCopy(`wget ${file.url.replace('https://', '')}`, file.name + '-download')}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-colors ${
                            isDarkMode ? 'text-white/20 hover:text-emerald-400' : 'text-black/20 hover:text-emerald-600'
                          }`}
                        >
                          {copiedId === file.name + '-download' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border ${
                      isDarkMode ? 'bg-emerald-950/20 border-emerald-900/45 text-emerald-300' : 'bg-emerald-50 border-emerald-100 text-emerald-800'
                    }`}>
                      <p className="text-[9px] leading-relaxed mb-1.5 normal-case font-sans tracking-normal">
                        Use o usuário <span className="font-bold underline">root</span>:
                      </p>
                      <div className="relative group/exec">
                        <code className={`block font-mono font-bold p-2.5 rounded-lg pr-8 text-[10px] ${
                          isDarkMode ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-900/10 text-emerald-900'
                        }`}>
                          sudo bash {file.name}
                        </code>
                        <button 
                          onClick={() => handleCopy(`sudo bash ${file.name}`, file.name + '-exec')}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-colors ${
                            isDarkMode ? 'text-emerald-300/30 hover:text-emerald-300' : 'text-emerald-800/30 hover:text-emerald-900'
                          }`}
                        >
                          {copiedId === file.name + '-exec' ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-dashed border-emerald-500/10">
                      <div className="flex items-center justify-between">
                        <label className={`text-[8.5px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-emerald-400/80' : 'text-emerald-700/80'}`}>💡 Execução Direta</label>
                      </div>
                      <div className="relative group/direct">
                        <code className={`block w-full p-2.5 border rounded-lg text-[9px] font-mono break-all pr-10 ${
                          isDarkMode ? 'bg-black/60 border-emerald-500/15 text-emerald-300' : 'bg-emerald-50/40 border-emerald-500/10 text-emerald-850'
                        }`}>
                          wget -qO- {file.url.replace('https://', '')} | sudo bash
                        </code>
                        <button 
                          onClick={() => handleCopy(`wget -qO- ${file.url.replace('https://', '')} | sudo bash`, file.name + '-direct')}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-colors ${
                            isDarkMode ? 'text-white/20 hover:text-emerald-450' : 'text-black/20 hover:text-emerald-600'
                          }`}
                        >
                          {copiedId === file.name + '-direct' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    <a 
                      href={file.url}
                      download={file.name}
                      className={`flex-1 text-center py-2.5 text-[9px] font-bold rounded-lg hover:bg-emerald-600 transition-all uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer ${
                        isDarkMode ? 'bg-emerald-600/20 hover:bg-emerald-600 text-white' : 'bg-black text-white'
                      }`}
                    >
                       Baixar Script <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
         </div>

         {/* REPOSITIONED TERMINAL EMULATOR BLOCK - UNDERneath & compacted */}
         <div className="mb-12 rounded-xl border border-[#2d3748] bg-[#0c1015] shadow-2xl p-5 md:p-6 relative group overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] tracking-widest font-mono text-white/40 ml-4 hidden md:block">lucas@portfolio-sh:~ (Simulador)</span>
              </div>
              <Terminal size={14} className="text-emerald-500/50" />
            </div>

            <div 
              className="h-64 md:h-80 overflow-y-auto font-mono text-sm text-emerald-100/90 space-y-1 mb-4 pr-2 selection:bg-emerald-500/30 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent custom-scroll"
              ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }}
            >
              {terminalHistory.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed hover:bg-white/[0.04] px-1 py-0.5 rounded transition-colors break-all">
                  {line.startsWith('lucas@portfolio-sh:~$') ? (
                    <span><span className="text-emerald-400 font-bold">lucas@portfolio-sh:~$</span> {line.replace('lucas@portfolio-sh:~$ ', '')}</span>
                  ) : line.startsWith('Erro:') ? (
                    <span className="text-red-400">{line}</span>
                  ) : line.startsWith('[SUCCESS]') ? (
                    <span className="text-emerald-300 font-bold">{line}</span>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-white/10 pt-4 mt-2">
              <span className="text-sm font-mono text-emerald-400 font-bold select-none shrink-0">lucas@portfolio-sh:~$</span>
              <input
                type="text"
                autoComplete="off"
                spellCheck="false"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Ex: help, whoami, run civico.sh..."
                className="flex-1 bg-transparent border-0 font-mono text-sm text-emerald-100 focus:outline-none focus:ring-0 p-0 placeholder-emerald-100/20 caret-emerald-400"
              />
              <span className="animate-pulse w-2 h-4 bg-emerald-400 inline-block shrink-0" />
            </form>
         </div>
      </motion.div>
    </div>
  );
};

const hashToSectionId = (hash: string): SectionId => {
  const cleanHash = hash.replace(/^#\/?/, '').toLowerCase().trim();
  
  switch (cleanHash) {
    case 'home':
    case 'inicio':
    case 'início':
    case '':
      return 'home';
    case 'life':
    case 'sobre':
    case 'sobre-lucas':
    case 'lucas':
      return 'life';
    case 'computational':
    case 'computacional':
    case 'pensamento':
    case 'pensamento-computacional':
      return 'computational';
    case 'robotica':
    case 'robotics':
    case 'bot':
      return 'robotics';
    case 'tech':
    case 'ti':
    case 'tecnico':
    case 'técnico':
      return 'tech';
    case 'utfpr':
      return 'utfpr';
    case 'certificados':
    case 'certificado':
      return 'certificados';
    case 'horarios':
    case 'horario':
      return 'horarios';
    case 'scripts':
    case 'arquivos':
    case 'arquivos-sh':
      return 'scripts';
    default:
      return 'home';
  }
};

const sectionIdToHash = (section: SectionId): string => {
  switch (section) {
    case 'home':
      return '#/home';
    case 'life':
      return '#/sobre';
    case 'computational':
      return '#/computacional';
    case 'robotics':
      return '#/robotica';
    case 'tech':
      return '#/ti';
    case 'utfpr':
      return '#/utfpr';
    case 'certificados':
      return '#/certificados';
    case 'horarios':
      return '#/horarios';
    case 'scripts':
      return '#/scripts';
    default:
      return '#/home';
  }
};

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    return typeof window !== 'undefined' ? hashToSectionId(window.location.hash) : 'home';
  });
  const [isMaximized, setIsMaximized] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isIFrameSection = ['utfpr', 'certificados', 'horarios'].includes(activeSection);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('lucas-leniar-theme');
    return saved ? saved === 'true' : false;
  });

  useEffect(() => {
    localStorage.setItem('lucas-leniar-theme', String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const targetSection = hashToSectionId(window.location.hash);
      setActiveSection(targetSection);
      setIsMaximized(false);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Ensure that if the hash is empty, we update it to reflect the active section,
    // or if a hash is already present, we sync it.
    if (!window.location.hash) {
      window.location.hash = sectionIdToHash(activeSection);
    } else {
      handleHashChange();
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleSectionChange = (section: SectionId) => {
    window.location.hash = sectionIdToHash(section);
    setIsMaximized(false);
  };

  const mainRef = useRef<HTMLElement>(null);
  


  return (
    <div className={`flex flex-col md:flex-row h-screen w-full font-sans overflow-hidden transition-colors duration-300 selection:bg-emerald-500/20 selection:text-emerald-600 ${
      isDarkMode ? 'bg-[#0a0f12] text-slate-100' : 'bg-white text-[#1a1a1a]'
    }`}>
      {/* Mobile Header Bar */}
      {!isMaximized && (
        <div className={`md:hidden flex items-center justify-between px-5 py-4 border-b shrink-0 z-30 transition-colors duration-300 ${
          isDarkMode ? 'bg-[#0f151a] border-white/5 text-white' : 'bg-[#fcfcfc] border-black/5 text-black'
        }`}>
          <div>
            <h1 className={`text-md font-bold tracking-tighter ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>LUCAS LENIAR</h1>
            <p className={`text-[8px] uppercase tracking-[0.15em] font-mono leading-none ${isDarkMode ? 'text-emerald-400/40' : 'text-black/40'}`}>Systems Architect & Educator</p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`p-2.5 rounded-lg cursor-pointer transition-colors ${
              isDarkMode ? 'hover:bg-white/5 text-emerald-400' : 'hover:bg-black/5 text-emerald-650'
            }`}
            title="Abrir Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      )}

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && !isMaximized && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Drawer container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className={`fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] z-50 flex flex-col py-6 shadow-2xl md:hidden ${
                isDarkMode ? 'bg-[#0a0f12] border-r border-white/5 text-slate-100' : 'bg-white border-r border-black/5 text-[#1a1a1a]'
              }`}
            >
              <div className="px-6 mb-8 flex items-center justify-between">
                <div>
                  <h1 className={`text-lg font-bold tracking-tighter ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>LUCAS LENIAR</h1>
                  <p className={`text-[9px] uppercase tracking-[0.15em] font-mono ${isDarkMode ? 'text-emerald-400/40' : 'text-black/40'}`}>Systems Architect & Educator</p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${
                    isDarkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-black/5 text-black/60'
                  }`}
                  title="Fechar Menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 space-y-1.5 px-3 overflow-y-auto">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      handleSectionChange(section.id);
                      setIsMobileMenuOpen(false);
                    }}
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                    aria-label={`Menu: ir para seção ${section.label}`}
                    className={`w-full cursor-pointer flex items-center justify-start gap-4 px-3.5 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                      activeSection === section.id 
                        ? isDarkMode 
                          ? 'bg-emerald-500/10 text-emerald-400 font-semibold' 
                          : 'bg-emerald-500/10 text-emerald-600 font-semibold'
                        : isDarkMode 
                          ? 'text-white/50 hover:text-white/90 hover:bg-white/5' 
                          : 'text-black/50 hover:text-black/90 hover:bg-black/5'
                    }`}
                  >
                    <div className={`flex-shrink-0 transition-transform ${activeSection === section.id ? 'scale-110' : 'group-hover:scale-110'} ${
                      activeSection === section.id ? 'text-emerald-500' : ''
                    }`}>
                      {section.icon}
                    </div>
                    <div className="font-semibold text-sm tracking-tight text-left leading-tight z-10">{section.label}</div>
                    {activeSection === section.id && (
                      <div className="ml-auto z-10">
                        <ChevronRight size={14} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />
                      </div>
                    )}

                    {/* Sweep loading hover effect */}
                    {hoveredSection === section.id && (
                      <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-emerald-500/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.2, 
                            ease: "linear" 
                          }}
                          style={{ width: "100%" }}
                        />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Theme switcher */}
              <div className={`px-4 py-3 border-t mx-3 mb-4 rounded-xl transition-all duration-300 ${isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'}`}>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-full flex items-center justify-start gap-3 p-2 rounded-lg transition-all duration-300 group cursor-pointer ${
                    isDarkMode 
                      ? 'text-emerald-400 hover:bg-white/5' 
                      : 'text-black/60 hover:bg-black/5'
                  }`}
                  title={isDarkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
                >
                  <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </div>
                  <div className="font-semibold text-xs tracking-tight text-left leading-tight">
                    {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
                  </div>
                </button>
              </div>

              {/* Social icons */}
              <div className={`px-6 space-y-4 pt-6 mt-2 border-t text-center ${isDarkMode ? 'border-white/5 text-white/20' : 'border-black/5 text-black/30'}`}>
                 <div className="flex gap-4 justify-center">
                    <a href="https://www.linkedin.com/in/lucasleniar/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-emerald-650'}`}><Linkedin size={18} /></a>
                    <a href="https://www.instagram.com/lucasmercerl/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-emerald-650'}`}><Instagram size={18} /></a>
                    <a href="https://www.facebook.com/lucasmercerl/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-emerald-650'}`}><Facebook size={18} /></a>
                    <a href="https://lucasleniar.com.br" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-emerald-650'}`}><Globe size={18} /></a>
                 </div>
                 <p className="text-[10px] font-mono">© {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar Navigation */}
      {!isMaximized && (
        <nav className={`hidden md:flex w-20 md:w-64 border-r flex-col py-8 transition-all duration-300 z-20 shrink-0 ${
          isDarkMode ? 'bg-[#0f151a] border-white/5' : 'bg-[#fcfcfc] border-black/5'
        }`}>
          <div className="px-6 mb-12 hidden md:block">
            <h1 className={`text-xl font-bold tracking-tighter ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>LUCAS LENIAR</h1>
            <p className={`text-[10px] uppercase tracking-[0.2em] font-mono font-semibold ${isDarkMode ? 'text-emerald-400/40' : 'text-black/40'}`}>Systems Architect & Educator</p>
          </div>

          <div className="flex-1 space-y-2 px-3">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                aria-current={activeSection === section.id ? 'page' : undefined}
                aria-label={`Menu: ir para seção ${section.label}`}
                className={`w-full cursor-pointer flex items-center justify-start gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                  activeSection === section.id 
                    ? isDarkMode 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-emerald-500/10 text-emerald-600'
                    : isDarkMode 
                      ? 'text-white/40 hover:text-white/80 hover:bg-white/5' 
                      : 'text-black/40 hover:text-black/80 hover:bg-black/5'
                }`}
              >
                <div className={`flex-shrink-0 transition-transform ${activeSection === section.id ? 'scale-110' : 'group-hover:scale-110'} ${
                  activeSection === section.id ? 'text-emerald-500' : ''
                }`}>
                  {section.icon}
                </div>
                <div className="hidden md:block font-semibold text-xs lg:text-sm tracking-tight text-left leading-tight z-10">{section.label}</div>
                {activeSection === section.id && (
                  <div className="ml-auto hidden md:block z-10">
                    <ChevronRight size={14} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />
                  </div>
                )}

                {/* Embedded High-tech sweep loading effect on hover */}
                {hoveredSection === section.id && (
                  <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-emerald-500/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.2, 
                        ease: "linear" 
                      }}
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Theme switcher */}
          <div className={`px-4 py-3 border-t mx-3 mb-4 rounded-xl transition-all duration-300 ${isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'}`}>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-full flex items-center justify-start gap-3 p-2 rounded-lg transition-all duration-300 group cursor-pointer ${
                isDarkMode 
                  ? 'text-emerald-400 hover:bg-white/5' 
                  : 'text-black/60 hover:bg-black/5'
              }`}
              title={isDarkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
            >
              <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </div>
              <div className="hidden md:block font-semibold text-xs tracking-tight text-left leading-tight">
                {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
              </div>
            </button>
          </div>

          <div className={`px-6 space-y-4 pt-6 mt-2 border-t md:block hidden text-center ${isDarkMode ? 'border-white/5 text-white/20' : 'border-black/5 text-black/30'}`}>
             <div className="flex gap-4 justify-center">
                <a href="https://www.linkedin.com/in/lucasleniar/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-emerald-650'}`}><Linkedin size={18} /></a>
                <a href="https://www.instagram.com/lucasmercerl/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-emerald-650'}`}><Instagram size={18} /></a>
                <a href="https://www.facebook.com/lucasmercerl/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-emerald-650'}`}><Facebook size={18} /></a>
                <a href="https://lucasleniar.com.br" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-emerald-650'}`}><Globe size={18} /></a>
             </div>
             <p className="text-[10px] font-mono">© {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main ref={mainRef} className={`flex-1 relative flex flex-col min-h-0 ${
        isMaximized 
          ? 'overflow-hidden h-screen' 
          : isIFrameSection 
            ? 'h-full overflow-hidden' 
            : 'overflow-y-auto'
      }`}>
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: isDarkMode 
              ? 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)' 
              : 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
        
        <div className={`relative z-10 w-full transition-all duration-300 ${
          isMaximized 
            ? 'p-0 h-screen flex flex-col overflow-hidden' 
            : isIFrameSection 
              ? 'px-2 md:px-4 pt-4 md:pt-5 pb-[3px] h-full flex flex-col overflow-hidden max-w-full' 
              : 'min-h-full p-6 md:p-12 overflow-x-hidden'
        }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={isIFrameSection ? "flex-1 flex flex-col min-h-0 overflow-hidden" : "min-h-full flex flex-col"}
            >
              {activeSection === 'home' && <HomeSection onNavigate={handleSectionChange} isDarkMode={isDarkMode} />}
              {activeSection === 'computational' && <ComputationalThinking isDarkMode={isDarkMode} />}
              {activeSection === 'robotics' && <RoboticsSection isDarkMode={isDarkMode} />}
              {activeSection === 'tech' && <ITSection isDarkMode={isDarkMode} />}
              {activeSection === 'utfpr' && (
                <IFrameSection 
                  url="https://utfpr.lucasleniar.com.br/" 
                  title="UTFPR" 
                  isMaximized={isMaximized}
                  onToggleMaximize={() => setIsMaximized(!isMaximized)}
                  isDarkMode={isDarkMode}
                />
              )}
              {activeSection === 'certificados' && (
                <IFrameSection 
                  url="https://cert.lucasleniar.com.br" 
                  title="Gerador de Certificados" 
                  isMaximized={isMaximized}
                  onToggleMaximize={() => setIsMaximized(!isMaximized)}
                  isDarkMode={isDarkMode}
                />
              )}
              {activeSection === 'horarios' && (
                <IFrameSection 
                  url="https://horarios.lucasleniar.com.br/" 
                  title="Gerador de Horários" 
                  isMaximized={isMaximized}
                  onToggleMaximize={() => setIsMaximized(!isMaximized)}
                  isDarkMode={isDarkMode}
                />
              )}
              {activeSection === 'scripts' && (
                <ShellFilesSection 
                  isMaximized={isMaximized}
                  onToggleMaximize={() => setIsMaximized(!isMaximized)}
                  isDarkMode={isDarkMode}
                />
              )}
              {activeSection === 'life' && <LifeSection isDarkMode={isDarkMode} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {isMaximized && !isIFrameSection && (
          <button
            onClick={() => setIsMaximized(false)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 bg-emerald-600 text-white font-bold rounded-full text-xs uppercase tracking-widest hover:bg-emerald-500 shadow-2xl transition-all cursor-pointer border border-emerald-500/20 hover:scale-105 active:scale-95"
            title="Sair da Tela Cheia"
          >
            <Minimize2 size={16} /> Sair da Tela Cheia
          </button>
        )}

        <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-emerald-600/10 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-emerald-600/10 pointer-events-none" />
      </main>
    </div>
  );
}
