<template>
	<div class="q3_w q_w">
		<!-- <transition appear appear-active-class="animated fadeIn"> -->
		<div class="question_block">
			<h1 class="ml11">
				<span class="line line1"></span>
				<div data-heading="此次推广面向的" class="letters">请告诉我们您选择的</div>
				<span class="letters_2">推广目标人群</span>
			</h1>
		</div>
		<!-- </transition> -->
		<div class="answer_block">
			<div class="select_btns">
				<div id="select_btn" class="select_btn noselect" v-for='(item, index) in btns' :class="{'selected':item.select === 1}" @click="decoChangeFunc(index); single_select_btn(index)">
					<div class="tabDeco" :class="stateClass">
						<span></span>
					</div>
					<p>{{item.answer_t}}</p>
					<img src="../assets/answer/icon_right.png" alt="" class="icon_right">
				</div>
				
			</div>
			<div class="pic_deco_area">
				<div class="select_pic">
					<!-- <span></span> -->
					<img :src="'//ht.idealead.hbindex.com/uploadFiles/images' + btns[selectIndex_].path">
				</div>
			</div>
		</div>
	</div>
</template>

<style type="text/css" scoped>
	/*.q_w{
		position: relative;
		z-index: 4;
	}*/
	.q3_w{
		width: 13rem;
		height: 100%;
		margin-left: 3.75rem;
	}
	.q3_w .mosaic {
		width: 3.43rem;
		height: 2rem;
		left: 20%;
	}
	.q3_w .deco_block{
		right: 0;
		top: 59%;
	}
	.q3_w .deco_block h2 {
		left: 52%;
		top: -22%;
	}
	.mouseTag{
		width: .25rem;
		position: absolute;
	}
	.q3_w .mouseTag{
		left: 49%;
		bottom: -5%;
	}
	.answer_block{
		/*width: 10.5rem;*/
		left: 5%;
		top: 34%;
	}
	.select_btns{
		justify-content: flex-start;
		position: relative;
	}
	.q3_w .select_btns{
		flex-wrap: wrap;
		width: 85%;
	}
	.q3_w .select_btn {
		margin-top: .3rem
	}
	.select_btn{
		font-size: .18rem;
		color: #454545;
		letter-spacing: -1px;
		width: 1.84rem;
		height: .57rem;
		cursor: pointer;
		/*background-color: #000;*/
		line-height: .57rem;
		z-index: 1;
		position: relative;
		transition: all .2s .05s ease;
		/*margin-right: .2rem*/
	}
	.select_btn.selected {
		color: #fff;
	}
	
	.tabDeco.state2 span{
		border-right: .5rem solid transparent;
		border-bottom: .5rem solid #ff5341;
		top: -.3rem;
		transform: rotate(-7deg) translateX(3%);
		transform-origin: left bottom;
	}
	.tabDeco.state3 span{
		border-right: .6rem solid transparent;
		border-bottom: .6rem solid #ff5341;
		top: -.3rem;
		transform: rotate(-13deg) translateX(10%);
		transform-origin: left bottom;
	}
	.pic_deco_area {
		margin-top: .47rem;
	}
	.select_pic{
		width: 7.68rem;
		position: relative;
		z-index: 1;
	}
	.select_pic img{
		position: relative;
		z-index: 1;
		max-width: 100%
	}
	.select_pic span {
		width: 7.77rem;
		height: 3.18rem;
		background: url(../assets/answer/rect_2.png) no-repeat top center/100% auto;
		position: absolute;
		display: block;
		left: -.22rem;
		top: .2rem
	}

</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import anime from 'animejs/lib/anime.es.js';
export default {
	name: 'q3',
	props: {

	},
	data: function(){
		return {
			state: 'state1',
		}
	},
	computed: {
		...mapState(['questionOriginData']),
		btns: function() {
			return this.questionOriginData[2].btns
		},
		selectIndex_: function() {
			return this.questionOriginData[2].selectIndex
		},
		stateClass: function() {
			if(this.curSelectIndex >=2 && this.curSelectIndex <=3) {
				return 'state2'
			}else if(this.curSelectIndex >3 && this.curSelectIndex <5){
				return 'state3'
			}else{
				return 'state1'
			}
		}
	},
	created: function() {
		
	},
	mounted() {
		this.animeFunc()
	},
	methods: {
		// tabChangeFunc: function(index) {
		// 	const me =this;
		// 	const dom = document.getElementById('select_btn');
		// 	const domWd = 184,
		// 			tranX = domWd * index;
		// 	if(index >1 && index < 4){
		// 		me.$set(me, 'state', 'state2')
		// 	}else if(index > 3) {
		// 		me.$set(me,'state', 'state3')
		// 	}else{
		// 		me.$set(me,'state', '')
		// 	}
		// 	anime({
		// 		targets: '.tabDeco',
		// 		easing: 'easeOutElastic(1,1)',
		// 		duration: 1000,
		// 		translateX: tranX/100 + 'rem'
		// 	});
		// 	me.decoChangeFunc(index)
		// },
		animeFunc: function() {
			let textWrapper = document.querySelector('.ml11 .letters');
			textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

			let textWrapper_2 = document.querySelector('.ml11 .letters_2');
			textWrapper_2.innerHTML = textWrapper_2.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

			anime.timeline({loop: false})
			.add({
				targets: '.ml11 .line',
				scaleY: [0,1],
				opacity: [0.5,1],
				easing: "easeOutExpo",
				duration: 400
			})
			.add({
				targets: '.ml11 .line',
				translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
				easing: "easeOutExpo",
				duration: 700,
				delay: 0
			})
			.add({
				targets: '.ml11 .letter',
				opacity: [0,1],
				easing: "easeOutExpo",
				duration: 600,
				offset: '-=775',
				delay: (el, i) => 34 * (i+1)
			},'-=700')
			.add({
				targets: '.answer_block',
				opacity: [0,1],
				// translateX: ['-30%', 0],
				easing: "easeOutExpo",
				duration: 2500,
			},'-=900')
			.add({
				targets: '.ml11 .line',
				opacity: 0,
				duration: 500,
				easing: "easeOutExpo",
				delay: 0
			},'-=2000');
		},
		decoChangeFunc: function(index) {
			anime({
				targets: '.select_pic',
				easing: 'easeInOutQuad',
				duration: 1000,
				translateX: function() {
					if(index > 4){
						return (11*(index-5)) + '%'
					}else{
						return (11*index) + '%'
					}
				}
			});
			// anime({
			// 	targets: '.select_pic span',
			// 	easing: 'easeInOutQuad',
			// 	duration: 1000,
			// 	delay: 500,
			// 	translateX: (1.5*index) + '%'
			// });
			// anime({
			// 	targets: '.mosaic',
			// 	easing: 'easeInOutQuad',
			// 	duration: 1000,
			// 	// delay: 400,
			// 	translateX: -(32.5*index) + '%'
			// });
			// anime({
			// 	targets: '.deco_block h2',
			// 	easing: 'easeInOutQuad',
			// 	duration: 1000,
			// 	// delay: 500,
			// 	translateX: -(62.5*index) + '%'
			// });
			// anime({
			// 	targets: '.mouseTag',
			// 	easing: 'easeInOutQuad',
			// 	duration: 500,
			// 	translateX: (20*index) + '%',
			// });
		},
	},
	 beforeRouteEnter(to,from,next) {
	 	next(vm => {
	 		vm.decoChangeFunc(vm.curSelectIndex)
	 		vm.setAnswerIndex(3)
	 	})
	 }
}

</script>