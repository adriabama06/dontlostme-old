const mysql = require('mysql');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');

module.exports = class {
    /**
     * @param {number} checkinterval Set check interval in Seconds
     */
    constructor(checkinterval = 120) {
        this.connection = mysql.createConnection({
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database,
            //connectTimeout: 2,
        });
        this.connection.connect();

        /**
         * @type {Map<string, {
         * user: string,
         * pass: string,
         * }>}
         */
        this.map = new Map();

        this.reload();

        this.checkinterval = setInterval(async () => {
            await this.reload();
        }, (checkinterval*1000));
    }

    /**
     * @returns {{user: string, pass: string}}
     * @param {string} user
     */
    get(user) {
        return this.map.get(user);
    }

    /**
     * @returns {boolean}
     * @param {string} user
     */
    has(user) {
        return this.map.has(user);
    }

    /**
     * @returns {Promise<void>}
     */
    async reload() {
        return new Promise(async (r) => {
            const data = await this.query(`SELECT * FROM ${config.mysql.database}.${config.mysql.table}`);
            if(data[0]) {
                this.map.clear();
                for(const i of data) {
                    this.map.set(i.user, { user: i.user, pass: i.pass });
                    if(!fs.existsSync(path.join(__dirname, 'files', i.user))) {
                        fs.mkdirSync(path.join(__dirname, 'files', i.user));
                    }
                };
            };
            r();
        });
    }

    /**
     * @returns {Promise<{user: string, pass: string}>}
     * @param {string} sql
     */
    async query(sql) {
        return new Promise(async (resolve, reject) => {
            this.connection.query(sql, async (error, results, fields) => {
                if(error) console.log(error);
                resolve(results);
            });
        });
    }
}