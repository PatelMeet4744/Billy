"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _store = require("../../store");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function MTableGroupRow(props) {
  var options = (0, _store.useOptionStore)();
  var icons = (0, _store.useIconStore)();

  var rotateIconStyle = function rotateIconStyle(isOpen) {
    return {
      transform: isOpen ? 'rotate(90deg)' : 'none'
    };
  };

  function render() {
    var colSpan = props.columns.filter(function (columnDef) {
      return !columnDef.hidden;
    }).length;
    options.selection && colSpan++;
    props.detailPanel && colSpan++;
    props.actions && props.actions.length > 0 && colSpan++;
    var column = props.groups[props.level];
    var detail;

    if (props.groupData.isExpanded) {
      if (props.groups.length > props.level + 1) {
        // Is there another group
        detail = props.groupData.groups.map(function (groupData, index) {
          return /*#__PURE__*/_react["default"].createElement(props.components.GroupRow, {
            actions: props.actions,
            key: groupData.value || '' + index,
            columns: props.columns,
            components: props.components,
            detailPanel: props.detailPanel,
            getFieldValue: props.getFieldValue,
            groupData: groupData,
            groups: props.groups,
            level: props.level + 1,
            path: [].concat((0, _toConsumableArray2["default"])(props.path), [index]),
            onGroupExpandChanged: props.onGroupExpandChanged,
            onGroupSelected: props.onGroupSelected,
            onRowSelected: props.onRowSelected,
            onRowClick: props.onRowClick,
            onToggleDetailPanel: props.onToggleDetailPanel,
            onTreeExpandChanged: props.onTreeExpandChanged,
            onEditingCanceled: props.onEditingCanceled,
            onEditingApproved: props.onEditingApproved,
            hasAnyEditingRow: props.hasAnyEditingRow,
            isTreeData: props.isTreeData,
            cellEditable: props.cellEditable,
            onCellEditStarted: props.onCellEditStarted,
            onCellEditFinished: props.onCellEditFinished,
            scrollWidth: props.scrollWidth,
            treeDataMaxLevel: props.treeDataMaxLevel
          });
        });
      } else {
        detail = props.groupData.data.map(function (rowData, index) {
          if (rowData.tableData.editing) {
            return /*#__PURE__*/_react["default"].createElement(props.components.EditRow, {
              columns: props.columns,
              components: props.components,
              data: rowData,
              icons: icons,
              path: [].concat((0, _toConsumableArray2["default"])(props.path), [rowData.tableData.uuid]),
              localization: props.localization,
              key: index,
              mode: rowData.tableData.editing,
              isTreeData: props.isTreeData,
              detailPanel: props.detailPanel,
              onEditingCanceled: props.onEditingCanceled,
              onEditingApproved: props.onEditingApproved,
              getFieldValue: props.getFieldValue,
              onBulkEditRowChanged: props.onBulkEditRowChanged,
              scrollWidth: props.scrollWidth
            });
          } else {
            return /*#__PURE__*/_react["default"].createElement(props.components.Row, {
              actions: props.actions,
              key: index,
              columns: props.columns,
              components: props.components,
              data: rowData,
              detailPanel: props.detailPanel,
              level: (props.level || 0) + 1,
              getFieldValue: props.getFieldValue,
              path: [].concat((0, _toConsumableArray2["default"])(props.path), [rowData.tableData.uuid]),
              onRowSelected: props.onRowSelected,
              onRowClick: props.onRowClick,
              onToggleDetailPanel: props.onToggleDetailPanel,
              isTreeData: props.isTreeData,
              onTreeExpandChanged: props.onTreeExpandChanged,
              onEditingCanceled: props.onEditingCanceled,
              onEditingApproved: props.onEditingApproved,
              hasAnyEditingRow: props.hasAnyEditingRow,
              cellEditable: props.cellEditable,
              onCellEditStarted: props.onCellEditStarted,
              onCellEditFinished: props.onCellEditFinished,
              scrollWidth: props.scrollWidth,
              treeDataMaxLevel: props.treeDataMaxLevel
            });
          }
        });
      }
    }

    var freeCells = [];

    for (var i = 0; i < props.level; i++) {
      freeCells.push( /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
        padding: "checkbox",
        key: i
      }));
    }

    var value = props.groupData.value;

    if (column.lookup) {
      value = column.lookup[value];
    }

    var title = column.title;

    if (typeof options.groupTitle === 'function') {
      title = options.groupTitle(props.groupData);
    } else if (typeof title !== 'string') {
      title = /*#__PURE__*/_react["default"].cloneElement(title);
    }

    var separator = options.groupRowSeparator || ': ';
    var showSelectGroupCheckbox = options.selection && options.showSelectGroupCheckbox;

    var mapSelectedRows = function mapSelectedRows(groupData) {
      var totalRows = 0;
      var selectedRows = 0;

      if (showSelectGroupCheckbox) {
        if (groupData.data.length) {
          totalRows += groupData.data.length;
          groupData.data.forEach(function (row) {
            return row.tableData.checked && selectedRows++;
          });
        } else {
          groupData.groups.forEach(function (group) {
            var _mapSelectedRows = mapSelectedRows(group),
                _mapSelectedRows2 = (0, _slicedToArray2["default"])(_mapSelectedRows, 2),
                groupTotalRows = _mapSelectedRows2[0],
                groupSelectedRows = _mapSelectedRows2[1];

            totalRows += groupTotalRows;
            selectedRows += groupSelectedRows;
          });
        }
      }

      return [totalRows, selectedRows];
    };

    var _mapSelectedRows3 = mapSelectedRows(props.groupData),
        _mapSelectedRows4 = (0, _slicedToArray2["default"])(_mapSelectedRows3, 2),
        totalRows = _mapSelectedRows4[0],
        selectedRows = _mapSelectedRows4[1];

    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_TableRow["default"], {
      ref: props.forwardedRef
    }, freeCells, /*#__PURE__*/_react["default"].createElement(props.components.Cell, {
      colSpan: colSpan,
      padding: "none",
      columnDef: column,
      value: value,
      icons: icons
    }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      style: _objectSpread({
        transition: 'all ease 200ms'
      }, rotateIconStyle(props.groupData.isExpanded)),
      onClick: function onClick(event) {
        props.onGroupExpandChanged(props.path);
      }
    }, /*#__PURE__*/_react["default"].createElement(icons.DetailPanel, {
      row: props,
      level: props.path.length - 1
    })), showSelectGroupCheckbox && /*#__PURE__*/_react["default"].createElement(_Checkbox["default"], {
      indeterminate: selectedRows > 0 && totalRows !== selectedRows,
      checked: totalRows === selectedRows,
      onChange: function onChange(event, checked) {
        return props.onGroupSelected && props.onGroupSelected(checked, props.groupData.path);
      },
      style: {
        marginRight: 8
      }
    }), /*#__PURE__*/_react["default"].createElement("b", null, title, separator)))), detail);
  }

  return render();
}

