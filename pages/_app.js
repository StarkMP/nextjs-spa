import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BootstrapModal from 'classes/BootstrapModal';
import 'styles/app.scss';

function App({ Component, pageProps }) {
    useEffect(() => {
        BootstrapModal.init(document.getElementById('modal-overlay'));

        return () => {
            console.log(123)
            BootstrapModal.destroy();
        };
    }, []);

    return <Component {...pageProps} />
}

export default App;
