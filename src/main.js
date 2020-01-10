// import '@babel/polyfill'
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/font/SiYuan.css';
import mixin from './mixin/mixin.js'
import '@/api/cookie.js'
import '@/axios.js'
import Material from './components/dialog/material'
import Login from './components/dialog/login'

Es6Promise.polyfill()

Vue.prototype.$material = Material.install
Vue.prototype.$login = Login.install



Vue.mixin(mixin)

Vue.use(ElementUI);


Vue.config.productionTip = false

const requireComponent = require.context(
    // 其组件目录的相对路径
    './components',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /\.vue$/
)

requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)

    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
        camelCase(
            // 获取和目录深度无关的文件名
            fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
    )

    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )

})



// const _hmt = _hmt || [];
// window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
// (function () {
//   const hm = document.createElement('script');
//   hm.src = "https://hm.baidu.com/hm.js?985bc068316cfaaf9fd355cdb326d338";
//   const s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(hm, s);
// })();


// // 加入百度统计
router.beforeEach((to, from, next) => {

    if (to.path) {
      if (_hmt) {      
        // console.log(_hmt)
        _hmt.push(['_trackPageview', '/#' + to.fullPath]);
        }
    }
    next();

 
})
router.afterEach( ( to, from, next ) => {
    setTimeout(()=>{

            var _mtac = {"senseQuery":1};
            (function() {
                var mta = document.createElement("script");
                mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
                mta.setAttribute("name", "MTAH5");
                mta.setAttribute("sid", "500707425");
                mta.setAttribute("cid", "500707426");
                mta.id="tengxun"
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(mta, s);
            })();
        },500);
} );



new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
