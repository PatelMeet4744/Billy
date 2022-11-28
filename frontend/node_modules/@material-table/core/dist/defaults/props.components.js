"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TablePagination2 = _interopRequireDefault(require("@material-ui/core/TablePagination"));

var _components = require("../components");

var _default = {
  Action: _components.MTableAction,
  Actions: _components.MTableActions,
  Body: _components.MTableBody,
  Cell: _components.MTableCell,
  Container: _components.Container,
  EditCell: _components.MTableEditCell,
  EditField: _components.MTableEditField,
  EditRow: _components.MTableEditRow,
  FilterRow: _components.MTableFilterRow,
  Groupbar: _components.MTableGroupbar,
  GroupRow: _components.MTableGroupRow,
  Header: _components.MTableHeader,
  OverlayLoading: _components.OverlayLoading,
  OverlayError: _components.OverlayError,
  Pagination: _TablePagination2["default"],
  Row: _components.MTableBodyRow,
  SummaryRow: _components.MTableSummaryRow,
  Toolbar: _components.MTableToolbar
};
exports["default"] = _default;