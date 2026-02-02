/**
 * Button Component
 * 
 * Modern button with Bea Borneo brand styles.
 */

import Link from 'next/link';
import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-[#E31E24] text-white hover:bg-[#c41a1f] focus:ring-red-500 shadow-lg shadow-red-500/20',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
  outline: 'border-2 border-[#E31E24] text-[#E31E24] hover:bg-red-50 focus:ring-red-500',
  ghost: 'text-[#E31E24] hover:bg-red-50 focus:ring-red-500',
  white: 'bg-white text-gray-900 hover:bg-gray-50 focus:ring-white shadow-lg',
  'outline-white': 'border-2 border-white/50 text-white hover:bg-white/10 focus:ring-white',
  dark: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-base',
  xl: 'px-10 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  disabled,
  type = 'button',
  ...props
}) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
