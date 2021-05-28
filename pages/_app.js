import PropTypes from 'prop-types';
import { Localizer, LocaleProvider } from 'reactjs-localizer';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { UserProvider } from 'context/user';
import locales from 'locales.json';
import 'styles/app.scss';
import { Fragment } from 'react';
import Head from 'next/head';

Localizer.defaultLanguage = 'ru';
Localizer.mount(locales);

App.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object
};

function App({ Component, pageProps }) {
    return (
        <Fragment>
            <Head>
                <title>Boxis.io</title>
            </Head>
            <UserProvider>
                <LocaleProvider>
                    <Component {...pageProps} />
                </LocaleProvider>
            </UserProvider>
        </Fragment>
    );
}

export default App;
