import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

export default function PortalOverlay({ children, parent, className }) {
    const el = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        const target = parent && parent.appendChild ? parent : document.body;
        const classList = ['portal-overlay'];

        if (className) {
            className.split(' ').forEach((item) => classList.push(item));
        }

        classList.forEach((item) => el.classList.add(item));
        target.appendChild(el);

        return () => {
            target.removeChild(el);
        };
    }, [el, parent, className]);

    return createPortal(children, el);
}