MTableGroupRow.defaultProps = {
  columns: [],
  groups: [],
  level: 0,
  options: {}
};
MTableGroupRow.propTypes = {
  actions: _propTypes["default"].array,
  columns: _propTypes["default"].arrayOf(_propTypes["default"].object),
  components: _propTypes["default"].object,
  cellEditable: _propTypes["default"].object,
  detailPanel: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].object)]),
  forwardedRef: _propTypes["default"].element,
  getFieldValue: _propTypes["default"].func,
  groupData: _propTypes["default"].object,
  groups: _propTypes["default"].arrayOf(_propTypes["default"].object),
  hasAnyEditingRow: _propTypes["default"].bool,
  icons: _propTypes["default"].object,
  isTreeData: _propTypes["default"].bool.isRequired,
  level: _propTypes["default"].number,
  localization: _propTypes["default"].object,
  onBulkEditRowChanged: _propTypes["default"].func,
  onCellEditFinished: _propTypes["default"].func,
  onCellEditStarted: _propTypes["default"].func,
  onEditingApproved: _propTypes["default"].func,
  onEditingCanceled: _propTypes["default"].func,
  onGroupExpandChanged: _propTypes["default"].func,
  onRowClick: _propTypes["default"].func,
  onGroupSelected: _propTypes["default"].func,
  onRowSelected: _propTypes["default"].func,
  onToggleDetailPanel: _propTypes["default"].func.isRequired,
  onTreeExpandChanged: _propTypes["default"].func.isRequired,
  options: _propTypes["default"].object,
  path: _propTypes["default"].arrayOf(_propTypes["default"].number),
  scrollWidth: _propTypes["default"].number.isRequired,
  treeDataMaxLevel: _propTypes["default"].number
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function MTableGroupRowRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTableGroupRow, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;