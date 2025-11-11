import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Zap, Coins, Plus, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Készen állsz a játékra? Kezdjük is!',
      description: 'Lődd le a dobozokat és szerezz pontokat!'
    },
    {
      title: 'Ideje elkezdeni!',
      description: 'Teljesíts küldetéseket és legyél a legjobb!'
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900 to-black p-8">
      {/* Floating particles background */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * 393, 
            y: -20,
            rotate: Math.random() * 360
          }}
          animate={{
            y: 900,
            rotate: Math.random() * 360 + 180
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        >
          {i % 4 === 0 && <Coins className="w-6 h-6 text-yellow-400" />}
          {i % 4 === 1 && <Plus className="w-5 h-5 text-yellow-300" />}
          {i % 4 === 2 && <Package className="w-7 h-7 text-yellow-500/70" />}
          {i % 4 === 3 && <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
        </motion.div>
      ))}

      {/* Glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 mt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="text-center px-6"
          >
            {currentSlide === 0 && (
              <motion.div className="mb-16">
                <motion.div
                  className="relative inline-flex gap-4 mb-8"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Package className="w-16 h-16 text-yellow-400" />
                  <Package className="w-20 h-20 text-yellow-500" />
                  <Package className="w-14 h-14 text-yellow-300" />
                </motion.div>
                <motion.div
                  className="flex justify-center gap-3 mb-8"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  <Coins className="w-12 h-12 text-yellow-400" />
                  <Zap className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                  <Plus className="w-8 h-8 text-yellow-300" />
                </motion.div>
              </motion.div>
            )}

            {currentSlide === 1 && (
              <motion.div className="mb-16 relative">
                {/* Blurred logo background */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Zap className="w-48 h-48 fill-yellow-400 stroke-yellow-500" />
                </motion.div>
                <motion.div
                  animate={{
                    filter: ['drop-shadow(0 0 20px #fbbf24)', 'drop-shadow(0 0 40px #fbbf24)', 'drop-shadow(0 0 20px #fbbf24)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="relative w-32 h-32 fill-yellow-400 stroke-yellow-500 stroke-2 mx-auto" />
                </motion.div>
              </motion.div>
            )}

            <h1 className="text-white mb-4 px-4" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
              {slides[currentSlide].title}
            </h1>
            <p className="text-yellow-100/80 px-6">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex gap-2 mb-8 z-10">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-yellow-400' : 'w-2 bg-yellow-400/30'
            }`}
            animate={{
              scale: index === currentSlide ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 0.5, repeat: index === currentSlide ? Infinity : 0 }}
          />
        ))}
      </div>

      {/* Next/Start button */}
      <Button
        onClick={nextSlide}
        className="w-64 h-14 rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500 text-black shadow-[0_0_20px_rgba(251,191,36,0.6)] border-2 border-yellow-400/50 mb-8 z-10"
        style={{ boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.3), 0 0 30px rgba(251,191,36,0.6)' }}
      >
        <span className="flex items-center gap-2">
          {currentSlide === slides.length - 1 ? 'Start' : 'Tovább'}
          <ChevronRight className="w-5 h-5" />
        </span>
      </Button>
    </div>
  );
}
