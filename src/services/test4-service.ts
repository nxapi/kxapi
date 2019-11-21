import { BaseService } from '@nxapi/kxapi';

export default class Test3Service extends BaseService {
  public test() {
    console.log(this.ctx);
  }
}
