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

    const handleRequest = async () => {
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
        <form className='needs-validation'>
            <h4 className='mb-4'>{localize('Sign up')}</h4>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>{localize('Email')}</label>
                <input onChange={email.onChange} type='email' className='form-control' id='email' placeholder='name@example.com' value={email.value}/>
            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='form-label'>{localize('Password')}</label>
                <input onChange={password.onChange} type='password' className='form-control' id='password' value={password.value}/>
            </div>
            <div className='d-flex align-items-center'>
                <Button
                    onClick={handleRequest}
                    className='btn-success'
                    loader={loading}
                >
                    {localize('Sign up')}
                </Button>

                <p onClick={() => toggleForm(true)} className='mb-0 link-primary'>Есть аккаунт? Войти</p>
            </div>
        </form>
    );
}