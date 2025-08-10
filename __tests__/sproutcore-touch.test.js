describe('packageIdFor', () => {
  test('should return package id for input', () => {
    expect(packageIdFor('abc/def')).toBe('abc');
  });

  test('should return empty string for empty input', () => {
    expect(packageIdFor('')).toBe('');
  });
});

describe('remap', () => {
  test('should remap input based on mappings', () => {
    expect(remap('abc/def', { abc: 'xyz' })).toBe('xyz/def');
  });

  test('should return input if no mappings provided', () => {
    expect(remap('abc/def', null)).toBe('abc/def');
  });
});

describe('normalize', () => {
  test('should normalize input path', () => {
    expect(normalize('./abc/def', 'xyz', { main: './main' }, true)).toBe('xyz/main/abc/def/~package');
  });

  test('should handle edge case with no dots in input', () => {
    expect(normalize('abc/def', null, null, false)).toBe('abc/def/main');
  });
});

describe('execFactory', () => {
  test('should execute factory function and return exports', () => {
    expect(execFactory('module', { filename: 'filename' }, { ARGV: [], ENV: {} }, {})).toEqual({});
  });

  test('should handle edge case with non-function input', () => {
    expect(execFactory('module', { filename: 'filename', data: 'data' }, { ARGV: [], ENV: {} }, {})).toBe('data');
  });
});