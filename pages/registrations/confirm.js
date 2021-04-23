import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import dynamic from 'next/dynamic';

import Fetch from 'classes/Fetch';
import NotFound from 'pages/404';

Confirm.propTypes = {
    email: PropTypes.string,
    confirmed: PropTypes.bool.isRequired,
    resend: PropTypes.bool.isRequired
};

function Confirm({ email, confirmed, resend }) {
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

export async function getServerSideProps({ query, res }) {
    const confirmationCode = query.confirmationCode;
    const empty = {
        props: {
            confirmed: false,
            resend: false
        }
    };

    if (!confirmationCode) {
        res.statusCode = 404;
        return empty;
    }

    const decoded = jwt.decode(confirmationCode);

    if (!decoded) {
        res.statusCode = 404;
        return empty;
    }

    const email = decoded.email;

    if (!email) {
        res.statusCode = 404;
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
                email,
                confirmed: true,
                resend: false
            }
        };
    } catch(err) {
        if (err.message === '422') {
            return {
                props: {
                    email,
                    confirmed: false,
                    resend: true
                }
            };
        }

        res.statusCode = 404;
        return empty;
    }
}

export default dynamic(() => Promise.resolve(Confirm), {
    ssr: false
});