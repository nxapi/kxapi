import Koa from 'koa';
import router from './router';
// import joiValidate from './joi';
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());
// app.use(joiValidate());
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
