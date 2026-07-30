import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/Button';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { Scanner } from '@/components/illustrations/Scanner';
import { IDENTITY_CHECKS } from '@/constants/content';
import { fadeUpItem, staggerContainer } from '@/constants/variants';

type Props = { onNext: () => void };

export function Screen2Identity({ onNext }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) {
      const t = setTimeout(() => setCount(1), 500);
      return () => clearTimeout(t);
    }
    if (count <= IDENTITY_CHECKS.length) {
      const t = setTimeout(() => setCount((c) => c + 1), 600);
      return () => clearTimeout(t);
    }
  }, [count]);

  useEffect(() => {
    if (count === IDENTITY_CHECKS.length) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#FFD54A', '#BEE8FF', '#DCCEFF', '#FFB3A7'],
      });
    }
  }, [count]);

  const done = count > IDENTITY_CHECKS.length;

  return (
    <ScreenShell step={2}>
      <Scanner />

      <h1 className="font-heading text-2xl sm:text-3xl font-semibold mt-6">😊 First Impressions</h1>
      <p className="font-body text-ink/60 mt-2">A few quick observations...</p>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-7 w-full max-w-[320px] space-y-2.5 text-left"
      >
        {IDENTITY_CHECKS.map((label, i) => {
          const checked = count > i;
          return (
            <motion.li
              key={label}
              variants={fadeUpItem}
              className="flex items-center gap-3 rounded-card bg-white shadow-card px-4 py-3"
            >
              <motion.span
                animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                className="grid place-items-center h-6 w-6 rounded-full bg-mint text-ink"
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
              <span className="font-body text-ink/80 text-sm sm:text-base">{label}</span>
            </motion.li>
          );
        })}
      </motion.ul>

      <AnimatePresence>
        {done && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-7">
            <Button onClick={onNext}>Seems About Right →</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}
