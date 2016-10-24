"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function getModules(){return{services:angular.module("services",[]),auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),advertiser:angular.module("advertiser",[]),app:angular.module("app",["services","auth","popup","advert","advertiser"])}}function advertServicesInit(e){e.service("adverts",["api",function(e){this.api=e.generate({options:{api_base:"/api/advert"},calls:{GET:{get:{url:"/:id"},getAll:{},remove:{url:"/:id/delete"}},POST:{create:{}},PUT:{update:{url:"/:id"}}}})}])}function advertiserServicesInit(e){e.service("advertiser",["api",function(e){this.api=e.generate({options:{api_base:"/api/advertiser"},calls:{GET:{remove:{url:"/:id/delete"},get:{url:"/:id"}},PUT:{update:{url:"/:id"}}}})}])}function apiGenServicesInit(e){e.factory("api",["$http",function(e){var t=function(){function t(e){return _classCallCheck(this,t),this.options={api_base:"",url:""},this.calls={},this.generate(e)}return _createClass(t,[{key:"generateCall",value:function(t,r){t=t.toUpperCase(),r.url=r.url||this.options.url;var a={method:t,url:""+this.options.api_base+r.url};return function(r){for(var n in r)r.hasOwnProperty(n)&&("data"!==n?a.url=a.url.replace(":"+n,r[n]):"GET"!==t&&(a.data=r[n]));return e(a)}}},{key:"generate",value:function(e){for(var t in e.options)e.options.hasOwnProperty(t)&&(this.options[t]=e.options[t]);for(var r in e.calls)if(e.calls.hasOwnProperty(r))for(var a in e.calls[r])e.calls[r].hasOwnProperty(a)&&(this.calls[a]=this.generateCall(r,e.calls[r][a]));return this.calls}}]),t}(),r=function(e){return new t(e)};return{generate:r}}])}function authServicesInit(e){e.factory("authService",["$http",function(e){var t=function(e,t){var r={};switch(e){case"login":r.method="POST",r.url="/auth/login";break;case"registration":r.method="POST",r.url="/auth";break;case"logout":r.method="GET",r.url="/auth/logout"}return t&&(r.data=t),r},r=function(r,a){var n=t(r,a);return new Promise(function(t,r){e(n).then(function(e){t(e)})["catch"](function(e){r(e)})})};return{authenticate:r}}])}function advertiserDirectivesInit(e){var t="/assets/templates";e.directive("advertiser",[function(){return{restrict:"A",templateUrl:t+"/advertiser-data.html",scope:{user_id:"@advertiser",edit:"="},controller:"advertiserCtrl",controllerAs:"advertiser"}}]),e.directive("advertiserEdit",[function(){return{restrict:"A",templateUrl:t+"/advertiser-edit.html",scope:{user:"=advertiserEdit"},controller:"advertiserEditCtrl",controllerAs:"editor"}}])}function advertDirectivesInit(e){var t="/assets/templates";e.directive("advertsFeed",[function(){return{restrict:"A",templateUrl:t+"/adverts-feed.html",scope:{user_id:"@advertsFeed",filter_enabled:"=enableFilter"},controller:"advertsFeedCtrl",controllerAs:"feed"}}]),e.directive("advertsFilter",[function(){return{restrict:"AE",templateUrl:t+"/adverts-filter.html",scope:{filter_fields:"=feedFilter"},controller:"advertsFeedFilterCtrl",controllerAs:"filter"}}]),e.directive("advert",[function(){return{restrict:"A",templateUrl:t+"/advert.html",scope:{advert:"="}}}]),e.directive("advertSingle",[function(){return{restrict:"A",templateUrl:t+"/edit-advert.html",scope:{advert_id:"@advertSingle"},controller:"editAdvertCtrl",controllerAs:"advertEditor"}}])}function popupDirectivesInit(e){var t="/assets/templates";e.directive("popup",[function(){return{restrict:"A",transclude:{trigger:"popupTrigger",content:"popupContent"},templateUrl:t+"/popup.html",scope:{type:"@"},controller:"popupCtrl",controllerAs:"popup"}}])}function advertControllersInit(e){e.controller("advertsFeedCtrl",["$http","$scope","adverts",function(e,t,r){var a=this;this.order="-publicationDate",this.getAdverts=function(t){t?e({method:"get",url:"/api/advertiser/"+t+"/adverts"}).then(function(e){e.data.adverts&&(a.adverts=e.data.adverts)})["catch"](function(e){console.log(e)}):r.getAll().then(function(e){e.data.adverts&&(a.adverts=e.data.adverts)})["catch"](function(e){console.log(e)})},this.getAdverts(t.user_id)}]),e.controller("advertsFeedFilterCtrl",[function(){this.defaults={gender:"",type:""}}]),e.controller("newAdvertCtrl",["adverts",function(e){var t=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){e.create({data:t.advert}).then(function(e){e.data.success&&(document.location.href="/advert/"+e.data.advert._id)})["catch"](function(e){console.log(e)})}}]),e.controller("editAdvertCtrl",["$scope","adverts",function(e,t){var r=this,a={};this.save=function(){t.update({id:e.advert_id,data:r.advert}).then(function(e){e.data.success&&e.data.advert&&(r.advert=e.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),a=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(e){console.log(e)})},this.reset=function(){r.advert=JSON.parse(JSON.stringify(a))},t.get({id:e.advert_id}).then(function(e){e.data.success&&e.data.advert&&(r.advert=e.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),a=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(e){console.log(e)})}]),e.controller("advertRemoveCtrl",["$scope","adverts",function(e,t){this.remove=function(e){t.remove({id:e}).then(function(e){e.data.success&&e.data.redirect?document.location.href=e.data.redirect:e.data.message&&console.log(e.data)})["catch"](function(e){console.log(e)})},this.cancel=function(){e.$parent.$parent.popup.active=!1}}])}function advertiserControllersInit(e){e.controller("advertiserCtrl",["advertiser","$scope",function(e,t){var r=this;e.api.get({id:t.user_id}).then(function(e){e.data.success&&(r.info=e.data.advertiser)})["catch"](function(e){console.log(e)})}]),e.controller("advertiserEditCtrl",["advertiser","$scope",function(e,t){this.edit=function(){e.api.update({id:t.user._id,data:t.user}).then(function(e){console.log(e.data)})["catch"](function(e){console.log(e)})}}]),e.controller("advertiserRemoveCtrl",["advertiser","$scope",function(e,t){this.remove=function(t){e.remove({id:t}).then(function(e){e.data.success&&(document.location.href="/")})["catch"](function(e){console.log(e)})},this.cancel=function(){t.$parent.$parent.popup.active=!1}}])}function authControllersInit(e){e.controller("authCtrl",["$scope","$timeout","authService",function(e,t,r){var a=this;this.emailRegex=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,this.passwordRegex=/.*\S.*/,this.checkForm=function(t){a.error=!e[t].$valid,a.validClass=e[t].$valid?"valid":"error"},this.submit=function(n){e[n].email.$setTouched(),e[n].password.$setTouched(),e[n].$valid?r.authenticate(n,{email:a.email,password:a.password}).then(function(r){r.data.success?t(function(){a.responseClass="success",document.location.reload()},2e3):(console.log(e[n]+": failed"),console.log(r))})["catch"](function(e){e.data.success?console.log(e):(t(function(){a.responseClass="fail"},500),console.log(e.data.message))}):console.log(e[n]+" form invalid")},this.reset=function(){a.error=!1,a.validClass="",a.responseClass=""}}]),e.controller("logoutCtrl",["authService",function(e){this.logout=function(){e.authenticate("logout").then(function(e){e.data.success?document.location.reload():console.log(e.data.message)})["catch"](function(e){console.log(e)})}}])}function popupControllersInit(e){e.controller("popupCtrl",[function(){var e=this;this.close=function(){e.active=!1}}])}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),Portfolio=function(){function e(t){_classCallCheck(this,e),this.modules=t}return _createClass(e,[{key:"initComponents",value:function(e,t){for(var r=0;r<t.length;r++)t[r](this.modules[e])}},{key:"init",value:function(e){for(var t in e)e.hasOwnProperty(t)&&this.initComponents(t,e[t])}}]),e}(),modules=getModules(),components={services:[apiGenServicesInit,authServicesInit,advertiserServicesInit,advertServicesInit],auth:[authControllersInit],popup:[popupControllersInit,popupDirectivesInit],advert:[advertControllersInit,advertDirectivesInit],advertiser:[advertiserControllersInit,advertiserDirectivesInit]},portfolio=new Portfolio(modules);portfolio.init(components);null//# sourceMappingURL=main.js.mapnull