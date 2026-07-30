import { motion } from 'framer-motion';

export function Flower() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '60px 60px' }}
        >
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="60"
              cy="32"
              rx="14"
              ry="22"
              fill="#FFB3A7"
              transform={`rotate(${a} 60 60)`}
              opacity={0.9}
            />
          ))}
        </motion.g>
        <circle cx="60" cy="60" r="12" fill="#FFD54A" />
      </svg>
    </motion.div>
  );
}
