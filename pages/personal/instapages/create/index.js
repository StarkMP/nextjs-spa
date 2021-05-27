import { useMemo } from 'react';
import dynamic from 'next/dynamic';

import Values from 'classes/Values';
import authMiddleware from 'middlewares/auth';

function Create() {
    const instagramURL = useMemo(() =>
        'https://www.instagram.com/oauth/authorize?client_id=288092762863872&redirect_uri=https://boxis.io/auth/fb&scope=user_profile,user_media&response_type=code'
    , []);

    return (
        <div className='absolute-center'>
            <a className='btn btn-success' href={instagramURL}>Авторизуйтесь через Instagram</a>
        </div>
    );
}

export async function getServerSideProps({ req, res }) {
    const auth = await authMiddleware({ req, res });

    if (!auth) {
        return Values.serverRedirect('/');
    }

    return Values.emptyProps;
}

export default dynamic(() => Promise.resolve(Create), {
    ssr: false
});