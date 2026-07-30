import { motion } from 'framer-motion';

export function Scanner() {
  return (
    <div className="relative w-44 h-44">
      <svg width="176" height="176" viewBox="0 0 176 176" fill="none">
        <rect x="58" y="6" width="60" height="14" rx="7" fill="#2D2D2D" />
        <rect x="48" y="18" width="80" height="10" rx="5" fill="#2D2D2D" />
        <rect x="20" y="28" width="136" height="120" rx="16" fill="#DCCEFF" />
        <rect x="20" y="28" width="136" height="120" rx="16" stroke="#2D2D2D" strokeWidth="3" opacity={0.15} />
        <circle cx="88" cy="88" r="40" fill="#FFF9F4" opacity={0.6} />
        <motion.circle
          cx="88"
          cy="88"
          r="40"
          stroke="#FFD54A"
          strokeWidth="3"
          strokeDasharray="6 8"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: 'center' }}
        />
      </svg>
      <motion.div
        className="absolute left-5 right-5 h-1.5 rounded-full bg-gradient-to-r from-transparent via-primary-yellow to-transparent"
        style={{ filter: 'blur(1px)' }}
        animate={{ top: ['36px', '136px', '36px'] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
