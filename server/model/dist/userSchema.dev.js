"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  work: {
    type: String,
    required: true
  },
  interest: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  },
  messages: [{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }],
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}); //we are hashing password

userSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("hii  from inside");

          if (!this.isModified('password')) {
            _context.next = 8;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 12));

        case 4:
          this.password = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(this.cpassword, 12));

        case 7:
          this.cpassword = _context.sent;

        case 8:
          next();

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}); //we are generating token

userSchema.methods.generateAuthToken = function _callee2() {
  var token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          token = jwt.sign({
            _id: this._id
          }, process.env.SECRET_KEY);
          this.tokens = this.tokens.concat({
            token: token
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(this.save());

        case 5:
          return _context2.abrupt("return", token);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this, [[0, 8]]);
};

userSchema.methods.addMessage = function _callee3(name, email, phone, message) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          this.messages = this.messages.concat({
            name: name,
            email: email,
            phone: phone,
            message: message
          });
          _context3.next = 4;
          return regeneratorRuntime.awrap(this.save());

        case 4:
          return _context3.abrupt("return", this.messages);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this, [[0, 7]]);
};

var User = mongoose.model('USER', userSchema);
module.exports = User;