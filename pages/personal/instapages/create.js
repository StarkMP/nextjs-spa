import Button from 'components/Button';
import Values from 'classes/Values';
import authMiddleware from 'middlewares/auth';

export default function Create() {
    return (
        <Button className='btn-success'>Авторизуйтесь через Instagram</Button>
    );
}

export async function getServerSideProps({ req, res }) {
    await authMiddleware({ req, res, location: '/' });

    return Values.emptyProps;
}