module.exports = function addStatic (inventory, template) {
  let bukkit = { Ref: 'StaticBucket' }
  let { inv } = inventory
  let { deployStage } = inv._arc
  if (inv?.static?.[deployStage]) {
    bukkit = inv?.static?.[deployStage]
  }

  template.Resources.HTTP.Properties.DefinitionBody.paths['/_static/{proxy+}'] = {
    get: {
      'x-amazon-apigateway-integration': {
        payloadFormatVersion: '1.0',
        type: 'http_proxy',
        httpMethod: 'GET',
        uri: {
          'Fn::Sub': [
            'https://${bukkit}.s3.${AWS::Region}.amazonaws.com/{proxy}',
            { bukkit },
          ],
        },
        connectionType: 'INTERNET',
        timeoutInMillis: 30000,
        // requestParameters was ignored, now it blows up HTTP API S3 integrations
        // requestParameters: {
        //   'integration.request.path.proxy': 'method.request.path.proxy'
        // },
        // TODO currently ignored, reimplement when respected by HTTP APIs
        // cacheNamespace: xlr8r2,
        // cacheKeyParameters: [
        //   'method.request.path.proxy'
        // ]
      },
    },
  }
  return template
}
