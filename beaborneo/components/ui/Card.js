/**
 * Card Component
 * 
 * A reusable card container component.
 */

import { cn } from '@/lib/utils';

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-md overflow-hidden',
        'border border-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card Header subcomponent
 */
Card.Header = function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-100', className)} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Body subcomponent
 */
Card.Body = function CardBody({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Footer subcomponent
 */
Card.Footer = function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4 border-t border-gray-100 bg-gray-50', className)} {...props}>
      {children}
    </div>
  );
};
