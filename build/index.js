"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const { PORT = 8080, BIND = '0.0.0.0', } = process.env;
const server = server_1.default({});
server.listen({ port: PORT, host: BIND }, () => {
    const { address, port } = server.address();
    console.log(`[Koa-typescript] is listening to ${address}:${port}`);
});
