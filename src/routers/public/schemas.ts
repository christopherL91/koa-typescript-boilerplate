import * as joi from 'joi'
import * as validate from 'koa-joi';
import * as koa from 'koa';
import * as convert from 'koa-convert';

/**
 * Login validation middleware
 */
export const login: koa.Middleware = convert(validate({
    body: joi.object().required().keys({
		username: joi.string().required(),
        password: joi.string().required(),
	}),
}));