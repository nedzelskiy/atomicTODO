/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"client": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script-2ce1dbe39a72ac46";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "//" + location.hostname + ":35729/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/client.tsx":
/*!***************************!*\
  !*** ./client/client.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar _a;\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar react_dom_1 = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\nvar react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\nvar App_1 = __webpack_require__(/*! ./containers/App/App */ \"./client/containers/App/App.tsx\");\nvar configureStore_1 = __webpack_require__(/*! ./configureStore */ \"./client/configureStore.ts\");\nvar routes_1 = __webpack_require__(/*! ./containers/Router/routes */ \"./client/containers/Router/routes.ts\");\nvar Router_1 = __webpack_require__(/*! ./containers/Router/Router */ \"./client/containers/Router/Router.tsx\");\nvar withTranslator_1 = __webpack_require__(/*! ./containers/decorators/withTranslator */ \"./client/containers/decorators/withTranslator.tsx\");\nvar app_redux_actions_1 = __webpack_require__(/*! ./containers/App/app.redux.actions */ \"./client/containers/App/app.redux.actions.ts\");\nvar ClientEnvironment_1 = __webpack_require__(/*! ./utils/ClientEnvironment/ClientEnvironment */ \"./client/utils/ClientEnvironment/ClientEnvironment.ts\");\nvar ResponseBodyCreator_1 = __webpack_require__(/*! ../server/utils/ResponseBodyCreator/ResponseBodyCreator */ \"./server/utils/ResponseBodyCreator/ResponseBodyCreator.tsx\");\nvar ApplicationCookie_1 = __webpack_require__(/*! ./utils/ApplicationCookie/ApplicationCookie */ \"./client/utils/ApplicationCookie/ApplicationCookie.ts\");\nvar locale = document.documentElement.lang;\nvar clientTranslationsForLocale = window[locale];\nvar manifest = window.manifest;\nvar translationsStorage = withTranslator_1.getTranslationsStorage();\ntranslationsStorage.setTranslations(locale, clientTranslationsForLocale);\nvar store = configureStore_1.default(window.state, (_a = {\n        manifest: manifest\n    },\n    _a[withTranslator_1.STORAGE_NAME] = translationsStorage,\n    _a));\nvar env = new ClientEnvironment_1.default(new ApplicationCookie_1.default());\nvar strict = true;\nreact_dom_1.hydrate(strict ?\n    React.createElement(React.StrictMode, null, render())\n    : render(), document.getElementById('root'));\nfunction render() {\n    return (React.createElement(react_redux_1.Provider, { store: store },\n        React.createElement(Router_1.default, { routes: routes_1.default, render: function (routerProps, route, id) {\n                var Component = route.getComponent();\n                var locale = routerProps.match.params.locale;\n                var componentProps = Object.assign({}, route.componentProps);\n                if (route.path === '/') {\n                    locale = env.getLocale();\n                    componentProps = Object.assign(componentProps, {\n                        to: \"/\" + locale,\n                    });\n                }\n                env.getCookieConnector().setLocaleCookieIfNew(locale);\n                var currentRoute = ResponseBodyCreator_1.default.getCurrentRoute(__assign({ id: id }, route, { routerParams: routerProps.match.params, url: routerProps.history.location.pathname }));\n                store.dispatch(app_redux_actions_1.setCurrentRoute(currentRoute));\n                if (translationsStorage.isExistTranslations(locale)) {\n                    store.dispatch(app_redux_actions_1.setLocale(locale));\n                }\n                else {\n                    store.dispatch(app_redux_actions_1.getLocale(locale));\n                }\n                return (React.createElement(App_1.default, null,\n                    React.createElement(Component, __assign({}, componentProps, { pageName: route.pageName, templateProps: route.templateProps }))));\n            } })));\n}\n\n\n//# sourceURL=webpack:///./client/client.tsx?");

/***/ }),

/***/ "./client/components/Html.tsx":
/*!************************************!*\
  !*** ./client/components/Html.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar get = __webpack_require__(/*! get-value */ \"./node_modules/get-value/index.js\");\nvar serialize = __webpack_require__(/*! serialize-javascript */ \"./node_modules/serialize-javascript/index.js\");\nexports.default = (function (props) { return (React.createElement(\"html\", { lang: props.locale },\n    React.createElement(\"head\", null,\n        React.createElement(\"meta\", { charSet: \"utf-8\" }),\n        React.createElement(\"meta\", { httpEquiv: \"X-UA-Compatible\", content: \"IE=edge\" }),\n        React.createElement(\"meta\", { name: \"viewport\", content: \"width=device-width, initial-scale=1\" }),\n        React.createElement(\"link\", { rel: \"stylesheet\", type: \"text/css\", href: \"/static/client.\" + props.theme + \".css?\" + get(props.manifest, \"client.\" + props.theme + \".css\") }),\n        React.createElement(\"title\", { id: \"title\" }, props.meta.title)),\n    React.createElement(\"body\", null,\n        props.translationsForLocale && React.createElement(\"script\", { id: \"translations-for-locale\", dangerouslySetInnerHTML: { __html: \"window['\" + props.locale + \"']=\" + serialize(props.translationsForLocale) + \";\" } }),\n        React.createElement(\"script\", { id: \"manifest\", dangerouslySetInnerHTML: { __html: \"window.manifest=\" + serialize(props.manifest) + \";\" } }),\n        React.createElement(\"script\", { id: \"state\", dangerouslySetInnerHTML: { __html: \"window.state=\" + serialize(props.state) + \";\" } }),\n        React.createElement(\"div\", { id: \"root\" }, props.children),\n        React.createElement(\"script\", { id: \"js-vendors\", type: \"text/javascript\", src: \"/static/vendors.js?\" + get(props.manifest, 'vendors.js') }),\n        React.createElement(\"script\", { id: \"js-app\", type: \"text/javascript\", src: \"/static/client.js?\" + get(props.manifest, 'client.js') })))); });\n\n\n//# sourceURL=webpack:///./client/components/Html.tsx?");

/***/ }),

/***/ "./client/components/atomes/Header/Header.tsx":
/*!****************************************************!*\
  !*** ./client/components/atomes/Header/Header.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n__webpack_require__(/*! ./header.styles.scss */ \"./client/components/atomes/Header/header.styles.scss\");\nvar Header = function () { return (React.createElement(\"header\", { className: \"header\" },\n    React.createElement(react_router_dom_1.Link, { to: \"/\" }, \"/\"),\n    React.createElement(react_router_dom_1.Link, { to: \"/ru\" }, \"/ru\"),\n    React.createElement(react_router_dom_1.Link, { to: \"/en\" }, \"/en\"),\n    React.createElement(react_router_dom_1.Link, { to: \"/ru/without-header\" }, \"/ru/without-header\"))); };\nexports.default = Header;\n\n\n//# sourceURL=webpack:///./client/components/atomes/Header/Header.tsx?");

/***/ }),

/***/ "./client/components/atomes/Header/header.styles.scss":
/*!************************************************************!*\
  !*** ./client/components/atomes/Header/header.styles.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./client/components/atomes/Header/header.styles.scss?");

/***/ }),

/***/ "./client/components/atomes/buttons/Button/Button.tsx":
/*!************************************************************!*\
  !*** ./client/components/atomes/buttons/Button/Button.tsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n__webpack_require__(/*! ./button.styles.scss */ \"./client/components/atomes/buttons/Button/button.styles.scss\");\nvar Button = function (props) { return (React.createElement(\"button\", { onClick: props.onClick, className: \"button \" + props.className }, props.children)); };\nButton.defaultProps = {\n    className: '',\n    onClick: function () { },\n};\nexports.default = Button;\n\n\n//# sourceURL=webpack:///./client/components/atomes/buttons/Button/Button.tsx?");

/***/ }),

/***/ "./client/components/atomes/buttons/Button/button.styles.scss":
/*!********************************************************************!*\
  !*** ./client/components/atomes/buttons/Button/button.styles.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./client/components/atomes/buttons/Button/button.styles.scss?");

/***/ }),

/***/ "./client/components/atomes/buttons/PrimaryBtn/PrimaryBtn.tsx":
/*!********************************************************************!*\
  !*** ./client/components/atomes/buttons/PrimaryBtn/PrimaryBtn.tsx ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)\n            t[p[i]] = s[p[i]];\n    return t;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar Button_1 = __webpack_require__(/*! ../Button/Button */ \"./client/components/atomes/buttons/Button/Button.tsx\");\n__webpack_require__(/*! ./primary-btn.styles.scss */ \"./client/components/atomes/buttons/PrimaryBtn/primary-btn.styles.scss\");\nvar PrimaryBtn = function (_a) {\n    var children = _a.children, other = __rest(_a, [\"children\"]);\n    return (React.createElement(Button_1.default, __assign({ className: \"primary-btn\" }, other), children));\n};\nexports.default = PrimaryBtn;\n\n\n//# sourceURL=webpack:///./client/components/atomes/buttons/PrimaryBtn/PrimaryBtn.tsx?");

/***/ }),

/***/ "./client/components/atomes/buttons/PrimaryBtn/primary-btn.styles.scss":
/*!*****************************************************************************!*\
  !*** ./client/components/atomes/buttons/PrimaryBtn/primary-btn.styles.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./client/components/atomes/buttons/PrimaryBtn/primary-btn.styles.scss?");

/***/ }),

