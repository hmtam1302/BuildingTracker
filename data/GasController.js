import {BaseController} from './BaseController';
import {useState} from 'react';
class GasController extends BaseController {
  constructor() {
    super();
    this.url = 'https://io.adafruit.com/api/v2/CSE_BBC1/feeds/bk-iot-gas';
  }

  async fetchFeedData() {
    let response = await fetch(this.url);
    let json = await response.json();
    return json;
  }

  async fetchStatistics() {}
}

export {GasController};
