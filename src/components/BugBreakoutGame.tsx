import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface BugBreakoutGameProps {
  isDarkMode: boolean;
  onClose: () => void;
}

export const BugBreakoutGame = ({ isDarkMode, onClose }: BugBreakoutGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  
  // Game state
  const paddleRef = useRef({ x: 0, w: 120, h: 15 });
  const ballRef = useRef({ x: 0, y: 0, dx: 4, dy: -4, radius: 6 });
  const blocksRef = useRef<{x: number, y: number, w: number, h: number, status: number}[]>([]);
  const scoreRef = useRef(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);

  const initGame = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    // Paddle init
    paddleRef.current = {
      x: canvas.width / 2 - 60,
      w: 120,
      h: 15
    };

    // Ball init
    ballRef.current = {
      x: canvas.width / 2,
      y: canvas.height - 30,
      dx: 4 + Math.random() * 2,
      dy: -5,
      radius: 6
    };

    // Blocks init
    const blockRows = 5;
    const blockCols = 8;
    const blockPadding = 10;
    const blockOffsetTop = 50;
    const blockOffsetLeft = 35;
    const blockW = (canvas.width - (blockOffsetLeft * 2) - (blockPadding * (blockCols - 1))) / blockCols;
    
    const newBlocks = [];
    for (let c = 0; c < blockCols; c++) {
      for (let r = 0; r < blockRows; r++) {
        newBlocks.push({
          x: c * (blockW + blockPadding) + blockOffsetLeft,
          y: r * (25 + blockPadding) + blockOffsetTop,
          w: blockW,
          h: 25,
          status: 1
        });
      }
    }
    blocksRef.current = newBlocks;
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddleRef.current.x, canvas.height - paddleRef.current.h - 10, paddleRef.current.w, paddleRef.current.h);
      ctx.fillStyle = isDarkMode ? '#10b981' : '#059669';
      ctx.fill();
      ctx.closePath();
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDarkMode ? '#fff' : '#000';
      ctx.fill();
      ctx.closePath();
    };

    const drawBlocks = () => {
      blocksRef.current.forEach(b => {
        if (b.status === 1) {
          ctx.beginPath();
          ctx.rect(b.x, b.y, b.w, b.h);
          ctx.fillStyle = isDarkMode ? '#ef4444' : '#dc2626'; // Red for bugs
          ctx.fill();
          
          // Draw bug legs or something simple
          ctx.fillStyle = isDarkMode ? '#fff' : '#000';
          ctx.font = '12px Courier';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('BUG', b.x + b.w/2, b.y + b.h/2);
          
          ctx.closePath();
        }
      });
    };

    const collisionDetection = () => {
      let activeBlocks = 0;
      blocksRef.current.forEach(b => {
        if (b.status === 1) {
          activeBlocks++;
          const ball = ballRef.current;
          if (ball.x > b.x && ball.x < b.x + b.w && ball.y > b.y && ball.y < b.y + b.h) {
            ball.dy = -ball.dy;
            b.status = 0;
            scoreRef.current += 10;
            setScore(scoreRef.current);
          }
        }
      });
      if (activeBlocks === 0 && blocksRef.current.length > 0) {
        setGameWon(true);
      }
    };

    const update = () => {
      if (gameOver || gameWon) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawBlocks();
      drawPaddle();
      drawBall();
      collisionDetection();

      const ball = ballRef.current;
      const paddle = paddleRef.current;

      // Wall collision
      if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
      }
      if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
      } else if (ball.y + ball.dy > canvas.height - ball.radius - paddle.h - 10) {
        // Paddle collision
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
          ball.dy = -ball.dy;
          // Add some angle depending on where it hits
          ball.dx = ball.dx + ((ball.x - (paddle.x + paddle.w/2)) * 0.1);
        } else if (ball.y + ball.dy > canvas.height - ball.radius) {
          setGameOver(true);
        }
      }

      ball.x += ball.dx;
      ball.y += ball.dy;

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDarkMode, gameOver, gameWon]);

  // Mouse / Touch control
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current || gameOver || gameWon) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      if (relativeX > 0 && relativeX < canvasRef.current.width) {
         paddleRef.current.x = relativeX - paddleRef.current.w / 2;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvasRef.current || gameOver || gameWon) return;
      e.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const relativeX = e.touches[0].clientX - rect.left;
      if (relativeX > 0 && relativeX < canvasRef.current.width) {
         paddleRef.current.x = relativeX - paddleRef.current.w / 2;
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      window.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas) canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameOver, gameWon]);
  
  // Wheel control (scroll logic)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!canvasRef.current || gameOver || gameWon) return;
      // move paddle based on scroll
      paddleRef.current.x += e.deltaY * 0.5;
      
      // Boundaries
      if (paddleRef.current.x < 0) paddleRef.current.x = 0;
      if (paddleRef.current.x + paddleRef.current.w > canvasRef.current.width) {
        paddleRef.current.x = canvasRef.current.width - paddleRef.current.w;
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [gameOver, gameWon]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center ${isDarkMode ? 'bg-[#080c0f]/90' : 'bg-[#fafcfc]/90'} backdrop-blur-md`}
    >
      <button 
        onClick={onClose}
        className={`absolute top-6 right-6 p-3 rounded-full border transition-colors ${isDarkMode ? 'border-white/10 text-white/50 hover:bg-white/5' : 'border-black/10 text-black/50 hover:bg-black/5'}`}
      >
        <X size={24} />
      </button>

      <div className="mb-4 text-center">
        <h2 className="text-3xl font-black font-serif italic text-emerald-500 mb-2">Breakout de Bugs</h2>
        <p className={`text-sm font-mono ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Score: {score}</p>
      </div>

      <div className={`relative rounded-3xl overflow-hidden border shadow-2xl ${isDarkMode ? 'border-white/10 bg-black/50' : 'border-black/10 bg-white/50'}`}>
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={500} 
          className="max-w-full touch-none cursor-none bg-transparent block"
        />

        <AnimatePresence>
          {(gameOver || gameWon) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <h3 className={`text-5xl font-black mb-4 ${gameWon ? 'text-emerald-500' : 'text-red-500'}`}>
                {gameWon ? 'SISTEMA LIMPO!' : 'CAIU EM PRODUÇÃO!'}
              </h3>
              <p className="text-white mb-8 font-mono">Score Final: {score}</p>
              <button
                onClick={initGame}
                className="px-8 py-3 bg-emerald-500 text-white rounded-full font-bold uppercase tracking-widest hover:bg-emerald-600 transition-colors"
              >
                Jogar Novamente
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <p className={`mt-6 text-xs font-mono max-w-md text-center ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
        Dica: Use o mouse, o touch ou a barra de rolagem (scroll) para mover a plataforma e esmagar os bugs.
      </p>
    </motion.div>
  );
};
