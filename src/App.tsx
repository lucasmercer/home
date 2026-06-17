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
  Trash2,
  Medal,
  Unlock,
  Briefcase,
  Sparkles,
  Trophy,
  Lock,
  Wifi,
  RadioReceiver
} from 'lucide-react';
import { NetworkBackground } from './components/AnimatedNetworkBg';
import { BugBreakoutGame } from './components/BugBreakoutGame';
import { IoTSection } from './components/IoTSection';

type SectionId = 'home' | 'life' | 'methodology' | 'projects' | 'iot' | 'students' | 'utfpr' | 'scripts';

interface Section {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

const SECTIONS: Section[] = [
  { id: 'home', label: 'Início', icon: <Home size={20} /> },
  { id: 'life', label: 'Sobre', icon: <User size={20} /> },
  { id: 'methodology', label: 'Como eu ensino', icon: <Brain size={20} /> },
  { id: 'projects', label: 'Projetos Web', icon: <Briefcase size={20} /> },
  { id: 'iot', label: 'Projetos de IoT', icon: <Wifi size={20} /> },
  { id: 'students', label: 'Projetos com Alunos', icon: <GraduationCap size={20} /> },
  { id: 'utfpr', label: 'UTFPR', icon: <GraduationCap size={20} /> },
  { id: 'scripts', label: 'Arquivos SH', icon: <FileCode size={20} /> }
];

const ProfileImage = ({ isDarkMode, onClick }: { isDarkMode?: boolean; onClick?: () => void }) => {
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
      <div className="hidden md:block absolute inset-4 bg-blue-500 rounded-full blur-[60px] md:blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
      <motion.div
        ref={cardRef}
        onClick={onClick}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative w-full max-w-[320px] md:max-w-none md:w-[400px] rounded-3xl ${isDarkMode !== false ? 'bg-slate-900/40 border border-white/5' : 'bg-white/40 border border-black/5'} overflow-hidden shadow-2xl flex flex-col justify-end cursor-pointer md:backdrop-blur-sm`}
      >
        <div className={`absolute inset-0 bg-gradient-to-tr ${isDarkMode ? 'from-blue-500/10 to-transparent' : 'from-blue-500/5 to-transparent'} z-0`} />
        
        <img
          src="https://lucasleniar.com.br/home.gif"
          alt="Foto do Professor Lucas Leniar"
          className="w-full h-auto block transform-gpu z-0"
          style={{ transform: 'translateZ(40px) scaleX(-1)' }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 p-8 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 flex items-end" style={{ transform: 'translateZ(50px)' }}>
          <p className="text-[11px] font-bold text-white uppercase tracking-[0.2em] font-mono leading-tight">
            Professor<br/>
            <span className="text-blue-400">Lucas Leniar</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const FlashcardContext = React.createContext<{onFlip: (id: string) => void}>({ onFlip: () => {} });

const Flashcard = ({ id, question, answer, isDarkMode, className = "mx-auto my-8" }: { id?: string; question: string; answer: string; isDarkMode: boolean; className?: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { onFlip } = React.useContext(FlashcardContext);

  const handleFlip = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    if (nextFlipped && id) {
      onFlip(id);
    }
  };

  return null;
};


const HomeSection = ({ onNavigate, isDarkMode, onUnlockEasterEgg, onOpenBugGame }: { onNavigate: (id: SectionId) => void; isDarkMode: boolean; onUnlockEasterEgg?: () => void; onOpenBugGame?: () => void }) => {
  const [typed1, setTyped1] = useState("");
  const [typed2, setTyped2] = useState("");
  const [profileClicks, setProfileClicks] = useState(0);

  const text1 = "Eu sou o ";
  const text2 = "Prof. Lucas Leniar";

  useEffect(() => {
    let current1 = 0;
    let current2 = 0;

    const typeInterval = setInterval(() => {
      if (current1 < text1.length) {
        setTyped1(text1.slice(0, current1 + 1));
        current1++;
      } else if (current2 < text2.length) {
        setTyped2(text2.slice(0, current2 + 1));
        current2++;
      } else {
        clearInterval(typeInterval);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const expertises = [
    { 
      icon: <Brain size={20} />, 
      label: "Pensamento Computacional", 
      color: "blue",
      desc: "Transformando o ensino de tecnologia com metodologias que desenvolvem a lógica e a capacidade analítica dos alunos." 
    },
    { 
      icon: <Wifi size={20} />, 
      label: "Internet das Coisas", 
      color: "emerald",
      desc: "Projetos reais com automação (Arduino, ESP32) levando dispositivos inteligentes diretamente para a sala de aula." 
    },
    { 
      icon: <GraduationCap size={20} />, 
      label: "Metodologia Prática", 
      color: "purple",
      desc: "Aprendizado baseado em projetos, conectando os desafios do mundo do hardware e software com o cotidiano do estudante." 
    },
    { 
      icon: <Code2 size={20} />, 
      label: "Sistemas & Desenvolvimento", 
      color: "orange",
      desc: "Ferramentas escaláveis, scripts de automação e aplicações web construídas com clareza, desempenho e propósito educacional." 
    },
  ];

  return (
  <div className="min-h-full flex flex-col justify-center py-4 md:py-0 max-w-6xl w-full">
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 order-1 md:order-1 relative z-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className={`inline-block px-3 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border ${
            isDarkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
          }`}>
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            {getGreeting()}, Aluno.
          </span>
          <span className={`hidden sm:inline-block px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase border border-slate-500/20 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            PROFESSOR_ESPECIALISTA
          </span>
        </div>
        
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          {typed1 || "\u00A0"}
          {typed1 === text1 && <br />}
          <span className={`whitespace-nowrap ${isDarkMode ? 'text-blue-400 font-serif italic' : 'text-blue-600 font-serif italic'}`}>
            {typed2}
          </span>
          {typed2 === text2 && '.'}
          <span className="font-mono text-blue-500 animate-[pulse_1s_infinite] ml-1 opacity-80 font-light">|</span>
        </h1>

        {/* Mobile Profile Image */}
        <div className="md:hidden mb-6 flex justify-center w-full scale-[0.85]">
          <ProfileImage 
            isDarkMode={isDarkMode} 
            onClick={() => {
              const next = profileClicks + 1;
              setProfileClicks(next);
              if (next === 5 && onUnlockEasterEgg) {
                onUnlockEasterEgg();
                setProfileClicks(0); // Reset after unlock
              }
            }} 
          />
        </div>

        <div className={`text-base md:text-lg max-w-2xl leading-relaxed mb-4 border-l-2 pl-4 md:pl-6 ${isDarkMode ? 'border-blue-500/30 text-white/70' : 'border-blue-500/30 text-slate-600'}`}>
          <p className="mb-3">
            Professor de Computação que transforma tecnologia complexa em <strong className={isDarkMode ? 'text-blue-400 font-semibold' : 'text-blue-600 font-semibold'}>aprendizado real.</strong>
          </p>
          <p>
            Guiando alunos do código às automações de <strong className={isDarkMode ? 'text-blue-400 font-semibold' : 'text-blue-600 font-semibold'}>IoT</strong>, mostrando a prática por trás da inovação.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 mb-4">
          {expertises.map((item, i) => {
            const hoverBorderColor = {
              emerald: 'hover:border-blue-500/30',
              blue: 'hover:border-blue-500/30',
              purple: 'hover:border-purple-500/30',
              orange: 'hover:border-orange-500/30',
            }[item.color as 'emerald' | 'blue' | 'purple' | 'orange'];

            const IconColor = {
              emerald: isDarkMode ? 'text-blue-400' : 'text-blue-600',
              blue: isDarkMode ? 'text-blue-400' : 'text-blue-600',
              purple: isDarkMode ? 'text-purple-400' : 'text-purple-600',
              orange: isDarkMode ? 'text-orange-400' : 'text-orange-600',
            }[item.color as 'emerald' | 'blue' | 'purple' | 'orange'];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ delay: 0.1 + (i * 0.1), duration: 0.4 }}
                className={`p-2.5 rounded-xl border flex flex-row items-center gap-3 transition-all duration-300 group h-full ${
                  isDarkMode 
                    ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]' 
                    : 'border-slate-200 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md'
                } ${hoverBorderColor}`}
              >
                <div className={`p-1.5 rounded-lg border flex-shrink-0 transition-colors ${
                  isDarkMode ? 'bg-[#151c24] border-white/5' : 'bg-slate-100 border-slate-200'
                } ${IconColor}`}>
                  {item.icon}
                </div>
                <div className="w-full text-left flex-1 flex flex-col min-w-0 py-0.5">
                  <span className={`block font-bold text-[12px] tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`} title={item.label}>{item.label}</span>
                  <p className={`text-[10px] leading-tight font-sans normal-case tracking-normal flex-1 ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          {/* Lógica */}
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => onNavigate('computational')}
            className={`flex-1 min-w-[120px] flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 shadow-sm
              ${isDarkMode ? 'bg-blue-500/10 border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/20 text-blue-300' : 'bg-blue-50 border-blue-200 hover:border-blue-500 hover:bg-blue-100 text-blue-800'}
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
              ${isDarkMode ? 'bg-slate-800 border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-slate-300' : 'bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700'}
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
              ${isDarkMode ? 'bg-slate-800 border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/10 text-slate-300' : 'bg-white border-slate-200 hover:border-yellow-500 hover:bg-yellow-50 text-slate-700'}
            `}
          >
            <GraduationCap size={20} className={isDarkMode ? 'text-yellow-400 mb-2' : 'text-yellow-600 mb-2'} />
            <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-center">UTFPR</span>
          </motion.button>


          {/* Scripts SH */}
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => onNavigate('scripts')}
             className={`flex-1 min-w-[80px] flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 shadow-sm
              ${isDarkMode ? 'bg-slate-800 border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 text-slate-300' : 'bg-white border-slate-200 hover:border-orange-500 hover:bg-orange-50 text-slate-700'}
            `}
          >
            <FileCode size={20} className={isDarkMode ? 'text-orange-400 mb-2' : 'text-orange-600 mb-2'} />
            <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-center">Arquivos SH</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 order-2 md:order-2 hidden md:flex justify-center w-full"
      >
        <ProfileImage 
          isDarkMode={isDarkMode} 
          onClick={() => {
            const next = profileClicks + 1;
            setProfileClicks(next);
            if (next === 5 && onUnlockEasterEgg) {
              onUnlockEasterEgg();
              setProfileClicks(0);
            }
          }} 
        />
      </motion.div>
    </div>

    {/* Bug break footer for home section */}
    <div className="w-full mt-12 flex justify-center items-center">
      <button
        onClick={onOpenBugGame}
        className={`text-xs md:text-sm font-mono tracking-widest uppercase transition-colors px-6 py-2 rounded-full border ${isDarkMode ? 'text-white/40 border-white/10 hover:text-white/80 hover:border-blue-500/50 hover:bg-blue-500/10' : 'text-black/40 border-black/10 hover:text-black/80 hover:border-blue-500/50 hover:bg-blue-500/10'}`}
      >
        Encontrou um Bug?
      </button>
    </div>
  </div>
  );
};

const ComputationalThinking = ({ isDarkMode, onUnlockComputational }: { isDarkMode: boolean, onUnlockComputational?: () => void }) => {
  const pillars = [
    { title: "Decomposição", desc: "Quebrar problemas complexos em partes menores.", icon: <Layers className="text-blue-500" size={32} /> },
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
          if (onUnlockComputational) onUnlockComputational();
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
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl w-full mx-auto px-2 mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className={`text-3xl md:text-5xl font-black mb-3 tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Metodologia & Pensamento Computacional</h2>
          <p className={`max-w-2xl uppercase text-[10px] tracking-[0.2em] font-mono font-bold ${isDarkMode ? 'text-blue-400' : 'text-black/30'}`}>Os 4 pilares para resolver qualquer problema tecnológico e educacional.</p>
        </div>

        <Flashcard 
          id="comp"
          question="Como programadores pensam?" 
          answer="O foco não é a linguagem ou a sintaxe. É a capacidade de dividir um grande problema em partes e resolver passo a passo." 
          isDarkMode={isDarkMode} 
          className="!w-44 !h-44 sm:!w-48 sm:!h-48 shrink-0 !m-0"
        />
      </motion.div>
      <div className="max-w-6xl w-full mx-auto px-2">
        
        <div className="flex flex-col lg:flex-row gap-8 md:gap-11 items-start mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-1">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`p-6 rounded-2xl border transition-all group relative overflow-hidden ${
                  isDarkMode 
                  ? 'bg-black/30 border-white/5 hover:bg-[#12181d] hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/5' 
                  : 'bg-black/[0.01] border-black/[0.05] hover:bg-white hover:shadow-xl hover:shadow-blue-500/5'
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10">{pillar.icon}</div>
                <div className="relative z-10">
                  <div className="mb-4">{pillar.icon}</div>
                  <h3 className={`text-xl font-bold mb-2 tracking-tight group-hover:text-blue-500 transition-colors ${isDarkMode ? 'text-white/90' : 'text-black/80'}`}>{pillar.title}</h3>
                  <p className={`leading-relaxed text-sm font-sans normal-case tracking-normal ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{pillar.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8"
          >
            <div className="relative group">
              <div className="hidden md:block absolute inset-4 bg-blue-500 rounded-full blur-[80px] opacity-15 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none animate-pulse" />
              <motion.div 
                animate={{ y: [0, -6, 0] }} 
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className={`relative rounded-3xl border overflow-hidden shadow-2xl transition-colors ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-black/[0.02] border-black/5'}`}
              >
                <img 
                  src="https://lucasleniar.com.br/certificado.gif" 
                  alt="Animação representativa de Certificação Acadêmica de TI e Redes do Professor Lucas Leniar" 
                  className="w-full h-auto scale-105 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-mono leading-none">Certificações</p>
                  <p className="text-[11px] text-white/70 mt-1 font-sans">Qualidade</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className={`rounded-3xl border p-6 md:p-10 shadow-2xl relative overflow-hidden w-full ${
            isDarkMode 
            ? 'bg-slate-900 border-white/5 shadow-black/40' 
            : 'bg-white border-slate-200'
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-[120px] pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl text-blue-600 ${isDarkMode ? 'bg-blue-500/15' : 'bg-blue-500/10'}`}>
                <Terminal size={24} />
              </div>
              <div>
                <span className={`text-[10px] uppercase tracking-[0.2em] font-mono font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Laboratório de Lógica</span>
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameState('playing')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-blue-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                >
                  Iniciar Laboratório Prático <Play size={14} />
                </motion.button>
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
                    <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase block mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>COMANDOS DISPONÍVEIS</span>
                    <div className="grid grid-cols-2 gap-2">
                       <button 
                        onClick={() => addCommand('FORWARD')} 
                        disabled={gameState === 'executing'}
                        className={`py-3 rounded-lg font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition-all shadow-sm ${isDarkMode ? 'bg-[#1c242e] border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-white disabled:opacity-50' : 'bg-white border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-700 disabled:opacity-50'}`}
                       >
                         ↑ AVANÇAR
                       </button>
                       <div className="col-span-2 grid grid-cols-2 gap-2 mt-1">
                        <button 
                          onClick={() => addCommand('LEFT')} 
                          disabled={gameState === 'executing'}
                          className={`py-3 rounded-lg font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition-all shadow-sm ${isDarkMode ? 'bg-[#1c242e] border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-white disabled:opacity-50' : 'bg-white border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-700 disabled:opacity-50'}`}
                        >
                          ↰ ESQUERDA
                        </button>
                        <button 
                          onClick={() => addCommand('RIGHT')} 
                          disabled={gameState === 'executing'}
                          className={`py-3 rounded-lg font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition-all shadow-sm ${isDarkMode ? 'bg-[#1c242e] border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-white disabled:opacity-50' : 'bg-white border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-700 disabled:opacity-50'}`}
                        >
                          DIREITA ↱
                        </button>
                       </div>
                    </div>
                  </div>

                  <div className={`flex-[1] flex flex-col p-4 rounded-2xl border min-h-[220px] ${isDarkMode ? 'bg-[#11171d] border-white/5' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>FILA DE INSTRUÇÕES</span>
                      <span className={`text-[9px] font-mono font-bold ${commands.length === 15 ? 'text-red-500' : isDarkMode ? 'text-blue-500/50' : 'text-blue-600/60'}`}>{commands.length}/15</span>
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
                                ? (isDarkMode ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-blue-100 border-blue-500 text-blue-700')
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
                         className={`p-3 rounded-xl border flex items-center justify-center transition-all ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50' : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50'}`}
                         title="Limpar Comandos"
                       >
                         <Trash2 size={16} />
                       </button>
                       <button
                         onClick={executeQueue}
                         disabled={gameState === 'executing' || commands.length === 0}
                         className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest border transition-all ${
                           gameState === 'executing' 
                             ? 'bg-blue-600/50 text-white cursor-not-allowed border-transparent' 
                             : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500 cursor-pointer shadow-lg hover:shadow-blue-500/20'
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
                          cellClass = isDarkMode ? "bg-blue-500/20 border-blue-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "bg-blue-100 border-blue-400";
                        } else if (isObs) {
                          cellClass = isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-300 border-slate-400";
                        }

                        return (
                          <div 
                            key={index}
                            className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-md md:rounded-lg border flex items-center justify-center transition-all duration-300 relative ${cellClass}`}
                          >
                            {isTarget && !isRobot && (
                              <Award size={20} className={isDarkMode ? 'text-blue-400 opacity-80' : 'text-blue-600 opacity-80'} />
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
                  <div className={`p-4 rounded-xl border font-mono text-[9px] md:text-[10px] uppercase leading-relaxed shadow-inner h-32 overflow-y-auto ${isDarkMode ? 'bg-[#05080c] border-white/5 text-blue-400/80' : 'bg-slate-900 border-slate-900 text-blue-400'}`}>
                    {logs.map((log, i) => (
                      <div key={i} className={`${i === 0 ? (log.includes('ERRO') || log.includes('FALHA') ? 'text-red-400 font-bold' : log.includes('SUCESSO') ? 'text-blue-400 font-bold' : isDarkMode ? 'text-white' : 'text-blue-300') : 'opacity-60'}`}>
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
                  <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
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
                    className={`w-full px-5 py-4 rounded-xl border text-sm font-sans font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all text-center placeholder:text-center ${
                      isDarkMode 
                      ? 'bg-[#151c24] border-white/10 text-white placeholder:text-white/30' 
                      : 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400'
                    }`}
                  />
                  
                  {studentName.length > 2 && (
                    <div className={`p-6 rounded-2xl border text-left mt-6 flex flex-col items-center space-y-4 shadow-xl ${isDarkMode ? 'bg-gradient-to-br from-[#101915] to-[#151c24] border-blue-500/30' : 'bg-gradient-to-br from-blue-50 to-white border-blue-200'}`}>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-500/10 px-3 py-1 rounded-full">CERTIFICADO DIGITAL LÓGICO</span>
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

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className={`mt-10 p-6 md:p-8 rounded-3xl border text-left flex flex-col items-start shadow-xl ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-200'}`}
        >
          <span className="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 inline-block">
            Módulo Educacional
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {[
              { id: 1, topic: 'Decomposição de Desafios', dur: '12h', xp: '+250 XP', active: true },
              { id: 2, topic: 'Abstração Lógica', dur: '8h', xp: '+180 XP', active: true },
              { id: 3, topic: 'Criação de Algoritmos', dur: '16h', xp: '+300 XP', active: gameState === 'success' },
              { id: 4, topic: 'Identificação de Padrões', dur: '6h', xp: '+120 XP', active: false },
            ].map((aula) => (
              <div key={aula.id} className={`p-4 rounded-xl border flex flex-col justify-between h-32 transition-all ${
                aula.active 
                ? (isDarkMode ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-blue-50 border-blue-300 shadow-md') 
                : (isDarkMode ? 'bg-black/20 border-white/5 opacity-60' : 'bg-white opacity-60 border-slate-200')
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] font-mono font-bold uppercase ${aula.active ? 'text-blue-500' : 'text-slate-400'}`}>Aula {aula.id}</span>
                  {aula.active && <span className="text-[9px] font-mono font-bold bg-blue-500/20 text-blue-500 px-1.5 py-0.5 rounded">{aula.xp}</span>}
                </div>
                <strong className={`text-sm leading-snug tracking-tight font-sans ${isDarkMode ? 'text-white/90' : 'text-slate-800'}`}>{aula.topic}</strong>
                <div className="flex items-center gap-1.5 mt-auto pt-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${aula.active ? 'bg-blue-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span className={`text-[9px] uppercase font-mono tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>{aula.active ? 'COMPLETO' : 'PENDENTE'}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

const RoboticsSection = ({ isDarkMode, onUnlockRobotics }: { isDarkMode: boolean, onUnlockRobotics?: () => void }) => {
  const features = [
    { title: "Arduino & ESP32", desc: "Desenvolvimento de protótipos e sistemas embarcados.", icon: <Cpu className="text-orange-500" size={32} /> },
    { title: "Lógica de Programação", desc: "Aplicação prática de algoritmos em hardware.", icon: <Layers className="text-blue-500" size={32} /> },
    { title: "Projetos Maker", desc: "Criação de soluções interativas e automatizadas.", icon: <Box className="text-blue-500" size={32} /> },
    { title: "Educação Tecnológica", desc: "Metodologias ativas aplicadas à robótica.", icon: <GraduationCap className="text-purple-500" size={32} /> }
  ];

  type ProgramId = 'blink' | 'traffic' | 'sensor' | 'police' | 'sos';
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
    },
    police: {
      title: "Sirene Giroflex (Polícia)",
      desc: "Alterna os LEDs D13 (Vermelho) e D11 (Verde/Azul) rapidamente simulando uma viatura.",
      code: `// Projeto: Efeito Splash/Giroflex
void setup() {
  pinMode(13, OUTPUT); // LED Vermelho
  pinMode(11, OUTPUT); // LED Verde/Azul
}

void loop() {
  // Pisca o Vermelho 3 vezes
  for(int i = 0; i < 3; i++) {
    digitalWrite(13, HIGH);
    delay(100);
    digitalWrite(13, LOW);
    delay(100);
  }
  
  // Pisca o Verde 3 vezes
  for(int i = 0; i < 3; i++) {
    digitalWrite(11, HIGH);
    delay(100);
    digitalWrite(11, LOW);
    delay(100);
  }
}`
    },
    sos: {
      title: "Sinal Morse S.O.S",
      desc: "Transmite o pedido de socorro universal (SOS) através do LED D12 (Amarelo) usando código Morse.",
      code: `// Projeto: Transmissor Morse SOS (... --- ...)
void setup() {
  pinMode(12, OUTPUT); // LED Amarelo
}

void loop() {
  // Três pontos (S)
  for (int x = 0; x < 3; x++) {
    digitalWrite(12, HIGH);
    delay(150);
    digitalWrite(12, LOW);
    delay(150);
  }
  delay(100); // Pausa entre letras
  
  // Três traços (O)
  for (int x = 0; x < 3; x++) {
    digitalWrite(12, HIGH);
    delay(450);
    digitalWrite(12, LOW);
    delay(150);
  }
  delay(100); // Pausa entre letras
  
  // Três pontos (S)
  for (int x = 0; x < 3; x++) {
    digitalWrite(12, HIGH);
    delay(150);
    digitalWrite(12, LOW);
    delay(150);
  }
  
  delay(2000); // Pausa antes de repetir
}`
    }
  };

  const playClickSound = (pitch = 500, duration = 0.05) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(pitch / 2, audioCtx.currentTime + duration);
      
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch(e) {
      // Ignore
    }
  };

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 7));
  };

  const startUpload = () => {
    playClickSound(300, 0.1);
    setIsUploading(true);
    setIsRunning(false);
    setUploadProgress(0);
    setLeds({ red: false, yellow: false, green: false });
    addLog(`Compilando "${programs[activeProg].title}"...`);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const next = prev + 25;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setIsRunning(true);
            playClickSound(800, 0.1);
            addLog("Gravação USB concluída! Binário carregado com sucesso (4.2 KB).");
            addLog("Simulador executando loop() principal.");
            if (onUnlockRobotics) onUnlockRobotics();
          }, 0);
          return 100;
        }
        return next;
      });
    }, 200);
  };

  const stopSimulation = () => {
    playClickSound(100, 0.1);
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
          if (nextVal) playClickSound(600, 0.05);
          addLog(`Pino D13 -> ${nextVal ? 'HIGH (V_CC)' : 'LOW (GND)'}`);
          return { red: nextVal, yellow: false, green: false };
        });
        timer = setTimeout(runLoop, 1000);
      } else if (activeProg === 'traffic') {
        if (step === 0) {
          playClickSound(600, 0.05);
          setLeds({ red: true, yellow: false, green: false });
          addLog("D13 (Vermelho) -> HIGH [Aguarde 3s]");
          step = 1;
          timer = setTimeout(runLoop, 3000);
        } else if (step === 1) {
          playClickSound(600, 0.05);
          setLeds({ red: false, yellow: true, green: false });
          addLog("D12 (Amarelo) -> HIGH [Atenção 1.2s]");
          step = 2;
          timer = setTimeout(runLoop, 1200);
        } else {
          playClickSound(600, 0.05);
          setLeds({ red: false, yellow: false, green: true });
          addLog("D11 (Verde) -> HIGH [Siga 3s]");
          step = 0;
          timer = setTimeout(runLoop, 3000);
        }
      } else if (activeProg === 'sensor') {
        if (sensorTriggered) {
          setLeds(prev => {
            const nextVal = !prev.red;
            playClickSound(nextVal ? 800 : 600, 0.05);
            addLog(`🚨 ALERTA: Sensor D2 ativo! Pino D13 piscando!`);
            return { red: nextVal, yellow: false, green: false };
          });
          timer = setTimeout(runLoop, 250);
        } else {
          setLeds({ red: false, yellow: false, green: false });
          addLog("Sensor D2 está estável (Aguardando movimento...)");
          timer = setTimeout(runLoop, 2000);
        }
      } else if (activeProg === 'police') {
        // police logic: 6 steps (3 red blinks, 3 green blinks)
        if (step < 6) {
          const isHigh = step % 2 === 0;
          if (isHigh) playClickSound(800, 0.05);
          setLeds({ red: isHigh, yellow: false, green: false });
          if (isHigh) addLog("D13 (Vermelho) -> HIGH");
          step++;
          timer = setTimeout(runLoop, 100);
        } else if (step < 12) {
          const isHigh = step % 2 === 0;
          if (isHigh) playClickSound(900, 0.05);
          setLeds({ red: false, yellow: false, green: isHigh });
          if (isHigh) addLog("D11 (Verde/Azul) -> HIGH");
          step++;
          timer = setTimeout(runLoop, 100);
        } else {
          step = 0;
          timer = setTimeout(runLoop, 10);
        }
      } else if (activeProg === 'sos') {
        // SOS rhythm: S(3 dots = 3x 150ms on/off), gap(100ms), O(3 dashes = 3x 450on/150off), gap(100ms), S, wait 2000ms
        // We'll simplify the state machine
        if (step < 6) {
          // S dot
          const isHigh = step % 2 === 0;
          if (isHigh) playClickSound(600, 0.1);
          setLeds({ red: false, yellow: isHigh, green: false });
          if (isHigh) addLog("D12 -> S (Ponto)");
          step++;
          timer = setTimeout(runLoop, 150);
        } else if (step === 6) {
          setLeds({ red: false, yellow: false, green: false });
          step++;
          timer = setTimeout(runLoop, 100);
        } else if (step < 13) {
           // O dash
          const isHigh = step % 2 !== 0;
          if (isHigh) playClickSound(600, 0.3);
          setLeds({ red: false, yellow: isHigh, green: false });
          if (isHigh) addLog("D12 -> O (Traço)");
          step++;
          timer = setTimeout(runLoop, isHigh ? 450 : 150);
        } else if (step === 13) {
          setLeds({ red: false, yellow: false, green: false });
          step++;
          timer = setTimeout(runLoop, 100);
        } else if (step < 20) {
          // S dot
          const isHigh = step % 2 === 0;
          if (isHigh) playClickSound(600, 0.1);
          setLeds({ red: false, yellow: isHigh, green: false });
          if (isHigh) addLog("D12 -> S (Ponto)");
          step++;
          timer = setTimeout(runLoop, 150);
        } else {
          setLeds({ red: false, yellow: false, green: false });
          addLog("D12 -> Pausa de 2s...");
          step = 0;
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
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between px-1 mb-8 md:mb-12">
          <div>
            <h2 className={`text-3xl md:text-5xl font-black mb-3 tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Projetos com Alunos</h2>
            <p className={`max-w-2xl uppercase text-[10px] tracking-[0.2em] font-mono font-bold ${isDarkMode ? 'text-blue-400' : 'text-black/30'}`}>Transformando teoria em movimento e inovação.</p>
          </div>
          <Flashcard 
            id="robo"
            question="O que é um Microcontrolador?" 
            answer="É um pequeno computador em um único chip (como o Arduino). Ele lê sensores, processa a lógica programada (se/então) e controla atuadores (motores, LEDs)." 
            isDarkMode={isDarkMode} 
            className="!m-0"
          />
        </div>
        
        {/* Core theory and layout */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-1">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`p-6 md:p-8 rounded-2xl border transition-all group relative overflow-hidden ${
                  isDarkMode 
                    ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]' 
                    : 'bg-black/[0.01] border-black/[0.05] hover:bg-white hover:shadow-xl hover:shadow-blue-500/5'
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10">{feature.icon}</div>
                <div className="relative z-10">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className={`text-lg font-bold mb-2 tracking-tight group-hover:text-blue-500 transition-colors ${isDarkMode ? 'text-white/90' : 'text-black/80'}`}>{feature.title}</h3>
                  <p className={`leading-relaxed text-xs font-sans normal-case tracking-normal ${isDarkMode ? 'text-white/45' : 'text-black/45'}`}>{feature.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Sticky Robotics GIF */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8"
          >
            <div className="relative group">
              <div className="hidden md:block absolute inset-0 bg-blue-600 rounded-3xl blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
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
        <div className="mt-8 mb-8 border-t border-blue-500/10 pt-10 px-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-1 px-2.5 bg-blue-500/10 text-blue-500 rounded-lg text-xs font-mono font-bold">PROTOTIPAGEM REALTIME</span>
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
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase block mb-1 text-blue-400">1. Instalar Firmware</span>
              
              <div className="space-y-2">
                {(Object.keys(programs) as ProgramId[]).map((progId) => (
                  <button
                    key={progId}
                    onClick={() => {
                      playClickSound(400, 0.05);
                      setActiveProg(progId);
                      stopSimulation();
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer block group ${
                      activeProg === progId 
                        ? 'bg-blue-500/15 border-blue-500/40 text-blue-400 shadow-md' 
                        : 'border-white/5 bg-[#111724] hover:bg-white/[0.04] text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-mono font-bold text-[10px] uppercase tracking-wider group-hover:text-blue-400 transition-colors mb-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeProg === progId ? 'bg-blue-500 animate-ping' : 'bg-slate-600'}`} />
                      {programs[progId].title}
                    </span>
                    <span className={`text-[11px] font-sans normal-case tracking-normal block leading-tight ${activeProg === progId ? 'text-blue-300/80' : 'text-slate-400 group-hover:text-slate-200'}`}>
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
            <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-blue-400 uppercase w-full text-left mb-6">2. Bancada Virtual</span>
            
            {/* Visual Hardware Schematic */}
            <div className="w-full flex flex-col items-center justify-center space-y-8 py-4 relative">
                {/* Arduino UNO SVG Representation */}
                <div className="w-64 relative shadow-2xl transition-transform hover:scale-105 duration-500">
                  <svg viewBox="0 0 400 280" className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" xmlns="http://www.w3.org/2000/svg">
                    {/* PCB Base */}
                    <path d="M 10,20 L 370,20 C 380,20 390,30 390,40 L 390,240 C 390,250 380,260 370,260 L 10,260 C 0,260 0,250 0,240 L 0,40 C 0,30 0,20 10,20 Z" fill="#006468" stroke="#004a4d" strokeWidth="3" />
                    
                    {/* USB Port */}
                    <rect x="-5" y="40" width="50" height="40" fill="#c0c0c0" rx="3" stroke="#888" strokeWidth="2" />
                    <rect x="0" y="45" width="20" height="30" fill="#fff" opacity="0.3" rx="2" />

                    {/* Power Jack */}
                    <rect x="-5" y="190" width="45" height="35" fill="#1a1a1a" rx="2" stroke="#0d0d0d" strokeWidth="2" />
                    
                    {/* ATMEGA Microcontroller */}
                    <rect x="230" y="110" width="120" height="40" fill="#222" rx="3" stroke="#111" strokeWidth="2" />
                    <circle cx="240" cy="130" r="3" fill="#444" />
                    <text x="270" y="133" fill="#555" fontSize="10" fontFamily="monospace" fontWeight="bold">ATMEGA328P</text>
                    {/* IC Pins */}
                    {Array.from({ length: 14 }).map((_, i) => (
                      <g key={'ic-pin-' + i}>
                        <rect x={235 + (i * 8)} y="105" width="3" height="5" fill="#b0b0b0" />
                        <rect x={235 + (i * 8)} y="150" width="3" height="5" fill="#b0b0b0" />
                      </g>
                    ))}

                    {/* Digital Headers (Top) */}
                    <rect x="150" y="25" width="220" height="15" fill="#111" rx="1" />
                    <rect x="70" y="25" width="70" height="15" fill="#111" rx="1" />
                    {Array.from({ length: 14 }).map((_, i) => (
                      <circle key={'d-pin-' + i} cx={155 + (i * 15.3)} cy="32.5" r="2.5" fill="#333" />
                    ))}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <circle key={'d2-pin-' + i} cx={75 + (i * 15.3)} cy="32.5" r="2.5" fill="#333" />
                    ))}

                    {/* Analog Headers (Bottom) */}
                    <rect x="120" y="240" width="90" height="15" fill="#111" rx="1" />
                    <rect x="220" y="240" width="90" height="15" fill="#111" rx="1" />
                    {Array.from({ length: 6 }).map((_, i) => (
                      <circle key={'a-pin-' + i} cx={125 + (i * 15)} cy="247.5" r="2.5" fill="#333" />
                    ))}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <circle key={'pwr-pin-' + i} cx={225 + (i * 15)} cy="247.5" r="2.5" fill="#333" />
                    ))}
                    
                    {/* Arduino Logo & Text */}
                    <text x="140" y="160" fill="#fff" opacity="0.8" fontSize="24" fontFamily="sans-serif" fontWeight="bold">UNO</text>
                    
                    {/* D13, TX, RX, ON LEDs built-in indicator on board */}
                    {/* L (D13) LED */}
                    <g transform="translate(160, 80)">
                      <rect x="0" y="0" width="8" height="14" fill="#a0a0a0" rx="1" />
                      <circle cx="4" cy="7" r="3" fill={leds.red ? "#ff3333" : "#551111"} className={leds.red ? "animate-pulse" : ""} />
                      <text x="-15" y="10" fill="#fff" fontSize="10" opacity="0.6">L</text>
                    </g>
                    {/* TX LED */}
                    <g transform="translate(160, 100)">
                      <rect x="0" y="0" width="8" height="14" fill="#a0a0a0" rx="1" />
                      <circle cx="4" cy="7" r="3" fill={leds.yellow ? "#ffaa00" : "#553300"} className={leds.yellow ? "animate-pulse" : ""} />
                      <text x="-22" y="10" fill="#fff" fontSize="10" opacity="0.6">TX</text>
                    </g>
                    {/* RX LED */}
                    <g transform="translate(160, 120)">
                      <rect x="0" y="0" width="8" height="14" fill="#a0a0a0" rx="1" />
                      <circle cx="4" cy="7" r="3" fill={leds.green ? "#00ff66" : "#004411"} className={leds.green ? "animate-pulse" : ""} />
                      <text x="-22" y="10" fill="#fff" fontSize="10" opacity="0.6">RX</text>
                    </g>
                    {/* ON LED */}
                    <g transform="translate(320, 180)">
                      <rect x="0" y="0" width="8" height="14" fill="#a0a0a0" rx="1" />
                      <circle cx="4" cy="7" r="3" fill={isRunning ? "#00ff00" : "#004400"} />
                      <text x="-22" y="10" fill="#fff" fontSize="10" opacity="0.6">ON</text>
                    </g>
                  </svg>
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
                          ? 'bg-blue-500 border-blue-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.9)] scale-110' 
                          : 'bg-blue-950/40 border-blue-900/30 text-blue-500/20'
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
                      <span className="text-[8px] font-mono font-bold text-blue-400 block mb-2">ENTRADA DIGITAL 2: SENSOR</span>
                      <button
                        onMouseDown={() => setSensorTriggered(true)}
                        onMouseUp={() => setSensorTriggered(false)}
                        onTouchStart={() => setSensorTriggered(true)}
                        onTouchEnd={() => setSensorTriggered(false)}
                        className={`px-4 py-2 text-[10px] font-mono font-bold rounded-xl transition-all cursor-pointer ${
                          sensorTriggered 
                            ? 'bg-red-600 text-white shadow-lg scale-95 shadow-red-500/30' 
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
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
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRunning ? 'bg-blue-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunning ? 'bg-blue-500' : 'bg-red-500'}`}></span>
              </span>
              <span className="text-[9px] font-mono tracking-wider text-slate-400">
                {isRunning ? 'CHIP ATIVO (RUNNING)' : 'CHIP INATIVO (STOPPED)'}
              </span>
            </div>
          </div>

          {/* 3. Code View and Serial Logs Monitor */}
          <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-[#0b0f15]">
            <div className="flex flex-col space-y-4">
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-blue-400 uppercase">3. IDE Editor & mBlock & Serial</span>
              
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
                        <strong className="text-white">Selecione Arduino Uno:</strong> Vá em <strong className="text-blue-400">Dispositivos</strong>, clique em <strong className="text-blue-400">+ Adicionar</strong>, selecione a placa <strong className="text-white underline">Arduino Uno</strong> e clique em OK.
                      </li>
                      <li>
                        <strong className="text-white">Mudança de Modo:</strong> Mude a chave da placa de <strong className="text-white">"Ao Vivo (Live)"</strong> para <strong className="text-purple-400">"Carregar (Upload)"</strong> no canto superior direito para habilitar os blocos de firmware do chip.
                      </li>
                      <li>
                        <strong className="text-white">Recrie os Blocos:</strong> Arraste e posicione os blocos de acordo com o esquema da aba <strong className="text-blue-400">mBlock Blocos</strong> ao lado.
                      </li>
                      <li>
                        <strong className="text-white">Conexão USB:</strong> Conecte sua placa física. Clique em <strong className="text-blue-400">Conectar</strong> e escolha a porta serial apropriada (Ex: <em className="text-blue-400 font-mono">COM3, COM7</em>).
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
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-blue-500 disabled:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center leading-none"
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
                    className="h-full bg-blue-500" 
                  />
                </div>
              )}
            </div>

            {/* Simulated Live Serial Monitor Terminal */}
            <div className="mt-6 border-t border-white/5 pt-4">
              <span className="text-[8px] font-mono font-bold text-yellow-500 tracking-widest block mb-2 uppercase">Monitor Serial (9600 Baud)</span>
              <div className="bg-black/40 rounded-xl p-3 h-28 border border-white/5 overflow-y-auto font-mono text-[9px] text-blue-400 space-y-1 select-text">
                {logs.map((logStr, idx) => (
                  <div key={idx} className="whitespace-pre-wrap leading-normal font-medium">
                    {logStr}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gamified Classes Tracker */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className={`mt-10 p-6 md:p-8 rounded-3xl border text-left flex flex-col items-start shadow-xl ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-200'}`}
        >
          <span className="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest text-[#10b981] bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 inline-block">
            Módulo Educacional
          </span>
          <h3 className={`text-xl md:text-2xl font-bold font-serif italic mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Aulas Ministradas: Robótica Educacional</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {[
              { id: 1, topic: 'Protocolos de E/S', dur: '8h', xp: '+150 XP', active: true },
              { id: 2, topic: 'Atuadores: Blink & Motores', dur: '10h', xp: '+200 XP', active: true },
              { id: 3, topic: 'Sensores de Ambiente', dur: '12h', xp: '+250 XP', active: isRunning },
              { id: 4, topic: 'Projeto Final Integrado', dur: '20h', xp: '+400 XP', active: false },
            ].map(aula => (
              <div key={aula.id} className={`p-4 rounded-xl border flex flex-col justify-between h-32 transition-all ${
                aula.active 
                ? (isDarkMode ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-blue-50 border-blue-300 shadow-md') 
                : (isDarkMode ? 'bg-black/20 border-white/5 opacity-60' : 'bg-white opacity-60 border-slate-200')
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] font-mono font-bold uppercase ${aula.active ? 'text-blue-500' : 'text-slate-400'}`}>Aula {aula.id}</span>
                  {aula.active && <span className="text-[9px] font-mono font-bold bg-blue-500/20 text-blue-500 px-1.5 py-0.5 rounded">{aula.xp}</span>}
                </div>
                <strong className={`text-sm leading-snug tracking-tight font-sans ${isDarkMode ? 'text-white/90' : 'text-slate-800'}`}>{aula.topic}</strong>
                <div className="flex items-center gap-1.5 mt-auto pt-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${aula.active ? 'bg-blue-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span className={`text-[9px] uppercase font-mono tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>{aula.active ? 'COMPLETO' : 'PENDENTE'}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

const ITSection = ({ isDarkMode, onUnlockSysAdmin }: { isDarkMode: boolean; onUnlockSysAdmin?: () => void }) => {
  type ProblemId = 'dhcp' | 'dns' | 'ram' | 'firewall';
  const [activeProb, setActiveProb] = useState<ProblemId>('dhcp');
  const [probFixed, setProbFixed] = useState<{ dhcp: boolean; dns: boolean; ram: boolean; firewall: boolean }>({
    dhcp: false,
    dns: false,
    ram: false,
    firewall: false
  });
  
  useEffect(() => {
    if (onUnlockSysAdmin && probFixed.dhcp && probFixed.dns && probFixed.ram && probFixed.firewall) {
      onUnlockSysAdmin();
    }
  }, [probFixed, onUnlockSysAdmin]);

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
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6 }} className="lg:col-span-8 flex flex-col justify-center">
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
            <motion.div whileHover={{ y: -4, scale: 1.02 }} className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-default ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30' : 'bg-black/[0.02] border-black/10 hover:bg-blue-50 hover:border-blue-200'}`}>
              <Server size={22} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              <span className={`text-[10px] uppercase font-mono font-bold tracking-wider ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Infra & SO</span>
            </motion.div>
            <motion.div whileHover={{ y: -4, scale: 1.02 }} className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-default ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30' : 'bg-black/[0.02] border-black/10 hover:bg-blue-50 hover:border-blue-200'}`}>
              <Network size={22} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              <span className={`text-[10px] uppercase font-mono font-bold tracking-wider ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Redes & TCP/IP</span>
            </motion.div>
            <motion.div whileHover={{ y: -4, scale: 1.02 }} className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-default ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:bg-yellow-500/10 hover:border-yellow-500/30' : 'bg-black/[0.02] border-black/10 hover:bg-yellow-50 hover:border-yellow-200'}`}>
              <Cpu size={22} className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} />
              <span className={`text-[10px] uppercase font-mono font-bold tracking-wider ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Hardware</span>
            </motion.div>
            <motion.div whileHover={{ y: -4, scale: 1.02 }} className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-default ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:bg-purple-500/10 hover:border-purple-500/30' : 'bg-black/[0.02] border-black/10 hover:bg-purple-50 hover:border-purple-200'}`}>
              <ShieldCheck size={22} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
              <span className={`text-[10px] uppercase font-mono font-bold tracking-wider ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Segurança</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.2, duration: 0.6 }} className="lg:col-span-4 flex items-center justify-center">
          <Flashcard 
            id="dns"
            question="O que é DNS?" 
            answer="É como a lista de contatos do seu celular. Quando você digita google.com, o DNS descobre qual é o endereço IP 'verdadeiro' do servidor para conectá-lo. (Ex: 142.250.191.46)" 
            isDarkMode={isDarkMode} 
            className="!m-0"
          />
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
              <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase block mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>TICKETS DE INCIDENTE</span>
              
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
                          ? (isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700')
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
                      ? (isDarkMode ? 'bg-blue-900/40 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-blue-100 border-blue-400 text-blue-600')
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
                      ? 'bg-blue-500 shadow-[0_0_15px_#10b981]' 
                      : activeProb === 'dhcp' ? 'bg-yellow-500 shadow-md animate-pulse' : (isDarkMode ? 'bg-blue-500/30' : 'bg-blue-400')
                  }`} />
                </div>

                {/* 2. Switch/Router */}
                <div className="flex flex-col items-center relative z-10 group">
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-lg ${
                    probFixed.dns || probFixed.firewall || probFixed.ram
                      ? (isDarkMode ? 'bg-blue-900/40 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-blue-100 border-blue-400 text-blue-600')
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
                      ? 'bg-blue-500 shadow-[0_0_15px_#10b981]' 
                      : ['dns', 'firewall'].includes(activeProb) ? 'bg-yellow-500 animate-pulse' : (isDarkMode ? 'bg-blue-500/30' : 'bg-blue-400')
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
                    <span className={probFixed.ram ? 'text-blue-500' : 'text-red-500 animate-pulse'}>
                      {sysRamUsage}% RAM usado
                    </span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full overflow-hidden border ${isDarkMode ? 'bg-[#0d1116] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                    <motion.div 
                      initial={{ width: '98%' }} 
                      animate={{ width: `${sysRamUsage}%` }} 
                      transition={{ duration: 0.8 }}
                      className={`h-full ${probFixed.ram ? 'bg-blue-500' : 'bg-red-500'}`} 
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={`text-left p-5 rounded-xl text-xs font-sans normal-case tracking-normal leading-relaxed border shadow-md w-full ${isDarkMode ? 'bg-[#141b25] text-white/70 border-white/5' : 'bg-white text-slate-700 border-slate-200'}`}>
              <span className={`block font-bold text-[10px] font-mono uppercase tracking-widest mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Sintoma Registrado:</span>
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
                  <div className={`p-4 border rounded-xl text-center shadow-md ${isDarkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-300'}`}>
                    <span className={`font-mono text-[12px] font-bold block uppercase tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>✔️ INCIDENTE TRATADO</span>
                    <span className={`text-[11px] font-sans normal-case tracking-normal block mt-1 ${isDarkMode ? 'text-blue-400/60' : 'text-blue-700/70'}`}>Infraestrutura operando com estabilidade no setor.</span>
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
              <div className={`rounded-xl p-4 h-48 border overflow-y-auto font-mono text-[10px] space-y-2 select-text shadow-inner ${isDarkMode ? 'bg-black/60 border-white/5 text-blue-300/80 shadow-black' : 'bg-slate-900 border-slate-900 text-blue-400 shadow-slate-900/50'}`}>
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
  const [viewedYears, setViewedYears] = useState<Set<number>>(new Set([2006]));

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
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      activeColor: "border-blue-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] bg-blue-500/5",
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
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className={`rounded-3xl border p-6 md:p-8 mb-10 shadow-xl relative overflow-hidden transition-all ${
        isDarkMode ? 'bg-slate-900/90 border-white/5' : 'bg-white border-black/10'
      }`}>
        <div className="hidden md:block absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Picture on the left */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-center">
            <div className="relative group">
              {/* Animated decorative ring */}
              <div className="hidden md:block absolute inset-x-0 -inset-y-2 bg-gradient-to-tr from-blue-500 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              
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
                  <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-blue-400 uppercase leading-none block">
                    PROFESSOR ESPECIALISTA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text/Bio block on the right */}
          <div className="col-span-1 md:col-span-8 flex flex-col justify-center space-y-4">
            <div className="space-y-1 text-center md:text-left">
              <span className={`text-[10px] font-mono tracking-widest uppercase font-bold px-3 py-1 rounded-full border ${
                isDarkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-500/5 text-blue-700 border-blue-500/15'
              }`}>
                Minha missão pedagógica
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
                A tecnologia não é apenas sobre ensinar código, é sobre dar vida a ideias. Atuo há anos unindo o universo da Infraestrutura DevOps, Robótica e Softwares para construir um <strong>ecossistema de educação prática e tangível</strong>.
              </p>
              <p>
                Minha missão clara é transformar conceitos muitas vezes massivos e abstratos em plataformas ou robôs vivos na sala de aula. <strong>Educar com as mãos na massa</strong> ajuda meus alunos a entenderem não apenas o &quot;como&quot;, mas principalmente o &quot;porquê&quot; da tecnologia e de seu aprendizado contínuo.
              </p>
              <p>
                Acredito que através da Internet das Coisas (IoT) e da Robótica Educacional, quebramos a barreira do código abstrato e fortalecemos a confiança com a prova em laboratório do <strong>pensamento funcionando na realidade</strong>.
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
                        isDarkMode ? 'bg-[#1e2733] text-blue-400' : 'bg-slate-200/50 text-blue-700'
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
                        <span className="text-[8px] font-mono text-blue-500 uppercase font-black">Copiar</span>
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
                        isDarkMode ? 'bg-[#1e2733] text-blue-400' : 'bg-slate-200/50 text-blue-700'
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
      </motion.div>

      {/* Introduction Card with Photo & Quick Actions */}
      <div className="flex justify-center mb-8">
        <div className={`p-1 rounded-2xl border flex gap-1 ${
          isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-100 border-black/5'
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
                    ? 'bg-blue-500/10 border-0 text-blue-400 shadow-lg' 
                    : 'bg-white border text-blue-700 border-slate-200 shadow-md'
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
              isDarkMode ? 'bg-slate-900/90 border-white/5' : 'bg-slate-50 border-black/10'
            }`}>
              
              {/* Year Selection sidebar (col-span-4) */}
              <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 pr-1 border-b lg:border-b-0 lg:border-r border-dashed border-black/10 dark:border-white/5">
                <span className={`text-[9px] font-mono font-bold tracking-[0.2em] uppercase block mb-2 w-full text-left hidden lg:block ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-700'
                }`}>
                  Fases da Carreira
                </span>
                
                {timelineData.map((data) => (
                  <button
                    key={data.year}
                    onClick={() => {
                      setActiveYear(data.year);
                      setViewedYears(prev => {
                        const next = new Set(prev);
                        next.add(data.year);
                        return next;
                      });
                    }}
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
                      isDarkMode ? 'bg-[#151c24] text-blue-400' : 'bg-slate-200 text-blue-700'
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
                            ? 'bg-slate-800 border-white/5 text-blue-300' 
                            : 'bg-white border-slate-200 text-blue-700 shadow-sm'
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
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className={`rounded-3xl border p-6 flex flex-col justify-between transition-all group hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-slate-900/90 border-white/5 hover:border-blue-500/20 hover:bg-[#121922]' 
                      : 'bg-white border-black/10 hover:border-blue-500/30'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className={`p-3 rounded-2xl transition-all group-hover:scale-110 ${
                        isDarkMode ? 'bg-[#161c24] text-blue-400 border border-white/5' : 'bg-slate-100 text-blue-700 border border-slate-200'
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
                    isDarkMode ? 'text-blue-400' : 'text-blue-700 font-semibold'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 w-full">
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
                    className={`rounded-[1.25rem] md:rounded-[1.5rem] border p-4 flex flex-col justify-start transition-all cursor-pointer overflow-hidden ${
                      isExpanded 
                        ? (isDarkMode ? stat.activeColor : 'bg-white border-none shadow-xl ring-2 ring-blue-500/20')
                        : (isDarkMode ? 'bg-slate-900/90 border-white/5 hover:border-blue-500/30' : 'bg-white border-black/10 hover:shadow-lg hover:border-blue-500/30')
                    }`}
                  >
                    <motion.div layout className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`inline-block py-[0.15rem] px-2 text-[8px] sm:text-[9px] font-mono font-bold rounded flex-shrink-0 uppercase tracking-widest ${stat.color}`}>
                          {isExpanded ? 'DETALHES' : 'ESTATÍSTICA'}
                        </span>
                        <ChevronRight size={12} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90 text-blue-500' : 'text-slate-400'}`} />
                      </div>
                      <span className={`block text-xl md:text-2xl font-extrabold tracking-tight font-serif italic ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {stat.value}
                      </span>
                      <h5 className={`font-mono text-[9px] uppercase tracking-wider font-extrabold ${
                        isDarkMode ? 'text-white/50' : 'text-slate-500'
                      }`}>
                        {stat.label}
                      </h5>
                    </motion.div>
                    
                    <motion.div layout>
                      <p className={`text-[10px] font-sans normal-case tracking-normal leading-relaxed mt-2 pt-2 border-t border-black/5 dark:border-white/5 ${
                        isDarkMode ? 'text-white/50' : 'text-slate-500'
                      }`}>
                        {stat.info}
                      </p>
                    </motion.div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="flex flex-col gap-3 overflow-hidden"
                        >
                          <div className="space-y-2 mt-2 pt-3 border-t border-dashed border-black/10 dark:border-white/10">
                            {stat.points.map((point, idx) => (
                              <div key={idx} className="flex gap-2 items-center text-[9px] sm:text-[10px]">
                                <div className={`w-1 h-1 rounded-full shrink-0 ${stat.color.split(' ')[0]}`} />
                                <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{point}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="w-full h-1 mt-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
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
              <div className="flex items-center justify-center">
                <Flashcard 
                  id="life"
                  question="Por que ensinar tecnologia?" 
                  answer="Porque a tecnologia sem didática afasta as pessoas. Ensinar é democratizar: significa pegar aquilo que parece mágica ou inacessível, e mostrar que é matemática, lógica e paciência." 
                  isDarkMode={isDarkMode} 
                  className="!m-0"
                />
              </div>
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
  isDarkMode,
  isActiveSection
}: { 
  url: string; 
  title: string; 
  isMaximized?: boolean; 
  onToggleMaximize?: () => void; 
  isDarkMode: boolean;
  isActiveSection?: boolean;
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isMaximized) {
      setShouldLoad(true);
      return;
    }
    
    if (isActiveSection) {
      const timer = setTimeout(() => setShouldLoad(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isMaximized, isActiveSection]);

  return (
  <div className={`w-full flex-1 h-full flex flex-col min-h-0 relative`}>
    {isMaximized ? (
      <>
        {onToggleMaximize && (
          <button
            onClick={onToggleMaximize}
            className="absolute top-4 right-4 z-50 p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all duration-250 shadow-2xl border border-blue-400/20 cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center"
            title="Restaurar Layout"
          >
            <Minimize2 size={16} />
          </button>
        )}
        <div className="w-full h-full bg-white overflow-hidden relative">
          {shouldLoad && (
            <iframe 
              src={url} 
              className="w-full h-full border-0 m-0 p-0" 
              title={title}
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          )}
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
                className="uppercase tracking-widest font-mono font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1.5 transition-all bg-blue-500/10 rounded-full border border-blue-500/20 cursor-pointer hover:bg-blue-500/20 text-[9.5px] px-3 py-1.2"
              >
                Maximizar <Maximize2 size={11} />
              </button>
            )}
          </div>
        </div>
        <div className={`flex-1 w-full bg-white rounded-2xl border overflow-hidden shadow-2xl relative min-h-0 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
          {shouldLoad && (
            <iframe 
              src={url} 
              className="w-full h-full border-0" 
              title={title}
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          )}
        </div>
      </>
    )}
  </div>
  );
};

const GamificationSection = ({
  isDarkMode,
  achievements
}: {
  isDarkMode: boolean;
  achievements: { easterEgg: boolean; nightOwl: boolean; sysadmin: boolean; inquisitive: boolean; computational: boolean; robotics: boolean };
}) => {
  const [expandedHint, setExpandedHint] = useState<string | null>(null);
  const [shakeBadgeId, setShakeBadgeId] = useState<string | null>(null);
  const [activeSparklesBadge, setActiveSparklesBadge] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<{ id: number; tx: number; ty: number; size: number; color: string }[]>([]);

  // Synth sounds
  const playLockSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.21);
    } catch (e) {}
  };

  const playUnlockSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const playTone = (freq: number, start: number, duration: number, type: 'triangle' | 'sine' = 'triangle') => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Play 8-bit sweet arpeggio
      playTone(523.25, 0, 0.12);     // C5
      playTone(659.25, 0.08, 0.12);    // E5
      playTone(783.99, 0.16, 0.12);    // G5
      playTone(1046.50, 0.24, 0.28, 'sine');  // C6
    } catch (e) {}
  };

  const triggerSparkles = (badgeId: string) => {
    setActiveSparklesBadge(badgeId);
    const colors = ['#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#f59e0b', '#3b82f6', '#ec4899'];
    const newSparkles = Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.4;
      const distance = 50 + Math.random() * 60;
      return {
        id: Math.random() + i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size: 5 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });
    setSparkles(newSparkles);
  };

  const handleBadgeClick = (badgeId: string, unlocked: boolean) => {
    if (unlocked) {
      playUnlockSound();
      triggerSparkles(badgeId);
    } else {
      playLockSound();
      setShakeBadgeId(badgeId);
      setTimeout(() => setShakeBadgeId(null), 500);
      setExpandedHint(prev => prev === badgeId ? null : badgeId);
    }
  };

  const badges = [
    {
      id: 'easterEgg',
      title: 'Easter Egg de Perfil',
      icon: '✨',
      desc: 'Recebido ao clicar na foto de perfil de Lucas 5 vezes seguidas.',
      hint: 'A foto do Lucas na página de "Início" tem efeitos interativos tridimensionais (3D). Experimente clicar rapidamente nela por 5 vezes consecutivas para ver o que acontece!',
      unlocked: achievements.easterEgg
    },
    {
      id: 'nightOwl',
      title: 'Modo Notívago',
      icon: '🌙',
      desc: 'Recebido ao alternar para o Modo Escuro.',
      hint: 'Como bom desenvolvedor de redes, Lucas passa a maior parte de suas noites programando. Ative o Modo Escuro usando o botão de Sol/Lua no canto superior do site ou no menu de navegação!',
      unlocked: achievements.nightOwl
    },
    {
      id: 'sysadmin',
      title: 'SysAdmin Técnico',
      icon: '💻',
      desc: 'Recebido ao consertar o simulador de roteador na aba TI.',
      hint: 'Vá na seção "TI & Técnico". Lá existe um console simulando um Roteador de Borda travado por tráfego excessivo. Digite comandos de redes legítimos para restabelecer a conectividade (dica: digite "help" e explore!)',
      unlocked: achievements.sysadmin
    },
    {
      id: 'inquisitive',
      title: 'Mente Inquisitiva',
      icon: '💡',
      desc: 'Descoberto por virar todas as pílulas de conhecimento do site.',
      hint: 'Existem diversos cartões interativos (Flashcards) de conceitos rápidos espalhados pelas seções (como Início, Robótica, Computacional, etc.). Vá até cada página e clique sobre todos eles para virá-los!',
      unlocked: achievements.inquisitive
    },
    {
      id: 'computational',
      title: 'Engenheiro Lógico',
      icon: '🧠',
      desc: 'Desbloqueado ao concluir as instruções do Laboratório Prático Computacional.',
      hint: 'Vá na seção "Pensamento Computacional" e tente guiar o robô até o bloco verde de sucesso, utilizando lógica de programação.',
      unlocked: achievements.computational
    },
    {
      id: 'robotics',
      title: 'Mestre da Robótica',
      icon: '🤖',
      desc: 'Concedido ao ativar e executar funções no Módulo de Hardware.',
      hint: 'Acesse a seção de "Robótica Educacional" e ligue o protótipo lógico para simulação real-time.',
      unlocked: achievements.robotics
    }
  ];

  const unlockedCount = Object.values(achievements).filter(Boolean).length;
  
  // Progress/XP configuration
  const getProgressDetails = () => {
    const xpPercent = Math.min(100, Math.round((unlockedCount / 6) * 100));
    let rank = 'Iniciante Curioso';
    let title = 'Nível 0: Visitante Solitário';
    let detailsStr = 'Explore o portfólio pedagógico para destravar o seu potencial e obter seus badges!';
    let bgGradient = 'from-slate-500/10 to-slate-600/5 border-slate-500/20';
    let textAccent = 'text-slate-400';
    let fillBar = 'bg-slate-400';

    if (unlockedCount === 1) {
      rank = 'Recruta da TI';
      title = 'Nível 1: Aprendiz Curioso';
      detailsStr = 'Incrível! Você já encontrou o primeiro segredo tecnológico do site!';
      bgGradient = 'from-blue-600/10 to-sky-500/5 border-blue-500/25';
      textAccent = 'text-sky-400';
      fillBar = 'bg-sky-400 shadow-[0_0_10px_#0ea5e9]';
    } else if (unlockedCount === 2) {
      rank = 'Analista Desbravador';
      title = 'Nível 2: Desbravador Tecnológico';
      detailsStr = 'O caminho se desenrola! As metodologias ativas estão se revelando.';
      bgGradient = 'from-indigo-600/10 to-violet-500/5 border-violet-500/25';
      textAccent = 'text-violet-400';
      fillBar = 'bg-violet-500 shadow-[0_0_10px_#8b5cf6]';
    } else if (unlockedCount === 3) {
      rank = 'Criador Lógico';
      title = 'Nível 3: Construtor de Projetos';
      detailsStr = 'Metade do caminho! Sensores, código e hardware não são mais segredos.';
      bgGradient = 'from-violet-600/10 to-fuchsia-500/5 border-fuchsia-500/25';
      textAccent = 'text-fuchsia-400';
      fillBar = 'bg-fuchsia-500 shadow-[0_0_10px_#d946ef]';
    } else if (unlockedCount === 4) {
      rank = 'Especialista em Dados';
      title = 'Nível 4: Arquiteto Computacional';
      detailsStr = 'Poder de abstração alto. Rumo ao domínio prático da engenharia de redes.';
      bgGradient = 'from-purple-600/10 to-purple-500/5 border-purple-500/25';
      textAccent = 'text-purple-400';
      fillBar = 'bg-purple-500 shadow-[0_0_10px_#a855f7]';
    } else if (unlockedCount === 5) {
      rank = 'Administrador de Infraestrutura';
      title = 'Nível 5: SysAdmin Técnico';
      detailsStr = 'Excepcional! Apenas um mistério o separa do título de Mestre Tech!';
      bgGradient = 'from-pink-600/10 to-rose-500/5 border-rose-500/25';
      textAccent = 'text-pink-400';
      fillBar = 'bg-pink-500 shadow-[0_0_10px_#ec4899]';
    } else if (unlockedCount === 6) {
      rank = 'Mestre Admin Supremo';
      title = 'Nível 6: Mestre Hacker Educacional';
      detailsStr = 'SENSACIONAL! Você desvendou 100% das trilhas acadêmicas pedagógicas!';
      bgGradient = 'from-blue-500/15 via-amber-500/5 to-blue-500/15 border-amber-500/40';
      textAccent = 'text-amber-400 animate-pulse';
      fillBar = 'bg-gradient-to-r from-blue-400 to-amber-400 shadow-[0_0_15px_#f59e0b]';
    }

    return { xpPercent, rank, title, detailsStr, bgGradient, textAccent, fillBar };
  };

  const progress = getProgressDetails();

  return (
    <div className="flex flex-col pt-6 md:pt-16 pb-12 overflow-y-auto w-full max-w-6xl mx-auto px-4 md:px-6">
      
      {/* Title & Flashcard Header */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6 w-full text-center md:text-left">
        <div>
          <span className="px-3 py-1 text-[10px] font-mono rounded-full font-bold uppercase tracking-widest bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-3 inline-block">
            SISTEMA GAMIFICADO
          </span>
          <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-3 italic font-serif ${isDarkMode ? 'text-white' : 'text-black'}`}>Conquistas</h2>
          <p className={`max-w-xl uppercase text-[10px] sm:text-[11px] tracking-[0.2em] font-mono font-bold ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            Metodologias Ativas & Engajamento do Aluno
          </p>
        </div>
        
        <Flashcard 
          id="gamification"
          question="Diferença de RAM e HD?" 
          answer="A RAM é a sua 'Mesa de Trabalho' (rápida, pequena, apaga). O HD/SSD é o seu 'Arquivo' (demora, guarda tudo). O processador precisa trazer os dados do Arquivo para a Mesa!" 
          isDarkMode={isDarkMode} 
          className="!w-44 !h-44 sm:!w-48 sm:!h-48 shrink-0 !m-0"
        />
      </motion.div>

      {/* NEW: XP & Level Progression System Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`w-full p-5 sm:p-6 mb-8 rounded-3xl border ${progress.bgGradient} transition-all duration-500 flex flex-col md:flex-row items-center gap-6 justify-between`}
      >
        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-2 justify-center md:justify-start">
            <span className={`text-lg font-mono font-black ${progress.textAccent}`}>
              {progress.title}
            </span>
            <span className={`hidden sm:inline text-xs ${isDarkMode ? 'text-white/20' : 'text-black/20'}`}>|</span>
            <span className={`text-xs uppercase font-mono tracking-widest font-bold px-2 py-0.5 rounded bg-black/20 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Rank: {progress.rank}
            </span>
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-slate-600'} mb-4 max-w-2xl`}>
            {progress.detailsStr}
          </p>
          
          {/* Progress Bar Track */}
          <div className="w-full h-3 rounded-full bg-black/20 overflow-hidden relative border border-white/5 p-0.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress.xpPercent}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`h-full rounded-full ${progress.fillBar}`}
            />
          </div>
          
          <div className="flex justify-between items-center mt-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <span>0% (EXPLORADOR)</span>
            <span className="font-bold text-blue-500">{progress.xpPercent}% COMPLETO</span>
            <span>100% (MESTRE ADMIN)</span>
          </div>
        </div>

        <div className={`p-4 rounded-2xl flex flex-col items-center justify-center border text-center ${isDarkMode ? 'bg-[#0a0f13] border-white/5' : 'bg-white/80 border-black/5'} shrink-0 min-w-32`}>
          <div className="relative">
            <Trophy className={`w-8 h-8 mb-1 ${unlockedCount === 6 ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-bounce' : 'text-slate-500'}`} />
            {unlockedCount < 6 && (
              <span className="absolute -top-1 -right-1 text-xs">🔒</span>
            )}
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#10b981]">CONQUISTAS</span>
          <span className={`text-xl font-mono font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{unlockedCount}/6</span>
        </div>
      </motion.div>

      {/* Information Helper Header */}
      <div className={`text-xs font-mono mb-4 px-2 tracking-wide flex items-center gap-1.5 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
        <Sparkles size={12} className="text-blue-500 animate-pulse" />
        <span>Instruções: Cliques nos badges revelam dicas e reproduzem sons exclusivos retrôs.</span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 w-full max-w-full">
        {badges.map((badge, i) => (
          <div key={badge.id} className="flex flex-col min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                x: shakeBadgeId === badge.id ? [-6, 6, -4, 4, -2, 2, 0] : 0
              }}
              transition={{ 
                opacity: { delay: i * 0.1 },
                y: { delay: i * 0.1 },
                x: { duration: 0.4 }
              }}
              onClick={() => handleBadgeClick(badge.id, badge.unlocked)}
              className={`relative p-5 rounded-3xl border text-center transition-all duration-300 overflow-hidden flex flex-col items-center min-h-[210px] cursor-pointer select-none group min-w-0 ${
                badge.unlocked 
                  ? (isDarkMode ? 'bg-slate-900 border-blue-500/30 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-blue-50/50 border-blue-200 hover:border-blue-300 hover:shadow-lg')
                  : (isDarkMode ? 'bg-black/20 border-white/5 opacity-60 hover:opacity-100 hover:border-white/10' : 'bg-black/5 border-black/5 opacity-60 hover:opacity-100 hover:border-slate-300')
              }`}
            >
              {/* Confetti particles inside the card */}
              {activeSparklesBadge === badge.id && sparkles.map((spark) => (
                <motion.div
                  key={spark.id}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: spark.tx, y: spark.ty, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: spark.size,
                    height: spark.size,
                    backgroundColor: spark.color,
                    left: '50%',
                    top: '40%',
                    marginLeft: -spark.size / 2,
                    marginTop: -spark.size / 2,
                    zIndex: 50,
                    boxShadow: `0 0 10px ${spark.color}`
                  }}
                />
              ))}

              {badge.unlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0 pointer-events-none" />
              )}
              
              <div className={`text-4xl sm:text-5xl mb-4 relative z-10 transition-transform duration-500 group-hover:scale-115 ${badge.unlocked ? 'scale-110 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-slate-400 group-hover:rotate-12'}`}>
                {badge.unlocked ? badge.icon : '🔒'}
              </div>
              
              <h3 className={`text-base sm:text-lg font-bold mb-2 font-serif tracking-tight truncate w-full group-hover:text-blue-500 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {badge.title}
              </h3>
              
              <p className={`text-[10px] sm:text-xs leading-relaxed mb-4 flex-grow ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {badge.desc}
              </p>
              
              {badge.unlocked ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap">
                  <Unlock size={10} />
                  Desbloqueado
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-500/10 text-slate-400 rounded-full text-[9px] sm:text-[10px] font-mono font-medium uppercase tracking-widest whitespace-nowrap group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors">
                  <Lock size={10} />
                  Ver Dica
                </div>
              )}
            </motion.div>

            {/* EXPANDING HINT BAR FOR EXPLAINER SCENARIO */}
            <AnimatePresence>
              {expandedHint === badge.id && !badge.unlocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-2 p-4 rounded-2xl text-[11px] leading-relaxed font-mono border ${
                    isDarkMode 
                      ? 'bg-amber-500/5 border-amber-500/20 text-amber-200/90' 
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  <p className="font-bold flex items-center gap-1 mb-1 text-xs">
                    <Sparkles size={12} className="text-amber-500" /> QUEST DE DESBLOQUEIO:
                  </p>
                  {badge.hint}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* SPECIAL UNLOCKED GALA reward section */}
      <AnimatePresence>
        {unlockedCount === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className={`mt-10 p-6 rounded-3xl border text-center relative overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-950/40 via-amber-950/30 to-blue-950/40 border-amber-500/40' 
                : 'bg-gradient-to-r from-blue-50 via-amber-50 to-blue-50 border-amber-300'
            }`}
          >
            {/* Animated gold star highlights */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mb-4 border border-amber-500/40 animate-pulse">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black italic font-serif text-amber-500 tracking-tight mb-2">
                🏆 CERTIFICADO HACKER SUPREMO DE METODOLOGIAS ATIVAS
              </h3>
              
              <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed mb-6 ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`}>
                Parabéns! Você demonstrou uma curiosidade técnica excepcional e conquistou todos os badges de engajamento do site! Seu nome foi inserido no log de segurança de administradores superiores.
              </p>

              {/* Secret console command */}
              <div className="p-4 rounded-xl font-mono text-xs max-w-md w-full bg-black/60 border border-amber-500/30 text-blue-400 text-left relative group">
                <div className="absolute top-2 right-2 text-[9px] uppercase font-bold text-amber-500 bg-amber-500/10 p-1 rounded">
                  COMANDO SUPREMO
                </div>
                <p className="text-slate-500 text-[10px] mb-1"># Execute isto no simulador Lucas Leniar Shell (LL-SH):</p>
                <code className="text-amber-300 font-bold select-all bg-black px-1.5 py-0.5 rounded">sudo init-matrix-pedagogico</code>
              </div>

              <div className="mt-6 text-[10px] uppercase font-mono tracking-widest text-blue-500 font-bold">
                CRACHÁ DE GRADUAÇÃO ATIVA ASSINADO: L. L. 2026
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectsSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to Lucas Leniar Dev Shell (LL-SH) v2.5.1',
    'Copyright (c) 2026 Lucas Leniar. Todos os direitos reservados.',
    'Status: ACESSO AUTORIZADO // MODO SANDBOX ATIVO',
    'Digite "help" para listar as ferramentas disponíveis.',
    ''
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const projects: { title: string; date: string; role: string; desc: string; tags: string[]; image: string; link?: string }[] = [
    {
      title: "Cívico Terminal",
      date: "2023 - Presente",
      role: "Criador & Mantenedor",
      desc: "Automações em Shell Script para provisionamento e auditoria ágil em sistemas Linux, com foco em segurança (Hardening) e infraestrutura como código.",
      tags: ["Linux", "Bash", "Security", "Open Source"],
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Robótica Educacional",
      date: "2021 - 2024",
      role: "Professor Orientador",
      desc: "Inserção do Pensamento Computacional no ensino através de kits de robótica e programação em blocos e C++ (Arduino/ESP32).",
      tags: ["Arduino", "ESP32", "Educação", "Hardware"],
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "NOC Acadêmico",
      date: "2020 - 2022",
      role: "Engenheiro de Redes",
      desc: "Implementação de um Centro de Operações de Rede para fins didáticos, ensinando monitoramento ativo (Zabbix) a estudantes de TI.",
      tags: ["Redes", "Zabbix", "Infraestrutura"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Sistemas Web Fullstack",
      date: "2018 - Presente",
      role: "Engenheiro de Software",
      desc: "Arquitetura e desenvolvimento de sistemas sob medida. Foco em interfaces limpas (React) e integrações seguras de APIs (Node.js).",
      tags: ["React", "TypeScript", "Node.js"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
          '  sudo <cmd>       Executar comando com privilégios de superusuário',
          '  clear            Limpar a tela do terminal console'
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'ls':
        response = [
          'civico.sh       wallpaper.sh       ponto.sh'
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
      case 'sudo': {
        const fullArg = parts.slice(1).join(' ').trim();
        if (fullArg === 'init-matrix-pedagogico') {
          response = [
            '🔓 [SUDO] PRIVILÉGIOS DE SUPERUSUÁRIO AUTORIZADOS... ACESSANDO NÚCLEO',
            '⚡ INICIANDO COMPILADOR DA MATRIX PEDAGÓGICA...',
            '------------------------------------------------------------------',
            ' 0 1 0 0 1 1 0 0   0 1 0 1 0 1 0 1   0 1 0 0 0 0 1 1   0 1 0 0 1 1 0 0',
            '   L (76)            U (85)            C (67)            A (65)',
            '------------------------------------------------------------------',
            '🧬 [OK] Injetando Metodologias Ativas de Engajamento Prático...',
            '💻 [OK] Ativando Protocolos de Automação de Linux Mint & Debian...',
            '🔥 [OK] Conectando mentes dos estudantes aos labs da UTFPR...',
            '✨ [OK] Sincronização pedagógica estabelecida com o Mestre de Redes!',
            '------------------------------------------------------------------',
            '🏆 PARABÉNS HACKER SUPREMO! A MATRIX FOI REINICIADA COM SUCESSO!',
            '   Você concluiu a jornada de gamificação do Professor Lucas Leniar!',
            '   Status atual: ULTRA-ADMINISTRADOR // MESTRE DE REDES COROADO 👑'
          ];
        } else if (!fullArg) {
          response = ['Erro: Especifique a instrução para sudo (Ex: sudo init-matrix-pedagogico)'];
        } else {
          response = [
            `[SUDO Erro] Comando "${fullArg}" não pode ser executado como superusuário.`
          ];
        }
        break;
      }
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
        } else if (arg === 'ponto.sh') {
          response = [
            '#!/bin/bash',
            '# Script de Gerenciamento de Registro de Ponto',
            '# Autor: Professor Lucas Leniar',
            'echo "=> Sincronizando relógio de ponto com NTP UTFPR..."',
            'sudo ntpdate -u gps.ntp.br',
            'echo "=> Serviço de controle iniciado!"'
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
        } else if (arg === 'ponto.sh') {
          response = [
            '[LL-SH] Executando ./ponto.sh ...',
            '[INFO] Testando handshakes de rede...',
            '[SUCCESS] Sistema autenticado e ponto sincronizado!'
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

  return (
    <div className="flex flex-col pt-6 md:pt-16 pb-12 max-w-6xl w-full mx-auto px-4 md:px-6">
      
      {/* Block Header */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10 text-center md:text-left">
        <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 italic font-serif ${isDarkMode ? 'text-white' : 'text-black'}`}>Portfólio de Projetos</h2>
        <p className={`max-w-xl uppercase text-[10px] sm:text-[11px] tracking-[0.2em] font-mono font-bold ${isDarkMode ? 'text-blue-400' : 'text-black/40'}`}>
          Exploração visual dos meus trabalhos integrando tecnologia, educação e infraestrutura.
        </p>
      </motion.div>

      {/* Main Grid: Projects on Left (Grid 2 cols), Terminal Console on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        {/* Left Column (7 cols): The 4 projects in a 2x2 grid */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex justify-between items-center mb-1">
            <h3 className={`text-sm font-mono uppercase tracking-widest font-bold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              📂 Projetos Ativos ({projects.length})
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold border border-blue-500/10">
              Grade 2x2
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`group rounded-2xl overflow-hidden border flex flex-col h-full transition-all duration-300 hover:shadow-lg ${
                  isDarkMode 
                    ? 'bg-[#11181c] border-white/5 hover:border-blue-500/30' 
                    : 'bg-white border-black/5 hover:border-black/10'
                }`}
              >
                {/* Compact Image Header */}
                <div className="relative h-36 w-full overflow-hidden bg-black flex items-center justify-center shrink-0">
                  <img 
                    src={project.image} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-102 transition-all duration-500"
                    alt={project.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-[#11181c] via-transparent to-transparent' : 'bg-gradient-to-t from-white via-transparent to-transparent'}`}></div>
                </div>

                {/* Content Body */}
                <div className="flex flex-col p-4 flex-grow relative z-10 -mt-6">
                  <div className={`text-[9px] font-mono tracking-widest font-bold px-2 py-1 rounded-full border mb-2 w-fit inline-flex md:backdrop-blur-md shadow-sm ${
                    isDarkMode ? 'bg-black/50 text-white/90 border-white/15' : 'bg-white/80 text-black/90 border-black/10'
                  }`}>
                    {project.date}
                  </div>
                  
                  <h4 className={`text-base font-bold tracking-tight mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-700'} transition-colors truncate`}>
                    {project.title}
                  </h4>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-500 mb-2">
                    {project.role}
                  </p>
                  
                  <p className={`text-[12px] leading-relaxed mb-4 flex-grow line-clamp-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                    {project.tags.slice(0, 3).map((tag, j) => (
                      <span key={j} className={`text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-black/5 text-slate-600'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest font-mono transition-colors w-fit pt-2.5 border-t border-dashed w-full ${
                        isDarkMode ? 'border-white/10 text-blue-400 hover:text-blue-300' : 'border-black/5 text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      Visitar <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform animate-pulse" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Embedded Bash Terminal & automation Scripts */}
        <div className="lg:col-span-5 flex flex-col min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h3 className={`text-sm font-mono uppercase tracking-widest font-bold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              💻 Projeto Integrado: LL-SH TERMINAL
            </h3>
          </div>

          <div className="rounded-3xl border border-[#2d3748] bg-[#0c1015] shadow-2xl p-4 md:p-5 relative overflow-hidden flex flex-col min-h-[460px] max-h-[580px]">
            {/* Terminal Top Window Frame bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500/80" />
                <span className="text-[10px] tracking-wider font-mono text-white/40 ml-3 truncate max-w-[130px] md:max-w-none">
                  lucas@portfolio-sh:~
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-blue-500" />
                <span className="text-[9px] font-mono uppercase font-bold text-white/30">
                  Superuser
                </span>
              </div>
            </div>

            {/* AUTHORIZED WORKSPACE */}
            <div className="flex-grow flex flex-col overflow-hidden">
              {/* TERMINAL ACTIVE WORKSPACE */}
              <div className="flex-grow flex flex-col overflow-hidden">
                <div 
                  className="flex-grow overflow-y-auto font-mono text-xs text-blue-150 space-y-1 mb-4 pr-1 scrollbar-thin scrollbar-thumb-white/5 custom-scroll text-left select-text"
                  ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }}
                >
                  {terminalHistory.map((line, idx) => (
                    <div key={idx} className="whitespace-pre-wrap leading-relaxed hover:bg-white/[0.03] px-1 py-0.5 rounded transition-all break-all text-left">
                      {line.startsWith('lucas@portfolio-sh:~$') ? (
                        <span><span className="text-blue-400 font-bold">lucas@portfolio-sh:~$</span> {line.replace('lucas@portfolio-sh:~$ ', '')}</span>
                      ) : line.startsWith('Erro:') ? (
                        <span className="text-red-400">{line}</span>
                      ) : line.startsWith('[SUCCESS]') ? (
                        <span className="text-blue-300 font-bold">{line}</span>
                      ) : line.startsWith('🔓') || line.startsWith('🏆') ? (
                        <span className="text-amber-400 font-bold">{line}</span>
                      ) : line.startsWith('🧬') || line.startsWith('💻') ? (
                        <span className="text-blue-400 font-medium">{line}</span>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1 border-t border-white/10 pt-3 mt-auto shrink-0 select-none">
                  <span className="text-xs font-mono text-blue-400 font-bold shrink-0">lucas@portfolio-sh:~$</span>
                  <input
                    type="text"
                    autoComplete="off"
                    spellCheck="false"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="help, whoami, neofetch, run civico.sh..."
                    className="flex-1 bg-transparent border-0 font-mono text-xs text-blue-150 focus:outline-none focus:ring-0 p-0 placeholder-blue-100/10 caret-blue-400"
                  />
                  <span className="animate-pulse w-1.5 h-3.5 bg-blue-400 inline-block shrink-0" />
                </form>
              </div>
            </div>
          </div>
          <div className="mt-2 text-center text-[10px] font-mono text-slate-500">
            Dica: Digite <code className="text-amber-500 select-all font-bold">sudo init-matrix-pedagogico</code> no terminal para destravar o mistério supremo!
          </div>
        </div>

      </div>
    </div>
  );
};

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
  const [authError, setAuthError] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to Lucas Leniar Dev Shell (LL-SH) v2.5.1',
    'Copyright (c) 2026 Lucas Leniar. Todos os direitos reservados.',
    'Status: ACESSO AUTORIZADO // MODO SANDBOX ATIVO',
    'Digite "help" para listar as ferramentas disponíveis.',
    ''
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const SH_FILES = [
    { name: 'civico.sh', url: 'https://lucasleniar.com.br/mint/civico.sh', description: 'Script para configuração do Civico no Mint' },
    { name: 'wallpaper.sh', url: 'https://lucasleniar.com.br/mint/wallpaper.sh', description: 'Script para configuração do plano de fundo no Mint' },
    { name: 'ponto.sh', url: 'https://lucasleniar.com.br/mint/ponto.sh', description: 'Script de automação para o relógio de ponto no Mint' }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'lucas123') {
      setIsAuthorized(true);
      setAuthError('');
    } else {
      setAuthError('Senha incorreta. Use "lucas123".');
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    let response: string[] = [];

    const parts = cmd.split(' ');
    const baseCmd = parts[0].toLowerCase();
    const arg = parts[1];

    setTerminalHistory(prev => [...prev, `lucas@portfolio-sh:~$ ${cmd}`]);

    switch (baseCmd) {
      case 'help':
        response = [
          'Comandos disponíveis:',
          '  help             Exibe este menu de ajuda',
          '  clear            Limpa a tela do terminal',
          '  whoami           Exibe informações do usuário atual',
          '  neofetch         Exibe dados do sistema simulado',
          '  ls               Listar scripts automação disponíveis',
          '  cat [script]     Exibe o conteúdo do script',
          '  run [script]     Simula a execução do script',
          '  sudo init-matrix-pedagogico   Ativa o sistema de conquistas oculto!'
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'ls':
        response = [
          'civico.sh       wallpaper.sh       ponto.sh'
        ];
        break;
      case 'whoami':
        response = ['visitante@lucasleniar.com.br'];
        break;
      case 'neofetch':
        response = [
          '[32m   .-.   [0m  lucas@portfolio-sh',
          '[32m   oo|   [0m  ------------------',
          '[32m  /` `\\  [0m  OS: Mint Leniar OS v20.26',
          '[32m  |   |  [0m  Kernel: 5.15.0-leniar-generic',
          '[32m  |   |  [0m  Uptime: 2 days, 4 hours',
          '[32m  `---`  [0m  Shell: bash 5.1.16',
          '         CPU: Intel i7 Octa-Core (VIRTUAL)',
          '         Memory: 1024MB / 4096MB'
        ];
        break;
      case 'cat':
        if (!arg) {
          response = ['Uso: cat [arquivo.sh]'];
        } else if (arg === 'civico.sh') {
          response = [
            '#!/bin/bash',
            '# Script de Instalação e Configuração Cívico',
            '# Autor: Lucas Leniar',
            'echo "=> Iniciando configuração do ambiente Linux Mint..."',
            'sudo apt update && sudo apt install -y curl ufw rsync',
            'echo "=> Processo Concluído com Sucesso!"'
          ];
        } else if (arg === 'wallpaper.sh') {
          response = [
            '#!/bin/bash',
            '# Script de Automação de Plano de Fundo',
            'echo "=> Transferindo wallpaper de lucasleniar.com.br..."',
            'wget -P ~/.local/share/backgrounds/lucas/ https://lucasleniar.com.br/mint/wallpaper.png',
            'echo "=> Configurando plano de fundo..."'
          ];
        } else if (arg === 'ponto.sh') {
          response = [
            '#!/bin/bash',
            '# Script de Gerenciamento de Registro de Ponto',
            '# Autor: Professor Lucas Leniar',
            'echo "=> Sincronizando relógio de ponto com NTP UTFPR..."',
            'sudo ntpdate -u gps.ntp.br',
            'echo "=> Serviço de controle iniciado!"'
          ];
        } else {
          response = [`Erro: Arquivo "${arg}" não encontrado. Use o comando 'ls'`];
        }
        break;
      case 'run':
        if (!arg) {
          response = ['Uso: run [arquivo.sh]'];
        } else if (arg === 'civico.sh') {
          response = [
            '[LL-SH] Executando ./civico.sh ...',
            '[INFO] Verificando dependências de sistema...',
            '[SUCCESS] Sistema Cívico configurado e ativo!'
          ];
        } else if (arg === 'wallpaper.sh') {
          response = [
            '[LL-SH] Executando ./wallpaper.sh ...',
            '[INFO] Copiando arquivos para ~/.local/share/backgrounds/lucas/...',
            '[SUCCESS] Nova identidade visual aplicada com sucesso!'
          ];
        } else if (arg === 'ponto.sh') {
          response = [
            '[LL-SH] Executando ./ponto.sh ...',
            '[INFO] Testando handshakes de rede...',
            '[SUCCESS] Sistema autenticado e ponto sincronizado!'
          ];
        } else {
          response = [`Erro: Script "${arg}" não encontrado.`];
        }
        break;
      case 'sudo':
        if (arg === 'init-matrix-pedagogico') {
          response = [
            '🔑 [ROOT] ACESSO COMPILADOR ELEVADO CONCEDIDO!',
            '==================================================',
            '🔓 BADGE SECRETO DESBLOQUEADO: PENSAMENTO COMPUTACIONAL AVANÇADO!',
            '🏆 Você encontrou o Easter Egg supremo do Lucas Leniar.',
            'Obrigado pelo empenho em testar todas as funcionalidades do site!',
            '=================================================='
          ];
          setTimeout(() => {
            const event = new CustomEvent('unlock-achievement', { detail: 'computational' });
            window.dispatchEvent(event);
          }, 500);
        } else {
          response = ['[sudo] root password required. Usuário não tem privilégios ou comando incorreto.'];
        }
        break;
      default:
        response = [`Erro: Comando "${baseCmd}" não reconhecido. Digite "help" para ver comandos.`];
    }

    setTerminalHistory(prev => [...prev, ...response, '']);
    setTerminalInput('');
  };

  if (!isAuthorized) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full rounded-xl border border-[#2d3748] bg-[#0a0e11] shadow-[0_0_40px_rgba(16,185,129,0.1)] overflow-hidden font-mono"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-blue-500/80" />
            </div>
            <div className="text-[11px] text-white/40 tracking-widest flex items-center gap-2 max-w-[200px] truncate">
              <ShieldCheck size={12} className="text-blue-500" />
              <span>root@lucasleniar:~</span>
            </div>
          </div>
          
          <div className="p-6 md:p-10 space-y-6">
            <div className="space-y-1.5 text-sm md:text-base text-blue-400 text-left">
              <p>LL-SH (Lucas Leniar Secure Shell) v2.5.1</p>
              <p>Warning: Restricted Authorization Area.</p>
              <p className="text-white/60 pt-4 pb-2">Please authenticate to decrypt repository.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-blue-500 font-bold">Password:</span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-blue-300 font-mono text-lg placeholder-blue-990/50"
                  placeholder="type password..."
                  autoFocus
                />
              </div>
              
              {authError && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 font-mono text-sm"
                >
                  Action denied: {authError}
                </motion.p>
              )}
              <button type="submit" className="hidden" />
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex flex-col ${isMaximized ? 'pt-2' : 'pt-4 md:pt-3'}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl w-full mx-auto">
         <div className={`flex items-center justify-between px-1 ${isMaximized ? 'mb-4' : 'mb-6 md:mb-8'}`}>
            <div className="text-left">
              <h2 className={`font-bold tracking-tight italic font-serif leading-none mb-1 md:mb-2 ${isMaximized ? 'text-xl md:text-2xl' : 'text-2xl md:text-4xl'} ${isDarkMode ? 'text-white' : 'text-black'}`}>Arquivos SH</h2>
              <p className={`uppercase text-[9px] tracking-[0.2em] font-mono font-bold ${isDarkMode ? 'text-blue-400' : 'text-black/30'}`}>Repositório privado de automação e scripts Bash.</p>
            </div>
            <div className="flex gap-2">
              {onToggleMaximize && (
                <button
                  onClick={onToggleMaximize}
                  className={`uppercase tracking-widest font-mono font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1.5 transition-all bg-blue-500/10 rounded-full border border-blue-500/20 cursor-pointer hover:bg-blue-500/20 ${
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
                onClick={() => { setIsAuthorized(false); setPassword(''); }}
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

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {SH_FILES.map((file, i) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={`p-4 md:p-5 rounded-2xl border shadow-sm hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] transition-all group relative overflow-hidden flex flex-col ${
                  isDarkMode ? 'bg-slate-800 border-white/5 shadow-black/40' : 'bg-white border-black/[0.05]'
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <Terminal size={48} />
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col text-left">
                  <div className="mb-4 flex items-center justify-between">
                     <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-600">
                        <FileCode size={20} />
                     </div>
                     <span className={`text-[9px] font-mono font-bold uppercase transition-colors ${isDarkMode ? 'text-white/20' : 'text-black/20'}`}>.sh</span>
                  </div>
                  
                  <h3 className={`text-base font-bold mb-1 tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>{file.name}</h3>
                  <p className={`text-[11px] mb-4 font-sans normal-case leading-relaxed flex-1 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{file.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="space-y-1.5">
                      <label className={`text-[8.5px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-blue-400/60' : 'text-black/30'}`}>Download</label>
                      <div className="relative group/copy">
                        <code className={`block w-full p-2.5 border rounded-lg text-[9px] font-mono break-all pr-10 ${
                          isDarkMode ? 'bg-black/50 border-white/5 text-blue-400' : 'bg-black/[0.03] border-black/5 text-blue-700'
                        }`}>
                          wget {file.url.replace('https://', '')}
                        </code>
                        <button 
                          onClick={() => handleCopy(`wget ${file.url.replace('https://', '')}`, file.name + '-download')}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-colors ${
                            isDarkMode ? 'text-white/20 hover:text-blue-400' : 'text-black/20 hover:text-blue-600'
                          }`}
                        >
                          {copiedId === file.name + '-download' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border text-left ${
                      isDarkMode ? 'bg-blue-950/20 border-blue-900/45 text-blue-300' : 'bg-blue-50 border-blue-100 text-blue-800'
                    }`}>
                      <p className="text-[9px] leading-relaxed mb-1.5 normal-case font-sans tracking-normal">
                        Use o usuário <span className="font-bold underline">root</span>:
                      </p>
                      <div className="relative group/exec">
                        <code className={`block font-mono font-bold p-2.5 rounded-lg pr-8 text-[10px] ${
                          isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-900/10 text-blue-900'
                        }`}>
                          sudo bash {file.name}
                        </code>
                        <button 
                          onClick={() => handleCopy(`sudo bash ${file.name}`, file.name + '-exec')}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-colors ${
                            isDarkMode ? 'text-blue-300/30 hover:text-blue-400' : 'text-blue-800/30 hover:text-blue-900'
                          }`}
                        >
                          {copiedId === file.name + '-exec' ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-dashed border-blue-500/10">
                      <div className="flex items-center justify-between">
                        <label className={`text-[8.5px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-blue-400/80' : 'text-blue-700/80'}`}>💡 Execução Direta</label>
                      </div>
                      <div className="relative group/direct">
                        <code className={`block w-full p-2.5 border rounded-lg text-[9px] font-mono break-all pr-10 ${
                          isDarkMode ? 'bg-black/60 border-blue-500/15 text-blue-300' : 'bg-blue-50/40 border-blue-500/10 text-blue-800'
                        }`}>
                          wget -qO- {file.url.replace('https://', '')} | sudo bash
                        </code>
                        <button 
                          onClick={() => handleCopy(`wget -qO- ${file.url.replace('https://', '')} | sudo bash`, file.name + '-direct')}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-colors ${
                            isDarkMode ? 'text-white/20 hover:text-blue-400' : 'text-black/20 hover:text-blue-600'
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
                      className={`flex-1 text-center py-2.5 text-[9px] font-bold rounded-lg hover:bg-blue-600 transition-all uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer ${
                        isDarkMode ? 'bg-blue-600/20 hover:bg-blue-600 text-white' : 'bg-black text-white'
                      }`}
                    >
                       Baixar Script <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
         </div>

         <div className="mb-12 rounded-xl border border-[#2d3748] bg-[#0c1015] shadow-2xl p-5 md:p-6 relative group overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-blue-500/80" />
                <span className="text-[11px] tracking-widest font-mono text-white/40 ml-4 hidden md:block">lucas@portfolio-sh:~ (Simulador)</span>
              </div>
              <Terminal size={14} className="text-blue-500/50" />
            </div>

            <div 
              className="h-64 md:h-80 overflow-y-auto font-mono text-sm text-blue-100 space-y-1 mb-4 pr-2 selection:bg-blue-500/30 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent custom-scroll pr-1 pl-1 text-left select-text"
              ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }}
            >
              {terminalHistory.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed hover:bg-white/[0.04] px-1 py-0.5 rounded transition-colors break-all text-left">
                  {line.startsWith('lucas@portfolio-sh:~$') ? (
                    <span><span className="text-blue-400 font-bold">lucas@portfolio-sh:~$</span> {line.replace('lucas@portfolio-sh:~$ ', '')}</span>
                  ) : line.startsWith('Erro:') ? (
                    <span className="text-red-400">{line}</span>
                  ) : line.startsWith('[SUCCESS]') ? (
                    <span className="text-blue-300 font-bold">{line}</span>
                  ) : line.startsWith('🔓') || line.startsWith('🏆') ? (
                    <span className="text-amber-400 font-bold">{line}</span>
                  ) : line.startsWith('🧬') || line.startsWith('💻') ? (
                    <span className="text-blue-400 font-medium">{line}</span>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-white/10 pt-4 mt-2">
              <span className="text-sm font-mono text-blue-400 font-bold select-none shrink-0">lucas@portfolio-sh:~$</span>
              <input
                type="text"
                autoComplete="off"
                spellCheck="false"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Ex: help, whoami, run civico.sh..."
                className="flex-1 bg-transparent border-0 font-mono text-sm text-blue-100 focus:outline-none focus:ring-0 p-0 placeholder-blue-100/20 caret-blue-400"
              />
              <span className="animate-pulse w-2 h-4 bg-blue-400 inline-block shrink-0" />
            </form>
         </div>
      </motion.div>
    </div>
  );
};

const sectionIdToPlainId = (section: SectionId): string => {
  switch (section) {
    case 'home': return 'inicio';
    case 'life': return 'sobre';
    case 'methodology': return 'methodology';
    case 'projects': return 'projetos';
    case 'iot': return 'iot';
    case 'students': return 'alunos';
    case 'utfpr': return 'utfpr';
    case 'scripts': return 'scripts';
    default: return 'inicio';
  }
};

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [maximizedSection, setMaximizedSection] = useState<SectionId | null>(null);
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isIFrameSection = ['utfpr'].includes(activeSection);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('lucas-leniar-theme');
      if (saved !== null) return saved === 'true';
      return false; // Default to light mode for better legibility
    } catch {
      return false;
    }
  });

  const [achievements, setAchievements] = useState<{ easterEgg: boolean; nightOwl: boolean; sysadmin: boolean; inquisitive: boolean; computational: boolean; robotics: boolean }>(() => {
    try {
      const saved = localStorage.getItem('ll_achievements');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          easterEgg: !!parsed.easterEgg,
          nightOwl: !!parsed.nightOwl,
          sysadmin: !!parsed.sysadmin,
          inquisitive: !!parsed.inquisitive,
          computational: !!parsed.computational,
          robotics: !!parsed.robotics
        };
      }
    } catch (e) {}
    return { easterEgg: false, nightOwl: false, sysadmin: false, inquisitive: false, computational: false, robotics: false };
  });

  const [showToast, setShowToast] = useState<{ id: string; title: string; icon: string } | null>(null);
  const [showBugGame, setShowBugGame] = useState(false);

  const [flippedCards, setFlippedCards] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ll_flipped_cards');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const handleFlashcardFlip = (id: string) => {
    setFlippedCards(prev => {
      if (!prev.includes(id)) {
        const next = [...prev, id];
        localStorage.setItem('ll_flipped_cards', JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };

  useEffect(() => {
    if (flippedCards.length >= 5) {
      unlockAchievement('inquisitive');
    }
  }, [flippedCards]);

  const unlockAchievement = (id: keyof typeof achievements) => {
    setAchievements(prev => {
      if (!prev[id]) {
        console.log(`Unlocking achievement: ${String(id)}`);
        const badgeData = {
          easterEgg: { id: 'easterEgg', title: 'Easter Egg', icon: '✨' },
          nightOwl: { id: 'nightOwl', title: 'Notívago', icon: '🌙' },
          sysadmin: { id: 'sysadmin', title: 'SysAdmin', icon: '💻' },
          inquisitive: { id: 'inquisitive', title: 'Mente Inquisitiva', icon: '💡' },
          computational: { id: 'computational', title: 'Engenheiro Lógico', icon: '🧠' },
          robotics: { id: 'robotics', title: 'Mestre da Robótica', icon: '🤖' }
        }[id];
        setShowToast(badgeData);
        setTimeout(() => setShowToast(null), 4000);
        
        const next = { ...prev, [id]: true };
        localStorage.setItem('ll_achievements', JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };

  useEffect(() => {
    localStorage.setItem('lucas-leniar-theme', String(isDarkMode));
    if (isDarkMode) {
      unlockAchievement('nightOwl');
    }
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
    const sections = SECTIONS.map(s => document.getElementById(sectionIdToPlainId(s.id)));
    
    const observer = new IntersectionObserver((entries) => {
      if (isNavigatingRef.current) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const matchingSection = SECTIONS.find(s => sectionIdToPlainId(s.id) === entry.target.id);
          if (matchingSection) {
            setActiveSection(matchingSection.id);
            window.history.replaceState(null, '', '#' + sectionIdToPlainId(matchingSection.id));
          }
        }
      });
    }, {
      root: mainRef.current,
      threshold: 0.2, // Trigger when 20% of section is visible
      rootMargin: "-10% 0px -40% 0px"
    });

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Force scroll to top and reset hash on load
    setTimeout(() => {
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
      window.scrollTo(0, 0);
      if (window.location.hash !== '#inicio') {
        window.history.replaceState(null, '', '#inicio');
      }
    }, 50);

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const isNavigatingRef = useRef(false);

  const handleSectionChange = (section: SectionId) => {
    const id = sectionIdToPlainId(section);
    const element = document.getElementById(id);
    if (element) {
      isNavigatingRef.current = true;
      setActiveSection(section);
      window.history.replaceState(null, '', '#' + id);
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Unlock observer after smooth scroll completes (~1s)
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 1000);
    }
    setMaximizedSection(null);
  };

  const mainRef = useRef<HTMLElement>(null);
  const unlockedCount = Object.values(achievements).filter(Boolean).length;

  


  return (
    <FlashcardContext.Provider value={{ onFlip: handleFlashcardFlip }}>
      <div className={`flex flex-col md:flex-row h-screen w-full font-sans overflow-hidden transition-colors duration-300 selection:bg-blue-500/20 selection:text-blue-600 relative ${
          isDarkMode ? 'bg-[#111827] text-slate-100' : 'bg-white text-slate-800'
      }`}>
      {/* Background Decorators */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-1000">
        <NetworkBackground isDarkMode={isDarkMode} />
        <div className={`hidden md:block absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] top-[-10%] left-[-10%] opacity-30 md:opacity-40 transition-colors duration-1000 ${isDarkMode ? 'bg-blue-500/15' : 'bg-blue-400/20'}`} />
        <div className={`hidden md:block absolute w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] bottom-[-5%] right-[-5%] opacity-20 md:opacity-30 transition-colors duration-1000 ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'}`} />
      </div>

      {/* Mobile Header Bar */}
      {!maximizedSection && (
        <div className={`md:hidden flex items-center justify-between px-5 py-4 border-b shrink-0 z-30 transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-900 border-white/5 text-white' : 'bg-white border-black/5 text-black'
        }`}>
          <div>
            <h1 className={`text-md font-bold tracking-tighter ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>LUCAS LENIAR</h1>
            <p className={`text-[8px] uppercase tracking-[0.15em] font-mono leading-none ${isDarkMode ? 'text-blue-400/40' : 'text-black/40'}`}>Tecnologia & Educação Prática</p>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Navigation */}
      {!maximizedSection && (
        <nav className={`hidden md:flex w-20 md:w-64 border-r flex-col py-8 transition-all duration-300 z-20 shrink-0 ${
          isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-black/5'
        }`}>
          <div className="px-6 mb-12 hidden md:block">
            <h1 className={`text-xl font-bold tracking-tighter ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>LUCAS LENIAR</h1>
            <p className={`text-[10px] uppercase tracking-[0.2em] font-mono font-semibold ${isDarkMode ? 'text-blue-400/40' : 'text-black/40'}`}>Tecnologia & Educação Prática</p>
          </div>

          <div className="flex-1 space-y-2 px-3">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${sectionIdToPlainId(section.id)}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionChange(section.id);
                }}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                aria-current={activeSection === section.id ? 'page' : undefined}
                aria-label={`Menu: ir para seção ${section.label}`}
                className={`w-full cursor-pointer flex items-center justify-start gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                  activeSection === section.id 
                    ? isDarkMode 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'bg-blue-500/10 text-blue-600'
                    : isDarkMode 
                      ? 'text-white/40 hover:text-white/80 hover:bg-white/5' 
                      : 'text-black/40 hover:text-black/80 hover:bg-black/5'
                }`}
              >
                <div className={`flex-shrink-0 transition-transform relative ${activeSection === section.id ? 'scale-110' : 'group-hover:scale-110'} ${
                  activeSection === section.id ? 'text-blue-500' : ''
                }`}>
                  {section.icon}
                  {section.id === 'gamification' && unlockedCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 text-white font-bold font-mono text-[8px] rounded-full flex items-center justify-center shadow-md border border-slate-900">
                      {unlockedCount}
                    </span>
                  )}
                  {section.id === 'computational' && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 text-white font-bold font-mono text-[8px] rounded-full flex items-center justify-center shadow-md border border-slate-900">
                      4
                    </span>
                  )}
                  {section.id === 'projects' && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-indigo-500 text-white font-bold font-mono text-[8px] rounded-full flex items-center justify-center shadow-md border border-slate-900">
                      4
                    </span>
                  )}
                  {section.id === 'scripts' && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 text-white font-bold font-mono text-[8px] rounded-full flex items-center justify-center shadow-md border border-slate-900">
                      3
                    </span>
                  )}
                </div>
                <div className="hidden md:block font-semibold text-[13px] whitespace-nowrap tracking-tight text-left leading-tight z-10 flex items-center justify-between w-full pr-5">
                  <span className="truncate">{section.label}</span>
                </div>
                {activeSection === section.id && (
                  <div className="absolute right-3 hidden md:block z-10">
                    <ChevronRight size={14} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                  </div>
                )}

                {/* Embedded High-tech sweep loading effect on hover */}
                {hoveredSection === section.id && (
                  <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-blue-500/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
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
              </a>
            ))}
          </div>

          {/* Theme switcher */}
          <div className={`px-4 py-3 border-t mx-3 mb-4 rounded-xl transition-all duration-300 ${isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'}`}>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-full flex items-center justify-start gap-3 p-2 rounded-lg transition-all duration-300 group cursor-pointer ${
                isDarkMode 
                  ? 'text-blue-400 hover:bg-white/5' 
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
                <a href="https://www.linkedin.com/in/lucasleniar/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-650'}`}><Linkedin size={18} /></a>
                <a href="https://www.instagram.com/lucasmercerl/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-650'}`}><Instagram size={18} /></a>
                <a href="https://www.facebook.com/lucasmercerl/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-650'}`}><Facebook size={18} /></a>
                <a href="https://lucasleniar.com.br" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-650'}`}><Globe size={18} /></a>
             </div>
             <p className="text-[10px] font-mono">© {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main ref={mainRef} className={`flex-1 relative flex flex-col min-h-0 overflow-y-auto pb-16 md:pb-0`}>
        <motion.div 
          className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none" 
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear"
          }}
          style={{ 
            backgroundImage: isDarkMode 
              ? 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)' 
              : 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
        
        <div className={`relative z-10 w-full transition-all duration-300`}>
          <div className="flex flex-col">
              <section id="inicio" className="min-h-screen flex items-center justify-center p-6 md:p-12 border-b border-black/5 dark:border-white/5">
                <HomeSection onNavigate={handleSectionChange} isDarkMode={isDarkMode} onUnlockEasterEgg={() => unlockAchievement('easterEgg')} onOpenBugGame={() => setShowBugGame(true)} />
              </section>
              <section id="sobre" className="min-h-screen p-6 md:p-12 border-b border-black/5 dark:border-white/5">
                <LifeSection isDarkMode={isDarkMode} />
              </section>
              <section id="methodology" className="min-h-screen p-6 md:p-12 border-b border-black/5 dark:border-white/5">
                <ComputationalThinking isDarkMode={isDarkMode} onUnlockComputational={() => unlockAchievement('computational')} />
              </section>
              <section id="projetos" className="min-h-screen p-6 md:p-12 border-b border-black/5 dark:border-white/5">
                <ProjectsSection isDarkMode={isDarkMode} />
              </section>
              <section id="iot" className="min-h-screen p-6 md:p-12 border-b border-black/5 dark:border-white/5 flex flex-col justify-center">
                <IoTSection isDarkMode={isDarkMode} />
              </section>
              <section id="alunos" className="min-h-screen p-6 md:p-12 border-b border-black/5 dark:border-white/5">
                <RoboticsSection isDarkMode={isDarkMode} onUnlockRobotics={() => unlockAchievement('robotics')} />
              </section>
              <section id="utfpr" className="h-[100dvh] md:h-screen flex flex-col p-4 md:p-12 border-b border-black/5 dark:border-white/5">
                <IFrameSection isActiveSection={activeSection === 'utfpr'} url="https://utfpr.lucasleniar.com.br/" title="UTFPR" isMaximized={false} onToggleMaximize={() => setMaximizedSection('utfpr')} isDarkMode={isDarkMode} />
              </section>
              <section id="scripts" className="min-h-screen flex flex-col p-4 md:p-12">
                <ShellFilesSection isMaximized={false} onToggleMaximize={() => setMaximizedSection('scripts')} isDarkMode={isDarkMode} />
              </section>

          </div>
        </div>

        <div className="absolute top-4 right-4 w-16 h-16 border-t flex justify-end items-start border-r border-blue-500/30 pointer-events-none transition-colors duration-300">
          <div className="w-1.5 h-1.5 bg-blue-500/50 -mt-[1px] -mr-[1px]" />
        </div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b flex justify-start items-end border-l border-blue-500/30 pointer-events-none transition-colors duration-300">
          <div className="w-1.5 h-1.5 bg-blue-500/50 -mb-[1px] -ml-[1px]" />
        </div>
      </main>

      {/* Bug Breakout overlay */}
      <AnimatePresence>
        {showBugGame && (
          <BugBreakoutGame isDarkMode={isDarkMode} onClose={() => setShowBugGame(false)} />
        )}
      </AnimatePresence>

      

      {/* Mobile Bottom Navigation Bar */}
      {!maximizedSection && (
        <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-900/90 backdrop-blur-lg border-white/10' : 'bg-white/90 backdrop-blur-lg border-black/10'
        }`}>
          <div className="flex items-center overflow-x-auto no-scrollbar px-2 pt-1 pb-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionChange(section.id);
                }}
                className={`flex-shrink-0 flex flex-col items-center justify-center py-2 px-3 min-w-[4.5rem] group relative focus-visible:outline-none ${
                  activeSection === section.id
                    ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    : isDarkMode ? 'text-white/50 hover:text-white/90' : 'text-black/50 hover:text-black/90'
                }`}
              >
                <div className={`mb-1 transition-transform relative ${activeSection === section.id ? 'scale-110' : 'scale-100 group-hover:scale-110'}`}>
                  {section.icon}
                  {section.id === 'gamification' && unlockedCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-blue-500 text-white font-bold font-mono text-[8px] rounded-full flex items-center justify-center shadow-md border border-slate-900">
                      {unlockedCount}
                    </span>
                  )}
                  {section.id === 'computational' && (
                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-blue-500 text-white font-bold font-mono text-[8px] rounded-full flex items-center justify-center shadow-md border border-slate-900">
                      4
                    </span>
                  )}
                  {section.id === 'projects' && (
                     <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-indigo-500 text-white font-bold font-mono text-[8px] rounded-full flex items-center justify-center shadow-md border border-slate-900">
                      4
                    </span>
                  )}
                  {section.id === 'scripts' && (
                     <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-blue-500 text-white font-bold font-mono text-[8px] rounded-full flex items-center justify-center shadow-md border border-slate-900">
                      3
                    </span>
                  )}
                </div>
                 <span className={`text-[9px] font-medium tracking-wide max-w-[64px] truncate text-center ${activeSection === section.id ? 'font-bold' : ''}`}>
                   {section.label}
                 </span>
                {activeSection === section.id && (
                  <motion.div layoutId="mobile-nav-indicator" className="absolute top-0 w-8 h-0.5 rounded-b-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Maximized Overlay */}
      <AnimatePresence>
        {maximizedSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-[200] flex flex-col ${isDarkMode ? 'bg-[#111827]' : 'bg-[#f4f7f6]'}`}
          >
            {maximizedSection === 'utfpr' && (
              <IFrameSection url="https://utfpr.lucasleniar.com.br/" title="UTFPR" isMaximized={true} onToggleMaximize={() => setMaximizedSection(null)} isDarkMode={isDarkMode} />
            )}

            {maximizedSection === 'scripts' && (
              <ShellFilesSection isMaximized={true} onToggleMaximize={() => setMaximizedSection(null)} isDarkMode={isDarkMode} />
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </FlashcardContext.Provider>
  );
}
