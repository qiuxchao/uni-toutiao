
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/tabBar/home/home","pages/tabBar/video/video","pages/tabBar/publish/publish"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"每日头条","navigationBarBackgroundColor":"#d43d3d","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#8F8F94","selectedColor":"#f33e54","backgroundColor":"#F8F8F8","list":[{"pagePath":"pages/tabBar/home/home","iconPath":"static/img/tabbar/home.png","selectedIconPath":"static/img/tabbar/homeactive.png","text":"首页"},{"pagePath":"pages/tabBar/publish/publish","iconPath":"static/img/tabbar/add.png","selectedIconPath":"static/img/tabbar/addactive.png","text":"发布"},{"pagePath":"pages/tabBar/video/video","iconPath":"static/img/tabbar/guanzhu.png","selectedIconPath":"static/img/tabbar/guanzhuactive.png","text":"关注"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uni-toutiao","compilerVersion":"2.7.14","entryPagePath":"pages/tabBar/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/tabBar/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","titleNView":false}},{"path":"/pages/tabBar/video/video","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"关注"}},{"path":"/pages/tabBar/publish/publish","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"发布"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
