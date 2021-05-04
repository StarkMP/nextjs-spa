import Router from 'next/router';
import Cookie from 'js-cookie';

import Fetch from 'classes/Fetch';

export default class UserAccess {
    static login(formData) {
        return new Fetch('/api/v1/oauth2/token', {
            method: 'POST',
            body: formData
        });
    }

    static register(formData) {
        return new Fetch('/api/v1/registrations', {
            method: 'POST',
            body: formData
        });
    }

    static logout() {
        Router.push('/');
        UserAccess.clear();
    }

    static check() {
        return !!Cookie.get('access_token');
    }

    static get() {
        return {
            access_token: Cookie.get('access_token'),
            refresh_token: Cookie.get('refresh_token')
        };
    }

    static set(data) {
        Cookie.set('access_token', data.access_token, { expires: data.expires_in });
        Cookie.set('refresh_token', data.refresh_token);
    }

    static clear() {
        Cookie.remove('access_token');
        Cookie.remove('refresh_token');
    }
}