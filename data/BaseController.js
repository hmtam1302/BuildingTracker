class BaseController {
  constructor() {
    this.url =
      'https://io.adafruit.com/api/v2/CSE_BBC/feeds/bk-iot-speaker/data'; //For testing
    this.BBC_KEY = null;
    this.BBC_KEY1 = null;
  }

  //Fetch and send data to feed
  async fetchFeedData() {}
  async sendFeedData(data) {
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

  //Fetch data for statistics
  async fetchStatistics(element, type) {
    let url = this.getURL(element);
    let time = this.getTime(type);
    let start_time = new Date(time[0]).toISOString();
    let end_time = new Date(time[1]).toISOString();

    let data = null;
    data = await this.getStatisticData(url, start_time, end_time, type);
    return data;
  }
  getURL(element) {
    let url = 'https://io.adafruit.com/api/v2/';

    //Find url
    switch (element) {
      case 0:
        url += 'CSE_BBC/feeds/bk-iot-temp-humid/data';
        break;
      case 1:
        url += 'CSE_BBC1/feeds/bk-iot-sound/data';
        break;
      case 2:
        url += 'CSE_BBC1/feeds/bk-iot-gas/data';
        break;
    }
    return url;
  }
  getTime(type) {
    //Find parameter
    let date = new Date();
    let start_time = null;
    let end_time = null;

    switch (type) {
      case 0:
        end_time = new Date();
        start_time = date.setHours(0, 0, 0, 0);
        break;
      case 1:
        let current_day = date.getDay();
        end_time = new Date();
        start_time = new Date(date.setDate(date.getDate() - current_day + 1));
        start_time.setHours(0, 0, 0, 0);
        break;
      case 2:
        start_time = new Date(date.setDate(1));
        start_time.setHours(0, 0, 0, 0);
        end_time = new Date();
        break;
    }
    return [start_time, end_time];
  }
  async getStatisticData(url, start_time, end_time, type) {
    let start = new Date(start_time);
    let temp = new Date(start);
    let end = new Date(end_time);
    let data = {
      labels: [],
      datasets: [{data: []}],
    };
    switch (type) {
      case 0:
        let labelStart = 0;
        let labelEnd = 3;

        while (start < end) {
          temp.setHours(temp.getHours() + 3);
          if (temp > end) {
            temp = end;
          }

          let queryData = null;
          await fetch(
            url +
              `?start_time=${start.toISOString()}&end_time=${temp.toISOString()}&limit=1000`,
          )
            .then(res => res.json())
            .then(json => (queryData = json));

          let summary = this.getStatisticSummary(
            labelStart,
            labelEnd,
            queryData,
          );
          //Set for data
          data.labels.push(`${labelStart}-${labelEnd}`);
          data.datasets[0].data.push(summary);

          //Set value for a new loop
          labelStart = labelEnd;
          labelEnd += 3;

          start.setHours(start.getHours() + 3);
        }
        return data;
      case 1:
        let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        let index = 0;
        while (start < end) {
          temp.setDate(temp.getDate() + 1);
          if (temp > end) {
            temp = end;
          }

          //Query data
          let queryData = null;
          await fetch(
            url +
              `?start_time=${start.toISOString()}&end_time=${temp.toISOString()}&limit=1000`,
          )
            .then(res => res.json())
            .then(json => (queryData = json));

          let summary = this.getStatisticSummary(
            labelStart,
            labelEnd,
            queryData,
          );

          //Add summary and label to data
          data.labels.push(days[index++]);
          data.datasets[0].data.push(summary);

          //Update value for query
          start.setDate(start.getDate() + 1);
        }
        return data;
      case 2:
        let weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
        index = 0;
        while (start < end) {
          temp.setDate(temp.getDate() + 7);
          if (temp > end) {
            temp = end;
          }

          //Query data
          let queryData = null;
          await fetch(
            url +
              `?start_time=${start.toISOString()}&end_time=${temp.toISOString()}&limit=1000`,
          )
            .then(res => res.json())
            .then(json => (queryData = json));

          let summary = this.getStatisticSummary(
            labelStart,
            labelEnd,
            queryData,
          );

          //Add summary and label to data
          data.labels.push(weeks[index++]);
          data.datasets[0].data.push(summary);

          //Update value for query
          start.setDate(start.getDate() + 7);
        }
        return data;
    }
  }
  getStatisticSummary(start, end, queryData) {
    if (queryData.length === 0) {
      return 0;
    }
    let total = 0;
    let countNaN = 0;
    queryData.map(ele => {
      try {
        let value = JSON.parse(ele.value).data.split('-')[0];
        if (isNaN(parseFloat(value))) {
          countNaN++;
        } else {
          total += parseFloat(value);
        }
      } catch {
        countNaN++;
      }
    });
    total = total / (queryData.length - countNaN);
    return total;
  }

  //Fetch data for history
  async fetchHistory(start, end, element) {
    let url =
      this.getURL(element) +
      `?start_time=${start.toISOString()}&end_time=${end.toISOString()}&limit=1000`;
    let response = await fetch(url);
    let arr = await response.json();
    let data = [];
    arr.map(ele => data.push(this.getValue(ele, element)));
    return data;
  }
  getValue(data, element) {
    let time = this.getDate(new Date(data.created_at));
    let unit = element === 0 ? '\u00b0C' : element === 1 ? 'dB' : 'mg/m³';
    let value = null;
    try {
      value = data.value.replace(/'/g, '"');
      value = JSON.parse(value).data.split('-')[0] + unit;
    } catch {
      console.log(data.value);
    }
    return [time, value];
  }

  getDate = date => {
    let dateString = date.toString();
    dateString = dateString.split(' ');
    dateString = dateString.slice(0, 5);
    dateString[0] = dateString[0] + ',';
    dateString[3] = dateString[3] + ',';

    return dateString.join(' ');
  };
}

export {BaseController};
