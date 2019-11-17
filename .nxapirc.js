const nxapiDslToKoa = require('@nxapi/nxapi-dsl-koa').default;
const nxapiDslToJoi = require('@nxapi/nxapi-dsl-joi').default;

module.exports = {
  relativeCtrlPath: 'src/controllers',
  relativeOutputPath: 'src/__tmp__',
  plugins: [nxapiDslToJoi, nxapiDslToKoa]
};