import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import AuthModal from 'components/AuthModal';
import useModal from 'hooks/useModal';

export default function Landing() {
    const [authType, setAuthType] = useState(false);

    const { localize } = useLocalizer();
    const authModal = useModal();

    const openAuthModal = (type) => {
        setAuthType(type);
        authModal.setActive(true);
    };

    return (
        <Fragment>
            <header>
                <button onClick={() => openAuthModal(true)}>{localize('Sign in')}</button>
                <button onClick={() => openAuthModal(false)}>{localize('Sign up')}</button>
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
                login={authType}
                onClose={authModal.onClose}
                onSetType={setAuthType}
            />
        </Fragment>
    );
}
