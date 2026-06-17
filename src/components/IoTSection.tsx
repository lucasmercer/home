import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wifi, Cpu, RadioReceiver, LayoutGrid, Lightbulb, Volume2, Thermometer, Palette, Power, Fan } from 'lucide-react';

export const IoTSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [lightOn, setLightOn] = useState(false);
  const [ledColor, setLedColor] = useState('#3b82f6');
  const [ledOn, setLedOn] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [acTemp, setAcTemp] = useState(22);

  return (
    <div className="max-w-6xl mx-auto w-full space-y-12">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 mt-4">
        <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800 border border-white/5' : 'bg-blue-50 border border-blue-100'} shadow-lg shrink-0`}>
          <Wifi size={40} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
        </div>
        <div>
          <h2 className={`text-4xl md:text-5xl font-black mb-3 tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>IoT & Automação Educacional</h2>
          <p className={`text-sm md:text-base max-w-2xl font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Projetos reais de Internet das Coisas conectando o mundo físico à lógica de programação na sala de aula.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-1">
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-3xl border shadow-xl relative overflow-hidden group ${
            isDarkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-slate-200'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex-1 z-10">
            <span className="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20 rounded-full mb-4 inline-block">Projetos Práticos</span>
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Automação na Prática</h3>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Ensinando conectividade com microcontroladores (ESP32/Arduino). Do piscar do LED ao controle de aparelhos pela internet usando Wi-Fi e MQTT.
            </p>
            <div className="flex flex-wrap gap-2">
              {['C++', 'FreeRTOS', 'MQTT', 'WebSockets'].map(tag => (
                <span key={tag} className={`text-[10px] font-mono px-2 py-1 rounded bg-black/5 dark:bg-white/5 ${isDarkMode ? 'text-blue-600' : 'text-blue-700'}`}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="w-full md:w-32 shrink-0 relative flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-500/10 flex items-center justify-center relative animate-[spin_10s_linear_infinite]">
               <div className="absolute inset-2 border border-dashed rounded-full border-blue-500/30" />
               <div className="absolute top-1 left-1/2 w-2 h-2 rounded-full bg-blue-500" />
            </div>
            <Cpu size={40} className={`absolute ${isDarkMode ? 'text-white' : 'text-slate-800'}`} />
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-3xl border shadow-xl relative overflow-hidden group ${
            isDarkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-slate-200'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex-1 z-10">
            <span className="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20 rounded-full mb-4 inline-block">Sistemas Embarcados</span>
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Arquitetura de Sensores</h3>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Sistemas de telemetria integrados com banco de dados em nuvem, garantindo alta disponibilidade e baixo consumo de energia (Deep Sleep) para dispositivos IoT.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'InfluxDB', 'Grafana', 'Arduino IDE'].map(tag => (
                <span key={tag} className={`text-[10px] font-mono px-2 py-1 rounded bg-black/5 dark:bg-white/5 ${isDarkMode ? 'text-blue-600' : 'text-blue-700'}`}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="w-full md:w-32 shrink-0 relative flex items-center justify-center">
            <RadioReceiver size={56} className={`${isDarkMode ? 'text-white/40' : 'text-slate-300'}`} strokeWidth={1} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping opacity-50">
               <Wifi size={24} className="text-blue-500" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Simulator */}
      <div className={`p-6 md:p-8 rounded-3xl border shadow-lg flex flex-col lg:flex-row gap-8 ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
        
        {/* Left: Controls */}
        <div className="flex-1 space-y-6 z-10 w-full">
           <h3 className={`font-bold font-mono tracking-widest text-[10px] mb-6 uppercase flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
             <LayoutGrid size={14} /> Simulador de Automação
           </h3>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Lâmpada */}
              <button 
                onClick={() => setLightOn(!lightOn)}
                className={`p-4 rounded-2xl border text-left transition-all ${lightOn ? (isDarkMode ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700') : (isDarkMode ? 'bg-slate-800 border-white/5 text-slate-400' : 'bg-white border-slate-200 text-slate-600')} hover:scale-[1.02] active:scale-[0.98] w-full`}
              >
                <div className="flex justify-between items-start mb-2">
                   <Lightbulb size={24} className={lightOn ? (isDarkMode ? 'text-amber-400' : 'text-amber-500') : ''} />
                   <div className={`w-10 h-5 rounded-full relative transition-colors ${lightOn ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${lightOn ? 'left-6' : 'left-1'}`} />
                   </div>
                </div>
                <p className="font-bold text-sm">Lâmpada Principal</p>
                <p className="text-[10px] uppercase tracking-wider mt-0.5">{lightOn ? 'Ligada' : 'Desligada'}</p>
              </button>

              {/* Som */}
              <button 
                onClick={() => setSoundOn(!soundOn)}
                className={`p-4 rounded-2xl border text-left transition-all ${soundOn ? (isDarkMode ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700') : (isDarkMode ? 'bg-slate-800 border-white/5 text-slate-400' : 'bg-white border-slate-200 text-slate-600')} hover:scale-[1.02] active:scale-[0.98] w-full`}
              >
                <div className="flex justify-between items-start mb-2">
                   <Volume2 size={24} className={soundOn ? (isDarkMode ? 'text-blue-400' : 'text-blue-500') : ''} />
                   <div className={`w-10 h-5 rounded-full relative transition-colors ${soundOn ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${soundOn ? 'left-6' : 'left-1'}`} />
                   </div>
                </div>
                <p className="font-bold text-sm">Sistema de Som</p>
                <p className="text-[10px] uppercase tracking-wider mt-0.5">{soundOn ? 'Em reprodução' : 'Pausado'}</p>
              </button>
              
              {/* Ar Condicionado */}
              <div className={`p-4 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-slate-700'} w-full`}>
                <div className="flex justify-between items-center mb-4">
                   <Thermometer size={24} className={isDarkMode ? 'text-slate-400' : 'text-slate-500'} />
                   <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 rounded-full p-1">
                      <button onClick={() => setAcTemp(acTemp - 1)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all">-</button>
                      <span className="font-mono font-bold text-xs w-6 text-center">{acTemp}°</span>
                      <button onClick={() => setAcTemp(acTemp + 1)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all">+</button>
                   </div>
                </div>
                <div>
                   <p className="font-bold text-sm">Climatização</p>
                   <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Ar Condicionado</p>
                </div>
              </div>

              {/* Fita LED */}
              <div className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${ledOn ? (isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-300') : (isDarkMode ? 'bg-slate-800 border-white/5 text-slate-400' : 'bg-white border-slate-200 text-slate-600')} w-full`}>
                <div className="flex justify-between items-start mb-2">
                   <Palette size={24} style={{ color: ledOn ? ledColor : '' }} className={!ledOn ? (isDarkMode ? 'text-slate-400' : 'text-slate-500') : 'drop-shadow-md'} />
                   <div className="flex gap-1.5 items-center bg-black/5 dark:bg-white/5 p-1 rounded-full">
                      {['#ef4444', '#10b981', '#3b82f6', '#a855f7'].map(c => (
                        <button 
                           key={c} 
                           onClick={() => { setLedColor(c); setLedOn(true); }}
                           className={`w-4 h-4 rounded-full transition-all ${ledColor === c && ledOn ? 'scale-125 shadow-sm ring-1 ring-white/50' : 'opacity-50 hover:opacity-100 hover:scale-110'}`}
                           style={{ backgroundColor: c }}
                        />
                      ))}
                      <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-600 mx-1" />
                      <button onClick={() => setLedOn(!ledOn)} className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${ledOn ? 'bg-white shadow text-slate-800' : 'bg-slate-400 text-white'}`}>
                         <Power size={10} />
                      </button>
                   </div>
                </div>
                <div>
                   <p className="font-bold text-sm" style={{ color: ledOn ? ledColor : '' }}>Fita LED RGB</p>
                   <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{ledOn ? 'Ligada' : 'Desligada'}</p>
                </div>
              </div>
           </div>
        </div>

        {/* Right: Simulation View */}
        <div className="flex-1 w-full rounded-2xl overflow-hidden relative min-h-[300px] bg-zinc-950 shadow-inner border border-white/10 flex items-center justify-center isolated">
           {/* Background Ambient (LED) */}
           <div 
             className="absolute inset-0 transition-colors duration-1000 opacity-20 pointer-events-none" 
             style={{ backgroundColor: ledOn ? ledColor : 'transparent' }} 
           />
           
           {/* Main Light Overlay */}
           <div 
              className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-full h-full bg-amber-200/20 blur-[80px] rounded-full transition-opacity duration-500 pointer-events-none" 
              style={{ opacity: lightOn ? 1 : 0 }} 
           />
           
           <div className="absolute inset-0 p-6 z-10 flex border-[8px] border-zinc-900 rounded-2xl m-2 pointer-events-none">
              
              {/* Lamp Fixture */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-zinc-800 rounded-b-xl border-b border-x border-white/10 flex justify-center shadow-lg pointer-events-none">
                 <div className={`w-10 h-10 -mt-2 rounded-full transition-all duration-300 ${lightOn ? 'bg-amber-100 shadow-[0_0_50px_15px_rgba(251,191,36,0.4)]' : 'bg-zinc-700 shadow-inner'}`} />
              </div>
              
              {/* Smart Speaker (Rack/Table) */}
              <div className="absolute bottom-6 left-6 flex items-end gap-4 pointer-events-none">
                 <div className="w-12 h-16 rounded-xl border border-white/10 transition-colors duration-500 flex flex-col justify-end p-2 bg-zinc-900 relative shadow-2xl overflow-hidden">
                   {/* Speaker Grill */}
                   <div className="w-full h-8 border-t border-white/5 opacity-50 flex flex-col gap-1.5 justify-center items-center mt-1">
                     <div className="w-6 h-0.5 bg-zinc-700 rounded-full" />
                     <div className="w-6 h-0.5 bg-zinc-700 rounded-full" />
                     <div className="w-6 h-0.5 bg-zinc-700 rounded-full" />
                   </div>
                   {/* LED Ring */}
                   <div className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-300 ${ledOn ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: ledColor, boxShadow: `0 0 15px ${ledColor}` }} />
                 </div>
                 
                 {/* Music Visualizer bars */}
                 <div className="flex gap-1 items-end h-10 mb-2">
                   {[1, 2, 3, 4, 5].map((bar, i) => (
                      <div 
                        key={bar} 
                        className={`w-1.5 rounded-t-[1px] transition-all duration-500 bg-blue-400 origin-bottom`}
                        style={{ 
                          height: soundOn ? '100%' : '20%',
                          animation: soundOn ? `eq ${0.5 + (i % 3) * 0.2}s ease-in-out infinite alternate` : 'none',
                          boxShadow: soundOn ? '0 0 8px rgba(96,165,250,0.6)' : 'none'
                        }}
                      />
                   ))}
                 </div>
              </div>
              
              {/* AC Unit */}
              <div className="absolute top-8 right-6 w-24 h-8 bg-zinc-800 rounded-md border border-white/10 flex items-center justify-between px-2 shadow-lg pointer-events-none">
                 <div className={`text-[10px] font-mono font-bold ${acTemp < 22 ? 'text-blue-400' : acTemp > 24 ? 'text-orange-400' : 'text-blue-400'}`}>
                   {acTemp}°C
                 </div>
                 <div className="flex gap-1">
                   <div className={`w-1 h-1 rounded-full ${acTemp < 22 ? 'bg-blue-500' : 'bg-blue-500'}`} />
                 </div>
                 {/* Airflow waves */}
                 <div className="absolute -bottom-4 right-2 flex gap-1 opacity-40">
                   <div className="w-0.5 h-3 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                   <div className="w-0.5 h-4 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                   <div className="w-0.5 h-3 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                 </div>
              </div>
              
           </div>
           
           {/* TV Screen or Panel on the wall */}
           <div className="w-32 h-20 bg-zinc-900 border border-white/5 rounded-lg ml-auto mr-12 mt-20 shadow-xl overflow-hidden flex flex-col pointer-events-none relative z-0">
              <div className={`h-full w-full transition-all duration-1000 ${lightOn ? 'opacity-10' : 'opacity-40'} bg-gradient-to-br from-transparent to-white/5`} />
              {ledOn && <div className="h-0.5 w-full opacity-50 absolute bottom-0" style={{ backgroundColor: ledColor, boxShadow: `0 0 10px ${ledColor}` }} />}
           </div>
        </div>
        
        <style>{`
          @keyframes eq {
             0% { transform: scaleY(0.3); }
             50% { transform: scaleY(1); }
             100% { transform: scaleY(0.3); }
          }
        `}</style>
      </div>
    </div>
  );
};

