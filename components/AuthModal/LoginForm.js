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

    const handleRequest = async () => {
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
        <form className='needs-validation'>
            <h4 className='mb-4'>{localize('Sign in')}</h4>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>{localize('Email')}</label>
                <input onChange={email.onChange} type='email' className='form-control' id='email' value={email.value}/>
                <div className='invalid-feedback'>Введите email</div>
            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='form-label'>{localize('Password')}</label>
                <input onChange={password.onChange} type='password' className='form-control' id='password' value={password.value}/>
                <div className='invalid-feedback'>Введите пароль</div>
            </div>
            <div className='d-flex align-items-center'>
                <Button
                    onClick={handleRequest}
                    className='btn-success'
                    loader={loading}
                >
                    {localize('Sign in')}
                </Button>

                <p onClick={() => toggleForm(false)} className='mb-0 link-primary'>Нет аккаунта? Зарегистрироваться</p>
            </div>
        </form>
    );
}