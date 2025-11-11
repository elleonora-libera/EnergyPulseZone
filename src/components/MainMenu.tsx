import { motion } from 'motion/react';
import { Play, Settings, BookOpen, Coins, Plus, Zap } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen } from '../App';

interface MainMenuProps {
  score: number;
  onNavigate: (screen: Screen) => void;
  onStartGame: () => void;
}

export function MainMenu({ score, onNavigate, onStartGame }: MainMenuProps) {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900 to-black p-8">
      {/* Floating coins and particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * 393, 
            y: -20
          }}
          animate={{
            y: 900,
            rotate: 360
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'linear'
          }}
        >
          {i % 3 === 0 && <Coins className="w-6 h-6 text-yellow-400/60" />}
          {i % 3 === 1 && <Plus className="w-5 h-5 text-yellow-300/50" />}
          {i % 3 === 2 && <div className="w-2 h-2 bg-yellow-400/40 rounded-full" />}
        </motion.div>
      ))}

      {/* Glow effect */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Title area */}
      <div className="flex flex-col items-center mt-12 z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        >
          <motion.div
            animate={{
              filter: ['drop-shadow(0 0 15px #fbbf24)', 'drop-shadow(0 0 30px #fbbf24)', 'drop-shadow(0 0 15px #fbbf24)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-24 h-24 fill-yellow-400 stroke-yellow-500 stroke-2" />
          </motion.div>
        </motion.div>
        <motion.h1
          className="text-white mt-4"
          style={{ textShadow: '0 0 30px rgba(251, 191, 36, 0.6)' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Menü
        </motion.h1>
      </div>

      {/* Score display */}
      <motion.div
        className="flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-600/20 via-yellow-500/30 to-yellow-600/20 border-2 border-yellow-400/40 z-10"
        style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(251,191,36,0.3)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Coins className="w-6 h-6 text-yellow-400" />
        <span className="text-yellow-100">Pontok: {score.toString().padStart(3, '0')}</span>
      </motion.div>

      {/* Menu buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Button
            onClick={onStartGame}
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500 text-black shadow-[0_0_20px_rgba(251,191,36,0.6)] border-2 border-yellow-400/50"
            style={{ boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.3), 0 0 30px rgba(251,191,36,0.6)' }}
          >
            <span className="flex items-center gap-3">
              <Play className="w-6 h-6 fill-black" />
              Játék
            </span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Button
            onClick={() => onNavigate('settings')}
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500 text-black shadow-[0_0_20px_rgba(251,191,36,0.6)] border-2 border-yellow-400/50"
            style={{ boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.3), 0 0 30px rgba(251,191,36,0.6)' }}
          >
            <span className="flex items-center gap-3">
              <Settings className="w-6 h-6" />
              Beállítás
            </span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Button
            onClick={() => onNavigate('rules')}
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500 text-black shadow-[0_0_20px_rgba(251,191,36,0.6)] border-2 border-yellow-400/50"
            style={{ boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.3), 0 0 30px rgba(251,191,36,0.6)' }}
          >
            <span className="flex items-center gap-3">
              <BookOpen className="w-6 h-6" />
              Szabályok
            </span>
          </Button>
        </motion.div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8" />
    </div>
  );
}
