import Router from 'next/router';

import Fetch from 'classes/Fetch';

export default class UserAccess {
    static storageKey = 'user_access_data';

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

    static get() {
        return localStorage.getItem(UserAccess.storageKey);
    }

    static set(data) {
        localStorage.setItem(UserAccess.storageKey, JSON.stringify(data));
    }

    static clear() {
        localStorage.removeItem(UserAccess.storageKey);
    }
}