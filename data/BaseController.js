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

  async sendFeed(url, data) {
    let value = {
      datum: {
        value: data,
      },
    };

    await fetch(url, {
      method: 'POST',
      headers: {
        'x-aio-key': this.key,
      },
      body: {
        value: JSON.stringify(value),
      },
    });
  }
}

export {BaseController};
