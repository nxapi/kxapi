import { d } from '@nxapi/nxapi';
import HelloReq from './hello-req';

export default class TestReq {
  @d.array.description('ddda')
  @d.array.required()
  arr: HelloReq[];

  @d.object.required()
  hello: HelloReq;

  @d.number.max(1)
  @d.number.description('ddd')
  @d.number.example(1)
  tt: number;
  mmm: string;
  @d.bool.example(true)
  b: boolean;
}
