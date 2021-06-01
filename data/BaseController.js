class BaseController {
  constructor() {
    this.url = 'https://io.adafruit.com/api/v2/hmtam1302/feeds/led/data'; //For testing
  }

  async fetchData() {}

  async sendFeed(data) {
    let value = {
      value: `{\"id\":\"2\",\"name\":\"SPEAKER\",\"data\":\"${data}\",\"unit\":\"\"}`,
    };
    let response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-aio-key': 'aio_igfb19Ck5dgwMgHxdbl7R8lB6MTw',
      },
      body: JSON.stringify(value),
    });
    let json = await response.json();
    return json;
  }
}

export {BaseController};
