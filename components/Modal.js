import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import Portal from 'components/Portal';

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    hideCloseButton: PropTypes.bool,
    className: PropTypes.string,
    dialogClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    onClose: PropTypes.func.isRequired
};

function Modal({
    open = false,
    children = null,
    hideCloseButton = false,
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
        let modal;

        if (current && open) {
            modal = new bootstrap.Modal(current);

            current.addEventListener('hidden.bs.modal', onClose);
            modal.show();
        }

        setActive(open);

        return () => {
            if (current) {
                current.removeEventListener('hidden.bs.modal', onClose);
                
                if (modal) {
                    modal.hide();
                }
            }
        };
    }, [open, onClose]);

    return active || open ? (
        <Portal parent={document.querySelector('#__next')}>
            <div ref={reference} id='modal' tabIndex='-1' className={`modal ${className}`}>
                <div className={`modal-dialog modal-dialog-centered ${dialogClassName}`}>
                    <div className={`modal-content ${contentClassName}`}>
                        { !hideCloseButton ? (
                            <button data-bs-toggle='modal' data-bs-target='#modal' className='modal-close'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='bi bi-x' viewBox='0 0 16 16'>
                                    <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/>
                                </svg>
                            </button>
                        ) : null }
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    ) : null;
}

export default dynamic(() => Promise.resolve(Modal), {
    ssr: false
});