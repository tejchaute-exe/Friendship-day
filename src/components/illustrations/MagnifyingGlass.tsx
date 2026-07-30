import { motion } from 'framer-motion';

export function MagnifyingGlass() {
  return (
    <motion.div
      animate={{ rotate: [-8, 6, -8] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
    >
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <circle cx="56" cy="56" r="38" fill="#BEE8FF" opacity={0.5} />
        <circle cx="56" cy="56" r="38" stroke="#2D2D2D" strokeWidth="8" fill="none" />
        <circle cx="56" cy="56" r="30" fill="#FFF9F4" opacity={0.7} />
        <line x1="84" y1="84" x2="124" y2="124" stroke="#2D2D2D" strokeWidth="10" strokeLinecap="round" />
        <motion.circle
          cx="48"
          cy="48"
          r="4"
          fill="#FFD54A"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}
