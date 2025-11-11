import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface WinLoseDialogProps {
  isWin: boolean;
  score: number;
  onAction: (action: 'menu' | 'retry') => void;
}

export function WinLoseDialog({ isWin, score, onAction }: WinLoseDialogProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
      <motion.div
        className="relative w-80 p-8 rounded-3xl bg-gradient-to-b from-purple-900/95 to-black/95 border-2 border-yellow-400/50 shadow-[0_0_50px_rgba(251,191,36,0.5)]"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', bounce: 0.5 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-yellow-500/20 blur-2xl"
          animate={{
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Icon */}
        <div className="flex justify-center mb-6 relative z-10">
          {isWin ? (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle2 className="w-24 h-24 text-yellow-400" strokeWidth={2} />
              {/* Sparkles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  animate={{
                    x: [0, Math.cos(i * Math.PI / 2) * 60],
                    y: [0, Math.sin(i * Math.PI / 2) * 60],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <XCircle className="w-24 h-24 text-red-400/80" strokeWidth={2} />
            </motion.div>
          )}
        </div>

        {/* Message */}
        <div className="text-center mb-6 relative z-10">
          <h2 className="text-white mb-2" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
            {isWin ? 'Gratulálunk!' : 'Nem teljesítetted a forduló feltételeit!'}
          </h2>
          <p className="text-yellow-100/80">
            {isWin 
              ? `Teljesítetted a küldetést! Pontok: ${score}` 
              : 'Vesztettél... Megpróbálod újra?'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 relative z-10">
          <Button
            onClick={() => onAction('menu')}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500 text-black shadow-[0_0_20px_rgba(251,191,36,0.6)] border-2 border-yellow-400/50"
            style={{ boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.3), 0 0 30px rgba(251,191,36,0.6)' }}
          >
            Menü
          </Button>

          {!isWin && (
            <Button
              onClick={() => onAction('retry')}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:from-purple-500 hover:via-purple-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border-2 border-purple-400/50"
              style={{ boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.3)' }}
            >
              Ismétlés
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
