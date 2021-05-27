import { memo } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

const CreditsModal = memo(({ credits, open, onClose }) => {
    const { instagram, vkontakte, telegram } = credits;

    return (
        <Modal className='fade' open={open} onClose={onClose} contentClassName='credits-modal'>
            <h5 className='mb-4'>Контакты</h5>
            <div className='credits-modal__inner'>
                {instagram ? (
                    <div className='credits-modal__block credits-modal__block-instagram'>
                        <svg height='40' width='40' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <linearGradient id='SVGID_1_' gradientTransform='matrix(0 -1.982 -1.844 0 -132.522 -51.077)' gradientUnits='userSpaceOnUse' x1='-37.106' x2='-26.555' y1='-72.705' y2='-84.047'>
                                <stop offset='0' stopColor='#fd5'/>
                                <stop offset='.5' stopColor='#ff543e'/>
                                <stop offset='1' stopColor='#c837ab'/>
                            </linearGradient>
                            <path d='m1.5 1.633c-1.886 1.959-1.5 4.04-1.5 10.362 0 5.25-.916 10.513 3.878 11.752 1.497.385 14.761.385 16.256-.002 1.996-.515 3.62-2.134 3.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41 1.633z' fill='url(#SVGID_1_)'/>
                            <path d='m11.998 3.139c-3.631 0-7.079-.323-8.396 3.057-.544 1.396-.465 3.209-.465 5.805 0 2.278-.073 4.419.465 5.804 1.314 3.382 4.79 3.058 8.394 3.058 3.477 0 7.062.362 8.395-3.058.545-1.41.465-3.196.465-5.804 0-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794 1.597c7.574-.012 8.538-.854 8.006 10.843-.189 4.137-3.339 3.683-7.211 3.683-7.06 0-7.263-.202-7.263-7.265 0-7.145.56-7.257 6.468-7.263zm5.524 1.471c-.587 0-1.063.476-1.063 1.063s.476 1.063 1.063 1.063 1.063-.476 1.063-1.063-.476-1.063-1.063-1.063zm-4.73 1.243c-2.513 0-4.55 2.038-4.55 4.551s2.037 4.55 4.55 4.55 4.549-2.037 4.549-4.55-2.036-4.551-4.549-4.551zm0 1.597c3.905 0 3.91 5.908 0 5.908-3.904 0-3.91-5.908 0-5.908z' fill='#fff'/>
                        </svg>
                        <a target='_blank' rel='noreferrer' href={`https://instagram.com/${instagram}`}>Связаться</a>
                    </div>
                ) : null}
                {vkontakte ? (
                    <div className='credits-modal__block credits-modal__block-vkontakte'>
                        <svg fill='white' height='45' width='45' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path d='m19.915 13.028c-.388-.49-.277-.708 0-1.146.005-.005 3.208-4.431 3.538-5.932l.002-.001c.164-.547 0-.949-.793-.949h-2.624c-.668 0-.976.345-1.141.731 0 0-1.336 3.198-3.226 5.271-.61.599-.892.791-1.225.791-.164 0-.419-.192-.419-.739v-5.105c0-.656-.187-.949-.74-.949h-4.126c-.419 0-.668.306-.668.591 0 .622.945.765 1.043 2.515v3.797c0 .832-.151.985-.486.985-.892 0-3.057-3.211-4.34-6.886-.259-.713-.512-1.001-1.185-1.001h-2.625c-.749 0-.9.345-.9.731 0 .682.892 4.073 4.148 8.553 2.17 3.058 5.226 4.715 8.006 4.715 1.671 0 1.875-.368 1.875-1.001 0-2.922-.151-3.198.686-3.198.388 0 1.056.192 2.616 1.667 1.783 1.749 2.076 2.532 3.074 2.532h2.624c.748 0 1.127-.368.909-1.094-.499-1.527-3.871-4.668-4.023-4.878z'/>
                        </svg>
                        <a target='_blank' rel='noreferrer' href={`https://vk.me/${vkontakte}`}>Связаться</a>
                    </div>
                ) : null}
                {telegram ? (
                    <div className='credits-modal__block credits-modal__block-telegram'>
                        <svg height='38' width='38' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                            <path fill='#EBF0FA' d='M135.876,280.962L10.105,225.93c-14.174-6.197-13.215-26.621,1.481-31.456L489.845,36.811
      c12.512-4.121,24.705,7.049,21.691,19.881l-95.571,406.351c-2.854,12.14-17.442,17.091-27.09,9.19l-112.3-91.887L135.876,280.962z'
                            />
                            <path fill='#BEC3D2' d='M396.465,124.56L135.876,280.962l31.885,147.899c2.86,13.269,18.5,19.117,29.364,10.981
      l79.451-59.497l-65.372-53.499l193.495-191.693C410.372,129.532,403.314,120.449,396.465,124.56z'/>
                            <path fill='#AFB4C8' d='M178.275,441.894c5.858,2.648,13.037,2.302,18.85-2.052l79.451-59.497l-32.686-26.749l-32.686-26.749
      L178.275,441.894z'/>
                        </svg>
                        <a target='_blank' rel='noreferrer' href={`https://t.me/${telegram}`}>Связаться</a>
                    </div>
                ) : null}
            </div>
        </Modal>
    );
});

CreditsModal.propTypes = {
    credits: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default dynamic(() => Promise.resolve(CreditsModal), {
    ssr: false
});