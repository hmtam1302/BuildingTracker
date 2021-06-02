import {BaseController} from './BaseController';
import {useState} from 'react';
class NoiseController extends BaseController {
  constructor() {
    super();
    this.url = 'https://io.adafruit.com/api/v2/CSE_BBC1/feeds/bk-iot-sound';
  }

  async fetchFeedData() {
    let response = await fetch(this.url);
    let json = await response.json();
    return json;
  }

  async fetchStatistics() {}
}

export {NoiseController};
