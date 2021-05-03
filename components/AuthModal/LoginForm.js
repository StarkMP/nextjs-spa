import { useLocalizer } from 'reactjs-localizer';

import useButton from 'hooks/useButton';
import useInput from 'hooks/useInput';
import Button from 'components/Button';
import UserAccess from 'classes/UserAccess';
import { useHomeContext } from 'context/home';

export default function LoginForm() {
    const { localize } = useLocalizer();
    const email = useInput('');
    const password = useInput('');
    const { loading, setLoading } = useButton();
    const { setAuthForm } = useHomeContext();

    const toggleForm = () => {
        if (loading) {
            return;
        }

        setAuthForm(false);
    };

    const handleRequest = async (e) => {
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

        const formData = new FormData();

        formData.append('grant_type', 'password');
        formData.append('username', email.value);
        formData.append('password', password.value);

        const fetch = UserAccess.login(formData);

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
    };

    return (
        <form onSubmit={handleRequest} className='needs-validation' noValidate>
            <h4 className='mb-4'>{localize('Sign in')}</h4>
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
                    {localize('Sign in')}
                </Button>

                <p onClick={() => toggleForm(false)} className='mb-0 link-primary'>{localize('Don\'t have account? Sign up')}</p>
            </div>
        </form>
    );
}