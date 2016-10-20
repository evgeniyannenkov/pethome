"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function getModules(){return{services:angular.module("services",[]),auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),app:angular.module("app",["services","auth","popup","advert"])}}function authServicesInit(t){t.factory("authService",["$http",function(t){var e=function(e,r){return new Promise(function(o,a){t({method:"post",url:e,data:r}).then(function(t){o(t)})["catch"](function(t){a(t)})})};return{authenticate:e}}])}function advertDirectivesInit(t){var e="/assets/templates";t.directive("advertsFeed",[function(){return{restrict:"A",templateUrl:e+"/adverts-feed.html",scope:{user_id:"@advertsFeed",filter_enabled:"=enableFilter"},controller:"advertsFeedCtrl",controllerAs:"feed"}}]),t.directive("advertsFilter",[function(){return{restrict:"AE",templateUrl:e+"/adverts-filter.html",scope:{filter_fields:"=feedFilter"},controller:"advertsFeedFilterCtrl",controllerAs:"filter"}}]),t.directive("advert",[function(){return{restrict:"A",templateUrl:e+"/advert.html",scope:{advert:"="}}}]),t.directive("advertSingle",[function(){return{restrict:"A",templateUrl:e+"/edit-advert.html",scope:{advert_id:"@advertSingle"},controller:"editAdvertCtrl",controllerAs:"advertEditor"}}])}function popupDirectivesInit(t){var e="/assets/templates";t.directive("popup",["$http",function(t){return{restrict:"A",transclude:{trigger:"popupTrigger",content:"popupContent"},templateUrl:e+"/popup.html",scope:{type:"@"}}}])}function advertControllersInit(t){t.controller("advertsFeedCtrl",["$http","$scope",function(t,e){var r=this;this.order="-publicationDate",this.getAdverts=function(e){e?t({method:"get",url:"/api/advertiser/"+e+"/adverts"}).then(function(t){console.log(t),t.data.adverts&&(r.adverts=t.data.adverts)})["catch"](function(t){console.log(t)}):t({method:"get",url:"/api/advert"}).then(function(t){t.data.adverts&&(r.adverts=t.data.adverts)})["catch"](function(t){console.log(t)})},this.getAdverts(e.user_id)}]),t.controller("advertsFeedFilterCtrl",["$http","$scope",function(t,e){this.defaults={gender:"",type:""}}]),t.controller("newAdvertCtrl",["$http",function(t){var e=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){t({method:"post",url:"/api/advert",data:e.advert}).then(function(t){console.log(t.data)})["catch"](function(t){console.log(t)})}}]),t.controller("editAdvertCtrl",["$http","$scope",function(t,e){var r=this,o={};this.getAdvert=function(e){t({method:"get",url:"/api/advert/api/"+e}).then(function(t){t.data.success&&t.data.advert&&(r.advert=t.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),o=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(t){console.log(t)})},this.getAdvert(e.advert_id),this.save=function(){t({method:"put",url:"/api/advert/api/"+e.advert_id,data:r.advert}).then(function(t){t.data.success&&t.data.advert&&(r.advert=t.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),o=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(t){console.log(t)})},this.reset=function(){r.advert=JSON.parse(JSON.stringify(o))}}])}function authControllersInit(t){t.controller("authCtrl",["$scope","$http","$timeout","authService",function(t,e,r,o){var a=this;this.emailRegex=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,this.passwordRegex=/.*\S.*/,this.checkForm=function(e){a.error=!t[e].$valid,a.validClass=t[e].$valid?"valid":"error"},this.submit=function(e){t[e].email.$setTouched(),t[e].password.$setTouched();var n="registration"===e?"/api/advertiser":"/api/advertiser/login";t[e].$valid?o.authenticate(n,{email:a.email,password:a.password}).then(function(o){o.data.success?r(function(){a.responseClass="success",document.location.reload()},2e3):(console.log(t[e]+": failed"),console.log(o))})["catch"](function(t){t.data.success?console.log(t):(r(function(){a.responseClass="fail"},500),console.log(t.data.message))}):console.log(t[e]+" form invalid")},this.reset=function(){a.error=!1,a.validClass="",a.responseClass=""}}]),t.controller("logoutCtrl",["$http",function(t){this.logout=function(){t({method:"GET",url:"/api/advertiser/logout"}).then(function(t){t.data.success?document.location.reload():console.log(t.data.message)})["catch"](function(t){console.log(t)})}}])}function popupControllersInit(t){t.controller("popupCtrl",[function(){this.active=!1}])}var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,r,o){return r&&t(e.prototype,r),o&&t(e,o),e}}(),Portfolio=function(){function t(e){_classCallCheck(this,t),this.modules=e}return _createClass(t,[{key:"initComponents",value:function(t,e){for(var r=0;r<e.length;r++)e[r](this.modules[t])}},{key:"init",value:function(t){for(var e in t)t.hasOwnProperty(e)&&this.initComponents(e,t[e])}}]),t}(),modules=getModules(),components={services:[authServicesInit],auth:[authControllersInit],popup:[popupControllersInit,popupDirectivesInit],advert:[advertControllersInit,advertDirectivesInit]},portfolio=new Portfolio(modules);portfolio.init(components);null//# sourceMappingURL=main.js.mapnull