import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'motion/react';

interface SkillsGraphSectionProps {
  isDarkMode: boolean;
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  radius: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

const data = {
  nodes: [
    // Center / Hub
    { id: 'Lucas Leniar', group: 0, radius: 25 },
    
    // Categorias Principais
    { id: 'Infraestrutura', group: 1, radius: 18 },
    { id: 'Engenharia de Software', group: 2, radius: 18 },
    { id: 'Ensino', group: 3, radius: 18 },
    { id: 'DevSecOps', group: 4, radius: 18 },

    // Infra
    { id: 'Linux', group: 1, radius: 12 },
    { id: 'Redes', group: 1, radius: 12 },
    { id: 'Hardware', group: 1, radius: 12 },
    { id: 'Servidores', group: 1, radius: 12 },

    // Eng
    { id: 'TypeScript', group: 2, radius: 12 },
    { id: 'React', group: 2, radius: 12 },
    { id: 'Node.js', group: 2, radius: 12 },
    { id: 'Tailwind CSS', group: 2, radius: 12 },

    // Ensino
    { id: 'Robótica', group: 3, radius: 12 },
    { id: 'Pensamento Computacional', group: 3, radius: 12 },
    { id: 'Didática', group: 3, radius: 12 },
    { id: 'Palestras', group: 3, radius: 12 },

    // DevSecOps
    { id: 'Docker', group: 4, radius: 12 },
    { id: 'AWS', group: 4, radius: 12 },
    { id: 'Infra as Code', group: 4, radius: 12 },
    { id: 'Segurança', group: 4, radius: 12 },
  ],
  links: [
    { source: 'Lucas Leniar', target: 'Infraestrutura' },
    { source: 'Lucas Leniar', target: 'Engenharia de Software' },
    { source: 'Lucas Leniar', target: 'Ensino' },
    { source: 'Lucas Leniar', target: 'DevSecOps' },

    { source: 'Infraestrutura', target: 'Linux' },
    { source: 'Infraestrutura', target: 'Redes' },
    { source: 'Infraestrutura', target: 'Hardware' },
    { source: 'Infraestrutura', target: 'Servidores' },

    { source: 'Engenharia de Software', target: 'TypeScript' },
    { source: 'Engenharia de Software', target: 'React' },
    { source: 'Engenharia de Software', target: 'Node.js' },
    { source: 'Engenharia de Software', target: 'Tailwind CSS' },

    { source: 'Ensino', target: 'Robótica' },
    { source: 'Ensino', target: 'Pensamento Computacional' },
    { source: 'Ensino', target: 'Didática' },
    { source: 'Ensino', target: 'Palestras' },

    { source: 'DevSecOps', target: 'Docker' },
    { source: 'DevSecOps', target: 'AWS' },
    { source: 'DevSecOps', target: 'Infra as Code' },
    { source: 'DevSecOps', target: 'Segurança' },
    
    // Crossovers
    { source: 'Ensino', target: 'Robótica' },
    { source: 'DevSecOps', target: 'Linux' },
    { source: 'DevSecOps', target: 'Node.js' },
    { source: 'Engenharia de Software', target: 'Docker' },
  ]
};

const SkillsGraphSection = ({ isDarkMode }: SkillsGraphSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous if re-rendered
    d3.select(containerRef.current).selectAll('*').remove();
    d3.selectAll('.skill-tooltip').remove();

    const width = containerRef.current.clientWidth;
    const height = 500; // Fixed inner height for the canvas

    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;')
      .style('display', 'block') // Remove margins from inline block
      .style('cursor', 'grab');

    const color = d3.scaleOrdinal(d3.schemePaired);

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(60))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius((d: any) => d.radius + 15).iterations(2));

    const link = svg.append('g')
      .attr('stroke', isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(2));

    const tooltip = d3.select(document.body)
      .append("div")
      .attr("class", "skill-tooltip")
      .style("position", "fixed")
      .style("visibility", "hidden")
      .style("background-color", isDarkMode ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)")
      .style("color", isDarkMode ? "white" : "black")
      .style("padding", "5px 10px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("z-index", "9999")
      .style("border", `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`);

    const node = svg.append('g')
      .attr('stroke', isDarkMode ? '#1e293b' : '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => {
        if (d.group === 0) return isDarkMode ? '#10b981' : '#059669'; // custom for center
        return color(d.group.toString());
      })
      .on("mouseover", function (event, d) {
        d3.select(this)
          .attr("stroke", isDarkMode ? "#fff" : "#000")
          .attr("stroke-width", 2);
        
        tooltip
          .html(d.id)
          .style("visibility", "visible");
      })
      .on("mousemove", function (event) {
        let x = event.clientX + 10;
        let y = event.clientY - 10;
        tooltip
          .style("top", y + "px")
          .style("left", x + "px");
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("stroke", isDarkMode ? "#1e293b" : "#fff")
          .attr("stroke-width", 1.5);
        tooltip.style("visibility", "hidden");
      })
      //@ts-ignore
      .call(drag(simulation));

    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.id)
      .attr('font-size', d => d.group === 0 ? '12px' : '9px')
      .attr('font-weight', d => d.group === 0 ? 'bold' : 'normal')
      .attr('fill', isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.radius + 12)
      .style('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x = Math.max(d.radius, Math.min(width - d.radius, d.x)))
        .attr('cy', (d: any) => d.y = Math.max(d.radius, Math.min(height - d.radius, d.y)));
        
      labels
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    function drag(simulation: d3.Simulation<any, any>) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
        svg.style('cursor', 'grabbing');
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
        tooltip.style("top", (event.pageY - 10) + "px")
               .style("left", (event.pageX + 10) + "px");
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
        svg.style('cursor', 'grab');
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
    
    // Handle Window Resize
    const handleResize = () => {
      if (containerRef.current) {
         const newWidth = containerRef.current.clientWidth;
         svg.attr('width', newWidth).attr('viewBox', [0, 0, newWidth, height]);
         simulation.force('center', d3.forceCenter(newWidth / 2, height / 2));
         simulation.alpha(0.3).restart();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
       window.removeEventListener('resize', handleResize);
       d3.selectAll('.skill-tooltip').remove();
    };

  }, [isDarkMode]);

  return (
    <div className={`w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full text-center space-y-4 mb-8 z-10"
      >
        <h2 className="text-3xl md:text-5xl font-black tracking-tight font-serif italic text-emerald-500">
          Topologia de Habilidades
        </h2>
        <p className={`text-base md:text-xl font-light max-w-2xl mx-auto ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
          Explore interativamente as áreas de conhecimento. Segure e puxe os nós da rede para visualizar como a infraestrutura, a didática e a engenharia de software estão profundamente interconectadas.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="relative w-full overflow-hidden border rounded-3xl shadow-2xl bg-white/5 backdrop-blur-sm"
        style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', background: isDarkMode ? 'rgba(10,15,20,0.4)' : 'rgba(250,250,250,0.8)' }}
      >
        <div ref={containerRef} className="w-full h-[500px] relative overflow-hidden" />
      </motion.div>
    </div>
  );
};

export default SkillsGraphSection;
