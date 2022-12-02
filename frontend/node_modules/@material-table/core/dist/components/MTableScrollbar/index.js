"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _reactDoubleScrollbar = _interopRequireDefault(require("react-double-scrollbar"));

var style = function style() {
  return {
    horizontalScrollContainer: {
      '& ::-webkit-scrollbar': {
        '-webkit-appearance': 'none'
      },
      '& ::-webkit-scrollbar:horizontal': {
        height: 8
      },
      '& ::-webkit-scrollbar-thumb': {
        borderRadius: 4,
        border: '2px solid white',
        backgroundColor: 'rgba(0, 0, 0, .3)'
      }
    }
  };
};

var ScrollBar = (0, _styles.withStyles)(style)(function (_ref) {
  var _double = _ref["double"],
      children = _ref.children,
      classes = _ref.classes;

  if (_double) {
    return /*#__PURE__*/_react["default"].createElement(_reactDoubleScrollbar["default"], null, children);
  } else {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: classes.horizontalScrollContainer,
      style: {
        overflowX: 'auto',
        position: 'relative'
      }
    }, children);
  }
});
var _default = ScrollBar;
exports["default"] = _default;