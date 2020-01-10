<template>
	<div class="cutout_w" v-loading="loading" element-loading-spinner="el-icon-loading">
		<div class="cutout_cover">
			<div class="cutout_wrap cutout_wrap_1" v-if="!uploadSuccess">
				<div class="cutout_game">
					<div class="origin_pic" :style="{width: dragValue + '%'}">
						<img src="../assets/cutout/origin_pic.jpg">
					</div>
					<img src="../assets/cutout/cutout_pic.png" class="cutout_pic">
					<div class="drag_line">
						<el-slider v-model="dragValue" :show-tooltip="false"></el-slider>
					</div>
				</div>
				<h2>智能抠图</h2>
				<!-- <p></p> -->
				<p>节省你的时间，把抠图留给我们</p>
				<!-- <div class="cutout_upload_btn hoverable" @click="openMater()"> -->
				<div class="cutout_upload_btn hoverable" @click="open_upload_dia_Func()">
					<div class="anim"></div>上传图片
				</div>
			</div>

			<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
				<div class="cutout_wrap cutout_wrap_2" v-if="uploadSuccess">
					<div class="cutout_part">
						<p>原图</p>
						<div class="origin_area">
							<img :src="'/uploadFiles/images/' + origin_pic">
						</div>
						<div class="btns_wrap">
							<div class="up_btns">
								<span class="reupload_btn hoverable btn" @click="open_upload_dia_Func()"><span class="anim"></span>重新上传</span>
							</div>
						</div>
					</div>
					<div class="origin_part">
						<p>移除背景</p>
						<div class="cutout_area">
							<img :src="cutout_pic">
							<i class="el-icon-zoom-in check_detail" @click="onPreview"></i>
						</div>
						<div class="btns_wrap">
							<div class="up_btns">
								<span class="download_btn hoverable btn" @click="download_func()"><span class="anim"></span>下载到本地</span>
								<span class="save_btn hoverable btn" :class="{'saved' : saved}" @click="save_to_material(author_id, cutout_pic)"><span class="anim"></span>保存至素材库</span>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>	

		<!-- 下载提示弹窗 -->
		<!-- <el-dialog :visible.sync="download_tips_dia" width="4.2rem" customClass="download_tips">
			<p class="tips_title">确定下载？</p>
			<p class="tips_doc">该次下载将消耗你10个积分</p>
			<div class="comfirm_down hoverable" @click="confirm_downs_func"><div class="anim"></div>确定下载</div>
		</el-dialog> -->
	

		<feedBack></feedBack>
		<!-- common part -->
		<div class="common_wrap ps0">
			<div class="circle_change ps0">
				<img src="../assets/answer/dot.png" class="dot_bg">
				<img src="../assets/answer/circle.png" class="circle">
			</div>
			<!-- <div class="click_btns flex">
				<div class="prev_btn click_btn flex" @click="prevFunc(answer_index)">
					<div class="deco flex"></div>
					<span class="one">上一步 prev</span>
				</div>
			</div> -->
			<transition appear appear-active-class="animated fadeIn">
				<div class="deco flex hoverable prev_btn" @click="prevFunc()">
					<div class="anim"></div>
				</div>
			</transition>
			<transition appear appear-active-class="animated fadeIn">
				<div class="deco back_btn_home hoverable" @click="toQa">
					<div class="anim"></div>
					智能生成
				</div>
			</transition>
		</div>

		<el-image-viewer
			v-if="showViewer"
			:on-close="closeViewer"
			:url-list="[cutout_pic]" />
	</div>
</template>

