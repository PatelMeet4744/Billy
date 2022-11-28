"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _cellUtils = require("./cellUtils");

var _utils = require("../../utils");

var _store = require("../../store");

function MTableCell(props) {
  var icons = (0, _store.useIconStore)();
  var forwardedRef = props.forwardedRef,
      scrollWidth = props.scrollWidth,
      rowData = props.rowData,
      onCellEditStarted = props.onCellEditStarted,
      cellEditable = props.cellEditable,
      columnDef = props.columnDef,
      errorState = props.errorState,
      spreadProps = (0, _objectWithoutProperties2["default"])(props, ["forwardedRef", "scrollWidth", "rowData", "onCellEditStarted", "cellEditable", "columnDef", "errorState"]);

  var handleClickCell = function handleClickCell(e) {
    if (props.columnDef.disableClick) {
      e.stopPropagation();
    }
  };
  /* eslint-disable indent */


  var cellAlignment = columnDef.align !== undefined ? columnDef.align : ['numeric', 'currency'].indexOf(columnDef.type) !== -1 ? 'right' : 'left';
  /* eslint-enable indent */

  var renderValue = (0, _cellUtils.getRenderValue)(props, icons);

  if (cellEditable) {
    renderValue = /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        borderBottom: '1px dashed grey',
        cursor: 'pointer',
        marginLeft: cellAlignment === 'right' ? 'auto' : undefined,
        width: 'max-content'
      },
      onClick: function onClick(e) {
        e.stopPropagation();
        onCellEditStarted(rowData, columnDef);
      }
    }, renderValue);
  }

  return /*#__PURE__*/_react["default"].createElement(_TableCell["default"], (0, _extends2["default"])({}, spreadProps, {
    size: props.size,
    value: props.value,
    style: (0, _utils.getStyle)(props),
    align: cellAlignment,
    onClick: handleClickCell,
    ref: forwardedRef,
    colSpan: props.colSpan
  }), props.children, renderValue);
}

MTableCell.defaultProps = {
  columnDef: {},
  value: undefined
};
MTableCell.propTypes = {
  columnDef: _propTypes["default"].object.isRequired,
  value: _propTypes["default"].any,
  rowData: _propTypes["default"].object,
  errorState: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].bool]),
  forwardedRef: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].object]),
  size: _propTypes["default"].string,
  colSpan: _propTypes["default"].number,
  children: _propTypes["default"].element,
  cellEditable: _propTypes["default"].bool,
  onCellEditStarted: _propTypes["default"].func
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function MTableCellRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTableCell, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;