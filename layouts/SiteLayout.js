import Head from 'next/head';
import { Fragment, useEffect, useState, useMemo } from 'react';
import { useLocalizer } from 'reactjs-localizer';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Carousel from 'components/Carousel';
import Post from 'components/Site/Post';
import Section from 'components/Site/Section';
import Values from 'classes/Values';
import Utils from 'classes/Utils';
import useModal from 'hooks/useModal';
import CreditsModal from 'components/Site/CreditsModal';

SiteLayout.propTypes = {
    posts: PropTypes.array,
    details: PropTypes.object
};

export default function SiteLayout({ details }) {
    const [scrolled, setScrolled] = useState(false);

    const {
        title,
        instagramLogin,
        description,
        vkontakte,
        telegram,
        instaposts
    } = details;

    const { localize } = useLocalizer();
    const { active, setActive, onClose  } = useModal();

    const mappedPosts = useMemo(() => instaposts.map(post => {
        return <Post key={post.id} openCredits={() => setActive(true)} login={instagramLogin} post={post}/>;
    }), [instagramLogin, instaposts, setActive]);

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

        return mappedPosts.length ? (
            <Section id='posts' title='Товары и услуги'>
                <Carousel settings={settings}>{mappedPosts}</Carousel>
            </Section>
        ) : null;
    }, [mappedPosts]);

    const creditsSection = useMemo(() => {
        return (
            <Section id='credits' title='Контакты'>
                <a href={`https://instagram.com/${instagramLogin}`}>Instagram</a>
                {vkontakte ? <a href={`https://vk.me/${vkontakte}`}>ВКонтакте</a> : null }
                {telegram ? <a href={`https://t.me/${telegram}`}>Telegram</a> : null}
            </Section>
        );
    }, [instagramLogin, vkontakte, telegram]);

    // todo
    const customSections = useMemo(() => [], []);

    const navigation = useMemo(() => {
        const defaultSections = [
            { title: 'Главная', id: 'home' },
            { title: 'Товары и услуги', id: 'posts' },
            { title: 'Контакты', id: 'credits' }
        ];

        return defaultSections.concat(customSections).map((item, index) => {
            return (
                <li key={index} className='nav-item'>
                    <a href={`#${item.id}`} className={`nav-link ${scrolled ? 'text-dark' : 'text-light'}`}>{item.title}</a>
                </li>
            );
        });
    }, [scrolled, customSections]);

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta charSet='utf-8'/>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <meta name='robots' content='index, follow'/>
                <meta name='description' content={description}/>

                <link rel='icon' href={`https://boxis.io/api/v1/instapages/${instagramLogin}/favicon`}></link>
            </Head>

            <header className={`header fixed-top px-4 site-header ${scrolled ? 'bg-light' : ''}`}>
                <h2 className={`site-header__title ${scrolled ? 'text-dark' : 'text-white'}`}>{title}</h2>
                <nav className='nav'>{navigation}</nav>
                <button onClick={() => setActive(true)} type='button' className={`btn btn-sm ${scrolled ? 'btn-outline-dark' : 'btn-outline-light'} px-3 site-header__contact-btn`}>Связаться</button>
            </header>

            <main className='flex-shrink-0 site'>
                <section id='home' className='site__background' style={{ backgroundImage: `url(https://boxis.io/api/v1/instapages/${instagramLogin}/background)` }}>
                    <div className='site__background-content container-sm'>
                        <h1 className='fs-1'>{title}</h1>
                        <p className='fs-5'>{Utils.formatSpaces(description)}</p>
                    </div>
                </section>
                <div className='container'>
                    {postsSection}
                    {customSections}
                    {creditsSection}
                </div>
            </main>

            <footer className='footer mt-auto py-2 bg-dark site-footer'>
                <div className='container text-white'>
                    {localize('Made in')} <Link href='/'><a className='text-decoration-none site-footer__link'>{Values.projectName}</a></Link>
                </div>
            </footer>

            <CreditsModal credits={{ instagram: instagramLogin, vkontakte, telegram }} open={active} onClose={onClose}/>
        </Fragment>
    );
}