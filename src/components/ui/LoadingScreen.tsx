import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LOADING_MESSAGES } from '@/constants/content';

type Props = {
  show: boolean;
};

export function LoadingScreen({ show }: Props) {
  const [msg, setMsg] = useState(LOADING_MESSAGES[0]);

  useEffect(() => {
    if (!show) return;
    const id = setInterval(() => {
      setMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    }, 220);
    return () => clearInterval(id);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream"
        >
          <div className="relative h-16 w-16">
            <motion.span
              className="absolute inset-0 rounded-full border-4 border-primary-yellow border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <motion.span
              className="absolute inset-2 rounded-full border-4 border-sky-blue border-b-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <motion.p
            key={msg}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 font-heading text-lg text-ink/70"
          >
            {msg}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
