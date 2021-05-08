import PropTypes from 'prop-types';

import Values from 'classes/Values';
// import Fetch from 'classes/Fetch';

Constructor.propTypes = {
    account: PropTypes.object.isRequired
};

export default function Constructor({ account }) {
    return (
        <div>{account}</div>
    );
}

export async function getServerSideProps({ query }) {
    const login = query.login;

    if (!login) {
        return Values.serverRedirect('/404');
    }

    return {
        props: {
            account: { name: 'todo' }
        }
    };
}