import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Container, Typography } from '@material-ui/core';
import { Fragment, useMemo, useState } from 'react';
import Router from 'next/router';

import Values from 'classes/Values';
import Button from 'components/Button';
import Fetch from 'classes/Fetch';
import Utils from 'classes/Utils';
import { useUserContext } from 'context/user';
import useButton from 'hooks/useButton';

Constructor.propTypes = {
    account: PropTypes.object.isRequired
};

function Constructor({ account }) {
    const [activePosts, setActivePosts] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contacts, setContacts] = useState({ vkontakte: '', telegram: '' });
    // const [keywords, setKeywords] = useState('');

    const { loading, setLoading } = useButton();
    const { user } = useUserContext();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (loading) {
            return;
        }

        const form = e.currentTarget;

        form.classList.add('was-validated');

        if (!form.checkValidity()) {
            return;
        }

        const formData = new FormData(form);

        const data = {
            title,
            description,
            posts: formatPosts(activePosts),
        };

        Object.keys(contacts).forEach(k => {
            if (contacts[k]) {
                data[k] = contacts[k];
            }
        });

        const postInfo = new Fetch(`/api/v1/instapages/constructor/${account.login}`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + user.access_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const imagesFormData = new FormData();
        imagesFormData.append('background', formData.get('background'));
        imagesFormData.append('favicon', formData.get('favicon'));

        const postImages = new Fetch(`/api/v1/instapages/constructor/${account.login}/images`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + user.access_token,
            },
            body: imagesFormData
        });

        setLoading(true);

        try {
            await Promise.all([
                postInfo.request(),
                postImages.request()
            ]);

            setLoading(false);
            Router.push(`/${account.login}`);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const formatPosts = (posts) => {
        return posts.map(post => {
            return {
                id: post.id,
                title: post.title,
                price: Number(post.price),
                description: post.description,
                timestamp: post.timestamp,

                // temp constant currency
                currency: 'RUB'
            };
        });
    };

    const findPostIndexById = (id) => {
        return activePosts.findIndex(post => id === post.id);
    };

    const onChangePostValue = (id, key, value) => {
        const index = findPostIndexById(id);

        // price validation
        if (key === 'price') {
            if (isNaN(Number(value))) {
                return;
            }
        } 

        setActivePosts(prev => {
            const copy = prev.slice();

            copy[index][key] = value;

            return copy;
        });
    };

    const selectPost = (e, post) => {
        if (e.currentTarget.checked) {
            const formattedPost = { ...post, title: '', price: '' };

            setActivePosts(prev => prev.concat([formattedPost]));
        } else {
            setActivePosts(prev => {
                const copy = prev.slice();
                copy.splice(findPostIndexById(post.id), 1);

                return copy;
            });
        }
    };

    const onChangeContact = (key, value) => {
        const regexp = /[^a-zA-Z0-9_.]/g;

        if (regexp.test(value)) {
            return;
        }

        setContacts(prev => {
            return { ...prev, [key]: value };
        });
    };

    const posts = useMemo(() => {
        return account.posts.map(post => {
            return (
                <div key={post.id} className='constructor__post'>
                    <div className='constructor__post-image' style={{ backgroundImage: `url(${post.mediaUrl})` }}></div>
                    <input onChange={(e) => selectPost(e, post)} className='form-check-input' type='checkbox' defaultValue=''/>
                </div>
            );
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account.posts]);

    const formattingPosts = useMemo(() => {
        return activePosts.map(post => {
            return (
                <div key={post.id} className='card mb-3 w-100'>
                    <div className='row g-0'>
                        <div className='col-md-4 d-flex align-items-center'>
                            <img className='w-100' src={post.mediaUrl} alt='Post image'/>
                        </div>
                        <div className='col-md-8'>
                            <div className='card-body d-flex flex-column h-100 justify-content-between'>
                                <input required onChange={(e) => onChangePostValue(post.id, 'title', e.currentTarget.value)} type='text' className='mb-2 form-control' value={post.title} placeholder='Название'/>
                                <div className='input-group mb-2'>
                                    <input required onChange={(e) => onChangePostValue(post.id, 'price', e.currentTarget.value)} type='text' className='form-control' value={post.price} placeholder='Цена'/>
                                    <span className='input-group-text'>₽</span>
                                </div>
                                <textarea required onChange={(e) => onChangePostValue(post.id, 'description', e.currentTarget.value)} rows='4' className='form-control' value={post.description} placeholder='Описание' style={{ resize: 'none' }}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePosts]);

    return (
        <Container className='constructor' maxWidth='sm'>
            <Typography component='h1' variant='h4'>Конструктор сайта</Typography>
            <div className='constructor__inner'>
                <form onSubmit={onSubmit}  className='needs-validation' noValidate>
                    <Typography className='constructor__title' component='h2' variant='h5'>Основные настройки</Typography>

                    <div className='mb-3'>
                        <label className='form-label'>Название</label>
                        <input required type='text' className='form-control' name='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Описание</label>
                        <textarea required className='form-control' name='description' rows='3' value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Фоновое изображение</label>
                        <input required accept='.jpg,.jpeg,.png'  className='form-control' type='file' name='background'/>
                    </div>

                    <div className='mb-4'>
                        <label className='form-label'>Favicon</label>
                        <input required accept='.jpg,.jpeg,.png,.ico' className='form-control' type='file' name='favicon'/>
                    </div>

                    <Typography component='h2' variant='h5' className='mb-4 mt-5'>Контакты</Typography>

                    <div className='input-group mb-3'>
                        <span className='input-group-text'>ВКонтакте</span>
                        <input placeholder='ID страницы' type='text' className='form-control' name='vkontakte' value={contacts.vkontakte} onChange={(e) => onChangeContact('vkontakte', e.currentTarget.value)}/>
                    </div>

                    <div className='input-group'>
                        <span className='input-group-text'>Telegram</span>
                        <input placeholder='ID пользователя' type='text' className='form-control' name='telegram' value={contacts.telegram} onChange={(e) => onChangeContact('telegram', e.currentTarget.value)}/>
                    </div>

                    {/* <div className='accordion'>
                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='adv-settings-head'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#adv-settings' aria-expanded='true' aria-controls='main-settings'>
                                    Расширенные настройки
                                </button>
                            </h2>
                            <div id='adv-settings' className='accordion-collapse collapse' aria-labelledby='adv-settings-head'>
                                <div className='accordion-body'>
                                    <div className='mb-3'>
                                        <label className='form-label'>Ключевые слова</label>
                                        <input type='text' className='form-control' name='keywords' value={keywords} onChange={(e) => setKeywords(e.currentTarget.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <Typography component='h2' variant='h5' className='mb-4 mt-5'>Выберите посты</Typography>

                    <div className='mb-4 constructor__posts'>{posts}</div>
                    
                    {formattingPosts.length ? (
                        <Fragment>
                            <Typography component='h2' variant='h5' className='mb-4'>Настройка постов</Typography>
                            <div className='d-flex flex-column constructor__posts-settings'>{formattingPosts}</div>
                        </Fragment>
                    ) : null}

                    <Button loader={loading} type='submit' className='btn-success mt-3'>Создать</Button>
                </form>
            </div>
        </Container>
    );
}

export async function getServerSideProps({ query, req }) {
    const login = query.login;

    if (!login) {
        return Values.serverRedirect('/');
    }

    const cookie = Utils.formatCookie(req.headers.cookie);

    const fetchPosts = new Fetch(`/api/v1/instapages/constructor/${login}/media`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + cookie.access_token
        },
    });

    try {
        const { json } = await fetchPosts.request(true);

        return {
            props: {
                account: {
                    login,
                    posts: json
                }
            }
        };
    } catch(err) {
        console.error(err);

        return Values.serverRedirect('/');
    }
}

export default dynamic(() => Promise.resolve(Constructor), {
    ssr: false
});