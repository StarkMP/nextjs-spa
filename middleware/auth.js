import FormData from 'form-data';

import Utils from 'classes/Utils';
import UserAccess from 'classes/UserAccess';

export default function authMiddleware({ req, res, location }) {
    const cookie = Utils.formatCookie(req.headers.cookie);

    if (!cookie.access_token && !cookie.refresh_token) {
        res.writeHead(302, { Location: location }).end();

        return Promise.resolve();
    }

    if (!cookie.access_token && cookie.refresh_token) {
        const formData = new FormData();

        formData.append('refresh_token', cookie.refresh_token);
        formData.append('grant_type', 'refreshtoken');

        return new Promise(resolve => {
            UserAccess.login(formData).request(true)
                .then(response => {
                    const { json } = response;

                    res.setHeader('Set-Cookie', [
                        `refresh_token=${json.refresh_token}`,
                        `access_token=${json.access_token}; max-age=${json.expires_in}`
                    ]);

                    resolve(json);
                })
                .catch(error => {
                    res.setHeader('Set-Cookie', 'refresh_token=0; max-age=0;');
                    res.writeHead(302, { Location: location }).end();

                    resolve(error);
                });
        });
    }

    return Promise.resolve();
}