import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-secondary border border-primary border-opacity-20 p-6 ${className}`}>
      {children}
    </div>
  );
}

