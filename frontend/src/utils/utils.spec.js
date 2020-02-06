const { expect } = require('chai');
const { formatQuestionsForPresenter, formatMulti } = require("./utils");

describe("formatQuestionsForPresenter", () => {
  it("returns an array", () => {
    const input = [];
    const output = formatQuestionsForPresenter(input);
    const expected = [];
    expect(output).to.deep.equal(expected);
  });
});

describe.only('formatMulti', () => {
  it('returns an object with keys and correspondnig values of 0', () => {
    const input = [one, two, three, four, five, six];
    const output = formatMulti(input);
    const expected = {one: 0, two: 0, three: 0, four: 0, five: 0, six: 0};
    expect(output).to.deep.equal(expected)
  });
});