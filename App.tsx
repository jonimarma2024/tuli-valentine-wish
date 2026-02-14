
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Loader2, Gift, ChevronRight } from 'lucide-react';
import { generateLovePoem } from './services/geminiService';
import Background from './components/Background';
import FloatingHearts from './components/FloatingHearts';
import Confetti from './components/Confetti';
import MouseTrail from './components/MouseTrail';

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [poem, setPoem] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const messages = [
    { title: "💌 A Little Surprise", text: "Are you ready, TULI? 💖", button: "Yes, I'm ready! ✨" },
    { title: "🌹 Thinking of You", text: "There's someone whose presence fills the world with color...", button: "Who is it? 💫" },
    { title: "💞 Unmatched Beauty", text: "Her smile outshines the stars, and her heart is pure magic...", button: "Tell me more 🌌" },
    { title: "✨ My Everything", text: "You are the most precious soul I've ever known.", button: "Open My Gift 🎁" }
  ];

  const handleNext = async () => {
    if (step < messages.length - 1) {
      setStep(prev => prev + 1);
    } else if (step === messages.length - 1) {
      setStep(99); 
      setIsGenerating(true);
      try {
        const result = await generateLovePoem('TULI');
        setPoem(result);
      } catch (error) {
        setPoem("In the garden of my heart, you're the most beautiful bloom,\nA light that dispels every shadow and gloom. ❤️");
      } finally {
        setIsGenerating(false);
        setStep(100);
      }
    }
  };

  const openGift = () => {
    setGiftOpened(true);
    setShowConfetti(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center cursor-default">
      <Background />
      <MouseTrail />
      <FloatingHearts count={15} />
      
      {showConfetti && <Confetti />}

      <AnimatePresence mode="wait">
        {step < 99 && (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="z-20 w-full max-w-lg px-6"
          >
            <div className="glass-card glow-border p-8 md:p-14 rounded-[3rem] text-center text-white">
              {/* Progress hearts */}
              <div className="flex justify-center gap-2 mb-8">
                {messages.map((_, i) => (
                  <Heart 
                    key={i} 
                    className={`w-4 h-4 transition-all duration-500 ${i <= step ? 'text-red-500 fill-red-500 scale-125' : 'text-white/20'}`} 
                  />
                ))}
              </div>

              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-6 tracking-tight"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {messages[step].title}
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl font-light min-h-[6rem] flex items-center justify-center leading-relaxed"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {messages[step].text}
              </motion.p>

              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="mt-10 px-10 py-4 bg-white text-[#ff4e50] font-bold rounded-full shadow-2xl transition-all flex items-center gap-3 mx-auto group"
              >
                {messages[step].button}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 99 && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-20 text-center text-white p-8"
          >
            <div className="relative w-24 h-24 mx-auto mb-8">
              <Loader2 className="w-full h-full animate-spin text-white opacity-20" />
              <Heart className="absolute inset-0 m-auto w-10 h-10 text-red-500 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold mb-3 tracking-widest uppercase">Creating Magic</h2>
            <p className="text-lg opacity-60 italic">Weaving a poem just for TULI...</p>
          </motion.div>
        )}

        {step === 100 && !giftOpened && (
          <motion.div
            key="gift"
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="z-20 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              onClick={openGift}
              className="cursor-pointer group relative"
            >
              <div className="absolute -inset-10 bg-red-500/30 blur-[60px] rounded-full group-hover:bg-red-500/50 transition-all" />
              <Gift className="w-40 h-40 text-white relative z-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]" />
              <p className="text-white font-bold text-xl mt-8 animate-bounce tracking-widest">TAP TO OPEN</p>
            </motion.div>
          </motion.div>
        )}

        {step === 100 && giftOpened && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="z-20 w-full max-w-2xl px-6"
          >
            <div className="glass-card glow-border p-10 md:p-16 rounded-[4rem] text-center text-white relative overflow-hidden">
              <Sparkles className="absolute top-8 left-8 text-yellow-300 opacity-40 w-10 h-10" />
              <Heart className="absolute bottom-8 right-8 text-red-400 opacity-40 w-10 h-10 animate-pulse" />
              
              <motion.h2 
                className="text-4xl md:text-5xl font-black mb-10 tracking-tight"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
              >
                Happy Valentine's Day,<br/><span className="text-red-400">TULI</span>
              </motion.h2>
              
              <div className="font-serif text-2xl md:text-3xl leading-relaxed italic mb-10 text-white/90 px-4 md:px-10">
                {poem.split('\n').map((line, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.3 }}
                    className="mb-2"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              
              <motion.p 
                className="text-xl md:text-2xl font-bold mt-6 tracking-widest text-red-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                You are my forever & always ❤️
              </motion.p>

              <button 
                onClick={() => window.location.reload()}
                className="mt-12 text-sm opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
              >
                Relive the Magic
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
