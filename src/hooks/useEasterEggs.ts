import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

const IDLE_TIMEOUT = 20000;

export function useEasterEggs() {
  const logoClicks = useRef(0);
  const logoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tooCurious, setTooCurious] = useState(false);
  const [idleMsg, setIdleMsg] = useState<string | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdle = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdleMsg('Still here?\nI thought I lost you.'), IDLE_TIMEOUT);
  };

  useEffect(() => {
    resetIdle();
    const onMove = () => {
      setIdleMsg(null);
      resetIdle();
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('keydown', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('keydown', onMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const onLogoClick = () => {
    logoClicks.current += 1;
    if (logoTimer.current) clearTimeout(logoTimer.current);
    logoTimer.current = setTimeout(() => (logoClicks.current = 0), 1500);
    if (logoClicks.current >= 5) {
      logoClicks.current = 0;
      setTooCurious(true);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.3 }, colors: ['#FFD54A'] });
    }
  };

  const onHeadingDoubleClick = () => {
    confetti({ particleCount: 18, spread: 40, origin: { y: 0.2 }, colors: ['#FFD54A', '#BEE8FF'] });
  };

  return { onLogoClick, onHeadingDoubleClick, tooCurious, idleMsg, dismissIdle: () => setIdleMsg(null), dismissCurious: () => setTooCurious(false) };
}
