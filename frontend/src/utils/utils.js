exports.formatQuestionForAudience = question => {
  // This returns array: ['questionTitle', [answers, answers], 'type']

  // expected format:
  // "Shall we use dogs and paper instead?": {
  //     "no": 0,
  //     "yes": 0
  //  }

  if (Object.values(question).length === 2) {
    // this is a binary question - two answers!
    return [Object.keys(question)[0], Object.values(question), "simple"];
  }

  if (Object.values(question).length === 1) {
    // this is a text question - only one answer!
    return [Object.keys(question)[0], "", "text"];
  }

  if (Object.values(question).length > 2) {
    // this is a multiple choice question - more than two answers!
    return [Object.keys(question)[0], Object.values(question), "muti"];
  }
};

exports.formatMulti = (arr) => {
    arr.reduce((result, item) => {
      result = 0;
      return result;
  }, {})
}

exports.formatD3Data = (obj) => {
  const objKeys = Object.keys(obj)
  const arr = []
  objKeys.forEach((ans, i) => {
    arr.push({y: obj[ans], id: i + 1, label: ans})
  }) 
  return arr
}

