import { useLocalizer } from 'reactjs-localizer';
import Router from 'next/router';

import useButton from 'hooks/useButton';
import useInput from 'hooks/useInput';
import Button from 'components/Button';
import UserAccess from 'classes/UserAccess';
import { useHomeContext } from 'context/home';
import { useUserContext } from 'context/user';

export default function LoginForm() {
    const { localize } = useLocalizer();
    const email = useInput('');
    const password = useInput('');
    const { loading, setLoading } = useButton();
    const { setAuthForm } = useHomeContext();
    const { login } = useUserContext();

    const toggleForm = () => {
        if (loading) {
            return;
        }

        setAuthForm(false);
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
            const response = await UserAccess.login(new FormData(form)).request(true);
            setLoading(false);

            login(response.json);
            Router.push('/personal');
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    };

    return (
        <form onSubmit={request} className='needs-validation' noValidate>
            <h4 className='mb-4'>{localize('Sign in')}</h4>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>{localize('Email')}</label>
                <input onChange={email.onChange} type='email' className='form-control' name='username' value={email.value} required/>
            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='form-label'>{localize('Password')}</label>
                <input onChange={password.onChange} type='password' className='form-control' name='password' value={password.value} required/>
            </div>
            <input type='text' className='d-none' name='grant_type' defaultValue='password'/>
            <div className='d-flex align-items-center'>
                <Button
                    type='submit'
                    className='btn-success'
                    loader={loading}
                >
                    {localize('Sign in')}
                </Button>

                <p onClick={() => toggleForm(false)} className='mb-0 link-primary'>{localize('Don\'t have account? Sign up')}</p>
            </div>
        </form>
    );
}