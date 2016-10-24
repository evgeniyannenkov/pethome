"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function getModules(){return{services:angular.module("services",[]),notifier:angular.module("notifier",[]),auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),advertiser:angular.module("advertiser",[]),app:angular.module("app",["services","notifier","auth","popup","advert","advertiser"])}}function advertServicesInit(t){t.factory("adverts",["api",function(t){return t.generate({options:{api_base:"/api/advert"},calls:{GET:{get:{url:"/:id"},getAll:{},remove:{url:"/:id/delete"}},POST:{create:{}},PUT:{update:{url:"/:id"}}}})}])}function advertiserServicesInit(t){t.factory("advertiser",["api",function(t){return t.generate({options:{api_base:"/api/advertiser"},calls:{GET:{remove:{url:"/:id/delete"},get:{url:"/:id"}},PUT:{update:{url:"/:id"}}}})}])}function apiGenServicesInit(t){t.factory("api",["$http",function(t){var e=function(){function e(t){return _classCallCheck(this,e),this.options={api_base:"",url:""},this.calls={},this.generate(t)}return _createClass(e,[{key:"generateCall",value:function(e,r){e=e.toUpperCase(),r.url=r.url||this.options.url;var a={method:e,url:""+this.options.api_base+r.url};return function(r){for(var i in r)r.hasOwnProperty(i)&&("data"!==i?a.url=a.url.replace(":"+i,r[i]):"GET"!==e&&(a.data=r[i]));return t(a)}}},{key:"generate",value:function(t){for(var e in t.options)t.options.hasOwnProperty(e)&&(this.options[e]=t.options[e]);for(var r in t.calls)if(t.calls.hasOwnProperty(r))for(var a in t.calls[r])t.calls[r].hasOwnProperty(a)&&(this.calls[a]=this.generateCall(r,t.calls[r][a]));return this.calls}}]),e}(),r=function(t){return new e(t)};return{generate:r}}])}function authServicesInit(t){t.factory("authService",["$http",function(t){var e=function(t,e){var r={};switch(t){case"login":r.method="POST",r.url="/auth/login";break;case"registration":r.method="POST",r.url="/auth";break;case"logout":r.method="GET",r.url="/auth/logout"}return e&&(r.data=e),r},r=function(r,a){var i=e(r,a);return new Promise(function(e,r){t(i).then(function(t){e(t)})["catch"](function(t){r(t)})})};return{authenticate:r}}])}function notifierServicesInit(t){t.factory("notify",["$timeout",function(t){var e=function(){function e(){_classCallCheck(this,e),this.message="",this.active=!1,this.state="inform",this.duration=0}return _createClass(e,[{key:"say",value:function(e,r,a){var i=this;this.active=!0,this.message=e||this.message,this.state=r||"inform",a=a||this.duration,a>0&&t(function(){i.active=!1},a)}},{key:"inform",value:function(t,e){this.say(t,"inform",e)}},{key:"error",value:function(t,e){this.say(t,"error",e)}},{key:"success",value:function(t,e){this.say(t,"success",e)}},{key:"close",value:function(){this.active=!1}}]),e}();return new e}])}function validationServicesInit(t){t.factory("validate",[function(){var t=function(){return/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i},e=function(){return/.*\S.*/};return{email:t,password:e}}])}function advertiserDirectivesInit(t){var e="/assets/templates";t.directive("advertiser",[function(){return{restrict:"A",templateUrl:e+"/advertiser-data.html",scope:{user_id:"@advertiser",edit:"=",remove:"="},controller:"advertiserCtrl",controllerAs:"advertiser"}}]),t.directive("advertiserEdit",[function(){return{restrict:"A",templateUrl:e+"/advertiser-edit.html",scope:{user:"=advertiserEdit",popupClose:"&"},controller:"advertiserEditCtrl",controllerAs:"editor"}}]),t.directive("advertiserRemove",[function(){return{restrict:"A",templateUrl:e+"/advertiser-remove.html",scope:{user:"=advertiserRemove",popupClose:"&popupClose"},controller:"advertiserRemoveCtrl",controllerAs:"remover"}}])}function advertDirectivesInit(t){var e="/assets/templates";t.directive("advertsFeed",[function(){return{restrict:"A",templateUrl:e+"/adverts-feed.html",scope:{user_id:"@advertsFeed",filter_enabled:"=enableFilter"},controller:"advertsFeedCtrl",controllerAs:"feed"}}]),t.directive("advertsFilter",[function(){return{restrict:"AE",templateUrl:e+"/adverts-filter.html",scope:{filter_fields:"=feedFilter"},controller:"advertsFeedFilterCtrl",controllerAs:"filter"}}]),t.directive("advert",[function(){return{restrict:"A",templateUrl:e+"/advert.html",scope:{advert:"="}}}]),t.directive("advertSingle",[function(){return{restrict:"A",templateUrl:e+"/advert-data.html",scope:{advert_id:"@advertSingle"},controller:"advertCtrl",controllerAs:"advert"}}]),t.directive("advertEdit",[function(){return{restrict:"A",templateUrl:e+"/advert-edit.html",scope:{advertData:"=advertEdit",popupClose:"&popupClose"},controller:"editAdvertCtrl",controllerAs:"advertEditor"}}])}function notifierDirectivesInit(t){var e="/assets/templates";t.directive("notify",[function(){return{restrict:"AE",templateUrl:e+"/notify.html",controller:"notifierCtrl",controllerAs:"notifier"}}])}function popupDirectivesInit(t){var e="/assets/templates";t.directive("popup",[function(){return{restrict:"A",transclude:{trigger:"popupTrigger",content:"popupContent"},templateUrl:e+"/popup.html",scope:{type:"@"},controller:"popupCtrl",controllerAs:"popup",link:function(t,e,r,a){e.on("click",function(e){angular.element(e.target).hasClass("popup")&&t.$apply(function(){a.close()})})}}}])}function advertControllersInit(t){t.controller("advertsFeedCtrl",["$http","$scope","adverts",function(t,e,r){var a=this;this.order="-publicationDate",this.getAdverts=function(e){e?t({method:"get",url:"/api/advertiser/"+e+"/adverts"}).then(function(t){t.data.adverts&&(a.adverts=t.data.adverts)})["catch"](function(t){console.log(t)}):r.getAll().then(function(t){t.data.adverts&&(a.adverts=t.data.adverts)})["catch"](function(t){console.log(t)})},this.getAdverts(e.user_id)}]),t.controller("advertsFeedFilterCtrl",[function(){this.defaults={gender:"",type:""}}]),t.controller("newAdvertCtrl",["adverts","notify","$timeout",function(t,e,r){var a=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){t.create({data:a.advert}).then(function(t){t.data.success&&(e.success("New Advert created.",900),setTimeout(function(){document.location.href="/advert/"+t.data.advert._id},1e3))})["catch"](function(t){console.log(t)})}}]),t.controller("editAdvertCtrl",["$scope","adverts",function(t,e){var r=this;this.temporaryData=JSON.parse(JSON.stringify(t.advertData)),this.save=function(){e.update({id:t.advertData._id,data:r.temporaryData}).then(function(e){e.data.success&&e.data.advert&&(t.advertData=e.data.advert,t.advertData.age&&(t.advertData.age=parseInt(t.advertData.age)),t.popupClose())})["catch"](function(t){console.log(t)})},this.cancel=function(){r.temporaryData=JSON.parse(JSON.stringify(t.advertData))}}]),t.controller("advertCtrl",["$scope","adverts",function(t,e){var r=this,a={};e.get({id:t.advert_id}).then(function(t){t.data.success&&t.data.advert&&(r.advertData=t.data.advert,r.advertData.age&&(r.advertData.age=parseInt(r.advertData.age)),a=JSON.parse(JSON.stringify(r.advertData)))})["catch"](function(t){console.log(t)})}]),t.controller("advertRemoveCtrl",["$scope","adverts",function(t,e){this.remove=function(t){e.remove({id:t}).then(function(t){t.data.success&&t.data.redirect?document.location.href=t.data.redirect:t.data.message&&console.log(t.data)})["catch"](function(t){console.log(t)})},this.cancel=function(){t.$parent.$parent.popup.active=!1}}])}function advertiserControllersInit(t){t.controller("advertiserCtrl",["advertiser","$scope",function(t,e){var r=this;t.get({id:e.user_id}).then(function(t){t.data.success&&(r.info=t.data.advertiser)})["catch"](function(t){console.log(t)})}]),t.controller("advertiserEditCtrl",["advertiser","$scope","notify",function(t,e,r){var a=this;this.temporary_data=JSON.parse(JSON.stringify(e.user)),this.cancel=function(){a.temporary_data=JSON.parse(JSON.stringify(e.user))},this.edit=function(){t.update({id:e.user._id,data:a.temporary_data}).then(function(t){t.data.success&&(r.success("Updated",1e3),e.user=JSON.parse(JSON.stringify(a.temporary_data)))})["catch"](function(t){console.log(t)})}}]),t.controller("advertiserRemoveCtrl",["advertiser","$scope",function(t,e){this.remove=function(){t.remove({id:e.user._id}).then(function(t){t.data.success&&(document.location.href="/")})["catch"](function(t){console.log(t)})}}])}function authControllersInit(t){t.controller("authCtrl",["$scope","$timeout","authService","validate","notify",function(t,e,r,a,i){var n=this;this.emailRegex=a.email(),this.passwordRegex=a.password(),this.checkForm=function(e){n.error=!t[e].$valid,n.validClass=t[e].$valid?"valid":"error"},this.submit=function(a){t[a].email.$setTouched(),t[a].password.$setTouched(),t[a].$valid?r.authenticate(a,{email:n.email,password:n.password}).then(function(r){r.data.success?(r.data.user.name?i.success("Hello, "+r.data.user.name):i.success("Logged in."),e(function(){n.responseClass="success",document.location.reload()},2e3)):(console.log(t[a]+": failed"),console.log(r))})["catch"](function(t){t.data.success?console.log(t):(i.error(t.data.message),e(function(){n.responseClass="fail"},500))}):i.error(a+" form invalid",2e3)},this.reset=function(){n.error=!1,n.validClass="",n.responseClass=""}}]),t.controller("logoutCtrl",["authService",function(t){this.logout=function(){t.authenticate("logout").then(function(t){t.data.success?document.location.reload():console.log(t.data.message)})["catch"](function(t){console.log(t)})}}])}function notifierControllersInit(t){t.controller("notifierCtrl",["notify","$scope",function(t,e){var r=this;this.close=function(){t.active=!1},e.$watch(function(){return t.active},function(e){r.state=!1,r.message=t.message,r.active=e,r.state=t.state})}])}function popupControllersInit(t){t.controller("popupCtrl",[function(){var t=this;this.close=function(){t.active=!1}}])}var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,r,a){return r&&t(e.prototype,r),a&&t(e,a),e}}(),Portfolio=function(){function t(e){_classCallCheck(this,t),this.modules=e}return _createClass(t,[{key:"initComponents",value:function(t,e){for(var r=0;r<e.length;r++)e[r](this.modules[t])}},{key:"init",value:function(t){for(var e in t)t.hasOwnProperty(e)&&this.initComponents(e,t[e])}}]),t}(),modules=getModules(),components={services:[apiGenServicesInit,authServicesInit,validationServicesInit,advertiserServicesInit,advertServicesInit],notifier:[notifierControllersInit,notifierServicesInit,notifierDirectivesInit],auth:[authControllersInit],popup:[popupControllersInit,popupDirectivesInit],advert:[advertControllersInit,advertDirectivesInit],advertiser:[advertiserControllersInit,advertiserDirectivesInit]},portfolio=new Portfolio(modules);portfolio.init(components);null//# sourceMappingURL=main.js.mapnull