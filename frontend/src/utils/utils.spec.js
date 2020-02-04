const { expect } = require("chai");
const { formatQuestionsForPresenter } = require("./utils");

describe("formatQuestionsForPresenter", () => {
  it("returns an array", () => {
    const input = [];
    const output = formatQuestionsForPresenter(input);
    const expected = [];
    expect(output).to.deep.equal(expected);
  });
});
