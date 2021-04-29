import Fetch from 'classes/Fetch';

export default class UserAccess {
    static storageKey = 'user_access_data';

    static login(formData) {
        return new Fetch('/api/v1/oauth2/token', {
            method: 'POST',
            body: formData
        });
    }

    static register(data) {
        return new Fetch('/api/v1/registrations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    static logout() {
        UserAccess.clear();
    }

    static get() {
        return localStorage.getItem(UserAccess.storageKey);
    }

    static set(data) {
        localStorage.setItem(UserAccess.storageKey, JSON.stringify(data));
    }

    static clear() {
        localStorage.setItem(UserAccess.storageKey, JSON.stringify({}));
    }
}