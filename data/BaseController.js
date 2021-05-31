import {ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY} from '@env';

class BaseController {
  constructor() {
    this.username = ADAFRUIT_IO_USERNAME;
    this.key = ADAFRUIT_IO_KEY;
    this.url = 'https://io.adafruit.com/api/v2/hmtam1302/feeds/led/data'; //For testing
  }

  async fetchData() {}

  async sendFeed(data) {
    let value = {
      value: data,
    };
    let response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-aio-key': this.key,
      },
      body: JSON.stringify(value),
    });
    let json = await response.json();
    return json;
  }
}

export {BaseController};
