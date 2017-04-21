import * as koa from 'koa';
import * as http from'http';
import middlewares from './middlewares';

import Config from './interfaces/config';

export default (config: Config): http.Server => {
    const app = new koa();
    app.use(middlewares(config));
    return http.createServer(app.callback());
};