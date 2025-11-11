import { motion } from 'motion/react';
import { X, CheckCircle2, Circle, Target, Zap, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import type { Mission } from '../App';

interface MissionSelectionProps {
  missions: Mission[];
  onSelectMission: (mission: Mission) => void;
  onBack: () => void;
}

export function MissionSelection({ missions, onSelectMission, onBack }: MissionSelectionProps) {
  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900 to-black">
      {/* Background particles */}
      {[...Array(15)].map((_, i) => (
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
          {i % 2 === 0 ? (
            <Zap className="w-5 h-5 text-yellow-400/40" />
          ) : (
            <Plus className="w-4 h-4 text-yellow-300/30" />
          )}
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

      {/* Header */}
      <div className="relative flex items-center justify-between p-6 z-10">
        <h1 className="text-white" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
          Küldetések
        </h1>
        <Button
          onClick={onBack}
          variant="ghost"
          className="w-10 h-10 p-0 rounded-full bg-black/30 hover:bg-black/50 border border-yellow-400/30"
        >
          <X className="w-6 h-6 text-yellow-400" />
        </Button>
      </div>

      {/* Mission list */}
      <ScrollArea className="flex-1 px-6 pb-6 relative z-10">
        <div className="flex flex-col gap-4 pb-4">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => onSelectMission(mission)}
                className="w-full text-left p-5 rounded-2xl bg-gradient-to-br from-purple-900/50 to-black/50 border-2 border-yellow-400/30 hover:border-yellow-400/60 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                style={{ boxShadow: 'inset 0 1px 2px rgba(251,191,36,0.1)' }}
              >
                <div className="flex items-start gap-4">
                  {/* Mission icon */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="relative">
                      <Target className="w-8 h-8 text-yellow-400" />
                      {mission.completed && (
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', bounce: 0.5 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-400 fill-green-400/20" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Mission content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-yellow-100 pr-2">
                        {mission.title}
                      </h3>
                      {mission.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-yellow-400/30 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-yellow-100/60">
                      {mission.description}
                    </p>
                  </div>
                </div>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-yellow-500/0 hover:bg-yellow-500/5 transition-all pointer-events-none"
                />
              </button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom button */}
      <div className="relative p-6 z-10">
        <Button
          onClick={onBack}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500 text-black shadow-[0_0_20px_rgba(251,191,36,0.6)] border-2 border-yellow-400/50"
          style={{ boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.3), 0 0 30px rgba(251,191,36,0.6)' }}
        >
          Menü
        </Button>
      </div>
    </div>
  );
}
