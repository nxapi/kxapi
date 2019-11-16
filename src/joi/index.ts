import { Context } from 'koa';
import hashcode from '../utils/hash';
const joiConf = require('../__tmp__/joi');

export default () => async (ctx: Context, next: any) => {
  console.log('ddd', ctx);
  const code = hashcode(ctx.method.toLowerCase() + ctx.path);
  const schemaReq = joiConf[code].request;
  if (ctx.method === 'GET') {
    await validate(ctx.body, joiConf[code].request);
  } else if (ctx.method === 'POST') {
    schemaReq.validate(ctx.request['body']);
  }
  console.log();
  await next();
  await validate(ctx.body, joiConf[code].response);
  console.log(ctx.body);
};

const validate = async (data: any, schema: any) => {
  try {
    await schema.validate(data);
  } catch (e) {
    console.log(e);
  }
};
