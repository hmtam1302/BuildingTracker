import {DATA} from './Data';

class UserController {
  constructor(username) {
    this.username = username;
  }

  //Login function
  login = async (username, password) => {
    let response = await fetch(`${DATA.REQUEST_URL}login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    return response;
  };

  //Signup function
  signup = async (username, password, email) => {
    let response = await fetch(`${DATA.REQUEST_URL}signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });
    return response;
  };

  //Get user data
  getData = async () => {
    let response = await fetch(`${DATA.REQUEST_URL}${this.username}`);
    return response;
  };

  //Update user data
  update = async (type, value) => {
    let response = await fetch(`${DATA.REQUEST_URL}${this.username}/${type}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: value,
      }),
    });
    return response;
  };

  //Send feedback
  sendFeedbacks = async (experience, error, rating) => {
    let response = await fetch(
      `${DATA.REQUEST_URL}${this.username}/feedbacks`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experience: experience,
          error: error,
          rating: rating,
        }),
      },
    );
    return response;
  };
}

export {UserController};
