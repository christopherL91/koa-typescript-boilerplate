import * as Router from 'koa-router';
import * as jwt from 'koa-jwt';

import * as schemas from './schemas';

import Config from '../../interfaces/config';

export default (config: Config): Router => {
    const router = new Router({prefix: '/users'});

    /**
     * Get users route
     */
    router.get('/', async ctx => {
        ctx.body = {msg: 'Users'};
    });

    /**
     * Create users route
     */
    router.post('/', schemas.users, async ctx => {
        const {id} = ctx.request.body;
    });

    return router;
};