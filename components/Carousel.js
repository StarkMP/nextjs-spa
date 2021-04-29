import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import $ from 'jquery';

Carousel.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    settings: PropTypes.object.isRequired,
};

export default function Carousel({
    id = '',
    className = '',
    settings = {},
    children
}) {
    const ref = useRef(null);

    useEffect(() => {
        import('slick-carousel').then(() => {
            $(ref.current).slick(settings);
        });
    }, [settings]);

    return (
        <div ref={ref} id={id} className={`carousel ${className}`}>
            {children}
        </div>
    );
}