export const formatAlternativesString: (alternatives: string[]) => string = (alternatives: string[]) => {
  switch (alternatives.length) {
    case 0:
      return '';
    case 1:
      return alternatives[0];
    default:
      return alternatives.slice(0, -1).reduce((a, b) => a + ', ' + b) + ' og ' + alternatives[alternatives.length - 1];
  }
};
