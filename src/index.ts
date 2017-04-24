import Server from './server';
import * as emoji from 'node-emoji';
import * as fs from 'fs';
import * as path from 'path';
import * as git from 'git-rev-sync';

(function bootstrap() {
    const CURRENT_PATH = process.cwd();
    const NAME = 'koa-typescript-server';
    const {
        PORT = 8080,
        LISTEN = '0.0.0.0',
        PRIVATE_KEY_PATH = path.resolve(CURRENT_PATH, './keys/private.pem'),
        PUBLIC_KEY_PATH = path.resolve(CURRENT_PATH, './keys/public.pem'),
    } = process.env;

    const server = Server({
        keys: {
            private: fs.readFileSync(PRIVATE_KEY_PATH),
            public: fs.readFileSync(PUBLIC_KEY_PATH),
        },
        git: {
            branch: git.branch(CURRENT_PATH),
            long: git.long(CURRENT_PATH),
        }
    });

    server.listen({port: PORT, host: LISTEN}, () => {
        const {address, port} = server.address();
        const msg = emoji.emojify(`[${NAME}] is listening to ${address}:${port} :rocket:`);
        console.error(msg);
    });
})();