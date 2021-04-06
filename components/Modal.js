import { useRef, useEffect, useState } from 'react';
import PortalOverlay from 'components/PortalOverlay';

export default function Modal({
    open = false,
    children = null,
    className = '',
    dialogClassName = '',
    contentClassName = '',
    onClose
}) {
    if (!onClose) {
        throw new Error('onClose function must be defined');
    }

    const [active, setActive] = useState(open);
    const reference = useRef(null);

    useEffect(() => {
        const { current } = reference;

        if (current && open) {
            const modal = new bootstrap.Modal(current);

            current.addEventListener('hidden.bs.modal', onClose);
            modal.show();
        }

        setActive(open);

        return () => {
            if (current) {
                current.removeEventListener('hidden.bs.modal', onClose);
            }
        };
    }, [open]);

    return active || open ? (
        <PortalOverlay parent='body'>
            <div ref={reference} id='modal' tabIndex='-1' className={`modal ${className}`}>
                <div className={`modal-dialog modal-dialog-centered ${dialogClassName}`}>
                    <div className={`modal-content ${contentClassName}`}>
                        {children}
                    </div>
                </div>
            </div>
        </PortalOverlay>
    ) : null;
}