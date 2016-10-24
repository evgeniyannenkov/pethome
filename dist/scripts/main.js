"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function getModules(){return{services:angular.module("services",[]),auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),advertiser:angular.module("advertiser",[]),app:angular.module("app",["services","auth","popup","advert","advertiser"])}}function advertServicesInit(t){t.factory("adverts",["api",function(t){return t.generate({options:{api_base:"/api/advert"},calls:{GET:{get:{url:"/:id"},getAll:{},remove:{url:"/:id/delete"}},POST:{create:{}},PUT:{update:{url:"/:id"}}}})}])}function advertiserServicesInit(t){t.factory("advertiser",["api",function(t){return t.generate({options:{api_base:"/api/advertiser"},calls:{GET:{remove:{url:"/:id/delete"},get:{url:"/:id"}},PUT:{update:{url:"/:id"}}}})}])}function apiGenServicesInit(t){t.factory("api",["$http",function(t){var e=function(){function e(t){return _classCallCheck(this,e),this.options={api_base:"",url:""},this.calls={},this.generate(t)}return _createClass(e,[{key:"generateCall",value:function(e,r){e=e.toUpperCase(),r.url=r.url||this.options.url;var a={method:e,url:""+this.options.api_base+r.url};return function(r){for(var n in r)r.hasOwnProperty(n)&&("data"!==n?a.url=a.url.replace(":"+n,r[n]):"GET"!==e&&(a.data=r[n]));return t(a)}}},{key:"generate",value:function(t){for(var e in t.options)t.options.hasOwnProperty(e)&&(this.options[e]=t.options[e]);for(var r in t.calls)if(t.calls.hasOwnProperty(r))for(var a in t.calls[r])t.calls[r].hasOwnProperty(a)&&(this.calls[a]=this.generateCall(r,t.calls[r][a]));return this.calls}}]),e}(),r=function(t){return new e(t)};return{generate:r}}])}function authServicesInit(t){t.factory("authService",["$http",function(t){var e=function(t,e){var r={};switch(t){case"login":r.method="POST",r.url="/auth/login";break;case"registration":r.method="POST",r.url="/auth";break;case"logout":r.method="GET",r.url="/auth/logout"}return e&&(r.data=e),r},r=function(r,a){var n=e(r,a);return new Promise(function(e,r){t(n).then(function(t){e(t)})["catch"](function(t){r(t)})})};return{authenticate:r}}])}function validationServicesInit(t){t.factory("validate",[function(){var t=function(){return/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i},e=function(){return/.*\S.*/};return{email:t,password:e}}])}function advertiserDirectivesInit(t){var e="/assets/templates";t.directive("advertiser",[function(){return{restrict:"A",templateUrl:e+"/advertiser-data.html",scope:{user_id:"@advertiser",edit:"="},controller:"advertiserCtrl",controllerAs:"advertiser"}}]),t.directive("advertiserEdit",[function(){return{restrict:"A",templateUrl:e+"/advertiser-edit.html",scope:{user:"=advertiserEdit",popupClose:"&"},controller:"advertiserEditCtrl",controllerAs:"editor"}}])}function advertDirectivesInit(t){var e="/assets/templates";t.directive("advertsFeed",[function(){return{restrict:"A",templateUrl:e+"/adverts-feed.html",scope:{user_id:"@advertsFeed",filter_enabled:"=enableFilter"},controller:"advertsFeedCtrl",controllerAs:"feed"}}]),t.directive("advertsFilter",[function(){return{restrict:"AE",templateUrl:e+"/adverts-filter.html",scope:{filter_fields:"=feedFilter"},controller:"advertsFeedFilterCtrl",controllerAs:"filter"}}]),t.directive("advert",[function(){return{restrict:"A",templateUrl:e+"/advert.html",scope:{advert:"="}}}]),t.directive("advertSingle",[function(){return{restrict:"A",templateUrl:e+"/edit-advert.html",scope:{advert_id:"@advertSingle"},controller:"editAdvertCtrl",controllerAs:"advertEditor"}}])}function popupDirectivesInit(t){var e="/assets/templates";t.directive("popup",[function(){return{restrict:"A",transclude:{trigger:"popupTrigger",content:"popupContent"},templateUrl:e+"/popup.html",scope:{type:"@"},controller:"popupCtrl",controllerAs:"popup"}}])}function advertControllersInit(t){t.controller("advertsFeedCtrl",["$http","$scope","adverts",function(t,e,r){var a=this;this.order="-publicationDate",this.getAdverts=function(e){e?t({method:"get",url:"/api/advertiser/"+e+"/adverts"}).then(function(t){t.data.adverts&&(a.adverts=t.data.adverts)})["catch"](function(t){console.log(t)}):r.getAll().then(function(t){t.data.adverts&&(a.adverts=t.data.adverts)})["catch"](function(t){console.log(t)})},this.getAdverts(e.user_id)}]),t.controller("advertsFeedFilterCtrl",[function(){this.defaults={gender:"",type:""}}]),t.controller("newAdvertCtrl",["adverts",function(t){var e=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){t.create({data:e.advert}).then(function(t){t.data.success&&(document.location.href="/advert/"+t.data.advert._id)})["catch"](function(t){console.log(t)})}}]),t.controller("editAdvertCtrl",["$scope","adverts",function(t,e){var r=this,a={};this.save=function(){e.update({id:t.advert_id,data:r.advert}).then(function(t){t.data.success&&t.data.advert&&(r.advert=t.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),a=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(t){console.log(t)})},this.reset=function(){r.advert=JSON.parse(JSON.stringify(a))},e.get({id:t.advert_id}).then(function(t){t.data.success&&t.data.advert&&(r.advert=t.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),a=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(t){console.log(t)})}]),t.controller("advertRemoveCtrl",["$scope","adverts",function(t,e){this.remove=function(t){e.remove({id:t}).then(function(t){t.data.success&&t.data.redirect?document.location.href=t.data.redirect:t.data.message&&console.log(t.data)})["catch"](function(t){console.log(t)})},this.cancel=function(){t.$parent.$parent.popup.active=!1}}])}function advertiserControllersInit(t){t.controller("advertiserCtrl",["advertiser","$scope",function(t,e){var r=this;t.get({id:e.user_id}).then(function(t){t.data.success&&(r.info=t.data.advertiser)})["catch"](function(t){console.log(t)})}]),t.controller("advertiserEditCtrl",["advertiser","$scope",function(t,e){var r=this;this.temporary_data=JSON.parse(JSON.stringify(e.user)),this.cancel=function(){r.temporary_data=JSON.parse(JSON.stringify(e.user))},this.edit=function(){t.update({id:e.user._id,data:r.temporary_data}).then(function(t){t.data.success&&(e.user=JSON.parse(JSON.stringify(r.temporary_data)),console.log(t.data))})["catch"](function(t){console.log(t)})}}]),t.controller("advertiserRemoveCtrl",["advertiser","$scope",function(t,e){this.remove=function(e){t.remove({id:e}).then(function(t){t.data.success&&(document.location.href="/")})["catch"](function(t){console.log(t)})},this.cancel=function(){e.$parent.$parent.popup.active=!1}}])}function authControllersInit(t){t.controller("authCtrl",["$scope","$timeout","authService","validate",function(t,e,r,a){var n=this;this.emailRegex=a.email(),this.passwordRegex=a.password(),this.checkForm=function(e){n.error=!t[e].$valid,n.validClass=t[e].$valid?"valid":"error"},this.submit=function(a){t[a].email.$setTouched(),t[a].password.$setTouched(),t[a].$valid?r.authenticate(a,{email:n.email,password:n.password}).then(function(r){r.data.success?e(function(){n.responseClass="success",document.location.reload()},2e3):(console.log(t[a]+": failed"),console.log(r))})["catch"](function(t){t.data.success?console.log(t):(e(function(){n.responseClass="fail"},500),console.log(t.data.message))}):console.log(t[a]+" form invalid")},this.reset=function(){n.error=!1,n.validClass="",n.responseClass=""}}]),t.controller("logoutCtrl",["authService",function(t){this.logout=function(){t.authenticate("logout").then(function(t){t.data.success?document.location.reload():console.log(t.data.message)})["catch"](function(t){console.log(t)})}}])}function popupControllersInit(t){t.controller("popupCtrl",[function(){var t=this;this.close=function(){t.active=!1}}])}var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,r,a){return r&&t(e.prototype,r),a&&t(e,a),e}}(),Portfolio=function(){function t(e){_classCallCheck(this,t),this.modules=e}return _createClass(t,[{key:"initComponents",value:function(t,e){for(var r=0;r<e.length;r++)e[r](this.modules[t])}},{key:"init",value:function(t){for(var e in t)t.hasOwnProperty(e)&&this.initComponents(e,t[e])}}]),t}(),modules=getModules(),components={services:[apiGenServicesInit,authServicesInit,validationServicesInit,advertiserServicesInit,advertServicesInit],auth:[authControllersInit],popup:[popupControllersInit,popupDirectivesInit],advert:[advertControllersInit,advertDirectivesInit],advertiser:[advertiserControllersInit,advertiserDirectivesInit]},portfolio=new Portfolio(modules);portfolio.init(components);null//# sourceMappingURL=main.js.mapnull