/***/ "./client/components/atomes/buttons/PrimaryLowNoticeBtn/PrimaryLowNoticeBtn.tsx":
/*!**************************************************************************************!*\
  !*** ./client/components/atomes/buttons/PrimaryLowNoticeBtn/PrimaryLowNoticeBtn.tsx ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)\n            t[p[i]] = s[p[i]];\n    return t;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar Button_1 = __webpack_require__(/*! ../Button/Button */ \"./client/components/atomes/buttons/Button/Button.tsx\");\n__webpack_require__(/*! ./primary-lownotice-btn.styles.scss */ \"./client/components/atomes/buttons/PrimaryLowNoticeBtn/primary-lownotice-btn.styles.scss\");\nvar PrimaryLowNoticeBtn = function (_a) {\n    var children = _a.children, other = __rest(_a, [\"children\"]);\n    return (React.createElement(Button_1.default, __assign({ className: \"primary-lownotice-btn\" }, other), children));\n};\nexports.default = PrimaryLowNoticeBtn;\n\n\n//# sourceURL=webpack:///./client/components/atomes/buttons/PrimaryLowNoticeBtn/PrimaryLowNoticeBtn.tsx?");

/***/ }),

/***/ "./client/components/atomes/buttons/PrimaryLowNoticeBtn/primary-lownotice-btn.styles.scss":
/*!************************************************************************************************!*\
  !*** ./client/components/atomes/buttons/PrimaryLowNoticeBtn/primary-lownotice-btn.styles.scss ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./client/components/atomes/buttons/PrimaryLowNoticeBtn/primary-lownotice-btn.styles.scss?");

/***/ }),

/***/ "./client/components/atomes/buttons/SecondaryBtn/SecondaryBtn.tsx":
/*!************************************************************************!*\
  !*** ./client/components/atomes/buttons/SecondaryBtn/SecondaryBtn.tsx ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)\n            t[p[i]] = s[p[i]];\n    return t;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar Button_1 = __webpack_require__(/*! ../Button/Button */ \"./client/components/atomes/buttons/Button/Button.tsx\");\n__webpack_require__(/*! ./secondary-btn.styles.scss */ \"./client/components/atomes/buttons/SecondaryBtn/secondary-btn.styles.scss\");\nvar SecondaryBtn = function (_a) {\n    var children = _a.children, other = __rest(_a, [\"children\"]);\n    return (React.createElement(Button_1.default, __assign({ className: \"secondary-btn\" }, other), children));\n};\nexports.default = SecondaryBtn;\n\n\n//# sourceURL=webpack:///./client/components/atomes/buttons/SecondaryBtn/SecondaryBtn.tsx?");

/***/ }),

/***/ "./client/components/atomes/buttons/SecondaryBtn/secondary-btn.styles.scss":
/*!*********************************************************************************!*\
  !*** ./client/components/atomes/buttons/SecondaryBtn/secondary-btn.styles.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./client/components/atomes/buttons/SecondaryBtn/secondary-btn.styles.scss?");

/***/ }),

/***/ "./client/components/molecules/TodoItem/TodoItem.tsx":
/*!***********************************************************!*\
  !*** ./client/components/molecules/TodoItem/TodoItem.tsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar DeleteTodoBtn_1 = __webpack_require__(/*! ../../../containers/buttons/DeleteTodoBtn/DeleteTodoBtn */ \"./client/containers/buttons/DeleteTodoBtn/DeleteTodoBtn.tsx\");\nvar TriggerTodoStatusBtn_1 = __webpack_require__(/*! ../../../containers/buttons/TriggerTodoStatusBtn/TriggerTodoStatusBtn */ \"./client/containers/buttons/TriggerTodoStatusBtn/TriggerTodoStatusBtn.tsx\");\n__webpack_require__(/*! ./todoitem.styles.scss */ \"./client/components/molecules/TodoItem/todoitem.styles.scss\");\nvar TodoItem = function (_a) {\n    var isDone = _a.isDone, name = _a.name, id = _a.id;\n    return (React.createElement(\"div\", { className: \"todo-item \" + (isDone ? 'done' : '') },\n        React.createElement(\"span\", { className: \"todo-name\" }, name),\n        React.createElement(TriggerTodoStatusBtn_1.default, { id: id }),\n        React.createElement(DeleteTodoBtn_1.default, { id: id })));\n};\nexports.default = TodoItem;\n\n\n//# sourceURL=webpack:///./client/components/molecules/TodoItem/TodoItem.tsx?");

/***/ }),

/***/ "./client/components/molecules/TodoItem/todoitem.styles.scss":
/*!*******************************************************************!*\
  !*** ./client/components/molecules/TodoItem/todoitem.styles.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./client/components/molecules/TodoItem/todoitem.styles.scss?");

/***/ }),

/***/ "./client/components/molecules/TodoItemCreator/TodoItemCreator.tsx":
/*!*************************************************************************!*\
  !*** ./client/components/molecules/TodoItemCreator/TodoItemCreator.tsx ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar AddTodoBtn_1 = __webpack_require__(/*! ../../../containers/buttons/AddTodoBtn/AddTodoBtn */ \"./client/containers/buttons/AddTodoBtn/AddTodoBtn.tsx\");\n__webpack_require__(/*! ./todoitemcreator.styles.scss */ \"./client/components/molecules/TodoItemCreator/todoitemcreator.styles.scss\");\nvar inputRef = React.createRef();\nvar TodoItemCreator = function () { return (React.createElement(\"div\", { className: \"create-todo-item\" },\n    React.createElement(\"input\", { type: \"text\", ref: inputRef }),\n    React.createElement(AddTodoBtn_1.default, { inputRef: inputRef }))); };\nexports.default = TodoItemCreator;\n\n\n//# sourceURL=webpack:///./client/components/molecules/TodoItemCreator/TodoItemCreator.tsx?");

/***/ }),

/***/ "./client/components/molecules/TodoItemCreator/todoitemcreator.styles.scss":
/*!*********************************************************************************!*\
  !*** ./client/components/molecules/TodoItemCreator/todoitemcreator.styles.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./client/components/molecules/TodoItemCreator/todoitemcreator.styles.scss?");

/***/ }),

/***/ "./client/components/molecules/TodoList/TodoList.tsx":
/*!***********************************************************!*\
  !*** ./client/components/molecules/TodoList/TodoList.tsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar TodoItem_1 = __webpack_require__(/*! ../../molecules/TodoItem/TodoItem */ \"./client/components/molecules/TodoItem/TodoItem.tsx\");\n__webpack_require__(/*! ./todolist.styles.scss */ \"./client/components/molecules/TodoList/todolist.styles.scss\");\nvar TodoList = function (_a) {\n    var todos = _a.todos;\n    return (React.createElement(\"div\", { className: \"todo-list\" }, todos.map(function (todo) {\n        return React.createElement(TodoItem_1.default, __assign({}, todo, { key: todo.id }));\n    })));\n};\nTodoList.defaultProps = {\n    todos: [],\n};\nexports.default = TodoList;\n\n\n//# sourceURL=webpack:///./client/components/molecules/TodoList/TodoList.tsx?");

/***/ }),

/***/ "./client/components/molecules/TodoList/todolist.styles.scss":
/*!*******************************************************************!*\
  !*** ./client/components/molecules/TodoList/todolist.styles.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./client/components/molecules/TodoList/todolist.styles.scss?");

/***/ }),

/***/ "./client/components/organismes/TodoListWithControls/TodoListWithControls.tsx":
/*!************************************************************************************!*\
  !*** ./client/components/organismes/TodoListWithControls/TodoListWithControls.tsx ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar TodoItemCreator_1 = __webpack_require__(/*! ../../molecules/TodoItemCreator/TodoItemCreator */ \"./client/components/molecules/TodoItemCreator/TodoItemCreator.tsx\");\nvar TodoListWithData_1 = __webpack_require__(/*! ../../../containers/lists/TodoListWithData/TodoListWithData */ \"./client/containers/lists/TodoListWithData/TodoListWithData.tsx\");\nvar TodoListWithControls = (function (_super) {\n    __extends(TodoListWithControls, _super);\n    function TodoListWithControls() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    TodoListWithControls.prototype.render = function () {\n        return (React.createElement(\"div\", { className: \"todo-list-with-controls\" },\n            React.createElement(TodoItemCreator_1.default, null),\n            React.createElement(TodoListWithData_1.default, null)));\n    };\n    return TodoListWithControls;\n}(React.Component));\nexports.default = TodoListWithControls;\n\n\n//# sourceURL=webpack:///./client/components/organismes/TodoListWithControls/TodoListWithControls.tsx?");

/***/ }),

/***/ "./client/components/templates/PageTemplate/PageTemplate.tsx":
/*!*******************************************************************!*\
  !*** ./client/components/templates/PageTemplate/PageTemplate.tsx ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar PageTemplate = function (_a) {\n    var children = _a.children, pageName = _a.pageName, Header = _a.Header, Footer = _a.Footer;\n    return (React.createElement(\"div\", { className: \"page \" + pageName + \" wrapper\" },\n        Header && React.createElement(Header, null),\n        React.createElement(\"main\", null, children),\n        Footer && React.createElement(Footer, null)));\n};\nexports.default = PageTemplate;\n\n\n//# sourceURL=webpack:///./client/components/templates/PageTemplate/PageTemplate.tsx?");

/***/ }),

