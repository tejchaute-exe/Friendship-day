import { motion } from 'framer-motion';

export function GiftBox({ shaking }: { shaking: boolean }) {
  return (
    <motion.div
      animate={shaking ? { rotate: [-6, 6, -6, 0], x: [-2, 2, -2, 0] } : { rotate: 0, x: 0 }}
      transition={shaking ? { duration: 0.5, repeat: Infinity } : { duration: 0.3 }}
      className="relative"
    >
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <rect x="20" y="74" width="120" height="70" rx="10" fill="#FFB3A7" />
        <rect x="20" y="74" width="120" height="70" rx="10" fill="url(#shade)" opacity={0.15} />
        <rect x="14" y="58" width="132" height="26" rx="10" fill="#FFB3A7" />
        <rect x="68" y="58" width="24" height="86" fill="#FFD54A" />
        <rect x="14" y="58" width="132" height="10" rx="5" fill="#FFD54A" opacity={0.6} />
        <path d="M80 58 C60 38 40 44 50 58 C40 72 64 70 80 58Z" fill="#FFD54A" />
        <path d="M80 58 C100 38 120 44 110 58 C120 72 96 70 80 58Z" fill="#FFD54A" />
        <circle cx="80" cy="54" r="6" fill="#E0B73A" />
        <defs>
          <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
