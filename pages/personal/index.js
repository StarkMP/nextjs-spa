import dynamic from 'next/dynamic';

import PersonalLayout from 'layouts/PersonalLayout';
import authMiddleware from 'middleware/auth';

function Personal() { // todo
    return (
        <PersonalLayout>
            xz
        </PersonalLayout>
    );
}

export async function getServerSideProps({ req, res }) {
    await authMiddleware({ req, res, location: '/' });

    return { props: {} };
}

export default dynamic(() => Promise.resolve(Personal), {
    ssr: false
});