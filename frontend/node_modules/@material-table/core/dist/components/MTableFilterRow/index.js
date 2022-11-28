"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MTableFilterRow = MTableFilterRow;
exports["default"] = void 0;

var _TableRow2 = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableCell2 = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DateFilter = _interopRequireDefault(require("./DateFilter"));

var _LookupFilter = _interopRequireDefault(require("./LookupFilter"));

var _DefaultFilter = _interopRequireDefault(require("./DefaultFilter"));

var _BooleanFilter = _interopRequireDefault(require("./BooleanFilter"));

var _Filter = _interopRequireDefault(require("./Filter"));

var _LocalizationStore = require("../../store/LocalizationStore");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * MTableFilterRow is the row that is shown when `MaterialTable.options.filtering` is true.
 * This component allows you to provide a custom filtering algo or allow/disallow filtering for a column.
 *
 * THIS MUST BE EXPORTED (on top of the 'default' export)
 */
function MTableFilterRow(props) {
  var options = (0, _LocalizationStore.useOptionStore)();

  function getComponentForColumn(columnDef) {
    if (columnDef.filtering === false) {
      return null;
    }

    if (columnDef.field || columnDef.customFilterAndSearch) {
      if (columnDef.filterComponent) {
        return /*#__PURE__*/_react["default"].createElement(_Filter["default"], (0, _extends2["default"])({
          columnDef: columnDef
        }, props));
      } else if (columnDef.lookup) {
        return /*#__PURE__*/_react["default"].createElement(_LookupFilter["default"], (0, _extends2["default"])({
          columnDef: columnDef
        }, props));
      } else if (columnDef.type === 'boolean') {
        return /*#__PURE__*/_react["default"].createElement(_BooleanFilter["default"], (0, _extends2["default"])({
          columnDef: columnDef
        }, props));
      } else if (['date', 'datetime', 'time'].includes(columnDef.type)) {
        return /*#__PURE__*/_react["default"].createElement(_DateFilter["default"], (0, _extends2["default"])({
          columnDef: columnDef
        }, props));
      } else {
        return /*#__PURE__*/_react["default"].createElement(_DefaultFilter["default"], (0, _extends2["default"])({
          columnDef: columnDef
        }, props));
      }
    }
  }

  function render() {
    var columns = props.columns.filter(function (columnDef) {
      return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1);
    }).sort(function (a, b) {
      return a.tableData.columnOrder - b.tableData.columnOrder;
    }).map(function (columnDef) {
      return /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
        key: columnDef.tableData.id,
        style: _objectSpread(_objectSpread({}, options.filterCellStyle), columnDef.filterCellStyle)
      }, getComponentForColumn(columnDef));
    });

    if (options.selection) {
      columns.splice(0, 0, /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
        padding: "none",
        key: "key-selection-column"
      }));
    }

    if (props.hasActions) {
      if (options.actionsColumnIndex === -1) {
        columns.push( /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
          key: "key-action-column"
        }));
      } else {
        var endPos = 0;

        if (props.selection) {
          endPos = 1;
        }

        columns.splice(options.actionsColumnIndex + endPos, 0, /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
          key: "key-action-column"
        }));
      }
    }

    if (props.hasDetailPanel && options.showDetailPanelIcon) {
      var index = options.detailPanelColumnAlignment === 'left' ? 0 : columns.length;
      columns.splice(index, 0, /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
        padding: "none",
        key: "key-detail-panel-column"
      }));
    }

    if (props.isTreeData > 0) {
      columns.splice(0, 0, /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
        padding: "none",
        key: 'key-tree-data-filter'
      }));
    }

    props.columns.filter(function (columnDef) {
      return columnDef.tableData.groupOrder > -1;
    }).forEach(function (columnDef) {
      columns.splice(0, 0, /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
        padding: "checkbox",
        key: 'key-group-filter' + columnDef.tableData.id
      }));
    });
    return /*#__PURE__*/_react["default"].createElement(_TableRow2["default"], {
      id: "m--table--filter--row",
      ref: props.forwardedRef,
      style: _objectSpread({
        height: 10
      }, options.filterRowStyle)
    }, columns);
  }

  return render();
}

MTableFilterRow.defaultProps = {
  columns: [],
  hasActions: false,
  localization: {
    filterTooltip: 'Filter'
  }
};
MTableFilterRow.propTypes = {
  columns: _propTypes["default"].array.isRequired,
  hasDetailPanel: _propTypes["default"].bool.isRequired,
  isTreeData: _propTypes["default"].bool.isRequired,
  onFilterChanged: _propTypes["default"].func.isRequired,
  hasActions: _propTypes["default"].bool,
  localization: _propTypes["default"].object
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function MTableFilterRowRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTableFilterRow, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;