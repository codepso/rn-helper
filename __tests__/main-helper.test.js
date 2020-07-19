import MainHelper from '../src/helpers/MainHelper';

test('toCamelCase', () => {
  // input
  const input = {
    first_name: 'Juan Minaya',
    country: {
      name: 'Peru',
      alpha_2: 'pe',
      world_population: '1M'
    },
    age: 30
  };

  // ouput
  const output = {
    firstName: 'Juan Minaya',
    country: {
      name: 'Peru',
      alpha2: 'pe',
      worldPopulation: '1M'
    },
    age: 30
  }

  jest.spyOn(MainHelper, 'toCamelCase');
  const r = MainHelper.toCamelCase(input);
  expect(r).toEqual(output);
});
