import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'filled';
  children: React.ReactNode;
}

export default function Button({
  variant = 'outline',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'px-6 py-3 text-sm uppercase tracking-wider font-medium transition-all duration-300';

  const variantStyles = {
    outline:
      'bg-transparent border-2 border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-cocoa)]',
    filled:
      'bg-[var(--color-gold)] text-[var(--color-cocoa)] hover:bg-transparent hover:border-2 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
