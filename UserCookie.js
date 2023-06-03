module.exports = class {
    constructor() {
        /**
         * @type {Map<string, {user: string, pass: string}>}
         */
        this.map = new Map();
    }

    /**
     * @returns {void}
     * @param {string} id
     * @param {{user: string, pass: string}} data
     */
    set(id, data) {
        this.map.set(id, data);
        return;
    }

    /**
     * @returns {{user: string, pass: string}}
     * @param {string} id
     */
    get(id) {
        return this.map.get(id);
    }

    /**
     * @returns {boolean}
     * @param {string} id
     */
    has(id) {
        return this.map.has(id);
    }

    /**
     * @returns {{user: string, pass: string}}
     * @param {string} id
     */
    delete(id) {
        const toretrun = this.map.get(id);
        this.map.delete(id);
        return toretrun;
    }
}