/***/ "./client/configureStore.ts":
/*!**********************************!*\
  !*** ./client/configureStore.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar redux_saga_1 = __webpack_require__(/*! redux-saga */ \"./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js\");\nvar redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\nvar redux_sagas_1 = __webpack_require__(/*! ../data/redux.sagas */ \"./data/redux.sagas.ts\");\nvar redux_reducers_1 = __webpack_require__(/*! ../data/redux.reducers */ \"./data/redux.reducers.ts\");\nfunction configureStore(initialState, sagaContext) {\n    if (initialState === void 0) { initialState = {}; }\n    if (sagaContext === void 0) { sagaContext = {}; }\n    var sagaMiddleware = redux_saga_1.default({\n        context: sagaContext,\n    });\n    var middleware = redux_1.applyMiddleware(sagaMiddleware);\n    var configuredState = initialState;\n    var enhancer = middleware;\n    if (typeof window === 'object'\n        && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined') {\n        enhancer = redux_1.compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());\n    }\n    var store = redux_1.createStore(redux_reducers_1.default, configuredState, enhancer);\n    sagaMiddleware.run(redux_sagas_1.default);\n    return store;\n}\nexports.default = configureStore;\n\n\n//# sourceURL=webpack:///./client/configureStore.ts?");

/***/ }),

/***/ "./client/containers/App/App.tsx":
/*!***************************************!*\
  !*** ./client/containers/App/App.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\nvar Error_1 = __webpack_require__(/*! ../../pages/Error/Error */ \"./client/pages/Error/Error.tsx\");\nvar Loading_1 = __webpack_require__(/*! ../overlays/Loading/Loading */ \"./client/containers/overlays/Loading/Loading.tsx\");\nvar AppPortal_1 = __webpack_require__(/*! ../portals/AppPortal/AppPortal */ \"./client/containers/portals/AppPortal/AppPortal.tsx\");\n__webpack_require__(/*! ./app.styles.scss */ \"./client/containers/App/app.styles.scss\");\nvar App = (function (_super) {\n    __extends(App, _super);\n    function App() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    App.prototype.renderAppPortal = function () {\n        if (this.props.isLoading) {\n            return (React.createElement(AppPortal_1.default, null,\n                React.createElement(Loading_1.default, null)));\n        }\n        return null;\n    };\n    App.prototype.render = function () {\n        var _a = this.props.pageError, isError = _a.isError, message = _a.message, code = _a.code;\n        if (isError && message) {\n            return React.createElement(Error_1.default, { message: message, code: code });\n        }\n        return (React.createElement(React.Fragment, null,\n            this.renderAppPortal(),\n            this.props.children));\n    };\n    return App;\n}(React.Component));\nexports.default = react_redux_1.connect(function (state) {\n    return {\n        pageError: state.appReducer.pageError,\n        isLoading: Object.keys(state.appReducer.loading).length > 0,\n    };\n}, {})(App);\n\n\n//# sourceURL=webpack:///./client/containers/App/App.tsx?");

/***/ }),

/***/ "./client/containers/App/app.redux.actions.ts":
/*!****************************************************!*\
  !*** ./client/containers/App/app.redux.actions.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar app_redux_events_1 = __webpack_require__(/*! ./app.redux.events */ \"./client/containers/App/app.redux.events.ts\");\nexports.setCurrentRoute = function (route) {\n    return {\n        type: app_redux_events_1.default.APP__SET_CURRENT_ROUTE,\n        payload: {\n            route: route,\n        },\n    };\n};\nexports.setLocale = function (locale) {\n    return {\n        type: app_redux_events_1.default.APP__SET_LOCALE,\n        payload: {\n            locale: locale,\n        },\n    };\n};\nexports.getLocale = function (locale) {\n    return {\n        type: app_redux_events_1.default.APP__GET_LOCALE,\n        payload: {\n            locale: locale,\n        },\n    };\n};\nexports.startLoading = function (id) {\n    return {\n        type: app_redux_events_1.default.APP__START_LOADING,\n        payload: {\n            id: id,\n        },\n    };\n};\nexports.stopLoading = function (id) {\n    return {\n        type: app_redux_events_1.default.APP__STOP_LOADING,\n        payload: {\n            id: id,\n        },\n    };\n};\nexports.setPageError = function (error) {\n    return {\n        type: app_redux_events_1.default.APP__SET_PAGE_ERROR,\n        payload: {\n            error: error,\n        },\n    };\n};\nexports.clearPageError = function () {\n    return {\n        type: app_redux_events_1.default.APP__CLEAR_PAGE_ERROR,\n    };\n};\n\n\n//# sourceURL=webpack:///./client/containers/App/app.redux.actions.ts?");

/***/ }),

/***/ "./client/containers/App/app.redux.events.ts":
/*!***************************************************!*\
  !*** ./client/containers/App/app.redux.events.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Events;\n(function (Events) {\n    Events[\"APP__GET_LOCALE\"] = \"APP__GET_LOCALE\";\n    Events[\"APP__SET_LOCALE\"] = \"APP__SET_LOCALE\";\n    Events[\"APP__STOP_LOADING\"] = \"APP__STOP_LOADING\";\n    Events[\"APP__START_LOADING\"] = \"APP__START_LOADING\";\n    Events[\"APP__SET_PAGE_ERROR\"] = \"APP__SET_PAGE_ERROR\";\n    Events[\"APP__CLEAR_PAGE_ERROR\"] = \"APP__CLEAR_PAGE_ERROR\";\n    Events[\"APP__SET_CURRENT_ROUTE\"] = \"APP__SET_CURRENT_ROUTE\";\n})(Events || (Events = {}));\nexports.default = Events;\n\n\n//# sourceURL=webpack:///./client/containers/App/app.redux.events.ts?");

/***/ }),

/***/ "./client/containers/App/app.redux.initial-state.ts":
/*!**********************************************************!*\
  !*** ./client/containers/App/app.redux.initial-state.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar state = {\n    locale: '',\n    loading: {},\n    route: {\n        id: '',\n        url: '',\n        pageName: '',\n        params: {},\n    },\n    pageError: {\n        isError: false,\n        message: '',\n    },\n};\nexports.default = state;\n\n\n//# sourceURL=webpack:///./client/containers/App/app.redux.initial-state.ts?");

/***/ }),

/***/ "./client/containers/App/app.redux.reducer.ts":
/*!****************************************************!*\
  !*** ./client/containers/App/app.redux.reducer.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar clone = __webpack_require__(/*! clone */ \"./node_modules/clone/clone.js\");\nvar app_redux_events_1 = __webpack_require__(/*! ./app.redux.events */ \"./client/containers/App/app.redux.events.ts\");\nvar app_redux_initial_state_1 = __webpack_require__(/*! ./app.redux.initial-state */ \"./client/containers/App/app.redux.initial-state.ts\");\nexports.default = (function (state, action) {\n    if (state === void 0) { state = app_redux_initial_state_1.default; }\n    var newState = clone(state);\n    switch (action.type) {\n        case app_redux_events_1.default.APP__SET_CURRENT_ROUTE: {\n            var route = action.payload.route;\n            newState.route = route;\n            break;\n        }\n        case app_redux_events_1.default.APP__SET_LOCALE: {\n            var locale = action.payload.locale;\n            newState.locale = locale;\n            break;\n        }\n        case app_redux_events_1.default.APP__START_LOADING: {\n            var id = action.payload.id;\n            newState.loading[id] = id;\n            break;\n        }\n        case app_redux_events_1.default.APP__STOP_LOADING: {\n            var id = action.payload.id;\n            delete newState.loading[id];\n            break;\n        }\n        case app_redux_events_1.default.APP__SET_PAGE_ERROR: {\n            var error = action.payload.error;\n            newState.pageError = error;\n            break;\n        }\n        case app_redux_events_1.default.APP__CLEAR_PAGE_ERROR: {\n            newState.pageError = app_redux_initial_state_1.default.pageError;\n            break;\n        }\n    }\n    return newState;\n});\n\n\n//# sourceURL=webpack:///./client/containers/App/app.redux.reducer.ts?");

/***/ }),

