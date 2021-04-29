import { HomeProvider } from 'context/home';
import Home from 'components/Home';

export default function Main() {
    return (
        <HomeProvider>
            <Home/>
        </HomeProvider>
    );
}
