"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); //DATABASE


_mongoose["default"].connect(process.env.MONGO).then(function () {
  console.log('Connected to the Database');
})["catch"](function (err) {
  console.log(err.message);
});

var app = (0, _express["default"])();
app.listen(8000, function () {
  console.log('Server running on Port 3000');
});
//# sourceMappingURL=index.dev.js.map
