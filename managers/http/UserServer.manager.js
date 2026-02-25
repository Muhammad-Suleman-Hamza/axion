const cors = require('cors');
const http = require('http');
const express = require('express');

const app = express();
module.exports = class UserServer {
    constructor({ config, managers, mwsRepo }) {
        this.config = config;
        this.mwsRepo = mwsRepo;
        this.userApi = managers.userApi;
    }

    /** for injecting middlewares */
    use(args) {
        app.use(args);
    }

    /** server configs */
    run() {
        app.use(express.json());
        app.use(cors({ origin: '*' }));
        app.use('/static', express.static('public'));
        app.use(express.urlencoded({ extended: true }));

        /** an error handler */
        app.use((err, req, res, next) => {
            console.error(err.stack)
            res.status(500).send('Something broke!')
        });
        app.use(this.mwsRepo.__longToken)

        /** a single middleware to handle all */
        app.all('/api/:moduleName/:fnName', this.userApi.mw);

        let server = http.createServer(app);
        server.listen(this.config.dotEnv.USER_PORT, () => {
            console.log(`${(this.config.dotEnv.SERVICE_NAME).toUpperCase()} is running on port: ${this.config.dotEnv.USER_PORT}`);
        });
    }
}