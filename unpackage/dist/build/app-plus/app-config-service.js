
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/login/pwd","pages/my/index","pages/my/components/wallet/index","pages/clues/index","pages/my/components/data/index","pages/my/components/updatedata/index","pages/main/main","pages/clues/components/myclues/index","pages/clues/components/followupclues/index","pages/clues/components/distributionclues/index","pages/clues/components/createclue/index"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"TestApp","compilerVersion":"2.6.0","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"titleNView":false}},{"path":"/pages/login/pwd","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/my/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/my/components/wallet/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/clues/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/my/components/data/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/my/components/updatedata/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/main/main","meta":{},"window":{"navigationBarTitleText":"登录模板","titleNView":false}},{"path":"/pages/clues/components/myclues/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/clues/components/followupclues/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/clues/components/distributionclues/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/clues/components/createclue/index","meta":{},"window":{"titleNView":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes}}}});
