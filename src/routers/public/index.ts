import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';

import * as joi from 'joi';
import * as validate from 'koa-joi';

import * as schemas from './schemas';

import Config from '../../interfaces/config';

export default (config: Config): Router => {
    const router = new Router();
    
    /**
     * Login route
     */
    router.post('/login', schemas.login, async ctx => {
        const {username, password} = ctx.request.body;
        const payload = {msg: 'Hello from public router'};
        const token = jwt.sign(payload, config.keys.private, {
            algorithm: 'RS256',
            expiresIn: '1 days',
        });
        ctx.body = {token};
    });

    /**
     * Health check route
     */
    router.get('/healthz', async ctx => {
        ctx.body = {status: 'OK', git: config.git};
    });

    return router;
};