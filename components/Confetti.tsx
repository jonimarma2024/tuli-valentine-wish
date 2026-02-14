
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Confetti: React.FC = () => {
  const colors = ["#fff", "#ff4e50", "#ff99ac", "#fc913a", "#ffd700"];
  
  const particles = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      rotate: Math.random() * 360,
      size: 6 + Math.random() * 6
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ 
            y: '100vh', 
            opacity: 0, 
            rotate: p.rotate + 720,
            x: Math.random() * 100 - 50 
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay, 
            ease: "easeOut"
          }}
          className="absolute rounded-sm"
          style={{ 
            left: p.left, 
            backgroundColor: p.color, 
            width: p.size, 
            height: p.size 
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
