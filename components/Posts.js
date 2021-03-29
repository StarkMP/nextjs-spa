import styles from 'styles/components/Posts.module.scss';

export default function Posts({ posts }) {
    return (
        <div id='posts' className={`carousel slide carousel-dark ${styles.carousel}`} data-bs-ride='carousel'>
            <div className='carousel-indicators'>
                <button type='button' data-bs-target='#posts' data-bs-slide-to='0' className='active' aria-current='true' aria-label='Slide 1'></button>
                <button type='button' data-bs-target='#posts' data-bs-slide-to='1' aria-label='Slide 2'></button>
                <button type='button' data-bs-target='#posts' data-bs-slide-to='2' aria-label='Slide 3'></button>
            </div>
            <div className='carousel-inner'>
                <div className={`carousel-item active ${styles.item}`}>
                    1
                </div>
                <div className={`carousel-item ${styles.item}`}>
                    2
                </div>
                <div className={`carousel-item ${styles.item}`}>
                    3
                </div>
            </div>
            <button className='carousel-control-prev' type='button' data-bs-target='#posts' data-bs-slide='prev'>
                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Previous</span>
            </button>
            <button className='carousel-control-next' type='button' data-bs-target='#posts' data-bs-slide='next'>
                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Next</span>
            </button>
        </div>
    );
}