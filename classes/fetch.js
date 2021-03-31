export default class Fetch {
    constructor(url, params = {}) {
        this.url = process.env.API_URL + url;
        this.params = params;
    }

    request() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(this.url, this.params);
                const json = await response.json();

                resolve({ response, json });
            } catch(error) {
                reject({ error });
            }
        });
    }
}