import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface NetworkBackgroundProps {
  isDarkMode: boolean;
}

export const NetworkBackground: React.FC<NetworkBackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: Point[] = [];
    const connectionDistance = 150;
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const initPoints = () => {
      points = [];
      // Adjust density based on screen size but cap it to avoid O(n^2) performance issues in Safari
      const isMobile = window.innerWidth < 768;
      const calculatedPoints = Math.floor((canvas.width * canvas.height) / (isMobile ? 30000 : 15000));
      const numberOfPoints = Math.min(isMobile ? 30 : 80, calculatedPoints); // Fixed maximum to prevent lag
      for (let i = 0; i < numberOfPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    
    resizeCanvas();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const color = isDarkMode ? '6, 182, 212' : '16, 185, 129'; // Cyan-500 for dark, Emerald-500 for light

      // Update points and draw them
      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Keep inside bounds just in case of resize
        if (p.x < 0) p.x = 0;
        if (p.x > canvas.width) p.x = canvas.width;
        if (p.y < 0) p.y = 0;
        if (p.y > canvas.height) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${isDarkMode ? 0.8 : 0.6})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            const opacity = (1 - dist / connectionDistance) * (isDarkMode ? 0.3 : 0.15);
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        
        // Connect to mouse
        const dxMouse = points[i].x - mouse.x;
        const dyMouse = points[i].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < 200) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = (1 - distMouse / 200) * (isDarkMode ? 0.5 : 0.25);
          ctx.strokeStyle = `rgba(${color}, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          
          // Slight push away from mouse
          if (distMouse < 100) {
            points[i].x += dxMouse * 0.01;
            points[i].y += dyMouse * 0.01;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className={`absolute inset-0 bg-gradient-to-bl from-transparent ${isDarkMode ? 'to-[#0e1520]' : 'to-white'} z-10`} />
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-1000 ${isDarkMode ? 'opacity-80' : 'opacity-60'}`}
      />
    </div>
  );
};
