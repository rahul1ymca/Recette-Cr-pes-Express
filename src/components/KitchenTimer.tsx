import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';
import { Language } from '../types';

interface KitchenTimerProps {
  lang: Language;
}

export function KitchenTimer({ lang }: KitchenTimerProps) {
  // Mode: 30 min (1800s) resting or 60s crepe flip
  const [mode, setMode] = useState<'repos' | 'cuisson'>('repos');
  const initialSeconds = mode === 'repos' ? 1800 : 60;

  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play a soft audio chime using Web Audio API
  const playBeep = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setHasFinished(true);
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const switchMode = (newMode: 'repos' | 'cuisson') => {
    setIsRunning(false);
    setHasFinished(false);
    setMode(newMode);
    setTimeLeft(newMode === 'repos' ? 1800 : 60);
  };

  const handleToggle = () => {
    if (hasFinished) {
      handleReset();
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setHasFinished(false);
    setTimeLeft(mode === 'repos' ? 1800 : 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const total = mode === 'repos' ? 1800 : 60;
  const progressPercent = ((total - timeLeft) / total) * 100;

  return (
    <div
      id="minuteur-cuisine"
      className="bg-amber-900 text-amber-50 rounded-2xl p-5 md:p-6 shadow-md border border-amber-800"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-800 flex items-center justify-center text-amber-300">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">
              {lang === 'fr' ? 'Minuteur de Cuisine Intégré' : 'Built-in Kitchen Timer'}
            </h4>
            <p className="text-xs text-amber-300/80">
              {lang === 'fr' ? 'Ne perdez plus le fil du temps' : 'Keep track of resting & cooking'}
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-amber-950/70 p-1 rounded-xl border border-amber-800/60 self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => switchMode('repos')}
            className={`px-3 py-1 rounded-lg transition ${
              mode === 'repos' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-300 hover:text-white'
            }`}
          >
            {lang === 'fr' ? 'Repos pâte (30 min)' : 'Resting (30 min)'}
          </button>
          <button
            type="button"
            onClick={() => switchMode('cuisson')}
            className={`px-3 py-1 rounded-lg transition ${
              mode === 'cuisson' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-300 hover:text-white'
            }`}
          >
            {lang === 'fr' ? 'Cuisson crêpe (60 s)' : 'Flip crepe (60 s)'}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Digital display */}
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
            {hasFinished
              ? (lang === 'fr' ? 'Terminé ! Prêt !' : 'Ready!')
              : isRunning
              ? (lang === 'fr' ? 'En cours...' : 'Counting...')
              : (lang === 'fr' ? 'En attente' : 'Paused')}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            id="timer-start-btn"
            type="button"
            onClick={handleToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition active:scale-95 shadow-xs ${
              isRunning
                ? 'bg-amber-700 hover:bg-amber-600 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-amber-950'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>{lang === 'fr' ? 'Pause' : 'Pause'}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{lang === 'fr' ? 'Démarrer' : 'Start'}</span>
              </>
            )}
          </button>

          <button
            id="timer-reset-btn"
            type="button"
            onClick={handleReset}
            className="p-2 rounded-xl bg-amber-800/80 hover:bg-amber-800 text-amber-200 transition"
            title={lang === 'fr' ? 'Remettre à zéro' : 'Reset'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress track */}
      <div className="mt-4 w-full h-1.5 bg-amber-950/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-300 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
