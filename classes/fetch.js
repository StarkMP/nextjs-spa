export default class Fetch {
    constructor(url, params = {}) {
        this.url = process.env.API_URL + url;
        this.params = params;
    }

    request() {
        return new Promise((resolve, reject) => {
            fetch(this.url, this.params).then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }

                response.json().then(json => {
                    resolve({ response, json });
                });
            }).catch(error => {
                reject({ error });
            });
        });
    }
}