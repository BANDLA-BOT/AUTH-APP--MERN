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
//# sourceMappingURL=authController.dev.js.map
