"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function getModules(){return{services:angular.module("services",[]),auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),advertiser:angular.module("advertiser",[]),profile:angular.module("profile",[]),app:angular.module("app",["services","auth","popup","advert","advertiser","profile"])}}function advertServicesInit(e){e.factory("adverts",["$http",function(e){var t=function(e){var t={},r="/api/advert";switch(e.type){case"get":t.method="get",t.url=r+"/"+e._id;break;case"getAll":t.method="get",t.url=r;break;case"update":t.method="put",t.url=r+"/"+e._id;break;case"create":t.method="post",t.url=""+r;break;case"remove":t.method="get",t.url=r+"/"+e._id+"/delete"}return e.requestData&&(t.data=e.requestData),t},r=function(r){var n=t(r);return e(n)},n=function(e){return r({type:"get",_id:e})},a=function(){return r({type:"getAll"})},o=function(e){return r({type:"create",requestData:e})},i=function(e,t){return r({type:"update",_id:e,requestData:t})},c=function(e){return r({type:"remove",_id:e})};return{get:n,getAll:a,create:o,update:i,remove:c}}])}function advertiserServicesInit(e){e.factory("advertiser",["$http",function(e){var t=function(e){var t={},r="/api/advertiser";switch(e.type){case"get":break;case"update":break;case"remove":t.method="GET",t.url=r+"/"+e.id+"/delete"}return e.bodyData&&(t.data=e.bodyData),t},r=function(r){var n=t(r);return e(n)},n=function(){},a=function(){},o=function(e){return r({type:"remove",id:e})},i=function(){};return{get:n,save:a,remove:o,update:i}}])}function apiGenServicesInit(e){e.factory("apiGen",["$http",function(e){var t={api_base:"/api"},r={},n=function(r,n){var a={method:r,url:""+t.api_base+n.url};return n.data&&(a.data=n.data),function(t){for(var r in t)t.hasOwnProperty(r)&&(a.url=a.url.replace(":"+r,t[r]));return e(a)}},a=function(e){for(var a in e.options)e.options.hasOwnProperty(a)&&(t[a]=e.options[a]);for(var o in e.calls)if(e.calls.hasOwnProperty(o))for(var i in e.calls[o])e.calls[o].hasOwnProperty(i)&&(r[i]=n(o,e.calls[o][i]));return r};return{generate:a}}])}function authServicesInit(e){e.factory("authService",["$http",function(e){var t=function(e,t){var r={};switch(e){case"login":r.method="POST",r.url="/auth/login";break;case"registration":r.method="POST",r.url="/auth";break;case"logout":r.method="GET",r.url="/auth/logout"}return t&&(r.data=t),r},r=function(r,n){var a=t(r,n);return new Promise(function(t,r){e(a).then(function(e){t(e)})["catch"](function(e){r(e)})})};return{authenticate:r}}])}function advertDirectivesInit(e){var t="/assets/templates";e.directive("advertsFeed",[function(){return{restrict:"A",templateUrl:t+"/adverts-feed.html",scope:{user_id:"@advertsFeed",filter_enabled:"=enableFilter"},controller:"advertsFeedCtrl",controllerAs:"feed"}}]),e.directive("advertsFilter",[function(){return{restrict:"AE",templateUrl:t+"/adverts-filter.html",scope:{filter_fields:"=feedFilter"},controller:"advertsFeedFilterCtrl",controllerAs:"filter"}}]),e.directive("advert",[function(){return{restrict:"A",templateUrl:t+"/advert.html",scope:{advert:"="}}}]),e.directive("advertSingle",[function(){return{restrict:"A",templateUrl:t+"/edit-advert.html",scope:{advert_id:"@advertSingle"},controller:"editAdvertCtrl",controllerAs:"advertEditor"}}])}function popupDirectivesInit(e){var t="/assets/templates";e.directive("popup",["$http",function(e){return{restrict:"A",transclude:{trigger:"popupTrigger",content:"popupContent"},templateUrl:t+"/popup.html",scope:{type:"@"},controller:"popupCtrl",controllerAs:"popup"}}])}function advertControllersInit(e){e.controller("advertsFeedCtrl",["$http","$scope","adverts","apiGen",function(e,t,r,n){var a=this;this.order="-publicationDate";var o=n.generate({options:{api_base:"/api/advert"},calls:{get:{getAll:{url:""},get:{url:"/:id"}}}});o.get({id:"5806353a39c58118b4f5db2e"}).then(function(e){console.log(e)}),this.getAdverts=function(t){t?e({method:"get",url:"/api/advertiser/"+t+"/adverts"}).then(function(e){console.log(e),e.data.adverts&&(a.adverts=e.data.adverts)})["catch"](function(e){console.log(e)}):r.getAll().then(function(e){e.data.adverts&&(a.adverts=e.data.adverts)})["catch"](function(e){console.log(e)})},this.getAdverts(t.user_id)}]),e.controller("advertsFeedFilterCtrl",[function(){this.defaults={gender:"",type:""}}]),e.controller("newAdvertCtrl",["adverts",function(e){var t=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){e.create(t.advert).then(function(e){e.data.success&&(document.location.href="/advert/"+e.data.advert._id)})["catch"](function(e){console.log(e)})}}]),e.controller("editAdvertCtrl",["$scope","adverts",function(e,t){var r=this,n={};this.save=function(){t.update(e.advert_id,r.advert).then(function(e){e.data.success&&e.data.advert&&(r.advert=e.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),n=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(e){console.log(e)})},this.reset=function(){r.advert=JSON.parse(JSON.stringify(n))},t.get(e.advert_id).then(function(e){e.data.success&&e.data.advert&&(r.advert=e.data.advert,r.advert.age&&(r.advert.age=parseInt(r.advert.age)),n=JSON.parse(JSON.stringify(r.advert)))})["catch"](function(e){console.log(e)})}]),e.controller("advertRemoveCtrl",["$scope","adverts",function(e,t){this.remove=function(e){t.remove(e).then(function(e){e.data.success&&e.data.redirect?document.location.href=e.data.redirect:e.data.message&&console.log(e.data)})["catch"](function(e){console.log(e)})},this.cancel=function(){e.$parent.$parent.popup.active=!1}}])}function advertiserControllersInit(e){e.controller("advertiserRemoveCtrl",["advertiser","$scope",function(e,t){this.remove=function(t){e.remove(t).then(function(e){e.data.success&&(document.location.href="/")})["catch"](function(e){console.log(e)})},this.cancel=function(){t.$parent.$parent.popup.active=!1}}])}function authControllersInit(e){e.controller("authCtrl",["$scope","$timeout","authService",function(e,t,r){var n=this;this.emailRegex=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,this.passwordRegex=/.*\S.*/,this.checkForm=function(t){n.error=!e[t].$valid,n.validClass=e[t].$valid?"valid":"error"},this.submit=function(a){e[a].email.$setTouched(),e[a].password.$setTouched(),e[a].$valid?r.authenticate(a,{email:n.email,password:n.password}).then(function(r){r.data.success?t(function(){n.responseClass="success",document.location.reload()},2e3):(console.log(e[a]+": failed"),console.log(r))})["catch"](function(e){e.data.success?console.log(e):(t(function(){n.responseClass="fail"},500),console.log(e.data.message))}):console.log(e[a]+" form invalid")},this.reset=function(){n.error=!1,n.validClass="",n.responseClass=""}}]),e.controller("logoutCtrl",["authService",function(e){this.logout=function(){e.authenticate("logout").then(function(e){e.data.success?document.location.reload():console.log(e.data.message)})["catch"](function(e){console.log(e)})}}])}function popupControllersInit(e){e.controller("popupCtrl",[function(){this.active=!1}])}function profileControllersInit(e){e.controller("profileSettingsCtrl",["advertiser",function(e){}])}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),Portfolio=function(){function e(t){_classCallCheck(this,e),this.modules=t}return _createClass(e,[{key:"initComponents",value:function(e,t){for(var r=0;r<t.length;r++)t[r](this.modules[e])}},{key:"init",value:function(e){for(var t in e)e.hasOwnProperty(t)&&this.initComponents(t,e[t])}}]),e}(),modules=getModules(),components={services:[apiGenServicesInit,authServicesInit,advertiserServicesInit,advertServicesInit],auth:[authControllersInit],popup:[popupControllersInit,popupDirectivesInit],advert:[advertControllersInit,advertDirectivesInit],advertiser:[advertiserControllersInit],profile:[profileControllersInit]},portfolio=new Portfolio(modules);portfolio.init(components);null//# sourceMappingURL=main.js.mapnull