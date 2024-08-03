"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = void 0;

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

var _errorHandler = require("../utils/errorHandler.js");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signup = function signup(req, res, next) {
  var _req$body, username, email, password, salt, hashedPassword, newUser;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(_bcryptjs["default"].genSalt(10));

        case 3:
          salt = _context.sent;
          hashedPassword = _bcryptjs["default"].hashSync(password, salt);
          newUser = new _userModel["default"]({
            username: username,
            email: email,
            password: hashedPassword
          });
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(newUser.save());

        case 9:
          res.status(201).json({
            message: "registered successfully"
          });
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](6);
          next((0, _errorHandler.errorHandler)(500, 'Something went wrong'));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 12]]);
};

exports.signup = signup;
//# sourceMappingURL=authController.dev.js.map
