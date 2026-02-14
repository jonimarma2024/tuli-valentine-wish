
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Loader2, Gift, ChevronRight, Infinity as InfinityIcon } from 'lucide-react';
import { generateLovePoem } from './services/geminiService';
import Background from './components/Background';
import FloatingHearts from './components/FloatingHearts';
import Confetti from './components/Confetti';
import MouseTrail from './components/MouseTrail';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [poem, setPoem] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const messages = [
    { title: "A Special Letter", text: "There's something I've wanted to share with you, TULI...", button: "Read Letter ✨" },
    { title: "The World is Brighter", text: "Since the day you entered my life, every moment has gained a new kind of glow.", button: "How so? 💫" },
    { title: "Beyond Words", text: "Your kindness, your beauty, and your soul are a universe I feel lucky to explore.", button: "Keep Going 🌌" },
    { title: "For You, Only", text: "I asked the stars to write something as beautiful as you are...", button: "Reveal My Gift 🎁" }
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
        setPoem("You are the light that guides me home,\nThe softest grace I've ever known. ❤️");
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
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center cursor-default">
      <Background />
      <MouseTrail />
      <FloatingHearts count={20} />
      
      {showConfetti && <Confetti />}

      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(20px)' }}
            className="z-20 text-center px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              className="mb-8"
            >
              <Heart className="w-20 h-20 text-red-500 fill-red-500 mx-auto drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
              A Gift for <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">TULI</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-12 max-w-lg mx-auto font-light leading-relaxed">
              A private interactive experience crafted with love to celebrate a beautiful soul.
            </p>
            <motion.button
              onClick={() => setIsStarted(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white text-black font-bold rounded-full shadow-2xl hover:bg-red-50 transition-colors flex items-center gap-3 mx-auto text-lg"
            >
              Enter the Experience
              <Sparkles className="w-5 h-5 text-orange-500" />
            </motion.button>
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            {step < 99 && (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="z-20 w-full max-w-2xl px-6"
              >
                <div className="glass-card glow-border p-10 md:p-20 rounded-[4rem] text-center text-white">
                  <div className="flex justify-center gap-3 mb-12">
                    {messages.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-700 ${i <= step ? 'w-8 bg-red-500' : 'w-4 bg-white/10'}`} 
                      />
                    ))}
                  </div>

                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    {messages[step].title}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-xl md:text-2xl font-light min-h-[8rem] flex items-center justify-center leading-relaxed text-white/80"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {messages[step].text}
                  </motion.p>

                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-12 px-12 py-5 bg-gradient-to-r from-[#ff4e50] to-[#fc913a] text-white font-bold rounded-2xl shadow-xl transition-all flex items-center gap-3 mx-auto text-lg"
                  >
                    {messages[step].button}
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 99 && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="z-20 text-center text-white"
              >
                <div className="relative w-32 h-32 mx-auto mb-10">
                  <Loader2 className="w-full h-full animate-spin text-white opacity-10" />
                  <Heart className="absolute inset-0 m-auto w-12 h-12 text-red-500 animate-pulse" />
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">Crafting Your Poem</h2>
                <p className="text-xl text-white/50 italic font-light">The stars are aligning for TULI...</p>
              </motion.div>
            )}

            {step === 100 && !giftOpened && (
              <motion.div
                key="gift"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="z-20 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={openGift}
                  className="cursor-pointer group relative"
                >
                  <div className="absolute -inset-20 bg-red-600/20 blur-[80px] rounded-full group-hover:bg-red-600/40 transition-all duration-700" />
                  <Gift className="w-48 h-48 text-white relative z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all" />
                  <div className="mt-10 text-white">
                    <p className="font-bold text-2xl tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">Touch the Magic</p>
                    <p className="text-white/40 mt-2 font-light">to reveal your surprise</p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {step === 100 && giftOpened && (
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-20 w-full max-w-3xl px-6"
              >
                <div className="glass-card glow-border p-12 md:p-20 rounded-[5rem] text-center text-white relative overflow-hidden">
                  <motion.div 
                    className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 blur-3xl rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter">
                      Happy Valentine's,<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4e50] to-[#fc913a]">TULI</span>
                    </h2>
                  </motion.div>
                  
                  <div className="font-serif text-3xl md:text-4xl leading-relaxed italic mb-16 text-white/95 px-4">
                    {poem.split('\n').map((line, i) => (
                      <motion.p 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.4 }}
                        className="mb-3"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="flex items-center justify-center gap-3 text-red-400 font-bold text-2xl tracking-widest mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                  >
                    <InfinityIcon className="w-6 h-6" />
                    ALWAYS & FOREVER
                    <InfinityIcon className="w-6 h-6" />
                  </motion.div>

                  <button 
                    onClick={() => window.location.reload()}
                    className="text-xs opacity-30 hover:opacity-100 transition-opacity uppercase tracking-[0.4em] font-medium"
                  >
                    Relive the Experience
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Website Footer */}
      <div className="fixed bottom-8 left-0 w-full text-center z-30 pointer-events-none opacity-30">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-medium text-white/60">
          A Private Commemorative Website for TULI &bull; MMXXV
        </p>
      </div>
    </div>
  );
};

export default App;
