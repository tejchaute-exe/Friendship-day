import { motion } from 'framer-motion';
import { TOTAL_STEPS } from '@/constants/content';

type Props = {
  step: number;
};

export function ProgressBar({ step }: Props) {
  const pct = Math.min(step / TOTAL_STEPS, 1) * 100;
  return (
    <div className="w-full" role="progressbar" aria-valuenow={step} aria-valuemax={TOTAL_STEPS}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-heading text-sm text-ink/60 tracking-wide">
          Step {step} of {TOTAL_STEPS}
        </span>
        <span className="font-body text-xs text-ink/40">{Math.round(pct)}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-ink/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary-yellow"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
