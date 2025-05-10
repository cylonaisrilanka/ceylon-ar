import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export default function Section({ children, className, containerClassName, id, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', className)}
      {...props}
    >
      <div className={cn('container mx-auto px-4', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
