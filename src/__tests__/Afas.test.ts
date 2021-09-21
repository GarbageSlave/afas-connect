import { Profit } from '../index';
const x = new Profit({
  apiKey: '',
  env: '',
  envType: 'production',
});

test('Afas config', () => {
  expect(x.config).toStrictEqual({ environment: '', environmentType: 'production' });
});
