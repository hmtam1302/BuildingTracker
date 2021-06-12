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
}

export {SystemController};
