import { Context } from 'koa';
import { IServices } from './services';
export default class BaseController {
  ctx: Context;
  services: IServices;
}