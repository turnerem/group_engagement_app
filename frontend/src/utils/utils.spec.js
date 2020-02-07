const { expect } = require('chai');
const { formatQuestionsForPresenter, formatMulti, formatD3Data } = require("./utils");

describe("formatQuestionsForPresenter", () => {
  it("returns an array", () => {
    const input = [];
    const output = formatQuestionsForPresenter(input);
    const expected = [];
    expect(output).to.deep.equal(expected);
  });
});

describe('formatMulti', () => {
  it('returns an object with keys and correspondnig values of 0', () => {
    const input = [one, two, three, four, five, six];
    const output = formatMulti(input);
    const expected = {one: 0, two: 0, three: 0, four: 0, five: 0, six: 0};
    expect(output).to.deep.equal(expected)
  });
});

const input = {'yes': 1, 'no': 5}
describe.only('formatD3Data', () => {
  it('should return an array', () => {
    expect(formatD3Data(input)).to.be.an('array')
  })
  it('each element is an object with keys y, id, label', () => {
    expect(formatD3Data(input)[0]).to.have.keys('y', 'id', 'label')
  })
  it('y val of first elem is 1 and y val of second elem is 5', () => {
    expect(formatD3Data(input)[0].y).to.equal(1)
    expect(formatD3Data(input)[1].y).to.equal(5)
  })
  it('label of first elem is yes and of second is no', () => {
    expect(formatD3Data(input)[0].label).to.equal('yes')
    expect(formatD3Data(input)[1].label).to.equal('no')
  })
})