/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="bg-brand-yellow p-2 rounded-xl">
            <GraduationCap className="w-6 h-6 text-brand-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-none">Lucas Mercer Leniar</h1>
            <p className="text-[10px] uppercase tracking-widest text-black/50 mt-1 font-semibold">Portfólio LCOMP UTFPR</p>
          </div>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-8"
        >
          <a href="#projetos" className="text-sm font-medium hover:text-brand-yellow transition-colors">Projetos</a>
          <a href="https://lucasleniar.com.br" className="text-sm font-medium hover:text-brand-yellow transition-colors">Site Principal</a>
          <span className="h-4 w-px bg-black/10" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">UTFPR / PG</span>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
