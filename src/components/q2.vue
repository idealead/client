<template>
	<div class="q2_w q_w">
		<div class="question_block">
			<h1 class="ml11">
				<span class="line line1"></span>
				<div data-heading="此次推广面向的" class="letters">请告诉我您的品牌</div>
				<span class="letters_2">调性关键词</span>
			</h1>
		</div>
		<div class="answer_block">
			<div class="select_btns">
				<div id="select_btn" class="select_btn noselect" v-for='(item, index) in btns' :class="{'selected':item.select === 1}" @click="single_select_btn(index); decoChangeFunc(index)">
					<div class="tabDeco" :class="stateClass">
						<span></span>
					</div>
					<p>{{item.answer_t}}</p>
					<img src="../assets/answer/icon_right.png" alt="" class="icon_right">
				</div>
				
			</div>
			<div class="pic_deco_area">
				<div class="select_pic">
					<img :src="'//ht.idealead.hbindex.com/uploadFiles/images' + btns[selectIndex_].path">
				</div>
			</div>
		</div>
	</div>
</template>

<style type="text/css" scoped>
	.q_w{
		position: relative;
		z-index: 4;
	}
	.q2_w{
		width: 13rem;
		height: 100%;
		margin-left: 3.75rem;
	}
	/*.q2_w .mosaic {
		width: 3.03rem;
		height: 1.48rem;
		left: 0;
	}*/
	.q2_w .deco_block{
		left: .63rem;
		top: 35%;
		width: 4.9rem;
	}
	.q2_w .deco_block h2 {
		left: 49%;
		top: 8%;
	}
	/*.question_block{
		top: 3.2rem;
		width: 9.35rem;
		height: 1.58rem;
		left: .63rem;
	}*/
	.q2_w .question_block h1 {
		bottom: auto;
		top: 0
	}
	
	.deco_block .dash {
		display: block;
		width: 2.35rem;
		height: 1.15rem;
		position: absolute;
		border: 1px dashed #000;
		top: -22%;
		right: 29%
	}
	.q2_w .head_icon_1{
		width: .34rem;
		bottom: 0;
		top: auto;
	}
	.head_icon_2{
		top: 13%;
	}
	/*.answer_block{
		width: 10.5rem;
		left: 5%;
		top: 45%;
	}*/
	/*.select_btns{
		justify-content: space-between;
		position: relative;
	}
	.select_btn{
		font-size: .18rem;
		color: #ffffff;
		letter-spacing: -1px;
		width: 1.96rem;
		height: 1.96rem;
		cursor: pointer;
		z-index: 1;
		position: relative;
		transition: all .2s ease;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}*/
	.select_btn_pic{
		width: 1.96rem;
		height: 1.96rem;
		transition: all .2s ease;
	}
	.select_btn.selected {
		color: #fff;
	}
	.select_btn_pic:active {
		transform: scale(.9);
	}
	/*.select_btn img{
		max-width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -2;
	}*/
	.answer_txt{
		width: 100%;
		height: .49rem;
		position: absolute;
		bottom: -30%;
		line-height: .49rem;
		background: rgba(0,0,0,.8);
	}
	.selected .answer_txt{
		color: #fff
	}
	.btn {
		-webkit-transition: all 600ms cubic-bezier(0.77, 0, 0.175, 1);
		transition: all 600ms cubic-bezier(0.77, 0, 0.175, 1);
		    -webkit-box-direction: normal;
	}
	.select_btn:hover .btn {
		color: #fff;
		-webkit-transition-delay: .2s;
		transition-delay: .2s;
	}
	.btn:before, .btn:after {
		content: '';
		position: absolute;
		-webkit-transition: inherit;
		transition: inherit;
		z-index: -1;
		box-sizing: border-box;
	}
	/*.answer_txt:before, .answer_txt:after {
		left: 0;
		height: 0;
		width: 100%;
		transition: all .4s cubic-bezier(0.77, 0, 0.175, 1)
	}
	.answer_txt:after {
		bottom: 0;
		height: 0;
	}
	.select_btn:hover .answer_txt:before, .select_btn:hover .answer_txt:after {
		height: 100%;
	}
	.select_btn:hover .btn:before {
		-webkit-transition-delay: 0s;
		transition-delay: 0s;
	}
	.answer_txt:before {
		top: 0;
		border: 1px solid rgba(0,0,0,.8);
		border-top: 0;
		border-bottom: 0;
	}
	.select_btn:hover .btn:after {
		background: rgba(0,0,0,.8);
		-webkit-transition-delay: .4s;
		transition-delay: .4s;
	}*/

	.select_tag{
		width: 100%;
		height: 100%;
		background: url(../assets/answer/selected.png) no-repeat top center/100% auto;
		position: absolute;
		top: 0;
		opacity: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all .2s ease
	}
	.selected .select_tag{
		opacity: 1;
	}
	.select_tag span{
		display: block;
		width:0;
		height:0;
		border-right: .4rem solid transparent;
		border-left: none;
		border-bottom: .4rem solid #ff6046;
		top: -.3rem;
		left: 0;
		position: absolute;
		transition: all .4s ease;
	}
	.select_tag.state2 span{
		border-right: .5rem solid transparent;
		border-bottom: .5rem solid #ff6046;
		top: -.3rem;
		transform: rotate(-7deg) translateX(3%);
		transform-origin: left bottom;
	}
	.select_tag.state3 span{
		border-right: .6rem solid transparent;
		border-bottom: .6rem solid #ff6046;
		top: -.3rem;
		transform: rotate(-13deg) translateX(10%);
		transform-origin: left bottom;
	}
	.select_tag img{
		width: .92rem;
		z-index: 2;
		position: relative;
		transform: scale(.1);
		transform-origin: center;
		transition: all .3s ease
	}
	.selected .select_tag img{
		transform: scale(1);
	}
	

</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import anime from 'animejs/lib/anime.es.js';
export default {
	name: 'q2',
	props: {

	},
	data: function(){
		return {
			
		}
	},
	computed: {
		...mapState(['questionOriginData']),
		btns: function() {
			return this.questionOriginData[1].btns
		},
		selectIndex_: function() {
			return this.questionOriginData[1].selectIndex
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
		
	},
	mounted () {
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
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.decoChangeFunc(vm.curSelectIndex)
			vm.setAnswerIndex(2)
		})
	}
}

</script>