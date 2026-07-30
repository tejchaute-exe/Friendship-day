import { motion } from 'framer-motion';

export function Folder({ open }: { open: boolean }) {
  return (
    <div className="relative" style={{ width: 180, height: 150 }}>
      <svg width="180" height="150" viewBox="0 0 180 150" fill="none" className="absolute inset-0">
        <path d="M10 40 L70 40 L80 52 L170 52 L170 130 Q170 138 162 138 L18 138 Q10 138 10 130 Z" fill="#FFD54A" />
        <motion.path
          d="M10 40 L70 40 L80 52 L170 52 L170 70 L10 70 Z"
          fill="#E0B73A"
          animate={{ rotate: open ? -28 : 0, y: open ? -6 : 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          style={{ transformOrigin: '14px 46px' }}
        />
      </svg>
    </div>
  );
}
