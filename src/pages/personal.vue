<template>
	<div class="personal_w flex_c">
		<div class="part_top">
			<h1>个人中心</h1>
			<div class="menu_wrap">
				<ul>
					<li v-for="(item,index) in menu_lists" @click="setRouter(index)" :class="{'active' : item.selected}">{{item.tag}}</li>
					<!-- <li>已编辑列表</li> -->
					<!-- <li>收藏列表</li> -->
					<!-- <li>消费明细</li> -->
					<span class="menu_line"></span>
				</ul>
			</div>
		</div>
		<div class="part_bottom">
			<div class="part_content">
			<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
					<!-- <keep-alive> -->
						<router-view :authorId='author_id'></router-view>
					<!-- </keep-alive>	 -->
				</transition>
			</div>
		</div>
		<feedBack></feedBack>
		<!-- common part -->
		<div class="common_wrap ps0">
			<div class="circle_change ps0">
				<img src="../assets/answer/dot.png" class="dot_bg">
				<img src="../assets/answer/circle.png" class="circle">
			</div>
			<div class="click_btns flex">
				<div class="prev_btn click_btn flex" @click="prevFunc">
					<div class="deco flex hoverable">
						<div class="anim"></div>
					</div>
				</div>
			</div>

		</div>

		<el-dialog :visible.sync="download_tips_dia" width="4.2rem" customClass="download_tips">
			<p class="tips_title">确定下载？</p>
			<p class="tips_doc">该次下载将消耗你10个积分</p>
			<div class="comfirm_down hoverable" @click="confirm_downs_func"><div class="anim"></div>确定下载</div>
		</el-dialog>
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

	.personal_w .deco{
		width: .5rem;
		height: .5rem;
		background: url(../assets/back_icon.png) no-repeat top center/100%;
		position: relative;
		margin-right: .05rem;
	}
	.prev_btn:hover {
		transform: translateX(-.1rem);
	}
	.prev_btn .deco:before{
		margin-right: 8%;
	}
	.prev_btn .deco{
		justify-content: center;
	}
	
	
