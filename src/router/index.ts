import Router from 'koa-router';
import Application from 'koa';
const bodyParser = require('koa-body');

export default (app: Application) => {
  app.use(bodyParser({ multipart: true }));
  const router = new Router();
  // router.get('ddd', (ctx: contex))
  require('../__tmp__/routes')(router);
  app.use(router.routes());
};
