import dynamic from 'next/dynamic';

import PersonalLayout from 'layouts/PersonalLayout';
import authMiddleware from 'middlewares/auth';
import Values from 'classes/Values';

function Personal() {
    return (
        <PersonalLayout>
            Some personal content
        </PersonalLayout>
    );
}

export async function getServerSideProps({ req, res }) {
    const auth = await authMiddleware({ req, res });

    if (!auth) {
        return Values.serverRedirect('/');
    }

    return Values.emptyProps;
}

export default dynamic(() => Promise.resolve(Personal), {
    ssr: false
});