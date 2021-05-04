import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Fetch from 'classes/Fetch';
import Button from 'components/Button';

Confirm.propTypes = {
    email: PropTypes.string,
    resend: PropTypes.bool.isRequired
};

function Confirm({ email, resend }) {
    if (resend) {
        const resend = () => {};

        return (
            <div className='email-confirm email-confirm_error'>
                <svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' fill='currentColor' className='mb-5 bi bi-x-circle' viewBox='0 0 16 16'>
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>
                    <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/>
                </svg>
                <p className='fs-5'>Не удалось подтвердить <b>{email}</b></p>
                <Button onClick={resend} className='btn-link'>Отправить письмо ещё раз</Button>
            </div>
        );
    }

    return (
        <div className='email-confirm'>
            <svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' className='mb-5 bi bi-check2-circle' viewBox='0 0 16 16'>
                <path d='M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z'/>
                <path d='M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z'/>
            </svg>
            <p className='fs-5'><b>{email}</b> успешно подтвержден</p>
            <Link href='/'><a>На главную</a></Link>
        </div>
    );
}

export async function getServerSideProps({ query }) {
    const confirmationCode = query.confirmationCode;
    const redirect = {
        redirect: {
            destination: '/404',
            permanent: false,
        }
    };

    if (!confirmationCode) {
        return redirect;
    }

    const decoded = jwt.decode(confirmationCode);

    if (!decoded) {
        return redirect;
    }

    const email = decoded.email;

    if (!email) {
        return redirect;
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
        if (err.status === 422) {
            return {
                props: {
                    email,
                    confirmed: false,
                    resend: true
                }
            };
        }

        return redirect;
    }
}

export default dynamic(() => Promise.resolve(Confirm), {
    ssr: false
});