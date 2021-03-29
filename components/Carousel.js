import Utilities from 'classes/Utilities';
import styles from 'styles/components/Carousel.module.scss';

export default function Carousel({
    items = [],
    divide = 3,
    id = Utilities.uuid(),
    className = '',
    itemClassName = ''
}) {
    const divided = Utilities.divideArray(items, divide);

    const result = divided.map((items, index) => {
        return (
            <div key={index} className={`carousel-item ${styles.carouselItem} ${itemClassName} ${index === 0 ? 'active' : ''}`}>
                {items}
            </div>
        );
    });

    const buttons = divided.map((items, index) => {
        return <button
            key={index}
            type='button'
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : 'false'}
            data-bs-target={`#${id}`}
            data-bs-slide-to={index}
            aria-label={`Item #${index}`}
        ></button>;
    });

    return (
        <div id={id} className={`carousel slide carousel-dark ${styles.carousel} ${className}`} data-bs-ride='carousel'>
            <div className='carousel-indicators'>{buttons}</div>
            <div className='carousel-inner'>{result}</div>
            <button className='carousel-control-prev' type='button' data-bs-target='#posts' data-bs-slide='prev'>
                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Назад</span>
            </button>
            <button className='carousel-control-next' type='button' data-bs-target='#posts' data-bs-slide='next'>
                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Далее</span>
            </button>
        </div>
    );
}