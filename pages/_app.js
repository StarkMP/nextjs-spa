import PropTypes from 'prop-types';
import { Localizer, LocaleProvider } from 'reactjs-localizer';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'slick-carousel';

import locales from 'locales.json';
import 'styles/app.scss';

Localizer.mount(locales);
Localizer.defaultLanguage = 'ru';

App.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object
};

function App({ Component, pageProps }) {
    return (
        <LocaleProvider>
            <Component {...pageProps} />
        </LocaleProvider>
    );
}

export default App;
