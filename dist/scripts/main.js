"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function getModules(){return{services:angular.module("services",[]),auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),advertiser:angular.module("advertiser",[]),app:angular.module("app",["services","auth","popup","advert","advertiser"])}}function advertServicesInit(t){t.factory("adverts",["$http","api",function(t,e){return e.generate({options:{api_base:"/api/advert"},calls:{GET:{get:{url:"/:id"},getAll:{},remove:{url:"/:id/delete"}},POST:{create:{}},PUT:{update:{url:"/:id"}}}})}])}function advertiserServicesInit(t){t.factory("advertiser",["api",function(t){return t.generate({options:{api_base:"/api/advertiser"},calls:{GET:{remove:{url:"/:id/delete"},get:{url:"/:id"}},PUT:{update:{url:"/:id"}}}})}])}function apiGenServicesInit(t){t.factory("api",["$http",function(t){var e={api_base:"",url:""},r={},a=function(r,a){r=r.toUpperCase(),a.url=a.url||e.url;var n={method:r,url:""+e.api_base+a.url};return function(e){for(var a in e)e.hasOwnProperty(a)&&("data"!==a?n.url=n.url.replace(":"+a,e[a]):"GET"!==r&&(n.data=e[a]));return t(n)}},n=function(t){for(var n in t.options)t.options.hasOwnProperty(n)&&(e[n]=t.options[n]);for(var o in t.calls)if(t.calls.hasOwnProperty(o))for(var i in t.calls[o])t.calls[o].hasOwnProperty(i)&&(r[i]=a(o,t.calls[o][i]));return r};return{generate:n}}])}function authServicesInit(t){t.factory("authService",["$http",function(t){var e=function(t,e){var r={};switch(t){case"login":r.method="POST",r.url="/auth/login";break;case"registration":r.method="POST",r.url="/auth";break;case"logout":r.method="GET",r.url="/auth/logout"}return e&&(r.data=e),r},r=function(r,a){var n=e(r,a);return new Promise(function(e,r){t(n).then(function(t){e(t)})["catch"](function(t){r(t)})})};return{authenticate:r}}])}function validationServicesInit(t){t.factory("validate",[function(){}])}function advertDirectivesInit(t){var e="/assets/templates";t.directive("advertsFeed",[function(){return{restrict:"A",templateUrl:e+"/adverts-feed.html",scope:{user_id:"@advertsFeed",filter_enabled:"=enableFilter"},controller:"advertsFeedCtrl",controllerAs:"feed"}}]),t.directive("advertsFilter",[function(){return{restrict:"AE",templateUrl:e+"/adverts-filter.html",scope:{filter_fields:"=feedFilter"},controller:"advertsFeedFilterCtrl",controllerAs:"filter"}}]),t.directive("advert",[function(){return{restrict:"A",templateUrl:e+"/advert.html",scope:{advert:"="}}}]),t.directive("advertSingle",[function(){return{restrict:"A",templateUrl:e+"/edit-advert.html",scope:{advert_id:"@advertSingle"},controller:"editAdvertCtrl",controllerAs:"advertEditor"}}])}function popupDirectivesInit(t){var e="/assets/templates";t.directive("popup",[function(){return{restrict:"A",transclude:{trigger:"popupTrigger",content:"popupContent"},templateUrl:e+"/popup.html",scope:{type:"@"},controller:"popupCtrl",controllerAs:"popup"}}])}function advertControllersInit(t){t.controller("advertsFeedCtrl",["$http","$scope","adverts",function(t,e,r){var a=this;this.order="-publicationDate",this.getAdverts=function(e){e?t({method:"get",url:"/api/advertiser/"+e+"/adverts"}).then(function(t){t.data.adverts&&(a.adverts=t.data.adverts)})["catch"](function(t){console.log(t)}):r.getAll().then(function(t){t.data.adverts&&(a.adverts=t.data.adverts)})["catch"](function(t){console.log(t)})},this.getAdverts(e.user_id)}]),t.controller("advertsFeedFilterCtrl",[function(){this.defaults={gender:"",type:""}}]),t.controller("newAdvertCtrl",["adverts",function(t){var e=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){t.create({data:e.advert}).then(function(t){t.data.success&&(document.location.href="/advert/"+t.data.advert._id)})["catch"](function(t){console.log(t)})}}]),t.controller("editAdvertCtrl",["$scope","adverts",function(t,e){var r=this,a={};this.save=function(){e.update({id:t.advert_id,data:r.advert}).then(function(t){t.data.success&&t.data.advert&&(r.advert=t.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),a=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(t){console.log(t)})},this.reset=function(){r.advert=JSON.parse(JSON.stringify(a))},e.get({id:t.advert_id}).then(function(t){t.data.success&&t.data.advert&&(r.advert=t.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),a=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(t){console.log(t)})}]),t.controller("advertRemoveCtrl",["$scope","adverts",function(t,e){this.remove=function(t){e.remove({id:t}).then(function(t){t.data.success&&t.data.redirect?document.location.href=t.data.redirect:t.data.message&&console.log(t.data)})["catch"](function(t){console.log(t)})},this.cancel=function(){t.$parent.$parent.popup.active=!1}}])}function advertiserControllersInit(t){t.controller("advertiserRemoveCtrl",["advertiser","$scope",function(t,e){this.remove=function(e){t.remove({id:e}).then(function(t){t.data.success&&(document.location.href="/")})["catch"](function(t){console.log(t)})},this.cancel=function(){e.$parent.$parent.popup.active=!1}}])}function authControllersInit(t){t.controller("authCtrl",["$scope","$timeout","authService",function(t,e,r){var a=this;this.emailRegex=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,this.passwordRegex=/.*\S.*/,this.checkForm=function(e){a.error=!t[e].$valid,a.validClass=t[e].$valid?"valid":"error"},this.submit=function(n){t[n].email.$setTouched(),t[n].password.$setTouched(),t[n].$valid?r.authenticate(n,{email:a.email,password:a.password}).then(function(r){r.data.success?e(function(){a.responseClass="success",document.location.reload()},2e3):(console.log(t[n]+": failed"),console.log(r))})["catch"](function(t){t.data.success?console.log(t):(e(function(){a.responseClass="fail"},500),console.log(t.data.message))}):console.log(t[n]+" form invalid")},this.reset=function(){a.error=!1,a.validClass="",a.responseClass=""}}]),t.controller("logoutCtrl",["authService",function(t){this.logout=function(){t.authenticate("logout").then(function(t){t.data.success?document.location.reload():console.log(t.data.message)})["catch"](function(t){console.log(t)})}}])}function popupControllersInit(t){t.controller("popupCtrl",[function(){var t=this;this.close=function(){t.active=!1}}])}var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,r,a){return r&&t(e.prototype,r),a&&t(e,a),e}}(),Portfolio=function(){function t(e){_classCallCheck(this,t),this.modules=e}return _createClass(t,[{key:"initComponents",value:function(t,e){for(var r=0;r<e.length;r++)e[r](this.modules[t])}},{key:"init",value:function(t){for(var e in t)t.hasOwnProperty(e)&&this.initComponents(e,t[e])}}]),t}(),modules=getModules(),components={services:[apiGenServicesInit,authServicesInit,validationServicesInit,advertiserServicesInit,advertServicesInit],auth:[authControllersInit],popup:[popupControllersInit,popupDirectivesInit],advert:[advertControllersInit,advertDirectivesInit],advertiser:[advertiserControllersInit]},portfolio=new Portfolio(modules);portfolio.init(components);
//# sourceMappingURL=main.js.map
