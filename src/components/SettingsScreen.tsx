import { motion } from 'motion/react';
import { ArrowLeft, Volume2, Music, Vibrate, Share2, Shield, Zap, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';
import type { GameSettings } from '../App';

interface SettingsScreenProps {
  settings: GameSettings;
  onUpdateSettings: (settings: Partial<GameSettings>) => void;
  onBack: () => void;
}

export function SettingsScreen({ settings, onUpdateSettings, onBack }: SettingsScreenProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Box Shooter Game',
        text: 'Próbáld ki ezt a fantasztikus játékot!',
        url: window.location.href
      }).catch(() => {
        // Handle share cancel or error silently
      });
    } else {
      alert('Megosztás nem támogatott ezen a böngészőn.');
    }
  };

  const handlePrivacy = () => {
    alert('Adatvédelmi irányelvek: Ez egy demo alkalmazás. Nem gyűjtünk személyes adatokat.');
  };

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900 to-black">
      {/* Background particles */}
      {[...Array(12)].map((_, i) => (
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
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
        >
          {i % 2 === 0 ? (
            <Zap className="w-4 h-4 text-yellow-400/30" />
          ) : (
            <Plus className="w-3 h-3 text-yellow-300/30" />
          )}
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
            Beállítás
          </h1>
        </div>
      </div>

      {/* Settings content */}
      <ScrollArea className="flex-1 px-6 pb-6 relative z-10">
        <div className="flex flex-col gap-4 pb-4">
          {/* Audio Settings */}
          <motion.div
            className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-black/30 border-2 border-yellow-400/30"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600/30 to-yellow-500/20 flex items-center justify-center border border-yellow-400/30">
                  <Music className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-yellow-100">Zene</h3>
                  <p className="text-yellow-100/50">Háttérzene be/ki</p>
                </div>
              </div>
              <Switch
                checked={settings.music}
                onCheckedChange={(checked) => onUpdateSettings({ music: checked })}
                className="data-[state=checked]:bg-yellow-500"
              />
            </div>
          </motion.div>

          <motion.div
            className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-black/30 border-2 border-yellow-400/30"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600/30 to-yellow-500/20 flex items-center justify-center border border-yellow-400/30">
                  <Volume2 className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-yellow-100">Hang</h3>
                  <p className="text-yellow-100/50">Hangeffektek be/ki</p>
                </div>
              </div>
              <Switch
                checked={settings.sound}
                onCheckedChange={(checked) => onUpdateSettings({ sound: checked })}
                className="data-[state=checked]:bg-yellow-500"
              />
            </div>
          </motion.div>

          {/* Haptic Feedback */}
          <motion.div
            className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-black/30 border-2 border-yellow-400/30"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600/30 to-yellow-500/20 flex items-center justify-center border border-yellow-400/30">
                  <Vibrate className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-yellow-100">Haptikus effektus</h3>
                  <p className="text-yellow-100/50">Rezgés visszajelzés</p>
                </div>
              </div>
              <Switch
                checked={settings.haptic}
                onCheckedChange={(checked) => onUpdateSettings({ haptic: checked })}
                className="data-[state=checked]:bg-yellow-500"
              />
            </div>
          </motion.div>

          {/* Other Options */}
          <div className="h-4" />

          <motion.button
            onClick={handlePrivacy}
            className="w-full p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-black/30 border-2 border-yellow-400/30 hover:border-yellow-400/50 transition-all text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600/30 to-yellow-500/20 flex items-center justify-center border border-yellow-400/30">
                <Shield className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-yellow-100">Adatvédelmi irányelvek</h3>
                <p className="text-yellow-100/50">Adatvédelem és biztonság</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="w-full p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-black/30 border-2 border-yellow-400/30 hover:border-yellow-400/50 transition-all text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600/30 to-yellow-500/20 flex items-center justify-center border border-yellow-400/30">
                <Share2 className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-yellow-100">Alkalmazás megosztása</h3>
                <p className="text-yellow-100/50">Oszd meg barátaiddal</p>
              </div>
            </div>
          </motion.button>
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
