import Koa from 'koa';
import path from 'path';
import router from './router';
const staticKoa = require('koa-static');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());
app.use(staticKoa(path.join(process.cwd(), 'static/swagger')))
app.use(staticKoa(path.join(process.cwd(), 'dist/__tmp__')))
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
