import { motion } from 'framer-motion';
import { useMemo } from 'react';

type Doodle = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  kind: 'star' | 'cloud' | 'sparkle' | 'dot';
};

const KINDS: Doodle['kind'][] = ['star', 'cloud', 'sparkle', 'dot'];

function Star({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l2.4 6.6L21 9l-5.4 4.2L17.4 21 12 16.8 6.6 21l1.8-7.8L3 9l6.6-.4L12 2z"
        fill="#FFD54A"
        opacity={0.55}
      />
    </svg>
  );
}

function Cloud({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 48 30" fill="none">
      <path
        d="M12 24a8 8 0 01-1-15.9A10 10 0 0130 9a7 7 0 011 13.9H12z"
        fill="#BEE8FF"
        opacity={0.5}
      />
    </svg>
  );
}

function Sparkle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2v8M12 14v8M2 12h8M14 12h8" stroke="#DCCEFF" strokeWidth={2.5} strokeLinecap="round" opacity={0.6} />
    </svg>
  );
}

function Dot({ size }: { size: number }) {
  return <span className="block rounded-full bg-coral/40" style={{ width: size, height: size }} />;
}

export function BackgroundDoodles() {
  const doodles = useMemo<Doodle[]>(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 14 + Math.random() * 26,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 6,
        kind: KINDS[i % KINDS.length],
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {doodles.map((d) => (
        <motion.div
          key={d.id}
          className="absolute"
          style={{ left: d.left, top: d.top }}
          animate={{ y: [0, -16, 0], opacity: [0.35, 0.7, 0.35] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {d.kind === 'star' && <Star size={d.size} />}
          {d.kind === 'cloud' && <Cloud size={d.size} />}
          {d.kind === 'sparkle' && <Sparkle size={d.size} />}
          {d.kind === 'dot' && <Dot size={d.size} />}
        </motion.div>
      ))}
    </div>
  );
}
