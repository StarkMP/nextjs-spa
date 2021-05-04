import dynamic from 'next/dynamic';

import PersonalLayout from 'layouts/PersonalLayout';

function Personal() { // todo
    return (
        <PersonalLayout>
            xz
        </PersonalLayout>
    );
}

export async function getServerSideProps() {
    return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    };
}

export default dynamic(() => Promise.resolve(Personal), {
    ssr: false
});