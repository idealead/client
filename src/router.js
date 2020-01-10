import Vue from 'vue'
import Router from 'vue-router'
import '@/api/cookie.js'

// 使用router
// Vue.use(Router)
if (!window.VueRouter) Vue.use(Router)

const router = new Router({
	// mode:'history', //去掉地址栏的#号
	routes: [
		{
			path:'*',
			name: 'cover',
			component: () => import('@/pages/cover.vue'),

		},
		{
			path:'/inputMsg',
			name: 'inputMsg',
			redirect: "/", //重定向跳到第一个
			component: (resolve) => require(['@/pages/inputMsg.vue'],resolve),
			children: [
				{
					path: '/inputMsg/q1',
					name: 'q1',
					keepAlive: true,
					component: (resolve) => require(['@/components/q1.vue'],resolve),
				},
				{
					path: '/inputMsg/q2',
					name: 'q2',
					keepAlive: true,
					component: (resolve) => require(['@/components/q2.vue'],resolve),
				},
				{
					path: '/inputMsg/q3',
					name: 'q3',
					keepAlive: true,
					component: (resolve) => require(['@/components/q3.vue'],resolve),
				},
				{
					path: '/inputMsg/q4',
					name: 'q4',
					keepAlive: true,
					component: (resolve) => require(['@/components/q4.vue'],resolve),
				},
				{
					path: '/inputMsg/q5',
					name: 'q5',
					keepAlive: true,
					redirect: "/", //重定向跳到第一个
					component: (resolve) => require(['@/components/q5.vue'],resolve),
				},
				{
					path: '/inputMsg/entry-info',
					name: 'entry-info',
					keepAlive: true,
					component: (resolve) => require(['@/components/entry-info.vue'],resolve),
				}
			]

		},
		{
			path:'/design',
			name: 'design',
			component: (resolve) => require(['@/pages/design.vue'],resolve)

		},
		{
			path:'/personal',
			name: 'personal',
			redirect: "/personal/info", //重定向跳到第一个
			component: (resolve) => require(['@/pages/personal.vue'],resolve),
			children: [
				{
					path: '/personal/info',
					name: 'info',
					component: (resolve) => require(['@/components/personal_page/info.vue'],resolve),
				},
				{
					path: '/personal/myMaterial',
					name: 'myMaterial',
					component: (resolve) => require(['@/components/personal_page/myMaterial.vue'],resolve),
				},
				{
					path: '/personal/edited',
					name: 'edited',
					component: (resolve) => require(['@/components/personal_page/edited.vue'],resolve),
				},
				{
					path: '/personal/collect',
					name: 'collect',
					component: (resolve) => require(['@/components/personal_page/collect.vue'],resolve),
				},
				{
					path: '/personal/consume',
					name: 'consume',
					component: (resolve) => require(['@/components/personal_page/consume.vue'],resolve),
				}
			]
		},
		{
			path:'/cutout',
			name: 'cutout',
			component: (resolve) => require(['@/components/cutout.vue'],resolve)

		},
		// {
		// 	path: '*',
		// 	name: 'cover',
		// 	component: () => import('@/pages/cover.vue'),
		// }
	]
})


// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {

	let token = Vue.prototype.getCookie('author_id');
	
	// if (to.path) {
 //    	// if (window._hmt) {
 //    		_hmt.push(['_trackPageview', '/#' + to.fullPath])
 //    	// }
 //    }

	if (token === 'null' || token === '') {
		if(to.path == '/') {
			next()
		}else {
			Vue.prototype.$message('请先登录！');
			next('/')
		}
	} else {
    	// setUserStatus
    	
    	next();

    }

    

});



export default router