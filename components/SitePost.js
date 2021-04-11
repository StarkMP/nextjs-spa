import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import Utils from 'classes/Utils';
import Modal from 'components/Modal';

SitePost.propTypes = {
    post: PropTypes.object.isRequired
};

export default function SitePost({ post }) {
    const [activeModal, setActiveModal] = useState(false);

    const formattedPrice = useMemo(() => Utils.formatMoney(post.price), [post.price]);

    const closeModal = useCallback(() => setActiveModal(false), []);
    const openModal = () => setActiveModal(true);

    return (
        <div className='site-post' onClick={openModal}>
            <div className='site-post__inner' style={{ backgroundImage: `url(${post.img})` }}>
                <div className='site-post__info'>
                    <div className='site-post__title'>{post.title}</div>
                    <div className='site-post__price'>{formattedPrice}</div>
                </div>
            </div>

            <Modal
                open={activeModal}
                onClose={closeModal}
                className='fade site-post__modal'
                dialogClassName='modal-fullscreen-lg-down'
            >
                <div className='site-post__img' style={{ backgroundImage: `url(${post.img})` }}></div>
                <div className='site-post__card'>
                    <div className='site-post__card-title'>{post.title}</div>
                    <div className='site-post__card-price'>{formattedPrice}</div>
                    <button  className='btn site-post__card-btn btn-primary'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='bi bi-pencil-fill' viewBox='0 0 16 16'>
                            <path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z'/>
                        </svg>
                        Написать продавцу
                    </button>
                    <div className='site-post__card-description'>
                        <h6>Информация о товаре:</h6>
                        <p>{post.description}</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}