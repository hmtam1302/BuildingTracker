import {ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY} from '@env';

class BaseController {
  constructor() {
    this.username = ADAFRUIT_IO_USERNAME;
    this.key = ADAFRUIT_IO_KEY;
  }

  async fetchData() {
    let url = 'https://io.adafruit.com/api/v2/hmtam1302/feeds/led';
    let response = await fetch(url);
    let json = await response.json();
    return json;
  }
}

export {BaseController};
