import Vue from 'vue'
import App from './App'
import Router from './router'
Vue.config.productionTip = false
import { RouterMount } from 'uni-simple-router'
 import myself from './pages/my/index.vue'
 Vue.component('myself',myself)
 import cluesmanage from './pages/clues/index.vue'
 Vue.component('cluesmanage',cluesmanage)
 import subordinate from './pages/subordinate/index.vue'
 Vue.component('subordinate',subordinate)
 import home from './pages/home/index.vue'
 Vue.component('home',home)
 import cuCustom from './colorui/components/cu-custom.vue'
 Vue.component('cu-custom',cuCustom)
App.mpType = 'app'

const app = new Vue({
    ...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif