import NotFound from 'pages/404';
import SiteLayout from 'layouts/SiteLayout';
import Fetch from 'classes/Fetch';

export default function Site(props) {
    if (!Object.keys(props).length) {
        return <NotFound/>;
    }

    return (
        <SiteLayout
            details={props.details}
            posts={props.posts}
        />
    );
}

// export async function getServerSideProps({ query, req}) {
//     return SSR.Props({

//     });
// }

export async function getServerSideProps({ query, req }) {
    const url = `/api/v1/websites/${query.id}`;
    const details = new Fetch(`${url}/details`);
    const posts = new Fetch(`${url}/posts`);

    try {
        const res = await Promise.all([
            details.request(),
            posts.request()
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
