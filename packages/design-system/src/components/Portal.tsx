import { forwardRef, type HTMLAttributes, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const PORTAL_NAME = 'Portal';

type PortalProps = HTMLAttributes<HTMLDivElement> & {
  container?: Element | DocumentFragment | null;
};

const Portal = forwardRef<HTMLDivElement, PortalProps>(({ container, ...props }, ref) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const target = container ?? (mounted ? document.body : null);

  return target ? ReactDOM.createPortal(<div {...props} ref={ref} />, target) : null;
});

Portal.displayName = PORTAL_NAME;

const Root = Portal;

export { Portal, Root };
export type { PortalProps };
