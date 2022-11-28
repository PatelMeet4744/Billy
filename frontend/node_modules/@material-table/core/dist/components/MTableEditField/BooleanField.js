"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _FormControl2 = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _FormHelperText2 = _interopRequireDefault(require("@material-ui/core/FormHelperText"));

var _FormGroup2 = _interopRequireDefault(require("@material-ui/core/FormGroup"));

var _FormControlLabel2 = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _Checkbox2 = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

function BooleanField(_ref) {
  var forwardedRef = _ref.forwardedRef,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["forwardedRef"]);
  return /*#__PURE__*/_react["default"].createElement(_FormControl2["default"], {
    error: Boolean(props.error),
    ref: forwardedRef,
    component: "fieldset"
  }, /*#__PURE__*/_react["default"].createElement(_FormGroup2["default"], null, /*#__PURE__*/_react["default"].createElement(_FormControlLabel2["default"], {
    label: "",
    control: /*#__PURE__*/_react["default"].createElement(_Checkbox2["default"], (0, _extends2["default"])({}, props, {
      value: String(props.value),
      checked: Boolean(props.value),
      onChange: function onChange(event) {
        return props.onChange(event.target.checked);
      },
      style: {
        padding: 0,
        width: 24,
        marginLeft: 9
      },
      inputProps: {
        'aria-label': props.columnDef.title
      }
    }))
  })), /*#__PURE__*/_react["default"].createElement(_FormHelperText2["default"], null, props.helperText));
}

var _default = /*#__PURE__*/_react["default"].forwardRef(function BooleanFieldRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(BooleanField, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;