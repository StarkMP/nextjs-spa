export default class Values {
    static projectName = 'Boxis.io';
    
    static emptyProps = { props: {} };

    static serverRedirect = (destination, permanent = false) => ({
        redirect: {
            destination,
            permanent
        }
    });
}