"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function getModules(){return{services:angular.module("services",[]),notifier:angular.module("notifier",[]),auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),author:angular.module("author",[]),config:angular.module("config",[]),translation:angular.module("translation",[]),images:angular.module("images",[]),form:angular.module("form",[]),app:angular.module("app",["pascalprecht.translate","angularFileUpload","services","notifier","auth","popup","advert","author","config","translation","images","form"])}}function applicationConfig(e){e.config(["$translateProvider",function(e){var t=localStorage.preferred_language||"ru";e.useSanitizeValueStrategy("escape"),e.translations("en",{BUTTON_LANG_EN:"english",BUTTON_LANG_RU:"russian",SIGN_UP_BTN:"Sign Up",LOGIN_BTN:"Login",HOME_BTN:"Home",PROFILE_BTN:"Profile",LOGOUT_BTN:"Logout"}),e.translations("ru",{BUTTON_LANG_EN:"Английский",BUTTON_LANG_RU:"Русский",SIGN_UP_BTN:"Регистрация",LOGIN_BTN:"Вход",HOME_BTN:"Главная",PROFILE_BTN:"Профиль",LOGOUT_BTN:"Выход"}),e.preferredLanguage(t)}])}function advertServicesInit(e){e.factory("adverts",["api",function(e){return e.generate({options:{api_base:"/api/advert"},calls:{GET:{get:{url:"/:id"},getAll:{},remove:{url:"/:id/delete"}},POST:{create:{}},PUT:{update:{url:"/:id"}}}})}])}function apiGenServicesInit(e){e.factory("api",["$http",function(e){var t=function(){function t(e){return _classCallCheck(this,t),this.options={api_base:"",url:""},this.calls={},this.generate(e)}return _createClass(t,[{key:"generateCall",value:function(t,n){t=t.toUpperCase(),n.url=n.url||this.options.url;var o={method:t,url:""+this.options.api_base+n.url};return function(n){for(var r in n)n.hasOwnProperty(r)&&("data"!==r?o.url=o.url.replace(":"+r,n[r]):"GET"!==t&&(o.data=n[r]));return e(o)}}},{key:"generate",value:function(e){for(var t in e.options)e.options.hasOwnProperty(t)&&(this.options[t]=e.options[t]);for(var n in e.calls)if(e.calls.hasOwnProperty(n))for(var o in e.calls[n])e.calls[n].hasOwnProperty(o)&&(this.calls[o]=this.generateCall(n,e.calls[n][o]));return this.calls}}]),t}(),n=function(e){return new t(e)};return{generate:n}}])}function authServicesInit(e){e.factory("authService",["$http","api",function(e,t){var n=t.generate({options:{api_base:"/auth"},calls:{GET:{logout:{url:"/logout"}},POST:{login:{url:"/login"},registration:{}}}}),o=function(e,t){return n[e]({data:t})};return{authenticate:o}}])}function authorServicesInit(e){e.factory("author",["api",function(e){return e.generate({options:{api_base:"/api/author"},calls:{GET:{remove:{url:"/:id/delete"},get:{url:"/:id"},getAll:{url:""},getCurrent:{url:"/current"}},PUT:{update:{url:"/:id"}}}})}])}function currentUserServicesInit(e){e.factory("currentUser",["author","$rootScope",function(e,t){var n={getting_user:!1};return n.get=function(o){n.user?o(null,n.user):n.getting_user?t.$on("got_current_user",function(e,t){t.success?o(null,n.user):o(t.error)}):(n.getting_user=!0,e.getCurrent().then(function(e){e.data.success&&e.data.user&&(n.getting_user=!1,n.user=e.data.user,o(null,n.user),t.$broadcast("got_current_user",{success:!0,user:n.user}))})["catch"](function(e){n.getting_user=!1,t.$broadcast("got_current_user",{success:!1,error:e}),o(e)}))},n}])}function notifierServicesInit(e){e.service("notify",["$timeout","$sce",function(e,t){var n=this;this.messages=[],this.say=function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"inform",r=arguments[1],a=r.message,i=r.duration,s=void 0===i?n.duration:i,l=r.delay,u=void 0===l?0:l,c=void 0;c=n.messages.length,n.messages.push({time:Date.now(),message:t.trustAsHtml(a),duration:s,delay:u,state:o}),e(u).then(function(){n.messages[c].closed=!1}),s>0&&e(s+u).then(function(){n.messages[c].closed=!0})},this.inform=function(e){n.say("inform",e)},this.error=function(e){n.say("error",e)},this.success=function(e){n.say("success",e)},this.close=function(){n.active=!1}}])}function validationServicesInit(e){e.factory("validate",[function(){var e=function(){return/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i},t=function(){return/.*\S.*/};return{email:e,password:t}}])}function advertComponentsInit(e,t){e.component("feed",{templateUrl:t.templatesFolder+"/adverts-feed.html",bindings:{id:"@authorId",filter_enabled:"=enableFilter",hideFields:"="},controller:"advertsFeedCtrl",controllerAs:"feed"}),e.component("filter",{templateUrl:t.templatesFolder+"/adverts-filter.html",bindings:{fields:"=feedFilter"},controller:"advertsFeedFilterCtrl",controllerAs:"filter"}),e.component("advert",{templateUrl:t.templatesFolder+"/advert.html",bindings:{fields:"=",author:"=",hide:"=hideFields"},controllerAs:"advert"}),e.component("advertSingle",{templateUrl:t.templatesFolder+"/advert-single.html",bindings:{id:"@advertId"},controller:"advertCtrl",controllerAs:"advert"}),e.component("advertEdit",{require:{popup:"^^?popup"},templateUrl:t.templatesFolder+"/advert-edit.html",bindings:{fields:"=advert",advertUpdate:"&advertUpdate"},controller:"editAdvertCtrl",controllerAs:"editor"}),e.component("advertRemove",{require:{popup:"^^?popup",form:"^^?form"},templateUrl:t.templatesFolder+"/advert-remove.html",bindings:{id:"@advertId"},controller:"advertRemoveCtrl",controllerAs:"remover"}),e.component("advertCreate",{require:{popup:"^^?popup"},templateUrl:t.templatesFolder+"/advert-create.html",controller:"newAdvertCtrl",controllerAs:"new"})}function authorComponentsInit(e,t){e.component("author",{templateUrl:t.templatesFolder+"/author.html",bindings:{id:"@authorId",edit:"=",remove:"="},controller:"authorCtrl",controllerAs:"author"}),e.component("authorEdit",{templateUrl:t.templatesFolder+"/author-edit.html",require:{popup:"^^?popup"},bindings:{author:"="},controller:"authorEditCtrl",controllerAs:"editor"}),e.component("authorRemove",{templateUrl:t.templatesFolder+"/author-remove.html",require:{popup:"^^?popup"},bindings:{author:"="},controller:"authorRemoveCtrl",controllerAs:"remover"})}function formComponentsInit(e,t){e.component("popupForm",{templateUrl:t.templatesFolder+"/popup-form.html",require:{popup:"^^?popup"},transclude:!0,controllerAs:"form"})}function imagesComponentsInit(e,t){e.component("imagesUploader",{templateUrl:t.templatesFolder+"/images-upload.html",bindings:{advert_id:"@advertId",advert:"="},controller:"imagesUploadCtrl",controllerAs:"images"}),e.directive("ngThumb",["$window",function(e){var t={support:!(!e.FileReader||!e.CanvasRenderingContext2D),isFile:function(t){return angular.isObject(t)&&t instanceof e.File},isImage:function(e){var t="|"+e.type.slice(e.type.lastIndexOf("/")+1)+"|";return"|jpg|png|jpeg|bmp|gif|".indexOf(t)!==-1}};return{restrict:"A",template:"<canvas/>",link:function(e,n,o){function r(e){var t=new Image;t.onload=a,t.src=e.target.result}function a(){var e=i.width||this.width/this.height*i.height,t=i.height||this.height/this.width*i.width;s.attr({width:e,height:t}),s[0].getContext("2d").drawImage(this,0,0,e,t)}if(t.support){var i=e.$eval(o.ngThumb);if(t.isFile(i.file)&&t.isImage(i.file)){var s=n.find("canvas"),l=new FileReader;l.onload=r,l.readAsDataURL(i.file)}}}}}])}function languagesComponentsInit(e,t){e.component("language",{templateUrl:t.templatesFolder+"/languages-select.html",controller:"translationCtrl",controllerAs:"translator"})}function notifierComponentsInit(e,t){e.component("notify",{templateUrl:t.templatesFolder+"/notify.html",controller:"notifierCtrl",controllerAs:"notifier"})}function popupComponentsInit(e,t){e.component("popup",{transclude:{trigger:"popupTrigger",content:"popupContent"},templateUrl:t.templatesFolder+"/popup.html",bindings:{type:"@"},controller:"popupCtrl",controllerAs:"popup"})}function advertControllersInit(e){e.controller("advertCtrl",["adverts","notify",function(e,t){var n=this,o={};e.get({id:this.id}).then(function(e){e.data.success&&e.data.advert&&(n.fields=e.data.advert,n.fields.age&&(n.fields.age=parseInt(n.fields.age)),o=angular.copy(n.fields))})["catch"](function(e){console.log(e)}),this.save=function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n.fields;e.update({id:o._id,data:o}).then(function(e){t.inform({message:o.name+" updated.",duration:2e3}),e.data.success&&e.data.newAdvert&&(n.fields=e.data.newAdvert,n.fields.age&&(n.fields.age=parseInt(n.fields.age)))})["catch"](function(e){console.log(e)})},this.removeImage=function(e){n.fields.images=n.fields.images.filter(function(t){if(e!==t)return t}),n.save()}}]),e.controller("advertsFeedCtrl",["$http","adverts","author",function(e,t,n){var o=this;this.order="-publicationDate",n.getAll().then(function(e){o.authors=e.data.authors}),this.getAdverts=function(n){n?e({method:"get",url:"/api/author/"+n+"/adverts"}).then(function(e){e.data.adverts&&(o.adverts=e.data.adverts)})["catch"](function(e){console.log(e)}):t.getAll().then(function(e){e.data.adverts&&(o.adverts=e.data.adverts)})["catch"](function(e){console.log(e)})},this.getAdverts(this.id)}]),e.controller("advertsFeedFilterCtrl",[function(){var e=this;this.defaults={gender:"",type:""},this.fieldChange=function(t){""==e.fields[t]&&(e.fields[t]=void 0)}}]),e.controller("newAdvertCtrl",["adverts","notify",function(e,t){var n=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){e.create({data:n.advert}).then(function(e){e.data.success&&(t.inform({message:"Created "+e.data.advert.name+' <i class="fa fa-check" aria-hidden="true"></i>',duration:1200}),setTimeout(function(){document.location.href="/advert/"+e.data.advert._id},1500))})["catch"](function(e){console.log(e)})},this.cancel=function(){n.popup&&n.popup.close()}}]),e.controller("editAdvertCtrl",["$scope",function(e){var t=this;e.$on("popup_open",function(e,n){"edit advert"==n&&(t.temporaryData=angular.copy(t.fields))}),this.cancel=function(){t.temporaryData=angular.copy(t.fields),t.popup&&t.popup.close()}}]),e.controller("advertRemoveCtrl",["adverts","notify",function(e,t){var n=this;this.remove=function(n){e.remove({id:n}).then(function(e){e.data.success&&e.data.redirect?(t.inform({message:'Removed  <i class="fa fa-check" aria-hidden="true"></i>',duration:1200}),setTimeout(function(){document.location.href=e.data.redirect},1200)):e.data.message&&console.log(e.data)})["catch"](function(e){console.log(e)})},this.cancel=function(){n.popup&&n.popup.close()}}])}function authControllersInit(e){e.controller("authCtrl",["$scope","$timeout","authService","validate","notify",function(e,t,n,o,r){var a=this;this.emailRegex=o.email(),this.passwordRegex=o.password(),this.checkForm=function(t){a.error=!e[t].$valid,a.validClass=e[t].$valid?"valid":"error"},this.submit=function(o){e[o].email.$setTouched(),e[o].password.$setTouched(),e[o].$valid?n.authenticate(o,{email:a.email,password:a.password}).then(function(n){n.data.success?(n.data.user&&n.data.user.name?r.inform({message:"Welcome back, "+n.data.user.name,duration:1e3,delay:900}):"registration"==o?r.inform({message:"Welcome",duration:1e3,delay:900}):"login"==o&&r.inform({message:"Welcome back.",duration:1e3,delay:900}),t(2e3).then(function(){a.responseClass="success",document.location.href="/profile"})):(console.log(e[o]+": failed"),console.log(n))})["catch"](function(e){e.data&&e.data.success?console.log(e):(r.error({message:e.data.message,duration:2e3}),t(500).then(function(){a.responseClass="fail"}))}):r.error({message:o+" form invalid",duration:2e3})},this.reset=function(){a.error=!1,a.validClass="",a.responseClass=""}}]),e.controller("logoutCtrl",["authService",function(e){this.logout=function(){e.authenticate("logout").then(function(e){e.data.success?document.location.reload():console.log(e.data.message)})["catch"](function(e){console.log(e)})}}])}function authorControllersInit(e){e.controller("authorCtrl",["author",function(e){var t=this;e.get({id:this.id}).then(function(e){e.data.success&&(t.fields=e.data.author)})["catch"](function(e){console.log(e)})}]),e.controller("authorEditCtrl",["author","notify","$scope",function(e,t,n){var o=this;n.$on("popup_open",function(e,t){"profile"==t&&(o.temporaryData=angular.copy(o.author))}),this.cancel=function(){o.temporaryData=angular.copy(o.temporaryData),o.popup&&o.popup.close()},this.edit=function(){e.update({id:o.author._id,data:o.temporaryData}).then(function(e){e.data.success&&(t.inform({message:'Updated  <i class="fa fa-check" aria-hidden="true"></i>',duration:1500}),o.author=angular.copy(o.temporaryData),o.popup&&o.popup.close())})["catch"](function(e){console.log(e)})}}]),e.controller("authorRemoveCtrl",["author","notify",function(e,t){var n=this;this.remove=function(){e.remove({id:n.author._id}).then(function(e){e.data.success&&(t.inform({message:'Removed  <i class="fa fa-check" aria-hidden="true"></i>',duration:1e3}),setTimeout(function(){document.location.href="/"},1200))})["catch"](function(e){console.log(e)})},this.cancel=function(){n.popup&&n.popup.close()}}])}function imageUploadControllersInit(e){e.controller("imagesUploadCtrl",["FileUploader","notify",function(e,t){var n=this;this.fileUploader=new e({url:"/api/advert/"+this.advert_id+"/images",alias:"images",queueLimit:10}),this.fileUploader.filters.push({name:"imageFilter",fn:function(e,t){var n="|"+e.type.slice(e.type.lastIndexOf("/")+1)+"|";return"|jpg|png|jpeg|bmp|gif|".indexOf(n)!==-1}}),this.fileUploader.onSuccessItem=function(e,t,o,r){e.remove(),n.advert.images=t.newAdvert.images,n.advert.mainImage=t.newAdvert.mainImage},this.fileUploader.onProgressAll=function(e){console.log(e)},this.fileUploader.onCompleteAll=function(e){t.inform({message:"Images added.",duration:1500})}}])}function notifierControllersInit(e){e.controller("notifierCtrl",["notify","$scope","$sce",function(e,t,n){this.messages=e.messages}])}function popupControllersInit(e){e.controller("popupCtrl",["$scope",function(e){var t=this;this.close=function(e){e?angular.element(e.target).hasClass("popup")&&(t.active=!1):t.active=!1},this.open=function(){t.active=!0,e.$broadcast("popup_open",t.type.toLowerCase())}}])}function translationControllersInit(e){e.controller("translationCtrl",["$scope","$translate","author","currentUser",function(e,t,n,o){var r=void 0;o.get(function(e,n){e?console.log(e):(r=n,localStorage.setItem("preferred_language",n.language),t.use(n.language))}),this.changeLanguage=function(e){localStorage.setItem("preferred_language",e),t.use(e),r&&(r.language=e,n.update({id:r._id,data:r}))}}])}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),Builder=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,e),this.modules=t,this.constants=n}return _createClass(e,[{key:"initComponents",value:function(e,t){for(var n=0;n<t.length;n++)t[n](this.modules[e],this.constants)}},{key:"init",value:function(e){for(var t in e)e.hasOwnProperty(t)&&this.initComponents(t,e[t])}}]),e}(),modules=getModules(),constants={templatesFolder:"/assets/templates"},components={services:[apiGenServicesInit,authServicesInit,validationServicesInit,authorServicesInit,advertServicesInit,currentUserServicesInit],notifier:[notifierControllersInit,notifierServicesInit,notifierComponentsInit],auth:[authControllersInit],popup:[popupControllersInit,popupComponentsInit],advert:[advertControllersInit,advertComponentsInit],author:[authorControllersInit,authorComponentsInit],config:[applicationConfig],translation:[translationControllersInit,languagesComponentsInit],images:[imagesComponentsInit,imageUploadControllersInit],form:[formComponentsInit]},builder=new Builder(modules,constants);builder.init(components);
//# sourceMappingURL=main.js.map
