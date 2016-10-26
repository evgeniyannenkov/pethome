"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function getModules(){return{services:angular.module("services",[]),notifier:angular.module("notifier",[]),auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),advertiser:angular.module("advertiser",[]),config:angular.module("config",[]),translation:angular.module("translation",[]),images:angular.module("images",[]),app:angular.module("app",["pascalprecht.translate","angularFileUpload","services","notifier","auth","popup","advert","advertiser","config","translation","images"])}}function applicationConfig(e){e.config(["$translateProvider",function(e){var t=localStorage.preferred_language||"ru";e.useSanitizeValueStrategy("escape"),e.translations("en",{BUTTON_LANG_EN:"english",BUTTON_LANG_RU:"russian",SIGN_UP_BTN:"Sign Up",LOGIN_BTN:"Login",HOME_BTN:"Home",PROFILE_BTN:"Profile",LOGOUT_BTN:"Logout"}),e.translations("ru",{BUTTON_LANG_EN:"Английский",BUTTON_LANG_RU:"Русский",SIGN_UP_BTN:"Регистрация",LOGIN_BTN:"Вход",HOME_BTN:"Главная",PROFILE_BTN:"Профиль",LOGOUT_BTN:"Выход"}),e.preferredLanguage(t)}])}function advertServicesInit(e){e.factory("adverts",["api",function(e){return e.generate({options:{api_base:"/api/advert"},calls:{GET:{get:{url:"/:id"},getAll:{},remove:{url:"/:id/delete"}},POST:{create:{}},PUT:{update:{url:"/:id"}}}})}])}function advertiserServicesInit(e){e.factory("advertiser",["api",function(e){return e.generate({options:{api_base:"/api/advertiser"},calls:{GET:{remove:{url:"/:id/delete"},get:{url:"/:id"},getCurrent:{url:"/current"}},PUT:{update:{url:"/:id"}}}})}])}function apiGenServicesInit(e){e.factory("api",["$http",function(e){var t=function(){function t(e){return _classCallCheck(this,t),this.options={api_base:"",url:""},this.calls={},this.generate(e)}return _createClass(t,[{key:"generateCall",value:function(t,r){t=t.toUpperCase(),r.url=r.url||this.options.url;var a={method:t,url:""+this.options.api_base+r.url};return function(r){for(var n in r)r.hasOwnProperty(n)&&("data"!==n?a.url=a.url.replace(":"+n,r[n]):"GET"!==t&&(a.data=r[n]));return e(a)}}},{key:"generate",value:function(e){for(var t in e.options)e.options.hasOwnProperty(t)&&(this.options[t]=e.options[t]);for(var r in e.calls)if(e.calls.hasOwnProperty(r))for(var a in e.calls[r])e.calls[r].hasOwnProperty(a)&&(this.calls[a]=this.generateCall(r,e.calls[r][a]));return this.calls}}]),t}(),r=function(e){return new t(e)};return{generate:r}}])}function authServicesInit(e){e.factory("authService",["$http","api",function(e,t){var r=t.generate({options:{api_base:"/auth"},calls:{GET:{logout:{url:"/logout"}},POST:{login:{url:"/login"},registration:{}}}}),a=function(e,t){return r[e]({data:t})};return{authenticate:a}}])}function currentUserServicesInit(e){e.factory("currentUser",["advertiser","$rootScope",function(e,t){var r={getting_user:!1};return r.get=function(a){r.user?a(null,r.user):r.getting_user?t.$on("got_current_user",function(e,t){t.success?a(null,r.user):a(t.error)}):(r.getting_user=!0,e.getCurrent().then(function(e){e.data.success&&e.data.user&&(r.getting_user=!1,r.user=e.data.user,a(null,r.user),t.$broadcast("got_current_user",{success:!0,user:r.user}))})["catch"](function(e){r.getting_user=!1,t.$broadcast("got_current_user",{success:!1,error:e}),a(e)}))},r}])}function notifierServicesInit(e){e.factory("notify",["$timeout",function(e){var t=function(){function t(){_classCallCheck(this,t),this.message="",this.active=!1,this.state="inform",this.duration=0}return _createClass(t,[{key:"say",value:function(t,r,a){var n=this,i=arguments.length<=3||void 0===arguments[3]?0:arguments[3];this.message=t||this.message,this.state=r||"inform",a=a||this.duration,e(i).then(function(){n.active=!0}),a>0&&e(a+i).then(function(){n.active=!1})}},{key:"inform",value:function(e,t,r){this.say(e,"inform",t,r)}},{key:"error",value:function(e,t,r){this.say(e,"error",t,r)}},{key:"success",value:function(e,t,r){this.say(e,"success",t,r)}},{key:"close",value:function(){this.active=!1}}]),t}();return new t}])}function validationServicesInit(e){e.factory("validate",[function(){var e=function(){return/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i},t=function(){return/.*\S.*/};return{email:e,password:t}}])}function advertiserDirectivesInit(e){var t="/assets/templates";e.directive("advertiser",[function(){return{restrict:"A",templateUrl:t+"/advertiser-data.html",scope:{user_id:"@advertiser",edit:"=",remove:"="},controller:"advertiserCtrl",controllerAs:"advertiser"}}]),e.directive("advertiserEdit",[function(){return{restrict:"A",templateUrl:t+"/advertiser-edit.html",scope:{user:"=advertiserEdit",popupClose:"&"},controller:"advertiserEditCtrl",controllerAs:"editor"}}]),e.directive("advertiserRemove",[function(){return{restrict:"A",templateUrl:t+"/advertiser-remove.html",scope:{user:"=advertiserRemove",popupClose:"&popupClose"},controller:"advertiserRemoveCtrl",controllerAs:"remover"}}])}function advertDirectivesInit(e){var t="/assets/templates";e.directive("advertsFeed",[function(){return{restrict:"A",templateUrl:t+"/adverts-feed.html",scope:{user_id:"@advertsFeed",filter_enabled:"=enableFilter"},controller:"advertsFeedCtrl",controllerAs:"feed"}}]),e.directive("advertsFilter",[function(){return{restrict:"AE",templateUrl:t+"/adverts-filter.html",scope:{filter_fields:"=feedFilter"},controller:"advertsFeedFilterCtrl",controllerAs:"filter"}}]),e.directive("advert",[function(){return{restrict:"A",templateUrl:t+"/advert.html",scope:{advert:"="}}}]),e.directive("advertSingle",[function(){return{restrict:"A",templateUrl:t+"/advert-data.html",scope:{advert_id:"@advertSingle"},controller:"advertCtrl",controllerAs:"advert"}}]),e.directive("advertEdit",[function(){return{restrict:"A",templateUrl:t+"/advert-edit.html",scope:{advertData:"=advertEdit",popupClose:"&popupClose"},controller:"editAdvertCtrl",controllerAs:"advertEditor"}}])}function imagesDirectivesInit(e){var t="/assets/templates";e.directive("imagesUpload",[function(){return{restrict:"A",templateUrl:t+"/images-upload.html",scope:{advert:"=imagesUpload"},controller:"imagesUploadCtrl",controllerAs:"uploader"}}])}function languagesDirectivesInit(e){var t="/assets/templates";e.directive("languageSelect",[function(){return{restrict:"A",templateUrl:t+"/languages-select.html",controller:"translationCtrl",controllerAs:"translator"}}])}function notifierDirectivesInit(e){var t="/assets/templates";e.directive("notify",[function(){return{restrict:"AE",templateUrl:t+"/notify.html",controller:"notifierCtrl",controllerAs:"notifier"}}])}function popupDirectivesInit(e){var t="/assets/templates";e.directive("popup",[function(){return{restrict:"A",transclude:{trigger:"popupTrigger",content:"popupContent"},templateUrl:t+"/popup.html",scope:{type:"@"},controller:"popupCtrl",controllerAs:"popup",link:function(e,t,r,a){t.on("click",function(t){angular.element(t.target).hasClass("popup")&&e.$apply(function(){a.close()})})}}}])}function advertControllersInit(e){e.controller("advertsFeedCtrl",["$http","$scope","adverts",function(e,t,r){var a=this;this.order="-publicationDate",this.getAdverts=function(t){t?e({method:"get",url:"/api/advertiser/"+t+"/adverts"}).then(function(e){e.data.adverts&&(a.adverts=e.data.adverts)})["catch"](function(e){console.log(e)}):r.getAll().then(function(e){e.data.adverts&&(a.adverts=e.data.adverts)})["catch"](function(e){console.log(e)})},this.getAdverts(t.user_id)}]),e.controller("advertsFeedFilterCtrl",[function(){this.defaults={gender:"",type:""}}]),e.controller("newAdvertCtrl",["adverts","notify","$timeout",function(e,t,r){var a=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){e.create({data:a.advert}).then(function(e){e.data.success&&(t.success("Created "+e.data.advert.name+' <i class="fa fa-check" aria-hidden="true"></i>',1200),setTimeout(function(){document.location.href="/advert/"+e.data.advert._id},1500))})["catch"](function(e){console.log(e)})}}]),e.controller("editAdvertCtrl",["$scope","adverts","notify",function(e,t,r){var a=this;this.temporaryData=JSON.parse(JSON.stringify(e.advertData)),this.save=function(){t.update({id:e.advertData._id,data:a.temporaryData}).then(function(t){r.success('Updated  <i class="fa fa-check" aria-hidden="true"></i>',1500),t.data.success&&t.data.advert&&(e.advertData=t.data.advert,e.advertData.age&&(e.advertData.age=parseInt(e.advertData.age)),e.popupClose())})["catch"](function(e){console.log(e)})},this.cancel=function(){a.temporaryData=JSON.parse(JSON.stringify(e.advertData))}}]),e.controller("advertCtrl",["$scope","adverts",function(e,t){var r=this,a={};t.get({id:e.advert_id}).then(function(e){e.data.success&&e.data.advert&&(r.advertData=e.data.advert,r.advertData.age&&(r.advertData.age=parseInt(r.advertData.age)),a=JSON.parse(JSON.stringify(r.advertData)))})["catch"](function(e){console.log(e)})}]),e.controller("advertRemoveCtrl",["$scope","adverts","notify",function(e,t,r){this.remove=function(e){t.remove({id:e}).then(function(e){e.data.success&&e.data.redirect?(r.success('Removed  <i class="fa fa-check" aria-hidden="true"></i>',1200),setTimeout(function(){document.location.href=e.data.redirect},1200)):e.data.message&&console.log(e.data)})["catch"](function(e){console.log(e)})},this.cancel=function(){e.$parent.$parent.popup.active=!1}}])}function advertiserControllersInit(e){e.controller("advertiserCtrl",["advertiser","$scope",function(e,t){var r=this;e.get({id:t.user_id}).then(function(e){e.data.success&&(r.info=e.data.advertiser)})["catch"](function(e){console.log(e)})}]),e.controller("advertiserEditCtrl",["advertiser","$scope","notify",function(e,t,r){var a=this;this.temporary_data=JSON.parse(JSON.stringify(t.user)),this.cancel=function(){a.temporary_data=JSON.parse(JSON.stringify(t.user))},this.edit=function(){e.update({id:t.user._id,data:a.temporary_data}).then(function(e){e.data.success&&(r.success('Updated  <i class="fa fa-check" aria-hidden="true"></i>',1500),t.user=JSON.parse(JSON.stringify(a.temporary_data)),t.popupClose())})["catch"](function(e){console.log(e)})}}]),e.controller("advertiserRemoveCtrl",["advertiser","$scope","notify",function(e,t,r){this.remove=function(){e.remove({id:t.user._id}).then(function(e){e.data.success&&(r.success('Removed  <i class="fa fa-check" aria-hidden="true"></i>',1e3),setTimeout(function(){document.location.href="/"},1200))})["catch"](function(e){console.log(e)})}}])}function authControllersInit(e){e.controller("authCtrl",["$scope","$timeout","authService","validate","notify",function(e,t,r,a,n){var i=this;this.emailRegex=a.email(),this.passwordRegex=a.password(),this.checkForm=function(t){i.error=!e[t].$valid,i.validClass=e[t].$valid?"valid":"error"},this.submit=function(a){e[a].email.$setTouched(),e[a].password.$setTouched(),e[a].$valid?r.authenticate(a,{email:i.email,password:i.password}).then(function(r){r.data.success?(r.data.user&&r.data.user.name?n.success("Welcome back, "+r.data.user.name):"registration"==a?n.success("Welcome."):"login"==a&&n.success("Welcome back.",1e3,900),t(2e3).then(function(){i.responseClass="success",document.location.href="/profile"})):(console.log(e[a]+": failed"),console.log(r))})["catch"](function(e){e.data&&e.data.success?console.log(e):(n.error(e.data.message),t(500).then(function(){i.responseClass="fail"}))}):n.error(a+" form invalid",2e3)},this.reset=function(){i.error=!1,i.validClass="",i.responseClass=""}}]),e.controller("logoutCtrl",["authService",function(e){this.logout=function(){e.authenticate("logout").then(function(e){e.data.success?document.location.reload():console.log(e.data.message)})["catch"](function(e){console.log(e)})}}])}function imageUploadControllersInit(e){e.controller("imagesUploadCtrl",["$scope","FileUploader",function(e,t){e.fileUploader=new t({url:"/api/advert/580f4a2331a7fd18240a187d/images",alias:"images"})}])}function notifierControllersInit(e){e.controller("notifierCtrl",["notify","$scope","$sce",function(e,t,r){var a=this;this.close=function(){e.active=!1},t.$watch(function(){return e.active},function(t){a.state=!1,console.log(e.message),a.message=r.trustAsHtml(e.message),a.active=t,a.state=e.state})}])}function popupControllersInit(e){e.controller("popupCtrl",[function(){var e=this;this.close=function(){e.active=!1}}])}function translationControllersInit(e){e.controller("translationCtrl",["$scope","$translate","advertiser","currentUser",function(e,t,r,a){var n=void 0;a.get(function(e,r){e?console.log(e):(n=r,localStorage.setItem("preferred_language",r.language),t.use(r.language))}),this.changeLanguage=function(e){localStorage.setItem("preferred_language",e),t.use(e),n&&(n.language=e,r.update({id:n._id,data:n}))}}])}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),Portfolio=function(){function e(t){_classCallCheck(this,e),this.modules=t}return _createClass(e,[{key:"initComponents",value:function(e,t){for(var r=0;r<t.length;r++)t[r](this.modules[e])}},{key:"init",value:function(e){for(var t in e)e.hasOwnProperty(t)&&this.initComponents(t,e[t])}}]),e}(),modules=getModules(),components={services:[apiGenServicesInit,authServicesInit,validationServicesInit,advertiserServicesInit,advertServicesInit,currentUserServicesInit],notifier:[notifierControllersInit,notifierServicesInit,notifierDirectivesInit],auth:[authControllersInit],popup:[popupControllersInit,popupDirectivesInit],advert:[advertControllersInit,advertDirectivesInit],advertiser:[advertiserControllersInit,advertiserDirectivesInit],config:[applicationConfig],translation:[translationControllersInit,languagesDirectivesInit],images:[imagesDirectivesInit,imageUploadControllersInit]},portfolio=new Portfolio(modules);portfolio.init(components);
//# sourceMappingURL=main.js.map
