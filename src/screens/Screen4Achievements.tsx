import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/Button';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { ACHIEVEMENTS } from '@/constants/content';
import { fadeUpItem, staggerContainer } from '@/constants/variants';

type Props = { onNext: () => void };

export function Screen4Achievements({ onNext }: Props) {
  const [unlocked, setUnlocked] = useState(0);

  useEffect(() => {
    if (unlocked < ACHIEVEMENTS.length) {
      const t = setTimeout(() => {
        setUnlocked((u) => u + 1);
        confetti({
          particleCount: 24,
          spread: 45,
          origin: { y: 0.6 },
          colors: ['#FFD54A', '#BEE8FF', '#DCCEFF', '#D5F5E3'],
        });
      }, 900);
      return () => clearTimeout(t);
    }
  }, [unlocked]);

  const allDone = unlocked >= ACHIEVEMENTS.length;

  return (
    <ScreenShell step={4}>
      <h1 className="font-heading text-2xl sm:text-3xl font-semibold mt-2">🏆 Fun Facts</h1>
      <p className="font-body text-ink/60 mt-2">A few things that are definitely true.</p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-7 w-full max-w-[340px] grid grid-cols-1 gap-3"
      >
        {ACHIEVEMENTS.map((a, i) => {
          const isUnlocked = unlocked > i;
          return (
            <motion.div
              key={a.title}
              variants={fadeUpItem}
              whileHover={{ y: -4 }}
              className={`relative rounded-card p-4 text-left shadow-card transition-colors ${
                isUnlocked ? 'bg-white' : 'bg-ink/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={isUnlocked ? { scale: [0.6, 1.1, 1] } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                  className={`grid place-items-center h-12 w-12 rounded-2xl text-2xl ${
                    isUnlocked ? 'bg-primary-yellow shadow-glow' : 'bg-ink/10 grayscale'
                  }`}
                >
                  <span className={isUnlocked ? '' : 'opacity-40'}>{isUnlocked ? a.emoji : '🔒'}</span>
                </motion.div>
                <div className="flex-1">
                  <p className={`font-heading text-base font-semibold ${isUnlocked ? 'text-ink' : 'text-ink/40'}`}>
                    {a.title}
                  </p>
                  <p className="font-hand text-lg text-ink/60 leading-tight">{isUnlocked ? a.note : 'Locked'}</p>
                </div>
                <AnimatePresence>
                  {isUnlocked && (
                    <motion.svg
                      initial={{ scale: 0, rotate: -40 }}
                      animate={{ scale: 1, rotate: 0 }}
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-mint"
                    >
                      <path d="M5 13l4 4L19 7" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {isUnlocked && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 text-sm"
                  >
                    ✨
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {allDone && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-7">
            <Button onClick={onNext}>Next →</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}
