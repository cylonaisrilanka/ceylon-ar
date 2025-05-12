
'use client';

import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import type { ReactNode } from 'react';

interface SmoothLinkProps extends Omit<NextLinkProps, 'href'> {
  children: ReactNode;
  className?: string;
  targetId: string; // The ID of the element to scroll to, without '#'
  hrefHash: string; // e.g., "#services"
  ['aria-label']?: string; // Explicitly type aria-label
}

export default function SmoothLink({
  children,
  className,
  targetId,
  hrefHash,
  ['aria-label']: ariaLabel,
  ...props
}: SmoothLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
      // Update URL hash manually after scrolling
      if (window.history.pushState) {
        window.history.pushState(null, '', hrefHash);
      }
    }
  };

  return (
    <NextLink
      href={hrefHash} // `next/link` still needs a valid href for semantics and fallback
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      scroll={false} // Prevent Next.js default scroll behavior
      {...props}
    >
      {children}
    </NextLink>
  );
}