/***/ "./client/containers/App/app.saga.watchers.ts":
/*!****************************************************!*\
  !*** ./client/containers/App/app.saga.watchers.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar app_redux_events_1 = __webpack_require__(/*! ./app.redux.events */ \"./client/containers/App/app.redux.events.ts\");\nvar withTranslator_1 = __webpack_require__(/*! ../decorators/withTranslator */ \"./client/containers/decorators/withTranslator.tsx\");\nvar http_1 = __webpack_require__(/*! ../../../data/translations/http */ \"./data/translations/http.ts\");\nvar effects_1 = __webpack_require__(/*! redux-saga/effects */ \"./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js\");\nvar app_redux_actions_1 = __webpack_require__(/*! ./app.redux.actions */ \"./client/containers/App/app.redux.actions.ts\");\nfunction getLocale(action) {\n    var locale, state, id, response, translationsStorage, e_1, message, code;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                locale = action.payload.locale;\n                return [4, effects_1.select(function (s) { return s; })];\n            case 1:\n                state = _a.sent();\n                id = \"get-locale-\" + locale;\n                _a.label = 2;\n            case 2:\n                _a.trys.push([2, 9, , 12]);\n                if (state.appReducer.loading[id]) {\n                    return [2];\n                }\n                return [4, effects_1.put(app_redux_actions_1.startLoading(id))];\n            case 3:\n                _a.sent();\n                return [4, http_1.getTranslations(locale)];\n            case 4:\n                response = _a.sent();\n                if (!response.success) {\n                    throw response.error;\n                }\n                return [4, effects_1.getContext(withTranslator_1.STORAGE_NAME)];\n            case 5:\n                translationsStorage = _a.sent();\n                return [4, effects_1.call(translationsStorage.setTranslations, locale, response.data)];\n            case 6:\n                _a.sent();\n                return [4, effects_1.put(app_redux_actions_1.setLocale(locale))];\n            case 7:\n                _a.sent();\n                return [4, effects_1.put(app_redux_actions_1.stopLoading(id))];\n            case 8:\n                _a.sent();\n                return [3, 12];\n            case 9:\n                e_1 = _a.sent();\n                message = e_1.response && e_1.response.data && e_1.response.data.error\n                    ? e_1.response.data.error.toString()\n                    : e_1.response.statusText;\n                code = e_1.response && e_1.response.status\n                    ? e_1.response.status\n                    : null;\n                return [4, effects_1.put(app_redux_actions_1.setPageError({\n                        code: code,\n                        message: message,\n                        isError: true,\n                    }))];\n            case 10:\n                _a.sent();\n                return [4, effects_1.put(app_redux_actions_1.stopLoading(id))];\n            case 11:\n                _a.sent();\n                throw e_1;\n            case 12: return [2];\n        }\n    });\n}\nfunction watchGetLocale() {\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4, effects_1.takeEvery(app_redux_events_1.default.APP__GET_LOCALE, getLocale)];\n            case 1:\n                _a.sent();\n                return [2];\n        }\n    });\n}\nexports.default = [\n    watchGetLocale(),\n];\n\n\n//# sourceURL=webpack:///./client/containers/App/app.saga.watchers.ts?");

/***/ }),

/***/ "./client/containers/App/app.styles.scss":
/*!***********************************************!*\
  !*** ./client/containers/App/app.styles.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./client/containers/App/app.styles.scss?");

/***/ }),

/***/ "./client/containers/Router/Router.tsx":
/*!*********************************************!*\
  !*** ./client/containers/Router/Router.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\nvar Router = (function (_super) {\n    __extends(Router, _super);\n    function Router(props) {\n        var _this = _super.call(this, props) || this;\n        _this.renderRoute = _this.renderRoute.bind(_this);\n        return _this;\n    }\n    Router.prototype.renderRoute = function (route, id) {\n        var _this = this;\n        return (React.createElement(react_router_dom_1.Route, __assign({}, route, { key: route.pageName, render: function (routerProps) {\n                return _this.props.render(routerProps, route, id);\n            } })));\n    };\n    Router.prototype.render = function () {\n        var _this = this;\n        return (React.createElement(react_router_dom_1.BrowserRouter, null,\n            React.createElement(react_router_dom_1.Switch, null, Object.keys(this.props.routes).map(function (id) {\n                return _this.renderRoute(_this.props.routes[id], id);\n            }))));\n    };\n    return Router;\n}(React.Component));\nexports.default = Router;\n\n\n//# sourceURL=webpack:///./client/containers/Router/Router.tsx?");

/***/ }),

/***/ "./client/containers/Router/routes.ts":
/*!********************************************!*\
  !*** ./client/containers/Router/routes.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Test_1 = __webpack_require__(/*! ../../pages/Test/Test */ \"./client/pages/Test/Test.tsx\");\nvar react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\nvar NotFound_1 = __webpack_require__(/*! ../../pages/NotFound/NotFound */ \"./client/pages/NotFound/NotFound.tsx\");\nvar Home_1 = __webpack_require__(/*! ../../pages/Home/Home */ \"./client/pages/Home/Home.tsx\");\nvar defaultPageRoutes = {\n    home: {\n        exact: true,\n        path: '/:locale',\n        pageName: 'home',\n        getComponent: function () { return Home_1.default; },\n        meta: Home_1.meta,\n    },\n    homeHeaderLess: {\n        exact: true,\n        path: '/:locale/without-header',\n        pageName: 'home',\n        getComponent: function () { return Home_1.default; },\n        templateProps: {\n            header: null,\n        },\n        meta: Home_1.meta,\n    },\n    test: {\n        exact: true,\n        path: '/:locale/test',\n        pageName: 'test',\n        getComponent: function () { return Test_1.default; },\n        meta: {\n            title: '',\n        },\n    },\n    missingLocale: {\n        exact: true,\n        path: '/',\n        pageName: 'missingLocale',\n        getComponent: function () { return react_router_dom_1.Redirect; },\n        meta: {\n            title: '',\n        },\n    },\n    notFound: {\n        path: '/:locale/*',\n        pageName: 'not-found',\n        getComponent: function () { return NotFound_1.default; },\n        meta: {\n            title: '',\n        },\n    },\n};\nexports.default = defaultPageRoutes;\n\n\n//# sourceURL=webpack:///./client/containers/Router/routes.ts?");

/***/ }),

/***/ "./client/containers/TestContainer.tsx":
/*!*********************************************!*\
  !*** ./client/containers/TestContainer.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar DeleteTodoBtn_1 = __webpack_require__(/*! ./buttons/DeleteTodoBtn/DeleteTodoBtn */ \"./client/containers/buttons/DeleteTodoBtn/DeleteTodoBtn.tsx\");\nvar TestContainer = (function (_super) {\n    __extends(TestContainer, _super);\n    function TestContainer() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    TestContainer.prototype.render = function () {\n        return (React.createElement(DeleteTodoBtn_1.default, { id: 1 }));\n    };\n    return TestContainer;\n}(React.Component));\nexports.default = TestContainer;\n\n\n//# sourceURL=webpack:///./client/containers/TestContainer.tsx?");

/***/ }),

/***/ "./client/containers/buttons/AddTodoBtn/AddTodoBtn.tsx":
/*!*************************************************************!*\
  !*** ./client/containers/buttons/AddTodoBtn/AddTodoBtn.tsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\nvar withConnector_1 = __webpack_require__(/*! ../../decorators/withConnector */ \"./client/containers/decorators/withConnector.tsx\");\nvar todos_redux_actions_1 = __webpack_require__(/*! ../../../../data/todos/redux/todos.redux.actions */ \"./data/todos/redux/todos.redux.actions.ts\");\nvar todos_redux_initial_state_1 = __webpack_require__(/*! ../../../../data/todos/redux/todos.redux.initial-state */ \"./data/todos/redux/todos.redux.initial-state.ts\");\nvar withTranslator_1 = __webpack_require__(/*! ../../decorators/withTranslator */ \"./client/containers/decorators/withTranslator.tsx\");\nvar SecondaryBtn_1 = __webpack_require__(/*! ../../../components/atomes/buttons/SecondaryBtn/SecondaryBtn */ \"./client/components/atomes/buttons/SecondaryBtn/SecondaryBtn.tsx\");\nvar AddTodoBtn = (function (_super) {\n    __extends(AddTodoBtn, _super);\n    function AddTodoBtn(props) {\n        var _this = _super.call(this, props) || this;\n        _this.handleOnClick = _this.handleOnClick.bind(_this);\n        return _this;\n    }\n    AddTodoBtn.getBtnText = function (t) {\n        return \"+ \" + t('New task');\n    };\n    AddTodoBtn.prototype.componentDidMount = function () {\n        var _this = this;\n        var current = this.props.inputRef.current;\n        if (current) {\n            current.addEventListener('keypress', function (_a) {\n                var key = _a.key;\n                if (current.value && key === 'Enter') {\n                    _this.addTodo(current);\n                }\n            });\n        }\n    };\n    AddTodoBtn.prototype.addTodo = function (input) {\n        if (!input.value.trim()) {\n            return;\n        }\n        var todo = todos_redux_initial_state_1.createNewTodo(input.value);\n        this.props.addTodo(todo);\n        input.value = '';\n        input.blur();\n    };\n    AddTodoBtn.prototype.handleOnClick = function () {\n        var current = this.props.inputRef.current;\n        if (current && current.value) {\n            this.addTodo(current);\n        }\n    };\n    AddTodoBtn.prototype.render = function () {\n        return (React.createElement(SecondaryBtn_1.default, { onClick: this.handleOnClick }, AddTodoBtn.getBtnText(this.props.t)));\n    };\n    return AddTodoBtn;\n}(React.Component));\nexports.default = withConnector_1.default(withTranslator_1.default(react_redux_1.connect(null, { addTodo: todos_redux_actions_1.addTodo })(AddTodoBtn)), SecondaryBtn_1.default, {\n    children: AddTodoBtn.getBtnText(function (t) { return t; }),\n});\n\n\n//# sourceURL=webpack:///./client/containers/buttons/AddTodoBtn/AddTodoBtn.tsx?");

/***/ }),

