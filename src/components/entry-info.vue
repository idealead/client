<template>
	<div class="entry-info">
	<div class="loading_all" v-loading="loading_all" element-loading-background="rgba(0, 0, 0, 0.5)"></div>		
	<!-- <div class="dialog_hide" @click="endAniFunc"></div> -->
		<div class="entry_wrap wrap_css">
			<h1>请上传品牌logo和产品素材</h1>
			<p class="h1">一键智能去背景功能</p>
			<p class="h2">为达到更好的去背景效果</p>
			<p class="h2">请尽量上传背景纯色的产品图/logo图</p>
			<!-- <p class="h3">请上传品牌logo及商品图片</p> -->
			<!-- <p class="h4">小贴士: 上传纯色背景图效果更好哦</p> -->
			<!-- <span class="input input--nao" :class="{'input--filled' : slogan_input.length}">
				<input class="input__field input__field--nao" type="text" id="input-1" v-model="slogan_input" maxlength=20 @focus="startAniFunc"/>
				<label class="input__label input__label--nao" for="input-1">
					<span class="input__label-content input__label-content--nao">请输入标题...</span>
				</label>
				<span class="limitNums" :class="{'max': limit == 20}">(<span>{{limit}}</span>/20)</span>
				<svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
					<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" />
				</svg>
			</span> -->
			<!-- <div class="upload_areas" @click="endAniFunc"> -->
			<div class="upload_areas">
				<div class="logo_area upload_area">
					<p>LOGO</p>
					<div class="save_img" @click="open_upload_dia_Func(1)" :class="{'hadUpload':logoImg != ''}">
						<img :src="'/uploadFiles/images/' +logoImg" alt="upload_logo" v-if="logoImg != ''">
					</div>
					<!-- 抠图组件 -->
					<div class="cutout_wrap" v-if="logo_cutout_component">
						<div class="cutout_btn" @click="to_cutout(logoImg,'logo')">
							<i class="icon_cut"></i>
							<span>抠图</span>
							<!-- <span class="components_tip">(纯色背景图最佳)</span> -->
						</div>
						<div class="loading_per" v-loading="loading_per_logo"></div>
					</div>
					<i class="el-icon-zoom-in check_detail" v-if="!logo_cutout_component && logoImg!=''" @click="onPreview(0)"></i>
					<i class="el-icon-circle-close delete_img" v-if="logoImg != ''" @click="deleteImgFunc('logo')"></i>
				</div>
				<div class="product_area upload_area">
					<p>产品图</p>
					<div class="save_img" @click="open_upload_dia_Func(2)" :class="{'hadUpload':productImg != ''}">
						<img :src="'/uploadFiles/images/' +productImg" alt="upload_product" v-if="productImg != ''">
						
					</div>
					<!-- 抠图组件 -->
					<div class="cutout_wrap" v-if="product_cutout_component">
						<div class="cutout_btn" @click="to_cutout(productImg,'product')">
							<i class="icon_cut"></i>
							<span>抠图</span>
							<!-- <span class="components_tip">(纯色背景图最佳)</span> -->
						</div>
						<div class="loading_per" v-loading="loading_per_product"></div>
					</div>
					<i class="el-icon-zoom-in check_detail" v-if="!product_cutout_component && productImg!=''" @click="onPreview(1)"></i>
					<i class="el-icon-circle-close delete_img" v-if="productImg != ''" @click="deleteImgFunc('product')"></i>
				</div>
			</div>
			<!-- <p class="h3">素材抠图太麻烦？立即体验<router-link to="/cutout">一键智能抠图</router-link></p> -->
			<!-- <p class="h3">一键智能去背景处理</p> -->
			<!-- <el-checkbox v-model="checked" class="h3">一键智能去背景处理</el-checkbox> -->
			<div class="begin_design_btn hoverable" @click="go_design_func"><div class="anim"></div>智能生成</div>
		</div>

		<div class="auto_copy_wrap wrap_css">
			<div class="search_box">
				<el-input v-model="search_input" placeholder="搜索内容" class="search_input">
				</el-input>
				<i class="icon_search"></i>
			</div>
			<div class="copy_areas">
				<p class="areas_t">推荐文案</p>
				<ul>
					<li v-for="(item, index) in filter_doc" @click="changeSlogan(filter_doc, index)"><span v-html="item"></span></li>
				</ul>
				<p class="none_doc_tips" v-if="!filter_doc.length">我们没有想到合适的文案<br>试试修改输入内容吧</p>
			</div>
		</div>
		
		<!-- 产看大图 -->
		<el-image-viewer
			v-if="showViewer"
			:on-close="closeViewer"
			:url-list="[detailSrc]" />
	</div>
