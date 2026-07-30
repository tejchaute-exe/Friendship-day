import { motion } from 'framer-motion';

type Props = {
  size?: number;
  className?: string;
  onClick?: () => void;
  caught?: boolean;
  style?: React.CSSProperties;
};

export function FloatingStar({ size = 36, className = '', onClick, caught, style }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Click the star"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      animate={caught ? { scale: 0, opacity: 0 } : { rotate: [0, 8, -8, 0] }}
      transition={caught ? { duration: 0.3 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className={`no-tap-highlight ${className}`}
      style={style}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l2.4 6.6L21 9l-5.4 4.2L17.4 21 12 16.8 6.6 21l1.8-7.8L3 9l6.6-.4L12 2z"
          fill="#FFD54A"
          stroke="#E0B73A"
          strokeWidth="1"
        />
      </svg>
    </motion.button>
  );
}
