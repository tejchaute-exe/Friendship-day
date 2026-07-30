import { motion } from 'framer-motion';
import { TOTAL_STEPS } from '@/constants/content';

type Props = {
  step: number;
};

export function StepIndicator({ step }: Props) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
        const filled = i < step;
        return (
          <motion.span
            key={i}
            initial={false}
            animate={{
              scale: filled ? 1 : 0.85,
              backgroundColor: filled ? '#FFD54A' : 'rgba(45,45,45,0.12)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="h-2.5 w-2.5 rounded-full"
          />
        );
      })}
    </div>
  );
}
