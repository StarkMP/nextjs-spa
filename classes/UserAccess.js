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
        UserAccess.clear();
        Router.push('/');
    }

    static check() {
        return !!Cookie.get('access_token');
    }

    static get() {
        if (!UserAccess.check()) {
            return null;
        }

        return {
            access_token: Cookie.get('access_token'),
            refresh_token: Cookie.get('refresh_token')
        };
    }

    static set(data) {
        const expires = new Date();
        expires.setSeconds(expires.getSeconds() + data.expires_in);

        Cookie.set('access_token', data.access_token, { expires });
        Cookie.set('refresh_token', data.refresh_token);
    }

    static clear() {
        Cookie.remove('access_token');
        Cookie.remove('refresh_token');
    }
}