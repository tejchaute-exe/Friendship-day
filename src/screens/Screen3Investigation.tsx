import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { MagnifyingGlass } from '@/components/illustrations/MagnifyingGlass';
import { fadeUpItem, staggerContainer } from '@/constants/variants';

type Props = { onNext: () => void };

export function Screen3Investigation({ onNext }: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage < 3) {
      const t = setTimeout(() => setStage((s) => s + 1), stage === 0 ? 700 : 1400);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const cards = [
    {
      title: 'Chapter One',
      body: 'A normal conversation.',
      tag: 'Nothing unusual.',
      tone: 'bg-sky-blue/60',
    },
    {
      title: 'Chapter Two',
      body: 'Somehow... 30 minutes became 1 hour... 2 hours...',
      tag: 'Okay... who\u2019s even counting anymore?',
      tone: 'bg-coral/50',
    },
    {
      title: 'Chapter Three',
      body: 'Life got busy.',
      tag: 'But somehow... the conversations found their way back.',
      tone: 'bg-mint/70',
    },
  ];

  return (
    <ScreenShell step={3}>
      <MagnifyingGlass />

      <h1 className="font-heading text-2xl sm:text-3xl font-semibold mt-6">💬 Well... This Happened</h1>
      <p className="font-body text-ink/60 mt-2">A little recap.</p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-7 w-full max-w-[320px] space-y-3"
      >
        {cards.map((c, i) => {
          const shown = stage > i;
          return (
            <AnimatePresence key={c.title}>
              {shown && (
                <motion.div
                  variants={fadeUpItem}
                  whileHover={{ y: -4, rotate: -0.5 }}
                  className={`rounded-card ${c.tone} shadow-card p-4 text-left`}
                >
                  <p className="font-heading text-sm font-semibold text-ink/70">{c.title}</p>
                  <p className="font-body text-ink mt-1 text-base">{c.body}</p>
                  <p className="font-hand text-lg text-ink/70 mt-1">{c.tag}</p>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {stage >= 3 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-7">
            <Button onClick={onNext}>Keep Going →</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}
