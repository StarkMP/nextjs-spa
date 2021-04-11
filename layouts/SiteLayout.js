import Head from 'next/head';
import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Carousel from 'components/Carousel';
import SitePost from 'components/SitePost';
import Values from 'classes/Values';

SiteLayout.propTypes = {
    children: PropTypes.node,
    details: PropTypes.object
};

export default function SiteLayout(props) {
    const [scrolled, setScrolled] = useState(false);
    const [divide, setDivide] = useState(8);

    const {
        title,
        background,
        description
    } = props.details;

    const postsRef = useRef(null);

    const mappedPosts = useMemo(() => props.posts.map(post => <SitePost key={post.id} post={post}/>), [props.posts]);

    const onScroll = () => {
        if (pageYOffset > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

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

    const postsSection = useMemo(() => {
        return props.posts.length ? (
            <section id='posts' className='site__section'>
                <h2 className='site__section-title'>Товары и услуги</h2>
                <Carousel
                    items={mappedPosts}
                    divide={divide}
                    id='posts-carousel'
                    theme='dark'
                    reference={postsRef}
                />
            </section>
        ) : null;
    }, [props.posts, divide, postsRef]);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet='utf-8'/>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
            </Head>

            <header className={`header fixed-top px-4 site-header ${scrolled ? 'bg-light' : ''}`}>
                <h2 className={`site-header__title ${scrolled ? 'text-dark' : 'text-white'}`}>{title}</h2>
                <button type='button' className={`btn btn-sm ${scrolled ? 'btn-outline-dark' : 'btn-outline-light'} px-3 site-header__contact-btn`}>Связаться</button>
            </header>

            <main className='flex-shrink-0 site'>
                <section className='site__background' style={{ backgroundImage: `url(${background})` }}>
                    <div className='site__background-content container-sm'>
                        <h1 className='fs-1'>{title}</h1>
                        <p className='fs-5'>{description}</p>
                    </div>
                </section>
                <div className='container'>
                    {postsSection}
                </div>
            </main>

            <footer className='footer mt-auto py-2 bg-dark site-footer'>
                <div className='container text-white'>
                    Сделано в <Link href='/'><a className='text-decoration-none site-footer__link'>{Values.projectName}</a></Link>
                </div>
            </footer>
        </>
    );
}