import {checkURL}  from '../src/client/js/checkURL'
describe("Testing the submit functionality", () => {
  test("Testing HTTPS", () => {
    const testUrl = 'https://bahodir-media.uz';
    const expected = [testUrl];
    expect(checkURL(testUrl)).toStrictEqual(true);
  })
  test("Testing HTTP", () => {
    const testUrl = 'http://bahodir-media.uz';
    const expected = [testUrl];
     expect(checkURL(testUrl)).toStrictEqual(true);
  })
  test("Testing HTTP", () => {
    const testUrl = 'http://bahodir-media.uz';
    const expected = [testUrl];
     expect(checkURL(testUrl)).toStrictEqual(true);
  })
  test("Website without domain", () => {
    const testUrl = 'https://.uz';
    expect(checkURL(testUrl)).toBe(false);
})
  test("Website without protocol", () => {
    const testUrl = 'bahodir-media.uz';
    expect(checkURL(testUrl)).toBe(true);
})
  test("Website without slash in HTTPS", () => {
    const testUrl = 'https:bahodir-media.uz';
    expect(checkURL(testUrl)).toBe(false);
})
  test("Website without slash in HTTP", () => {
    const testUrl = 'http:bahodir-media.uz';
    expect(checkURL(testUrl)).toBe(false);
})
  test("Empty URl", () => {
    const testUrl = ' ';
    expect(checkURL(testUrl)).toBe(false);
})
});