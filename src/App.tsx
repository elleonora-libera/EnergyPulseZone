import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/GameScreen';
import { MissionSelection } from './components/MissionSelection';
import { RulesScreen } from './components/RulesScreen';
import { SettingsScreen } from './components/SettingsScreen';

export type Screen = 'splash' | 'onboarding' | 'menu' | 'game' | 'missions' | 'rules' | 'settings';

export interface Mission {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  objective: {
    type: 'consecutive_hits' | 'time_limit' | 'specific_boxes' | 'prevent_fall' | 'large_boxes';
    target?: number;
    timeLimit?: number;
    small?: number;
    large?: number;
  };
}

export interface GameSettings {
  music: boolean;
  sound: boolean;
  haptic: boolean;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [score, setScore] = useState(0);
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: '15 találat egymás után',
      description: 'Hit 15 times in a row',
      completed: false,
      objective: { type: 'consecutive_hits', target: 15 }
    },
    {
      id: 2,
      title: 'Pusztíts el 15 dobozt 30 másodperc alatt',
      description: 'Destroy 15 boxes in 30 seconds',
      completed: false,
      objective: { type: 'time_limit', target: 15, timeLimit: 30 }
    },
    {
      id: 3,
      title: 'Pusztíts el 5 kicsi és 3 nagy dobozt',
      description: 'Destroy 5 small + 3 large boxes',
      completed: false,
      objective: { type: 'specific_boxes', small: 5, large: 3 }
    },
    {
      id: 4,
      title: 'Ne hagyd, hogy egy doboz is leessen 15 másodpercig',
      description: 'Prevent any box from falling for 15 seconds',
      completed: false,
      objective: { type: 'prevent_fall', timeLimit: 15 }
    },
    {
      id: 5,
      title: 'Pusztíts el 4 nagy dobozt egymás után',
      description: 'Destroy 4 large boxes in a row',
      completed: false,
      objective: { type: 'large_boxes', target: 4 }
    }
  ]);
  const [settings, setSettings] = useState<GameSettings>({
    music: true,
    sound: true,
    haptic: true
  });
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScreen === 'splash') {
        setCurrentScreen('onboarding');
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const startGame = (mission?: Mission) => {
    if (mission) {
      setCurrentMission(mission);
    }
    setCurrentScreen('game');
  };

  const completeMission = (missionId: number) => {
    setMissions(prev => prev.map(m => 
      m.id === missionId ? { ...m, completed: true } : m
    ));
  };

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {currentScreen === 'splash' && (
        <SplashScreen />
      )}
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={() => navigateToScreen('menu')} />
      )}
      {currentScreen === 'menu' && (
        <MainMenu 
          score={score}
          onNavigate={navigateToScreen}
          onStartGame={() => navigateToScreen('missions')}
        />
      )}
      {currentScreen === 'game' && (
        <GameScreen 
          mission={currentMission}
          onComplete={(finalScore) => {
            setScore(prev => prev + finalScore);
            if (currentMission) {
              completeMission(currentMission.id);
            }
          }}
          onExit={() => navigateToScreen('menu')}
          settings={settings}
        />
      )}
      {currentScreen === 'missions' && (
        <MissionSelection 
          missions={missions}
          onSelectMission={startGame}
          onBack={() => navigateToScreen('menu')}
        />
      )}
      {currentScreen === 'rules' && (
        <RulesScreen onBack={() => navigateToScreen('menu')} />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen 
          settings={settings}
          onUpdateSettings={updateSettings}
          onBack={() => navigateToScreen('menu')}
        />
      )}
    </div>
  );
}

export default App;