</template>

<style type="text/css" scoped>
	.entry-info{
		width: 100%;
		height: 100%;
		margin:0 auto;
		position: absolute;
		overflow: hidden;
		/*z-index: 2;*/
	}
	.entry-info.appear{
		z-index: 15
	}
	.entry-info .dialog_hide {
		/*content: '';*/
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.2);
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		opacity: 0;
		transition: all 256ms ease;
	}
	.entry-info.appear .dialog_hide {
		opacity: 1;
		z-index: 2;
	}
	.entry_wrap {
		width: 10.34rem;
		height: 7.56rem;
		color: #000;
		position: relative;
		margin:-3.78rem auto 0;
		padding: .67rem 0 0 .58rem;
		z-index: 1;
	}
	.wrap_css {
		box-sizing: border-box;
		top: 50%;
		margin-top: -3.78rem;
		background-color: #fff;
		border-radius: .05rem;
		box-shadow: 0.05rem 0.05rem 0.14rem rgba(0,0,0,.05),
					-0.05rem -0.05rem 0.14rem rgba(0,0,0,.05)
	}
	.entry_wrap h1{
		font-size: .3rem;
		font-weight: bolder;
		text-align: left;
		margin-bottom: .2rem;
	}
	.entry_wrap .h1 {
		font-size: .2rem;
		margin-top: .1rem;
		text-align: left;
		font-weight: bold;
	}
	.entry_wrap .h2 {
		font-size: .16rem;
		margin-top: .1rem;
		text-align: left;
	}
	.entry_wrap .h3 {
		font-size: .16rem;
		margin-top: .3rem;
		text-align: left;
		display: block;
	}
	.entry_wrap .h3 a{
		color: #ff553c
	}
	.entry_wrap .h4 {
		font-size: .16rem;
		margin-top: .05rem;
		text-align: left;
	}

	.input {
		position: relative;
		z-index: 1;
		display: inline-block;
		width: 5rem;
		vertical-align: top;
		float: left;
	}

	.input__field {
		position: relative;
		display: block;
		float: right;
		width: 60%;
		border: none;
		border-radius: 0;
		background: #f0f0f0;
		color: #aaa;
		font-weight: 400;
		-webkit-appearance: none
	}
	.limitNums{
		color: #969696;
		font-size: .18rem;
		position: absolute;
		right: 0;
		width: 15%;
		height: 100%;
		background-color: #fff;
		z-index: 1;
	}
	.limitNums.max{
		color: #ff604c;
	}
	.input__field:focus {
		outline: none
	}

	.input__label {
		display: inline-block;
		float: right;
		padding: 0 1em;
		width: 40%;
		color: #969696;
		font-family: 'SiYuan';
		font-size: .18rem;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none
	}

	.input__label-content {
		position: relative;
		display: block;
		width: 100%
	}

	.graphic {
		position: absolute;
		top: 0;
		left: 0;
		fill: none
	}

	.icon {
		color: #ddd;
		font-size: 150%
	}
	.input--nao {
		overflow: hidden;
		padding-top: .7rem;
		margin-right: .5rem;
	}

	.input__field--nao {
		height: .45rem;
		width: 100%;
		background: 0 0;
		color: #9da8b2;
		font-size: .18rem
	}

	.input__label--nao {
		position: absolute;
		top: .7rem;
		font-size: .18rem;
		left: 0;
		display: block;
		width: 100%;
		text-align: left;
		padding: 0;
		pointer-events: none;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transition: -webkit-transform .2s .15s,color 1s;
		transition: transform .2s .15s,color 1s;
		-webkit-transition-timing-function: ease-out;
		transition-timing-function: ease-out
	}
	.graphic--nao {
		stroke: #92989e;
		pointer-events: none;
		-webkit-transition: -webkit-transform .7s,stroke .7s;
		transition: transform .7s,stroke .7s;
		-webkit-transition-timing-function: cubic-bezier(0,.25,.5,1);
		transition-timing-function: cubic-bezier(0,.25,.5,1)
	}
	.input__field--nao:focus+.input__label--nao,.input--filled .input__label--nao {
		color: #333;
		-webkit-transform: translate3d(0,-.2rem,0);
		transform: translate3d(0,-.2rem,0)
	}

	.input__field--nao:focus~.graphic--nao,.input--filled .graphic--nao {
		stroke: #ff634e;
		-webkit-transform: translate3d(-66.6%,0,0);
		transform: translate3d(-66.6%,0,0)
	}

	/*upload_areas*/
	.upload_areas {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		/*margin-top: 2rem;*/
		margin-top: .7rem;
	}
	.upload_areas p{
		color: #000000;
		font-size: .18rem;
		text-align: left;
		letter-spacing: -1px;
	}
	.upload_area {
		width: 1.52rem;
		position: relative;
	}
	.save_img{
		width: 100%;
		height: 1.5rem;
		background-color: #dfdfdf;
		border-radius: .05rem;
		margin-top: .3rem;
		cursor: pointer;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		z-index: 3;
		transition: all 265ms ease
	}
	.save_img.hadUpload {
		background: url(../assets/answer/icon_1.png) repeat top center;
	}
	.save_img img{
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.save_img:active:before{
		transform: scale(.7)
	}
	.save_img.hadUpload:before{
		display: none;
	}
	.save_img:before {
		content: '';
		width: .68rem;
		height: .68rem;
		/*background-color: #ffffff;
		border-radius: 50%;*/
		display: block;
		line-height: .6rem;
		/*display: flex;*/
		/*align-items: center;*/
		/*justify-content: center;*/
		/*color: #dfdfdf;
		font-size: .8rem;*/
		position: absolute;
		transition: all 265ms ease-in;
		background: url(../assets/answer/upload_icon.png) no-repeat top center/100% auto;
	}
	.product_area{
		margin-left: .86rem;
	}
	.auto_copy_wrap{
		width: 3.44rem;
		height: 7.56rem;
		position: absolute;
		right: -3.44rem;
		z-index: 11;
	}

	/*search_box*/
	.search_box{
		width: 3.74rem;
		height: .58rem;
		background: #fff;
		border-radius: .5rem;
		position: absolute;
		top: -10.4%;
		right: -.3rem;
		overflow: hidden;
	}
	.search_input{
		width: 80%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 2%;
		font-size: .18rem;
	}
	.icon_search{
		width: .25rem;
		height: .25rem;
		background: url(../assets/answer/search.png) no-repeat top center/100%;
		display: block;
		position: absolute;
		right: 15%;
		top: 50%;
		margin-top: -.125rem;
	}
	.copy_areas{
		margin-top: .67rem;
		text-align: left;
		height: 80%;
		/*overflow-y: auto;*/
		/*overflow-x: hidden;*/
		position: relative;
	}
	.areas_t {
		color: #000000;
		font-size: .3rem;
		font-weight: bolder;
		margin: 0 0 .2rem .4rem;
	}
	.copy_areas li {
		list-style: none;
		padding-left: .4rem;
		line-height: .52rem; 
		font-size: .16rem;
		color: rgba(0,0,0,.6); 
		cursor: pointer;
		position: relative;
		transition: all .3s  ease
	}
	.copy_areas li:active {
		transform: scale(.9)
	}
	.copy_areas li:hover {
		width: 105%;
		background: #fff;
		margin-left: -7%;
		padding-left: .7rem;
		box-shadow: 0.05rem 0.05rem 0.14rem rgba(0,0,0,.05), -0.05rem -0.05rem 0.14rem rgba(0,0,0,.05);
		border-radius: .07rem;
		/*list-style-type : disc*/
	}
	.copy_areas li:before {
		content: '';
		width: .12rem;
		height: .12rem;
		background: #ff5b47;
		border-radius: 50%;
		display: block;
		position: absolute;
		left: .1rem;
		top: 0;
		bottom: 0;
		margin: auto;
		opacity: 0;
		transition: all .5s ease;
	}
	.copy_areas li:hover:before {
		opacity: 1;
		left: .5rem;
		/*transform: translateX(.3rem);*/
	}
	.copy_areas li span {
		transition: all 265ms ease;
		display: block;
		width: 95%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.copy_areas li:hover span {
		font-weight: bold;
		color: #ff4838;
	}
	.none_doc_tips{
		color: #ff5342;
		font-size: .24rem;
		text-align: center;
		position: absolute;
		left: 0;
		right: 0;
		top: 15%;
		font-weight: bolder;
	}
	.begin_design_btn{
		display: block;
		width: 1.51rem;
		height: .4rem;
		background: url(../assets/answer/begin_btn.png) no-repeat top center/100% auto;
		margin:.8rem auto 0;
		cursor: pointer;
		transition: all .1s ease;
		color: #ffffff;
		font-size: .2rem;
		text-align: center;
		line-height: .4rem;
		letter-spacing: 1px;
		overflow: hidden;
		position: relative;
	}
	.begin_design_btn:active {
		transform: scale(.9)
	}

	/*cutout_btn*/
	.cutout_btn{
		width: 100%;
		height: .3rem;
		background: rgba(0,0,0,.6);
		position: absolute;
		z-index: 10;
		bottom: 0;
		line-height: .3rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		cursor: pointer;
		overflow: hidden;
	}
	.cutout_btn .icon_cut {
		width: .2rem;
		height: .2rem;
		margin: 0 .05rem 0 .1rem;
		background: url(../assets/icon_cut.png) no-repeat top center/.2rem .2rem ;
	}
	.cutout_btn span {
		color: #fff;
		font-size: .14rem;
		white-space: nowrap;
	}
	.cutout_wrap{
		width: 100%;
		height: 1.5rem;
		border-radius: .05rem;
		position: absolute;
		overflow: hidden;
		bottom: 0
	}

</style>
<style type="text/css">
	.search_input input {
		border: none;
		height: 100%;
		color: #8d8d8d;
		font-size: .16rem
	}
	.delete_img {
		width: .29rem;
		height: .29rem;
		display: block;
		background-color: #ff392c;
		border-radius: 50%;
		-webkit-transition: all .2s ease;
		transition: all .2s ease;
		position: absolute;
		font-size: .25rem;
		line-height: .29rem;
		text-align: center;
		font-weight: bolder;
		color: #fff;
		z-index: 5;
		right: -.1rem;
		top: .45rem;
		cursor: pointer;
	}
	.delete_img:active {
		transform: scale(.8)
	}
	.delete_img.el-icon-circle-close:before{
		content: "\e6db";
		display: block;
		transition: all .2s ease
	}
	.delete_img:hover:before{
		transform: rotate(90deg);
	}
	.entry-info .loading_all{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	.entry-info .el-loading-spinner{display: none!important;}
	.entry-info .el-loading-mask{
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5) url(../assets/img_load.png) no-repeat center/2rem 2rem!important;
	}
	.loading_per {
		width: 100%;
		height: 100%;
	}
	.entry-info .loading_per .el-loading-mask{
		background: rgba(0, 0, 0, 0.5) url(../assets/img_load.png) no-repeat center/1rem 1rem!important;
	}

	.entry-info .check_detail{
		z-index: 5;
		width: 100%;
		height: .3rem;
		font-size: .2rem;
	}
	.el-image-viewer__close{
		top: 15%;
		right: 25%;
	}
</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import anime from 'animejs/lib/anime.es.js';
// import axios from 'axios'
import {cutoutByJpg, getImageMainInfo, cutoutImgMain, uploadImgFiles} from '@/api/service.js' 
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
	name: 'entry-info',
	props: {

	},
	components: { ElImageViewer },
	data() {
		return {
			focusAppear: false,
			search_input:'',
			slogan_input: '这是推荐文案',
			recommend_doc: [
				'越冬，越要燃',
				'恭喜发财',
				'新年快乐',
				'回春之术',
				'为你所鼠',
				'庚子鼠年新年快乐',
				'鼠兆丰年',
				'新年严禁放嘴炮',
				// '期待的未来，其实就在眼前',
			],
			logoImg: '',
			productImg: '',
			logoId: '',
			productId: '',
			userLabels: Array, //存储用户的选择答案
			loading_all: false,
			loading_per_logo: false, //logo抠图进度条
			loading_per_product: false, //product抠图进度条
			request_retry: 0,
			showViewer: false,
			detailSrc: ''
		}
	},
	computed: {
		...mapState(['questionOriginData', 'author_id']),
		limit: function() {
			// 输入字数显示
			return this.slogan_input.length
		},
		logo_cutout_component: function() {
			// logo处的抠图是否显示 （jpg && 不为空）
			if(this.logoImg.indexOf('.jpg') != -1 || this.logoImg.indexOf('.jpeg') != -1){
				return true
			}else{
				return false
			}
		},
		product_cutout_component: function() {
			// product处的抠图是否显示 （jpg && 不为空）
			if(this.productImg.indexOf('.jpg') != -1 || this.productImg.indexOf('.jpeg') != -1){
				return true
			}else{
				return false
			}
		},
		// 筛选1
		filter_doc: function() {
			const _search_input= this.search_input;
			if(_search_input) {
				const reg = new RegExp(_search_input,'ig')
				const _pushArr=[];
				this.recommend_doc.map(function(item) {
					if(item.search(_search_input) != -1){
						const _item=item.replace(_search_input,function(e) {
							return '<strong style="color: #ff5342">'+ e + '</strong>'
						})
						_pushArr.push(_item);
					}
				})
				return _pushArr
			}
			return this.recommend_doc;
		},
	},
	created: function() {
		// const me =this;
		this.busEvent()
		// this.initInput()
	},
	mounted: function() {
		
		
	},
	methods: {
		// initInput: function() {
		// 	if (!String.prototype.trim) {
		// 		(function () {
  //                   // Make sure we trim BOM and NBSP
  //                   var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  //                   String.prototype.trim = function () {
  //                   	return this.replace(rtrim, '');
  //                   };
  //               })();
  //           }

  //           [ ].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
  //               // in case the input is already filled..
  //               if (inputEl.value.trim() !== '') {
  //               	classie.add(inputEl.parentNode, 'input--filled');
  //               }

  //               // events:
  //               inputEl.addEventListener('focus', onInputFocus);
  //               inputEl.addEventListener('blur', onInputBlur);
  //           });

  //           function onInputFocus(ev) {
  //           	classie.add(ev.target.parentNode, 'input--filled');
  //           }

  //           function onInputBlur(ev) {
  //           	if (ev.target.value.trim() === '') {
  //           		classie.remove(ev.target.parentNode, 'input--filled');
  //           	}
  //           }
  //       },
        open_upload_dia_Func: function(index) {
			const me =this;
			this.openMater('inputMsg', me.author_id, index)

			// 统计
			if(index == 1) {
				me.mtj_baidu('uploadLogo','upload', 'uploadLogo')
			}else{
				me.mtj_baidu('uploadProduct','upload', 'uploadProduct')
			}
		},
		busEvent: function() {
			const me =this;
			bus.$on('uploadSuccess_logo',function(data) {
				// 上传成功的函数
				me.uploadSuccessFunc_logo({
					pic_id: data.data.file_id,
					pic_path: data.data.savepath
				})
			})
			bus.$on('uploadSuccess_product',function(data) {
				// 上传成功的函数
				me.uploadSuccessFunc_product({
					pic_id: data.data.file_id,
					pic_path: data.data.savepath
				})
			})
		},
		uploadSuccessFunc_logo: function(data) {
			// 更新logo
			// console.log(data)
			// this.logoImg = data.pic_path
			// this.logoId = data.pic_id
			const me =this;
			me.getImageSize(data.pic_path)
			.then(data =>{
				console.log(data)
				me.logoImg = data.path;
				me.logoId = data.id;
				me.loading_all = false;
			})
			.catch(e => {
				me.uploadSuccessFunc_logo(data)
			})
		},
		uploadSuccessFunc_product: function(data) {
			// 更新product
			// console.log(data)
			// this.getImageSize(data.pic_path, 'product')
			const me =this;
			me.getImageSize(data.pic_path)
			.then(data =>{
				console.log(data)
				me.productImg = data.path;
				me.productId = data.id;
				me.loading_all = false;
			})
			.catch(e => {
				me.uploadSuccessFunc_product(data)
			})
		},
		changeSlogan: function(doc, index) {
			const match_slogan = doc[index].match(/[\u4e00-\u9fa5]/g).join("");
			// 从推荐文案中选择slogan
			this.$set(this, 'slogan_input', match_slogan)
		},
		deleteImgFunc: function(type) {
			// 删除当前图片
			if(type == 'logo') {
				this.logoImg = ''
			}else if(type == 'product') {
				this.productImg = ''
			}
		},
		go_design_func: function() {
			// 跳转到列表页、附带着参数
			const me =this;
			let need_render = 1; //判断是否需要客户端渲染模板 1：需要、0：不需要
			if(me.logoId == '' && me.productId == ''){
				need_render = 0
			}
			this.$router.push({
				name: 'design',
				params: {
					user_labels: me.userLabels,
					need_render: need_render,

					renderTempateData: {
						changeLogo: me.logoImg != '' ? '/uploadFiles/images/' + me.logoImg : '',
						changeMain: me.productImg !='' ? '/uploadFiles/images/' + me.productImg : '',
						logoFileId: me.logoId,
						mainFileId: me.productId
					}
				}
			})

			// 统计
			me.mtj_baidu('autoDesign','click', 'autoDesign_btn')
		},
		// 获取一张图片的主体部分并生成一张新的图片，返回存储该主体图片的path 和 id
		getImageSize: function(imgSrc) {
			const me = this;
			return new Promise((resolve, reject) => {
				me.loading_all = true;
				let fileType = 'png';
				if(imgSrc.indexOf('png') != -1){
					fileType = 'png'
				}else if(imgSrc.indexOf('jpg') != -1 || imgSrc.indexOf('jpeg') != -1) {
					fileType = 'jpg'
				}

				getImageMainInfo(imgSrc) // 调用API获取图片主体信息
				.then(function(data) {
					console.log(data.data.result)
					let img_data = data.data.result
					return cutoutImgMain(imgSrc, img_data, fileType) // 剪切出图片主体部分，生成base64的文件
				}, function(e) {
					reject(e)
				})
				.then((base64Url) => {
					// console.log(path)
					return uploadImgFiles(base64Url,fileType) //将该base64的主体图片存储到服务器
				}, (err) => {
					reject(e)
				})
				.then(data => {
					console.log(data)
					resolve(data.data) //最终返回一个已经存储的主体图片path 和 id
				}, (err) => {
					reject(e)
				})
				.catch(function(e) {
					console.log(e)
					reject(e)
				})
			})

		},
		// cutImgae: function(imgSrc, data, type, fileType) {
		// 	const me =this;
		// 	cutoutImgMain(imgSrc, data, type, fileType)
		// 	.then(path => {
		// 		me.uploadFiles(path, type, fileType)
		// 	})
		// 	.catch(e => {
		// 		console.log(e)
		// 	})
		// },
		// uploadFiles: function(base64Url, type, fileType) {
		// 	const me =this;
		// 	// me.axios.post("/User_images/save_main_body",{
		// 	// 	image_base64: base64Url,
		// 	// 	type: fileType
		// 	// })
		// 	uploadImgFiles(base64Url,fileType)
		// 	.then(function(data) {
		// 		console.log(data.data)
		// 		let respon = data.data
		// 		me.loading_all = false
		// 		console.log(respon)
		// 		if(type == 'logo') {
		// 			me.logoImg = respon.path;
		// 			me.logoId = respon.id;
		// 		}else if(type == 'product') {
		// 			me.productImg = respon.path;
		// 			me.productId = respon.id;
		// 		}
				
		// 	})
		// 	.catch(function(e) {
		// 		console.log(e)
		// 		me.$message('网络不稳定请重试');
		// 	})
		// },
		// 抠图
		/**
		 * [to_cutout description]
		 * @param  {[String]} path  [图片路径]
		 * @param  {[String]} route ['logo' or 'product' 用于确定是哪个区域使用了抠图]
		 * @param  {[Number]} type  [type = 1 时抠图同时保存图片]
		 * @return {[type]}       [description]
		 */
		to_cutout: function(path, route, type=1) {
			const me = this;
			if(route == 'logo') {
				me.loading_per_logo = true
			}else if(route == 'product') {
				me.loading_per_product = true
			}

			cutoutByJpg(path, type)
			.then( data => {
				console.log(data)
				let status = data.code
				if(status == 200) {
					console.log(data)
					me.to_cutout_success(route, data)

				}else if( status == 207) {
					me.to_cutout_err(route)
					me.$message('你今日免费抠图次数已达上限')

					// 统计
					me.mtj_baidu('cutoutSuccess','click','cutoutSuccess')

				}else if(status == 208) {
					me.to_cutout_err(route)
					me.$message('非法用户，无法使用抠图功能！请联系客服')

				}else if(status == 206) {

					if(me.request_retry >= me.max_request) {
						me.to_cutout_err(route)
						me.$message('网络出错请重试！')
					}else{
						me.request_retry += 1;
						me.to_cutout(path, route, type=1)
					}
				}
			})
			.catch( err => {
				console.log(err)
				me.to_cutout_err(route)
				me.$message('网络出错请重试！')
			})
			
		},
		to_cutout_err: function(route) {
			const me =this;
			if(route == 'logo') {
				me.loading_per_logo = false
			}else if(route == 'product') {
				me.loading_per_product = false
			}
		},
		to_cutout_success: function(route,data) {
			const me =this;
			if(route == 'logo') {
				me.loading_per_logo = false
				me.logoImg = data.path
				me.logoId = data.id
			}else if(route == 'product') {
				me.loading_per_product = false
				me.productImg = data.path
				me.productId = data.id
			}
		},
		onPreview(index) {
			if(index == 0) {
				this.detailSrc = '/uploadFiles/images/' + this.logoImg
			}else if(index == 1) {
				this.detailSrc = '/uploadFiles/images/' + this.productImg
			}
			this.showViewer = true
		},
		closeViewer() {
			this.showViewer = false
		},
		// startAniFunc: function() {
		// 	const me =this;
		// 	me.focusAppear = true
		// 	let t1 = anime.timeline({
		// 		easing: 'cubicBezier(.5, .05, .1, .3)',
		// 		duration: 500
		// 	});
		// 	t1.add({
		// 		targets: '.auto_copy_wrap ',
		// 		translateX: -100+ '%',
		// 	})
		// 	.add({
		// 		targets: '.entry_wrap ',
		// 		translateX: -15+ '%',
		// 		scale: .9
		// 	},'-=450')
		// 	.add({
		// 		targets: '.right_blobk ',
		// 		translateX: 100+ '%',
		// 	},'-=450')
			
			
		// },
		// endAniFunc: function() {
		// 	let t2 = anime.timeline({
		// 		easing: 'cubicBezier(.5, .05, .1, .3)',
		// 		duration: 500
		// 	});
		// 	t2.add({
		// 		targets: '.entry_wrap ',
		// 		translateX: 0,
		// 		scale: 1
		// 	})
		// 	.add({
		// 		targets: '.auto_copy_wrap ',
		// 		translateX: 0 + '%',
		// 	},'-=450')
		// 	.add({
		// 		targets: '.right_blobk ',
		// 		translateX: 0+ '%',
		// 	},'-=450')
		// }
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			let tag1 = vm.questionOriginData[1].btns[vm.questionOriginData[1].selectIndex].id,
			tag2 = vm.questionOriginData[2].btns[vm.questionOriginData[2].selectIndex].id;
			vm.userLabels = tag1 +','+ tag2
			console.log(vm.userLabels)
		})
	}
}

</script>