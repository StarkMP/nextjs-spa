import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

Carousel.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    settings: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
};

export default function Carousel({
    id = '',
    className = '',
    settings = {},
    children
}) {
    const ref = useRef(null);

    useEffect(() => {
        $(ref.current).slick(settings);
    }, [settings]);

    return (
        <div ref={ref} id={id} className={className}>
            {children}
        </div>
    );
}