/***/ "./client/containers/buttons/DeleteTodoBtn/DeleteTodoBtn.tsx":
/*!*******************************************************************!*\
  !*** ./client/containers/buttons/DeleteTodoBtn/DeleteTodoBtn.tsx ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar _this = this;\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\nvar PrimaryLowNoticeBtn_1 = __webpack_require__(/*! ../../../components/atomes/buttons/PrimaryLowNoticeBtn/PrimaryLowNoticeBtn */ \"./client/components/atomes/buttons/PrimaryLowNoticeBtn/PrimaryLowNoticeBtn.tsx\");\nvar todos_redux_actions_1 = __webpack_require__(/*! ../../../../data/todos/redux/todos.redux.actions */ \"./data/todos/redux/todos.redux.actions.ts\");\nvar withTranslator_1 = __webpack_require__(/*! ../../decorators/withTranslator */ \"./client/containers/decorators/withTranslator.tsx\");\nvar withConnector_1 = __webpack_require__(/*! ../../decorators/withConnector */ \"./client/containers/decorators/withConnector.tsx\");\nvar app_redux_actions_1 = __webpack_require__(/*! ../../App/app.redux.actions */ \"./client/containers/App/app.redux.actions.ts\");\nvar DeleteTodoBtn = (function (_super) {\n    __extends(DeleteTodoBtn, _super);\n    function DeleteTodoBtn(props) {\n        var _this = _super.call(this, props) || this;\n        _this.handleOnClick = _this.handleOnClick.bind(_this);\n        return _this;\n    }\n    DeleteTodoBtn.getBtnText = function (t) {\n        return t('delete');\n    };\n    DeleteTodoBtn.prototype.handleOnClick = function () {\n        this.props.deleteTodo(this.props.id);\n    };\n    DeleteTodoBtn.prototype.render = function () {\n        return (React.createElement(PrimaryLowNoticeBtn_1.default, { onClick: this.handleOnClick }, DeleteTodoBtn.getBtnText(this.props.t)));\n    };\n    return DeleteTodoBtn;\n}(React.Component));\nexports.default = withConnector_1.default(withTranslator_1.default(react_redux_1.connect(null, { deleteTodo: todos_redux_actions_1.deleteTodo })(DeleteTodoBtn)), PrimaryLowNoticeBtn_1.default, {\n    children: DeleteTodoBtn.getBtnText(function (t) { return t; }),\n});\nexports.serverDataFetchJobs = [\n    function () { return __awaiter(_this, void 0, void 0, function () {\n        var locale;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0: return [4, new Promise(function (res, rej) {\n                        setTimeout(function () {\n                            rej('some fetch error');\n                            res('ru');\n                        }, 200);\n                    })];\n                case 1:\n                    locale = _a.sent();\n                    return [2, app_redux_actions_1.setLocale(locale)];\n            }\n        });\n    }); },\n];\n\n\n//# sourceURL=webpack:///./client/containers/buttons/DeleteTodoBtn/DeleteTodoBtn.tsx?");

/***/ }),

/***/ "./client/containers/buttons/TriggerTodoStatusBtn/TriggerTodoStatusBtn.tsx":
/*!*********************************************************************************!*\
  !*** ./client/containers/buttons/TriggerTodoStatusBtn/TriggerTodoStatusBtn.tsx ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\nvar PrimaryBtn_1 = __webpack_require__(/*! ../../../components/atomes/buttons/PrimaryBtn/PrimaryBtn */ \"./client/components/atomes/buttons/PrimaryBtn/PrimaryBtn.tsx\");\nvar withConnector_1 = __webpack_require__(/*! ../../decorators/withConnector */ \"./client/containers/decorators/withConnector.tsx\");\nvar todos_redux_actions_1 = __webpack_require__(/*! ../../../../data/todos/redux/todos.redux.actions */ \"./data/todos/redux/todos.redux.actions.ts\");\nvar TriggerTodoStatusBtn = (function (_super) {\n    __extends(TriggerTodoStatusBtn, _super);\n    function TriggerTodoStatusBtn(props) {\n        var _this = _super.call(this, props) || this;\n        _this.handleOnClick = _this.handleOnClick.bind(_this);\n        return _this;\n    }\n    TriggerTodoStatusBtn.getBtnText = function () {\n        return '☑';\n    };\n    TriggerTodoStatusBtn.prototype.handleOnClick = function () {\n        this.props.triggerDoneTodo(this.props.id);\n    };\n    TriggerTodoStatusBtn.prototype.render = function () {\n        return (React.createElement(PrimaryBtn_1.default, { onClick: this.handleOnClick }, TriggerTodoStatusBtn.getBtnText()));\n    };\n    return TriggerTodoStatusBtn;\n}(React.Component));\nexports.default = withConnector_1.default(react_redux_1.connect(null, { triggerDoneTodo: todos_redux_actions_1.triggerDoneTodo })(TriggerTodoStatusBtn), PrimaryBtn_1.default, {\n    children: TriggerTodoStatusBtn.getBtnText(),\n});\n\n\n//# sourceURL=webpack:///./client/containers/buttons/TriggerTodoStatusBtn/TriggerTodoStatusBtn.tsx?");

/***/ }),

/***/ "./client/containers/decorators/withConnector.tsx":
/*!********************************************************!*\
  !*** ./client/containers/decorators/withConnector.tsx ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nexports.default = (function (component, pureComponent, pureComponentProps) {\n    return process.env.MODE === 'storybook'\n        ? getPureComponent(pureComponent, pureComponentProps)\n        : component;\n});\nvar getPureComponent = function (Component, props) {\n    return props\n        ? function (p) { return (React.createElement(Component, __assign({}, p, props))); }\n        : Component;\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./client/containers/decorators/withConnector.tsx?");

/***/ }),

/***/ "./client/containers/decorators/withTranslator.tsx":
/*!*********************************************************!*\
  !*** ./client/containers/decorators/withTranslator.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\nvar ClientTranslationsDto_1 = __webpack_require__(/*! ../../../data/translations/ClientTranslationsDto/ClientTranslationsDto */ \"./data/translations/ClientTranslationsDto/ClientTranslationsDto.ts\");\nvar ClientTranslator_1 = __webpack_require__(/*! ../../../data/translations/ClientTranslator/ClientTranslator */ \"./data/translations/ClientTranslator/ClientTranslator.ts\");\nvar translationsStorage = new ClientTranslationsDto_1.default();\nexports.STORAGE_NAME = 'translationsStorage';\nexports.getTranslationsStorage = function () { return translationsStorage; };\nexports.setTranslationsStorage = function (ts) {\n    translationsStorage = ts;\n};\nvar createTranslator = function (locale) {\n    return new ClientTranslator_1.default(translationsStorage.getTranslations(locale)).getTranslator();\n};\nexports.default = (function (Component) {\n    var WithTranslator = function (props) {\n        return (React.createElement(Component, __assign({}, props, { t: createTranslator(props.locale) })));\n    };\n    return react_redux_1.connect(function (state) {\n        return {\n            locale: state.appReducer.locale,\n        };\n    }, {})(WithTranslator);\n});\n\n\n//# sourceURL=webpack:///./client/containers/decorators/withTranslator.tsx?");

/***/ }),

/***/ "./client/containers/lists/TodoListWithData/TodoListWithData.tsx":
/*!***********************************************************************!*\
  !*** ./client/containers/lists/TodoListWithData/TodoListWithData.tsx ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\nvar todos_redux_actions_1 = __webpack_require__(/*! ../../../../data/todos/redux/todos.redux.actions */ \"./data/todos/redux/todos.redux.actions.ts\");\nvar TodosLocalStorage_1 = __webpack_require__(/*! ../../../../data/todos/TodosStorage/TodosLocalStorage */ \"./data/todos/TodosStorage/TodosLocalStorage.ts\");\nvar TodoList_1 = __webpack_require__(/*! ../../../components/molecules/TodoList/TodoList */ \"./client/components/molecules/TodoList/TodoList.tsx\");\nvar TodoListWithData = (function (_super) {\n    __extends(TodoListWithData, _super);\n    function TodoListWithData() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    TodoListWithData.prototype.componentDidMount = function () {\n        this.props.addTodos(TodosLocalStorage_1.default.getTodos());\n    };\n    TodoListWithData.prototype.render = function () {\n        var todos = this.props.todos;\n        if (todos && todos[0]) {\n            return (React.createElement(TodoList_1.default, { todos: todos }));\n        }\n        return null;\n    };\n    return TodoListWithData;\n}(React.Component));\nexports.default = react_redux_1.connect(function (_a) {\n    var todosReducer = _a.todosReducer;\n    return {\n        todos: todosReducer.todos,\n    };\n}, {\n    addTodos: todos_redux_actions_1.addTodos,\n})(TodoListWithData);\n\n\n//# sourceURL=webpack:///./client/containers/lists/TodoListWithData/TodoListWithData.tsx?");

/***/ }),

/***/ "./client/containers/overlays/Loading/Loading.tsx":
/*!********************************************************!*\
  !*** ./client/containers/overlays/Loading/Loading.tsx ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar withTranslator_1 = __webpack_require__(/*! ../../decorators/withTranslator */ \"./client/containers/decorators/withTranslator.tsx\");\nvar Loading = (function (_super) {\n    __extends(Loading, _super);\n    function Loading() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    Loading.prototype.render = function () {\n        var t = this.props.t;\n        return (React.createElement(\"div\", null, t('Loading', 'service') + \"...\"));\n    };\n    return Loading;\n}(React.Component));\nexports.default = withTranslator_1.default(Loading);\n\n\n//# sourceURL=webpack:///./client/containers/overlays/Loading/Loading.tsx?");

/***/ }),

