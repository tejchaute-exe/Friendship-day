import { motion } from 'framer-motion';

export function Envelope() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
    >
      <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
        <rect x="10" y="30" width="160" height="100" rx="14" fill="#FFD54A" />
        <path d="M10 44 L90 92 L170 44" stroke="#FFF9F4" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 130 L70 84 M170 130 L110 84" stroke="#E0B73A" strokeWidth="4" strokeLinecap="round" opacity={0.5} />
        <motion.circle
          cx="150"
          cy="22"
          r="6"
          fill="#FFB3A7"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
      <motion.span
        className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl"
        animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        ✉️
      </motion.span>
    </motion.div>
  );
}
