"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var test = function test(req, res) {
  return regeneratorRuntime.async(function test$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            res.send('Hello');
          } catch (error) {}

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = test;
exports["default"] = _default;
//# sourceMappingURL=userController.dev.js.map
