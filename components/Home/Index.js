import Link from 'next/link';
import { useLocalizer } from 'reactjs-localizer';
import { Fragment, useEffect, useState } from 'react';
import Router from 'next/router';

import useModal from 'hooks/useModal';
import AuthModal from 'components/AuthModal/Modal';
import { useHomeContext } from 'context/home';
import Button from 'components/Button';
import { useUserContext } from 'context/user';
import Pricing from './Pricing';
import laptop from './images/laptop.png';
import laprop_bg from './images/laptop_bg.png'

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

    const createSite = () => {
        if (!user) {
            return;
        }

        Router.push('/personal/instapages/create');
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
            {/* <header>
                {user ? (
                    <Link href='/personal'>
                        <a className='btn btn-warning'>Личный кабинет</a>
                    </Link>
                ) : (
                    <Fragment>
                        <Button className='btn-success' onClick={() => openAuthModal(true)}>{localize('Sign in')}</Button>
                        <Button className='btn-primary' onClick={() => openAuthModal(false)}>{localize('Sign up')}</Button>
                    </Fragment>
                )}
            </header>
            
            <main>
                <section>
                    <h2>Создайте сайт из Instagram</h2>
                    <Button onClick={createSite} className='btn-danger'>Создать сайт</Button>
                </section>
                <section>
                    <h2>{localize('Websites example')}:</h2>
                    <ul>
                        <li>
                            <Link href='/[id]' as={'/coffeehouse'}><a>Кофе-хаус</a></Link>
                        </li>
                    </ul>
                </section>
            </main> */}

            <header
                className={`home-header fixed-top ${
                    scrolled || dropMenu ? 'home-header_scrolled' : ''
                }`}
            >
                <h1 className='home-header__logo'>boxis</h1>
                <div className='home-header__right-side'>
                    <div className='home-header__links-row'>
                        {/* <a className='home-header__link' href="/">Примеры сайтов</a> */}
                    </div>
                    <div className='home-header__buttons-row'>
                        <button className='home-header__button'>Вход</button>
                        <button className='home-header__button'>Регистрация</button>
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
                            <li className='home-mobile-header__link'>
                                <a href='/'>Примеры сайтов</a>
                            </li>
                        </ul>
                        <div className='home-mobile-header__buttons-row'>
                            <button className='home-mobile-header__button'>
                                Вход
                            </button>
                            <button className='home-mobile-header__button'>
                                Регистрация
                            </button>
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
                                <button className='home__button'>
                                    Создать сайт
                                </button>
                            </div>
                            <div className='home__right-side'>
                                <img className='home__laptop' src={laptop} alt='laptop' />
                                <img className='home__laptop-bg' src={laprop_bg} alt='laptop_bg'></img>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='container-md home-pricing'>
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
