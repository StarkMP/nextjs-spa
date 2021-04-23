import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocalizer } from 'reactjs-localizer';
import dynamic from 'next/dynamic';

import Fetch from 'classes/Fetch';
import UserAccess from 'classes/UserAccess';
import Button from 'components/Button';
import useButton from 'hooks/useButton';
import useInput from 'hooks/useInput';
import Modal from 'components/Modal';

AuthModal.propTypes = {
    open: PropTypes.bool.isRequired,
    login: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSetType: PropTypes.func.isRequired
};

function AuthModal({ open, login, onClose, onSetType }) {
    // false - registration
    // true - login
    const [type, setType] = useState(login);

    const { localize } = useLocalizer();
    const { loading, setLoading } = useButton();
    const emailInput = useInput('');
    const passwordInput = useInput('');

    useEffect(() => setType(login), [login]);

    const handleRequest = async () => {
        let fetch;

        if (type) {
            const formData = new FormData();

            formData.append('grant_type', 'password');
            formData.append('username', emailInput.value);
            formData.append('password', passwordInput.value);

            fetch = new Fetch('/api/v1/oauth2/token', {
                method: 'POST',
                body: formData
            });

            setLoading(true);

            try {
                const response = await fetch.request(true);
                setLoading(false);

                UserAccess.set(response.json);
                console.log('Вы успешно залогинены', response.json);
            } catch (err) {
                setLoading(false);
                console.error(err);
            }
        } else {
            fetch = new Fetch('/api/v1/registrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput.value,
                    password: passwordInput.value
                })
            });

            setLoading(true);

            try {
                await fetch.request();
                setLoading(false);

                console.log('Подтвердите почту');
            } catch (err) {
                setLoading(false);
                console.error(err);
            }
        }
    };

    const handleSetType = (type) => {
        if (loading) {
            return;
        }

        onSetType(type);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            className='fade auth-modal'
        >
            {type ? (
                <form>
                    <h4 className='mb-4'>{localize('Sign in')}</h4>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>{localize('Email')}</label>
                        <input onChange={emailInput.onChange} type='email' className='form-control' id='email' value={emailInput.value}/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='form-label'>{localize('Password')}</label>
                        <input onChange={passwordInput.onChange} type='password' className='form-control' id='password' value={passwordInput.value}/>
                    </div>
                    <div className='d-flex align-items-center'>
                        <Button
                            onClick={handleRequest}
                            className='btn-success'
                            loader={loading}
                        >
                            {localize('Sign in')}
                        </Button>

                        <p onClick={() => handleSetType(false)} className='mb-0 link-primary'>Нет аккаунта? Зарегистрироваться</p>
                    </div>
                </form>
            ) : (
                <form>
                    <h4 className='mb-4'>{localize('Sign up')}</h4>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>{localize('Email')}</label>
                        <input onChange={emailInput.onChange} type='email' className='form-control' id='email' placeholder='name@example.com' value={emailInput.value}/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='form-label'>{localize('Password')}</label>
                        <input onChange={passwordInput.onChange} type='password' className='form-control' id='password' value={passwordInput.value}/>
                    </div>
                    <div className='d-flex align-items-center'>
                        <Button
                            onClick={handleRequest}
                            className='btn-success'
                            loader={loading}
                        >
                            {localize('Sign up')}
                        </Button>

                        <p onClick={() => handleSetType(true)} className='mb-0 link-primary'>Есть аккаунт? Войти</p>
                    </div>
                </form>
            )}
        </Modal>
    );
}

export default dynamic(() => Promise.resolve(AuthModal), {
    ssr: false
});