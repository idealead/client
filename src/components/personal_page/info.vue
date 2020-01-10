<template>
	<div class="myInfo_w">
		<div class="info_wrap">
			<p class="info_tt">基本信息</p>
			<div class="info_detail">
				<ul>
					<li>
						<span>用户名</span>
						<span v-show="info.user_name">{{info.user_name}}</span>
					</li>
					<li>
						<span>性别</span>
						<span v-show="sex != ''">{{sex}}</span>
					</li>
					<li>
						<span>所在团队</span>
						<span v-show= "info.dep_name">{{info.dep_name}}</span>
					</li>
					<li>
						<span>剩余积分</span>
						<span v-show="info.integral">{{info.integral}}积分</span>
					</li>
					<li>
						<span>消耗积分</span>
						<span v-show="info.pay_integral">{{info.pay_integral}}积分</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="loading" v-if="loading">
			<span></span>
		</div>
	</div>
</template>

<style type="text/css">
	.info_wrap {
		margin: 4% auto 0;
		width: 82%;
		color: #000000;
	}
	.info_tt{
		font-size: .18rem;
		text-align: right;
		width: 1rem;
	}
	.info_detail{
		margin-top: .3rem; 
		font-size: .16rem;
		padding-bottom: .4rem;
		border-bottom: 1px solid rgba(0,0,0,.2)
	}
	.info_detail li{
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: .17rem;
	}
	.info_detail li span:first-of-type {
		width: 1rem;
		display: block;
		text-align: right;
		margin-right: .65rem;
		opacity: .6;
		white-space: nowrap;
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
		background: url(../../assets/img_load.png) no-repeat top center/100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	

</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import {getUserInfo} from '@/api/service.js' 
export default {
	name: 'info',
	props: {
		authorId: ''
	},
	data: function(){
		return {
			info: Object,
			loading: false
		}
	},
	mounted() {
		
	},
	computed: {
		sex: function() {
			if(this.info.sex === 1){
				return '男'
			}else if (this.info.sex === 2){
				return '女'
			}else{
				return ''
			}
		}
	},
	methods: {
		
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			
			getUserInfo()
			.then(function(data) {
				console.log(data)
				vm.info = data.data
			})
			.catch(function(e) {
				console.log(e)
			})
		})
	}
}

</script>