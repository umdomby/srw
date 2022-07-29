/**
 * @class Lib
 */
class Lib {
  /** @static */
  static CONNECTED = "connected";

  /** @static */
  static DISCONNECTED = "disconnected";

  /** @static */
  static XBOX_BTN_MAP = {
    0: "a",
    1: "b",
    2: "x",
    3: "y",
    4: "lb",
    5: "rb",
    6: "lt",
    7: "rt",
    8: "menu",
    9: "pause",
    10: "ls",
    11: "rs",
    12: "dUp",
    13: "dDown",
    14: "dLeft",
    15: "dRight",
    16: "pwr",
  };

  /** @private */
  #state = null;

  /** @private */
  #btnstate = {
    x: null,
    y: null,
    a: null,
    b: null,
    dUp: null,
    dDown: null,
    dLeft: null,
    dRight: null,
    ls: null,
    rs: null,
    lb: null,
    rb: null,
    lt: null,
    rt: null,
    menu: null,
    pause: null,
    pwr: null,
  };

  /** @private */
  #axes = [0, 0, 0, 0];

  /**
   * Get connection state
   *
   * @returns {boolean}
   */
  get state() {
    return this.#state;
  }

  /**
   * Get state of all buttons
   *
   * @returns  {object}
   */
  get btnstate() {
    return this.#btnstate;
  }

  /**
   * Get state of axes
   *
   * @returns {array}
   */
  get axes() {
    return this.#axes;
  }

  /**
   * Returns gamepad connection status
   * @access public
   * @returns {boolean}
   */
  connected() {
    return this.#state === Lib.CONNECTED;
  }

  /**
   * Probe & read current state of the gamepad
   *
   * @param {array} gamepads gamepads array like object
   * @access public
   * @returns {array} state of buttons & axes
   */
  probe(gamepads) {
    gamepads = Array.from(gamepads);
    let gamepad = gamepads.find((e) => !!e);
    const retVal = [this.#btnstate, this.#axes];

    if (!gamepad) {
      return retVal;
    }

    if (gamepad.axes) {
      this.#axes = gamepad.axes;
    }

    for (let button of gamepad.buttons) {
      let index = gamepad.buttons.indexOf(button);
      this.#btnstate[Lib.XBOX_BTN_MAP[index]] = button;
    }

    return retVal;
  }

  /**
   * Set the connection status
   *
   * @access public
   */
  connect() {
    this.#state = Lib.CONNECTED;
  }

  /**
   * Set the disconnection status
   *
   * @access public
   */
  disconnect() {
    this.#state = Lib.DISCONNECTED;
  }
}

export default Lib;
