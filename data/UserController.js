import {DATA} from './Data';

class User {
  constructor(
    full_name,
    email,
    phone,
    birthday,
    avt,
    role,
    floor,
    settings,
    notifications,
  ) {
    this.full_name = full_name;
    this.email = email;
    this.phone = phone;
    this.birthday = birthday;
    this.avt = avt;
    this.role = role;
    this.floor = floor;
    this.settings = settings;
    this.notifications = notifications;
  }
}

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
}

export {UserController};
