export const formatQuestionForAudience = question => {
  // This returns array: ['questionTitle', [answers, answers], 'type']

  // expected format:
  // "Shall we use dogs and paper instead?": {
  //     "no": 0,
  //     "yes": 0
  //  }
  console.log("checking question");
  console.log(Object.values(question));
  if (
    Object.keys(Object.values(question)[0]).includes("yes") &&
    Object.keys(Object.values(question)[0]).includes("no")
  ) {
    // this is a binary question - yes/no answers!
    console.log("is simple!");
    return [Object.keys(question)[0], Object.values(question), "simple"];
  } else if (Object.keys(Object.values(question)[0]).length === 1) {
    // this is a text question - only one answer!
    return [Object.keys(question)[0], "", "text"];
  } else if (Object.keys(Object.values(question)[0]).length > 1) {
    // this is a multiple choice question - more than two answers!
    return [Object.keys(question)[0], Object.values(question), "muti"];
  }
};