<style type="text/css" scoped>
	.cutout_w{
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.common_wrap{
		height: 100%;
		overflow: hidden;
	}
	.common_wrap .fadeIn{
		animation-delay: .8s
	}
	.ps0{
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.circle_change img{
		position: absolute;
		top: 0;
	}
	.dot_bg {
		left: 0;
		object-fit: cover;
	}
	.circle{
		width: 16.34rem;
		position: absolute;
		top: 0;
		right: 0;
	}
	.flex {
		display: flex;
		align-items: center;
	}
	.click_btns{
		width: 100%;
		height: .2rem;
		position: absolute;
		bottom: .35rem;
		justify-content: space-between;
	}
	.click_btns span{
		color: #a3a3a3;
		font-size: .18rem;
	}
	.click_btn {
		justify-content: center;
		cursor: pointer;
	}
	
	/*comm back S*/
	/*.prev_btn{
		width: .5rem;
		height: .5rem;
		background: url(../assets/back_icon.png) no-repeat top center/100%;
		position: relative;
		margin-right: .05rem;
	}
*/
	.deco{
		width: .5rem;
		height: .5rem;
		background: url(../assets/back_icon.png) no-repeat top center/100%;
		cursor: pointer;
		position: absolute;
		top: 4%;
		left: 12%;
		z-index: 10;
		margin: 0 .05rem 0 .5rem;
		transition: all .2s ease
	}
	.deco:active {
		transform: scale(.8);
	}
	.deco:hover {
		transform: translateX(-.1rem);
	}

	/*.deco:before {
		content: '';
		width: .23rem;
		height: .19rem;
		background: url(../assets/back_icon2.png) no-repeat top center/100% auto;
		display: block;
		border-radius: .1rem;
		transition: transform .2s ease;
	}*/
	.deco:before{
		margin-right: 8%;
	}
	.deco{
		justify-content: center;
	}
	
	/*comm back E
	*/
	.back_btn_home{
		width: 1rem;
		line-height: .5rem;
		background: none;
		font-size: .18rem;
		text-align: center;
		color: #4f4f4f;
		right: 13%;
		left: auto;
		transition: all .5s ease;
	}
	.back_btn_home:hover{
		color: #ff3e27;
		text-decoration: underline;
	}
	.back_btn_home:hover{
		transform: none;
	}
	.cutout_cover{
		width: 12rem;
		height: 100%;
		margin:0 auto;
		position: relative;
		z-index: 1;
		overflow: hidden;
	}
	.cutout_wrap{
		width: 11.28rem;
		height: 7.44rem;
		margin: 5% auto 0;
		background: url(../assets/cutout/bg.png) no-repeat top center/100% auto;
		padding-top: 1px;
		color: #000000;
	}
	.cutout_game {
		width: 8rem;
		height: 3.66rem;
		margin: 1.2rem auto 0;
		position: relative;
		background: url(../assets/cutout/mas.png) no-repeat top center/ auto 100%;
	}
	.origin_pic{
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		transition: all 0s ease
	}
	.origin_pic img{
		width: 8rem;
	}
	.cutout_pic {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.drag_line{
		width: 100%;
		height: 4.16rem;
		/*background: url(../assets/cutout/line.png) no-repeat top center/.4rem auto;*/
		position: absolute;
		top: -.25rem;
	}
	.cutout_wrap h2 {
		font-size: .3rem; 
		margin-top: .7rem
	}
	.cutout_wrap p {
		font-size: .18rem;
		margin-top: .12rem;
	}
	.cutout_upload_btn{
		width: 2.72rem;
		height: .77rem;
		background: url(../assets/cutout/upload_btn.png) no-repeat top center/100%;
		font-size: .3rem;
		line-height: .77rem;
		text-align: center;
		color: #ffffff;
		position: relative;
		left: 0;
		right: 0;
		margin: 9% auto 0;
		cursor: pointer;
		transition: all .2s ease;
		overflow: hidden;
	}
	.cutout_upload_btn:active {
		transform: scale(.8);
	}



	/*cutout_wrap_2*/
	.cutout_wrap_2{
		width: 11rem;
		height: 80%;
		background: #fff;
		border-radius: .1rem;
		margin-top: 1rem;
		padding: 4% 10%;
		box-sizing: border-box;
		color: #000000;
		font-size: .16rem;
		display: flex;
		justify-content: space-between;
	}
	.cutout_part {
		width: 45%;
	}
	.origin_part {
		width: 40%;
	}
	.cutout_part p, .origin_part p{
		text-align: left;
		font-weight: bolder;
		margin-bottom: .27rem;
	}
	.cutout_area {
		width: 100%;
		height: 60%;
		position: relative;
		background: url(../assets/answer/icon_1.png) repeat top center;
	}
	.cutout_area img, .origin_area img {
		width: 100%;
		height: 100%;
		margin:0 auto;
		object-fit: contain;
	}
	.origin_area{
		width: 100%;
		height: 60%;
		background-color: #f7f6f4
	}
	.btns_wrap{
		width: 100%;
		font-size: .16rem;
		margin-top: .5rem;
	}
	.btns_wrap .btn{
		line-height: .43rem;
		cursor: pointer;
		overflow: hidden;
		text-align: center;
		display: block;
		position: relative;
		height: .43rem;
		z-index: 1;
		transition: all .1s ease
	}
	.btns_wrap .btn:active {
		transform: scale(.9);
	}
	.up_btns{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: .2rem;
	}
	.download_btn, .save_btn {
		width: 1.52rem;
		background: url(../assets/cutout/btn.png) no-repeat top center/100%;
		color: #ffffff;
		
	}
	.reupload_btn{
		width: 100%;
		border-radius: .35rem;
		border: 1px solid #ff4133;
		color: #ff4133;
	}
	

</style>

<style type="text/css">
	.cutout_w .el-slider__button{
		width: .4rem;
		height: 4.16rem;
		border: none;
		background: url(../assets/cutout/line.png) no-repeat top center/100% auto;
		position: relative;
	}
	.cutout_w .el-slider__button:after {
		content: '';
		width: .38rem;
		height: .38rem;
		background: url(../assets/cutout/line_icon.png) no-repeat top center/100% auto;
		position: absolute;
		left:0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	.cutout_w .el-slider__button.dragging, .cutout_w .el-slider__button.hover, .cutout_w .el-slider__button:hover {transform: none;}
	.cutout_w .el-slider__runway{background: none;}
	.cutout_w .el-slider__bar{background: none;transition: all 0s ease}
	.cutout_w .el-slider__button-wrapper:hover{cursor: w-resize;}
	.cutout_w .el-slider__button:hover{cursor: w-resize;}
	
	.anim {
		transform: translateY(-50%) translateX(-50%);
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 1;
	}
	.anim:before {
		position: relative;
		content: '';
		display: block;
		margin-top: 100%;
	}
	.anim:after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		border-radius: 50%;
	}
	.hoverable:hover > .anim {
		-moz-animation: anim-out 0.75s;
		-webkit-animation: anim-out 0.75s;
		animation: anim-out 0.75s;
	}
	.hoverable:hover > .anim:after {
		-moz-animation: anim-out-pseudo 0.75s;
		-webkit-animation: anim-out-pseudo 0.75s;
		animation: anim-out-pseudo 0.75s;
	}
	.reupload_btn.hoverable:hover > .anim:after {
		-moz-animation: anim-out-pseudo2 0.75s;
		-webkit-animation: anim-out-pseudo2 0.75s;
		animation: anim-out-pseudo2 0.75s;
	}

	.cutout_w .el-icon-loading:before{
		display: none;
	}
	.cutout_w .el-icon-loading{
		width: 2rem;
		height: 2rem;
		animation: none;
		background: url(../assets/loading_cutout.png) no-repeat top center/100%;
	}
	.cutout_w .el-loading-spinner{
		margin-top: -1rem;
	}
	@keyframes anim-out {
		0% {
			width: 0%;
		}
		100% {
			width: 100%;
		}
	}

	@keyframes anim-out-pseudo {
		0% {
			background: rgba(255,255,255, 0.25);
		}
		100% {
			background: transparent;
		}
	}
	@keyframes anim-out-pseudo2 {
		0% {
			background: rgba(255,96,76, 0.25);
		}
		100% {
			background: transparent;
		}
	}

	.check_detail{
		width: 0.5rem;
		height: 0.5rem;
		background: rgba(0,0,0,.7);
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 0;
		bottom: 0;
		font-size: .3rem;
		color: #ff4838;
		cursor: pointer;
		z-index: 2;
	}
	.el-icon-circle-close{
		color: #fff
	}

</style>

<script type="text/javascript">

import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import anime from 'animejs/lib/anime.es.js';
import feedBack from '@/components/feedBack.vue'
import {cutoutByJpg, saveUserCutoutImg} from '@/api/service.js' 
export default {
	name: 'cutout',
	props: {

	},
	components: { ElImageViewer },
	data(){
		return {
			loading: false,
			dragValue: 50, //拖动开始值
			uploadSuccess: false , //切换页面
			origin_pic: '',
			cutout_pic: '',
			download_tips_dia: false,
			saved: false, //用户是否已经保存了
			request_retry: 0,
			showViewer: false,

		}
	},
	computed: {
		...mapState(['author_id']),
	},
	created: function() {
		this.busEvent()
	},
	mounted: function() {

	},
	methods: {
		...mapMutations(['setAnswerIndex']),
		prevFunc: function() {
			const me =this;
			// 返回上一页
			me.$router.go(-1)
		},
		toQa: function() {
			this.$router.push('/inputMsg/q1')
		},
		//判断图片格式
		getImgType: function(path) {
			if(path.indexOf("/") != -1){
				let imgtype=path.substring(path.lastIndexOf("/")+1,path.length).toLowerCase().split('.')[1];
				if (imgtype == "jpeg" || imgtype == "jpg") {
					return true
				}else{
					return false
				}
			}else{
				return false
			}
		},
		busEvent: function() {
			const me =this;
			bus.$on('uploadSuccess_cutout',function(data) {
				if(me.getImgType(data.data.savepath)){
					me.uploadSuccess = true
					// 上传成功的函数
					me.uploadSuccessFunc({
						pic_id: data.data.file_id,
						pic_path: data.data.savepath
					})
				}else{
					me.$message('仅支持 .jpg 格式抠图')
					return false
				}


			})
		},
		open_upload_dia_Func: function() {
			const me =this;
			this.openMater('cutout', me.author_id)
			// 统计
			me.mtj_baidu('cutoutPage','click','cutoutPage_UploadImg')
		},
		uploadSuccessFunc: function(obj) {
			const me =this;
			console.log(obj)
			me.origin_pic = obj.pic_path;
			me.to_cutout(obj.pic_path)
		},
		to_cutout: function(path) {
			const me = this;
			me.loading = true //开始loading 抠图

			/**
			 * 200成功
				207抠图已达今日上线
				208非法用户（用户id不存在）
				206抠图失败
				204返回路径为空
				10003窗建文件夹失败
			 */

			cutoutByJpg(path)
			.then( data => {
				console.log(data)
				let status = data.code
				if(status == 200) {

					me.to_cutout_success(data.path)
					// 统计
					me.mtj_baidu('cutoutSuccess','click','cutoutSuccess')

				}else if( status == 207) {

					me.to_cutout_err()
					me.$message('你今日免费抠图次数已达上限')
					// 统计
					me.mtj_baidu('cutoutLimit','click','cutoutLimit')

				}else if(status == 208) {

					me.to_cutout_err()
					me.$message('非法用户，无法使用抠图功能！请联系客服')
					// 统计
					me.mtj_baidu('cutoutLllegal','click','cutoutLllegal')

				}else if(status == 206) {

					if(me.request_retry >= me.max_request) {
						me.to_cutout_err()
						me.$message('网络出错请重试！')
					}else{
						me.request_retry += 1;
						me.to_cutout(path)
					}
				}
			})
			.catch( err => {
				console.log(err)
				me.to_cutout_err()
				me.$message('网络出错请重试！')
			})
		},
		to_cutout_success: function(path) {
			this.loading = false
			this.saved = false
			this.cutout_pic = '/uploadFiles/images/' + path
		},
		to_cutout_err: function() {
			this.uploadSuccess = false;
			this.loading = false
			
		},
		// 保存至素材库
		save_to_material: function(id, path){
			const me =this;
			
			if(!me.saved){
				// this.axios.post("/User_cutout/save_cutout_file",{
				// 	user_id: id,
				// 	path: path
				// })
				saveUserCutoutImg(id, path)
				.then(function(data) {
					console.log(data)
					console.log(data)
					if(data.code == 200) {
						me.saved = true;
						me.$message('保存成功')

						// 统计
						me.mtj_baidu('cutoutImgSaveSuccess','click','cutoutImgSaveSuccess')
					}else{
						me.$message('网络不稳定，请重试')
					}
					
				})
				.catch(function(e) {
					console.log(e)
				})
			}else{
				me.$message('已保存，请勿重复保存')
			}
		},
		// // 点击下载按钮弹出弹出提示
		// download_func: function() {
		// 	this.download_tips_dia = true
		// }
		// // 点击确定下载按钮
		download_func: function() {
			const me =this;
			this.downs(me.cutout_pic, false)
			me.$message('下载成功')
			// 统计
			me.mtj_baidu('cutoutImgDownload','click','cutoutImgDownload')
		},
		onPreview() {
			this.showViewer = true
		},
		closeViewer() {
			this.showViewer = false
		},
	}
}

</script>