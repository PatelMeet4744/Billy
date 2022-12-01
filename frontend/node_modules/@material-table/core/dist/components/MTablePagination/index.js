"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _styles = require("@material-ui/core/styles");

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _LocalizationStore = require("../../store/LocalizationStore");

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
function MTablePagination(props) {
  var icons = (0, _LocalizationStore.useIconStore)();
  var localization = (0, _LocalizationStore.useLocalizationStore)().pagination;

  if (process.env.NODE_ENV === 'development' && !props.onPageChange) {
    console.error('The prop `onPageChange` in pagination is undefined and paging does not work. ' + 'This is most likely caused by an old material-ui version <= 4.11.X.' + 'To fix this, install either material-ui >=4.12 or downgrade material-table-core to <=3.0.15.');
  }

  var handleFirstPageButtonClick = function handleFirstPageButtonClick(event) {
    props.onPageChange(event, 0);
  };

  var handleBackButtonClick = function handleBackButtonClick(event) {
    props.onPageChange(event, props.page - 1);
  };

  var handleNextButtonClick = function handleNextButtonClick(event) {
    props.onPageChange(event, props.page + 1);
  };

  var handleLastPageButtonClick = function handleLastPageButtonClick(event) {
    props.onPageChange(event, Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1));
  };

  var classes = props.classes,
      count = props.count,
      page = props.page,
      rowsPerPage = props.rowsPerPage,
      theme = props.theme,
      showFirstLastPageButtons = props.showFirstLastPageButtons;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.root,
    ref: props.forwardedRef
  }, showFirstLastPageButtons && /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
    title: localization.firstTooltip
  }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    onClick: handleFirstPageButtonClick,
    disabled: page === 0,
    "aria-label": localization.firstAriaLabel
  }, theme.direction === 'rtl' ? /*#__PURE__*/_react["default"].createElement(icons.LastPage, null) : /*#__PURE__*/_react["default"].createElement(icons.FirstPage, null)))), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
    title: localization.previousTooltip
  }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    onClick: handleBackButtonClick,
    disabled: page === 0,
    "aria-label": localization.previousAriaLabel
  }, theme.direction === 'rtl' ? /*#__PURE__*/_react["default"].createElement(icons.NextPage, null) : /*#__PURE__*/_react["default"].createElement(icons.PreviousPage, null)))), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "caption",
    style: {
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center',
      flexBasis: 'inherit'
    }
  }, localization.labelDisplayedRows.replace('{from}', props.count === 0 ? 0 : props.page * props.rowsPerPage + 1).replace('{to}', Math.min((props.page + 1) * props.rowsPerPage, props.count)).replace('{count}', props.count)), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
    title: localization.nextTooltip
  }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    onClick: handleNextButtonClick,
    disabled: page >= Math.ceil(count / rowsPerPage) - 1,
    "aria-label": localization.nextAriaLabel
  }, theme.direction === 'rtl' ? /*#__PURE__*/_react["default"].createElement(icons.PreviousPage, null) : /*#__PURE__*/_react["default"].createElement(icons.NextPage, null)))), showFirstLastPageButtons && /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
    title: localization.lastTooltip
  }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    onClick: handleLastPageButtonClick,
    disabled: page >= Math.ceil(count / rowsPerPage) - 1,
    "aria-label": localization.lastAriaLabel
  }, theme.direction === 'rtl' ? /*#__PURE__*/_react["default"].createElement(icons.FirstPage, null) : /*#__PURE__*/_react["default"].createElement(icons.LastPage, null)))));
}

var actionsStyles = function actionsStyles(theme) {
  return {
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      display: 'flex' // lineHeight: '48px'

    }
  };
};

MTablePagination.propTypes = {
  onPageChange: _propTypes["default"].func,
  page: _propTypes["default"].number,
  count: _propTypes["default"].number,
  rowsPerPage: _propTypes["default"].number,
  classes: _propTypes["default"].object,
  localization: _propTypes["default"].object,
  theme: _propTypes["default"].any,
  showFirstLastPageButtons: _propTypes["default"].bool,
  forwardedRef: _propTypes["default"].func
};
MTablePagination.defaultProps = {
  showFirstLastPageButtons: true
};

var MTableGroupRowRef = /*#__PURE__*/_react["default"].forwardRef(function MTablePaginationRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTablePagination, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

var MTablePaginationOuter = (0, _styles.withStyles)(actionsStyles, {
  withTheme: true
})(MTableGroupRowRef);
var _default = MTablePaginationOuter;
exports["default"] = _default;