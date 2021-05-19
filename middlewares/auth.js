import FormData from 'form-data';

import Utils from 'classes/Utils';
import UserAccess from 'classes/UserAccess';

export default function authMiddleware({ req, res }) {
    const cookie = Utils.formatCookie(req.headers.cookie);

    if (!cookie.access_token && !cookie.refresh_token) {
        return Promise.resolve(false);
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
                        `refresh_token=${json.refresh_token}; path=/; max-age=${365 * 86400}`,
                        `access_token=${json.access_token}; path=/; max-age=${json.expires_in}`
                    ]);

                    resolve(true);
                })
                .catch(() => {
                    res.setHeader('Set-Cookie', 'refresh_token=0; path=/; max-age=0;');

                    resolve(false);
                });
        });
    }

    return Promise.resolve(true);
}