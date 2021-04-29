import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import Modal from 'components/Modal';
import LoginForm from 'components/AuthModal/LoginForm';
import RegisterForm from 'components/AuthModal/RegisterForm';
import { useHomeContext } from 'context/home';

AuthModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

function AuthModal({ open, onClose }) {
    const { authForm } = useHomeContext();

    return (
        <Modal
            open={open}
            onClose={onClose}
            className='fade auth-modal'
        >
            {authForm ? <LoginForm/> : <RegisterForm/>}
        </Modal>
    );
}

export default dynamic(() => Promise.resolve(AuthModal), {
    ssr: false
});