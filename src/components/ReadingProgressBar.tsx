import { useEffect, useState } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        const percentage = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setProgress(percentage);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="reading-progress-container"
      className="fixed top-0 left-0 right-0 h-1.5 bg-amber-100/60 z-50 overflow-hidden reading-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        id="reading-progress-bar"
        className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
