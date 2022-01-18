import { Profit } from '../index';
const x = new Profit({
  token: '',
  env: '',
  envType: 'production',
});

test('Afas config', () => {
  expect(x.config).toStrictEqual({ environment: '', environmentType: 'production' });
});
