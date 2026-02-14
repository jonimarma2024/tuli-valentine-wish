
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
}

const MouseTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const chars = ['✨', '❤️', '💖', '⭐', '🌸'];

  const addParticle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    const char = chars[Math.floor(Math.random() * chars.length)];
    setParticles((prev) => [...prev.slice(-15), { id, x, y, char }]);
    
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => p.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      addParticle(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [addParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, x: p.x - 10, y: p.y - 10 }}
            animate={{ opacity: 0, scale: 1.5, y: p.y - 50 }}
            exit={{ opacity: 0 }}
            className="absolute text-sm select-none"
          >
            {p.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MouseTrail;
