import { motion } from 'motion/react';
import { ArrowLeft, Package, Zap, Target, Timer, Coins } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface RulesScreenProps {
  onBack: () => void;
}

export function RulesScreen({ onBack }: RulesScreenProps) {
  const rules = [
    {
      icon: Target,
      title: 'Célpont',
      description: 'Kattints a lehulló dobozokra, hogy elpusztítsd őket. Minden találat 10 pontot ér.'
    },
    {
      icon: Package,
      title: 'Doboz Típusok',
      description: 'Három méretű doboz van: kicsi, közepes és nagy. Mindegyik más sebességgel esik.'
    },
    {
      icon: Timer,
      title: 'Idő',
      description: 'Minden küldetésnek van időkorlátja. Teljesítsd a célokat az idő lejárta előtt!'
    },
    {
      icon: Zap,
      title: 'Küldetések',
      description: '5 különböző küldetés közül választhatsz. Mindegyiknek más a célkitűzése és nehézsége.'
    },
    {
      icon: Coins,
      title: 'Pontszámítás',
      description: 'Gyűjts pontokat a dobozok elpusztításával. Minél több dobozt találsz el, annál több pontot szerzel.'
    }
  ];

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900 to-black">
      {/* Background particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * 393, 
            y: -20,
            opacity: 0.3
          }}
          animate={{
            y: 900,
            rotate: 360
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
        >
          {i % 3 === 0 && <Package className="w-5 h-5 text-yellow-400/30" />}
          {i % 3 === 1 && <Zap className="w-4 h-4 text-yellow-300/30" />}
          {i % 3 === 2 && <Coins className="w-5 h-5 text-yellow-400/30" />}
        </motion.div>
      ))}

      {/* Glow effect */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between p-6 z-10">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="ghost"
            className="w-10 h-10 p-0 rounded-full bg-black/30 hover:bg-black/50 border border-yellow-400/30"
          >
            <ArrowLeft className="w-6 h-6 text-yellow-400" />
          </Button>
          <h1 className="text-white" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
            Szabályok
          </h1>
        </div>
      </div>

      {/* Rules content */}
      <ScrollArea className="flex-1 px-6 pb-6 relative z-10">
        <div className="flex flex-col gap-6 pb-4">
          {/* Introduction */}
          <motion.div
            className="p-5 rounded-2xl bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-2 border-yellow-400/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-yellow-100 mb-2">Játék Célja</h2>
            <p className="text-yellow-100/70">
              Pusztítsd el a lehulló dobozokat a képernyőn, és teljesítsd a küldetéseket az időlimit előtt. 
              Minden találat pontokat hoz, és különböző kihívások várnak rád!
            </p>
          </motion.div>

          {/* Rules list */}
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-black/30 border-2 border-yellow-400/20 hover:border-yellow-400/40 transition-all"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-600/30 to-yellow-500/20 flex items-center justify-center border border-yellow-400/30">
                  <rule.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-yellow-100 mb-2">{rule.title}</h3>
                  <p className="text-yellow-100/60">{rule.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Tips section */}
          <motion.div
            className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-2 border-purple-400/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-purple-200 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Tippek
            </h3>
            <ul className="space-y-2 text-purple-100/70">
              <li>• A nagy dobozok lassabban esnek, de nagyobb célpontok</li>
              <li>• A kis dobozok gyorsabbak, de könnyebb eltalálni őket</li>
              <li>• Figyeld az időt és a küldetés célt</li>
              <li>• Ne hagyd, hogy a dobozok leessenek a képernyőről!</li>
            </ul>
          </motion.div>
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
