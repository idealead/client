<template>
	<div class="design_w flex_c">
		<div class="part_top flex_c">
			<div class="design_title_w">
				<p class="design_t">根据<span>你的信息</span>做了设计</p>
				<img src="../assets/answer/icon_4.png" class="icon1_t">
				<img src="../assets/answer/icon_3.png" class="icon2_t" alt="">
			</div>
			<div class="design_tag_w" v-show="!loading_all">
				<div class="feature_tag feature_tag_all" :class="{'active' : select_label_index == -1}" @click="selectLabel('all')">推荐</div>
				<div class="feature_tag" v-for="(item, index) in design_labels" @click="selectLabel('other', index)" :class="{'active' : select_label_index == index}">{{item}}</div>
			</div>
		</div>
		<!-- lists S -->
		<div class="part_bottom">
			<div class="loading_all" v-loading="loading_all" element-loading-background="rgba(0, 0, 0, 0)"></div>
			<div class="design_lists scroll" v-show="!loading_all">
				<div class="design_wrap">
					<div class="design_list cards" v-for="(item, index) in filter_design_data" v-show="item.isLoaded">
						<a :href="'http://ht.idealead.hbindex.com/html/dist/#/canvas?userType=client&user_id=' + author_id + '&tempId=' + item.id" target="_blank" @click="mtj_baidu('template','link',`toEditedTemplateId${item.id}`)">
							<img :src="item.path" @load="design_img_load(index)">
							<!-- <img :src="item.watermark_path" @load="design_img_load" v-show="item.watermark_path != undefined"> -->
							<!-- <svg 
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							width="100%" height="1334px">
								<image x="0px" y="0px" width="100%" height="1334px" :xlink:href="'data:img/png;base64,' + item.path"></image>
							</svg> -->
						</a>
						<!-- design_other_component S-->
						<div class="design_block">
							<div class="block_top">
								<p><span>{{item.price}}</span>积分</p>
								<div class="block_btns">
									<img src="../assets/design/donwload_btn.png" class="download_btn" @click="downsTips(index)" alt="">
									<div class="collect_btn" :class="{'collected':item.isCollect}" @click="collectDesign(index, item.id, item.level)">
										<svg 
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										width="100%" height="100%" preserveAspectRatio="xMinYMin meet" viewBox="0 0 17 17" class="collect_icon" >
										<path fill-rule="evenodd"  stroke="rgb(255, 72, 56)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="rgb(255, 255, 255)"
										d="M8.813,8.021 L7.686,5.755 L5.353,4.170 L3.019,5.755 L3.019,10.507 L9.242,15.260 L15.464,10.904 L15.464,5.359 L13.131,4.170 L10.797,5.755 L9.670,8.021 "/>
										</svg>
									</div>
								</div>
							</div>
							<div class="block_bottom">
								<span v-for='(label, index) in item.labels'>{{label}}</span>
							</div>
						</div>
						<!-- design_other_component E-->
					</div>
					<div class="loading_per" v-if="loading_per"><img :src="filter_design_data[0].path"></div>
				</div>
				<div class="progress_button" :class="{'unabale':isLoading || loading_per}" v-show="!loading_all" v-if="!maxValue">
				<!-- <div class="progress_button unabale"> -->
					<div class="load_more_btn hoverable" @click="load_more_func">
						<div class="anim"></div>
						加载更多
					</div>
					<div class="progress">
						<span class="progress-inner notransition" :style="{width: progressWidth +'%'}"></span>
					</div>
				</div>
			</div>
		</div>
		<!-- lists E -->

		<!-- 返回底部 S-->
		 <el-backtop target=".design_lists" :right='150' :bottom='50'><div></div></el-backtop>
		 <!-- 返回底部 E -->

		 <!-- dialog tips S -->
		<el-dialog :visible.sync="download_tips_dia" width="4.2rem" customClass="download_tips">
			<p class="tips_title">确定下载？</p>
			<p class="tips_doc">该次下载将消耗你10个积分</p>
			<div class="comfirm_down hoverable" @click="downsFunc"><div class="anim"></div>确定下载</div>
		</el-dialog>
		<!-- dialog tips E -->
		
		<feedBack></feedBack>
		<!-- common part S-->
		<div class="common_wrap ps0">
			<div class="click_btns flex">
				<div class="prev_btn click_btn flex" @click="prevFunc">
					<div class="deco flex hoverable">
						<div class="anim"></div>
					</div>
					<!-- <span class="one">上一步 prev</span> -->
				</div>
			</div>
		</div>
		<!-- common part E -->
	</div>
