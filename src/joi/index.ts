import { Context } from 'koa';

export default () => async (ctx: Context, next: any) => {
  console.log('ddd', ctx);
  await next();
};
