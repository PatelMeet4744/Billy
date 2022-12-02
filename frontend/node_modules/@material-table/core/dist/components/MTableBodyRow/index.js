"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _TableRow2 = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _Tooltip2 = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _IconButton2 = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Checkbox2 = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _TableCell2 = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mTableDetailpanel = require("../m-table-detailpanel");

var CommonValues = _interopRequireWildcard(require("../../utils/common-values"));

var _useDoubleClick = require("../../utils/hooks/useDoubleClick");

var _ = require("./..");

var _store = require("../../store");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function MTableBodyRow(_ref) {
  var forwardedRef = _ref.forwardedRef,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["forwardedRef"]);
  var localization = (0, _store.useLocalizationStore)().body;
  var options = (0, _store.useOptionStore)();
  var icons = (0, _store.useIconStore)();

  var propsWithOptions = _objectSpread(_objectSpread({}, props), {}, {
    options: options
  });

  var data = props.data,
      components = props.components,
      detailPanel = props.detailPanel,
      getFieldValue = props.getFieldValue,
      isTreeData = props.isTreeData,
      onRowSelected = props.onRowSelected,
      onTreeExpandChanged = props.onTreeExpandChanged,
      onToggleDetailPanel = props.onToggleDetailPanel,
      onEditingCanceled = props.onEditingCanceled,
      onEditingApproved = props.onEditingApproved,
      hasAnyEditingRow = props.hasAnyEditingRow,
      treeDataMaxLevel = props.treeDataMaxLevel,
      path = props.path,
      actions = props.actions,
      errorState = props.errorState,
      cellEditable = props.cellEditable,
      onCellEditStarted = props.onCellEditStarted,
      onCellEditFinished = props.onCellEditFinished,
      persistEvents = props.persistEvents,
      scrollWidth = props.scrollWidth,
      onRowClick = props.onRowClick,
      onRowDoubleClick = props.onRowDoubleClick,
      rowProps = (0, _objectWithoutProperties2["default"])(props, ["data", "components", "detailPanel", "getFieldValue", "isTreeData", "onRowSelected", "onTreeExpandChanged", "onToggleDetailPanel", "onEditingCanceled", "onEditingApproved", "hasAnyEditingRow", "treeDataMaxLevel", "path", "actions", "errorState", "cellEditable", "onCellEditStarted", "onCellEditFinished", "persistEvents", "scrollWidth", "onRowClick", "onRowDoubleClick"]);
  var columns = props.columns.filter(function (columnDef) {
    return !columnDef.hidden;
  });

  var onClick = function onClick(event, callback) {
    return callback(event, data, function (panelIndex) {
      var panel = detailPanel;

      if (Array.isArray(panel)) {
        panel = panel[panelIndex || 0];

        if (typeof panel === 'function') {
          panel = panel(data);
        }

        panel = panel.render;
      }

      onToggleDetailPanel(path, panel);
    });
  };

  var handleOnRowClick = (0, _useDoubleClick.useDoubleClick)(onRowClick ? function (e) {
    return onClick(e, onRowClick);
  } : undefined, onRowDoubleClick ? function (e) {
    return onClick(e, onRowDoubleClick);
  } : undefined);

  var getRenderColumns = function getRenderColumns() {
    var mapArr = columns.filter(function (columnDef) {
      return !(columnDef.tableData.groupOrder > -1);
    }).sort(function (a, b) {
      return a.tableData.columnOrder - b.tableData.columnOrder;
    }).map(function (columnDef) {
      var value = props.getFieldValue(props.data, columnDef);

      if (props.data.tableData.editCellList && props.data.tableData.editCellList.find(function (c) {
        return c.tableData.id === columnDef.tableData.id;
      })) {
        return /*#__PURE__*/_react["default"].createElement(props.components.EditCell, {
          getFieldValue: props.getFieldValue,
          components: props.components,
          icons: icons,
          localization: localization,
          columnDef: columnDef,
          size: size,
          key: 'cell-' + props.data.tableData.id + '-' + columnDef.tableData.id,
          rowData: props.data,
          cellEditable: props.cellEditable,
          onCellEditFinished: props.onCellEditFinished,
          scrollWidth: scrollWidth
        });
      } else {
        var isEditable = columnDef.editable !== 'never' && !!props.cellEditable;

        if (isEditable && props.cellEditable.isCellEditable) {
          isEditable = props.cellEditable.isCellEditable(props.data, columnDef);
        }

        var key = "cell-".concat(props.data.tableData.id, "-").concat(columnDef.tableData.id);
        return /*#__PURE__*/_react["default"].createElement(props.components.Cell, {
          size: size,
          errorState: props.errorState,
          columnDef: _objectSpread({
            cellStyle: options.cellStyle
          }, columnDef),
          value: value,
          key: key,
          rowData: props.data,
          cellEditable: isEditable,
          onCellEditStarted: props.onCellEditStarted,
          scrollWidth: scrollWidth
        });
      }
    });
    return mapArr;
  };

  var size = CommonValues.elementSize(propsWithOptions);
  var width = actions.length * CommonValues.baseIconSize(propsWithOptions);

  var renderActions = function renderActions(actions) {
    return /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
      size: size,
      padding: "none",
      key: "key-actions-column",
      style: _objectSpread({
        width: width,
        padding: '0px 5px',
        boxSizing: 'border-box'
      }, options.actionsCellStyle)
    }, /*#__PURE__*/_react["default"].createElement(props.components.Actions, {
      data: props.data,
      actions: actions,
      components: props.components,
      size: size,
      disabled: props.hasAnyEditingRow
    }));
  };

  var renderSelectionColumn = function renderSelectionColumn() {
    var checkboxProps = options.selectionProps || {};

    if (typeof checkboxProps === 'function') {
      checkboxProps = checkboxProps(props.data);
    }

    var selectionWidth = CommonValues.selectionMaxWidth(propsWithOptions, props.treeDataMaxLevel) || 0;
    var styles = size === 'medium' ? {
      marginLeft: props.level * 9 || 0
    } : {
      padding: '4px',
      marginLeft: 5 + props.level * 9 || 0
    };
    return /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
      size: size,
      padding: "none",
      key: "key-selection-column",
      style: {
        width: selectionWidth
      }
    }, /*#__PURE__*/_react["default"].createElement(_Checkbox2["default"], (0, _extends2["default"])({
      size: size,
      checked: props.data.tableData.checked === true,
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      value: props.data.tableData.id.toString(),
      onChange: function onChange(event) {
        props.onRowSelected(event, props.path, props.data);
      },
      style: styles
    }, checkboxProps)));
  };

  var rotateIconStyle = function rotateIconStyle(isOpen) {
    return {
      transform: isOpen ? 'rotate(90deg)' : 'none'
    };
  };

  var renderDetailPanelColumn = function renderDetailPanelColumn() {
    if (!options.showDetailPanelIcon) {
      return null;
    }

    if (typeof props.detailPanel === 'function') {
      return /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
        size: size,
        padding: "none",
        key: "key-detail-panel-column",
        style: _objectSpread({
          width: 42,
          textAlign: 'center'
        }, options.detailPanelColumnStyle)
      }, /*#__PURE__*/_react["default"].createElement(_IconButton2["default"], {
        "aria-label": "Detail panel visibility toggle",
        size: size,
        style: _objectSpread({
          transition: 'all ease 200ms'
        }, rotateIconStyle(props.data.tableData.showDetailPanel)),
        onClick: function onClick(event) {
          props.onToggleDetailPanel(props.path, props.detailPanel);
          event.stopPropagation();
        }
      }, /*#__PURE__*/_react["default"].createElement(icons.DetailPanel, null)));
    } else {
      return /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
        size: size,
        padding: "none",
        key: "key-detail-panel-column"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: _objectSpread({
          width: 42 * props.detailPanel.length,
          textAlign: 'center',
          display: 'flex'
        }, options.detailPanelColumnStyle)
      }, props.detailPanel.map(function (panel, index) {
        if (typeof panel === 'function') {
          panel = panel(props.data);
        }

        var isOpen = (props.data.tableData.showDetailPanel || '').toString() === panel.render.toString();

        var iconButton = /*#__PURE__*/_react["default"].createElement(icons.DetailPanel, null);

        var animation = true;

        if (isOpen) {
          if (panel.openIcon) {
            iconButton = /*#__PURE__*/_react["default"].createElement(_.MTableCustomIcon, {
              icon: panel.openIcon,
              iconProps: panel.iconProps
            });
            animation = false;
          } else if (panel.icon) {
            iconButton = /*#__PURE__*/_react["default"].createElement(_.MTableCustomIcon, {
              icon: panel.icon,
              iconProps: panel.iconProps
            });
          }
        } else if (panel.icon) {
          iconButton = /*#__PURE__*/_react["default"].createElement(_.MTableCustomIcon, {
            icon: panel.icon,
            iconProps: panel.iconProps
          });
          animation = false;
        }

        iconButton = /*#__PURE__*/_react["default"].createElement(_IconButton2["default"], {
          "aria-label": "Detail panel visibility toggle",
          size: size,
          key: 'key-detail-panel-' + index,
          style: _objectSpread({
            transition: 'all ease 200ms'
          }, rotateIconStyle(animation && isOpen)),
          disabled: panel.disabled,
          onClick: function onClick(event) {
            props.onToggleDetailPanel(props.path, panel.render);
            event.stopPropagation();
          }
        }, iconButton);

        if (panel.tooltip) {
          iconButton = /*#__PURE__*/_react["default"].createElement(_Tooltip2["default"], {
            key: 'key-detail-panel-' + index,
            title: panel.tooltip
          }, iconButton);
        }

        return iconButton;
      })));
    }
  };

  var renderTreeDataColumn = function renderTreeDataColumn() {
    if (props.data.tableData.childRows && props.data.tableData.childRows.length > 0) {
      return /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
        size: size,
        padding: "none",
        key: 'key-tree-data-column',
        style: {
          width: 48 + 9 * (props.treeDataMaxLevel - 2)
        }
      }, /*#__PURE__*/_react["default"].createElement(_IconButton2["default"], {
        "aria-label": "Detail panel visibility toggle",
        size: size,
        style: _objectSpread({
          transition: 'all ease 200ms',
          marginLeft: props.level * 9
        }, rotateIconStyle(props.data.tableData.isTreeExpanded)),
        onClick: function onClick(event) {
          props.onTreeExpandChanged(props.path, props.data);
          event.stopPropagation();
        }
      }, /*#__PURE__*/_react["default"].createElement(icons.DetailPanel, null)));
    } else {
      return /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
        padding: "none",
        key: 'key-tree-data-column'
      });
    }
  };

  var getStyle = function getStyle(index, level) {
    var style = {};

    if (typeof options.rowStyle === 'function') {
      style = _objectSpread(_objectSpread({}, style), options.rowStyle(props.data, index, level, props.hasAnyEditingRow));
    } else if (options.rowStyle) {
      style = _objectSpread(_objectSpread({}, style), options.rowStyle);
    }

    if (onRowClick || onRowDoubleClick) {
      style.cursor = 'pointer';
    }

    if (props.hasAnyEditingRow) {
      style.opacity = style.opacity ? style.opacity : 0.2;
    }

    return style;
  };

  var renderColumns = getRenderColumns();

  if (options.selection) {
    renderColumns.splice(0, 0, renderSelectionColumn());
  }

  var rowActions = CommonValues.rowActions(props);

  if (rowActions.length > 0) {
    if (options.actionsColumnIndex === -1) {
      renderColumns.push(renderActions(rowActions));
    } else if (options.actionsColumnIndex >= 0) {
      var endPos = 0;

      if (options.selection) {
        endPos = 1;
      }

      renderColumns.splice(options.actionsColumnIndex + endPos, 0, renderActions(rowActions));
    }
  } // Then we add detail panel icon


  if (props.detailPanel) {
    if (options.detailPanelColumnAlignment === 'right') {
      renderColumns.push(renderDetailPanelColumn());
    } else {
      renderColumns.splice(0, 0, renderDetailPanelColumn());
    }
  } // Lastly we add tree data icon


  if (props.isTreeData) {
    renderColumns.splice(0, 0, renderTreeDataColumn());
  }

  props.columns.filter(function (columnDef) {
    return columnDef.tableData.groupOrder > -1;
  }).forEach(function (columnDef) {
    renderColumns.splice(0, 0, /*#__PURE__*/_react["default"].createElement(_TableCell2["default"], {
      size: size,
      padding: "none",
      key: 'key-group-cell' + columnDef.tableData.id
    }));
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_TableRow2["default"], (0, _extends2["default"])({
    ref: forwardedRef,
    selected: hasAnyEditingRow
  }, rowProps, {
    onClick: function onClick(event) {
      if (persistEvents) {
        event.persist();
      } // Rows cannot be clicked while editing


      !hasAnyEditingRow && handleOnRowClick(event);
    },
    hover: !!(onRowClick || onRowDoubleClick),
    style: getStyle(props.index, props.level)
  }), renderColumns), /*#__PURE__*/_react["default"].createElement(_mTableDetailpanel.MTableDetailPanel, {
    options: options,
    data: props.data,
    detailPanel: props.detailPanel,
    renderColumns: renderColumns,
    size: size
  }), props.data.tableData.childRows && props.data.tableData.isTreeExpanded && props.data.tableData.childRows.map(function (data, index) {
    if (data.tableData.editing) {
      return /*#__PURE__*/_react["default"].createElement(props.components.EditRow, {
        columns: columns,
        components: props.components,
        data: data,
        icons: icons,
        localization: localization,
        getFieldValue: props.getFieldValue,
        key: index,
        mode: data.tableData.editing,
        isTreeData: props.isTreeData,
        detailPanel: props.detailPanel,
        onEditingCanceled: onEditingCanceled,
        onEditingApproved: onEditingApproved,
        errorState: props.errorState
      });
    } else {
      return /*#__PURE__*/_react["default"].createElement(props.components.Row, (0, _extends2["default"])({}, props, {
        data: data,
        index: index,
        key: index,
        level: props.level + 1,
        path: [].concat((0, _toConsumableArray2["default"])(props.path), [data.tableData.uuid]),
        onEditingCanceled: onEditingCanceled,
        onEditingApproved: onEditingApproved,
        hasAnyEditingRow: props.hasAnyEditingRow,
        treeDataMaxLevel: treeDataMaxLevel,
        errorState: props.errorState,
        cellEditable: cellEditable,
        onCellEditStarted: onCellEditStarted,
        onCellEditFinished: onCellEditFinished
      }));
    }
  }));
}

MTableBodyRow.defaultProps = {
  actions: [],
  index: 0,
  data: {},
  path: [],
  persistEvents: false
};
MTableBodyRow.propTypes = {
  actions: _propTypes["default"].array,
  index: _propTypes["default"].number.isRequired,
  data: _propTypes["default"].object.isRequired,
  detailPanel: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]))]),
  hasAnyEditingRow: _propTypes["default"].bool,
  onRowSelected: _propTypes["default"].func,
  path: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])),
  persistEvents: _propTypes["default"].bool,
  treeDataMaxLevel: _propTypes["default"].number,
  getFieldValue: _propTypes["default"].func.isRequired,
  columns: _propTypes["default"].array,
  onToggleDetailPanel: _propTypes["default"].func.isRequired,
  onRowClick: _propTypes["default"].func,
  onRowDoubleClick: _propTypes["default"].func,
  onEditingApproved: _propTypes["default"].func,
  onEditingCanceled: _propTypes["default"].func,
  errorState: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].bool])
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function MTableBodyRowRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTableBodyRow, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;