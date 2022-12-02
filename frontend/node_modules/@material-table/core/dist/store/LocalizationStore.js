"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMergeProps = useMergeProps;
exports.withContext = withContext;
exports.useIconStore = exports.useOptionStore = exports.useLocalizationStore = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _zustand = _interopRequireDefault(require("zustand"));

var _context = _interopRequireDefault(require("zustand/context"));

var _react = _interopRequireDefault(require("react"));

var _deepmergeTs = require("deepmerge-ts");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _props = _interopRequireDefault(require("../defaults/props.localization"));

var _props2 = _interopRequireDefault(require("../defaults/props.options"));

var _props3 = _interopRequireDefault(require("../defaults/props.icons"));

var _props4 = _interopRequireDefault(require("../defaults/props.components"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createContext = (0, _context["default"])(),
    Provider = _createContext.Provider,
    useStore = _createContext.useStore;

var _createStore = function createStore(props) {
  return (0, _zustand["default"])(function (set) {
    return {
      // Localization
      localization: (0, _deepmergeTs.deepmerge)(props.localization, _props["default"]),
      mergeLocalization: function mergeLocalization(nextLocalization) {
        set(function (_ref) {
          var localization = _ref.localization;
          var mergedLocalization = (0, _deepmergeTs.deepmerge)(localization, nextLocalization);
          mergedLocalization.body.editRow.dateTimePickerLocalization = mergedLocalization.dateTimePickerLocalization;
          mergedLocalization.body.filterRow.dateTimePickerLocalization = mergedLocalization.dateTimePickerLocalization;

          if (!(0, _fastDeepEqual["default"])(mergedLocalization, nextLocalization)) {
            return {
              localization: mergedLocalization
            };
          } else {
            return {
              localization: localization
            };
          }
        });
      },
      // Options
      options: _objectSpread(_objectSpread({}, _props2["default"]), props.options),
      mergeOptions: function mergeOptions(nextOptions) {
        set(function () {
          var mergedOptions = _objectSpread(_objectSpread({}, _props2["default"]), nextOptions);

          if (!(0, _fastDeepEqual["default"])(mergedOptions, nextOptions)) {
            return {
              options: mergedOptions
            };
          } else {
            return {
              options: _props2["default"]
            };
          }
        });
      },
      //  Icons
      icons: _props3["default"],
      mergeIcons: function mergeIcons(nextIcons) {
        set({
          icons: _objectSpread(_objectSpread({}, _props3["default"]), nextIcons)
        });
      },
      // Components
      components: _props4["default"],
      mergeComponents: function mergeComponents(nextComponents) {
        set(function (_ref2) {
          var components = _ref2.components;
          return {
            components: _objectSpread(_objectSpread({}, components), nextComponents)
          };
        });
      }
    };
  });
};

var useLocalizationStore = function useLocalizationStore() {
  var localization = useStore(function (state) {
    return state.localization;
  });
  return localization;
};

exports.useLocalizationStore = useLocalizationStore;

var useOptionStore = function useOptionStore() {
  var options = useStore(function (state) {
    return state.options;
  });
  return options;
};

exports.useOptionStore = useOptionStore;

var useIconStore = function useIconStore() {
  var icons = useStore(function (state) {
    return state.icons;
  });
  return icons;
};

exports.useIconStore = useIconStore;

function useMergeProps(props) {
  var _useStore = useStore(),
      mergeLocalization = _useStore.mergeLocalization,
      mergeOptions = _useStore.mergeOptions,
      mergeIcons = _useStore.mergeIcons,
      mergeComponents = _useStore.mergeComponents,
      localization = _useStore.localization,
      options = _useStore.options,
      icons = _useStore.icons,
      components = _useStore.components;

  _react["default"].useEffect(function () {
    if (props.localization) {
      mergeLocalization(props.localization);
    }
  }, [props.localization]);

  _react["default"].useEffect(function () {
    if (props.options) {
      mergeOptions(props.options);
    }
  }, [props.options]);

  _react["default"].useEffect(function () {
    if (props.icons) {
      mergeIcons(props.icons);
    }
  }, [props.icons]);

  _react["default"].useEffect(function () {
    if (props.components) {
      mergeComponents(props.components);
    }
  }, [props.components]);

  return {
    localization: localization,
    options: options,
    icons: icons,
    components: components
  };
}

function withContext(WrappedComponent) {
  return function Wrapped(props) {
    return /*#__PURE__*/_react["default"].createElement(Provider, {
      createStore: function createStore() {
        return _createStore(props);
      }
    }, /*#__PURE__*/_react["default"].createElement(WrappedComponent, props));
  };
}