import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import Carousel from 'components/Carousel';

export default function SiteLayout(props) {
    const [scrolled, setScrolled] = useState(false);
    const [divide, setDivide] = useState(8);

    const {
        title,
        background,
        description
    } = props.details;

    const postsRef = useRef(null);

    const mappedPosts = props.posts.map(post => {
        return (
            <div className='site__post' key={post.id}>
                <div className='site__post-inner' style={{ backgroundImage: `url(${post.img})` }}></div>
            </div>
        );
    });

    const onScroll = () => {
        if (pageYOffset > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    // todo костыль
    const setupPostsCarouselSize = () => {
        if (!props.posts.length) {
            return;
        }

        const $carousel = $(postsRef.current);
        const scrW = $(window).width();

        let carouselWidth = 0;

        if (scrW <= 768-17) {
            carouselWidth = $carousel.width() / 3;
            setDivide(3);
        } else {
            carouselWidth = $carousel.width() / 2;
            setDivide(8);

            if (props.posts.length < 5) {
                carouselWidth /= 2;
                $(postsRef.current).find('.site__post').css({ height: '100%' });
            }
        }

        if ($carousel.height() !== carouselWidth) {
            $carousel.height(carouselWidth);
        }
    };

    useEffect(() => {
        const $document = $(document);
        const $window = $(window);

        $document.on('scroll', onScroll);
        $window.on('resize', setupPostsCarouselSize);

        setupPostsCarouselSize();

        return () => {
            $document.off('scroll', onScroll);
            $window.off('resize', setupPostsCarouselSize);
        };
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>

            <header className={`header fixed-top px-4 site-header ${scrolled ? 'bg-light' : ''}`}>
                <h2 className={`site-header__title ${scrolled ? 'text-dark' : 'text-white'}`}>{title}</h2>
                <button type="button" className={`btn btn-sm ${scrolled ? 'btn-outline-dark' : 'btn-outline-light'} px-3 site-header__contact-btn`}>Связаться</button>
            </header>

            <main className={`flex-shrink-0 site`}>
                <section className='site__background' style={{ backgroundImage: `url(${background})` }}>
                    <div className={`site__background-content container-sm`}>
                        <h1 className='fs-1'>{title}</h1>
                        <p className='fs-5'>{description}</p>
                    </div>
                </section>
                <div className={`container`}>
                    <section id='posts' className='site__section'>
                        <h2 className='site__section-title'>Товары и услуги</h2>
                        {props.posts.length ? (
                            <Carousel
                                items={mappedPosts}
                                divide={divide}
                                id='posts-carousel'
                                theme='dark'
                                reference={postsRef}
                            />
                        ) : (
                            <h5 className='site__section-empty'>Список товаров пуст</h5>
                        )}
                    </section>
                </div>
            </main>

            <footer className='footer mt-auto py-2 bg-dark site-footer'>
                <div className='container text-white'>
                    Сделано в <Link href='/'><a className={`text-decoration-none site-footer__link`}>Boxis.io</a></Link>
                </div>
            </footer>
        </>
    );
}