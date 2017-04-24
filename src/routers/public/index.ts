import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';

import * as joi from 'joi';
import * as validate from 'koa-joi';

import * as schemas from './schemas';

import Config from '../../interfaces/config';

import Common from './common';
import Login from './login';

export default (config: Config): Router => {
    const router = new Router();

    [
        Login(config),
        Common(config)
    ].forEach(r => {
        router.use(r.routes());
        router.use(r.allowedMethods());
    });

    return router;
};