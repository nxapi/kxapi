import TestService from '../services/test-service';
import Test2Service from '../services/test2-service';
import Test3Service from '../services/test3-service';
import Test4Service from '../services/test4-service';

declare module '@nxapi/kxapi' {
  export interface IService {
    testService: TestService;
    test2Service: Test2Service;
    test3Service: Test3Service;
    test4Service: Test4Service;

  }
}