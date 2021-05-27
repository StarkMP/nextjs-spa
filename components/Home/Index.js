import Link from 'next/link';
import { useLocalizer } from 'reactjs-localizer';
import { Fragment, useEffect, useState } from 'react';

import useModal from 'hooks/useModal';
import AuthModal from 'components/AuthModal/Modal';
import { useHomeContext } from 'context/home';
import Button from 'components/Button';
import { useUserContext } from 'context/user';
import Pricing from './Pricing';
import laptop from './images/laptop.png';
import laptop_bg from './images/laptop_bg.png';

export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [dropMenu, setDropMenu] = useState(false);

    const { localize } = useLocalizer();
    const authModal = useModal();
    const { setAuthForm } = useHomeContext();
    const { user } = useUserContext();

    const openAuthModal = (type) => {
        setAuthForm(type);
        authModal.setActive(true);
    };

    const onScroll = () => {
        if (window.pageYOffset > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', onScroll);

        return () => document.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];

        if (dropMenu) {
            body.classList.add('overflow-hidden');
        } else {
            body.classList.remove('overflow-hidden');
        }
    }, [dropMenu]);

    return (
        <Fragment>
            <header
                className={`home-header fixed-top ${
                    scrolled || dropMenu ? 'home-header_scrolled' : ''
                }`}
            >
                <h1 className='home-header__logo'>boxis</h1>
                <div className='home-header__right-side'>
                    <div className='home-header__links-row'>

                    </div>
                    <div className='home-header__buttons-row'>
                        {user ? (
                            <Link href='/personal'>
                                <a className='home-header__button'>Личный кабинет</a>
                            </Link>
                        ) : (
                            <Fragment>
                                <Button className='home-header__button' onClick={() => openAuthModal(true)}>{localize('Sign in')}</Button>
                                <Button className='home-header__button' onClick={() => openAuthModal(false)}>{localize('Sign up')}</Button>
                            </Fragment>
                        )}
                        {dropMenu ? (
                            <i
                                className='home-header__menu bi bi-x'
                                onClick={() => setDropMenu(false)}
                            ></i>
                        ) : (
                            <i
                                className='home-header__menu bi bi-list'
                                onClick={() => setDropMenu(true)}
                            ></i>
                        )}
                    </div>
                </div>
                {dropMenu ? (
                    <div className='home-mobile-header'>
                        <ul className='home-mobile-header__row'>
                            
                        </ul>
                        <div className='home-mobile-header__buttons-row'>
                            {user ? (
                                <Link href='/personal'>
                                    <a className='home-mobile-header__button'>Личный кабинет</a>
                                </Link>
                            ) : (
                                <Fragment>
                                    <Button className='home-mobile-header__button' onClick={() => openAuthModal(true)}>{localize('Sign in')}</Button>
                                    <Button className='home-mobile-header__button' onClick={() => openAuthModal(false)}>{localize('Sign up')}</Button>
                                </Fragment>
                            )}
                        </div>
                    </div>
                ) : null}
            </header>

            <main>
                <section className='home__greet'>
                    <div className='home__center'>
                        <div className='home__content-block'>
                            <div className='home__left-side'>
                                <h2 className='home__content-title'>
                                    Создайте красивый сайт быстро
                                </h2>
                                <p className='home__content-subtitle'>
                                    Конструктор сайтов Boxis надёжный и простой.
                                    Каждый может быстро создать сайт или
                                    интернет-магазин даже без навыков
                                    программирования или дизайна.
                                </p>
                                <a className='home__button' href='#price-list'>
                                    Создать сайт
                                </a>
                            </div>
                            <div className='home__right-side'>
                                <img className='home__laptop' src={laptop} alt='laptop' />
                                <img className='home__laptop-bg' src={laptop_bg} alt='laptop_bg'></img>
                            </div>
                        </div>
                    </div>
                </section>
                <section id='price-list' className='container-md home-pricing'>
                    <h1 className='home-pricing__title'>
                        Создайте отличный сайт за считанные минуты
                    </h1>
                    <Pricing />
                </section>
            </main>

            <footer className='home-footer'>
                <h2 className='home-footer__logo'>boxis</h2>
            </footer>

            <AuthModal
                open={authModal.active}
                onClose={authModal.onClose}
            />
        </Fragment>
    );
}