/***/ "./client/containers/portals/AppPortal/AppPortal.tsx":
/*!***********************************************************!*\
  !*** ./client/containers/portals/AppPortal/AppPortal.tsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar react_dom_1 = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\nvar AppPortal = (function (_super) {\n    __extends(AppPortal, _super);\n    function AppPortal(props) {\n        var _this = _super.call(this, props) || this;\n        _this.domNode = document.body;\n        return _this;\n    }\n    AppPortal.prototype.render = function () {\n        return (react_dom_1.createPortal(this.props.children, this.domNode));\n    };\n    return AppPortal;\n}(React.Component));\nexports.default = AppPortal;\n\n\n//# sourceURL=webpack:///./client/containers/portals/AppPortal/AppPortal.tsx?");

/***/ }),

/***/ "./client/pages/Error/Error.tsx":
/*!**************************************!*\
  !*** ./client/pages/Error/Error.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar NotFound_1 = __webpack_require__(/*! ../NotFound/NotFound */ \"./client/pages/NotFound/NotFound.tsx\");\nvar Error = (function (_super) {\n    __extends(Error, _super);\n    function Error() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    Error.prototype.render = function () {\n        console.log(this.props);\n        if (this.props.code === 404) {\n            return React.createElement(NotFound_1.default, null);\n        }\n        return (React.createElement(\"div\", null,\n            \"error \",\n            this.props.message));\n    };\n    return Error;\n}(React.Component));\nexports.default = Error;\n\n\n//# sourceURL=webpack:///./client/pages/Error/Error.tsx?");

/***/ }),

/***/ "./client/pages/Home/Home.tsx":
/*!************************************!*\
  !*** ./client/pages/Home/Home.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar Header_1 = __webpack_require__(/*! ../../components/atomes/Header/Header */ \"./client/components/atomes/Header/Header.tsx\");\nvar PageTemplate_1 = __webpack_require__(/*! ../../components/templates/PageTemplate/PageTemplate */ \"./client/components/templates/PageTemplate/PageTemplate.tsx\");\nvar TodoListWithControls_1 = __webpack_require__(/*! ../../components/organismes/TodoListWithControls/TodoListWithControls */ \"./client/components/organismes/TodoListWithControls/TodoListWithControls.tsx\");\nvar Home = (function (_super) {\n    __extends(Home, _super);\n    function Home(props) {\n        var _this = _super.call(this, props) || this;\n        _this.getHeader = _this.getHeader.bind(_this);\n        return _this;\n    }\n    Home.prototype.getHeader = function () {\n        if (this.props.templateProps && this.props.templateProps.hasOwnProperty('header')) {\n            return this.props.templateProps.header;\n        }\n        return Header_1.default;\n    };\n    Home.prototype.render = function () {\n        return (React.createElement(PageTemplate_1.default, { Header: this.getHeader(), pageName: this.props.pageName },\n            React.createElement(TodoListWithControls_1.default, null)));\n    };\n    return Home;\n}(React.PureComponent));\nexports.default = Home;\nexports.meta = {\n    title: 'This is an atomic TODO app',\n};\n\n\n//# sourceURL=webpack:///./client/pages/Home/Home.tsx?");

/***/ }),

/***/ "./client/pages/NotFound/NotFound.tsx":
/*!********************************************!*\
  !*** ./client/pages/NotFound/NotFound.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar NotFound = (function (_super) {\n    __extends(NotFound, _super);\n    function NotFound() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    NotFound.prototype.render = function () {\n        return React.createElement(\"div\", null, \"not found!\");\n    };\n    return NotFound;\n}(React.Component));\nexports.default = NotFound;\n\n\n//# sourceURL=webpack:///./client/pages/NotFound/NotFound.tsx?");

/***/ }),

/***/ "./client/pages/Test/Test.tsx":
/*!************************************!*\
  !*** ./client/pages/Test/Test.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar TestContainer_1 = __webpack_require__(/*! ../../containers/TestContainer */ \"./client/containers/TestContainer.tsx\");\nvar Test = (function (_super) {\n    __extends(Test, _super);\n    function Test() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    Test.prototype.render = function () {\n        return React.createElement(TestContainer_1.default, null);\n    };\n    return Test;\n}(React.Component));\nexports.default = Test;\n\n\n//# sourceURL=webpack:///./client/pages/Test/Test.tsx?");

/***/ }),

/***/ "./client/utils/ApplicationCookie/ApplicationCookie.ts":
/*!*************************************************************!*\
  !*** ./client/utils/ApplicationCookie/ApplicationCookie.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Cookie_1 = __webpack_require__(/*! ../Cookie/Cookie */ \"./client/utils/Cookie/Cookie.ts\");\nvar ClientEnvironment_1 = __webpack_require__(/*! ../ClientEnvironment/ClientEnvironment */ \"./client/utils/ClientEnvironment/ClientEnvironment.ts\");\nvar ApplicationCookie = (function (_super) {\n    __extends(ApplicationCookie, _super);\n    function ApplicationCookie() {\n        var _this = _super.call(this) || this;\n        _this.setThemeCookieIfNew = _this.setThemeCookieIfNew.bind(_this);\n        _this.setLocaleCookieIfNew = _this.setLocaleCookieIfNew.bind(_this);\n        return _this;\n    }\n    ApplicationCookie.prototype.setLocaleCookie = function (locale) {\n        _super.prototype.set.call(this, 'locale', locale, '', ClientEnvironment_1.default.maxAgeForLangCookie);\n    };\n    ApplicationCookie.prototype.getLocaleCookie = function () {\n        return _super.prototype.get.call(this, 'locale');\n    };\n    ApplicationCookie.prototype.setLocaleCookieIfNew = function (locale) {\n        if (this.getLocaleCookie() !== locale) {\n            this.setLocaleCookie(locale);\n        }\n    };\n    ApplicationCookie.prototype.setThemeCookie = function (theme) {\n        _super.prototype.set.call(this, 'theme', theme, '', ClientEnvironment_1.default.maxAgeForThemeCookie);\n    };\n    ApplicationCookie.prototype.getThemeCookie = function () {\n        return this.get('theme');\n    };\n    ApplicationCookie.prototype.setThemeCookieIfNew = function (theme) {\n        if (this.getThemeCookie() !== theme) {\n            this.setThemeCookie(theme);\n        }\n    };\n    return ApplicationCookie;\n}(Cookie_1.default));\nexports.default = ApplicationCookie;\n\n\n//# sourceURL=webpack:///./client/utils/ApplicationCookie/ApplicationCookie.ts?");

/***/ }),

/***/ "./client/utils/ClientEnvironment/ClientEnvironment.ts":
/*!*************************************************************!*\
  !*** ./client/utils/ClientEnvironment/ClientEnvironment.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ApplicationConfig_1 = __webpack_require__(/*! ../../../server/utils/ApplicationConfig/ApplicationConfig */ \"./server/utils/ApplicationConfig/ApplicationConfig.ts\");\nvar ClientEnvironment = (function (_super) {\n    __extends(ClientEnvironment, _super);\n    function ClientEnvironment(cookieConnector) {\n        var _this = _super.call(this) || this;\n        _this.cookieConnector = cookieConnector;\n        return _this;\n    }\n    ClientEnvironment.prototype.getLocale = function () {\n        return ClientEnvironment.getCheckedLocale(this.cookieConnector.getLocaleCookie());\n    };\n    ClientEnvironment.prototype.getCookieConnector = function () {\n        return this.cookieConnector;\n    };\n    return ClientEnvironment;\n}(ApplicationConfig_1.default));\nexports.default = ClientEnvironment;\n\n\n//# sourceURL=webpack:///./client/utils/ClientEnvironment/ClientEnvironment.ts?");

/***/ }),

/***/ "./client/utils/Cookie/Cookie.ts":
/*!***************************************!*\
  !*** ./client/utils/Cookie/Cookie.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Cookie = (function () {\n    function Cookie() {\n        this.cookiesProvider = __webpack_require__(/*! js-cookie */ \"./node_modules/js-cookie/src/js.cookie.js\");\n    }\n    Cookie.prototype.get = function (key) {\n        return this.cookiesProvider.get(key);\n    };\n    Cookie.prototype.remove = function (key, domain) {\n        var removeOptions = {};\n        if (domain) {\n            removeOptions.domain = domain;\n        }\n        this.cookiesProvider.remove(key, removeOptions);\n    };\n    Cookie.prototype.set = function (key, value, domain, hours, path) {\n        var options = { path: path, domain: domain };\n        if (hours) {\n            options.expires = hours / 24;\n        }\n        this.cookiesProvider.set(key, value, options);\n    };\n    return Cookie;\n}());\nexports.default = Cookie;\n\n\n//# sourceURL=webpack:///./client/utils/Cookie/Cookie.ts?");

/***/ }),

