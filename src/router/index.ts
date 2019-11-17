import Router from 'koa-router';

export default () => {
  const router = new Router();
  // router.get('ddd', (ctx: contex))
  require('../__tmp__/routes')(router);
  return router;
};
