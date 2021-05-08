import PropTypes from 'prop-types';

import SiteLayout from 'layouts/SiteLayout';
import Fetch from 'classes/Fetch';
import Values from 'classes/Values';

Site.propTypes = {
    details: PropTypes.object,
    posts: PropTypes.array
};

export default function Site({ details, posts }) {
    return (
        <SiteLayout
            details={details}
            posts={posts}
        />
    );
}

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
        return Values.serverRedirect('/404');
    }
}
