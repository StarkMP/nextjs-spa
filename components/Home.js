import Link from 'next/link';
import { useLocalizer } from 'reactjs-localizer';
import { Fragment } from 'react';
import Router from 'next/router';

import useModal from 'hooks/useModal';
import AuthModal from 'components/AuthModal/Modal';
import { useHomeContext } from 'context/home';
import Button from 'components/Button';
import { useUserContext } from 'context/user';

export default function Home() {
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

    return (
        <Fragment>
            <header>
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
            </main>

            <AuthModal
                open={authModal.active}
                onClose={authModal.onClose}
            />
        </Fragment>
    );
}
