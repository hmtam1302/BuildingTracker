"use strict";

const { json } = require("express");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const db = require("../db");

module.exports = {
  get: (req, res) => {
    let username = req.params.username;
    let sql =
      "SELECT full_name, \
              email, \
              phone, \
              birthday, \
              floor, \
              role, \
              settings, \
              avt \
      FROM users WHERE username = ?";
    db.query(sql, [username], (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  update: (req, res) => {
    let data = req.body;
    let username = req.params.username;
    let sql = "UPDATE users SET ? WHERE username = ?";
    db.query(sql, [data, username], (err, response) => {
      if (err) throw err;
      res.json({ message: "Update success!" });
    });
  },
  login: (req, res) => {
    // Load hash from your password DB.
    let data = req.body;
    let sql = "SELECT password FROM users WHERE username = ?";
    db.query(sql, [data.username], (err, response) => {
      if (err) throw err;
      //Check password
      if (bcrypt.compareSync(data.password, response[0].password)) {
        res.json({ message: "Login success!" });
      } // true
      else {
        res.json({ message: "Login failed!" });
      }
    })
  },
  signup: (req, res) => {
    //Query username
    let data = req.body;
    let sql = "SELECT username FROM users WHERE username = ?";
    let isUsernameExisted = false;
    db.query(sql, [data.username], (err, response) => {
      if (err) throw err;
      if (response.length > 0) isUsernameExisted = true;

      //Check if username existed
      if (isUsernameExisted) {
        res.json({ message: "Username has been used!" });
      }
      else {
        //Hash password
        const hash = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
        data.password = hash;
        sql = "INSERT INTO users SET ?";
        db.query(sql, [data], (err, response) => {
          if (err) throw err;
          res.json({ message: "Signup success!" });
        })
      }
    })

  },
};
