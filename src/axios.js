import Vue from 'vue'
import axios from 'axios'

//将axios挂载在Vue扩展上
 Vue.prototype.axios=axios

//在main.js设置全局的请求次数，请求的间隙
// axios.defaults.retry = 4;
// axios.defaults.retryDelay = 1000;

// axios.default.shouldRetry = (error) => true // 重试条件，默认只要是错误都需要重试

 //配置baseUrl
 // axios.defaults.baseURL = '/api'
 
 // 环境的切换
if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = '';
}



axios.interceptors.request.use(function (config) {
    var author_id = Vue.prototype.getCookie('author_id');
    // console.log(config)

    // if(process.env.NODE_ENV == 'production') {
    //     if(config.method == 'post' && config.headers.my_flag == undefined) {
    //         config.url = 'http://ht.idealead.hbindex.com/webapi' + config.url     
    //     }else if(config.method == 'get'){
    //         if(config['url'].indexOf('my_flag') == -1 && config['url'].indexOf('woff') == -1){
    //             config.url = 'http://ht.idealead.hbindex.com/webapi' + config.url   
    //         }
    //     }

    // }
    
    // 在发送请求之前做些什么
    if(author_id != '' && author_id != null){
        // console.log(config)
        if(config.method == 'post' && config.headers.my_flag == undefined) {
            config.data = {
                ...config.data,
                user_id: author_id,
            }
           
        }else if(config.method=='get' && config['url'].indexOf('my_flag') == -1 && config['url'].indexOf('woff') == -1) {
            config.params = { 
                user_id: author_id, 
                ...config.params 
            } 
        }
    }
    return config

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 设置重新请求

// axios.interceptors.response.use(undefined, function(err) {
//     var config = err.config;
//     console.log(config)
//     // 判断是否配置了重试
//     // if(!config || !config.retry) return Promise.reject(err);
//     // if (!config.shouldRetry || typeof config.shouldRetry !== 'function') return Promise.reject(err)
    
//     // // 判断是否满足重试条件
//     // if (!config.shouldRetry(err)) return Promise.reject(err)

//     //  // 设置重试次数
//     // config.__retryCount = config.__retryCount || 0
//     // if (config.__retryCount >= config.retry) return Promise.reject(err)
//   // 延时处理
//     var backoff = new Promise(function (resolve) {
//         setTimeout(function () {
//             resolve()
//         }, config.retryDelay || 1)
//     })
//      // 重试次数自增
//     config.__retryCount += 1


//     // config.data = Qs.parse(config.data)
//     // 重新发起axios请求
//     return backoff.then(() => {
//         return axios(config)
//     })
// });
