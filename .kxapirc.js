module.exports = {
  rootDir: 'src',
  outputDir: '__tmp__',
  ctrlDir: 'controllers',
  serviceDir: 'services',

  relativeCtrlPath: 'src/controllers',
  relativeOutputPath: 'src/__tmp__',
  plugins: ['@nxapi/nxapi-dsl-koa', '@nxapi/nxapi-dsl-joi', '@nxapi/nxapi-dsl-swagger-json'],
};
