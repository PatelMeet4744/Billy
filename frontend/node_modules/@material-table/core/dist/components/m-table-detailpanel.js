"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MTableDetailPanel = MTableDetailPanel;

var _TableRow2 = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _Collapse2 = _interopRequireDefault(require("@material-ui/core/Collapse"));

var _TableCell2 = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

function MTableDetailPanel(props) {
  var shouldOpen = Boolean(props.data.tableData && props.data.tableData.showDetailPanel);

  var _React$useState = _react["default"].useState(shouldOpen),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      isOpen = _React$useState2[0],
      setOpen = _React$useState2[1];

  var _React$useReducer = _react["default"].useReducer(function (s) {
    return s + 1;
  }, 0),
      _React$useReducer2 = (0, _slicedToArray2["default"])(_React$useReducer, 2),
      rerender = _React$useReducer2[1];

  var renderRef = _react["default"].useRef();

  _react["default"].useEffect(function () {
    setTimeout(function () {
      setOpen(shouldOpen);
    }, 5);
  }, [shouldOpen]);

  var renderFunction;

  _react["default"].useEffect(function () {
    if (renderFunction && isOpen) {
      renderRef.current = renderFunction;
    }
  }); // See issue #282 for more on why we have to check for the existence of props.detailPanel


  if (!props.detailPanel) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
  } else {
    if (typeof props.detailPanel === 'function') {
      renderFunction = props.detailPanel;
    } else {
      renderFunction = props.detailPanel ? props.detailPanel.map(function (panel) {
        return typeof panel === 'function' ? panel(props.data) : panel;
      }).find(function (panel) {
        return panel.render.toString() === (props.data.tableData.showDetailPanel || '').toString();
      }) : undefined;
      renderFunction = renderFunction ? renderFunction.render : null;
    }
  }

  if (!renderRef.current && !props.data.tableData.showDetailPanel) {
    return null;
  }

  var Render = renderFunction || renderRef.current;
  return /*#__PURE__*/_react["default"].createElement(_TableRow2["default"], null, props.options.detailPanelOffset.left > 0 && /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
    colSpan: props.options.detailPanelOffset.left
  }), /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
    size: props.size,
    colSpan: props.renderColumns.length - props.options.detailPanelOffset.left - props.options.detailPanelOffset.right,
    padding: "none"
  }, /*#__PURE__*/_react["default"].createElement(_Collapse2["default"], {
    "in": isOpen,
    timeout: "auto",
    unmountOnExit: true,
    mountOnEnter: true,
    onExited: function onExited() {
      renderRef.current = undefined;
      rerender();
    }
  }, Render({
    rowData: props.data
  }))));
}