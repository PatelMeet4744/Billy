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

var _Hidden = _interopRequireDefault(require("@material-ui/core/Hidden"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _store = require("../../store");

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
function MTablePaginationInner(props) {
  var localization = (0, _store.useLocalizationStore)().pagination;
  var icons = (0, _store.useIconStore)();

  var handleFirstPageButtonClick = function handleFirstPageButtonClick(event) {
    props.onPageChange(event, 0);
  };

  var handleBackButtonClick = function handleBackButtonClick(event) {
    props.onPageChange(event, props.page - 1);
  };

  var handleNextButtonClick = function handleNextButtonClick(event) {
    props.onPageChange(event, props.page + 1);
  };

  var handleNumberButtonClick = function handleNumberButtonClick(number) {
    return function (event) {
      props.onPageChange(event, number);
    };
  };

  var handleLastPageButtonClick = function handleLastPageButtonClick(event) {
    props.onPageChange(event, Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1));
  };

  function renderPagesButton(start, end, maxPages, numberOfPagesAround) {
    var buttons = []; // normalize to 1 - 10

    numberOfPagesAround = Math.max(1, Math.min(10, numberOfPagesAround));

    for (var p = Math.max(start - numberOfPagesAround + 1, 0); p <= Math.min(end + numberOfPagesAround - 1, maxPages); p++) {
      var buttonVariant = p === props.page ? 'contained' : 'text';
      buttons.push( /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        size: "small",
        style: {
          boxShadow: 'none',
          maxWidth: '30px',
          maxHeight: '30px',
          minWidth: '30px',
          minHeight: '30px'
        },
        disabled: p === props.page,
        variant: buttonVariant,
        onClick: handleNumberButtonClick(p),
        key: p
      }, p + 1));
    }

    return /*#__PURE__*/_react["default"].createElement("span", null, buttons);
  }

  var classes = props.classes,
      count = props.count,
      page = props.page,
      rowsPerPage = props.rowsPerPage,
      theme = props.theme,
      showFirstLastPageButtons = props.showFirstLastPageButtons,
      numberOfPagesAround = props.numberOfPagesAround;
  var maxPages = Math.ceil(count / rowsPerPage) - 1;
  var pageStart = Math.max(page - 1, 0);
  var pageEnd = Math.min(maxPages, page + 1);
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
  }, /*#__PURE__*/_react["default"].createElement(icons.PreviousPage, null)))), /*#__PURE__*/_react["default"].createElement(_Hidden["default"], {
    smDown: true
  }, renderPagesButton(pageStart, pageEnd, maxPages, numberOfPagesAround)), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
    title: localization.nextTooltip
  }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    onClick: handleNextButtonClick,
    disabled: page >= maxPages,
    "aria-label": localization.nextAriaLabel
  }, /*#__PURE__*/_react["default"].createElement(icons.NextPage, null)))), showFirstLastPageButtons && /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
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
      marginLeft: theme.spacing(2.5)
    }
  };
};

MTablePaginationInner.propTypes = {
  onPageChange: _propTypes["default"].func,
  page: _propTypes["default"].number,
  forwardedRef: _propTypes["default"].func,
  count: _propTypes["default"].number,
  rowsPerPage: _propTypes["default"].number,
  numberOfPagesAround: _propTypes["default"].number,
  classes: _propTypes["default"].object,
  theme: _propTypes["default"].any,
  showFirstLastPageButtons: _propTypes["default"].bool
};
MTablePaginationInner.defaultProps = {
  showFirstLastPageButtons: true
};

var MTableSteppedPaginationRef = /*#__PURE__*/_react["default"].forwardRef(function MTableSteppedPaginationRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTablePaginationInner, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

var MTableSteppedPagination = (0, _styles.withStyles)(actionsStyles, {
  withTheme: true
})(MTableSteppedPaginationRef);
var _default = MTableSteppedPagination;
exports["default"] = _default;