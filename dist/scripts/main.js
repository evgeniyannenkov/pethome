"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function getModules(){return{services:angular.module("services",[]),auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),profile:angular.module("profile",[]),app:angular.module("app",["services","auth","popup","advert","profile"])}}function advertiserServicesInit(t){t.factory("advertiser",["$http",function(t){var e=function(){console.log(12345)};return{test:e}}])}function authServicesInit(t){t.factory("authService",["$http",function(t){var e=function(e,r){return new Promise(function(o,n){t({method:"post",url:e,data:r}).then(function(t){o(t)})["catch"](function(t){n(t)})})};return{authenticate:e}}])}function advertDirectivesInit(t){var e="/assets/templates";t.directive("advertsFeed",[function(){return{restrict:"A",templateUrl:e+"/advertsFeed.html",scope:{user_id:"@advertsFeed"}}}]),t.directive("advert",[function(){return{restrict:"A",templateUrl:e+"/advert.html",scope:{advert:"="}}}]),t.directive("advertSingle",[function(){return{restrict:"A",templateUrl:e+"/edit-advert.html",scope:{advert_id:"@advertSingle"},controller:"editAdvertCtrl",controllerAs:"advertEditor"}}])}function popupDirectivesInit(t){var e="/assets/templates";t.directive("popup",["$http",function(t){return{restrict:"A",transclude:{trigger:"popupTrigger",content:"popupContent"},templateUrl:e+"/popup.html",scope:{type:"@"}}}])}function advertControllersInit(t){t.controller("advertsFeedCtrl",["$http","$scope",function(t,e){var r=this;this.getAdverts=function(e){e?t({method:"get",url:"/advertiser/"+e+"/adverts"}).then(function(t){console.log(t),t.data.adverts&&(r.adverts=t.data.adverts)})["catch"](function(t){console.log(t)}):t({method:"get",url:"/advert"}).then(function(t){t.data.adverts&&(r.adverts=t.data.adverts)})["catch"](function(t){console.log(t)})},this.getAdverts(e.user_id)}]),t.controller("newAdvertCtrl",["$http",function(t){var e=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){t({method:"post",url:"/advert",data:e.advert}).then(function(t){console.log(t.data)})["catch"](function(t){console.log(t)})}}]),t.controller("editAdvertCtrl",["$http","$scope",function(t,e){var r=this,o={};this.getAdvert=function(e){t({method:"get",url:"/advert/api/"+e}).then(function(t){t.data.success&&t.data.advert&&(r.advert=t.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),o=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(t){console.log(t)})},this.getAdvert(e.advert_id),this.save=function(){t({method:"put",url:"/advert/api/"+e.advert_id,data:r.advert}).then(function(t){t.data.success&&t.data.advert&&(r.advert=t.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),o=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(t){console.log(t)})},this.reset=function(){r.advert=JSON.parse(JSON.stringify(o))}}])}function authControllersInit(t){t.controller("authCtrl",["$scope","$http","$timeout","authService",function(t,e,r,o){var n=this;this.emailRegex=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,this.passwordRegex=/.*\S.*/,this.checkForm=function(e){n.error=!t[e].$valid,n.validClass=t[e].$valid?"valid":"error"},this.submit=function(e){t[e].email.$setTouched(),t[e].password.$setTouched();var a="registration"===e?"/advertiser":"/advertiser/login";t[e].$valid?o.authenticate(a,{email:n.email,password:n.password}).then(function(o){o.data.success?r(function(){n.responseClass="success",document.location.reload()},3e3):(console.log(t[e]+": failed"),console.log(o))})["catch"](function(t){t.data.success?console.log(t):(r(function(){n.responseClass="fail"},3e3),console.log(t.data.message))}):console.log(t[e]+" form invalid")}}]),t.controller("logoutCtrl",["$http",function(t){this.logout=function(){t({method:"GET",url:"/advertiser/logout"}).then(function(t){t.data.success?document.location.reload():console.log(t.data.message)})["catch"](function(t){console.log(t)})}}])}function popupControllersInit(t){t.controller("popupCtrl",[function(){this.active=!1}])}function profileControllersInit(t){t.controller("profileSettingsCtrl",["advertiser",function(t){console.log(123),t.test()}])}var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,r,o){return r&&t(e.prototype,r),o&&t(e,o),e}}(),Portfolio=function(){function t(e){_classCallCheck(this,t),this.modules=e}return _createClass(t,[{key:"initComponents",value:function(t,e){for(var r=0;r<e.length;r++)e[r](this.modules[t])}},{key:"init",value:function(t){for(var e in t)t.hasOwnProperty(e)&&this.initComponents(e,t[e])}}]),t}(),modules=getModules(),components={services:[authServicesInit,advertiserServicesInit],auth:[authControllersInit],popup:[popupControllersInit,popupDirectivesInit],advert:[advertControllersInit,advertDirectivesInit],profile:[profileControllersInit]},portfolio=new Portfolio(modules);portfolio.init(components);
//# sourceMappingURL=main.js.map