</template>
<style type="text/css" scoped>
	.common_wrap{
		height: 100%;
		overflow: hidden;
	}
	.ps0{
		width: 100%;
		position: absolute;
		/*position: absolute;
		top: 0;
		left: 0;*/
	}
	.flex {
		display: flex;
		align-items: center;
	}
	.click_btns{
		position: absolute;
		top: 4%;
		left: 12%;
		justify-content: space-between;
		z-index: 10;
	}
	.click_btns span{
		color: #a3a3a3;
		font-size: .18rem;
	}
	.click_btn {
		justify-content: center;
		cursor: pointer;
	}
	.prev_btn{
		margin-left: .5rem;
		transition: all .2s ease
	}
	.prev_btn:active {
		transform: scale(.8);
	}

	.design_w .deco{
		width: .5rem;
		height: .5rem;
		background: url(../assets/back_icon.png) no-repeat top center/100%;
		position: relative;
		margin-right: .05rem;
	}
	.prev_btn:hover {
		transform: translateX(-.1rem);
	}

	/*.deco:before {
		content: '';
		width: .23rem;
		height: .19rem;
		background: url(../assets/back_icon2.png) no-repeat top center/100% auto;
		display: block;
		/*border-radius: .1rem;
		/*transition: transform .2s ease;
	}*/
	.prev_btn .deco:before{
		margin-right: 8%;
	}
	.prev_btn .deco{
		justify-content: center;
	}
