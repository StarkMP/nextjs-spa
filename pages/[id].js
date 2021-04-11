import NotFound from 'pages/404';
import SiteLayout from 'layouts/SiteLayout';
import Fetch from 'classes/Fetch';
import PropTypes from 'prop-types';

Site.propTypes = {
    details: PropTypes.object,
    posts: PropTypes.array
};

export default function Site({ details, posts }) {
    if (!details) {
        return <NotFound/>;
    }

    return (
        <SiteLayout
            details={details}
            posts={posts}
        />
    );
}

// export async function getServerSideProps({ query }) {
//     const url = `/api/v1/websites/${query.id}`;

//     return SSR.getServerSideProps({
//         details: `${url}/details`,
//         posts: `${url}/posts`
//     });
// }

export async function getServerSideProps({ query }) {
    const url = `/api/v1/websites/${query.id}`;
    const details = new Fetch(`${url}/details`);
    const posts = new Fetch(`${url}/posts`);

    try {
        const res = await Promise.all([
            details.request(true),
            posts.request(true)
        ]);

        return {
            props: {
                details: res[0].json,
                posts: res[1].json
            }
        };
    } catch {
        return {
            props: {}
        };
    }
}
