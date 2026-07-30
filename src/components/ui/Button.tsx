import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';

type ButtonProps = HTMLMotionProps<'button'> & {
  children: ReactNode;
  variant?: 'primary' | 'soft' | 'ghost';
  className?: string;
};

const base =
  'no-tap-highlight select-none rounded-btn font-heading font-semibold text-ink px-8 py-3.5 text-base sm:text-lg transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow/40';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary-yellow shadow-btn hover:bg-yellow-400',
  soft: 'bg-sky-blue text-ink shadow-card hover:bg-sky-200',
  ghost: 'bg-transparent hover:bg-black/5 text-ink/70',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className = '', ...rest }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={`${base} ${variants[variant]} ${className}`}
        {...rest}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
