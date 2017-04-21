import * as joi from 'joi'
import * as validate from 'koa-joi';
import * as koa from 'koa';
import * as convert from 'koa-convert';

/**
 * Users validation middleware
 */
export const users: koa.Middleware = convert(validate({}));