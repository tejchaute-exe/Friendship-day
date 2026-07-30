import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type CardProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, rotate: -0.4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`rounded-card bg-white shadow-card p-6 ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
