import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as cors from 'kcors';
import * as compose from 'koa-compose';
import * as responsetime from 'koa-response-time';
import * as conditional from 'koa-conditional-get';
import * as etag from 'koa-etag';

import Public from './routers/public';
import Private from './routers/private';

import Config from './interfaces/config';

import * as koa from 'koa';

const error_handler = (): koa.Middleware => async (ctx, next) => {
    try {
        // Before request
        await next();
        // After request
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {error: error.message};
        ctx.app.emit('error', error, ctx);
    }
};

export default (config: Config) => {
    const open = Public(config);
    const closed = Private(config);
    return compose([
        responsetime(),
        error_handler(),
        cors({credentials: true}),
        conditional(),
        etag(),
        helmet(),
        bodyParser(),
        compose([open.routes(), open.allowedMethods()]),
        compose([closed.routes(), closed.allowedMethods()]),
    ]);
};