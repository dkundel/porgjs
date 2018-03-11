const split = require('split2');
const { EOL } = require('os');
const { Porg } = require('../lib/porg');

function getPorgStream() {
  let timeout;
  let shouldScream = true;
  function parse(line) {
    if (!shouldScream) {
      return line;
    }
    shouldScream = false;
    Porg.shared().scream();
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    timeout = setTimeout(() => {
      shouldScream = true;
    }, 2000);
    return line + EOL;
  }

  return split(parse);
}

module.exports = { getPorgStream };
