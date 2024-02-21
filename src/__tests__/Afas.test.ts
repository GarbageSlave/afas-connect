const {Profit} = require('../../lib/index')
const { Languages, EnvTypes } = require('afas-connect/lib/models');

const ProfitService = new Profit({
  token: '<YOUR_TOKEN_HERE>',
  env: '12345',
  envType: EnvTypes.Production,
  language: Languages.Dutch
})

test('Afas config', () => {
  expect(ProfitService.config).toStrictEqual({ environment: '12345', environmentType: EnvTypes.Production });
});
