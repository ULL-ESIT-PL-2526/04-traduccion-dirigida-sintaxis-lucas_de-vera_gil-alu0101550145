const parse = require("../src/parser.js").parse;

describe('Parser Failing Tests', () => {

  test('should handle multiplication and division before addition and subtraction', () => {
    expect(parse("2 + 3 * 4")).toBe(14); // 2 + (3 * 4) = 14
    expect(parse("10 - 6 / 2")).toBe(7); // 10 - (6 / 2) = 7
    expect(parse("5 * 2 + 3")).toBe(13); // (5 * 2) + 3 = 13
    expect(parse("20 / 4 - 2")).toBe(3); // (20 / 4) - 2 = 3
  });

  test('should handle exponentiation with highest precedence', () => {
    expect(parse("2 + 3 ** 2")).toBe(11); // 2 + (3 ** 2) = 11
    expect(parse("2 * 3 ** 2")).toBe(18); // 2 * (3 ** 2) = 18
    expect(parse("10 - 2 ** 3")).toBe(2); // 10 - (2 ** 3) = 2
  });

  test('should handle right associativity for exponentiation', () => {
    expect(parse("2 ** 3 ** 2")).toBe(512); // 2 ** (3 ** 2) = 2 ** 9 = 512
    expect(parse("3 ** 2 ** 2")).toBe(81); // 3 ** (2 ** 2) = 3 ** 4 = 81
  });

  test('should handle mixed operations with correct precedence', () => {
    expect(parse("1 + 2 * 3 - 4")).toBe(3); // 1 + (2 * 3) - 4 = 3
    expect(parse("15 / 3 + 2 * 4")).toBe(13); // (15 / 3) + (2 * 4) = 13
    expect(parse("10 - 3 * 2 + 1")).toBe(5); // 10 - (3 * 2) + 1 = 5
  });

  test('should handle expressions with exponentiation precedence', () => {
    expect(parse("2 ** 3 + 1")).toBe(9); // (2 ** 3) + 1 = 9
    expect(parse("3 + 2 ** 4")).toBe(19); // 3 + (2 ** 4) = 19
    expect(parse("2 * 3 ** 2 + 1")).toBe(19); // 2 * (3 ** 2) + 1 = 19
  });

  test('should handle various realistic calculations with correct precedence', () => {
    expect(parse("1 + 2 * 3")).toBe(7); // 1 + (2 * 3) = 7
    expect(parse("6 / 2 + 4")).toBe(7); // (6 / 2) + 4 = 7
    expect(parse("2 ** 2 + 1")).toBe(5); // (2 ** 2) + 1 = 5
    expect(parse("10 / 2 / 5")).toBe(1); // (10 / 2) / 5 = 1
    expect(parse("100 - 50 + 25")).toBe(75); // (100 - 50) + 25 = 75
    expect(parse("2 * 3 + 4 * 5")).toBe(26); // (2 * 3) + (4 * 5) = 26
  });

  test('should handle precedence with floating point numbers', () => {
    expect(parse("2.5 + 3.2 * 2")).toBeCloseTo(8.9, 10); // 2.5 + (3.2 * 2)
    expect(parse("10.5 - 6.5 / 2")).toBeCloseTo(7.25, 10); // 10.5 - (6.5 / 2)
    expect(parse("1.2 + 3.4 * 2.5 - 0.7")).toBeCloseTo(9.0, 10); // 1.2 + (3.4 * 2.5) - 0.7
  });

  test('should handle left associativity for additive and multiplicative operators with floats', () => {
    expect(parse("10.5 - 4.2 - 1.1")).toBeCloseTo(5.2, 10); // (10.5 - 4.2) - 1.1
    expect(parse("20.0 / 2.0 / 5.0")).toBeCloseTo(2.0, 10); // (20.0 / 2.0) / 5.0
    expect(parse("1.1 + 2.2 + 3.3")).toBeCloseTo(6.6, 10); // (1.1 + 2.2) + 3.3
  });

  test('should handle exponentiation precedence and right associativity with floats', () => {
    expect(parse("2.5 * 2.0 ** 2")).toBeCloseTo(10.0, 10); // 2.5 * (2.0 ** 2)
    expect(parse("2.0 + 3.0 ** 2")).toBeCloseTo(11.0, 10); // 2.0 + (3.0 ** 2)
    expect(parse("2.0 ** 3.0 ** 2.0")).toBeCloseTo(512.0, 10); // 2.0 ** (3.0 ** 2.0)
  });

  test('should handle precedence override with parenthesized expressions', () => {
    expect(parse("(2 + 3) * 4")).toBe(20); // (2 + 3) * 4
    expect(parse("2 * (3 + 4)")).toBe(14); // 2 * (3 + 4)
    expect(parse("(2 + 3) ** 2")).toBe(25); // (2 + 3) ** 2
    expect(parse("2 ** (3 + 1)")).toBe(16); // 2 ** (3 + 1)
  });

  test('should handle nested parenthesized expressions', () => {
    expect(parse("((1 + 2) * (3 + 4))")).toBe(21); // (1 + 2) * (3 + 4)
    expect(parse("(2 + (3 * 4)) - (10 / (2 + 3))")).toBe(12); // (2 + 12) - (10 / 5)
  });

  test('should handle parenthesized expressions with floats', () => {
    expect(parse("(2.5 + 3.5) * 2")).toBeCloseTo(12, 10); // (2.5 + 3.5) * 2
    expect(parse("2.0 * (3.0 + 4.0 / 2.0)")).toBeCloseTo(10, 10); // 2.0 * (3.0 + (4.0 / 2.0))
    expect(parse("(1.5 + 2.5) ** 2")).toBeCloseTo(16, 10); // (1.5 + 2.5) ** 2
  });
});