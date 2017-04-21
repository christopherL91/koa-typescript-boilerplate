"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa = require("koa");
const http = require("http");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const cors = require("kcors");
const public_1 = require("./routers/public");
exports.default = (config) => {
    const app = new koa();
    const open = public_1.default(config);
    app.use(bodyParser());
    app.use(cors());
    app.use(helmet());
    app.use(open.routes());
    app.use(open.allowedMethods());
    return http.createServer(app.callback());
};
