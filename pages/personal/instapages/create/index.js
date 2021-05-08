import { useMemo } from 'react';

import Values from 'classes/Values';
import authMiddleware from 'middlewares/auth';

export default function Create() {
    const instagramURL = useMemo(() =>
        'https://www.instagram.com/oauth/authorize?client_id=288092762863872&redirect_uri=https://boxis.io/auth/fb&scope=user_profile,user_media&response_type=code'
    , []);

    return (
        <a className='btn btn-success' href={instagramURL}>Авторизуйтесь через Instagram</a>
    );
}

export async function getServerSideProps({ req, res }) {
    const auth = await authMiddleware({ req, res });

    if (!auth) {
        return Values.serverRedirect('/');
    }

    return Values.emptyProps;
}