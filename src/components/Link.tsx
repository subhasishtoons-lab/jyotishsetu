import React from 'react';
import { useRouter } from '../context/RouterContext';
import { withBasePath } from '../utils/routing';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const resolvedHref = withBasePath(to);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    onClick?.(event);
    navigate(resolvedHref);
  };

  return (
    <a href={resolvedHref} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
