"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyle = getStyle;
exports.setObjectByKey = exports.selectFromObject = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var CommonValues = _interopRequireWildcard(require("./common-values"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var selectFromObject = function selectFromObject(o, s) {
  if (!s) {
    return;
  }

  var a;

  if (!Array.isArray(s)) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties

    s = s.replace(/^\./, ''); // strip a leading dot

    a = s.split('.');
  } else {
    a = s;
  }

  for (var i = 0, n = a.length; i < n; ++i) {
    var x = a[i];

    if (o && x in o) {
      o = o[x];
    } else {
      return;
    }
  }

  return o;
};

exports.selectFromObject = selectFromObject;

var setObjectByKey = function setObjectByKey(obj, path, value) {
  var schema = obj; // a moving reference to internal objects within obj

  var pList;

  if (!Array.isArray(path)) {
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties

    path = path.replace(/^\./, ''); // strip a leading dot

    pList = path.split('.');
  } else {
    pList = path;
  }

  var len = pList.length;

  for (var i = 0; i < len - 1; i++) {
    var elem = pList[i];
    if (!schema[elem]) schema[elem] = {};
    schema = schema[elem];
  }

  schema[pList[len - 1]] = value;
};

exports.setObjectByKey = setObjectByKey;

function getStyle(props) {
  var width = CommonValues.reducePercentsInCalc(props.columnDef.tableData.width, props.scrollWidth);
  var cellStyle = {
    color: 'inherit',
    width: width,
    maxWidth: props.columnDef.maxWidth,
    minWidth: props.columnDef.minWidth,
    boxSizing: 'border-box',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    fontWeight: 'inherit'
  };

  if (typeof props.columnDef.cellStyle === 'function') {
    cellStyle = _objectSpread(_objectSpread({}, cellStyle), props.columnDef.cellStyle(props.value, props.rowData));
  } else {
    cellStyle = _objectSpread(_objectSpread({}, cellStyle), props.columnDef.cellStyle);
  }

  if (props.columnDef.disableClick) {
    cellStyle.cursor = 'default';
  }

  return _objectSpread(_objectSpread({}, props.style), cellStyle);
}