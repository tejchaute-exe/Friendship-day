import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/Button';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { FloatingStar } from '@/components/illustrations/FloatingStar';

type Props = { onNext: () => void };

type StarData = { id: number; top: string; left: string; size: number };

const POSITIONS: StarData[] = [
  { id: 0, top: '18%', left: '20%', size: 40 },
  { id: 1, top: '28%', left: '70%', size: 34 },
  { id: 2, top: '52%', left: '14%', size: 30 },
  { id: 3, top: '60%', left: '76%', size: 38 },
  { id: 4, top: '40%', left: '46%', size: 32 },
];

export function Screen5Verification({ onNext }: Props) {
  const [caught, setCaught] = useState<Set<number>>(new Set());
  const [dodge, setDodge] = useState<number | null>(null);

  const stars = useMemo(() => POSITIONS, []);
  const allCaught = caught.size >= stars.length;

  const handleClick = (id: number) => {
    if (caught.has(id)) return;

    setCaught((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    confetti({
      particleCount: 16,
      spread: 40,
      origin: { y: 0.5 },
      colors: ['#FFD54A', '#BEE8FF', '#DCCEFF'],
    });

    const remaining = stars.filter((s) => s.id !== id && !caught.has(s.id));
    if (remaining.length > 0 && Math.random() < 0.25) {
      const target = remaining[Math.floor(Math.random() * remaining.length)].id;
      setDodge(target);
      setTimeout(() => setDodge(null), 500);
    }
  };

  return (
    <ScreenShell step={5}>
      <h1 className="font-heading text-2xl sm:text-3xl font-semibold mt-2">⭐ Tiny Challenge</h1>
      <p className="font-body text-ink/60 mt-2">Find every little star.</p>

      <div className="relative mt-8 w-full max-w-[340px] h-64 rounded-card bg-white/60 shadow-card overflow-hidden">
        {stars.map((s) => {
          const isCaught = caught.has(s.id);
          const isDodging = dodge === s.id;
          return (
            <AnimatePresence key={s.id}>
              {!isCaught && (
                <motion.div
                  className="absolute"
                  style={{ top: s.top, left: s.left }}
                  animate={isDodging ? { x: [0, 14, -14, 0], y: [0, -6, 0] } : { y: [0, -8, 0] }}
                  transition={
                    isDodging
                      ? { duration: 0.5, ease: 'easeInOut' }
                      : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                  }
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <FloatingStar
                    size={s.size}
                    caught={false}
                    onClick={() => handleClick(s.id)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}

        {allCaught && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 grid place-items-center pointer-events-none"
          >
            <p className="font-heading text-xl text-ink bg-mint px-5 py-2 rounded-btn shadow-card">
              Nice! You found them all.
            </p>
          </motion.div>
        )}
      </div>

      <div className="mt-4 font-body text-sm text-ink/50">
        {caught.size} / {stars.length} stars
      </div>

      <AnimatePresence>
        {allCaught && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <Button onClick={onNext}>Continue →</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}
