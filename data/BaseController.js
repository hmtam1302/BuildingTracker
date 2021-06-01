class BaseController {
  constructor() {
    this.url =
      'https://io.adafruit.com/api/v2/CSE_BBC/feeds/bk-iot-speaker/data'; //For testing
    this.BBC_KEY = null;
    this.BBC_KEY1 = null;
  }

  async fetchData() {}

  async sendFeed(data) {
    //Get key
    let key = null;
    await this.getKey().then(value => (key = value.keyBBC));

    //Send data to Speaker
    let value = {
      value: `{"id":"2","name":"SPEAKER","data":"${data}","unit":""}`,
    };
    let response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-aio-key': key,
      },
      body: JSON.stringify(value),
    });
    let json = await response.json();

    // Send data to LCD
    // value = {
    //   value: `{"id":"3","name":"LCD","data":"DANGER!","unit":""}`,
    // };
    // await fetch(
    //   'https://io.adafruit.com/api/v2/CSE_BBC/feeds/bk-iot-lcd/data',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json',
    //       'x-aio-key': key,
    //     },
    //     body: JSON.stringify(value),
    //   },
    // );
    return json;
  }

  async getKey() {
    let response = await fetch('http://dadn.esp32thanhdanh.link/');
    let json = await response.json();
    return json;
  }
}

export {BaseController};
