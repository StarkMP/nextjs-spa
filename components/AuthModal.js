import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import Modal from 'components/Modal';

AuthModal.propTypes = {
    open: PropTypes.bool.isRequired,
    login: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSetType: PropTypes.func.isRequired
};

export default function AuthModal({ open, login, onClose, onSetType }) {
    // false - registration
    // true - login
    const [type, setType] = useState(login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { localize } = useLocalizer();

    useEffect(() => setType(login), [login]);

    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

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
                        <input onChange={onChangeEmail} type='email' className='form-control' id='email' value={email}/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='form-label'>{localize('Password')}</label>
                        <input onChange={onChangePassword} type='password' className='form-control' id='password' value={password}/>
                    </div>
                    <div className='d-flex align-items-center'>
                        <button type='button' className='btn btn-success'>{localize('Sign in')}</button>
                        <p onClick={() => onSetType(false)} className='mb-0 link-primary'>Нет аккаунта? Зарегистрироваться</p>
                    </div>
                </form>
            ) : (
                <form>
                    <h4 className='mb-4'>{localize('Sign up')}</h4>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>{localize('Email')}</label>
                        <input onChange={onChangeEmail} type='email' className='form-control' id='email' placeholder='name@example.com' value={email}/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='form-label'>{localize('Password')}</label>
                        <input onChange={onChangePassword} type='password' className='form-control' id='password' value={password}/>
                    </div>
                    <div className='d-flex align-items-center'>
                        <button type='button' className='btn btn-success'>{localize('Sign up')}</button>
                        <p onClick={() => onSetType(true)} className='mb-0 link-primary'>Есть аккаунт? Войти</p>
                    </div>
                </form>
            )}
        </Modal>
    );
}