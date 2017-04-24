import * as Router from 'koa-router';
import * as jwt from 'koa-jwt';
import * as compose from 'koa-compose';

import Users from './users';

import Config from '../../interfaces/config';

export default (config: Config): Router => {
    const rootRouter = new Router({prefix: '/api'});
    rootRouter.use(jwt({secret: config.keys.public}));

    // Add nested routers here.
    [
        Users(config),
    ].forEach(router => {
        rootRouter.use(router.routes());
        rootRouter.use(router.allowedMethods());
    });
    return rootRouter;
};