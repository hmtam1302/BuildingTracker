import {DATA} from './Data';

class SystemController {
  constructor() {
    this.url = DATA.SYSTEM_URL;
  }

  //Forgot password
  forgotPassword = async email => {
    let response = await fetch(this.url + 'forgotpassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    return response;
  };

  //Get system limits
  getValue = async () => {
    let response = await fetch(this.url);
    let data = await response.json();
    return data;
  };

  //Update system limits
  updateValue = async (username, temperature, noise, gas) => {
    let response = await fetch(this.url + 'changelimit', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        temperature: temperature,
        noise: noise,
        gas: gas,
      }),
    });
    return response;
  };
}

export {SystemController};
