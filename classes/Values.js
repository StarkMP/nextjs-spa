export default class Values {
    static projectName = 'Boxis.io';
    
    static emptyProps = { props: {} };

    static url = process.env.API_URL;

    static serverRedirect = (destination, permanent = false) => ({
        redirect: {
            destination,
            permanent
        }
    });
}