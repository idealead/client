<template>
	<div class="inputMsg_w">
		<!-- common part -->
		<div class="common_wrap ps0">
			<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
				<div class="page_index" v-show="!isEntryInfo">
					<div class="move_tag"></div>
					<div class="page_tags">
						<span v-for="(item, index) in 4" :class="item == answer_index ? 'active' : ''">{{item}}</span>
					</div>
				</div>
			</transition>
			<div class="circle_change ps0">
				<img src="../assets/answer/dot.png" class="dot_bg">
				<img src="../assets/answer/circle.png" class="circle">
			</div>
			<div class="click_btns flex">
				<!-- <div class="prev_btn click_btn flex" @click="prevFunc(answer_index)">
					<div class="deco flex"></div>
					<span class="one">上一步 prev</span>
				</div> -->
				<transition appear appear-active-class="animated fadeInLeft" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutLeft">
					<div class="prev_btn click_btn" @click="prevFunc(answer_index)" v-if="answer_index != 1"></div>
				</transition>	
				<transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" appear appear-active-class="animated fadeInRight">
					<!-- <div class="next_btn click_btn flex" @click="nextFunc(answer_index)" v-if="!isEntryInfo">
						<div class="deco flex"></div>
						<span>下一步 next</span>
					</div> -->
					<div class="next_btn click_btn" @click="nextFunc(answer_index)" v-if="!isEntryInfo"></div>
				</transition>
			</div>
		</div>
		<!-- <transition enter-active-class='animated fadeIn'> -->
			<!-- <keep-alive exclude="entry-info"> -->
				<router-view></router-view>
			<!-- </keep-alive>	 -->
		<!-- </transition> -->
	</div>
</template>

<style type="text/css" scoped>
	.inputMsg_w{
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
		/*z-index: 15;*/
	}
	.common_wrap{
		height: 100%;
		overflow: hidden;
	}
	.ps0{
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		/*z-index: -1;*/
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
	.page_index{
		width: .38rem;
		/*height: 1.5rem;*/
		height: 1.2rem;
		position: absolute;
		font-size: .18rem;
		color: #ff392c;
		top: 0;
		bottom: 0;
		margin: auto;
		left: .2rem;
		z-index: 2;
		display: flex;
		justify-content: center;
	}
	.page_tags {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.page_index span{
		font-size: .15rem;
		width: .1rem;
		height: .1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: #ff4535;
		transition: all .2s .23s ease;
		color: rgba(255,255,255,0);
		margin: .1rem 0;
		box-sizing: border-box;
	}
	.page_index span.active {
		color: rgba(255,255,255,1);
	}
	.move_tag {
		width: .16rem;
		height: .3rem;
		background-color: #ff4535;
		position: absolute;
		border-radius: .2rem;
		z-index: -1;
		/*top: .12rem;*/
	}
	/*.page_index:before, .page_index:after {
		content: '';
		width: 2px;
		height: .55rem;
		display: block;
		background-color: #ff392c;
		position: absolute;
	}
	.page_index:before{
		left: 45%;
		top: 43%;
	}
	.page_index:after{
		right: 49%;
		bottom: 43%;
	}*/
	/*	.page_index .zero {
		line-height: 1.8
	}*/
	.d-roll-wrapper{
		width: 30%;
		margin: 0;
	}
	.flex {
		display: flex;
		align-items: center;
	}
	.click_btns{
		width: 100%;
		/*height: .2rem;*/
		position: absolute;
		top: 52%;
		/*justify-content: space-between;*/
		z-index: 10
	}
	.click_btns span{
		color: #a3a3a3;
		font-size: .18rem;
	}
	.click_btn {
		/*justify-content: center;*/
		cursor: pointer;
		width: .35rem;
		height: .64rem;
		background-repeat: no-repeat;
		background-position: top center;
		background-size: 100%;
		transition: all .1s ease;
		position: absolute;
	}
	.click_btn:active {
		transform: scale(.9);
	}
	/*.click_btn:hover {
		animation: slide .8s ease infinite alternate;
		transform: scale(1.5);
	}*/
	@keyframes slide {
		0%{
			transform: translateX(0%);
		}
		100%{
			transform: translateX(-50%);
		}
	}
	.prev_btn{
		left: 2rem;
		background-image: url(../assets/answer/prev.png);
	}
	.next_btn{
		right: 2rem;
		background-image: url(../assets/answer/next.png);
	}
	.deco{
		width: .31rem;
		height: .08rem;
		background-color: #ff392c;
		border-radius: .12rem;
		position: relative;
		margin-right: .05rem;
	}
	.prev_btn:hover .deco:before {
		transform: translateX(-.1rem);
	}
	.next_btn:hover .deco:before {
		transform: translateX(.1rem);
	}
	.deco:before {
		content: '';
		width: .16rem;
		height: .04rem;
		background-color: #fff;
		display: block;
		border-radius: .1rem;
		transition: transform .2s ease;
	}
	.prev_btn .deco:before{
		margin-right: 8%;
	}
	.prev_btn .deco{
		justify-content: flex-end;
	}
	.next_btn .deco:before{
		margin-left: 8%;
	}
	.inputMsg_w .fadeIn {
		/*animation-duration: .3s;*/
	}
	.common_wrap .fadeIn{
		animation-duration: .01s;
	}
	.fadeInRight, .bounceInLeft, .bounceOutLeft{
		animation-delay: 1.2s
	}

	
	

</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import anime from 'animejs/lib/anime.es.js';

export default {
	name: 'inputMsg',
	props: {

	},
	data(){
		return {
			
		}
	},
	watch: {
		answer_index: 'move_tags_func'
	},
	computed: {
		...mapState(['answer_index', 'questionOriginData']),
		isEntryInfo: function() {
			return this.$route.name == 'entry-info'
		},


	},
	mounted: function() {
		this.move_tags_func()
	},
	methods: {
		prevFunc: function(index) {
			const me =this;
			// 返回上一页
			me.$router.go(-1)
			if(!me.isEntryInfo) {
				me.setAnswerIndex(index-1)
				me.mtj_baidu('prev','click',`toQA_${index-1}`)
			}else{

				me.mtj_baidu('prev','click',`toQA_${index}`)
			}
		},
		nextFunc: function(index) {
			const me =this;
			// 下一页
			if(index === 4) {
				// 进入到录入信心页
				// do sth
				me.$router.push('/inputMsg/entry-info')
				me.mtj_baidu('next','click','uploadLogo_product')
				// 发送用户选择的标签
				// me.requestClientTag()

			}else if(index < 4) {
				me.$router.push({
					path: `/inputMsg/q${index+1}`
				})
				me.mtj_baidu('next','click',`toQA_${index+1}`)
			}
			me.setAnswerIndex(index+1);
		},
		move_tags_func: function() {
			const me = this;
			anime({
				targets: '.move_tag',
				easing: 'easeInOutQuad',
				duration: 400,
				translateY: function() {
					// return (me.answer_index-1)*.3 +'rem'
					return (me.answer_index-1)*.3 +'rem'
				},
				scale: [{ value: .8 }, { value: 1 }]
			});
		}
	},
}

</script>