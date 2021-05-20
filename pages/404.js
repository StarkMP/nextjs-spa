import { useLocalizer } from 'reactjs-localizer';
import { Typography } from '@material-ui/core';

export default function NotFound() {
    const { localize } = useLocalizer();

    return <Typography className='notfound' component='h1' variant='h4'>{localize('404 - Page not found')}</Typography>;
}