import { d } from '@nxapi/nxapi';

export default class TestDto {
  @d.number.max(1)
  @d.number.description('ddd')
  tt: number;
}
