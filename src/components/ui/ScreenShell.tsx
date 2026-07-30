import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ProgressBar } from './ProgressBar';
import { StepIndicator } from './StepIndicator';

type Props = {
  step: number;
  children: ReactNode;
};

export function ScreenShell({ step, children }: Props) {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center px-5 py-6 sm:py-10">
      <div className="w-full max-w-[420px]">
        <div className="flex items-center justify-between gap-4 mb-5">
          <StepIndicator step={step} />
          <span className="font-hand text-xl text-ink/50 leading-none">
            {step}/{8}
          </span>
        </div>
        <ProgressBar step={step} />
        <motion.main
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center text-center"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
