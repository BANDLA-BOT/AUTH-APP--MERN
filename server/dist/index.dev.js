"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes.js"));

var _authRoute = _interopRequireDefault(require("./routes/authRoute.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json()); //DATABASE

_mongoose["default"].connect(process.env.MONGO).then(function () {
  console.log('Connected to the Databae');
})["catch"](function (err) {
  console.log(err.message);
}); //LISTENING TO SERVER


app.listen(8000, function () {
  console.log('Server running on Port 000');
}); //API's

app.use('/api/user', _userRoutes["default"]);
app.use('/api/auth', _authRoute["default"]); //ERROR HANDLING MIDDLEWARE

app.use(function (err, req, res, next) {
  var statusCode = err.statusCode || 500;
  var message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    message: message,
    statusCode: statusCode
  });
});
//# sourceMappingURL=index.dev.js.map