/***/ "./client/utils/http.ts":
/*!******************************!*\
  !*** ./client/utils/http.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar index_1 = __webpack_require__(/*! axios/index */ \"./node_modules/axios/index.js\");\nexports.getRequest = function (url, params) {\n    if (params === void 0) { params = {}; }\n    return index_1.default.get(url, {\n        params: params,\n    })\n        .then(function (response) {\n        return response.data;\n    });\n};\n\n\n//# sourceURL=webpack:///./client/utils/http.ts?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const defaultLocale = 'en';\nconst defaultTheme = 'white';\n\nconst getDefaultTheme = () => defaultTheme;\nconst getDefaultLocale = () => defaultLocale;\n\nconst getAllowedThemes = () => (\n  new Set()\n    .add(getDefaultTheme())\n    .add('dark')\n    .add('white')\n);\n\nconst getAllowedLocales = () => (\n  new Set()\n    .add(getDefaultLocale())\n    .add('en')\n    .add('ru')\n    .add('zh')\n    .add('fi-FI')\n);\n\nconst getThemeFileName = (prefix, themeName, ext = 'css') => `${prefix}.${themeName}.${ext}`;\n\nconst getThemesWebpackConfig = (prefix, ext = 'css') => {\n  const result = [];\n  getAllowedThemes().forEach((themeName) => {\n    result.push({\n      fileName: getThemeFileName(prefix, themeName, ext),\n      variables: {\n        theme: themeName,\n      },\n    });\n  });\n  return result;\n};\n\nmodule.exports = {\n  getDefaultTheme,\n  getThemeFileName,\n  getDefaultLocale,\n  getAllowedThemes,\n  getAllowedLocales,\n  getThemesWebpackConfig,\n};\n\n\n//# sourceURL=webpack:///./config.js?");

/***/ }),

/***/ "./data/redux.reducers.ts":
/*!********************************!*\
  !*** ./data/redux.reducers.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\nvar todos_redux_reducer_1 = __webpack_require__(/*! ./todos/redux/todos.redux.reducer */ \"./data/todos/redux/todos.redux.reducer.ts\");\nvar app_redux_reducer_1 = __webpack_require__(/*! ../client/containers/App/app.redux.reducer */ \"./client/containers/App/app.redux.reducer.ts\");\nvar reducers = {\n    appReducer: app_redux_reducer_1.default,\n    todosReducer: todos_redux_reducer_1.default,\n};\nexports.default = redux_1.combineReducers(reducers);\n\n\n//# sourceURL=webpack:///./data/redux.reducers.ts?");

/***/ }),

/***/ "./data/redux.sagas.ts":
/*!*****************************!*\
  !*** ./data/redux.sagas.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\nvar effects_1 = __webpack_require__(/*! redux-saga/effects */ \"./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js\");\nvar todos_saga_watchers_1 = __webpack_require__(/*! ./todos/sagas/todos.saga.watchers */ \"./data/todos/sagas/todos.saga.watchers.ts\");\nvar app_saga_watchers_1 = __webpack_require__(/*! ../client/containers/App/app.saga.watchers */ \"./client/containers/App/app.saga.watchers.ts\");\nfunction rootSaga() {\n    var sagas, e_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                sagas = []\n                    .concat(todos_saga_watchers_1.default)\n                    .concat(app_saga_watchers_1.default);\n                return [4, effects_1.all(sagas)];\n            case 1:\n                _a.sent();\n                return [3, 3];\n            case 2:\n                e_1 = _a.sent();\n                console.log('rootSaga error:', e_1);\n                throw e_1;\n            case 3: return [2];\n        }\n    });\n}\nexports.default = rootSaga;\n\n\n//# sourceURL=webpack:///./data/redux.sagas.ts?");

/***/ }),

/***/ "./data/todos/TodosStorage/TodosLocalStorage.ts":
/*!******************************************************!*\
  !*** ./data/todos/TodosStorage/TodosLocalStorage.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TodosLocalStorage = (function () {\n    function TodosLocalStorage() {\n    }\n    TodosLocalStorage.prototype.getTodos = function () {\n        try {\n            var todos = JSON.parse(localStorage.getItem(TodosLocalStorage.storageKey));\n            if (!todos) {\n                throw new Error('no todos stored in local storage!');\n            }\n            return todos;\n        }\n        catch (e) {\n            return [];\n        }\n    };\n    TodosLocalStorage.prototype.setTodos = function (todos) {\n        localStorage.setItem(TodosLocalStorage.storageKey, JSON.stringify(todos));\n    };\n    TodosLocalStorage.storageKey = 'todos';\n    return TodosLocalStorage;\n}());\nexports.default = new TodosLocalStorage();\n\n\n//# sourceURL=webpack:///./data/todos/TodosStorage/TodosLocalStorage.ts?");

/***/ }),

/***/ "./data/todos/redux/todos.redux.actions.ts":
/*!*************************************************!*\
  !*** ./data/todos/redux/todos.redux.actions.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar todos_redux_events_1 = __webpack_require__(/*! ./todos.redux.events */ \"./data/todos/redux/todos.redux.events.ts\");\nexports.addTodos = function (todos) {\n    return {\n        type: todos_redux_events_1.default.ADD_TODOS,\n        payload: {\n            todos: todos,\n        },\n    };\n};\nexports.addTodo = function (todo) {\n    return {\n        type: todos_redux_events_1.default.ADD_TODO,\n        payload: {\n            todo: todo,\n        },\n    };\n};\nexports.deleteTodo = function (id) {\n    return {\n        type: todos_redux_events_1.default.DELETE_TODO,\n        payload: {\n            id: id,\n        },\n    };\n};\nexports.triggerDoneTodo = function (id) {\n    return {\n        type: todos_redux_events_1.default.TRIGGER_DONE_TODO,\n        payload: {\n            id: id,\n        },\n    };\n};\n\n\n//# sourceURL=webpack:///./data/todos/redux/todos.redux.actions.ts?");

/***/ }),

/***/ "./data/todos/redux/todos.redux.events.ts":
/*!************************************************!*\
  !*** ./data/todos/redux/todos.redux.events.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Events;\n(function (Events) {\n    Events[\"ADD_TODO\"] = \"ADD_TODO\";\n    Events[\"ADD_TODOS\"] = \"ADD_TODOS\";\n    Events[\"DELETE_TODO\"] = \"DELETE_TODO\";\n    Events[\"TRIGGER_DONE_TODO\"] = \"TRIGGER_DONE_TODO\";\n})(Events || (Events = {}));\nexports.default = Events;\n\n\n//# sourceURL=webpack:///./data/todos/redux/todos.redux.events.ts?");

/***/ }),

/***/ "./data/todos/redux/todos.redux.initial-state.ts":
/*!*******************************************************!*\
  !*** ./data/todos/redux/todos.redux.initial-state.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar initialState = {\n    todos: [],\n};\nexports.default = initialState;\nexports.createNewTodo = function (todoName) {\n    return {\n        id: (new Date()).getTime(),\n        name: todoName,\n        isDone: false,\n    };\n};\n\n\n//# sourceURL=webpack:///./data/todos/redux/todos.redux.initial-state.ts?");

/***/ }),

/***/ "./data/todos/redux/todos.redux.reducer.ts":
/*!*************************************************!*\
  !*** ./data/todos/redux/todos.redux.reducer.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar clone = __webpack_require__(/*! clone */ \"./node_modules/clone/clone.js\");\nvar todos_redux_events_1 = __webpack_require__(/*! ./todos.redux.events */ \"./data/todos/redux/todos.redux.events.ts\");\nvar todos_redux_initial_state_1 = __webpack_require__(/*! ./todos.redux.initial-state */ \"./data/todos/redux/todos.redux.initial-state.ts\");\nexports.default = (function (state, action) {\n    if (state === void 0) { state = todos_redux_initial_state_1.default; }\n    var newState = clone(state);\n    switch (action.type) {\n        case todos_redux_events_1.default.ADD_TODOS: {\n            var todos = action.payload.todos;\n            newState.todos = todos;\n            break;\n        }\n        case todos_redux_events_1.default.ADD_TODO: {\n            var todo = action.payload.todo;\n            newState.todos.unshift(todo);\n            break;\n        }\n        case todos_redux_events_1.default.DELETE_TODO: {\n            var id_1 = action.payload.id;\n            var newTodos_1 = [];\n            newState.todos.forEach(function (todo) {\n                if (todo.id !== id_1) {\n                    newTodos_1.push(todo);\n                }\n            });\n            newState.todos = newTodos_1;\n            break;\n        }\n        case todos_redux_events_1.default.TRIGGER_DONE_TODO: {\n            var id_2 = action.payload.id;\n            newState.todos.find(function (todo, index) {\n                if (todo.id === id_2) {\n                    newState.todos[index].isDone = !newState.todos[index].isDone;\n                    return true;\n                }\n                return false;\n            });\n            break;\n        }\n        default:\n            break;\n    }\n    return newState;\n});\n\n\n//# sourceURL=webpack:///./data/todos/redux/todos.redux.reducer.ts?");

/***/ }),

/***/ "./data/todos/sagas/todos.saga.events.ts":
/*!***********************************************!*\
  !*** ./data/todos/sagas/todos.saga.events.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Events;\n(function (Events) {\n    Events[\"ADD_TODOS_TO_STORE\"] = \"ADD_TODOS_TO_STORE\";\n})(Events || (Events = {}));\nexports.default = Events;\n\n\n//# sourceURL=webpack:///./data/todos/sagas/todos.saga.events.ts?");

/***/ }),

