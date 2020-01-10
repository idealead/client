<template>
	<div class="q5_w q_w">
		<div class="question_block">
			<h1><div data-heading="此次推广的">请选择您的</div>创意画面尺寸</h1>
		</div>
		<div class="answer_block">
			<div class="select_btns">
				<div class="select_btn" :class="{'selected':item.select}" v-for="(item, index) in btns" @click="single_select_btn(index); tabChangeFunc(index)">
					<transition leave-active-class="animated hinge">
						<div class="show_icon" v-show="!item.select">
							<img :src="item.path" alt="">
							{{item.answer_t}}
						</div>
					</transition>
					<transition enter-active-class="animated bounceIn">
						<div class="show_size" v-show="item.select">
							<img :src="item.sizeSrc">
							<p>{{item.answer_t}}</p>
						</div>
					</transition>
				</div>
				<!-- <div class="tabDeco">
					<transition v-for="(item, index) in btns" enter-active-class="animated flipInY">
						<div class="tabSize" v-if="index == selectIndex_">
							<img :src="item.sizeSrc" alt="">
							<p>{{item.answer_t}}</p>
						</div>
					</transition>
				</div> -->
			</div>
		</div>
	</div>
</template>

<style type="text/css" scoped>
	.q5_w{
		width: 13rem;
		height: 100%;
		margin-left: 3.75rem;
	}
	.q5_w .question_block{
		width: 10rem;
	}
	.q5_w .mosaic {
		width: 2.21rem;
		height: 1.08rem;
		left: 2%;
	}
	.q5_w .deco_block{
		left: 5.8rem;
		top: 2.7rem;
		width: 4.9rem;
	}
	.q5_w .deco_block h2 {
		left: -27%;
		top: 25%;
		z-index: 1;
	}
	.q5_w .question_block h1 {
		bottom: auto;
		top: 0
	}
	.q5_w .head_icon_1{
		width: .34rem;
		bottom: 0;
		top: auto;
	}
	.head_icon_2{
		top: 13%;
	}
	.answer_block{
		width: 7rem;
		top: 52%;
		/*margin: 15% 0 0 12%;*/
	}
	.select_btns{
		justify-content: space-around;
		position: relative;
	}
	.select_btn{
		font-size: .18rem;
		color: #000000;
		font-weight: bolder;
		letter-spacing: -1px;
		width: 2.04rem;
		height: 1.2rem;
		cursor: pointer;
		z-index: 1;
		position: relative;
		transition: all .2s ease;
		line-height: .57rem;
		margin-top: .29rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.select_btn img{
		max-width: 100%;
		display: block;
	}
	.select_btn .show_size img{
		max-width: 100%;
		display: block;
		box-shadow: .2rem .2rem .14rem rgba(0,0,0,.18);
	}
	.select_btn:active {
		transform: scale(.9);
	}
	.select_btn .show_size {
		position: absolute;
	}


	/*.select_btn.selected {
		color: #fff;
	}*/
	/*.tabDeco{
		width: 2.25rem;
		height: 3.4rem;
		background-color: #fff;
		position: absolute;
		z-index: 1;
		box-shadow: 0.2rem 0.2rem 0.14rem rgba(0,0,0,.18);
		left: .5%;
	}
	.tabSize {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.tabDeco img {
		max-width: 65%;
	}
	.tabDeco p{
		color: #000000;
		text-align: center;
		font-weight: bolder;
		font-size: .16rem;
		margin-top: 12%;
	}*/
	/*.pic_deco_area {
		width: 8.8rem;
		height: 4.8rem;
		position: absolute; 
		left: 4.02rem;
		top: 35%;
	}
	.rect_4{
		width: 3.06rem;
		position: absolute;
		top: -18%;
		left: 37%;
	}
	.mouseTag{
		left: 110%;
		top: 25%;
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
	}
	
	.q5_w .flipInY{
		animation-delay: .2s
	}*/
	.fadeIn, .fadeOut{
		animation-duration: .5s;
		animation-delay: 0;
	}
	.bounceIn{
		animation-delay: 0.2s
	}
</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import anime from 'animejs/lib/anime.es.js';
export default {
	name: 'q5',
	props: {

	},
	data: function(){
		return {
			
		}
	},
	computed: {
		...mapState(['questionOriginData']),
		btns: function() {
			return this.questionOriginData[4].btns
		},
		selectIndex_: function() {
			return this.questionOriginData[4].selectIndex
		}
		
	},
	created: function() {
		const me =this;
		
	},
	methods: {
		tabChangeFunc: function(index) {
			const me =this;
			const widH_arr = [{
				'width' : 2.25,
				'height': 3.4
			},
			{
				'width' : 3.09,
				'height': 2.16
			},
			{
				'width' : 3.09,
				'height': 2.62
			},
			{
				'width' : 3.09,
				'height': 3.23
			}
			],
			tranx = [0,2,4.35,6.7]
			anime({
				targets: '.tabDeco',
				easing: 'spring(1, 80, 15, 0)',
				duration: 500,
				width: function(){
					return widH_arr[index].width +'rem'
				},
				height: function(){
					return widH_arr[index].height +'rem'
				},
				translateX: tranx[index] + 'rem',
				// scale: [{ value: .8 ,delay: 200}, { value: 1 }]
			});
		}
	},
	 beforeRouteEnter(to,from,next) {
	 	next(vm => {
	 	// 	if(vm.$store.state.answer_index == 5){
			// 	next()
			// }else {
			// 	next(false)
			// }
	 		vm.tabChangeFunc(vm.curSelectIndex)
	 	})
	 }
}

</script>