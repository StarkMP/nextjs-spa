import Link from 'next/link';
import { useLocalizer } from 'reactjs-localizer';
import { Fragment } from 'react';

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
                    <h4>{localize('Websites example')}:</h4>
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
