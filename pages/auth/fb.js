import FormData from 'form-data';

import Values from 'classes/Values';
import Fetch from 'classes/Fetch';
import Utils from 'classes/Utils';

export default function FacebookAuth() {
    return <p>Ошибка!</p>;
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
        const json = await fetch.request(true);

        return Values.serverRedirect(`/personal/instapages/create/constructor?login=${json.login}`);
    } catch(err) {
        console.error(err);

        return Values.emptyProps;
    }
}