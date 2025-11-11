import { motion } from 'motion/react';
import { Zap, Plus } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-red-950 via-purple-950 to-black">
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          initial={{ 
            x: Math.random() * 393, 
            y: Math.random() * 852,
            scale: 0,
            opacity: 0
          }}
          animate={{
            y: [null, Math.random() * 852],
            x: [null, Math.random() * 393],
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Main logo */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 blur-3xl bg-yellow-500/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Logo container */}
        <div className="relative">
          {/* Lightning bolt */}
          <motion.div
            className="relative"
            animate={{
              filter: ['drop-shadow(0 0 10px #fbbf24)', 'drop-shadow(0 0 30px #fbbf24)', 'drop-shadow(0 0 10px #fbbf24)']
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Zap className="w-32 h-32 fill-yellow-400 stroke-yellow-500 stroke-2" />
          </motion.div>

          {/* Golden cross overlay */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Plus className="w-16 h-16 text-yellow-400 stroke-[4]" />
          </motion.div>
        </div>

        {/* Sparkles */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * Math.PI / 2) * 80],
              y: [0, Math.sin(i * Math.PI / 2) * 80],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-yellow-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
