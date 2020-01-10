<template>
	<div class="feedBack_w">
		<div class="feedBack_enter" :class="{'active': feedBack_flag}" @click="showFeedBack">
			<img src="../assets/feedback/icon_1.png" class="open_icon" v-if="!feedBack_flag">
			<transition enter-active-class="animated fadeIn">
				<i class="hide_icon el-icon-close" v-if="feedBack_flag"></i>
			</transition>
			<!-- <div class="feedback_success_tips">谢谢您给我们的反馈！</div> -->
			<el-popover
			placement="right"
			trigger="click"
			content="谢谢您给我们的反馈！" visible-arrow=' ' popper-class="feedback_success_tips" v-model="visible">
				<!-- <div class="popper__arrow"></div> -->
			</el-popover>
		</div>
		<transition enter-active-class="fadeInUp_" leave-active-class="fadeOutDown_">
			<div class="feedBack_content" v-if="feedBack_flag">
				<p>您对我们的创意热店还满意吗？</p>
				<div class="emotion" :class="{'isSelectEmo' : isSelectEmotion}">
					<span class="emoji" v-for="(item,index) in emotion" :class="[item.class, {'selected': index == selectIndex}]" @click="selectEmoji(index)"><em>{{item.tips}}</em></span>
					<!-- <span class="emoji emoji_2"></span> -->
					<!-- <span class="emoji emoji_3"></span> -->
					<!-- <span class="emoji emoji_4"></span> -->
					<!-- <span class="emoji emoji_5"></span> -->
				</div>
				<div class="input_wrap" v-if="isSelectEmotion">
					<div class="feedBack_input">
						 <el-input type="textarea" v-model="feedBack_content" placeholder="请告知我们您的体验。" maxlength=150></el-input>
					</div>
					<div class="feedBack_btns">
						<span class="feedBack_send hoverable" @click="upload_feedback"><div class="anim"></div>发送</span>
						<!-- <span class="feedBack_cancel hoverable" @click="showFeedBack"><div class="anim"></div>取消</span> -->
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<style type="text/css" scoped>
	.feedBack_w{
		position: fixed;
		right: 6%;
		bottom: 12%;
		z-index: 15
	}
	.feedBack_enter{
		width: .58rem;
		height: .58rem;
		background: url(../assets/feedback/feedback.png) no-repeat top center/100%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: all .2s ease
	}
	.feedBack_enter:active {
		transform: scale(.9);
	}
	.feedBack_enter img{
		display: block;
		transition: all .5s ease;
	}
	.open_icon{
		width: .33rem;
	}
	.hide_icon{
		width: .33rem;
		height: .33rem;
		font-size: .4rem;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		color: #fff;
	}

	.feedBack_content {
		width: 4.2rem;
		min-height: 1.8rem;
		border-radius: .1rem;
		background: #fff;
		box-shadow: 0.05rem 0.05rem 0.14rem rgba(0,0,0,.1),
					-0.05rem -0.05rem 0.14rem rgba(0,0,0,.1);
		position: absolute;
		right: 75%;
		bottom: 100%;
		transition: all .5s ease;
		transform-origin: right bottom
	}
	.feedBack_content p {
		color: #000;
		font-size: .2rem;
		font-weight: bolder;
		margin-top: .28rem;
	}
	.feedBack_content .feedBack_input{
		width: 3.35rem;
		height: 2.8rem;
		border: 1px solid #000;
		border-radius: .1rem;
		margin:.2rem auto .3rem;
		padding:.1rem;
		box-sizing: border-box;

	}
	.feedBack_btns{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: .5rem;
	}
	.feedBack_btns span {
		display: block;
		width: 1.33rem;
		height: .41rem;
		background: url(../assets/dialog/login_btn.png) no-repeat top center/100%;
		font-size: .18rem;
		color: #fff;
		line-height: .41rem;
		text-align: center;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		margin:0 3%;
		transition: all .2s ease
	}
	.feedBack_btns span:active {
		transform: scale(.9);
	}

	/*emo*/
	.emotion{
		width: 85%;
		margin: 5% auto 0;
		height: .6rem;
		display: flex;
		align-items:center;
		justify-content: space-around;
	}
	.emotion span{
		width: .52rem;
		height: .51rem;
		background-position: top center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		cursor: pointer;
		font-size: .15rem;
		color: rgba(0,0,0,.5);
		position: relative;
		transition: all .2s ease
	}
	.emotion span em {
		font-style: normal;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: -50%;
		opacity: 0;
		white-space: nowrap;
		transition: all .2s .1s ease;
		transform: translateY(5%);
	}
	.emotion span:hover em {
		opacity: 1;
		transform: translateY(0);
	}

	.emoji_1 {
		background-image: url(../assets/feedback/id_o_1.png);
	}
	.emoji_2 {
		background-image: url(../assets/feedback/id_o_2.png);
	}
	.emoji_3 {
		background-image: url(../assets/feedback/id_o_3.png);
	}
	.emoji_4 {
		background-image: url(../assets/feedback/id_o_4.png);
	}
	.emoji_5 {
		background-image: url(../assets/feedback/id_o_5.png);
	}
	.emoji_1:hover, .emoji_1.selected, .isSelectEmo .emoji_1.selected {
		background-image: url(../assets/feedback/id_h_1.png);
	}
	.emoji_2:hover, .emoji_2.selected, .isSelectEmo .emoji_2.selected {
		background-image: url(../assets/feedback/id_h_2.png);
	}
	.emoji_3:hover, .emoji_3.selected, .isSelectEmo .emoji_3.selected {
		background-image: url(../assets/feedback/id_h_3.png);
	}
	.emoji_4:hover, .emoji_4.selected, .isSelectEmo .emoji_4.selected {
		background-image: url(../assets/feedback/id_h_4.png);
	}
	.emoji_5:hover, .emoji_5.selected, .isSelectEmo .emoji_5.selected {
		background-image: url(../assets/feedback/id_h_5.png);
	}
	.emoji:hover {
		transform: translateY(-10%);
	}
	
	.emoji:active {
		transform: scale(.8)
	}
	

	



	.fadeInUp_{
		animation: fadeInUp_ .5s ease;
		-webkit-animation: fadeInUp_ .5s ease;
	}
	.fadeOutDown_{
		animation: fadeOutDown_ .5s ease;
		-webkit-animation: fadeOutDown_ .5s ease;
	}
	@keyframes fadeInUp_ {
		0% {
			opacity: .3;
			transform: translateY(5%);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@keyframes fadeOutDown_ {
		0% {
			opacity: 1;
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateY(5%);
		}
	}

	/*.zoomInRightBottom{
		animation: zoomInRight .5s ease;
		-webkit-animation: zoomInRight .5s ease;
	}
	.zoomOutRightBottom{
		animation: zoomOutRight .5s ease;
		-webkit-animation: zoomOutRight .5s ease;
	}*/
	/*@keyframes zoomInRight {
		from {
			opacity: 0;
			-webkit-transform: scale3d(0.1, 0.1, 0.1);
			transform: scale3d(0.1, 0.1, 0.1);
			-webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
			animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}

		to {
			opacity: 1;
			-webkit-transform: scale3d(1, 1, 1);
			transform: scale3d(1, 1, 1);
			-webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
			animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
		}
	}
	@keyframes zoomOutRight {
		from {
			opacity: 1;
			-webkit-transform: scale3d(1, 1, 1);
			transform: scale3d(1, 1, 1);
		}

		to {
			opacity: 0;
			-webkit-transform: scale(0.1);
			transform: scale(0.1);
		}
	}*/
</style>
<style type="text/css">
	.feedBack_input .el-textarea {
		height: 100%;
		color: #cfcfcf;
		font-size: .16rem;
	}
	.feedBack_input textarea {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: .1rem;
	}
	.feedBack_w .el-popover{
		font-size: .1rem;
		width: 1.5rem;
		height: .4rem;
		background: #fff;
		line-height: .4rem;
		padding: 0;
		text-align: center;
		left: -1.8rem;
		top: 0;
		white-space: nowrap;
		min-width: auto
	}
	.feedBack_w .el-popover:after {
		content: '';
		position: absolute;
		display: block;
		/* margin: .1rem auto; */
		width: 0;
		height: 0;
		border: .12rem solid transparent;
		border-left-color: #fff;
		right: -.2rem;
		top: 22%;
		z-index: 10;
	}
	@media screen and (max-height: 900px) {
		.feedBack_w .el-popover{
			width: 2rem;
			left: -2.2rem;
		}
	}
	@media screen and (max-height: 600px) {
		.feedBack_w .el-popover{
			width: 2.5rem;
			left: -2.7rem;
		}
	}
</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import {sendFeedBack} from '@/api/service.js' 
export default {
	name: 'feedBack',
	props: {
		// feedBack_flag: Boolean,
	},
	data() {
		return {
			feedBack_flag: false,
			feedBack_content: '',
			isSelectEmotion: false, //是否选择了表情
			emotion: [
				{class: 'emoji_1', tips: '讨厌'}, 
				{class: 'emoji_2', tips: '不喜欢'}, 
				{class: 'emoji_3', tips: '中立'},
				{class: 'emoji_4', tips: '喜欢'},
				{class: 'emoji_5', tips: '大爱'}
			 	],
			 selectIndex: -1, //选择 的表情 索引
			 visible: false
		}
	},
	created() {
		
	},
	computed: {

	},
	methods: {
		showFeedBack: function() {
			this.feedBack_flag= !this.feedBack_flag;
			// bus.$emit('changeFeedBack',!this.feedBack_flag)
			this.feedBack_content= ''
			this.isSelectEmotion = false
			this.selectIndex = -1
		},

		selectEmoji: function(index) {
				this.isSelectEmotion = true
				this.selectIndex = index	
		},

		// 上传反馈内容
		upload_feedback: function() {
			const me =this;
			if(me.feedBack_content != ''){
				let index = me.selectIndex +1
				sendFeedBack(index, me.feedBack_content)
				.then(function(data) {
					console.log(data)
					if(data.code == 200) {
						// me.$message('感谢你的反馈！敬请期待');
						me.showFeedBack()	
						me.visible = true
						setTimeout(() =>{
							me.visible = false
						},1500)
					}else{
						me.upload_feedback()
					}
				})
				.catch(function(e) {
					console.log(e)
				})
			}else{
				me.$message('反馈内容不能为空')
			}
		}
	}
}

</script>