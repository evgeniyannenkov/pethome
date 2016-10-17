"use strict";function _classCallCheck(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}function getModules(){return{auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),app:angular.module("app",["auth","popup","advert"])}}function advertDirectivesInit(t){var o="/assets/templates";t.directive("advertPost",["$http",function(t){return{restrict:"A",templateUrl:o+"/advert.html",scope:{advert:"="}}}])}function advertDirectivesInit(t){var o="/assets/templates";t.directive("authPopup",["$http",function(t){return{restrict:"A",templateUrl:o+"/authPopup.html",scope:{popup:"="}}}])}function advertControllersInit(t){t.controller("advertsFeedCtrl",["$http",function(t){var o=this;this.getAdverts=function(){t({method:"get",url:"/advert"}).then(function(t){t.data.adverts&&(o.adverts=t.data.adverts)})["catch"](function(t){console.log(t)})},this.getAdverts()}]),t.controller("newAdvertCtrl",["$http",function(t){var o=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){t({method:"post",url:"/advert",data:o.advert}).then(function(t){console.log(t.data)})["catch"](function(t){console.log(t)})}}])}function authControllersInit(t){t.controller("registrationCtrl",["$http",function(t){var o=this;this.registration=function(){t({method:"post",url:"/advertiser",data:{email:o.email,password:o.password}}).then(function(t){t.data.success?document.location.reload():(console.log("Registration: failed"),console.log(t))})["catch"](function(t){t.data.success===!1?console.log(t.data.message):console.log(t)})}}]),t.controller("loginCtrl",["$http",function(t){var o=this;this.login=function(){t({method:"post",url:"/advertiser/login",data:{email:o.email,password:o.password}}).then(function(t){t.data.success?document.location.reload():(console.log("Login: failed"),console.log(t))})["catch"](function(t){t.data.success===!1?console.log(t.data.message):console.log(t)})}}]),t.controller("logoutCtrl",["$http",function(t){this.logout=function(){t({method:"GET",url:"/advertiser/logout"}).then(function(t){t.data.success?document.location.reload():console.log(t.data.message)})["catch"](function(t){console.log(t)})}}])}function popupControllersInit(t){t.controller("popupCtrl",["$http",function(t){this.popup=function(){console.log(12345)}}])}var _createClass=function(){function t(t,o){for(var e=0;e<o.length;e++){var n=o[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(o,e,n){return e&&t(o.prototype,e),n&&t(o,n),o}}(),Portfolio=function(){function t(o){_classCallCheck(this,t),this.modules=o}return _createClass(t,[{key:"initComponents",value:function(t,o){for(var e=0;e<o.length;e++)o[e](this.modules[t])}},{key:"init",value:function(t){for(var o in t)t.hasOwnProperty(o)&&this.initComponents(o,t[o])}}]),t}(),modules=getModules(),components={auth:[authControllersInit],popup:[popupControllersInit],advert:[advertControllersInit,advertDirectivesInit]},portfolio=new Portfolio(modules);portfolio.init(components);
//# sourceMappingURL=main.js.map
