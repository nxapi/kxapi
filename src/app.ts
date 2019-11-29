import Koa from 'koa';
import router from './router';
const kxapiSwaggerUi = require('@nxapi/kxapi-swagger-ui');
// const bodyParser = require('koa-bodyparser');
const bodyParser = require('koa-better-body');
const app = new Koa();
kxapiSwaggerUi(app);
app.use(bodyParser());
app.use(router().routes());

// app.use(async ctx => {
//   console.log(ctx);
//   ctx.body = 'Hello World';
// });

app.listen(3000);

console.log('app listen 3000');
// import { IService, BaseService } from '@nxapi/kxapi';
// const rr: IService = new IService();
// rr.mm = 2;
