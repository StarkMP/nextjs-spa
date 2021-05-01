import { useLocalizer } from 'reactjs-localizer';

import useButton from 'hooks/useButton';
import useInput from 'hooks/useInput';
import Button from 'components/Button';
import UserAccess from 'classes/UserAccess';
import { useHomeContext } from 'context/home';

export default function RegisterForm() {
    const { localize } = useLocalizer();
    const email = useInput('');
    const password = useInput('');
    const { loading, setLoading } = useButton();
    const { setAuthForm } = useHomeContext();

    const toggleForm = () => {
        if (loading) {
            return;
        }

        setAuthForm(true);
    };

    const handleRequest = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;

        form.classList.add('was-validated');

        if (!form.checkValidity()) {
            return;
        }

        if (loading) {
            return;
        }

        const fetch = UserAccess.register({
            email: email.value,
            password: password.value
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
    };

    return (
        <form onSubmit={handleRequest} className='needs-validation' noValidate>
            <h4 className='mb-4'>{localize('Sign up')}</h4>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>{localize('Email')}</label>
                <input onChange={email.onChange} type='email' className='form-control' id='email' value={email.value} required/>
            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='form-label'>{localize('Password')}</label>
                <input onChange={password.onChange} type='password' className='form-control' id='password' value={password.value} required/>
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