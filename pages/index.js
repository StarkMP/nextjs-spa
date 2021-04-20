import MainLayout from 'layouts/MainLayout';
import Link from 'next/link';

export default function Home() {
    return (
        <MainLayout>
            <section>
                <h4>Примеры сайтов:</h4>
                <ul>
                    <li>
                        <Link href='/[id]' as={'/coffeehouse'}><a>Кофе-хаус</a></Link>
                    </li>
                </ul>
            </section>
        </MainLayout>
    );
}
