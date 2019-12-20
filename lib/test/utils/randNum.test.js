function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

expect.extend({
  toBeWithinRange(recieved, floor, ceiling) {
    const pass = recieved >= floor && recieved <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${recieved} not to be within range ${floor} - ${ceiling}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${recieved} to be within range ${floor} - ${ceiling}`,
        pass: false
      };
    }
  }
});

describe('RandNumb test', () => {
  it('can select a random num val from a range', () => {
    const min = 0;
    const max = 5;
    const result = getRandomArbitrary(min, max);
    expect(result).toBeWithinRange(0, 5);
  });
});