</style>
<style type="text/css" scoped>
	.design_w{
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.flex_c {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.design_w{
		justify-content: flex-start;
	}
	.part_top{
		width: 100%;
		min-height: 1.5rem;
	}
	.part_bottom{
		position: relative;
		width: 100%;
		z-index: 1;
		padding-top: .2rem;
		overflow: hidden;
		background: #f7f6f4;
		flex:1;
	}
	.design_title_w{
		width: 5.1rem;
		height: 1rem;
		margin: 0 auto;
		position: relative;
		z-index: 10;
	}
	.design_t{
		font-size: .36rem;
		color: #000000;
		font-weight: bolder;
		position: absolute;
		left: 15%;
		margin: 0 auto;
		bottom: .01rem;
		letter-spacing: -2px;
	}
	.design_t span {
		color: #ff5240;
	}
	.design_title_w .icon1_t{
		width: .34rem;
		position: absolute;
		bottom: 0.04rem;
		left: .1rem;
	}
	.design_title_w .icon2_t{
		width: .77rem;
		position: absolute;
		right: 0;
		bottom: .15rem;
	}
	/*design_tag_w*/
	.design_tag_w{
		/*width: 5.1rem;*/
		flex: 1;
		margin-top: .4rem;
		position: relative;
		z-index: 10;
		padding: 0 .9rem;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
		display: none;
	}
	.feature_tag{
		min-width: .67rem;
		line-height: .3rem;
		color: #9c9c9c;
		font-size: .18rem; 
		cursor: pointer;
		position: relative;
		display: flex;
		justify-content: center;
		transition: all .2s ease
	}
	.feature_tag.active, .feature_tag:hover {
		color: #000;
	}
	.feature_tag:before {
		content: '';
		width: 0;
		height: .08rem;
		background: #ff392c;
		position: absolute;
		z-index: -1;
		bottom: .05rem;
		opacity: 0;
		transition: all .6s ease;
	}
	.feature_tag.active:before {
		width: 100%;
		opacity: 1;
	}

	/*design_lists*/
	.design_lists{
		width: 100%;
		/*width: 85%;*/
		height: 100%;
		overflow: auto;
		margin: 0 auto;
		box-sizing: border-box;
		text-align: center;
		padding: .5% 6% 5%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.design_lists .clearfix{
		/*content: '';*/
		display: block;
		overflow: auto;
		zoom: 1;
	}
	/*loading_per*/
	.loading_per {
		width: 14%;
		float: left;
		margin: 1% 1.3% 0;
		background: url(../assets/img_load.png) no-repeat center center/1rem 1rem;
	}
	.loading_per img{
		max-width: 100%;
		opacity: 0;
	}
	/*desogn_list*/
	.design_list {
		width: 14%;
		margin: 1% 1.3% 0;
		float: left;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		border-radius: .05rem;
		box-shadow: 0.05rem 0.05rem 0.14rem rgba(0,0,0,.05),
					-0.05rem -0.05rem 0.14rem rgba(0,0,0,.05);
		transition: transform .3s ease-out;
	}
	.design_list:hover {
		box-shadow: 0.05rem 0.05rem 0.14rem rgba(0,0,0,.2),
					-0.05rem -0.05rem 0.14rem rgba(0,0,0,.2);
	}
	.max_w .design_list {
		width: 31%;
	}
	.design_list img{
		width: 100%;
		display: block;
		height: auto;
	}
	.design_block{
		width: 100%;
		height: .5rem;
		background: #fff;
		/*position: absolute;*/
		padding: 0 5%;
		bottom: 0;
		box-sizing: border-box;
	}
	.block_top{
		height: 100%;
		/*height: .4rem;*/
		/*border-bottom: 1px solid #ececec;*/
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.block_top p {
		color: #454545;
		font-size: .15rem;
	}
	.block_btns{
		display: flex;
	}
	.block_btns img {
		cursor: pointer;
	}
	.block_top .download_btn{
		width: .14rem;
		margin-right: .1rem;
		transition: all .2s ease
	}
	.block_top .download_btn:active{
		transform: scale(.8)
	}
	.collect_btn {
		width: .17rem;
		height: .17rem;
		position: relative;
		transform: scale(1.2);
		margin-right: .1rem;
	}
	.collect_btn:hover {
		animation: pulse .8s ease infinite alternate;
	}
	.collect_btn .collect_icon{
		position: absolute;
		left: 0;
		right: 0;
	}
	.collect_icon path{
		transition: all .3s ease
	}
	.collect_btn .collect_icon{
		transition: all .2s ease
	}
	.collect_btn .collect_icon:active {
		transform: scale(.9)
	}
	.collect_btn.collected .collect_icon path{
		fill:#ff4838;
	}

	.block_bottom {
		width: 100%;
		height: .4rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
	}
	.block_bottom span {
		color: #454545;
		font-size: .15rem;
		margin-right: .03rem;
	}
	.tips_title{
		color: #000000;
		font-size: .3rem;
		font-weight: bolder;
	}
	.tips_doc{
		color: #000;
		font-size: .18rem;
		margin-top: 6%;
	}
	.comfirm_down{
		width: 1.33rem;
		height: .41rem;
		background: url(../assets/dialog/login_btn.png) no-repeat top center/100%;
		margin: 15% auto 0;
		line-height: .41rem;
		font-size: .2rem;
		color: #fff;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: all .2s ease-in;
	}
	.comfirm_down:active {
		transform: scale(.8)
	}
	.download_tips{
		border-radius: .15rem
	}
	@keyframes pulse {
		from {
			-webkit-transform: scale3d(1, 1, 1);
			transform: scale3d(1, 1, 1);
		}

		50% {
			-webkit-transform: scale3d(1.2, 1.2, 1.2);
			transform: scale3d(1.2, 1.2, 1.2);
		}

		to {
			-webkit-transform: scale3d(1, 1, 1);
			transform: scale3d(1, 1, 1);
		}
	}

	.loading_all{
		width: 2rem;
		height: 2rem;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		top: 50%;
		margin-top: -2rem;
	}
	.progress_button {
		display: block;
		margin: 3% auto 0;
		position: relative;
		transition: transform 0.5s;
		-webkit-transition: -webkit-transform 0.5s;
		transition: transform 0.5s;
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
	}
	.unabale.progress_button{
		-webkit-transform: rotateX(90deg) translateZ(10px);
		transform: rotateX(90deg) translateZ(10px);
	}
	.progress {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		height: .2rem;
		-webkit-transform: rotateX(-90deg);
		transform: rotateX(-90deg);
		-webkit-transform-origin: 50% 0%;
		transform-origin: 50% 0%;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		background: rgb(255,54,30,.5);
		border-radius: .5rem;
		overflow: hidden;
	}
	.progress-inner {
		top: 0;
		width: 0;
		height: 100%;
		-webkit-transition: width 0.5s ease, opacity 0.3s;
		transition: width 0.5s ease, opacity 0.3s;
		position: absolute;
		left: 0;
		background: #ff361e;

	}
	.notransition {
		-webkit-transition: none !important;
		transition: none !important;
	}

	

	.load_more_btn{
		color: #fff;
		width: 2.08rem;
		height: .58rem;
		background: url(../assets/begin_kv.png) no-repeat top center/100%;
		line-height: .58rem;
		text-align: center;
		overflow: hidden;
		font-size: .24rem;
		cursor: pointer;
		transition: all .2s ease;
		position:relative;
		overflow: hidden;
	}
	.load_more_btn:active{
		transform: scale(.9);
	}
	/*.unabale.load_more_btn{
		width: 1rem;
		height: 1rem;
		background: url(../assets/img_load.png) no-repeat top center/100% 100%;
		font-size: 0;
	}*/
</style>
<style type="text/css">
	.loading_all .el-loading-spinner{display: none!important;}
	.loading_all .el-loading-mask{
		width: 100%;
		height: 100%;
		background: url(../assets/img_load.png) no-repeat top center/100%;
	}
	.el-backtop{
		background: none;
		box-shadow: none;
	}
	.el-backtop div{
		width: 0.5rem;
		height: 0.5rem;
		transition: all .2s ease;
		background: url(../assets/design/back_top.png) no-repeat top center/100% auto;
	}
	.el-backtop div:hover {
		background-image: url(../assets/design/back_top_hover.png);
	}
	.el-backtop div:active {
		transform: scale(.8);
	}
</style>

<script type="text/javascript">
import feedBack from '@/components/feedBack.vue'
import bus from "@/bus.js"
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import anime from 'animejs/lib/anime.es.js';
import renderTemp from '../plugins/renderTemp.js'
import * as PIXI from 'pixi.js'
import _ from 'lodash'
import {collectTempate, cancelCollectTempate, addDownloadOrder, loadMoreTemplate, getMatchTemplate} from '@/api/service.js' 

export default {
	name: 'design',
	props: {

	},
	data(){
		return {
			loading_all: true,
			loading_per: false,
			loading_count: 0,
			download_tips_dia: false,
			download_tips_index: Number,
			select_label_index: -1,
			need_render: this.$route.params.need_render,  //判断是否需要客户端渲染模板 1：需要、0：不需要
			renderTempateData: this.$route.params.renderTempateData,
			origin_design_data: [
				// {	
				// 	'id': 1, 
				// 	'path': require('@/assets/design/design_1.jpg'),
				// 	'price' : 10,
				// 	'isCollect': false,
				// 	'level': 'temporary',
				//	 'labels': ['新年', '红包', '对联']
				// },
			],
			origin_design_data_len: 0, //列表页的长度
			cur_page: 0, //目前的页数
			design_labels: ['新年', '红包', '对联', '祝福', '灯笼', '利是'],
			isLoading: false, //是否正在request请求数据
			progressWidth: 0,
		}
	},
	watch: {
	},
	computed: {
		...mapState(['author_id', 'design_lists', 'max_pages', '_need_render', '_renderTempateData']),
		canvas_: function(){
			return new PIXI.Application({
				backgroundColor: 0xf5f5f5,
				width: 2500,
				height: 2500,
				antialias: 1
			});
		},
		download_obj: function() {
			return {
				path: this.filter_design_data[this.download_tips_index].path,
				id: this.filter_design_data[this.download_tips_index].id,
				price: this.filter_design_data[this.download_tips_index].price
			}
		},
		filter_design_data: function() {
			// 过滤元素标签
			const _select_label_index= this.select_label_index;
			if(_select_label_index != -1) {
				const _select_label = this.design_labels[_select_label_index]
				const reg = new RegExp(_select_label,'ig')
				const _pushArr=[];
				this.origin_design_data.map(function(item) {
					item.labels.map((label) => {
						if(label.search(_select_label) != -1){
							_pushArr.push(item);
						}
					})
				})
				return _pushArr
			}
			return this.origin_design_data;
		},
		maxValue: function() {
			let page =this.cur_page
			if(page == this.max_pages) {
				return true
			}else {
				return false
			}
		},
	},
	mounted: function() {
		this.hoverFunc()
		// 存是否需要渲染参数
		if(this.$route.params.need_render !=undefined) {
			this.setNeedRender(this.$route.params.need_render)
		}
		// 存上传的图片资源
		if(this.$route.params.renderTempateData !=undefined) {
			this.setRenderData(this.$route.params.renderTempateData)
		}else{
			this.$set(this, 'renderTempateData', this._renderTempateData)
		}
	},
	methods: {
		...mapMutations(['setDesignLists', 'setMaxPages', 'setNeedRender', 'setRenderData', 'setUserIntegral']),
		// ...mapActions(['setDesignLists']),
		prevFunc: function() {
			const me =this;
			// 返回上一页
			me.$router.go(-1)
		},
		design_img_load: function(index) {
			// 一半load完解除loading
			
			// console.log(index)
			this.finishLoading = index;
			this.origin_design_data[index].isLoaded = true
			 
			this.loading_count+=1;			
			if(this.loading_count == 2) {
				this.autoLoadingProgress();
			}

			if( this.loading_count >= 2){
				this.loading_all = false; //解除全局loading
				this.loading_per = true; //开始单个loading
			}
			if(this.loading_count >= this.origin_design_data_len){
				this.loading_per = false
			}

		},
		autoLoadingProgress :function() {
			// 作假的loading 随时删除 不知道意义是什么
			const me = this;
			me.progressWidth = 0;
			let id=setInterval(()=>{
				me.progressWidth +=5;
				if(me.progressWidth >= 90){
					clearInterval(id);
				}
			},600);
		},
		collectDesign: function(index, id, level) {
			const me =this;
			const tar =this.filter_design_data[index];
			// 这里要更改数据
			tar.isCollect = !tar.isCollect;

			let clone_origin_design_data= _.cloneDeep(me.origin_design_data);
			clone_origin_design_data.map((item) => {
				delete item.watermark_path;
			})
			console.log(clone_origin_design_data)
			me.setDesignLists(clone_origin_design_data) //更新store
			
			let render = 1;  //判断该模板是是否设计原图 1：不是原图 2：原图 
			if(level == 'permanent') {
				render = 2;
			}else {
				render = 1
			}
			if(!tar.isCollect) {
				// test
				me.cancel_collect_func(id, render)
			}else{
				me.to_collect_func(id, render)
			}
		},
		to_collect_func: function(template_id, render) {
			// 收藏
			// template_id: 模板id
			// render： 判断该模板的类别 1：用户渲染图 2：原图 
			const me = this;
			// me.axios.post("/Collection/add_collection",{
			// 	template_id: template_id,
			// 	is_user: render
			// })
			collectTempate(template_id,render)
			.then(function(data) {
				me.$message('收藏成功！');

				// 统计
				me.mtj_baidu('collect_success','click', `collecteTemplate${template_id}`)
			})
			.catch(function(e) {
				console.log(e)
			})
		},
		cancel_collect_func: function(template_id, render) {
			// 取消收藏
			const me = this;
			cancelCollectTempate(template_id,render)
			.then(function(data) {
				me.$message('取消成功');
				// 统计
				me.mtj_baidu('cancel_collect','click', `cancaelCollecteTemplate${template_id}`)
			})
			.catch(function(e) {
				console.log(e)
			})
		},
		// 打开下载扣除积分提示弹窗
		downsTips: function(index){
			this.download_tips_dia = true;
			this.$set(this, 'download_tips_index', index)
			// this.download_tips_index = index 
			//保存点击下载按钮的当前索引，用于获得当前模板的各位信息

		},

		// 点击提示弹窗的下载按钮触发
		downsFunc: function() {
			const me =this;
			// this.axios.post("/Order/add_order",{
			// 	template_id: me.download_obj.id,
			// })
			addDownloadOrder(me.download_obj.id)
			.then(function(data) {
				console.log(data)
				if(data.code == 200) {
					me.downs(me.download_obj.path, true); //公共下载方法
					me.download_tips_dia = false //关闭下载提示弹窗
					me.setUserIntegral(data.integral)
					me.$message('下载成功')

					// 统计
					me.mtj_baidu('download_success','click', `downloadTemplate${me.download_obj.id}`)
				}else if(data.code == 203) {
					me.download_tips_dia = false //关闭下载提示弹窗
					me.$message('积分不足，请充值')
				}else {
					me.$message('下载失败，请重试')
				}
			})
			.catch(function(e) {
				console.log(e)
				me.$message('下载失败，请重试')
			})
			
		},
		// 选择内容标签
		selectLabel: function(flag, index=-1){
			this.select_label_index = index;
		},
		// 加载更多 （加载更多不需要存session）
		load_more_func: function() {
			const me = this;
			if( !me.isLoading ){

				if(me.cur_page < me.max_pages) {
					me.cur_page+=1;
					me.isLoading = true; //设置正在请求标志
					me.autoLoadingProgress() // 开始loading

					// 统计
					me.mtj_baidu('load_more','click', 'load_more_design')

					// 开始请求
					// this.axios.get(`/Template/get_paging&page=${me.cur_page}`)
					loadMoreTemplate(me.cur_page)
					.then(function(data) {
						console.log(data)
						// 公共数据
						// 转成数组
						let arr_ = [];
						for(let i in data.data) {
							arr_.push(data.data[i])
						}
						// 处理原始数据
						me.handle_origin_data(arr_)
						console.log(arr_)

						let cur_len = me.origin_design_data.length + arr_.length
						me.$set(me, 'origin_design_data_len', cur_len)


						if(me._need_render === 0) {
							// 不需要渲染
							me.loading_per = true; //开始单个loading

							arr_.forEach((item) => {
								setTimeout(function() {
									me.origin_design_data.push(item)
								},500)
							})
							
						}else if(me._need_render === 1) {
							// 需要渲染
							me.loading_per = true; //开始单个loading
							me.renderTempate(0, arr_, false)
						}

						setTimeout(function() {
							me.isLoading = false //设置请求结束标注
						},500)
					})
					.catch(function(e) {
						console.log(e)
						
					})
				}else{
					// 最大页码
					me.$message('敬请期待更多设计吧！')
					
				}
			}else{
				return false
			}
		},
		// 鼠标放上去效果
		hoverFunc: function() {
			let cards = document.querySelectorAll(".cards");
			let range = 15;
			let calcValue = function calcValue(a, b) {return (a / b * range - range / 2).toFixed(1);}; 
			let timeout = void 0;
			cards.forEach(function (card) {
				card.addEventListener('mousemove', function (_ref) {
					let x = _ref.x,
					y = _ref.y;
					if (timeout) {
						window.cancelAnimationFrame(timeout);
					}

					timeout = window.requestAnimationFrame(function () {
						let yValue = calcValue(y, window.innerHeight);
						let xValue = calcValue(x, window.innerWidth);
						// console.log(xValue, yValue);
						card.style.transform = "translateX(" + -xValue + "px) translateY(" + yValue + "px)";
					});
				}, false);

			})
		},
		// 图片loading方法
		// loadingFunc_: function() {
		// 	let pic
		// },

		// 以下都是渲染的数据处理

		// 处理原始模板数据
		handle_origin_data: function(datas) {
			const me =this;
			// 只是加入是否收藏；给path加上前缀
			
			datas.map((data) => {
				data.isCollect = false;
				// data.isDownload = false;
				data.isLoaded = false;
				// data.renderTempId = '';  不需要renderTemId
				// data.render_preview_img = ''; //不需要render_preview_img
				data.path = 'http://ht.idealead.hbindex.com/uploadFiles/images/' + data.path;
			})
			// console.log('处理原始模板数据之后：', datas)
			return datas
		},
		renderTempate: function(index, data, set=false) {
			console.log(index)
			const me =this;
			let	render_datas = {};  //传到渲染方法里的数据
			let renderTempateData = _.cloneDeep(me.renderTempateData); //深拷贝一个用户上传的图片对象

			// console.log()

			
			// console.log('用户上传的图片的数据对象',renderTempateData)

			render_datas.tempId = data[index].id; 
			render_datas.app =me.canvas_;
			render_datas.expand = false;
			Object.assign(render_datas, renderTempateData); //合并对象

			console.log('传入到渲染组件的对象参数：', render_datas)

			//渲染组件的调用方法 参数 {tempId , app, expand=false, 用户上传图片的数据对象}
			renderTemp.tempInit(render_datas) 
			.then(backData => {
				console.log('渲染出来的数据: ',backData);

				data[index].id = backData.renderTempId; //渲染图的id替换原id

				data[index].path = '/uploadFiles/images/' + backData.render_preview_img; //渲染图的地址替换原地址

				// console.log(backData.render_preview_img)
				data[index].level = 'temporary'; //渲染图的地址替换原地址

				me.origin_design_data.push(data[index]); //将当前渲染的模板插进去origin_design_data
		        // 判断是否需要存到
		        if(set) {
		        	me.setDesignLists(me.origin_design_data)		        	
		        }

				me.judgeProcess(index, data, set) // 判断是否渲染完毕替换素材的模板
			})
			.catch(_ => {
				me.judgeProcess(index, data, set) // 判断是否渲染完毕替换素材的模板
			});
		},
		// 判断替换素材渲染模板的进程（渲染到第几个）
		judgeProcess: function(index, data, set=false) {
			const me =this;
			const templatesDatasLength = data.length - 1;
			console.log(templatesDatasLength)
			if(index < templatesDatasLength) {
		        // 还未渲染完执行
		        me.renderTempate(index+1, data, set)
		        // watermark.destroy()
		    }else {
		        //渲染结束之后执行
		        // console.log('最终渲染完的数据', data)
		        // 最后一次性加上水印
		       // data.map((item) => {
		       //  	this.watermark(item.path).then(function(value) {
		       //  		return item.watermark_path =  value
		       //  	})	
		       //  })
		       // me.origin_design_data = data;
		       
		        
		    }
		},

	},
	updated: function() {
		this.hoverFunc()
	},
	beforeRouteEnter(to, from, next) {
		console.log(to.params.renderTempateData)
		next((vm) => {
			const that = vm;
			that.loading_all = true;
			
			const need_rquest =(() =>{
				return to.params.need_render != undefined;
			})() 
				
			if(need_rquest) {
				// 需要请求匹配模板
				// that.axios.post('/Template/get_all_template',{
				// 		labels: JSON.stringify(to.params.user_labels)
				// 	}
				// )
				getMatchTemplate(to.params.user_labels)
				.then(function(data) {
					// console.log('data',data)
					// 保存最大值
					that.setMaxPages(data.max_pages)
					// 设置返回模板数目
					that.$set(that, 'origin_design_data_len', data.data.length)

					// that.loading_all = false; //接触全局loading
					if(data.code == 200) {
						var temporary_datas = that.handle_origin_data(data.data); //处理之后的原始匹配模板数据
						
						if(to.params.need_render == 0) {
							// 不需要客户端渲染
							//渲染结束之后执行
							
							
							console.log('最终渲染完的数据', temporary_datas)

							that.setDesignLists(temporary_datas)

							// 加水印
							// temporary_datas.map((item) => {
							// 	that.watermark(item.path).then(function(value) {
							// 		return item.watermark_path =  value
							// 	})	
							// })

							that.origin_design_data = temporary_datas;
							
							
						}else{
							
							that.renderTempate(0, temporary_datas, true)
						}
						
						
					}else{
						// 没有匹配到模板
					}
				})
				.catch(function(e) {
					console.log(e)
				})


				
			}else if(vm.design_lists.length != 0){
				// 查询store session是否有模板
				
				// 先加上水印再赋值
				// vm.design_lists.map((item) => {
				// 	vm.watermark(item.path).then(function(value) {
				// 		return item.watermark_path =  value
				// 	})	
				// })
				vm.origin_design_data = vm.design_lists;
				// that.loading_all = false;
			}else{
				// 啥都没有就请返回到首页吧大哥
				vm.$router.push('/')
			}

			// 所有搞掂之后再执行
			that.hoverFunc()
			
		})
	},
}

</script>