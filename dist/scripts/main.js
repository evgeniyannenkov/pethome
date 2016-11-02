"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function applicationConfig(t){t.config(["$translateProvider",function(t){var e=localStorage.preferred_language||"ru";t.useSanitizeValueStrategy("escape"),t.translations("en",{BUTTON_LANG_EN:"english",BUTTON_LANG_RU:"russian",SIGN_UP_BTN:"Sign Up",LOGIN_BTN:"Login",HOME_BTN:"Home",PROFILE_BTN:"Profile",LOGOUT_BTN:"Logout",ADMIN_BTN:"Admin"}),t.translations("ru",{BUTTON_LANG_EN:"Английский",BUTTON_LANG_RU:"Русский",SIGN_UP_BTN:"Регистрация",LOGIN_BTN:"Вход",HOME_BTN:"Главная",PROFILE_BTN:"Профиль",LOGOUT_BTN:"Выход",ADMIN_BTN:"Управление"}),t.preferredLanguage(e)}])}function advertComponentsInit(t,e){t.component("feed",{templateUrl:e.templatesFolder+"/adverts-feed.html",bindings:{id:"@authorId",filter_enabled:"=enableFilter",hideFields:"=",allAllowed:"="},controller:"advertsFeedCtrl",controllerAs:"feed"}),t.component("filter",{templateUrl:e.templatesFolder+"/adverts-filter.html",bindings:{fields:"=feedFilter"},controller:"advertsFeedFilterCtrl",controllerAs:"filter"}),t.component("advert",{templateUrl:e.templatesFolder+"/advert.html",bindings:{fields:"=",author:"=",hide:"=hideFields"},controllerAs:"advert"}),t.component("advertSingle",{templateUrl:e.templatesFolder+"/advert-single.html",bindings:{id:"@advertId"},controller:"advertCtrl",controllerAs:"advert"}),t.component("advertEdit",{require:{popup:"^^?popup"},templateUrl:e.templatesFolder+"/advert-edit.html",bindings:{fields:"=advert",advertUpdate:"&advertUpdate"},controller:"editAdvertCtrl",controllerAs:"editor"}),t.component("advertRemove",{require:{popup:"^^?popup",form:"^^?form"},templateUrl:e.templatesFolder+"/advert-remove.html",bindings:{id:"@advertId"},controller:"advertRemoveCtrl",controllerAs:"remover"}),t.component("advertCreate",{require:{popup:"^^?popup"},templateUrl:e.templatesFolder+"/advert-create.html",controller:"newAdvertCtrl",controllerAs:"new"})}function authorComponentsInit(t,e){t.component("author",{templateUrl:e.templatesFolder+"/author.html",bindings:{id:"@authorId",edit:"=",remove:"="},controller:"authorCtrl",controllerAs:"author"}),t.component("authorsList",{templateUrl:e.templatesFolder+"/authors.html",controller:"authorsListCtrl",controllerAs:"list"}),t.component("authorEdit",{templateUrl:e.templatesFolder+"/author-edit.html",require:{popup:"^^?popup"},bindings:{author:"="},controller:"authorEditCtrl",controllerAs:"editor"}),t.component("authorRemove",{templateUrl:e.templatesFolder+"/author-remove.html",require:{popup:"^^?popup"},bindings:{author:"="},controller:"authorRemoveCtrl",controllerAs:"remover"}),t.component("authorBlock",{templateUrl:e.templatesFolder+"/author-block.html",require:{popup:"^^?popup"},bindings:{authorId:"@",action:"@"},controller:"authorBlockCtrl",controllerAs:"blocker"})}function formComponentsInit(t,e){t.component("popupForm",{templateUrl:e.templatesFolder+"/popup-form.html",require:{popup:"^^?popup"},transclude:!0,controllerAs:"form"})}function imagesComponentsInit(t,e){t.component("imagesUploader",{templateUrl:e.templatesFolder+"/images-upload.html",bindings:{advert_id:"@advertId",advert:"="},controller:"imagesUploadCtrl",controllerAs:"images"}),t.directive("ngThumb",["$window",function(t){var e={support:!(!t.FileReader||!t.CanvasRenderingContext2D),isFile:function(e){return angular.isObject(e)&&e instanceof t.File},isImage:function(t){var e="|"+t.type.slice(t.type.lastIndexOf("/")+1)+"|";return"|jpg|png|jpeg|bmp|gif|".indexOf(e)!==-1}};return{restrict:"A",template:"<canvas/>",link:function(t,o,n){function r(t){var e=new Image;e.onload=a,e.src=t.target.result}function a(){var t=i.width||this.width/this.height*i.height,e=i.height||this.height/this.width*i.width;l.attr({width:t,height:e}),l[0].getContext("2d").drawImage(this,0,0,t,e)}if(e.support){var i=t.$eval(n.ngThumb);if(e.isFile(i.file)&&e.isImage(i.file)){var l=o.find("canvas"),s=new FileReader;s.onload=r,s.readAsDataURL(i.file)}}}}}])}function languagesComponentsInit(t,e){t.component("language",{templateUrl:e.templatesFolder+"/languages-select.html",controller:"translationCtrl",controllerAs:"translator"})}function notifierComponentsInit(t,e){t.component("notify",{templateUrl:e.templatesFolder+"/notify.html",controller:"notifierCtrl",controllerAs:"notifier"})}function popupComponentsInit(t,e){t.component("popup",{transclude:{trigger:"popupTrigger",content:"popupContent"},templateUrl:e.templatesFolder+"/popup.html",bindings:{type:"@"},controller:"popupCtrl",controllerAs:"popup"})}function appFiltersInit(t){t.filter("feed",function(){return function(t,e){var o=[];return angular.forEach(t,function(t){e&&!e[t.author].blocked&&t.published&&o.push(t)}),o}})}function getModules(){return{services:angular.module("services",[]),filters:angular.module("filters",[]),notifier:angular.module("notifier",[]),auth:angular.module("auth",[]),popup:angular.module("popup",[]),advert:angular.module("advert",[]),author:angular.module("author",[]),config:angular.module("config",[]),translation:angular.module("translation",[]),images:angular.module("images",[]),form:angular.module("form",[]),app:angular.module("app",["pascalprecht.translate","angularFileUpload","services","filters","notifier","auth","popup","advert","author","config","translation","images","form"])}}function advertServicesInit(t){t.factory("adverts",["api",function(t){return t.generate({options:{api_base:"/api/advert"},calls:{GET:{get:{url:"/:id"},getAll:{},remove:{url:"/:id/delete"}},POST:{create:{}},PUT:{update:{url:"/:id"}}}})}])}function apiGenServicesInit(t){t.factory("api",["$http",function(t){var e=function(){function e(t){return _classCallCheck(this,e),this.options={api_base:"",url:""},this.calls={},this.generate(t)}return _createClass(e,[{key:"generateCall",value:function(e,o){e=e.toUpperCase(),o.url=o.url||this.options.url;var n={method:e,url:""+this.options.api_base+o.url};return function(o){for(var r in o)o.hasOwnProperty(r)&&("data"!==r?n.url=n.url.replace(":"+r,o[r]):"GET"!==e&&(n.data=o[r]));return t(n)}}},{key:"generate",value:function(t){for(var e in t.options)t.options.hasOwnProperty(e)&&(this.options[e]=t.options[e]);for(var o in t.calls)if(t.calls.hasOwnProperty(o))for(var n in t.calls[o])t.calls[o].hasOwnProperty(n)&&(this.calls[n]=this.generateCall(o,t.calls[o][n]));return this.calls}}]),e}(),o=function(t){return new e(t)};return{generate:o}}])}function authServicesInit(t){t.factory("authService",["$http","api",function(t,e){var o=e.generate({options:{api_base:"/auth"},calls:{GET:{logout:{url:"/logout"}},POST:{login:{url:"/login"},registration:{}}}}),n=function(t,e){return o[t]({data:e})};return{authenticate:n}}])}function authorServicesInit(t){t.factory("author",["api",function(t){return t.generate({options:{api_base:"/api/author"},calls:{GET:{remove:{url:"/:id/delete"},get:{url:"/:id"},getAll:{url:""},getCurrent:{url:"/current"},block:{url:"/:id/block"},unblock:{url:"/:id/unblock"}},PUT:{update:{url:"/:id"}}}})}])}function currentUserServicesInit(t){t.factory("currentUser",["author","$rootScope",function(t,e){var o={getting_user:!1};return o.get=function(n){o.user?n(null,o.user):o.getting_user?e.$on("got_current_user",function(t,e){e.success?n(null,o.user):n(e.error)}):(o.getting_user=!0,t.getCurrent().then(function(t){t.data.success&&t.data.user&&(o.getting_user=!1,o.user=t.data.user,n(null,o.user),e.$broadcast("got_current_user",{success:!0,user:o.user}))})["catch"](function(t){o.getting_user=!1,e.$broadcast("got_current_user",{success:!1,error:t}),n(t)}))},o}])}function notifierServicesInit(t){t.service("notify",["$timeout","$sce",function(t,e){var o=this;this.messages=[],this.say=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"inform",r=arguments[1],a=r.message,i=r.duration,l=void 0===i?o.duration:i,s=r.delay,u=void 0===s?0:s,c=void 0;c=o.messages.length,o.messages.push({time:Date.now(),message:e.trustAsHtml(a),duration:l,delay:u,state:n}),t(u).then(function(){o.messages[c].closed=!1}),l>0&&t(l+u).then(function(){o.messages[c].closed=!0})},this.inform=function(t){o.say("inform",t)},this.error=function(t){o.say("error",t)},this.success=function(t){o.say("success",t)},this.close=function(){o.active=!1}}])}function validationServicesInit(t){t.factory("validate",[function(){var t=function(){return/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i},e=function(){return/.*\S.*/};return{email:t,password:e}}])}function advertControllersInit(t){t.controller("advertCtrl",["adverts","notify",function(t,e){var o=this,n={};t.get({id:this.id}).then(function(t){t.data.success&&t.data.advert&&(o.fields=t.data.advert,o.fields.age&&(o.fields.age=parseInt(o.fields.age)),n=angular.copy(o.fields))})["catch"](function(t){console.log(t)}),this.save=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o.fields;t.update({id:n._id,data:n}).then(function(t){t.data.success&&t.data.newAdvert?(e.inform({message:n.name+" updated.",duration:2e3}),o.fields=t.data.newAdvert,o.fields.age&&(o.fields.age=parseInt(o.fields.age))):e.error({message:t.data.message,duration:2e3})})["catch"](function(t){console.log(t)})},this.removeImage=function(t){o.fields.images=o.fields.images.filter(function(e){if(t!==e)return e}),o.save()}}]),t.controller("advertsFeedCtrl",["$http","adverts","author",function(t,e,o){var n=this;this.order="-publicationDate",o.getAll().then(function(t){n.authors=t.data.authors}),this.getAdverts=function(o){o?t({method:"get",url:"/api/author/"+o+"/adverts"}).then(function(t){t.data.adverts&&(n.adverts=t.data.adverts)})["catch"](function(t){console.log(t)}):e.getAll().then(function(t){t.data.adverts&&(n.adverts=t.data.adverts)})["catch"](function(t){console.log(t)})},this.getAdverts(this.id)}]),t.controller("advertsFeedFilterCtrl",[function(){var t=this;this.defaults={gender:"",type:""},this.fieldChange=function(e){"type"!==e&&"gender"!==e&&""==t.fields[e]&&(t.fields[e]=void 0)}}]),t.controller("newAdvertCtrl",["adverts","notify",function(t,e){var o=this;this.advert={gender:"boy",type:"dog",age:1},this.create=function(){t.create({data:o.advert}).then(function(t){t.data.success&&(e.inform({message:"Created "+t.data.advert.name+' <i class="fa fa-check" aria-hidden="true"></i>',duration:1200}),setTimeout(function(){document.location.href="/advert/"+t.data.advert._id},1500))})["catch"](function(t){console.log(t)})},this.cancel=function(){o.popup&&o.popup.close()}}]),t.controller("editAdvertCtrl",["$scope",function(t){var e=this;t.$on("popup_open",function(t,o){"edit advert"==o&&(e.temporaryData=angular.copy(e.fields))}),this.cancel=function(){e.temporaryData=angular.copy(e.fields),e.popup&&e.popup.close()}}]),t.controller("advertRemoveCtrl",["adverts","notify",function(t,e){var o=this;this.remove=function(o){t.remove({id:o}).then(function(t){t.data.success&&t.data.redirect?(e.inform({message:'Removed  <i class="fa fa-check" aria-hidden="true"></i>',duration:1200}),setTimeout(function(){document.location.href=t.data.redirect},1200)):t.data.message&&console.log(t.data)})["catch"](function(t){console.log(t)})},this.cancel=function(){o.popup&&o.popup.close()}}])}function authControllersInit(t){t.controller("authCtrl",["$scope","$timeout","authService","validate","notify",function(t,e,o,n,r){var a=this;this.emailRegex=n.email(),this.passwordRegex=n.password(),this.checkForm=function(e){a.error=!t[e].$valid,a.validClass=t[e].$valid?"valid":"error"},this.submit=function(n){t[n].email.$setTouched(),t[n].password.$setTouched(),t[n].$valid?o.authenticate(n,{email:a.email,password:a.password}).then(function(o){o.data.success?(o.data.user&&o.data.user.name?r.inform({message:"Welcome back, "+o.data.user.name,duration:1e3,delay:900}):"registration"==n?r.inform({message:"Welcome",duration:1e3,delay:900}):"login"==n&&r.inform({message:"Welcome back.",duration:1e3,delay:900}),e(2e3).then(function(){a.responseClass="success",document.location.href="/profile"})):(console.log(t[n]+": failed"),console.log(o))})["catch"](function(t){t.data&&t.data.success?console.log(t):(r.error({message:t.data.message,duration:2e3}),e(500).then(function(){a.responseClass="fail"}))}):r.error({message:n+" form invalid",duration:2e3})},this.reset=function(){a.error=!1,a.validClass="",a.responseClass=""}}]),t.controller("logoutCtrl",["authService",function(t){this.logout=function(){t.authenticate("logout").then(function(t){t.data.success?document.location.reload():console.log(t.data.message)})["catch"](function(t){console.log(t)})}}])}function authorControllersInit(t){t.controller("authorCtrl",["author",function(t){var e=this;t.get({id:this.id}).then(function(t){t.data.success&&(e.fields=t.data.author)})["catch"](function(t){console.log(t)})}]),t.controller("authorsListCtrl",["author",function(t){var e=this;t.getAll().then(function(t){t.data.success&&(e.authors=t.data.authors)})["catch"](function(t){console.log(t)})}]),t.controller("authorEditCtrl",["author","notify","$scope",function(t,e,o){var n=this;o.$on("popup_open",function(t,e){"profile"==e&&(n.temporaryData=angular.copy(n.author))}),this.cancel=function(){n.temporaryData=angular.copy(n.temporaryData),n.popup&&n.popup.close()},this.edit=function(){t.update({id:n.author._id,data:n.temporaryData}).then(function(t){t.data.success?(e.inform({message:'Updated  <i class="fa fa-check" aria-hidden="true"></i>',duration:1500}),n.author=angular.copy(n.temporaryData),n.popup&&n.popup.close()):console.log(t)})["catch"](function(t){console.log(t)})}}]),t.controller("authorRemoveCtrl",["author","notify",function(t,e){var o=this;this.remove=function(){t.remove({id:o.author._id}).then(function(t){t.data.success&&(e.inform({message:'Removed  <i class="fa fa-check" aria-hidden="true"></i>',duration:1e3}),setTimeout(function(){document.location.href="/"},1200))})["catch"](function(t){console.log(t)})},this.cancel=function(){o.popup&&o.popup.close()}}]),t.controller("authorBlockCtrl",["author","notify",function(t,e){var o=this;this.block=function(){t.block({id:o.authorId}).then(function(t){t.data.success?(e.inform({message:t.data.message,duration:1400}),setTimeout(function(){document.location.reload()},1600)):console.log(t)})["catch"](function(t){console.log(t)})},this.unblock=function(){t.unblock({id:o.authorId}).then(function(t){t.data.success?(e.inform({message:t.data.message,duration:1400}),setTimeout(function(){document.location.reload()},1600)):console.log(t)})["catch"](function(t){console.log(t)})},this.cancel=function(){o.popup&&o.popup.close()}}])}function imageUploadControllersInit(t){t.controller("imagesUploadCtrl",["FileUploader","notify",function(t,e){var o=this;this.fileUploader=new t({url:"/api/advert/"+this.advert_id+"/images",alias:"images",queueLimit:10}),this.fileUploader.filters.push({name:"imageFilter",fn:function(t,e){var o="|"+t.type.slice(t.type.lastIndexOf("/")+1)+"|";return"|jpg|png|jpeg|bmp|gif|".indexOf(o)!==-1}}),this.fileUploader.onSuccessItem=function(t,e,n,r){t.remove(),o.advert.images=e.newAdvert.images,o.advert.mainImage=e.newAdvert.mainImage},this.fileUploader.onProgressAll=function(t){console.log(t)},this.fileUploader.onCompleteAll=function(t){e.inform({message:"Images added.",duration:1500})}}])}function notifierControllersInit(t){t.controller("notifierCtrl",["notify","$scope","$sce",function(t,e,o){this.messages=t.messages}])}function popupControllersInit(t){t.controller("popupCtrl",["$scope",function(t){var e=this;this.close=function(t){t?angular.element(t.target).hasClass("popup")&&(e.active=!1):e.active=!1},this.open=function(){e.active=!0,t.$broadcast("popup_open",e.type.toLowerCase())}}])}function translationControllersInit(t){t.controller("translationCtrl",["$scope","$translate","author","currentUser",function(t,e,o,n){var r=void 0;n.get(function(t,o){t?console.log(t):(r=o,localStorage.setItem("preferred_language",o.language),e.use(o.language))}),this.changeLanguage=function(t){localStorage.setItem("preferred_language",t),e.use(t),r&&(r.language=t,o.update({id:r._id,data:r}))}}])}var _createClass=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}(),Builder=function(){function t(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,t),this.modules=e,this.constants=o}return _createClass(t,[{key:"initComponents",value:function(t,e){for(var o=0;o<e.length;o++)e[o](this.modules[t],this.constants)}},{key:"init",value:function(t){for(var e in t)t.hasOwnProperty(e)&&this.initComponents(e,t[e])}}]),t}(),modules=getModules(),constants={templatesFolder:"/assets/templates"},components={services:[apiGenServicesInit,authServicesInit,validationServicesInit,authorServicesInit,advertServicesInit,currentUserServicesInit],filters:[appFiltersInit],notifier:[notifierControllersInit,notifierServicesInit,notifierComponentsInit],auth:[authControllersInit],popup:[popupControllersInit,popupComponentsInit],advert:[advertControllersInit,advertComponentsInit],author:[authorControllersInit,authorComponentsInit],config:[applicationConfig],translation:[translationControllersInit,languagesComponentsInit],images:[imagesComponentsInit,imageUploadControllersInit],form:[formComponentsInit]},builder=new Builder(modules,constants);builder.init(components);
//# sourceMappingURL=main.js.map
