/*!
 * @autots/tab-switch v0.0.2
 * Last Modified @ 2020-12-5 7:09:32 PM
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TabSwitch"] = factory();
	else
		root["AutoTs"] = root["AutoTs"] || {}, root["AutoTs"]["TabSwitch"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabSwitch; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);




/* eslint-disable @typescript-eslint/explicit-function-return-type */

/**
 * tab switch
 * attention: [data-role="tabSwitch"] ~ [data-tab-scroll] > [data-role="tab"] > tabs
 */
var delegateFn = function delegateFn(elFilter, listener, e) {
  var el = e.target;

  do {
    if (!elFilter(el)) continue;
    e.delegateTarget = el;
    listener(el);
    return;
  } while (el == el.parentNode);
};

var TabSwitch = /*#__PURE__*/function () {
  function TabSwitch() {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TabSwitch);

    this._fnCheck = function (e) {
      delegateFn(_this.tabFilter, _this.onTabClick.bind(_this), e);
    };

    this.tabScrollClass = '[data-tab-scroll]';
    this.tabsClass = '[data-role="tab"]';
    this.tabItemClass = '.item';
    this.switchEls = document.querySelectorAll('[data-role="tabSwitch"]');
    this.init();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TabSwitch, [{
    key: "tabFilter",
    value: function tabFilter(elem) {
      return elem.classList && elem.classList.contains('item');
    }
  }, {
    key: "init",
    value: function init() {
      if (this.switchEls && this.switchEls.length) {
        this.initSwitchListener();
      } else {
        console.warn('[TabSwitch warning]: cannot find the trigger element');
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      if (this.switchEls && this.switchEls.length) {
        this.switchEls.forEach(function (elem) {
          elem.removeEventListener('click', _this2._fnCheck);
        });
      } else {
        console.warn('[TabSwitch warning]: cannot find the trigger element');
      }
    }
  }, {
    key: "initSwitchListener",
    value: function initSwitchListener() {
      var _this3 = this;

      this.switchEls && this.switchEls.forEach(function (elem) {
        elem.addEventListener('click', _this3._fnCheck);
        var changeTabIndex = +elem.dataset.tabActive || 1;
        var activeIndex = changeTabIndex - 1;

        _this3.changeTab({
          $switchEl: elem,
          index: activeIndex
        });
      });
    }
    /**
     * tab change
     * @param {HTMLElement} $switchEl - the switch container of the current tab
     * @param {HTMLElement} [$tab] - current tab item
     * @param {number} [index] - the active index of the tab（default [data-tab-active]）
     */

  }, {
    key: "changeTab",
    value: function changeTab(_ref) {
      var $switchEl = _ref.$switchEl,
          $tab = _ref.$tab,
          index = _ref.index;

      if (!$switchEl) {
        return;
      }

      var $tabsEl = $switchEl.querySelector(this.tabsClass); // the current tab container

      var $tabsNodeList = $tabsEl.querySelectorAll(this.tabItemClass); // the nodelist of the current tab items

      var $activeTab;

      if ($tab) {
        $activeTab = $tab;
      } else {
        var activeIndex = index > 0 ? index : 0;
        $activeTab = $tabsNodeList[activeIndex];
      }

      if (!$activeTab) {
        console.warn('[TabSwitch warning]: please check the config of the active tab is exist.');
        return;
      }

      if ($activeTab.classList.contains('activate')) {
        return;
      }

      $tabsNodeList.forEach(function (elem) {
        elem.classList.remove('activate');
      });
      $activeTab.classList.add('activate');
      this.setTabPosition($activeTab);
    }
    /**
     * tab item click
    */

  }, {
    key: "onTabClick",
    value: function onTabClick(elem) {
      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(elem) === 'object') {
        this.changeTab({
          $switchEl: elem.closest('[data-role="tabSwitch"]'),
          $tab: elem
        });
      }
    }
  }, {
    key: "setTabPosition",
    value: function setTabPosition($tabItem) {
      var $tabScrollEl = $tabItem.closest(this.tabScrollClass);
      var tabItemWidth = $tabItem.offsetWidth;
      var scrollLeft = 0;
      var tabScrollWidth = 0;
      var tabOffsetLeft = $tabItem.offsetLeft;
      tabScrollWidth = $tabScrollEl.offsetWidth;
      scrollLeft = Math.ceil(tabOffsetLeft - tabScrollWidth / 2 + tabItemWidth / 2);
      this.scrollFn($tabScrollEl, 'scrollLeft', scrollLeft, 300);
    }
  }, {
    key: "scrollFn",
    value: function scrollFn(element, direction, scrollTo) {
      var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 300;
      var scrollFrom = parseInt(element[direction] + '', 10);
      var i = 0;
      var runEvery = 5;
      scrollTo = parseInt(scrollTo + '', 10);
      time /= runEvery;
      var interval = setInterval(function () {
        i++;
        element[direction] = (scrollTo - scrollFrom) / time * i + scrollFrom;

        if (i >= time) {
          clearInterval(interval);
        }
      }, runEvery);
    }
  }]);

  return TabSwitch;
}();



/***/ })
/******/ ])["default"];
});