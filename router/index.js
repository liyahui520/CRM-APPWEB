// router/index.js

import modules from './modules'
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
	routes: [...modules] //路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log(to)
	//uni.removeStorageSync("Token")
	let token = uni.getStorageSync("Token") 
	if (token != '') {
		if (to.isauth) {
				// #ifdef H5
				next({
					path: '/main'
				})
				//#endif
				//#ifdef APP-PLUS
				next({
					path: 'main'
				})
				// #endif
			
		} else {
			next()
		}
	} else { 
		if (!to.isauth) {
			next({
				path: '/',
				replace: true
			})
		} else {
			next();
		}
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {
	//uni.hideLoading()
})
export default router;
