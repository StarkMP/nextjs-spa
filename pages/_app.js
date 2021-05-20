import PropTypes from 'prop-types';
import { Localizer, LocaleProvider } from 'reactjs-localizer';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { UserProvider } from 'context/user';
import locales from 'locales.json';
import 'styles/app.scss';

Localizer.defaultLanguage = 'ru';
Localizer.mount(locales);

App.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object
};

function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <LocaleProvider>
                <Component {...pageProps} />
            </LocaleProvider>
        </UserProvider>
    );
}

export default App;
