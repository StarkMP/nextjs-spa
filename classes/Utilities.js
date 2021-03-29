export default class Utilities {
    static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static divideArray(array, divide) {
        return new Array(Math.ceil(array.length / divide))
            .fill()
            .map(_ => array.splice(0, divide));
    }
}