import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import 'styles/app.scss';

App.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object
};

function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default App;
