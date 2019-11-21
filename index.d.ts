import { Context as KoaContext } from 'koa';
import { BaseController as CBaseController, BaseService as CBaseService } from './dist';

declare module '@nxapi/kxapi' {
  export const BaseController: typeof CBaseController;
  export const BaseService: typeof CBaseService;

  export interface IService {}
  export interface Context extends KoaContext {}
}
