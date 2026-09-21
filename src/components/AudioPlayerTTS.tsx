import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, FastForward, SkipForward, SkipBack } from 'lucide-react';
import { Language } from '../types';

interface AudioPlayerTTSProps {
  lang: Language;
  sections: { id: string; title: string; text: string }[];
}

export function AudioPlayerTTS({ lang, sections }: AudioPlayerTTSProps) {
  const [isSupported, setIsSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [rate, setRate] = useState<number>(1);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check Web Speech API support
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);

      // Target language
      const targetPrefix = lang === 'fr' ? 'fr' : 'en';
      const matched = voices.find(v => v.lang.toLowerCase().startsWith(targetPrefix)) || voices[0] || null;
      setSelectedVoice(matched);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lang]);

  // Clean up if unmounting or changing lang
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [lang]);

  const speakSection = (index: number) => {
    if (!('speechSynthesis' in window) || !sections[index]) return;

    window.speechSynthesis.cancel();

    const target = sections[index];
    const utterance = new SpeechSynthesisUtterance(`${target.title}. ${target.text}`);
    utteranceRef.current = utterance;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = rate;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentSectionIndex(index);

      // Smoothly scroll slightly towards current section if exists
      const el = document.getElementById(target.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    utterance.onend = () => {
      // Auto proceed to next section if available
      if (index + 1 < sections.length) {
        speakSection(index + 1);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayToggle = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      speakSection(currentSectionIndex);
    }
  };

  const handleStop = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleNext = () => {
    if (currentSectionIndex + 1 < sections.length) {
      speakSection(currentSectionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      speakSection(currentSectionIndex - 1);
    }
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying && !isPaused) {
      // Restart current section with new rate
      speakSection(currentSectionIndex);
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-stone-100 rounded-xl p-3 text-xs text-stone-500 flex items-center gap-2">
        <VolumeX className="w-4 h-4 text-stone-400" />
        <span>
          {lang === 'fr'
            ? 'La synthèse vocale native n’est pas disponible sur votre navigateur.'
            : 'Native Web Speech API is not supported on this browser.'}
        </span>
      </div>
    );
  }

  const currentSection = sections[currentSectionIndex] || sections[0];

  return (
    <div
      id="audio-player-tts"
      className="bg-white/95 backdrop-blur-md border border-amber-200/80 rounded-2xl shadow-lg p-4 transition-all duration-300 audio-player-bar"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Info & Soundwave */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm flex-shrink-0">
            <Volume2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                {lang === 'fr' ? 'Écouter l’article' : 'Listen to article'}
              </span>
              {isPlaying && !isPaused && (
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 h-3 bg-amber-600 animate-pulse rounded-full" />
                  <span className="w-0.5 h-2 bg-amber-500 animate-pulse delay-75 rounded-full" />
                  <span className="w-0.5 h-4 bg-amber-700 animate-pulse delay-150 rounded-full" />
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-stone-800 truncate mt-0.5 max-w-[200px] sm:max-w-xs md:max-w-md">
              {currentSection?.title || (lang === 'fr' ? 'Recette pâte à crêpes' : 'Crepe recipe')}
            </p>
          </div>
        </div>

        {/* Center/Right: Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="tts-prev-btn"
            type="button"
            onClick={handlePrev}
            disabled={currentSectionIndex === 0}
            className="p-2 rounded-lg text-stone-600 hover:bg-amber-50 hover:text-amber-800 disabled:opacity-30 disabled:pointer-events-none transition"
            title={lang === 'fr' ? 'Section précédente' : 'Previous section'}
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            id="tts-play-btn"
            type="button"
            onClick={handlePlayToggle}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl shadow transition active:scale-95"
            title={isPlaying && !isPaused ? (lang === 'fr' ? 'Mettre en pause' : 'Pause') : (lang === 'fr' ? 'Écouter' : 'Play')}
          >
            {isPlaying && !isPaused ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span className="text-sm">{lang === 'fr' ? 'Pause' : 'Pause'}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span className="text-sm">
                  {isPaused ? (lang === 'fr' ? 'Reprendre' : 'Resume') : (lang === 'fr' ? 'Écouter' : 'Play')}
                </span>
              </>
            )}
          </button>

          {(isPlaying || isPaused) && (
            <button
              id="tts-stop-btn"
              type="button"
              onClick={handleStop}
              className="p-2 rounded-lg text-stone-600 hover:bg-rose-50 hover:text-rose-700 transition"
              title={lang === 'fr' ? 'Arrêter la lecture' : 'Stop playback'}
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          )}

          <button
            id="tts-next-btn"
            type="button"
            onClick={handleNext}
            disabled={currentSectionIndex >= sections.length - 1}
            className="p-2 rounded-lg text-stone-600 hover:bg-amber-50 hover:text-amber-800 disabled:opacity-30 disabled:pointer-events-none transition"
            title={lang === 'fr' ? 'Section suivante' : 'Next section'}
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Speed selector */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-lg text-xs font-semibold text-stone-700 ml-1">
            {([1, 1.25, 1.5] as const).map((r) => (
              <button
                key={r}
                id={`tts-rate-${r}`}
                type="button"
                onClick={() => handleRateChange(r)}
                className={`px-2 py-1 rounded-md transition ${rate === r ? 'bg-white text-amber-700 shadow-xs' : 'hover:text-stone-900'}`}
              >
                {r}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress indicators of sections */}
      <div className="mt-3 pt-2.5 border-t border-amber-100 flex items-center justify-between text-xs text-stone-500">
        <span className="truncate">
          {lang === 'fr'
            ? `Partie ${currentSectionIndex + 1} sur ${sections.length} : ${currentSection?.title}`
            : `Part ${currentSectionIndex + 1} of ${sections.length}: ${currentSection?.title}`}
        </span>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-amber-700 hover:underline flex-shrink-0 ml-2 font-medium"
        >
          {isExpanded
            ? (lang === 'fr' ? 'Masquer la liste' : 'Hide playlist')
            : (lang === 'fr' ? 'Voir toutes les étapes' : 'View full playlist')}
        </button>
      </div>

      {/* Expandable playlist */}
      {isExpanded && (
        <div className="mt-3 max-h-48 overflow-y-auto space-y-1.5 border-t border-stone-100 pt-2 text-xs">
          {sections.map((sec, idx) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => speakSection(idx)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                currentSectionIndex === idx
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'hover:bg-stone-50 text-stone-700'
              }`}
            >
              <span className="truncate">
                {idx + 1}. {sec.title}
              </span>
              {currentSectionIndex === idx && isPlaying && !isPaused && (
                <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.5 rounded-full uppercase ml-2 flex-shrink-0">
                  {lang === 'fr' ? 'En cours' : 'Playing'}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
