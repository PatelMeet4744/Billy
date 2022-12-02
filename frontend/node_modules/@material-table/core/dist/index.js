"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MTableAction", {
  enumerable: true,
  get: function get() {
    return _components.MTableAction;
  }
});
Object.defineProperty(exports, "MTableActions", {
  enumerable: true,
  get: function get() {
    return _components.MTableActions;
  }
});
Object.defineProperty(exports, "MTableBody", {
  enumerable: true,
  get: function get() {
    return _components.MTableBody;
  }
});
Object.defineProperty(exports, "MTableBodyRow", {
  enumerable: true,
  get: function get() {
    return _components.MTableBodyRow;
  }
});
Object.defineProperty(exports, "MTableCell", {
  enumerable: true,
  get: function get() {
    return _components.MTableCell;
  }
});
Object.defineProperty(exports, "MTableEditCell", {
  enumerable: true,
  get: function get() {
    return _components.MTableEditCell;
  }
});
Object.defineProperty(exports, "MTableEditField", {
  enumerable: true,
  get: function get() {
    return _components.MTableEditField;
  }
});
Object.defineProperty(exports, "MTableEditRow", {
  enumerable: true,
  get: function get() {
    return _components.MTableEditRow;
  }
});
Object.defineProperty(exports, "MTableFilterRow", {
  enumerable: true,
  get: function get() {
    return _components.MTableFilterRow;
  }
});
Object.defineProperty(exports, "MTableGroupRow", {
  enumerable: true,
  get: function get() {
    return _components.MTableGroupRow;
  }
});
Object.defineProperty(exports, "MTableGroupbar", {
  enumerable: true,
  get: function get() {
    return _components.MTableGroupbar;
  }
});
Object.defineProperty(exports, "MTableHeader", {
  enumerable: true,
  get: function get() {
    return _components.MTableHeader;
  }
});
Object.defineProperty(exports, "MTablePagination", {
  enumerable: true,
  get: function get() {
    return _components.MTablePagination;
  }
});
Object.defineProperty(exports, "MTableSteppedPagination", {
  enumerable: true,
  get: function get() {
    return _components.MTableSteppedPagination;
  }
});
Object.defineProperty(exports, "MTableToolbar", {
  enumerable: true,
  get: function get() {
    return _components.MTableToolbar;
  }
});
Object.defineProperty(exports, "ALL_COLUMNS", {
  enumerable: true,
  get: function get() {
    return _constants.ALL_COLUMNS;
  }
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _defaults = require("./defaults");

var _propTypes = require("./prop-types");

var _materialTable = _interopRequireDefault(require("./material-table"));

var _styles = require("@material-ui/core/styles");

var _LocalizationStore = require("./store/LocalizationStore");

var _components = require("./components");

var _constants = require("./utils/constants");

_materialTable["default"].defaultProps = _defaults.defaultProps;
_materialTable["default"].propTypes = _propTypes.propTypes;

var styles = function styles(theme) {
  return {
    paginationToolbar: {
      padding: 0
    },
    paginationCaption: {
      display: 'none'
    },
    paginationSelectRoot: {
      margin: 0
    }
  };
};

var _default = (0, _LocalizationStore.withContext)((0, _styles.withStyles)(styles, {
  withTheme: true
})(function (props) {
  var _useMergeProps = (0, _LocalizationStore.useMergeProps)(props),
      localization = _useMergeProps.localization,
      options = _useMergeProps.options,
      components = _useMergeProps.components;

  return /*#__PURE__*/_react["default"].createElement(_materialTable["default"], (0, _extends2["default"])({}, props, {
    options: options,
    components: components,
    localization: localization,
    ref: props.tableRef
  }));
}));

exports["default"] = _default;