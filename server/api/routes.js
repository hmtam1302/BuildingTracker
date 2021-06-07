'use strict';
module.exports = function (app) {
  let userCtrl = require('./controllers/UserController');

  //todoList Routes
  app.route('/users/:username')
    .get(userCtrl.get)
    .put(userCtrl.update);
  app.route('/users/login/')
    .post(userCtrl.login);
  app.route('/users/signup')
    .post(userCtrl.signup)
};