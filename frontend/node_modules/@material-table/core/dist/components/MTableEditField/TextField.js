"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TextField2 = _interopRequireDefault(require("@material-ui/core/TextField"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

function MTextField(_ref) {
  var forwardedRef = _ref.forwardedRef,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["forwardedRef"]);
  return /*#__PURE__*/_react["default"].createElement(_TextField2["default"], (0, _extends2["default"])({}, props, {
    ref: forwardedRef,
    fullWidth: true,
    type: props.columnDef.type === 'numeric' ? 'number' : 'text',
    placeholder: props.columnDef.editPlaceholder || props.columnDef.title,
    value: props.value === undefined ? '' : props.value,
    onChange: function onChange(event) {
      return props.onChange(props.columnDef.type === 'numeric' ? event.target.valueAsNumber : event.target.value);
    },
    InputProps: {
      style: {
        minWidth: 50,
        fontSize: 13
      }
    },
    inputProps: {
      'aria-label': props.columnDef.title,
      style: props.columnDef.type === 'numeric' ? {
        textAlign: 'right'
      } : {}
    }
  }));
}

var _default = /*#__PURE__*/_react["default"].forwardRef(function MTextFieldRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTextField, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;