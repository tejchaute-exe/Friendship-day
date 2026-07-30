import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { Envelope } from '@/components/illustrations/Envelope';

type Props = { onNext: () => void };

const CONNECTING_STEPS = ['Folding the note...', 'Sealing the envelope...', 'Almost there...'];

export function Screen1Incoming({ onNext }: Props) {
  const [phase, setPhase] = useState<'connecting' | 'ready'>('connecting');
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => Math.min(p + 4, 100)), 80);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (progress >= 100 && phase === 'connecting') {
      setPhase('ready');
    }
  }, [progress, phase]);

  useEffect(() => {
    if (phase === 'connecting') {
      const id = setInterval(() => setStepIdx((i) => (i + 1) % CONNECTING_STEPS.length), 900);
      return () => clearInterval(id);
    }
  }, [phase]);

  return (
    <ScreenShell step={1}>
      <Envelope />

      <h1 className="font-heading text-3xl sm:text-4xl font-semibold mt-8 text-ink">
        ✉️ A Tiny Message
      </h1>
      <p className="font-body text-ink/60 mt-3 max-w-[300px]">
        Hi!
        <br />
        Someone left a little message here.
        <br />
        Hopefully it makes you smile.
      </p>

      <div className="mt-8 w-full max-w-[300px]">
        <div className="h-2.5 w-full rounded-full bg-ink/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary-yellow"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="h-7 mt-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={phase === 'connecting' ? CONNECTING_STEPS[stepIdx] : 'ready'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="font-hand text-xl text-ink/60"
            >
              {phase === 'connecting' ? CONNECTING_STEPS[stepIdx] : 'Ready to open.'}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {phase === 'ready' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <Button onClick={onNext} aria-label="Open the message">
              Open →
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}
