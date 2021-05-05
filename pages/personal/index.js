import dynamic from 'next/dynamic';

import PersonalLayout from 'layouts/PersonalLayout';
import authMiddleware from 'middleware/auth';
import Values from 'classes/Values';

function Personal() {
    return (
        <PersonalLayout>
            xz
        </PersonalLayout>
    );
}

export async function getServerSideProps({ req, res }) {
    await authMiddleware({ req, res, location: '/' });

    return Values.emptyProps;
}

export default dynamic(() => Promise.resolve(Personal), {
    ssr: false
});