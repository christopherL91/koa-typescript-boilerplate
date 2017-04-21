import * as Router from 'koa-router';
import * as jwt from 'koa-jwt';
import * as compose from 'koa-compose';

import Users from './users';

import Config from '../../interfaces/config';

export default (config: Config): Router => {
    const router = new Router({prefix: '/api'});
    router.use(jwt({secret: config.keys.public})); // Secure all the routers
    
    const users = Users(config);
    router.use(compose([users.routes, users.allowedMethods()])); // Attach users router
    return router;
};