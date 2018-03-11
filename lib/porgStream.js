const split = require('split2');
const { EOL } = require('os');
const { Porg } = require('../lib/porg');

function getPorgStream() {
  let timeout;
  let shouldScream = true;
  return split(parse);

  function parse(line) {
    if (!shouldScream) {
      return line;
    }
    shouldScream = false;
    Porg.shared().scream();
    setTimeout(() => {
      shouldScream = true;
    }, 2000);
    return line + EOL;
  }
}

module.exports = { getPorgStream };
