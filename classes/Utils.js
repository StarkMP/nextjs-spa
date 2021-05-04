export default class Utils {
    static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static divideArray(array, divide) {
        const copy = array.slice();

        return new Array(Math.ceil(copy.length / divide))
            .fill()
            .map(() => copy.splice(0, divide));
    }

    static formatMoney(n) {
        const formatter = Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        });

        return formatter.format(n);
    }

    static formatCookie(cookie) {
        if (!cookie) {
            return {};
        }

        return Object.fromEntries(cookie.split('; ').map(x => x.split(/=(.*)$/,2).map(decodeURIComponent)));
    }
}