import { Profit, Languages, EnvTypes } from '../index.js';

const ProfitService = new Profit({
  token: '<YOUR_TOKEN_HERE>',
  env: '12345',
  envType: EnvTypes.Production,
  language: Languages.Dutch,
});

test('Afas config', () => {
  expect(ProfitService.config).toStrictEqual({ environment: '12345', environmentType: EnvTypes.Production });
});
