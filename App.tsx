/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  X
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

const HomeSection = ({ onNavigate, isDarkMode }: { onNavigate: (id: SectionId) => void; isDarkMode: boolean }) => (
  <div className="min-h-full flex flex-col justify-center py-12 md:py-0 max-w-6xl">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 order-1 md:order-1"
      >
        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase mb-6 border ${
          isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
        }`}>
          Olá, Mundo.
        </span>
        <h1 className={`text-[32px] md:text-[54px] font-bold tracking-tighter leading-tight mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Eu sou o <span className={isDarkMode ? 'text-emerald-400 font-extrabold' : 'text-emerald-600'}>Professor Lucas Mercer Leniar</span>.
        </h1>

        {/* Mobile Profile Image */}
        <div className="md:hidden mb-10 flex justify-center w-full">
          <ProfileImage />
        </div>

        <div className={`text-[17.5px] md:text-[19.5px] max-w-2xl leading-normal mb-10 ${isDarkMode ? 'text-white/60' : 'text-black/50'}`}>
          <p className="mb-2">
            Explorando as fronteiras entre a educação e a tecnologia.
          </p>
          <p>
            Especialista em <span className={`font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-black'}`}>pensamento computacional</span> e <span className={`font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-black'}`}>infraestrutura de TI</span>, 
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
              emerald: 'group-hover:text-emerald-500',
              blue: 'group-hover:text-blue-400',
              purple: 'group-hover:text-purple-400',
              orange: 'group-hover:text-orange-400',
            }[item.color as 'emerald' | 'blue' | 'purple' | 'orange'];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all duration-300 group cursor-default ${
                  isDarkMode 
                    ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]' 
                    : 'border-black/[0.05] bg-black/[0.01] hover:bg-black/[0.03]'
                } ${hoverBorderColor}`}
              >
                <div className={`text-black/20 dark:text-white/20 ${hoverIconColor} transition-colors`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-semibold text-center ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{item.label}</span>
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
            className={`flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border font-bold rounded-full text-xs md:text-sm uppercase tracking-widest hover:bg-yellow-400 hover:border-yellow-500 hover:text-black hover:shadow-lg transition-all duration-300 cursor-pointer ${
              isDarkMode ? 'border-white/10 text-white/80' : 'border-black/10 text-black/70'
            }`}
          >
            UTFPR <ArrowRight size={18} />
          </motion.button>

          {/* Certificados */}
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => onNavigate('certificados')}
            className={`flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border font-bold rounded-full text-xs md:text-sm uppercase tracking-widest hover:bg-[#003366] hover:border-[#004a8f] hover:text-white transition-all duration-300 cursor-pointer ${
              isDarkMode ? 'border-white/10 text-white/80' : 'border-black/10 text-black/70'
            }`}
          >
            Gerador Certificados <ArrowRight size={18} />
          </motion.button>

          {/* HORARIO */}
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => onNavigate('horarios')}
            className={`flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border font-bold rounded-full text-xs md:text-sm uppercase tracking-widest hover:bg-[#657c36] hover:border-[#2d3818] hover:text-white hover:shadow-lg transition-all duration-300 cursor-pointer ${
              isDarkMode ? 'border-white/10 text-white/80' : 'border-black/10 text-black/70'
            }`}
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

const ComputationalThinking = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const pillars = [
    { title: "Decomposição", desc: "Quebrar problemas complexos em partes menores.", icon: <Layers className="text-emerald-500" size={32} /> },
    { title: "Reconhecimento", desc: "Identificar semelhanças e tendências entre problemas.", icon: <Search className="text-blue-500" size={32} /> },
    { title: "Abstração", desc: "Focar no que é importante, ignorando detalhes.", icon: <Ghost className="text-purple-500" size={32} /> },
    { title: "Algoritmos", desc: "Desenvolver instruções passo a passo.", icon: <GitBranch className="text-orange-500" size={32} /> }
  ];

  // Game sandbox state
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [studentName, setStudentName] = useState('');

  const questions = [
    {
      pillar: "Decomposição",
      question: "Problema: Você foi encarregado de organizar uma Feira de Robótica. Qual é a melhor forma de decompor este problema complexo?",
      options: [
        "Iniciar imediatamente a montagem sem estruturar equipes ou prazos.",
        "Dividir em sub-tarefas: 1. Infraestrutura/Espaço, 2. Inscrições de alunos, 3. Cronograma de apresentações, 4. Divulgação.",
        "Focar apenas na compra de medalhas e delegar todo o resto aos alunos de última hora."
      ],
      correctIndex: 1,
      tip: "Decompor consiste em isolar cada grande área operacional para resolvê-las individualmente."
    },
    {
      pillar: "Reconhecimento de Padrões",
      question: "Observe a sequência lógica relacionada a automações de robôs: [2, 4, 8, 16, 32]. Sabendo que a sequência dobra a cada iteração de clock, qual o próximo valor de energia?",
      options: [
        "40 - Valor linear incremental do circuito.",
        "64 - Padrão de progressão de 2^x (Multiplicação cumulativa).",
        "48 - Sequência alternada de múltiplos básicos."
      ],
      correctIndex: 1,
      tip: "Identificar o fator constante de progressão permite prever comportamentos digitais de forma exata."
    },
    {
      pillar: "Abstração",
      question: "Aplicação de Cadastro da UTFPR: Quais fatores são IMPORTANTES abstrair para criar o perfil acadêmico de um aluno de Engenharia?",
      options: [
        "Registro Acadêmico (RA), Grade Curricular Atual, Histórico de Notas e Disciplinas em Curso.",
        "Modelo de celular que utiliza, marca de tênis favorita, hobby predileto e cor dos olhos.",
        "Endereço de todas as escolas que frequentou desde o primário e sua banda de rock preferida."
      ],
      correctIndex: 0,
      tip: "Abstrair é ocultar detalhes dispensáveis para focar estritamente nas regras de negócio essenciais."
    },
    {
      pillar: "Algoritmos",
      question: "Um circuito Arduino precisa ligar o cooler de emergência APENAS se a temperatura do sensor ultrapassar 45°C. Qual fluxo lógico estruturado descreve este algoritmo corretamento?",
      options: [
        "1. Ligar o cooler -> 2. Terminar -> 3. Medir Temperatura.",
        "1. Medir Temperatura -> 2. Se for maior que 45°C, ligar cooler -> 3. Caso contrário, desligar cooler -> 4. Repetir.",
        "1. Desligar cooler infinitamente sem ler o sensor analógico de entrada."
      ],
      correctIndex: 1,
      tip: "Algoritmos exigem uma ordem precisa, sequencial e condicional de instruções claras."
    }
  ];

  const handleAnswerSelect = (index: number) => {
    if (feedback !== null) return;
    setSelectedAnswer(index);
    if (index === questions[currentStep].correctIndex) {
      setFeedback('correct');
      setScore(prev => prev + 25);
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setGameState('completed');
    }
  };

  const resetGame = () => {
    setGameState('intro');
    setCurrentStep(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setStudentName('');
  };

  return (
    <div className="flex flex-col pt-4 md:pt-12 uppercase tracking-tighter overflow-visible">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl w-full">
        <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 italic font-serif px-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Pensamento Computacional</h2>
        <p className={`max-w-2xl mb-8 md:mb-12 uppercase text-[10px] tracking-[0.2em] font-mono font-bold px-1 ${isDarkMode ? 'text-emerald-400' : 'text-black/30'}`}>Os 4 pilares para resolver qualquer problema tecnológico e educacional.</p>
        
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
                  alt="Lucas Mercer" 
                  className="w-full h-auto scale-105 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
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
          className={`rounded-3xl border p-6 md:p-10 shadow-2xl relative overflow-hidden max-w-4xl ${
            isDarkMode 
            ? 'bg-[#11161b] border-white/5 shadow-black/40' 
            : 'bg-gradient-to-tr from-emerald-50/20 to-white border-black/5'
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[120px] pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-xl text-emerald-600 ${isDarkMode ? 'bg-emerald-500/15' : 'bg-emerald-500/10'}`}>
              <Brain size={24} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-emerald-600 font-bold">Laboratório Prático</span>
              <h3 className={`text-xl md:text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>Simulador de Pensamento Computacional</h3>
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
                <p className={`text-sm md:text-base leading-relaxed font-sans normal-case tracking-normal ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Participe deste laboratório prático projetado pelo Professor Lucas Leniar para fixar conceitos! 
                  Você passará por 4 desafios interativos avaliando como você decompõe, encontra padrões, abstrai e cria algoritmos. Complete o score perfeito para gerar seu crachá oficial de honra.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setGameState('playing')}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer hover:translate-x-1"
                  >
                    Iniciar Simulação <Play size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div 
                key="playing"
                initial={{ opacity: 0, f: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/10">
                    Etapa {currentStep + 1} de 4: {questions[currentStep].pillar}
                  </span>
                  <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                    Score: {score}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-black/[0.05]'}`}>
                  <div 
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <h4 className={`text-lg md:text-xl font-bold font-sans normal-case tracking-normal ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  {questions[currentStep].question}
                </h4>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentStep].options.map((option, idx) => {
                    let optionStyle = isDarkMode 
                      ? "border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-white/70" 
                      : "border-black/5 bg-black/[0.01] hover:bg-black/[0.03] text-black/70";
                    
                    if (selectedAnswer !== null) {
                      if (idx === questions[currentStep].correctIndex) {
                        optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                      } else if (idx === selectedAnswer) {
                        optionStyle = "border-red-500 bg-red-500/10 text-red-600";
                      } else {
                        optionStyle = "opacity-40 border-transparent bg-transparent pointer-events-none";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 justify-between font-sans normal-case tracking-normal cursor-pointer ${optionStyle}`}
                      >
                        <span className="flex-1">{option}</span>
                        {selectedAnswer !== null && idx === questions[currentStep].correctIndex && (
                          <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest font-mono">Correto</span>
                        )}
                        {selectedAnswer !== null && idx === selectedAnswer && idx !== questions[currentStep].correctIndex && (
                          <span className="text-red-500 font-bold text-xs uppercase tracking-widest font-mono">Incorreto</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback with Tip */}
                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-xs font-sans normal-case tracking-normal ${
                      feedback === 'correct' 
                        ? 'bg-emerald-500/5 border border-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                        : 'bg-red-500/5 border border-red-500/10 text-red-600'
                    }`}
                  >
                    <p className="font-bold mb-1 uppercase tracking-widest text-[9px] font-mono">Dica do Prof. Lucas:</p>
                    <p className="text-sm">{questions[currentStep].tip}</p>
                  </motion.div>
                )}

                {/* Action button */}
                {selectedAnswer !== null && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-all cursor-pointer text-xs uppercase tracking-widest"
                    >
                      {currentStep < questions.length - 1 ? "Próxima Questão" : "Ver Meu Crachá"}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {gameState === 'completed' && (
              <motion.div 
                key="completed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Award size={32} />
                    <h4 className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Simulação Concluída!</h4>
                  </div>
                  <p className={`text-sm font-sans normal-case tracking-normal ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    Você obteve uma pontuação de <span className="font-bold text-emerald-500">{score}%</span> no pensamento computacional. 
                    Digite seu nome abaixo para emitir a insígnia digital demonstrando seu domínio sobre os 4 pilares:
                  </p>
                  
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Seu Nome Completo"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      maxLength={32}
                      className={`w-full max-w-sm px-4 py-3 rounded-xl border text-sm font-sans font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all ${
                        isDarkMode 
                        ? 'bg-black/40 border-white/10 text-white' 
                        : 'bg-black/[0.01] border-black/10 text-black'
                      }`}
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={resetGame}
                      className={`px-5 py-3 border rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                        isDarkMode 
                          ? 'border-white/10 hover:bg-white/5 text-white/60 hover:text-white' 
                          : 'border-black/10 hover:bg-black/5 text-black/60 hover:text-black'
                      }`}
                    >
                      Reiniciar Teste
                    </button>
                  </div>
                </div>

                {/* Digital badge display */}
                <div className="w-full max-w-[280px] shrink-0 p-1 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-300 shadow-xl relative group">
                  <div className="absolute inset-0 bg-emerald-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity" />
                  <div className={`relative rounded-xl p-6 flex flex-col items-center text-center space-y-4 ${isDarkMode ? 'bg-[#151a1e]' : 'bg-white'}`}>
                    <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-600">
                      <Brain size={36} className="animate-pulse" />
                    </div>
                    <span className="text-[8px] font-mono font-bold uppercase tracking-[0.25em] text-emerald-600">UTFPR / PROFESSOR LUCAS</span>
                    <h5 className={`text-base font-bold uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {studentName || "PENSADOR DEDICADO"}
                    </h5>
                    <div className="h-[2px] w-12 bg-emerald-500/20" />
                    <p className={`text-[10px] font-sans normal-case tracking-normal max-w-[200px] leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                      Demonstrou domínio prático em Decomposição, Abstração, Algoritmos e Reconhecimento de Padrões através do Simulador.
                    </p>
                    <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                      <Award size={12} className="text-emerald-500" />
                      <span className="text-[8px] font-mono font-bold uppercase text-emerald-600">Perfect Score {score}%</span>
                    </div>
                  </div>
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
                  alt="Robótica Educacional" 
                  className="w-full h-auto scale-105 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
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
  type ProblemId = 'dhcp' | 'dns' | 'ram';
  const [activeProb, setActiveProb] = useState<ProblemId>('dhcp');
  const [probFixed, setProbFixed] = useState<{ dhcp: boolean; dns: boolean; ram: boolean }>({
    dhcp: false,
    dns: false,
    ram: false
  });
  const [isFixing, setIsFixing] = useState(false);
  const [sysRamUsage, setSysRamUsage] = useState(98);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([
    "NOC Dashboard ativo.",
    "Monitoramento de infraestrutura online.",
    "Status: ALERTA - Uma ou mais falhas críticas detectadas na rede local."
  ]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    setDiagnosticLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 5));
  };

  const solveProblem = () => {
    setIsFixing(true);
    addLog(`Iniciando rotina corretiva para o caso: ${
      activeProb === 'dhcp' ? 'Renovação DHCP' : activeProb === 'dns' ? 'Ajuste de Servidores DNS' : 'Estouro de RAM'
    }...`);

    setTimeout(() => {
      if (activeProb === 'dhcp') {
        setProbFixed(prev => ({ ...prev, dhcp: true }));
        addLog("Requisitando lease de endereço IP via broadcast ethernet...");
        addLog("Sucesso! IP 192.168.100.125 atribuído pela VLAN-Estudantes.");
        addLog("Ping para Gateway (192.168.100.1): RESPOSTA EM 1.2ms [ESTÁVEL]");
      } else if (activeProb === 'dns') {
        setProbFixed(prev => ({ ...prev, dns: true }));
        addLog("Verificando arquivo /etc/resolv.conf...");
        addLog("Substituindo nameserver obsoleto 127.0.0.1 por 8.8.8.8 (Google Primary)...");
        addLog("Executando lookup: nslookup utfpr.edu.br -> Resolvido p/ 200.134.1.25");
        addLog("Navegação externa por domínio normalizada.");
      } else if (activeProb === 'ram') {
        setProbFixed(prev => ({ ...prev, ram: true }));
        addLog("Escaneando processos ativos por uso desproporcional de recursos...");
        addLog("Detectado processo órfão de backup-log zumbi (PID: 12480)");
        addLog("Executando comando: kill -9 12480 && echo 3 > /proc/sys/vm/drop_caches");
        setSysRamUsage(28);
        addLog("Memória ram reciclada com sucesso. Servidor em temperatura segura.");
      }
      setIsFixing(false);
    }, 1500);
  };

  const resetAllProblems = () => {
    setProbFixed({ dhcp: false, dns: false, ram: false });
    setSysRamUsage(98);
    setDiagnosticLogs([
      "Painel NOC reiniciado com sucesso.",
      "Falhas sintéticas de rede recolocadas para calibração escolar."
    ]);
  };

  return (
    <div className="flex flex-col pt-6 md:pt-16 pb-12">
      {/* Upper informational grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 max-w-6xl w-full mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8">
          <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 italic font-serif px-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Tecnologia da Informação</h2>
          <p className={`max-w-2xl mb-6 uppercase text-[10px] tracking-[0.2em] font-mono font-bold px-1 ${isDarkMode ? 'text-blue-400' : 'text-black/30'}`}>
            Infraestrutura, Conectividade e Suporte Avançado
          </p>
          <div className={`space-y-4 text-xs md:text-sm font-sans normal-case tracking-normal leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            <p>
              Atuação sólida em Tecnologia da Informação, com foco em infraestrutura, redes, hardware e sistemas operacionais, voltada à formação de profissionais técnicos preparados para os desafios do mundo real.
            </p>
            <p>
              O processo de ensino vai além da execução de tarefas: busca desenvolver pensamento crítico, raciocínio lógico e autonomia na resolução de problemas. A proposta integra teoria e prática de forma estratégica, capacitando os alunos a compreenderem profundamente o funcionamento das tecnologias, diagnosticar falhas e construir soluções eficientes em diferentes contextos profissionais.
            </p>
          </div>
        </motion.div>

        {/* Beautiful diagnostic card image directly inside info block */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 flex items-center justify-center">
          <div className="relative group w-full max-w-[280px]">
            <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-15 transition-opacity" />
            <div className={`relative rounded-2xl overflow-hidden shadow-xl border ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'}`}>
              <img 
                src="https://lucasleniar.com.br/titecnico.png" 
                alt="Manutenção e Redes" 
                className="w-full h-auto scale-105 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-[9px] font-bold text-white uppercase tracking-[0.2em] font-mono leading-none">Mesa de Diagnóstico</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* DETAILED INTERACTIVE NOC / SIMULATION CONTAINER - MOVED UP/INTEGRATED */}
      <div className="max-w-6xl w-full px-1">
        <div className="border-t border-blue-500/10 pt-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-1 px-2.5 bg-blue-500/10 text-blue-500 rounded-lg text-xs font-mono font-bold">NOC DIAGNOSTICS</span>
            <h3 className={`text-xl md:text-2xl font-bold tracking-tight italic font-serif leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}>Central de Operação e Redes (NOC)</h3>
          </div>
          <p className={`text-xs font-sans normal-case tracking-normal font-medium leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
            Uma simulação visual de problemas comuns resolvidos no dia a dia por administradores de sistema técnico. Diagnostique a topologia abaixo e execute reparos cirúrgicos para restabelecer a conectividade de cada canal.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="rounded-3xl border shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-[#0e141f] border-slate-800 text-white">
          {/* NOC Incident Selection sidebar */}
          <div className="lg:col-span-4 p-6 border-r border-slate-800 flex flex-col justify-between bg-[#080d15]">
            <div className="space-y-4">
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase block mb-1 text-emerald-400">TICKETS DE ERRO ABERTOS</span>
              
              <div className="space-y-2">
                {[
                  { id: 'dhcp', name: 'Lease DHCP Ausente', desc: 'Computador da secretaria sem IP configurado.', fixed: probFixed.dhcp },
                  { id: 'dns', name: 'Falha de Tradução DNS', desc: 'Ping de IP resolve, mas os sites não carregam.', fixed: probFixed.dns },
                  { id: 'ram', name: 'Estouro Crítico de RAM', desc: 'Servidor instável operando a 98% de carga.', fixed: probFixed.ram }
                ].map((prob) => (
                  <button
                    key={prob.id}
                    onClick={() => setActiveProb(prob.id as ProblemId)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer block ${
                      activeProb === prob.id 
                        ? 'bg-blue-500/15 border-blue-500/40 text-blue-400 shadow-md' 
                        : 'border-white/5 bg-[#111724] hover:bg-white/[0.04] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-[10px] uppercase tracking-wider block text-white font-black">
                        {prob.name}
                      </span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase leading-none ${
                        prob.fixed 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : prob.id === 'ram' ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-yellow-500/20 text-yellow-400 animate-pulse'
                      }`}>
                        {prob.fixed ? 'Resolvido' : 'Pendente'}
                      </span>
                    </div>
                    <span className={`text-[11px] font-sans normal-case tracking-normal block leading-tight ${activeProb === prob.id ? 'text-blue-300' : 'text-slate-400'}`}>
                      {prob.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Maintenance controls */}
            <div className="pt-6 border-t border-slate-800/80 flex gap-2 mt-6">
              <button
                onClick={resetAllProblems}
                className="flex-1 py-2.5 rounded-xl text-[9.5px] font-mono font-bold tracking-widest uppercase border border-white/5 bg-[#161f30] text-slate-300 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
              >
                Resetar Simulador
              </button>
            </div>
          </div>

          {/* Topology graphic screen */}
          <div className="lg:col-span-4 p-6 bg-[#0a0f18] border-r border-slate-800 flex flex-col justify-between items-center text-center">
            <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-blue-400 uppercase w-full text-left">TOPOLOGIA DE COMUNICAÇÃO</span>
            
            {/* Visual network routing diagram based on active problem */}
            <div className="w-full py-8 flex flex-col items-center justify-center relative">
              <div className="flex items-center justify-between w-full max-w-[280px] relative">
                {/* 1. Terminal PC */}
                <div className="flex flex-col items-center relative z-10">
                  <div className={`p-3.5 rounded-2xl border transition-all ${
                    probFixed.dhcp 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                      : activeProb === 'dhcp' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 animate-pulse' : 'bg-slate-800 border-white/5 text-slate-400'
                  }`}>
                    <Laptop size={24} />
                  </div>
                  <span className="text-[8.5px] font-mono text-white/50 mt-1.5 uppercase font-bold">Estação PC</span>
                  <span className="text-[7.5px] font-mono text-white/30 lowercase">
                    {probFixed.dhcp ? "192.168.100.125" : activeProb === 'dhcp' ? "IP Inválido" : "192.168.1.15"}
                  </span>
                </div>

                {/* Connection cable link 1 */}
                <div className="flex-1 h-[2px] relative overflow-hidden bg-slate-800 mx-2">
                  <div className={`absolute inset-y-0 left-0 w-full rounded-full transition-all duration-700 ${
                    probFixed.dhcp 
                      ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' 
                      : activeProb === 'dhcp' ? 'bg-yellow-500 shadow-md animate-pulse' : 'bg-emerald-500'
                  }`} />
                </div>

                {/* 2. Switch/Router */}
                <div className="flex flex-col items-center relative z-10">
                  <div className={`p-3.5 rounded-2xl border transition-all ${
                    probFixed.dns 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                      : activeProb === 'dns' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 animate-pulse' : 'bg-slate-800 border-white/5 text-slate-400'
                  }`}>
                    <Server size={24} />
                  </div>
                  <span className="text-[8.5px] font-mono text-white/50 mt-1.5 uppercase font-bold">Roteador Gateway</span>
                  <span className="text-[7.5px] font-mono text-white/30 lowercase">192.168.100.1</span>
                </div>

                {/* Connection cable link 2 */}
                <div className="flex-1 h-[2px] relative overflow-hidden bg-slate-800 mx-4">
                  <div className={`absolute inset-y-0 left-0 w-full rounded-full transition-all duration-700 ${
                    probFixed.dns 
                      ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' 
                      : activeProb === 'dns' ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'
                  }`} />
                </div>

                {/* 3. Internet Cloud gateway */}
                <div className="flex flex-col items-center relative z-10">
                  <div className={`p-3.5 rounded-2xl border transition-all ${
                    (activeProb === 'dns' && !probFixed.dns) || (activeProb === 'dhcp' && !probFixed.dhcp)
                      ? 'bg-slate-800 border-white/5 text-slate-600' 
                      : 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                  }`}>
                    <Globe size={24} />
                  </div>
                  <span className="text-[8.5px] font-mono text-white/50 mt-1.5 uppercase font-bold">Internet WAN</span>
                  <span className="text-[7.5px] font-mono text-white/30">WAN LINK OK</span>
                </div>
              </div>

              {/* Extra monitor graphic for RAM Ticket */}
              {activeProb === 'ram' && (
                <div className="w-full max-w-[240px] mt-6 bg-[#161c24] border border-white/5 rounded-xl p-3 text-left">
                  <div className="flex justify-between items-center mb-1 text-[8.5px] font-mono font-bold text-white/60">
                    <span>MÉTRICA DE CARGA DO LINK:</span>
                    <span className={probFixed.ram ? 'text-emerald-400' : 'text-red-500 animate-pulse'}>
                      {sysRamUsage}% RAM usado
                    </span>
                  </div>
                  <div className="w-full bg-[#0d1116] h-2 rounded-full overflow-hidden border border-white/5">
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

            <div className="text-left p-4 rounded-xl text-[10.5px] font-sans normal-case tracking-normal leading-relaxed bg-[#141b25] text-white/70 border border-white/5 shadow-md">
              <span className="block font-bold text-[9px] font-mono uppercase tracking-widest text-[#636b77] mb-1">Diagnóstico:</span>
              {activeProb === 'dhcp' && (
                <span>O computador solicita conexão na rede local, mas nenhum lease de IP é fornecido. O cabo ethernet está no ar.</span>
              )}
              {activeProb === 'dns' && (
                <span>A estação local comunica perfeitamente com o roteador gateway, mas falha ao traduzir endereços amigáveis de sites externos por usar um DNS local inconsistente ou quebrado.</span>
              )}
              {activeProb === 'ram' && (
                <span>O servidor remoto está lento devido a um estouro de processos sobressalentes acumulados que consomem toda a capacidade do módulo de swap/cache da memória RAM virtual.</span>
              )}
            </div>
          </div>

          {/* NOC Diagnostics Console logs & actions */}
          <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-[#0b0f15]">
            <div className="space-y-4">
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-blue-400 uppercase">AÇÃO E SOLUÇÃO DO SUPORTE</span>
              
              <div className="space-y-1">
                <label className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-500">Comando técnico sugerido:</label>
                <div className="bg-[#05080c] text-white/80 p-3 rounded-xl font-mono text-[10px] border border-white/5 leading-snug">
                  {activeProb === 'dhcp' && "sudo dhclient && ip addr show eth0"}
                  {activeProb === 'dns' && "sudo echo 'nameserver 8.8.8.8' > /etc/resolv.conf"}
                  {activeProb === 'ram' && "sudo kill -9 $(pgrep backup) && sysctl -w vm.drop_caches=3"}
                </div>
              </div>

              {/* Action Button */}
              {probFixed[activeProb] ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                  <span className="text-emerald-400 font-mono text-[11px] font-bold block uppercase tracking-wider">✔️ PROBLEMA MITIGADO</span>
                  <span className="text-[9.5px] font-sans normal-case tracking-normal text-slate-400 block mt-0.5">Canal de infraestrutura operando com estabilidade.</span>
                </div>
              ) : (
                <button
                  onClick={solveProblem}
                  disabled={isFixing}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-mono font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer block flex items-center justify-center"
                >
                  {isFixing ? "Aplicando correção técnica..." : "💡 Aplicar Correção de Rede"}
                </button>
              )}
            </div>

            {/* Simulated Live SSH Terminal Logs */}
            <div className="mt-6 border-t border-white/5 pt-4">
              <span className="text-[8px] font-mono font-bold text-yellow-500 tracking-widest block mb-2 uppercase">TERMINAL DO ADMINISTRADOR: SSH</span>
              <div className="bg-black/40 rounded-xl p-3 h-28 border border-white/5 overflow-y-auto font-mono text-[9px] text-blue-400 space-y-1 select-text">
                {diagnosticLogs.map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap leading-normal font-medium text-slate-300">
                    {log}
                  </div>
                ))}
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
  const [activeTab, setActiveTab] = useState<'timeline' | 'philosophy' | 'stats'>('timeline');
  const [activeYear, setActiveYear] = useState<number>(2006);

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
      color: "from-blue-500/20 to-indigo-500/10 text-blue-500"
    },
    {
      value: "+3.000",
      label: "Alunos Formados & Impactados",
      info: "Capacitados em conceitos de infraestrutura de rede de computadores, hardware avançado e desenvolvimento.",
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-500"
    },
    {
      value: "+500",
      label: "Aulas Práticas e Simuladores",
      info: "Desafios metodológicos criados para incentivar a depuração ativa de código e redes por experimentação.",
      color: "from-orange-500/20 to-amber-500/10 text-orange-500"
    },
    {
      value: "100%",
      label: "Comprometimento Empático",
      info: "Prática humanizada que cultiva o pensamento independente, focado no sucesso de cada estudante.",
      color: "from-purple-500/20 to-pink-500/10 text-purple-500"
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
                  alt="Lucas Mercer Leniar"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating identity pill */}
                <div className="absolute inset-x-0 bottom-0 py-3 bg-gradient-to-t from-black/95 to-black/20 text-center">
                  <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase leading-none block">
                    PROFESSOR & ENGENHEIRO
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
                Professor apaixonado e dedicado à forte interposição entre a tecnologia industrial avançada e o aprendizado moderno de sistemas escolares. Com mais de 15 anos de imersão corporativa e acadêmica contínua no setor de TI, o <strong>Professor Lucas Mercer Leniar</strong> atua como um educador focado em desmistificar infraestruturas e potencializar a lógica.
              </p>
              <p>
                Sua abordagem integra o Pensamento Computacional de forma descomplicada, transformando termos intrincados em tarefas interativas estimulantes. Lucas acredita firmemente que a autonomia prática é o pilar central: capacitar o estudante a decifrar loops, planejar sub-redes e depurar processos é torná-lo autor de sua própria carreira técnica.
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
            { id: 'timeline', label: 'Linha do Tempo', icon: <Calendar size={14} /> },
            { id: 'philosophy', label: 'Didática de Ensino', icon: <Brain size={14} /> },
            { id: 'stats', label: 'Métricas de Impacto', icon: <Award size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'timeline' | 'philosophy' | 'stats')}
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
              {statMetrics.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-3xl border p-6 flex flex-col justify-between transition-all hover:scale-103 shadow-md ${
                    isDarkMode 
                      ? 'bg-[#0f141a]/90 border-white/5 hover:border-emerald-500/10' 
                      : 'bg-white border-black/10 hover:shadow-lg'
                  }`}
                >
                  <div className="space-y-4">
                    <span className={`inline-block py-1 px-3 text-[9px] font-mono font-bold rounded-lg uppercase tracking-wider ${stat.color}`}>
                      MÉTRICA ATIVA
                    </span>
                    <span className={`block text-3xl md:text-4xl font-extrabold tracking-tight font-serif italic ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {stat.value}
                    </span>
                    <h5 className={`font-mono text-[10px] uppercase tracking-wider font-extrabold ${
                      isDarkMode ? 'text-white/40' : 'text-slate-500'
                    }`}>
                      {stat.label}
                    </h5>
                  </div>
                  
                  <p className={`text-[11px] font-sans normal-case tracking-normal leading-relaxed mt-4 pt-3.5 border-t border-black/5 dark:border-white/5 ${
                    isDarkMode ? 'text-white/50' : 'text-slate-500'
                  }`}>
                    {stat.info}
                  </p>
                </motion.div>
              ))}
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
      <div className="h-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`max-w-md w-full p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${
            isDarkMode ? 'bg-[#11161b] border-white/5' : 'bg-white border-black/5'
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600" />
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-600">
              <ShieldCheck size={48} />
            </div>
            <div className="space-y-2">
              <h2 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>Repositório Protegido</h2>
              <p className={`text-sm font-sans normal-case tracking-normal ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Insira a senha de acesso para visualizar os scripts .sh</p>
            </div>
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input 
                type="password" 
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de acesso"
                className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono text-center text-lg tracking-widest ${
                  isDarkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-black/[0.01] border-black/10 text-black'
                }`}
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
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-all active:scale-[0.98] shadow-lg shadow-emerald-600/20 cursor-pointer"
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
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {SH_FILES.map((file, i) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 md:p-8 rounded-3xl border shadow-sm hover:shadow-xl transition-all group relative overflow-hidden ${
                  isDarkMode ? 'bg-[#11161b] border-white/5 shadow-black/40' : 'bg-white border-black/[0.05]'
                }`}
              >
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <Terminal size={64} />
                </div>
                
                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between">
                     <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600">
                        <FileCode size={24} />
                     </div>
                     <span className={`text-[10px] font-mono font-bold transition-colors ${isDarkMode ? 'text-white/20 group-hover:text-emerald-400/40' : 'text-black/20 group-hover:text-emerald-600/40'}`}>.sh extension</span>
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>{file.name}</h3>
                  <p className={`text-sm mb-6 font-sans normal-case leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{file.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                      <label className={`text-[9px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-emerald-400/60' : 'text-black/30'}`}>Comando de download</label>
                      <div className="relative group/copy">
                        <code className={`block w-full p-4 border rounded-xl text-[11px] font-mono break-all pr-12 ${
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

                    <div className={`p-4 rounded-2xl border ${
                      isDarkMode ? 'bg-emerald-950/20 border-emerald-900/45 text-emerald-300' : 'bg-emerald-50 border-emerald-100 text-emerald-800'
                    }`}>
                      <p className="text-[10px] leading-relaxed mb-2 normal-case font-sans tracking-normal">
                        <span className="font-bold block mb-1 uppercase text-[9px] font-mono tracking-widest">Como Executar:</span>
                        Para rodar o comando precisa estar no usuário <span className="font-bold underline">Administrador</span> da máquina e executar:
                      </p>
                      <div className="relative group/exec">
                        <code className={`block font-mono font-bold p-3 rounded-xl pr-10 text-[11px] ${
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
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <a 
                      href={file.url}
                      download={file.name}
                      className={`flex-1 text-center py-3 text-[10px] font-bold rounded-xl hover:bg-emerald-600 transition-all uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer ${
                        isDarkMode ? 'bg-emerald-600/20 hover:bg-emerald-600 text-white' : 'bg-black text-white'
                      }`}
                    >
                       Baixar Script <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
         </div>

         {/* REPOSITIONED TERMINAL EMULATOR BLOCK - UNDERneath & compacted */}
         <div className="mb-12 rounded-3xl border border-[#2d3748] bg-[#0c1015] shadow-xl p-5 relative group overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="text-[10.5px] font-mono text-white/30 ml-2">lucas@portfolio-sh:~ (Simulador de Bash)</span>
              </div>
              <Terminal size={12} className="text-white/20" />
            </div>

            {/* Compacted height - changed from h-64 to h-36 */}
            <div className="h-36 overflow-y-auto font-mono text-xs text-slate-300 space-y-1 mb-3 pr-1 selection:bg-emerald-500/30">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed hover:bg-white/[0.02] px-1 py-0.5 rounded transition-colors">
                  {line}
                </div>
              ))}
            </div>

            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-white/5 pt-3">
              <span className="text-xs font-mono text-emerald-400 font-bold select-none shrink-0">lucas@portfolio-sh:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Ex: help, whoami, neofetch, run civico.sh..."
                className="flex-1 bg-transparent border-0 font-mono text-xs text-white focus:outline-none focus:ring-0 p-0 placeholder-white/20"
              />
            </form>
         </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
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

  const handleSectionChange = (section: SectionId) => {
    setActiveSection(section);
    setIsMaximized(false);
  };

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
                    className={`w-full cursor-pointer flex items-center justify-start gap-4 px-3.5 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
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
                className={`w-full cursor-pointer flex items-center justify-start gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
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
      <main className={`flex-1 relative flex flex-col min-h-0 ${
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
                  url="https://lucasleniar.com.br/utfpr/" 
                  title="UTFPR" 
                  isMaximized={isMaximized}
                  onToggleMaximize={() => setIsMaximized(!isMaximized)}
                  isDarkMode={isDarkMode}
                />
              )}
              {activeSection === 'certificados' && (
                <IFrameSection 
                  url="https://lucasmercer.github.io/certificado/" 
                  title="Gerador de Certificados" 
                  isMaximized={isMaximized}
                  onToggleMaximize={() => setIsMaximized(!isMaximized)}
                  isDarkMode={isDarkMode}
                />
              )}
              {activeSection === 'horarios' && (
                <IFrameSection 
                  url="https://lucasmercer.github.io/horario/" 
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
