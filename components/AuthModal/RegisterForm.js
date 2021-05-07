import { useLocalizer } from 'reactjs-localizer';
import { useState } from 'react';

import useButton from 'hooks/useButton';
import useInput from 'hooks/useInput';
import Button from 'components/Button';
import UserAccess from 'classes/UserAccess';
import { useHomeContext } from 'context/home';

export default function RegisterForm() {
    const [confirmation, setConfirmation] = useState(false);
    const [resended, setResended] = useState(false);
    const { localize } = useLocalizer();
    const email = useInput('');
    const password = useInput('');
    const { loading, setLoading } = useButton();
    const confirmationButton = useButton();
    const { setAuthForm } = useHomeContext();

    const toggleForm = () => {
        if (loading) {
            return;
        }

        setAuthForm(true);
    };

    const request = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (loading) {
            return;
        }

        const form = e.currentTarget;

        form.classList.add('was-validated');

        if (!form.checkValidity()) {
            return;
        }

        setLoading(true);

        try {
            await UserAccess.register(new FormData(form)).request();

            setLoading(false);
            setConfirmation(true);
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    };

    const resendConfirmation = async () => {
        if (!confirmation || confirmationButton.loading) {
            return;
        }

        try {
            confirmationButton.setLoading(true);

            await UserAccess.resendConfirmation(email.value).request();

            confirmationButton.setLoading(false);

            setResended(true);
        } catch(err) {
            console.error(err);
        }
    };

    if (confirmation) {
        return (
            <div className='d-flex align-items-center flex-column'>
                <svg xmlns='http://www.w3.org/2000/svg' height='50' width='50' fill='currentColor' className='mb-3 bi bi-envelope' viewBox='0 0 16 16'>
                    <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z'/>
                </svg>
                <p className='mb-1 fs-5'>Подтвердите почту</p>
                <p className='mb-3 fs-6'>{email.value}</p>
                {resended ? 'Письмо отправлено' : <Button loader={confirmationButton.loading} className='btn-link' onClick={resendConfirmation}>Отправить письмо повторно</Button>}
            </div>
        );
    }

    return (
        <form onSubmit={request} className='needs-validation' noValidate>
            <h4 className='mb-4'>{localize('Sign up')}</h4>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>{localize('Email')}</label>
                <input onChange={email.onChange} type='email' className='form-control' name='email' value={email.value} required/>
            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='form-label'>{localize('Password')}</label>
                <input onChange={password.onChange} type='password' className='form-control' name='password' value={password.value} required/>
            </div>
            <div className='d-flex align-items-center'>
                <Button
                    type='submit'
                    className='btn-success'
                    loader={loading}
                >
                    {localize('Sign up')}
                </Button>

                <p onClick={() => toggleForm(true)} className='mb-0 link-primary'>{localize('Have account? Sign in')}</p>
            </div>
        </form>
    );
}