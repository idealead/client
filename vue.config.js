module.exports = {
	lintOnSave: true,
	publicPath:'./',
	productionSourceMap:false,  // 设置上线后是否加载webpack文件
	devServer: {
	    open: true, //是否自动弹出浏览器页面
	    host: "localhost",
	    port: '8080',
	    https: false,
	    hotOnly: false,
	    proxy: {
		  '/api': {
	        target: 'http://ht.idealead.hbindex.com', //API服务器的地址
	        changeOrigin: true,
	        pathRewrite: {'^/api': ''}
        }	
        },
     },
      css: {
	    // 是否使用css分离插件 ExtractTextPlugin
	    extract: true,
	    // 开启 CSS source maps?
	    sourceMap: false,
	    // css预设器配置项
	    loaderOptions: {},
	    // 启用 CSS modules for all css / pre-processor files.
	    modules: false
	},
	chainWebpack: (config) => {
		config.entry('main').add('babel-polyfill')
		config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 50000 }))
	}
}


