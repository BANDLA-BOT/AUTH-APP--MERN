"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])(); //DATABASE

_mongoose["default"].connect(process.env.MONGO).then(function () {
  console.log('Connected to the Databae');
})["catch"](function (err) {
  console.log(err.message);
}); //LISTENING TO SERVER


app.listen(8000, function () {
  console.log('Server running on Port 000');
});
app.use('/api/user', _userRoutes["default"]);
//# sourceMappingURL=index.dev.js.map
