/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '../constants';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white border border-black/5 rounded-3xl p-8 hover:border-brand-yellow/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-brand-yellow/5"
    >
      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
        <ExternalLink className="w-6 h-6 text-brand-yellow" />
      </div>

      <div className="flex flex-col h-full">
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gray text-[10px] font-bold uppercase tracking-widest text-black/60 mb-4">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-yellow transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <p className="text-black/60 leading-relaxed text-sm">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-md bg-brand-yellow/10 text-brand-black/70">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-black/5">
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all"
          >
            Acessar Projeto
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
