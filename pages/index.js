import Link from 'next/link';
import { Fragment, useCallback, useState } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import AuthModal from 'components/AuthModal';

export default function Landing() {
    const [authModal, setAuthModal] = useState({ open: false, type: false });

    const { localize } = useLocalizer();

    const closeAuthModal = useCallback(() => setAuthModal(prev => ({ ...prev, open: false })), []);
    const openAuthModal = (type) => setAuthModal({ open: true, type });
    const setAuthModalType = useCallback((type) => setAuthModal(prev => ({ ...prev, type })), []);

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
                open={authModal.open}
                login={authModal.type}
                onClose={closeAuthModal}
                onSetType={setAuthModalType}
            />
        </Fragment>
    );
}
