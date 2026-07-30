import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { Folder } from '@/components/illustrations/Folder';
import { CONFIDENTIAL_LINES } from '@/constants/content';

type Props = { onNext: () => void };

export function Screen6Confidential({ onNext }: Props) {
  const [open, setOpen] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (lineIdx < CONFIDENTIAL_LINES.length) {
      const t = setTimeout(() => setLineIdx((i) => i + 1), 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowBtn(true), 3000);
    return () => clearTimeout(t);
  }, [open, lineIdx]);

  return (
    <ScreenShell step={6}>
      <h1 className="font-heading text-2xl sm:text-3xl font-semibold mt-2 text-ink/80">
        🌼 One Small Thing
      </h1>

      <div className="mt-8">
        <Folder open={open} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 w-full max-w-[320px] rounded-card bg-white shadow-card p-6 text-left"
          >
            <div className="space-y-3 min-h-[140px]">
              {CONFIDENTIAL_LINES.map((line, i) => (
                <AnimatePresence key={i}>
                  {lineIdx > i && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`font-hand text-xl leading-snug ${
                        i === 1 || i === 4 ? 'text-ink' : 'text-ink/70'
                      }`}
                    >
                      {line}
                    </motion.p>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBtn && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-7">
            <Button variant="soft" onClick={onNext}>
              Continue
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}
