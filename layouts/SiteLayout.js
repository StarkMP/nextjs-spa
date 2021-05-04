import Head from 'next/head';
import { Fragment, useEffect, useState, useMemo } from 'react';
import { useLocalizer } from 'reactjs-localizer';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Carousel from 'components/Carousel';
import SitePost from 'components/SitePost';
import SiteSection from 'components/SiteSection';
import Values from 'classes/Values';

SiteLayout.propTypes = {
    posts: PropTypes.array,
    details: PropTypes.object
};

export default function SiteLayout(props) {
    const [scrolled, setScrolled] = useState(false);

    const {
        title,
        background,
        description,
        // favicon,
        // constructor,
        // credits
    } = props.details;

    const { localize } = useLocalizer();
    const mappedPosts = useMemo(() => props.posts.map(post => <SitePost key={post.id} post={post}/>), [props.posts]);

    const onScroll = () => {
        if (pageYOffset > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', onScroll);

        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, []);

    const postsSection = useMemo(() => {
        const settings = {
            infinite: true,
            rows: 2,
            slidesPerRow: 4,
            prevArrow: '<button type="button" class="slick-prev">Previous<i class="bi bi-arrow-left-short"></i></button>',
            nextArrow: '<button type="button" class="slick-next">Next<i class="bi bi-arrow-right-short"></i></button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        rows: 1,
                        slidesPerRow: 1,
                        variableWidth: true,
                        swipeToSlide: true
                    }
                }
            ]
        };

        return props.posts.length ? (
            <SiteSection id='posts' title='Товары и услуги'>
                <Carousel settings={settings}>{mappedPosts}</Carousel>
            </SiteSection>
        ) : null;
    }, [props.posts, mappedPosts]);

    // todo
    const navigation = useMemo(() => {
        const defaultSections = [
            { title: 'Главная', id: 'home' },
            { title: 'Товары и услуги', id: 'posts' },
        ];

        return defaultSections.concat([]).map((item, index) => {
            return (
                <li key={index} className='nav-item'>
                    <a href={`#${item.id}`} className={`nav-link ${scrolled ? 'text-dark' : 'text-light'}`}>{item.title}</a>
                </li>
            );
        });
    }, [scrolled]);

    // todo
    const customSections = null;

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta charSet='utf-8'/>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
            </Head>

            <header className={`header fixed-top px-4 site-header ${scrolled ? 'bg-light' : ''}`}>
                <h2 className={`site-header__title ${scrolled ? 'text-dark' : 'text-white'}`}>{title}</h2>
                <nav className='nav'>{navigation}</nav>
                <button type='button' className={`btn btn-sm ${scrolled ? 'btn-outline-dark' : 'btn-outline-light'} px-3 site-header__contact-btn`}>Связаться</button>
            </header>

            <main className='flex-shrink-0 site'>
                <section id='home' className='site__background' style={{ backgroundImage: `url(${background})` }}>
                    <div className='site__background-content container-sm'>
                        <h1 className='fs-1'>{title}</h1>
                        <p className='fs-5'>{description}</p>
                    </div>
                </section>
                <div className='container'>
                    {postsSection}
                    {customSections}
                </div>
            </main>

            <footer className='footer mt-auto py-2 bg-dark site-footer'>
                <div className='container text-white'>
                    {localize('Made in')} <Link href='/'><a className='text-decoration-none site-footer__link'>{Values.projectName}</a></Link>
                </div>
            </footer>
        </Fragment>
    );
}