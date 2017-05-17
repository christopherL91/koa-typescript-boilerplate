import * as Router from 'koa-router';
import * as jwt from 'koa-jwt';

import Config from '../../interfaces/config';

import Users from './users';

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