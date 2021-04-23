import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Fetch from 'classes/Fetch';
import NotFound from 'pages/404';
import Utils from 'classes/Utils';

Confirm.propTypes = {
    confirmationCode: PropTypes.string,
    confirmed: PropTypes.bool.isRequired,
    resend: PropTypes.bool.isRequired
};

export default function Confirm({ confirmationCode, confirmed, resend }) {
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!confirmationCode) {
            return;
        }

        try {
            const { email } = Utils.client.parseJWT(confirmationCode);

            setEmail(email);
        } catch (err) {
            return;
        }
    }, [confirmationCode]);

    if (!confirmationCode) {
        return <NotFound/>;
    }

    if (!email) {
        return <NotFound/>;
    }

    if (resend) {
        return <div>Нужно переотправить письмо на {email}</div>;
    }

    if (!confirmed) {
        return <NotFound/>;
    }

    return (
        <div>Email {email} успешно подтвержден</div>
    );
}

export async function getServerSideProps({ query }) {
    const confirmationCode = query.confirmationCode;
    const empty = {
        props: {
            confirmed: false,
            resend: false
        }
    };

    if (!confirmationCode) {
        return empty;
    }

    const fetch = new Fetch('/api/v1/registrations/confirm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ confirmationCode })
    });

    try {
        await fetch.request();

        return {
            props: {
                confirmationCode,
                confirmed: true,
                resend: false
            }
        };
    } catch(err) {
        if (err.message === '422') {
            return {
                props: {
                    confirmationCode,
                    confirmed: false,
                    resend: true
                }
            };
        }

        return empty;
    }
}