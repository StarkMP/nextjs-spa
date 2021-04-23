export default class UserAccess {
    static storageKey = 'user_access_data';

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