import {BaseController} from './BaseController';
import {useState} from 'react';
class TempController extends BaseController {
  constructor() {
    super();
    this.url = 'https://io.adafruit.com/api/v2/CSE_BBC/feeds/bk-iot-temp-humid';
  }

  async fetchData() {
    let response = await fetch(this.url);
    let json = await response.json();
    return json;
  }
}

export {TempController};