/***/ "./data/todos/sagas/todos.saga.watchers.ts":
/*!*************************************************!*\
  !*** ./data/todos/sagas/todos.saga.watchers.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar effects_1 = __webpack_require__(/*! redux-saga/effects */ \"./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js\");\nvar todos_saga_events_1 = __webpack_require__(/*! ./todos.saga.events */ \"./data/todos/sagas/todos.saga.events.ts\");\nvar todos_redux_events_1 = __webpack_require__(/*! ../redux/todos.redux.events */ \"./data/todos/redux/todos.redux.events.ts\");\nvar TodosLocalStorage_1 = __webpack_require__(/*! ../TodosStorage/TodosLocalStorage */ \"./data/todos/TodosStorage/TodosLocalStorage.ts\");\nfunction storeTodos() {\n    var state;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4, effects_1.select(function (s) { return s; })];\n            case 1:\n                state = _a.sent();\n                return [4, effects_1.call(TodosLocalStorage_1.default.setTodos, state.todosReducer.todos)];\n            case 2:\n                _a.sent();\n                return [4, (effects_1.put({\n                        type: todos_saga_events_1.default.ADD_TODOS_TO_STORE,\n                    }))];\n            case 3:\n                _a.sent();\n                return [2];\n        }\n    });\n}\nfunction watchTodoChanges() {\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4, effects_1.takeEvery([\n                    todos_redux_events_1.default.ADD_TODO,\n                    todos_redux_events_1.default.DELETE_TODO,\n                    todos_redux_events_1.default.TRIGGER_DONE_TODO,\n                ], storeTodos)];\n            case 1:\n                _a.sent();\n                return [2];\n        }\n    });\n}\nexports.default = [\n    watchTodoChanges(),\n];\n\n\n//# sourceURL=webpack:///./data/todos/sagas/todos.saga.watchers.ts?");

/***/ }),

/***/ "./data/translations/ClientTranslationsDto/ClientTranslationsDto.ts":
/*!**************************************************************************!*\
  !*** ./data/translations/ClientTranslationsDto/ClientTranslationsDto.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ClientTranslationsDto = (function () {\n    function ClientTranslationsDto() {\n        this.translations = {};\n        this.setTranslations = this.setTranslations.bind(this);\n        this.getTranslations = this.getTranslations.bind(this);\n        this.isExistTranslations = this.isExistTranslations.bind(this);\n    }\n    ClientTranslationsDto.prototype.setTranslations = function (locale, translationsForLocale) {\n        this.translations[locale] = translationsForLocale;\n    };\n    ClientTranslationsDto.prototype.isExistTranslations = function (locale) {\n        var translations = this.translations[locale];\n        return (translations && Object.keys(translations).length !== 0);\n    };\n    ClientTranslationsDto.prototype.getTranslations = function (locale) {\n        return this.isExistTranslations(locale)\n            ? this.translations[locale]\n            : {};\n    };\n    return ClientTranslationsDto;\n}());\nexports.default = ClientTranslationsDto;\n\n\n//# sourceURL=webpack:///./data/translations/ClientTranslationsDto/ClientTranslationsDto.ts?");

/***/ }),

/***/ "./data/translations/ClientTranslator/ClientTranslator.ts":
/*!****************************************************************!*\
  !*** ./data/translations/ClientTranslator/ClientTranslator.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar get = __webpack_require__(/*! get-value */ \"./node_modules/get-value/index.js\");\nvar ClientTranslator = (function () {\n    function ClientTranslator(translations) {\n        this.translations = {};\n        this.translations = translations;\n    }\n    ClientTranslator.prototype.getTranslator = function () {\n        var _this = this;\n        return function (id, domain) {\n            if (domain === void 0) { domain = ClientTranslator.defaultDomain; }\n            var translatedString = get(_this.translations, domain + \".\" + id);\n            if (translatedString) {\n                return translatedString;\n            }\n            return id;\n        };\n    };\n    ClientTranslator.defaultDomain = 'common';\n    return ClientTranslator;\n}());\nexports.default = ClientTranslator;\n\n\n//# sourceURL=webpack:///./data/translations/ClientTranslator/ClientTranslator.ts?");

/***/ }),

/***/ "./data/translations/http.ts":
/*!***********************************!*\
  !*** ./data/translations/http.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar http_1 = __webpack_require__(/*! ../../client/utils/http */ \"./client/utils/http.ts\");\nexports.getTranslations = function (locale) {\n    return http_1.getRequest(\"/translations/\" + locale);\n};\n\n\n//# sourceURL=webpack:///./data/translations/http.ts?");

/***/ }),

/***/ "./server/utils/ApplicationConfig/ApplicationConfig.ts":
/*!*************************************************************!*\
  !*** ./server/utils/ApplicationConfig/ApplicationConfig.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar config_1 = __webpack_require__(/*! ../../../config */ \"./config.js\");\nvar ApplicationConfig = (function () {\n    function ApplicationConfig() {\n    }\n    ApplicationConfig.getAllowedThemes = function () {\n        return config_1.getAllowedThemes();\n    };\n    ApplicationConfig.getAllowedLocales = function () {\n        return config_1.getAllowedLocales();\n    };\n    ApplicationConfig.getCheckedLocale = function (locale) {\n        if (!locale) {\n            return ApplicationConfig.defaultLocale;\n        }\n        return ApplicationConfig.isAcceptedLocale(locale)\n            ? locale\n            : ApplicationConfig.defaultLocale;\n    };\n    ApplicationConfig.isAcceptedLocale = function (locale) {\n        return ApplicationConfig.getAllowedLocales().has(locale);\n    };\n    ApplicationConfig.defaultTheme = config_1.getDefaultTheme();\n    ApplicationConfig.defaultLocale = config_1.getDefaultLocale();\n    ApplicationConfig.maxAgeForStatics = 60 * 60 * 24 * 31;\n    ApplicationConfig.maxAgeForLangCookie = 24 * 31;\n    ApplicationConfig.maxAgeForThemeCookie = 24 * 31;\n    return ApplicationConfig;\n}());\nexports.default = ApplicationConfig;\n\n\n//# sourceURL=webpack:///./server/utils/ApplicationConfig/ApplicationConfig.ts?");

/***/ }),

/***/ "./server/utils/ResponseBodyCreator/ResponseBodyCreator.tsx":
/*!******************************************************************!*\
  !*** ./server/utils/ResponseBodyCreator/ResponseBodyCreator.tsx ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\nvar react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\nvar Html_1 = __webpack_require__(/*! ../../../client/components/Html */ \"./client/components/Html.tsx\");\nvar App_1 = __webpack_require__(/*! ../../../client/containers/App/App */ \"./client/containers/App/App.tsx\");\nvar ClientTranslator_1 = __webpack_require__(/*! ../../../data/translations/ClientTranslator/ClientTranslator */ \"./data/translations/ClientTranslator/ClientTranslator.ts\");\nvar withTranslator_1 = __webpack_require__(/*! ../../../client/containers/decorators/withTranslator */ \"./client/containers/decorators/withTranslator.tsx\");\nvar app_redux_actions_1 = __webpack_require__(/*! ../../../client/containers/App/app.redux.actions */ \"./client/containers/App/app.redux.actions.ts\");\nvar ResponseBodyCreator = (function () {\n    function ResponseBodyCreator(env, translatorsConnector) {\n        this.context = {};\n        this.env = env;\n        this.translatorsConnector = translatorsConnector;\n        this.getContext = this.getContext.bind(this);\n    }\n    ResponseBodyCreator.getCurrentRoute = function (route) {\n        return {\n            id: route.id,\n            url: route.url,\n            pageName: route.pageName,\n            params: route.routerParams,\n        };\n    };\n    ResponseBodyCreator.prototype.fillStore = function (store) {\n        store.dispatch(app_redux_actions_1.setLocale(this.env.getLocale()));\n        store.dispatch(app_redux_actions_1.setCurrentRoute(ResponseBodyCreator.getCurrentRoute(this.env.getMatchedRouteWithParams())));\n    };\n    ResponseBodyCreator.prototype.create = function (store, manifest, reactRender) {\n        var translationsForLocale = this.translatorsConnector.getClientTranslationsForLocale(this.env.getLocale());\n        var t = new ClientTranslator_1.default(translationsForLocale).getTranslator();\n        var matchedRoute = this.env.getMatchedRouteWithParams();\n        var Component = matchedRoute.getComponent();\n        withTranslator_1.setTranslationsStorage(this.translatorsConnector.getClientTranslationsDto());\n        this.fillStore(store);\n        return reactRender(React.createElement(Html_1.default, { meta: {\n                title: t(matchedRoute.meta.title, 'meta'),\n            }, manifest: manifest, locale: this.env.getLocale(), state: store.getState(), theme: this.env.getDefaultTheme(), translationsForLocale: translationsForLocale },\n            React.createElement(react_redux_1.Provider, { store: store },\n                React.createElement(react_router_dom_1.StaticRouter, { location: matchedRoute.url, context: this.context },\n                    React.createElement(App_1.default, null,\n                        React.createElement(Component, __assign({}, matchedRoute.componentProps, { pageName: matchedRoute.pageName, templateProps: matchedRoute.templateProps })))))));\n    };\n    ResponseBodyCreator.prototype.getContext = function () {\n        return this.context;\n    };\n    return ResponseBodyCreator;\n}());\nexports.default = ResponseBodyCreator;\n\n\n//# sourceURL=webpack:///./server/utils/ResponseBodyCreator/ResponseBodyCreator.tsx?");

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** multi ./client/client.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /home/pavel/work/atomicTODO/client/client.tsx */\"./client/client.tsx\");\n\n\n//# sourceURL=webpack:///multi_./client/client.tsx?");

/***/ })

/******/ });