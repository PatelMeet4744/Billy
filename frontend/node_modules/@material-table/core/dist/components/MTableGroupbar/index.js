"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _dnd = require("@hello-pangea/dnd");

var _store = require("../../store");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-enable no-unused-vars */
function MTableGroupbar(props) {
  var localization = (0, _store.useLocalizationStore)().grouping;
  var icons = (0, _store.useIconStore)();

  var getItemStyle = function getItemStyle(isDragging, draggableStyle) {
    return _objectSpread({
      // some basic styles to make the items look a bit nicer
      userSelect: 'none',
      // padding: '8px 16px',
      margin: "0 ".concat(8, "px 0 0")
    }, draggableStyle);
  };

  var getListStyle = function getListStyle(isDraggingOver) {
    return {
      // background: isDraggingOver ? 'lightblue' : '#0000000a',
      background: '#0000000a',
      display: 'flex',
      width: '100%',
      padding: 8,
      overflow: 'auto',
      border: '1px solid #ccc',
      borderStyle: 'dashed'
    };
  };

  (0, _react.useEffect)(function () {
    if (props.persistentGroupingsId) {
      var persistentGroupings = props.groupColumns.map(function (column) {
        return {
          field: column.field,
          groupOrder: column.tableData.groupOrder,
          groupSort: column.tableData.groupSort,
          columnOrder: column.tableData.columnOrder
        };
      });
      var materialTableGroupings = localStorage.getItem('material-table-groupings');

      if (materialTableGroupings) {
        materialTableGroupings = JSON.parse(materialTableGroupings);
      } else {
        materialTableGroupings = {};
      }

      if (persistentGroupings.length === 0) {
        delete materialTableGroupings[props.persistentGroupingsId];

        if (Object.keys(materialTableGroupings).length === 0) {
          localStorage.removeItem('material-table-groupings');
        } else {
          localStorage.setItem('material-table-groupings', JSON.stringify(materialTableGroupings));
        }
      } else {
        materialTableGroupings[props.persistentGroupingsId] = persistentGroupings;
        localStorage.setItem('material-table-groupings', JSON.stringify(materialTableGroupings));
      }
    }

    props.onGroupChange && props.onGroupChange(props.groupColumns);
  }, [props.groupColumns]);
  return /*#__PURE__*/_react["default"].createElement(_Toolbar["default"], {
    className: props.className,
    style: {
      padding: 0,
      minHeight: 'unset'
    },
    ref: props.forwardedRef
  }, /*#__PURE__*/_react["default"].createElement(_dnd.Droppable, {
    droppableId: "groups",
    direction: "horizontal",
    placeholder: "Deneme"
  }, function (provided, snapshot) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      ref: provided.innerRef,
      style: getListStyle(snapshot.isDraggingOver)
    }, props.groupColumns.length > 0 && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      variant: "caption",
      style: {
        padding: 8
      }
    }, localization.groupedBy), props.groupColumns.map(function (columnDef, index) {
      return /*#__PURE__*/_react["default"].createElement(_dnd.Draggable, {
        key: columnDef.tableData.id,
        draggableId: columnDef.tableData.id.toString(),
        index: index
      }, function (provided, snapshot) {
        return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
          ref: provided.innerRef
        }, provided.draggableProps, provided.dragHandleProps, {
          style: getItemStyle(snapshot.isDragging, provided.draggableProps.style)
        }), /*#__PURE__*/_react["default"].createElement(_Chip["default"], (0, _extends2["default"])({}, provided.dragHandleProps, {
          onClick: function onClick() {
            return props.onSortChanged(columnDef);
          },
          label: /*#__PURE__*/_react["default"].createElement("div", {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          }, /*#__PURE__*/_react["default"].createElement("div", {
            style: {
              "float": 'left'
            }
          }, columnDef.title), columnDef.tableData.groupSort && /*#__PURE__*/_react["default"].createElement(icons.SortArrow, {
            style: {
              transition: '300ms ease all',
              transform: columnDef.tableData.groupSort === 'asc' ? 'rotate(-180deg)' : 'none',
              fontSize: 18
            }
          })),
          style: {
            boxShadow: 'none',
            textTransform: 'none'
          },
          onDelete: function onDelete() {
            return props.onGroupRemoved(columnDef, index);
          }
        })));
      });
    }), props.groupColumns.length === 0 && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      variant: "caption",
      style: {
        padding: 8
      }
    }, localization.placeholder), provided.placeholder);
  }));
}

MTableGroupbar.defaultProps = {};
MTableGroupbar.propTypes = {
  forwardedRef: _propTypes["default"].element,
  className: _propTypes["default"].string,
  onSortChanged: _propTypes["default"].func,
  onGroupRemoved: _propTypes["default"].func,
  onGroupChange: _propTypes["default"].func,
  persistentGroupingsId: _propTypes["default"].string
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function MTableGroupbarRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTableGroupbar, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;