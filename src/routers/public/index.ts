import * as Router from 'koa-router';

import Config from '../../interfaces/config';

import Common from './common';
import Login from './login';

export default (config: Config): Router => {
    const rootRouter = new Router();

    [
        Login(config),
        Common(config)
    ].forEach(router => {
        rootRouter.use(router.routes());
        rootRouter.use(router.allowedMethods());
    });
    return rootRouter;
};