"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function getModules(){return{services:angular.module("services",[]),notifier:angular.module("notifier",[]),auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),advertiser:angular.module("advertiser",[]),config:angular.module("config",[]),translation:angular.module("translation",[]),app:angular.module("app",["pascalprecht.translate","services","notifier","auth","popup","advert","advertiser","config","translation"])}}function applicationConfig(t){t.config(["$translateProvider",function(t){var e=localStorage.preferred_language||"ru";t.useSanitizeValueStrategy("escape"),t.translations("en",{BUTTON_LANG_EN:"english",BUTTON_LANG_RU:"russian",SIGN_UP_BTN:"Sign Up",LOGIN_BTN:"Login",HOME_BTN:"Home",PROFILE_BTN:"Profile",LOGOUT_BTN:"Logout"}),t.translations("ru",{BUTTON_LANG_EN:"Английский",BUTTON_LANG_RU:"Русский",SIGN_UP_BTN:"Регистрация",LOGIN_BTN:"Вход",HOME_BTN:"Главная",PROFILE_BTN:"Профиль",LOGOUT_BTN:"Выход"}),t.preferredLanguage(e)}])}function advertServicesInit(t){t.factory("adverts",["api",function(t){return t.generate({options:{api_base:"/api/advert"},calls:{GET:{get:{url:"/:id"},getAll:{},remove:{url:"/:id/delete"}},POST:{create:{}},PUT:{update:{url:"/:id"}}}})}])}function advertiserServicesInit(t){t.factory("advertiser",["api",function(t){return t.generate({options:{api_base:"/api/advertiser"},calls:{GET:{remove:{url:"/:id/delete"},get:{url:"/:id"},getCurrent:{url:"/current"}},PUT:{update:{url:"/:id"}}}})}])}function apiGenServicesInit(t){t.factory("api",["$http",function(t){var e=function(){function e(t){return _classCallCheck(this,e),this.options={api_base:"",url:""},this.calls={},this.generate(t)}return _createClass(e,[{key:"generateCall",value:function(e,r){e=e.toUpperCase(),r.url=r.url||this.options.url;var a={method:e,url:""+this.options.api_base+r.url};return function(r){for(var n in r)r.hasOwnProperty(n)&&("data"!==n?a.url=a.url.replace(":"+n,r[n]):"GET"!==e&&(a.data=r[n]));return t(a)}}},{key:"generate",value:function(t){for(var e in t.options)t.options.hasOwnProperty(e)&&(this.options[e]=t.options[e]);for(var r in t.calls)if(t.calls.hasOwnProperty(r))for(var a in t.calls[r])t.calls[r].hasOwnProperty(a)&&(this.calls[a]=this.generateCall(r,t.calls[r][a]));return this.calls}}]),e}(),r=function(t){return new e(t)};return{generate:r}}])}function authServicesInit(t){t.factory("authService",["$http",function(t){var e=function(t,e){var r={};switch(t){case"login":r.method="POST",r.url="/auth/login";break;case"registration":r.method="POST",r.url="/auth";break;case"logout":r.method="GET",r.url="/auth/logout"}return e&&(r.data=e),r},r=function(r,a){var n=e(r,a);return new Promise(function(e,r){t(n).then(function(t){e(t)})["catch"](function(t){r(t)})})};return{authenticate:r}}])}function currentUserServicesInit(t){t.factory("currentUser",["advertiser","$rootScope",function(t,e){var r={getting_user:!1};return r.get=function(a){r.user?a(null,r.user):r.getting_user?e.$on("got_current_user",function(t,e){e.success?a(null,r.user):a(e.error)}):(r.getting_user=!0,t.getCurrent().then(function(t){t.data.success&&t.data.user&&(r.getting_user=!1,r.user=t.data.user,a(null,r.user),e.$broadcast("got_current_user",{success:!0,user:r.user}))})["catch"](function(t){r.getting_user=!1,e.$broadcast("got_current_user",{success:!1,error:t}),a(t)}))},r}])}function notifierServicesInit(t){t.factory("notify",["$timeout",function(t){var e=function(){function e(){_classCallCheck(this,e),this.message="",this.active=!1,this.state="inform",this.duration=0}return _createClass(e,[{key:"say",value:function(e,r,a){var n=this;this.active=!0,this.message=e||this.message,this.state=r||"inform",a=a||this.duration,a>0&&t(function(){n.active=!1},a)}},{key:"inform",value:function(t,e){this.say(t,"inform",e)}},{key:"error",value:function(t,e){this.say(t,"error",e)}},{key:"success",value:function(t,e){this.say(t,"success",e)}},{key:"close",value:function(){this.active=!1}}]),e}();return new e}])}function validationServicesInit(t){t.factory("validate",[function(){var t=function(){return/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i},e=function(){return/.*\S.*/};return{email:t,password:e}}])}function advertiserDirectivesInit(t){var e="/assets/templates";t.directive("advertiser",[function(){return{restrict:"A",templateUrl:e+"/advertiser-data.html",scope:{user_id:"@advertiser",edit:"=",remove:"="},controller:"advertiserCtrl",controllerAs:"advertiser"}}]),t.directive("advertiserEdit",[function(){return{restrict:"A",templateUrl:e+"/advertiser-edit.html",scope:{user:"=advertiserEdit",popupClose:"&"},controller:"advertiserEditCtrl",controllerAs:"editor"}}]),t.directive("advertiserRemove",[function(){return{restrict:"A",templateUrl:e+"/advertiser-remove.html",scope:{user:"=advertiserRemove",popupClose:"&popupClose"},controller:"advertiserRemoveCtrl",controllerAs:"remover"}}])}function advertDirectivesInit(t){var e="/assets/templates";t.directive("advertsFeed",[function(){return{restrict:"A",templateUrl:e+"/adverts-feed.html",scope:{user_id:"@advertsFeed",filter_enabled:"=enableFilter"},controller:"advertsFeedCtrl",controllerAs:"feed"}}]),t.directive("advertsFilter",[function(){return{restrict:"AE",templateUrl:e+"/adverts-filter.html",scope:{filter_fields:"=feedFilter"},controller:"advertsFeedFilterCtrl",controllerAs:"filter"}}]),t.directive("advert",[function(){return{restrict:"A",templateUrl:e+"/advert.html",scope:{advert:"="}}}]),t.directive("advertSingle",[function(){return{restrict:"A",templateUrl:e+"/advert-data.html",scope:{advert_id:"@advertSingle"},controller:"advertCtrl",controllerAs:"advert"}}]),t.directive("advertEdit",[function(){return{restrict:"A",templateUrl:e+"/advert-edit.html",scope:{advertData:"=advertEdit",popupClose:"&popupClose"},controller:"editAdvertCtrl",controllerAs:"advertEditor"}}])}function languagesDirectivesInit(t){var e="/assets/templates";t.directive("languageSelect",[function(){return{restrict:"A",templateUrl:e+"/languages-select.html",controller:"translationCtrl",controllerAs:"translator"}}])}function notifierDirectivesInit(t){var e="/assets/templates";t.directive("notify",[function(){return{restrict:"AE",templateUrl:e+"/notify.html",controller:"notifierCtrl",controllerAs:"notifier"}}])}function popupDirectivesInit(t){var e="/assets/templates";t.directive("popup",[function(){return{restrict:"A",transclude:{trigger:"popupTrigger",content:"popupContent"},templateUrl:e+"/popup.html",scope:{type:"@"},controller:"popupCtrl",controllerAs:"popup",link:function(t,e,r,a){e.on("click",function(e){angular.element(e.target).hasClass("popup")&&t.$apply(function(){a.close()})})}}}])}function advertControllersInit(t){t.controller("advertsFeedCtrl",["$http","$scope","adverts",function(t,e,r){var a=this;this.order="-publicationDate",this.getAdverts=function(e){e?t({method:"get",url:"/api/advertiser/"+e+"/adverts"}).then(function(t){t.data.adverts&&(a.adverts=t.data.adverts)})["catch"](function(t){console.log(t)}):r.getAll().then(function(t){t.data.adverts&&(a.adverts=t.data.adverts)})["catch"](function(t){console.log(t)})},this.getAdverts(e.user_id)}]),t.controller("advertsFeedFilterCtrl",[function(){this.defaults={gender:"",type:""}}]),t.controller("newAdvertCtrl",["adverts","notify","$timeout",function(t,e,r){var a=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){t.create({data:a.advert}).then(function(t){t.data.success&&(e.success("Created "+t.data.advert.name+' <i class="fa fa-check" aria-hidden="true"></i>',1200),setTimeout(function(){document.location.href="/advert/"+t.data.advert._id},1500))})["catch"](function(t){console.log(t)})}}]),t.controller("editAdvertCtrl",["$scope","adverts","notify",function(t,e,r){var a=this;this.temporaryData=JSON.parse(JSON.stringify(t.advertData)),this.save=function(){e.update({id:t.advertData._id,data:a.temporaryData}).then(function(e){r.success('Updated  <i class="fa fa-check" aria-hidden="true"></i>',1500),e.data.success&&e.data.advert&&(t.advertData=e.data.advert,t.advertData.age&&(t.advertData.age=parseInt(t.advertData.age)),t.popupClose())})["catch"](function(t){console.log(t)})},this.cancel=function(){a.temporaryData=JSON.parse(JSON.stringify(t.advertData))}}]),t.controller("advertCtrl",["$scope","adverts",function(t,e){var r=this,a={};e.get({id:t.advert_id}).then(function(t){t.data.success&&t.data.advert&&(r.advertData=t.data.advert,r.advertData.age&&(r.advertData.age=parseInt(r.advertData.age)),a=JSON.parse(JSON.stringify(r.advertData)))})["catch"](function(t){console.log(t)})}]),t.controller("advertRemoveCtrl",["$scope","adverts","notify",function(t,e,r){this.remove=function(t){e.remove({id:t}).then(function(t){t.data.success&&t.data.redirect?(r.success('Removed  <i class="fa fa-check" aria-hidden="true"></i>',1200),setTimeout(function(){document.location.href=t.data.redirect},1200)):t.data.message&&console.log(t.data)})["catch"](function(t){console.log(t)})},this.cancel=function(){t.$parent.$parent.popup.active=!1}}])}function advertiserControllersInit(t){t.controller("advertiserCtrl",["advertiser","$scope",function(t,e){var r=this;t.get({id:e.user_id}).then(function(t){t.data.success&&(r.info=t.data.advertiser)})["catch"](function(t){console.log(t)})}]),t.controller("advertiserEditCtrl",["advertiser","$scope","notify",function(t,e,r){var a=this;this.temporary_data=JSON.parse(JSON.stringify(e.user)),this.cancel=function(){a.temporary_data=JSON.parse(JSON.stringify(e.user))},this.edit=function(){t.update({id:e.user._id,data:a.temporary_data}).then(function(t){t.data.success&&(r.success('Updated  <i class="fa fa-check" aria-hidden="true"></i>',1500),e.user=JSON.parse(JSON.stringify(a.temporary_data)),e.popupClose())})["catch"](function(t){console.log(t)})}}]),t.controller("advertiserRemoveCtrl",["advertiser","$scope","notify",function(t,e,r){this.remove=function(){t.remove({id:e.user._id}).then(function(t){t.data.success&&(r.success('Removed  <i class="fa fa-check" aria-hidden="true"></i>',1e3),setTimeout(function(){document.location.href="/"},1200))})["catch"](function(t){console.log(t)})}}])}function authControllersInit(t){t.controller("authCtrl",["$scope","$timeout","authService","validate","notify",function(t,e,r,a,n){var i=this;this.emailRegex=a.email(),this.passwordRegex=a.password(),this.checkForm=function(e){i.error=!t[e].$valid,i.validClass=t[e].$valid?"valid":"error"},this.submit=function(a){t[a].email.$setTouched(),t[a].password.$setTouched(),t[a].$valid?r.authenticate(a,{email:i.email,password:i.password}).then(function(r){r.data.success?(r.data.user&&r.data.user.name?n.success("Welcome back, "+r.data.user.name):"registration"==a?n.success("Welcome."):"login"==a&&n.success("Welcome back."),e(function(){i.responseClass="success",document.location.href="/profile"},5e3)):(console.log(t[a]+": failed"),console.log(r))})["catch"](function(t){t.data&&t.data.success?console.log(t):(n.error(t.data.message),e(function(){i.responseClass="fail"},500))}):n.error(a+" form invalid",2e3)},this.reset=function(){i.error=!1,i.validClass="",i.responseClass=""}}]),t.controller("logoutCtrl",["authService",function(t){this.logout=function(){t.authenticate("logout").then(function(t){t.data.success?document.location.reload():console.log(t.data.message)})["catch"](function(t){console.log(t)})}}])}function notifierControllersInit(t){t.controller("notifierCtrl",["notify","$scope","$sce",function(t,e,r){var a=this;this.close=function(){t.active=!1},e.$watch(function(){return t.active},function(e){a.state=!1,a.message=r.trustAsHtml(t.message),a.active=e,a.state=t.state})}])}function popupControllersInit(t){t.controller("popupCtrl",[function(){var t=this;this.close=function(){t.active=!1}}])}function translationControllersInit(t){t.controller("translationCtrl",["$scope","$translate",function(t,e){this.changeLanguage=function(t){localStorage.setItem("preferred_language",t),e.use(t)}}])}var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,r,a){return r&&t(e.prototype,r),a&&t(e,a),e}}(),Portfolio=function(){function t(e){_classCallCheck(this,t),this.modules=e}return _createClass(t,[{key:"initComponents",value:function(t,e){for(var r=0;r<e.length;r++)e[r](this.modules[t])}},{key:"init",value:function(t){for(var e in t)t.hasOwnProperty(e)&&this.initComponents(e,t[e])}}]),t}(),modules=getModules(),components={services:[apiGenServicesInit,authServicesInit,validationServicesInit,advertiserServicesInit,advertServicesInit,currentUserServicesInit],notifier:[notifierControllersInit,notifierServicesInit,notifierDirectivesInit],auth:[authControllersInit],popup:[popupControllersInit,popupDirectivesInit],advert:[advertControllersInit,advertDirectivesInit],advertiser:[advertiserControllersInit,advertiserDirectivesInit],config:[applicationConfig],translation:[translationControllersInit,languagesDirectivesInit]},portfolio=new Portfolio(modules);portfolio.init(components);null//# sourceMappingURL=main.js.mapnull