export default class Fetch {
    constructor(url, params = {}) {
        this.url = process.env.API_URL + url;
        this.params = params;
    }

    request(toJSON) {
        return new Promise((resolve, reject) => {
            fetch(this.url, this.params)
                .then(response => {
                    if (response.ok) {
                        if (toJSON) {
                            response.json()
                                .then(json => resolve({ response, json }))
                                .catch(err => reject(err));
                        } else {
                            resolve({ response });
                        }
                    } else {
                        response.json()
                            .then(json => reject({ ...json, status: response.status }))
                            .catch(() => reject(response));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}