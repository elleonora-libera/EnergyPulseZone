import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Coins, Target, Zap } from 'lucide-react';
import { WinLoseDialog } from './WinLoseDialog';
import type { Mission, GameSettings } from '../App';

interface Box {
  id: number;
  x: number;
  y: number;
  size: 'small' | 'medium' | 'large';
  speed: number;
  hit: boolean;
}

interface GameScreenProps {
  mission: Mission | null;
  onComplete: (score: number) => void;
  onExit: () => void;
  settings: GameSettings;
}

const BOX_SIZES = {
  small: 40,
  medium: 60,
  large: 80
};

const BOX_COLORS = {
  small: 'from-yellow-300 to-yellow-400',
  medium: 'from-yellow-400 to-yellow-500',
  large: 'from-yellow-500 to-yellow-600'
};

export function GameScreen({ mission, onComplete, onExit, settings }: GameScreenProps) {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mission?.objective.timeLimit || 60);
  const [boxesDestroyed, setBoxesDestroyed] = useState(0);
  const [consecutiveHits, setConsecutiveHits] = useState(0);
  const [smallBoxesHit, setSmallBoxesHit] = useState(0);
  const [largeBoxesHit, setLargeBoxesHit] = useState(0);
  const [consecutiveLargeHits, setConsecutiveLargeHits] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState<{ x: number; y: number; id: number } | null>(null);
  const [gunRotation, setGunRotation] = useState(0);
  const [muzzleFlash, setMuzzleFlash] = useState(false);
  const boxIdCounter = useRef(0);
  const gameLoopRef = useRef<number>();
  const scorePopupIdRef = useRef(0);

  const spawnBox = useCallback(() => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'small', 'medium', 'medium', 'large'];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const boxSize = BOX_SIZES[size];
    const baseSpeed = mission?.objective.type === 'prevent_fall' ? 2.2 : 2;

    const newBox: Box = {
      id: boxIdCounter.current++,
      x: Math.random() * (300 - boxSize),
      y: -boxSize,
      size,
      speed: baseSpeed + Math.random() * 1,
      hit: false
    };

    setBoxes(prev => [...prev, newBox]);
  }, [mission]);

  const shootBox = (boxId: number, event: React.MouseEvent) => {
    const boxElement = event.currentTarget as HTMLElement;
    const rect = boxElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate gun rotation
    const gunX = 360;
    const gunY = 750;
    const angle = Math.atan2(centerY - gunY, centerX - gunX) * (180 / Math.PI);
    setGunRotation(angle);

    // Muzzle flash
    setMuzzleFlash(true);
    setTimeout(() => setMuzzleFlash(false), 100);

    // Haptic feedback
    if (settings.haptic && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }

    setBoxes(prev => prev.map(box => 
      box.id === boxId ? { ...box, hit: true } : box
    ));

    const box = boxes.find(b => b.id === boxId);
    if (box) {
      setScore(s => s + 10);
      setBoxesDestroyed(d => d + 1);
      setConsecutiveHits(c => c + 1);

      if (box.size === 'small') {
        setSmallBoxesHit(s => s + 1);
        setConsecutiveLargeHits(0);
      } else if (box.size === 'large') {
        setLargeBoxesHit(l => l + 1);
        setConsecutiveLargeHits(c => c + 1);
      } else {
        setConsecutiveLargeHits(0);
      }

      // Show score popup
      setShowScorePopup({ x: centerX, y: centerY, id: scorePopupIdRef.current++ });

      setTimeout(() => {
        setBoxes(prev => prev.filter(b => b.id !== boxId));
      }, 300);
    }
  };

  useEffect(() => {
    if (showScorePopup) {
      const timer = setTimeout(() => setShowScorePopup(null), 800);
      return () => clearTimeout(timer);
    }
  }, [showScorePopup]);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        spawnBox();
      }
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [spawnBox]);

  useEffect(() => {
    const gameLoop = () => {
      setBoxes(prev => {
        const updated = prev.map(box => ({
          ...box,
          y: box.y + box.speed
        }));

        // Check if any box fell off screen
        const fellOff = updated.some(box => box.y > 852 && !box.hit);
        if (fellOff && mission?.objective.type === 'prevent_fall') {
          setGameOver(true);
          setGameWon(false);
        }

        return updated.filter(box => box.y < 900);
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [mission]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      checkWinCondition();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const checkWinCondition = () => {
    if (!mission) {
      setGameWon(boxesDestroyed >= 10);
      return;
    }

    let won = false;
    switch (mission.objective.type) {
      case 'consecutive_hits':
        won = consecutiveHits >= (mission.objective.target || 0);
        break;
      case 'time_limit':
        won = boxesDestroyed >= (mission.objective.target || 0);
        break;
      case 'specific_boxes':
        won = smallBoxesHit >= (mission.objective.small || 0) && 
              largeBoxesHit >= (mission.objective.large || 0);
        break;
      case 'prevent_fall':
        won = timeLeft <= 0;
        break;
      case 'large_boxes':
        won = consecutiveLargeHits >= (mission.objective.target || 0);
        break;
    }
    setGameWon(won);
  };

  useEffect(() => {
    if (mission?.objective.type === 'consecutive_hits' && 
        consecutiveHits >= (mission.objective.target || 0)) {
      setGameOver(true);
      setGameWon(true);
    }
    if (mission?.objective.type === 'large_boxes' && 
        consecutiveLargeHits >= (mission.objective.target || 0)) {
      setGameOver(true);
      setGameWon(true);
    }
    if (mission?.objective.type === 'specific_boxes' && 
        smallBoxesHit >= (mission.objective.small || 0) &&
        largeBoxesHit >= (mission.objective.large || 0)) {
      setGameOver(true);
      setGameWon(true);
    }
  }, [consecutiveHits, consecutiveLargeHits, smallBoxesHit, largeBoxesHit, mission]);

  const handleDialogClose = (action: 'menu' | 'retry') => {
    if (action === 'menu') {
      onExit();
    } else {
      window.location.reload();
    }
  };

  const getMissionProgress = () => {
    if (!mission) return `${boxesDestroyed}/10 doboz elpusztítva`;

    switch (mission.objective.type) {
      case 'consecutive_hits':
        return `${consecutiveHits}/${mission.objective.target} egymás utáni találat`;
      case 'time_limit':
        return `${boxesDestroyed}/${mission.objective.target} doboz elpusztítva`;
      case 'specific_boxes':
        return `Kicsi: ${smallBoxesHit}/${mission.objective.small} | Nagy: ${largeBoxesHit}/${mission.objective.large}`;
      case 'prevent_fall':
        return `Nincs leejtett doboz`;
      case 'large_boxes':
        return `${consecutiveLargeHits}/${mission.objective.target} nagy doboz egymás után`;
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900 to-black">
      {/* Background particles */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-yellow-400/30">
            <Timer className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-100">{timeLeft}s</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-yellow-400/30">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-100">{score}</span>
          </div>
        </div>

        <div className="mt-2 px-4 py-2 rounded-full bg-black/50 border border-yellow-400/30 text-center">
          <div className="flex items-center justify-center gap-2">
            <Target className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-100">{getMissionProgress()}</span>
          </div>
        </div>
      </div>

      {/* Play area */}
      <div className="absolute top-20 left-0 w-full h-[calc(100%-100px)]">
        <AnimatePresence>
          {boxes.map(box => (
            <motion.div
              key={box.id}
              className={`absolute cursor-pointer rounded-lg bg-gradient-to-br ${BOX_COLORS[box.size]} shadow-[0_0_15px_rgba(251,191,36,0.5)] border-2 border-yellow-400/50`}
              style={{
                left: box.x,
                top: box.y,
                width: BOX_SIZES[box.size],
                height: BOX_SIZES[box.size],
                boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.3), 0 0 20px rgba(251,191,36,0.5)'
              }}
              onClick={(e) => shootBox(box.id, e)}
              initial={{ scale: 0 }}
              animate={{ 
                scale: box.hit ? 0 : 1,
                rotate: box.hit ? 180 : 0
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </AnimatePresence>

        {/* Score popup */}
        <AnimatePresence>
          {showScorePopup && (
            <motion.div
              key={showScorePopup.id}
              className="absolute pointer-events-none z-30"
              style={{ left: showScorePopup.x, top: showScorePopup.y }}
              initial={{ scale: 0, y: 0, opacity: 1 }}
              animate={{ scale: 1.5, y: -50, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-yellow-400">+10</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gun */}
      <motion.div
        className="absolute bottom-20 right-8 z-10"
        animate={{ rotate: gunRotation }}
        transition={{ duration: 0.1 }}
      >
        <div className="relative">
          {muzzleFlash && (
            <motion.div
              className="absolute -left-12 top-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <Zap className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            </motion.div>
          )}
          <div className="w-16 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-l-full border-2 border-gray-500 shadow-lg" style={{ boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.5)' }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-6 bg-gradient-to-b from-gray-700 to-gray-800 rounded" />
          </div>
        </div>
      </motion.div>

      {/* Game Over Dialog */}
      {gameOver && (
        <WinLoseDialog
          isWin={gameWon}
          score={score}
          onAction={handleDialogClose}
        />
      )}
    </div>
  );
}
