import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { useUserContext } from 'context/user';

export default function Card({ data }) {
    const { user } = useUserContext();

    const isFree = useMemo(
        () => (data.price <= 0 ? true : false),
        [data.price]
    );

    const createSite = () => {
        if (!user) {
            return;
        }

        Router.push('/personal/instapages/create');
    };

    return (
        <div className='home-pricing__card'>
            <div className='home-pricing__card-wrapper'>
                <div className='home-pricing__content-wrapper'>
                    <h3 className='home-pricing__card-logo'>{data.title}</h3>
                    <p className='home-pricing__card-description'>
                        {data.description}
                    </p>
                    <h4 className='home-pricing__card-price'>
                        {isFree ? (
                            'Бесплатно'
                        ) : (
                            <Fragment>
                                {data.price}
                                <span className='home-pricing__card-rub'>₽</span>
                                <span className='home-pricing__card-mounth'>
                                    /мес
                                </span>
                            </Fragment>
                        )}
                    </h4>
                    <ul className='home-pricing__card-features-row'>
                        {data.features.map((param, index) => {
                            return (
                                <li className='home-pricing__feature' key={index}>
                                    {param}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <button onClick={createSite} className='home-pricing__card-button'>Выбрать</button>
            </div>
        </div>
    );
}

Card.propTypes = {
    data: PropTypes.object.isRequired,
};
