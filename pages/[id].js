import PropTypes from 'prop-types';

import SiteLayout from 'layouts/SiteLayout';
import Fetch from 'classes/Fetch';
import Values from 'classes/Values';

Site.propTypes = {
    details: PropTypes.object,
};

export default function Site({ details }) {
    return <SiteLayout details={details}/>;
}

export async function getServerSideProps({ query }) {
    const fetch = new Fetch(`/api/v1/instapages/${query.id}`);

    try {
        const { json } = await fetch.request(true);

        return {
            props: {
                details: json,
            }
        };
    } catch(err) {
        console.error(err);

        return Values.serverRedirect('/404');
    }
}
