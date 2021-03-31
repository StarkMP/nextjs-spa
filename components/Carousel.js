import Utilities from 'classes/Utilities';

export default function Carousel({
    items = [],
    divide = 3,
    id = 'carousel',
    theme = 'light',
    indicators = false
}) {
    const divided = Utilities.divideArray(items, divide);

    const result = divided.map((items, index) => {
        return (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className='carousel-item__inner'>
                    {items}
                </div>
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
        <div id={id} className={`carousel slide carousel-${theme}`} data-bs-ride='carousel'>
            {indicators ? <div className='carousel-indicators'>{buttons}</div> : null}
            <div className={`carousel-inner`}>{result}</div>
            <button className='carousel-control carousel-control-prev' type='button' data-bs-target={`#${id}`} data-bs-slide='prev'>
                <span className='carousel-control-icon carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Назад</span>
            </button>
            <button className='carousel-control carousel-control-next' type='button' data-bs-target={`#${id}`} data-bs-slide='next'>
                <span className='carousel-control-icon carousel-control-next-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Далее</span>
            </button>
        </div>
    );
}