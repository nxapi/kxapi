import TestReq from './req/test-req';
import TestDto from './dto/test-dto';
import BaseController from './base-controller';
import { d } from '@nxapi/nxapi';

@d.controller.path('/v1')
export default class TestController extends BaseController {
  @d.function.description('ddd')
  @d.function.get('/hello')
  public ggg(req: TestReq): number[] {
    return [3];
  }
  @d.function.post('post')
  public hhh(req: TestReq): TestDto {
    return new TestDto();
  }
}
