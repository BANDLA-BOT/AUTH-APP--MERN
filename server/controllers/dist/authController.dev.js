"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.signup = void 0;

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

var _errorHandler = require("../utils/errorHandler.js");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var signup = function signup(req, res, next) {
  var _req$body, username, email, password, salt, hashedPassword, newUser;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;

          if (req.body) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(300).json({
            message: "Fields have no Data init"
          }));

        case 3:
          if (!(password === undefined)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(300).json({
            message: "Fields have no Data init"
          }));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(_bcryptjs["default"].genSalt(10));

        case 7:
          salt = _context.sent;
          hashedPassword = _bcryptjs["default"].hashSync(password, salt);
          newUser = new _userModel["default"]({
            username: username,
            email: email,
            password: hashedPassword
          });
          _context.prev = 10;
          _context.next = 13;
          return regeneratorRuntime.awrap(newUser.save());

        case 13:
          res.status(201).json({
            message: "registered successfully"
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](10);
          next((0, _errorHandler.errorHandler)(500, 'Something went wrong'));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[10, 16]]);
};

exports.signup = signup;

var login = function login(req, res, next) {
  var _req$body2, email, password, validUser, validPassword, token, _validUser$_doc, hashedPassword, rest, expiryDate;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 4:
          validUser = _context2.sent;

          if (validUser) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", next((0, _errorHandler.errorHandler)(404, 'User not found on this email')));

        case 7:
          validPassword = _bcryptjs["default"].compareSync(password, validUser.password);

          if (validPassword) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", next((0, _errorHandler.errorHandler)(401, 'Wrong credentials')));

        case 10:
          token = _jsonwebtoken["default"].sign({
            id: validUser._id
          }, process.env.JWT_ACCESS_KEY_LOGIN, {
            expiresIn: '15m'
          });
          _validUser$_doc = validUser._doc, hashedPassword = _validUser$_doc.password, rest = _objectWithoutProperties(_validUser$_doc, ["password"]);
          expiryDate = new Date(Date.now() + 3600000); //1 hour

          res.cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate
          }).status(200).json({
            user: rest,
            message: "Logged in"
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          next(_context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 16]]);
};

exports.login = login;
//# sourceMappingURL=authController.dev.js.map
