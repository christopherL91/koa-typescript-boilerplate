import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';
import * as schemas from './schemas';
import * as scrypt from 'scrypt';
import * as httpStatusCodes from 'http-status-codes';

import Config from '../../interfaces/config';

export default (config: Config): Router => {
    const router = new Router();

    /**
     * Login route
    */
    router.post('/login', schemas.login, async ctx => {
        const {username, password} = ctx.request.body;
        const scryptParameters = scrypt.paramsSync(0.1);
        const kdfResult = scrypt.kdfSync('password-from-db', scryptParameters); // Fetch password from some database
        const result: Boolean = await scrypt.verifyKdf(kdfResult, password);
        if (!result) {
            return ctx.throw(httpStatusCodes.FORBIDDEN, {status: 'Authentication failure'});
        }
        const payload = {msg: 'public information can be stored here'};
        const token = jwt.sign(payload, config.keys.private, {
            algorithm: 'RS256',
            expiresIn: '1 days',
        });
        ctx.body = {token};
    });

    /**
     * Create user route
    */
    router.post('/users', schemas.user, async ctx => {
        const {username, password, information} = ctx.request.body;
    });
    return router;
};