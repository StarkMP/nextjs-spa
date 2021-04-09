import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

Portal.propTypes = {
    children: PropTypes.node.isRequired,
    parent: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default function Portal({ children, parent, className }) {
    const el = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        const target = parent && parent.appendChild ? parent : document.body;
        const classList = ['portal'];

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
