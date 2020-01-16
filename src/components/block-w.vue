<style type="text/css" scoped>
	.header_w{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.header_w{
		width: 100%;
		height: .9rem;
		position: fixed;
		z-index: 10;
	}
	.web_logo{
		width: 1.59rem;
		position: absolute;
		left: 2.2%;
		bottom: .14rem;
		cursor: pointer;
	}
	.right_blobk{
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.cuput{
		float: right;
		width: 1.2rem;
		height: .58rem;
		position: relative;
		margin-right: .16rem;
		cursor: pointer;
		-webkit-transition: all .3s cubic-bezier(.4,0,0,1);
		transition: all .3s cubic-bezier(.4,0,0,1);
	}
	/*.cuput:hover .cuput_btn{
		animation: breath .5s ease alternate infinite
	}*/


	/*@keyframes breath {
		0%{
			transform: scale(1);
		}
		100%{
			transform: scale(1.2);
		}
	}*/

	.cuput_btn{
		display: block;
		width: .33rem;
		height: .18rem;
		background: url(../assets/header/new.png) no-repeat top center/100% auto;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 2;

	}
	/*.cuput_txt{
		-webkit-transform: translateX(.8rem);
		-ms-transform: translateX(.8rem);
		transform: translateX(.8rem);
		-webkit-transition: opacity .15s cubic-bezier(.4,0,0,1),-webkit-transform .3s cubic-bezier(.4,0,0,1);
		transition: opacity .15s cubic-bezier(.4,0,0,1),-webkit-transform .3s cubic-bezier(.4,0,0,1);
		transition: transform .3s cubic-bezier(.4,0,0,1),opacity .15s cubic-bezier(.4,0,0,1);
		transition: transform .3s cubic-bezier(.4,0,0,1),opacity .15s cubic-bezier(.4,0,0,1),-webkit-transform .3s cubic-bezier(.4,0,0,1);
		opacity: 1;
	}*/
	.cuput_txt{
		display: block;
		position: absolute;
		z-index: 1;
		font-size: .18rem;
		width: 100%;
		top: 28%;
		text-align: center;
		color: #4f4f4f;
		/*color: #ff3e27;*/
		transition: all .4s ease
	}
	.cuput:hover .cuput_txt {
		/*transform: translateY(.05rem);
		opacity: 1;
		-webkit-transition-delay: .05s;
		transition-delay: .05s;*/
		color: #ff3e27
	}
	/*.cuput::before {
		display: inline-block;
		height: 100%;
		content: "";
		vertical-align: middle;
	}
	.cuput::after {
		opacity: 0;
		-webkit-transform: scale(.5);
		-ms-transform: scale(.5);
		transform: scale(.5);
	}*/
	/*.cuput::after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-radius: .76rem;
		background-color: #dcdcdc;
		-webkit-transform: scale(1);
		-ms-transform: scale(1);
		transform: scale(1);
		-webkit-transition: opacity .15s cubic-bezier(.4,0,0,1),background-color .3s cubic-bezier(.4,0,0,1),-webkit-transform .3s cubic-bezier(.4,0,0,1);
		transition: opacity .15s cubic-bezier(.4,0,0,1),background-color .3s cubic-bezier(.4,0,0,1),-webkit-transform .3s cubic-bezier(.4,0,0,1);
		transition: transform .3s cubic-bezier(.4,0,0,1),opacity .15s cubic-bezier(.4,0,0,1),background-color .3s cubic-bezier(.4,0,0,1);
		transition: transform .3s cubic-bezier(.4,0,0,1),opacity .15s cubic-bezier(.4,0,0,1),background-color .3s cubic-bezier(.4,0,0,1),-webkit-transform .3s cubic-bezier(.4,0,0,1);
	}*/
	.cuput:hover::after {
		opacity: 1;
		-webkit-transform: scale(1.2);
		-ms-transform: scale(1.2);
		transform: scale(1.2);
	}
	.user{
		float: right;
		width: 2.16rem;
		height: .58rem;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 2;
		cursor: pointer;
		background: url(../assets/header/user_block.png) no-repeat top center/ 100% auto;
	}
	.avatar{
		width: .44rem;
		height: .44rem;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 .12rem 0 .1rem;
		box-sizing: border-box;
		border:.02rem solid rgba(80,80,80,.3);
		background-color: #bf9c9a;
		position: relative;
	}
	.avatar img{
		position: absolute;
		left: -8%;
		width: 100%;
		height: auto;
	}
	.nickName{
		font-size: .16rem;
		color: #ffffff;
		width: .7rem;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-left: .1rem;
		box-sizing: border-box;
	}
	.login_btn{
		font-size: .16rem;
		color: #ffffff;
		margin-left: .5rem;
	}
	.logout_btn{
		font-size: .1rem;
		white-space: nowrap;
		/*position: absolute;*/
		/*right: 14%;*/
		text-decoration: underline;
		color: #fff;
		
	}
	.integral{
		font-size: .1rem;
		color: #fff;
		white-space: nowrap;
		margin-right: .08rem;
	}
	.fadeIn{
		animation-duration: 2.5s;
		animation-delay: .3s;
	}
	
	.loadingFont{
		opacity: 0;
		font-size: 0;
		/*font-family: "pfht", "japanhymc", "yrdzsl-Bold", "fzchft", "fzmhft", "fzytft", "FZHLFW", "bulmer_bt", "FZHLFW","fzxlft","hkktlj","fzfmjt",'fzzch','fzmshljt','ygytkjt','jhrhz','fzwbft';*/
	}
	.font1 {
		font-family: 'myrzzyt';
	}
	.font2 {
		font-family: 'pfht';
	}
	.font3 {
		font-family: 'fzchft';
	}
	.font4 {
		font-family: 'FZHLFW';
	}
	.font5 {
		font-family: 'hkktlj';
	}
	.font6 {
		font-family: 'fzmshljt';
	}
	.font7 {
		font-family: 'fzwbft';
	}
	.font8 {
		font-family: 'tttgb';
	}
	.font9 {
		font-family: 'fzcygbk';
	}
	.font10 {
		font-family: 'fzyx';
	}
	
	.font11 {
		font-family: 'hyjsj';
	}
	.font12 {
		font-family: 'fzchyjt';
	}
	.font13 {
		font-family: 'fzyht';
	}
	.font14 {
		font-family: 'ymct';
	}
	.font15 {
		font-family: 'mcst';
	}
	.font16 {
		font-family: 'fzdbsjt';
	}
	.font17 {
		font-family: 'fzdhjt';
	}
	.font18 {
		font-family: 'fztcghjt';
	}
	.font19 {
		font-family: 'fzgljt';
	}
	.font20 {
		font-family: 'adobehtstd';
	}
	.font21 {
		font-family: 'fzzyft';
	}
	.font22 {
		font-family: 'fzzyjt';
	}
	.font23 {
		font-family: 'rzrxnfhj'
	}
	.font24 {
		font-family: 'fzytft'
	}
	.font25 {
		font-family: 'fzxlft'
	}
	.font26 {
		font-family: 'jhrhz'
	}
	.font27 {
		font-family: 'hkpp'
	}
	.font28 {
		font-family: 'hydsyxt'
	}
	.font29 {
		font-family: 'fzdz'
	}
	.font30 {
		font-family: 'fzdbs';
	}
	.font31 {
		font-family: 'fzltzch_gbk'
	}

	.font32 {
		font-family: 'fzxs24'
	}
	.font33 {
		font-family: 'adobefs'
	}
	.font34 {
		font-family: 'fzht_gbk';
	}
	.font35 {
		font-family: 'japanhymc';
	}
	.font36 {
		font-family: 'fzmhft';
	}
	.font37 {
		font-family: 'bulmer_bt';
	}
	.font38 {
		font-family: 'fzfmjt';
	}
	.font39 {
		font-family: 'ygytkjt';
	}
	.font40 {
		font-family: 'fzmhjt';
	}
	.font41 {
		font-family: 'czsldkpj';
	}
	.font42 {
		font-family: 'alba';
	}
	.font43 {
		font-family: 'fzljdkt';
	}
	
	.font44 {
		font-family: 'bdzyjt';
	}
	.font45 {
		font-family: 'fzcysbft';
	}
	.font46 {
		font-family: 'hkstw12';
	}
	.font47 {
		font-family: 'fzhlgbk';
	}
	.font48 {
		font-family: 'Herculanum';
	}
	.font49 {
		font-family: 'STsong';
	}
	.font50 {
		font-family: 'fzzys_gbk';
	}
	.font51 {
		font-family: 'fzjtjt';
	}
	.font52 {
		font-family: 'syht_bold';
	}
	.font53 {
		font-family: 'fzhpft';
	}
	.font54 {
		font-family: 'fzxs14';
	}
	.font55 {
		font-family: 'yrdzsl-Bold'
	}
	.font56 {
		font-family: 'FZHLFW'
	}
	.font57 {
		font-family: 'fzzch'
	}
	.font58 {
		font-family: 'hyzzsdh'
	}
	.font59 {
		font-family: 'fzqkst';
	}
	.font60 {
		font-family: 'hwkt';
	}
	/*back*/
	/*.back_box{
		float: right;
		width: 1.2rem;
		height: .58rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: .2rem;
	}
	.deco.back_btn_home{
		width: .69rem;
		height: .44rem;
		background:url(../assets/back_icon1.png) no-repeat top center/100% 100%;
		cursor: pointer;
		position: relative;
		top: 4%;
		z-index: 10;
		transition: all .2s ease
	}
	.back_btn_home:active  {
		transform: scale(.8);
	}
	.back_btn_home{
		font-size: .13rem;
		color: #fff;
		right: 13%;
		left: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
	}
	.back_btn_home:before {display: none;}*/

</style>

<template>
	<transition appear appear-active-class="animated fadeIn">
		<div class="header_w">
			<!-- <div class="loadingFont font1 font2 font3 font4 font5 font6 font7 font8 font9 font10 font11 font12 font13 font14 font15 font16 font17 font18 font19 font20 font21 font22">字体加载</div> -->
			<div class="loadingFont" :class="'font' + item" v-for="(item, index) in 60" :key="index">字体加载</div>
			<img src="../assets/header/logo.png" class="web_logo" @click="backHome(); mtj_baidu('toHomePage','click','toHomePage')">
			<div class="right_blobk">
				<div class="user">
					<div class="avatar" v-if="isLogin" @click="go_personal_func">
						 <el-tooltip effect="light" content="个人中心" placement="bottom-start">
						 	<img :src="head" height="74" width="52">
						 </el-tooltip>
					</div>
					<div class="nickName" v-if="isLogin">{{currentUser}}</div>
					<span class="login_btn" @click="loginFunc" v-if="!isLogin">登录</span>
					<!-- <span class="integral" v-if="isLogin">{{integral}}积分</span> -->
					<span class="logout_btn" @click="logoutFunc" v-if="isLogin">退出登录</span>
				</div>
				<!-- <transition enter-active-class="animated zoomInLeft">
					<div class="back_box" v-if="$route.name != 'cover'">
						<div class="deco back_btn_home hoverable" @click="toHome">
							<div class="anim"></div>
							返回首页
						</div>	
					</div>
				</transition> -->
				<transition  enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
					<div class="cuput" @click="toCutout(); mtj_baidu('toCutoutPage','click','toCutoutPage')" v-if="isCutout && isLogin">
						<span class="cuput_btn"></span>
						<span class="cuput_txt">智能抠图</span>
					</div>
				</transition>
			</div>
		</div>
	</transition>
</template>

<script type="text/javascript">
	import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
	export default {
		name: 'block-w',
		props: {
			// isCutout: Boolean
		},
		// inject: ['reload'],
		data: function(){
			return {
				// classLists: ['font1','font2','font3','font4','font5','font6','font7','font8','font9','font10','font11','font12','font13','font14','font15','font16','font17','font18','font19','font20','font21','font22','font23','font24','font25','font26','font27','font28','font29','font30','font31','font32','font33','font34','font35','font36','font37','font38','font39','font40','font41','font42','font43','font44','font45','font46','font47','font48','font49','font50','font51','font52','font53','font54','font55','font56','font57','font58','font59']
			}
		},
		computed: {
			...mapState(['currentUser', 'isLogin', 'integral','sex']),
			isCutout: function() {
				return this.$route.path == '/cutout' ? false : true
			},
			head: function() {
				let head = require('../assets/header/head_male.png');
				if(this.sex == 1) {
					head = require('../assets/header/head_male.png')
				}else{
					head = require('../assets/header/head_female.png')
				}
				return head
			}
		},
		methods: {
			loginFunc: function() {
				this.openLogin()
			},
			toCutout: function() {
				this.$router.push('/cutout')
				// this.$message('敬请期待')
			},
			backHome: function() {
				this.$router.push('/cover')
			},
			go_personal_func: function() {
				if(this.$route.path.indexOf('/personal') != -1){
					return 
				}else {
					this.$router.push('/personal/')

					// 统计
					this.mtj_baidu('personalPage','link','toPersonalPage')
				}
			},
			logoutFunc: function() {
				sessionStorage.clear()
				this.delCookie('author_id')
				this.delCookie('currentUser')
				this.delCookie('isLogin')
				this.delCookie('user')
				// this.$router.replace('/')
				this.$router.go(0)

			},
			toHome: function() {
				this.$router.push('/')
			},


		}
	}

</script>