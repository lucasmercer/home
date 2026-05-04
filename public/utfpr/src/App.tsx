/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import { PROJECTS, SKILLS } from './constants';
import { Sparkles, Library, GraduationCap, Linkedin, Globe, BookOpen, Code, Lightbulb, ArrowRight } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-gray selection:bg-brand-yellow selection:text-brand-black">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-yellow/10 blur-[120px] rounded-full -z-10" />
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/5 text-[10px] font-bold uppercase tracking-widest text-black/40 mb-8"
              >
                <Sparkles className="w-3 h-3 text-brand-yellow" />
                LCOMP • UTFPR • Ponta Grossa
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-display font-bold leading-[0.85] tracking-tighter mb-8"
              >
                Educação <span className="text-brand-yellow">Potencializada</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-black via-black/80 to-black/30">pela Tecnologia.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-black/60 leading-relaxed mb-12 max-w-2xl"
              >
                Portfólio de projetos acadêmicos e experiências desenvolvidas por Lucas Mercer Leniar 
                durante a graduação em <span className="font-bold text-brand-black">Licenciatura em Computação</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a 
                  href="#projetos"
                  className="px-8 py-4 bg-brand-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-yellow hover:text-brand-black transition-all shadow-xl shadow-black/10 active:scale-95 flex items-center gap-2"
                >
                  Explorar Projetos
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 bg-brand-black text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Expertise & <br />Foco Acadêmico</h3>
                <p className="text-white/50 mb-12 max-w-md">
                  Minha formação une o rigor técnico da computação com as metodologias de ensino 
                  mais eficientes da atualidade.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <BookOpen className="w-6 h-6 text-brand-yellow mb-4" />
                    <h5 className="font-bold text-sm mb-1">Pedagogia Digital</h5>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Ensino & Pesquisa</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <Code className="w-6 h-6 text-brand-yellow mb-4" />
                    <h5 className="font-bold text-sm mb-1">Denv. de Software</h5>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Fullstack & UI/UX</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {SKILLS.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-brand-yellow font-bold uppercase tracking-widest">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-brand-yellow rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projetos" className="py-32 bg-white rounded-[48px] md:rounded-[80px] shadow-2xl shadow-black/5 mx-4 md:mx-10 relative -mt-12 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-brand-yellow" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black/40">Acervo UTFPR</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold italic tracking-tight">Trabalhos Acadêmicos</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact/CTA */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-block p-4 rounded-3xl bg-white border border-black/5 shadow-xl mb-12">
              <Lightbulb className="w-8 h-8 text-brand-yellow" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Vamos colaborar <br />em algo novo?</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="https://lucasleniar.com.br" className="px-10 py-5 bg-brand-yellow text-brand-black font-bold uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-brand-yellow/20">
                Visite meu Site Oficial
              </a>
              <a href="https://linkedin.com/in/lucasleniar" className="px-10 py-5 bg-white text-brand-black border border-black/10 font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-brand-gray transition-colors">
                Me chame no LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-black/5 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="bg-brand-black p-1.5 rounded-lg">
                <GraduationCap className="w-5 h-5 text-brand-yellow" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">Lucas Mercer Leniar</span>
            </div>
            <div className="flex gap-8">
              <a href="https://linkedin.com/in/lucasleniar" className="text-black/40 hover:text-brand-black transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://lucasleniar.com.br" className="text-black/40 hover:text-brand-black transition-colors"><Globe className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-black/30">
            <p>&copy; {new Date().getFullYear()} LCOMP UTFPR - Ponta Grossa</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
