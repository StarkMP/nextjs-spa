import React from 'react';

import Card from './Card';
import feature_poster from '../images/features_poster.png';

export default function Pricing() {
    const cards = [
        {
            id: 0,
            title: 'Базовый',
            description: 'Идеально подходит для личных сайтов',
            price: 0,
            features: [
                'Трафик 3 ГБ',
                'Хранилище 1 ГБ',
                'Подключение вашего домена',
                'Дизайнерские шаблоны',
                'Защита SSL',
                'SEO учтено',
                'Умные ИИ инструменты',
            ],
        },
        {
            id: 1,
            title: 'Премиум',
            description: 'Для бизнеса',
            price: 250,
            features: [
                'Безлимитный трафик',
                'Безлимитное хранилище',
                'Подключение вашего домена',
                'Дизайнерские шаблоны',
                'Защита SSL',
                'SEO учтено',
                'Умные ИИ инструменты',
                'Бесплатный домен на 1 год',
                'Мощные дополнения',
            ],
        },
    ];

    return (
        <div className='home-pricing__row'>
            <div className='home-pricing__poster '>
                <div className='home-pricing__poster-content'>
                    <h2 className='home-pricing__poster-logo'>BOXIS</h2>
                    <h3 className='home-pricing__poster-title'>
                        Простой способ создать сайт
                    </h3>
                    <p className='home-pricing__poster-subtitle'>
                        Отлично подходит для людей без навыков дизайна или
                        кодирования
                    </p>
                </div>
                <img
                    className='home-pricing__poster-image'
                    alt='Poster'
                    src={feature_poster}
                />
            </div>
            {cards.map((data) => {
                return <Card data={data} key={data.id} />;
            })}
        </div>
    );
}