</style>
<style type="text/css" scoped>
	.personal_w{
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
	.part_top{
		width: 7.6rem;
		/*height: 1.55rem;*/
		margin:.5rem auto 0;
		position: relative;
		z-index: 10;
	}
	.part_top h1{
		font-size: .36rem;
		color: #000000;
	}
	.part_bottom{
		flex: 1;
		width: 100%;
		overflow: hidden;
		position: relative;
		z-index: 1;
	}
	.part_bottom .part_content {
		width: 13.37rem;
		/*height: 7.4rem;*/
		height: 100%;
		position: absolute;
		bottom: -3%;
		left: 0;
		right: 0;
		margin:0 auto 0;
		background: #ffffff;
		border-radius: .2rem;
		box-sizing: border-box;
		overflow: hidden;
		box-shadow: 0.05rem 0.05rem 0.14rem rgba(0,0,0,.05),
					-0.05rem -0.05rem 0.14rem rgba(0,0,0,.05);
	}
	/*.part_content > div {
		height: 100%;
		overflow:auto;
	}*/
	.part_content > div{
		width: 100%;
		height: 100%;
		position: relative;
		overflow:auto;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.part_content > div{
		padding: .45rem .5rem .6rem;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		align-content: flex-start;
		align-content: flex-start
	}
	.part_content > div::-webkit-scrollbar, .scroll::-webkit-scrollbar {/*滚动条整体样式*/
		width: .05rem;     /*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	.part_content > div::-webkit-scrollbar-thumb, .scroll > div::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
		border-radius: .1rem;
		-webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.2);
		background: #535353;
	}

	.part_content > div::-webkit-scrollbar-track, .scroll > div::-webkit-scrollbar-track {/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(255,255,255,255.2);
		border-radius: .1rem;
		background: #EDEDED;
	}
	.menu_wrap {
		width: 8.56rem;
		height: .45rem;
		margin:.7rem auto 0;
		background: #ffffff;
		border-radius: 1rem;
		box-shadow: 0.05rem 0.05rem 0.14rem rgba(0,0,0,.01),
					-0.05rem -0.05rem 0.14rem rgba(0,0,0,.01);
	}
	.menu_wrap ul {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 1;
	}
	.menu_wrap li{
		width: 1rem;
		list-style: none;
		font-size: .16rem;
		color: #9c9c9c;
		margin: 0 .3rem;
		cursor: pointer;
		white-space: nowrap;
		transition: all .2s .2s ease
	}
	.menu_wrap li.active {
		color: #000;
	}
	.menu_line{
		width: .8rem;
		height: .08rem;
		background: #ff392c;
		position: absolute;
		left: 0.67rem;
		bottom: .15rem;
		z-index: -1;
		/*transform: translateX(.8rem);*/
	}
	.part_bottom .fadeIn{
		animation-duration: .2s;
	}
	.part_bottom .fadeOut{
		animation-duration: .2s;
	}
</style>
<style type="text/css">
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
	
	/*common*/

	.material_b{
		width: 2.24rem;
		height: 2.24rem;
		background: url(../assets/answer/icon_1.png) repeat top center;
		margin: .1rem .1rem;
		border-radius: .1rem;
		position: relative;
		transition: all .2s ease
	}
	.loading{
		width: 2.24rem;
		height: 2.24rem;
		position: relative;
	}
	.loading span {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		/*background: #f7f6f4;*/
	}
	.loading span:after {
		content: '';
		width: 1rem;
		height: 1rem;
		background: url(../assets/img_load.png) no-repeat top center/100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	.material_b img{
		display: block;
		width: 100%;
		height: auto;
		border-radius: .1rem;
		cursor: pointer;
	}
	.delete_material{
		position: absolute;
		right: 3%;
		top: 3%;
		box-shadow: 0.05rem 0.05rem 0.05rem rgba(0,0,0,.1);
	}


</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import anime from 'animejs/lib/anime.es.js';
import feedBack from '@/components/feedBack.vue'
import {addDownloadOrder} from '@/api/service.js' 
export default {
	name: 'personal',
	props: {

	},
	data(){
		return {
			download_tips_dia: false,
			cur_down_path: '',
			cur_down_id: Number,
			// feedBack_flag: false,
			from_path: '/',
			menu_index: 0,
			menu_lists: [
				{tag:'我的资料', selected: false}, 
				{tag:'我的素材', selected: true}, 
				{tag:'编辑历史', selected: false}, 
				{tag:'收藏列表', selected: false}, 
				{tag:'消费明细', selected: false}
			]
		}
	},
	watch: {
		menu_index: 'menu_tag_func'
	},
	computed: {
		...mapState(['author_id']),
		download_path: function() {
			return this.filter_design_data[this.download_tips_index].design_img
		}

	},
	mounted: function() {
		const me =this;
		me.download_func()
	},
	methods: {
		...mapMutations(['setUserIntegral']),
		prevFunc: function() {
			const me =this;
			// 返回上一页
			// me.$router.go(-1)
			me.$router.push({
				path: me.from_path
			})
			
		},
		download_func: function() {
			//点击下载按钮
			const me = this;
			bus.$on('download', function(data) {
				me.download_tips_dia = true
				me.cur_down_path = 'http://ht.idealead.hbindex.com/uploadFiles/images/'+ data.path;
				me.cur_down_id = data.id
				console.log(data)
			})
		},
		confirm_downs_func: function() {
			// 点击确定下载
			const me =this;
			// this.axios.post("/Order/add_order",{
			// 	template_id: me.cur_down_id,
			// })
			addDownloadOrder(me.cur_down_id)
			.then(function(data) {
				console.log(data)
				if(data.code == 200) {
					me.downs(me.cur_down_path, false); //公共下载方法
					me.download_tips_dia = false //关闭下载提示弹窗
					me.$message('下载成功')
					me.setUserIntegral(data.integral)

					// 统计
					me.mtj_baidu('download_success','click', `downloadTemplate${me.cur_down_id}`)

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
		menu_tag_func: function() {
			const me =this;
			
			const index = me.menu_index,
					len = me.menu_lists[index].tag.length;
			// 动画
			anime({
				targets: '.menu_line',
				easing: 'spring(1, 60, 10, 0)',
				duration: 400,
				width: function() {
					return .2 * len + 'rem'
				},
				translateX: function() {
					const tar_left = [.69,2.29,3.89,5.49,7.1]
					// if(index == 1) {
					// 	return tar_left[index] + (1 - 1)/2 - .8  + 'rem'
					// }else {
						return tar_left[index] + (1 - .8)/2 - .8  + 'rem'
					// }
				},
			});

			// 切换路由
			// this.setRouter(index)
		},
		setRouter: function(index) {
			const me =this;
			// 样式判断
			me.menu_lists.forEach((item) => {
				item.selected = false
			})
			me.menu_lists[index].selected = true
			me.menu_index = index;
			// 切换路由
			const routerArrs =['info','myMaterial', 'edited', 'collect', 'consume']
			this.$router.push(routerArrs[index]).catch(err => {err})
		},
	},
	updated: function() {
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.from_path = from.path
			
			if(to.name == 'edited') {
				
				vm.setRouter(2)

				
			}else{
				vm.setRouter(0)
			}
		})
	},
}

</script>