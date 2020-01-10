<template>
	<div class="q1_w q_w">
		<div class="question_block">
			<h1 class="ml11">
				<span class="line line1"></span>
				<div data-heading="产品行业" class="letters">请告诉我们您的</div>
				<span class="letters_2">产品行业</span>
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

<style type="text/css">
	.q_w{
		position: relative;
		z-index: 6;
		overflow: hidden;
	}
	.q1_w{
		width: 13rem;
		height: 100%;
		margin-left: 3.75rem;
	}
	.question_block{
		position: absolute;
	}
	.question_block{
		top: 18%;
		width: 9.35rem;
		height: 1.2rem;
		left: .63rem;
	}
	.question_block h1 {
		line-height: .6rem;
		bottom: auto;
		top: 0
	}
	.question_block h1 div{
		display: block;
	}
	.question_block h1 {
		color: #f75b51;
		font-size: .48rem;
		font-weight: bolder;
		text-align: left;
		letter-spacing: -3px;
		position: absolute;
		bottom: 0;
	}
	.question_block h1 div {
		color: #000;
		position: relative;
	}
	.answer_block{
		width: 12rem;
		position: absolute;
		left: 5%;
		top: 37%;
		/*overflow: hidden;*/
	}

	.select_btns{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 3%;
		position: relative;
		z-index: 1;
	}	
	.select_btn{
		width: 1.84rem;
		height: .57rem;
		cursor: pointer;
		line-height: .57rem;
		z-index: 1;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform .2s ease;
	}
	.select_btn:active {
		transform: scale(.8);
	}
	.select_btn p {
		font-size: .2rem;
		color: #454545;
		letter-spacing: -1px;
		transition: all .2s ease
	}
	.select_btn.selected p{
		color: #fff;
		/*font-weight: bold*/
	}
	.icon_right{
		width: .35rem;
		margin-left: .1rem;
		opacity: 0;
		transform: scale(0);
		transition: all .5s ease
	}
	.selected .icon_right {
		transform: scale(1);
		opacity: 1
	}
	.tabDeco{
		position: absolute;
		width: 1.84rem;
		height: .57rem;
		background-image: linear-gradient(#ff5341, #ff3d2f);
		top: 0;
		z-index: -1;
		opacity: 0;
		transition: all .2s .05s ease
	}
	.selected .tabDeco{
		opacity: 1;
	}
	.tabDeco span {
		display: block;
		width:0;
		height:0;
		border-right: .4rem solid transparent;
		border-left: none;
		border-bottom: .4rem solid #ff5341;
		top: -.3rem;
		position: absolute;
		transition: all .2s ease;
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
		height: 3.46rem;
		overflow: hidden;
		position: relative;
		z-index: 1;
	}
	.select_pic img{
		position: relative;
		z-index: 1;
		max-width: 100%
	}
	.noselect {
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		-khtml-user-select: none; /* Konqueror */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currentlynot supported by any browser */
	}
	
	.q1_w .fadeIn, .q1_w .fadeOut{
		animation-duration: .5s
	}
	
	.ml11 .line {
		opacity: 1;
		position: absolute;
		left: 0;
		height: 100%;
		width: .1rem;
		background-color: #ff5341;
		transform-origin: 0 50%;
	}

	.ml11 .line1 { 
		top: 0; 
		left: 0;
	}
</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import anime from 'animejs/lib/anime.es.js';
import {requestAnotherQuestion} from '@/api/service.js' 
export default {
	name: 'q1',
	props: {

	},
	data: function(){
		return {
		}
	},
	created() {

	},
	mounted: function() {
		this.animeFunc()
	},
	computed: {
		...mapState(['questionOriginData']),
		btns: function() {
			return this.questionOriginData[0].btns
		},
		selectIndex_: function() {
			return this.questionOriginData[0].selectIndex
		},
		stateClass: function() {
			if(this.curSelectIndex >=2 && this.curSelectIndex <3) {
				return 'state2'
			}else if(this.curSelectIndex >=3){
				return 'state3'
			}else{
				return ''
			}
		}
	},
	methods: {
		...mapMutations(['setQuestionOriginData']),
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
			this.requestSecondData()
		},
		requestSecondData: function() {
			const me= this;
			let selectId = me.selectIndex_ +1
			requestAnotherQuestion(selectId)
			.then(function(data) {
				console.log(data.data)
				 me.setQuestionOriginData([data.data[0].answer,0,1])
				  me.setQuestionOriginData([data.data_person,0,2])
			})
			.catch(function(e) {
				console.log(e)
			})
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.decoChangeFunc(vm.curSelectIndex)
			vm.setAnswerIndex(1)
		})
	}
}

</script>