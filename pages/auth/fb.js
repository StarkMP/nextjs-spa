import FormData from 'form-data';
import Link from 'next/link';

import Values from 'classes/Values';
import Fetch from 'classes/Fetch';
import Utils from 'classes/Utils';

export default function FacebookConfirm() {
    return (
        <div className='confirm confirm_error'>
            <svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' fill='currentColor' className='mb-5 bi bi-x-circle' viewBox='0 0 16 16'>
                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>
                <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/>
            </svg>
            <p className='fs-5'>Что-то пошло не так!</p>
            <Link href='/personal/instapages/create'><a>Попробуйте ещё раз</a></Link>
        </div>
    );
}

export async function getServerSideProps({ query, req }) {
    const cookie = Utils.formatCookie(req.headers.cookie);
    const code = query.code;

    if (!code) {
        return Values.serverRedirect('/404');
    }
    
    const formData = new FormData();
    formData.append('code', code);

    const fetch = new Fetch('/api/v1/oauth2/fb', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + cookie.access_token
        },
        body: formData
    });

    try {
        const { json } = await fetch.request(true);

        return Values.serverRedirect(`/personal/instapages/create/constructor?login=${json.login}`);
    } catch(err) {
        return Values.emptyProps;
    }
}