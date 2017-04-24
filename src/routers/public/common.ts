import * as Router from 'koa-router';

import Config from '../../interfaces/config';

export default (config: Config): Router => {
    const router = new Router();

    /**
     * Health check route
     */
    router.get('/healthz', async ctx => {
        ctx.body = {status: 'OK'};
    });

    /**
     * Version route
     */
    router.get('/version', async ctx => {
        ctx.body = {git: config.git};
    });

    return router;
};