
import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#0f0505] overflow-hidden">
      <div className="noise" />
      
      {/* Dynamic Blobs */}
      <motion.div 
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 120, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#ff4e50] rounded-full blur-[120px] opacity-30"
      />
      <motion.div 
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -60, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-15%] right-[-5%] w-[50vw] h-[50vw] bg-[#fc913a] rounded-full blur-[100px] opacity-25"
      />
      <motion.div 
        animate={{
          x: [0, 50, -100, 0],
          y: [0, 150, -80, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-[#ff6a88] rounded-full blur-[110px] opacity-20"
      />
      
      {/* Subtle Grid / Texture overlay if needed, but noise + blobs is very premium */}
    </div>
  );
};

export default Background;
