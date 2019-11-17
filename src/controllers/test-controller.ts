import TestReq from './req/test-req';
import TestDto from './dto/test-dto';
import { d } from '@nxapi/nxapi';
import { BaseController } from '../../packages/core/src';
@d.controller.path('/v1')
export default class TestController extends BaseController {
  @d.function.description('ddddddd')
  @d.function.get('/helloa')
  public ggg(req: TestReq): number[] {

    return [3];
  }
  @d.function.post('post')
  public hhh(req: TestReq): TestDto {
    return new TestDto();
  }
}
