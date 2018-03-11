const { Board, Pin } = require('johnny-five');

const PIN_OUT = 4;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let instance = null;
class Porg {
  static shared() {
    if (!instance) {
      instance = new Porg().init();
    }
    return instance;
  }

  init() {
    this.board = new Board({ repl: false, debug: false });
    this.board.on('ready', () => this.onBoardReady());
    return this;
  }

  async scream() {
    if (!this.boardReady) {
      this.shouldScream = true;
      return this;
    }
    await this.triggerPorg();
    return this;
  }

  finish(code) {
    if (this.boardReady) {
      process.exit(code || 0);
    } else {
      this.exitCode = code;
    }
  }

  async triggerPorg() {
    this.pin.high();
    await sleep(1000);
    this.pin.low();
  }

  async onBoardReady() {
    this.pin = new Pin({ pin: PIN_OUT, mode: Pin.OUTPUT });
    this.boardReady = true;
    if (this.shouldScream) {
      await this.triggerPorg();
      this.shouldScream = false;
    }
    if (typeof this.exitCode === 'number') {
      process.exit(this.exitCode);
    }
  }
}

module.exports = { Porg };
