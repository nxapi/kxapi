# kxapi

kxapi 是一个 api 框架，底层基于 koa。它重新定义了一套 api 的写法。市面上主流的 api 框架有 hapi、egg，在接口定义上都有些缺点，没有牛 x 框架 springboot 使用的流畅。kxapi 在接口定义方面很像 springboot，所以我们有理由相信这样的方式是正确的。

## 通过骨架快速初始化

```bash
npm init @nxapi/kxapi
cd kxapi
npm i
npm run watch-ts
```

最后，用 vscode 的调试（debug）模式启动项目

swagger 访问地址：http://domain:port/swagger

## 集成到已有 koa typescript 工程

> 安装

```bash
npm i @nxapi/kxapi -S
```

> 配置

在根目录配置 .kxapirc.js 文件，内容如下：

```js
module.exports = {
  rootDir: 'src', //根目录
  outputDir: '__tmp__', //输出目录
  ctrlDir: 'controllers', //需要转DSL目录
  serviceDir: 'services', //service层目录
  plugins: ['@nxapi/nxapi-dsl-koa', '@nxapi/nxapi-dsl-joi', '@nxapi/nxapi-dsl-swagger-json'], //根据DSL生成对应代码
};
```

> 执行

```bash
kxapi build|watch
```

## 如何定义接口

直接上代码，很常规的函数定义，对于装饰器不多解释，查查手册

```js
// controllers/req/test-req.ts
export class TestReq {
  @d.string.required()
  @d.string.max(10)
  @d.string.allow('v1', 'v2')
  @d.string.error(() => '错误描述')
  test: string;
}
// controllers/base-response.ts
export default class BaseResponse<T> {
  code: string;
  msg: string;
  data: T;
}
// controllers/dto/test-dto.ts
export default class TestDto {
  @d.string.required()
  test: string;
}
// controllers/hello-controller.ts
import { d } from '@nxapi/nxapi';
import { TestReq } from './req/test-req';
import TestDto from './req/test-dto';
import { BaseController } from '@nxapi/kxapi';

//类必须继承 BaseController
@d.controller.path('/v1')
export default class HelloController extends BaseController {
  @d.function.get('/hello')
  @d.function.description('接口描述')
  public hello(req: TestReq): BaseResponse<TestDto> {
    return 'hello';
  }
}
```

这样一个常规的接口就完成了。[更多请查看](https://github.com/nxapi/nxapi/blob/master/README.md)

## service 定义

```js
import { BaseService } from '@nxapi/kxapi';

//类必须继承 BaseService
export default class TestService extends BaseService {
  public test() {}
}
```

## 内置变量

- controller 和 service 中都内置了 ctx、service
