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

  //Get user settings
  getSettings = async () => {
    let response = await fetch(`${DATA.REQUEST_URL}${this.username}`);
    let data = await response.json();
    return data.settings;
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

  //Change password
  changePassword = async (oldPassword, newPassword) => {
    let response = await fetch(`${DATA.REQUEST_URL}changepassword`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
        oldPassword: oldPassword,
        newPassword: newPassword,
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

  //Get notifications
  getNotifications = async () => {
    let response = await fetch(
      `${DATA.REQUEST_URL}${this.username}/notifications`,
    );
    return response;
  };

  //Send notification
  sendNotification = async (status, element, time) => {
    let response = await fetch(
      `${DATA.REQUEST_URL}${this.username}/notifications`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: status,
          element: element,
          time: time,
        }),
      },
    );
    return response;
  };

  //Update notifications
  updateNotification = async id => {
    let response = await fetch(
      `${DATA.REQUEST_URL}${this.username}/notifications/${id}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  };

  //Delete notifications
  deleteNotification = async id => {
    let response = await fetch(
      `${DATA.REQUEST_URL}${this.username}/notifications/${id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  };

  //Send email notification
  sendMail = async (msg, type) => {
    let response = await fetch(`${DATA.REQUEST_URL}${this.username}`);
    let data = await response.json();
    let email = data.email;
    response = await fetch(`${DATA.REQUEST_URL}${this.username}/sendmail`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        message: `${type} is ${msg === 'Warning' ? 'high' : 'dangerous'}!!!`, // (required)
      }),
    });
    return response;
  };
}

export {UserController};
