import dynamic from 'next/dynamic';

import PersonalLayout from 'layouts/PersonalLayout';
import Utils from 'classes/Utils';

function Personal() { // todo
    return (
        <PersonalLayout>
            xz
        </PersonalLayout>
    );
}

export async function getServerSideProps({ req }) {
    const cookie = Utils.formatCookie(req.headers.cookie);

    if (!cookie.access_token) {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            }
        };
    }

    return { props: {} };
}

export default dynamic(() => Promise.resolve(Personal), {
    ssr: false
});