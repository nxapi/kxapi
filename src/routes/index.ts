import Router from 'koa-router';

export default () => {
  const router = new Router();
  require('../__tmp__/routes')(router);
  return router;
};
