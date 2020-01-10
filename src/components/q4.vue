<template>
	<div class="q4_w q_w">
		<div class="question_block">
			<h1 class="ml11">
				<span class="line line1"></span>
				<div data-heading="此次推广面向的" class="letters">请告诉我您的</div>
				<span class="letters_2">推广目的</span>
			</h1>
		</div>
		<div class="answer_block">
			<div class="select_btns">
				<div id="select_btn" class="select_btn noselect" v-for='(item, index) in btns' :class="{'selected':item.select}" @click="single_select_btn(index); decoChangeFunc(index)">
					<div class="tabDeco" :class="stateClass">
						<span></span>
					</div>
					<p>{{item.answer_t}}</p>
					<img src="../assets/answer/icon_right.png" alt="" class="icon_right">
				</div>
				
			</div>
			<div class="pic_deco_area">
				<div class="select_pic">
					<img :src="btns[selectIndex_].path">
				</div>
			</div>
		</div>
	</div>
</template>

<style type="text/css" scoped>
	.q4_w{
		width: 13rem;
		height: 100%;
		margin-left: 3.75rem;
	}
	.q4_w .mosaic {
		width: 3rem;
		height: 1.74rem;
		left: 2%;
	}
	.q4_w .deco_block{
		left: 65%;
		top: 35%;
		width: 4.9rem;
	}
	.q4_w .deco_block h2 {
		left: 18%;
		top: 33%;
		z-index: 1;
	}
	.q4_w .question_block h1 {
		bottom: auto;
		top: 0
	}
	.q4_w .head_icon_1{
		width: .34rem;
		bottom: 0;
		top: auto;
	}
	.head_icon_2{
		top: 13%;
	}
	/*.answer_block{
		width: 1.85rem;
		left: 5%;
		top: 43%;
	}*/
	/*.select_btns{
		flex-direction: column;
		justify-content: flex-start;
		position: relative;
	}
	.select_btn{
		font-size: .18rem;
		color: #454545;
		letter-spacing: -1px;
		width: 1.84rem;
		height: .57rem;
		cursor: pointer;
		z-index: 1;
		position: relative;
		transition: all .2s ease;
		line-height: .57rem;
		margin-top: .29rem;
	}
	.select_btn.selected {
		color: #fff;
	}
	.tabDeco{
		width: 1.84rem;
		height: .87rem;
		background: url(../assets/answer/tab_2.png) no-repeat top center/100% auto;
		position: absolute;
	}
	.pic_deco_area {
		width: 8.8rem;
		height: 4.8rem;
		position: absolute; 
		left: 4.02rem;
		top: 35%;
	}
	.rect_3{
		width: 6.81rem;
		position: absolute;
		top: .89rem;
		left: .63rem;
	}
	.select_pics{
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
	.select_pics li{
		width: 4.88rem;
		list-style: none;
		position: absolute;
		transition: all .8s ease;
	}
	.select_pics li img{
		max-width: 100%;
		display: block;
	}
	.select_pic_1{
		left: 2%;
		top: 34%;
		box-shadow: .2rem .2rem .14rem rgba(0,0,0,.18);
		z-index: 1;
	}
	.select_pic_2{
		transform: scale(.6);
		left: 34%;
		top: -2%;
	}
	.select_pic_3{
		transform: scale(.3);
		left: 56%;
		top: 44%;
	}*/

</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import anime from 'animejs/lib/anime.es.js';
export default {
	name: 'q4',
	props: {

	},
	data: function(){
		return {
			// classArray:['select_pic_1','select_pic_2','select_pic_3']
		}
	},
	computed: {
		...mapState(['questionOriginData']),
		btns: function() {
			return this.questionOriginData[3].btns
		},
		// classArray: function() {
		// 	const me =this;
		// 	let classArray=['select_pic_1','select_pic_2','select_pic_3']	
		// 	if(me.curSelectIndex === 0) {
		// 		classArray=['select_pic_1','select_pic_2','select_pic_3']
		// 	}else if(me.curSelectIndex === 1) {
		// 		classArray=['select_pic_3','select_pic_1','select_pic_2']
		// 	}else if(me.curSelectIndex === 2) {
		// 		classArray=['select_pic_2','select_pic_3','select_pic_1']
		// 	}
		// 	return classArray
		// }
		selectIndex_: function() {
			return this.questionOriginData[3].selectIndex
		},
		stateClass: function() {
			if(this.curSelectIndex >=2 && this.curSelectIndex <=3) {
				return 'state2'
			}else if(this.curSelectIndex >3){
				return 'state3'
			}else{
				return ''
			}
		}
	},
	created: function() {
		const me =this;
		
	},
	mounted() {
		this.animeFunc()
	},
	methods: {
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
				translateX: (11*index) + '%'
			});
		}
	},
	 beforeRouteEnter(to,from,next) {
	 	next(vm => {
		 	vm.setAnswerIndex(4)
	 		vm.decoChangeFunc(vm.curSelectIndex)
	 	})
	 }
}

</script>