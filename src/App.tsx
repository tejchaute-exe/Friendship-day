import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundDoodles } from '@/components/background/BackgroundDoodles';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useEasterEggs } from '@/hooks/useEasterEggs';
import { Screen1Incoming } from '@/screens/Screen1Incoming';
import { Screen2Identity } from '@/screens/Screen2Identity';
import { Screen3Investigation } from '@/screens/Screen3Investigation';
import { Screen4Achievements } from '@/screens/Screen4Achievements';
import { Screen5Verification } from '@/screens/Screen5Verification';
import { Screen6Confidential } from '@/screens/Screen6Confidential';
import { Screen7Gift } from '@/screens/Screen7Gift';
import { Screen8Complete } from '@/screens/Screen8Complete';

export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export default function App() {
  const [step, setStep] = useState<StepId>(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const eggs = useEasterEggs();

  const goNext = (next: StepId) => {
    if (next > 8) return;
    setLoading(true);
    setTimeout(() => {
      setStep(next);
      navigate(`/${next}`);
      setLoading(false);
    }, 800);
  };

  const replay = () => {
    setLoading(true);
    setTimeout(() => {
      setStep(1);
      navigate('/1');
      setLoading(false);
    }, 800);
  };

  // keep URL in sync if user refreshes
  useEffect(() => {
    const path = window.location.pathname.replace('/', '');
    const n = Number(path);
    if (n >= 1 && n <= 8 && n !== step) setStep(n as StepId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <BackgroundDoodles />

      {/* Logo (easter egg target) */}
      <button
        onClick={eggs.onLogoClick}
        aria-label="Incoming Transmission home"
        className="no-tap-highlight fixed top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2"
      >
        <span className="grid place-items-center h-8 w-8 rounded-full bg-primary-yellow shadow-btn text-base">
          ✦
        </span>
        <span className="font-heading text-sm text-ink/70 hidden sm:block">A Tiny Message</span>
      </button>

      <LoadingScreen show={loading} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 1 && <Screen1Incoming onNext={() => goNext(2)} />}
          {step === 2 && <Screen2Identity onNext={() => goNext(3)} />}
          {step === 3 && <Screen3Investigation onNext={() => goNext(4)} />}
          {step === 4 && <Screen4Achievements onNext={() => goNext(5)} />}
          {step === 5 && <Screen5Verification onNext={() => goNext(6)} />}
          {step === 6 && <Screen6Confidential onNext={() => goNext(7)} />}
          {step === 7 && <Screen7Gift onNext={() => goNext(8)} />}
          {step === 8 && <Screen8Complete onReplay={replay} />}
        </motion.div>
      </AnimatePresence>

      {/* Easter egg: Too Curious */}
      <AnimatePresence>
        {eggs.tooCurious && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 rounded-card bg-white shadow-card px-5 py-4 text-center max-w-[300px]"
          >
            <p className="font-hand text-2xl text-ink">Achievement Unlocked: Too Curious 🔍</p>
            <button
              onClick={eggs.dismissCurious}
              className="mt-2 font-body text-sm text-ink/50 underline"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter egg: Idle */}
      <AnimatePresence>
        {eggs.idleMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 rounded-card bg-lavender shadow-card px-5 py-4 text-center max-w-[300px]"
          >
            <p className="font-hand text-2xl text-ink whitespace-pre-line">{eggs.idleMsg}</p>
            <button
              onClick={eggs.dismissIdle}
              className="mt-2 font-body text-sm text-ink/50 underline"
            >
              Still here
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
