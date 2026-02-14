
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingHeartsProps {
  count?: number;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 20 }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 5 + Math.random() * 10,
      size: 15 + Math.random() * 20
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0, scale: 0.5 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.7, 0.7, 0],
            scale: [0.5, 1, 1.2, 0.8],
            x: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          className="absolute text-red-400 drop-shadow-md"
          style={{ left: heart.left, fontSize: heart.size }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
