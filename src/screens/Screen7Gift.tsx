import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/Button';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { GiftBox } from '@/components/illustrations/GiftBox';
import { Flower } from '@/components/illustrations/Flower';

type Props = { onNext: () => void };

export function Screen7Gift({ onNext }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'preparing' | 'ready' | 'opened'>('preparing');

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => Math.min(p + 3, 100)), 70);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (progress >= 100 && phase === 'preparing') setPhase('ready');
  }, [progress, phase]);

  const openGift = () => {
    setPhase('opened');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD54A', '#BEE8FF', '#DCCEFF', '#D5F5E3', '#FFB3A7'],
    });
    setTimeout(() => {
      confetti({ particleCount: 50, spread: 100, origin: { y: 0.5 }, colors: ['#FFD54A', '#BEE8FF'] });
    }, 250);
  };

  return (
    <ScreenShell step={7}>
      <h1 className="font-heading text-2xl sm:text-3xl font-semibold mt-2">🎁 Just for You</h1>

      <div className="mt-8">
        <GiftBox shaking={phase === 'ready'} />
      </div>

      {phase === 'preparing' && (
        <div className="mt-8 w-full max-w-[280px]">
          <p className="font-hand text-xl text-ink/60 mb-2">Wrapping something tiny...</p>
          <div className="h-2.5 w-full rounded-full bg-ink/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary-yellow"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {phase === 'ready' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <Button onClick={openGift}>Open →</Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'opened' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 w-full max-w-[320px]"
          >
            <div className="rounded-card bg-white shadow-card p-6">
              <p className="font-body text-ink/80 text-base leading-relaxed">
                I didn't have an expensive gift.
                <br />
                So... I made you this tiny website instead. 😄
              </p>
              <p className="font-hand text-2xl text-ink mt-3 leading-snug">
                Hope life gives you
                <br />
                more reasons to smile,
                <br />
                lots of success,
                <br />
                great memories,
                <br />
                and plenty of moments worth remembering. 🌼
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <Flower />
            </div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-6">
              <Button onClick={onNext}>One Last Thing →</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}
