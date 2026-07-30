import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/Button';
import { ScreenShell } from '@/components/ui/ScreenShell';

type Props = { onReplay: () => void };

export function Screen8Complete({ onReplay }: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1800),
      setTimeout(() => setStage(3), 3000),
      setTimeout(
        () =>
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.4 },
            colors: ['#FFD54A', '#BEE8FF', '#DCCEFF', '#D5F5E3', '#FFB3A7'],
          }),
        1800
      ),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <ScreenShell step={8}>
      <motion.div
        animate={{ rotate: [0, 6, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="text-5xl"
      >
        🌼
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 16 }}
        transition={{ duration: 0.6 }}
        className="font-heading text-3xl sm:text-4xl font-semibold mt-8 text-ink"
      >
        ✨ That's It :)
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 16 }}
        transition={{ duration: 0.6 }}
        className="font-hand text-3xl text-ink/80 mt-5"
      >
        Happy Friendship Day 🌼
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 16 }}
        transition={{ duration: 0.6 }}
        className="font-body text-ink/60 mt-3"
      >
        — from someone who enjoys your bak bak :)
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 12 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-10"
      >
        <Button variant="ghost" onClick={onReplay}>
          Replay Experience
        </Button>
      </motion.div>
    </ScreenShell>
  );
}
