/**
 * support for Deno custom runtime
 * https://github.com/beginner-corp/begin-deno-runtime
 */
module.exports = function visitDeno (inventory, template) {
  let deno = {
    'ap-northeast-1': 'arn:aws:lambda:ap-northeast-1:455488262213:layer:DenoRuntime:16',
    'ap-northeast-2': 'arn:aws:lambda:ap-northeast-2:455488262213:layer:DenoRuntime:15',
    'ap-northeast-3': 'arn:aws:lambda:ap-northeast-3:455488262213:layer:DenoRuntime:15',
    'ap-south-1':     'arn:aws:lambda:ap-south-1:455488262213:layer:DenoRuntime:16',
    'ap-southeast-1': 'arn:aws:lambda:ap-southeast-1:455488262213:layer:DenoRuntime:16',
    'ap-southeast-2': 'arn:aws:lambda:ap-southeast-2:455488262213:layer:DenoRuntime:16',
    'ca-central-1':   'arn:aws:lambda:ca-central-1:455488262213:layer:DenoRuntime:79',
    'eu-central-1':   'arn:aws:lambda:eu-central-1:455488262213:layer:DenoRuntime:16',
    'eu-north-1':     'arn:aws:lambda:eu-north-1:455488262213:layer:DenoRuntime:15',
    'eu-west-1':      'arn:aws:lambda:eu-west-1:455488262213:layer:DenoRuntime:16',
    'eu-west-2':      'arn:aws:lambda:eu-west-2:455488262213:layer:DenoRuntime:16',
    'eu-west-3':      'arn:aws:lambda:eu-west-3:455488262213:layer:DenoRuntime:15',
    'sa-east-1':      'arn:aws:lambda:sa-east-1:455488262213:layer:DenoRuntime:15',
    'us-east-1':      'arn:aws:lambda:us-east-1:455488262213:layer:DenoRuntime:42',
    'us-east-2':      'arn:aws:lambda:us-east-2:455488262213:layer:DenoRuntime:33',
    'us-west-1':      'arn:aws:lambda:us-west-1:455488262213:layer:DenoRuntime:33',
    'us-west-2':      'arn:aws:lambda:us-west-2:455488262213:layer:DenoRuntime:36',
  }

  for (let resource of Object.keys(template.Resources)) {
    let isFunction = template.Resources[resource].Type === 'AWS::Serverless::Function'
    let isDeno =  template.Resources[resource].Properties.Runtime === 'deno'
    if (isFunction && isDeno) {
      if (!template.Resources[resource].Properties.Layers)
        template.Resources[resource].Properties.Layers = []
      template.Resources[resource].Properties.Layers.push(deno[inventory.inv.aws.region])
      template.Resources[resource].Properties.Handler = 'index.handler'
      template.Resources[resource].Properties.Runtime = 'provided.al2'
    }
  }

  return template
}
