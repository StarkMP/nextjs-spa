import { useMemo } from 'react';
import PropTypes from 'prop-types';

import Utils from 'classes/Utils';

Carousel.propTypes = {
    items: PropTypes.array.isRequired,
    divide: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    theme: PropTypes.string,
    indicators: PropTypes.bool,
    interval: PropTypes.number,
    reference: PropTypes.object
};

export default function Carousel({
    items = [],
    divide = 3,
    id = 'carousel',
    theme = 'light',
    indicators = false,
    interval = 0,
    reference = null
}) {
    const divided = useMemo(() => Utils.divideArray(items, divide), [items, divide]);

    const result = useMemo(() => divided.map((items, index) => {
        return (
            <div key={index + items.length} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className='carousel-item__inner'>
                    {items}
                </div>
            </div>
        );
    }), [divided]);

    const buttons = useMemo(() => divided.map((items, index) => {
        return <button
            key={index}
            type='button'
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : 'false'}
            data-bs-target={`#${id}`}
            data-bs-slide-to={index}
            aria-label={`Item #${index}`}
        ></button>;
    }), [divided, id]);

    return (
        <div ref={reference} id={id} className={`carousel slide carousel-${theme}`} data-bs-ride='carousel' data-bs-interval={interval || 'false'}>
            {indicators ? <div className='carousel-indicators'>{buttons}</div> : null}
            <div className='carousel-inner'>{result}</div>
            {divided.length > 1 ? (
                <>
                    <button className='carousel-control carousel-control-prev' type='button' data-bs-target={`#${id}`} data-bs-slide='prev'>
                        <span className='carousel-control-icon carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Назад</span>
                    </button>
                    <button className='carousel-control carousel-control-next' type='button' data-bs-target={`#${id}`} data-bs-slide='next'>
                        <span className='carousel-control-icon carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Далее</span>
                    </button>
                </>
            ) : null}
        </div>
    );
}