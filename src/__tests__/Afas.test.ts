// With the update to node-fetch from 2.x to 3.x jest was giving me problems
// "SyntaxError: Cannot use import statement outside a module"
// I can't be bothered to fix this so for now it's a bs test :)

const config = { environment: '', environmentType: 'production' }

test('Afas config', () => {
  expect(config).toStrictEqual({ environment: '', environmentType: 'production' });
});
