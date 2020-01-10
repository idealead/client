<template>
	<div class="consume_w">
		<div class="consume_top">
			<div class="consume_sth flex">
				<span>序号</span>
				<span>消费时间</span>
				<span>消费内容</span>
				<span>消费积分</span>
			</div>
		</div>
		<div class="consume_bottom scroll">
			<div class="consume_sth">
				<div class="flex consume_list" v-for="(item, index) in consume_lists">
					<span>{{index+1}}</span>
					<span>{{item.create_time}}</span>
					<span><img :src="'http://ht.idealead.hbindex.com/uploadFiles/images/' + item.path" alt=""></span>
					<span>{{item.price}}积分</span>
				</div>
			</div>
		<p v-if="none_content" class="none_content">还没下载过设计稿</p>
		</div>
	</div>
</template>

<style type="text/css" scoped>
	.part_content .consume_w{
		padding: 0;
		display: block;
		padding: .7rem 0 .6rem;
		overflow: hidden;
	}
	.consume_top{
		width: 100%;
		height: .64rem;
		background: #fafafa;
		font-size: .16rem;
		color: #000;
		font-weight: bolder;
		position: absolute;
		top: 0;
		z-index: 1;
	}
	.consume_top .consume_sth{
		height: 100%;
	}
	.consume_bottom {
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.consume_sth{
		width: 9.5rem;
		margin:0 auto;
	}
	.flex {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.flex span {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.consume_list{
		color: #000000;
		height: 1.26rem;
		font-size: .16rem;
		padding: 2% 0;
		border-bottom: 1px solid #e0e0e0;
	}
	.consume_list img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}


</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
// import axios from 'axios'
import {getUserOrderLists} from '@/api/service.js' 
export default {
	name: 'consume',
	props: {

	},
	data: function(){
		return {
			consume_lists:[],
			none_content: false,
		}
	},
	created() {
		
	},
	mounted() {
	},
	computed: {
		
	},
	methods: {
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			// vm.axios.get("/Order/find_order_self")
			getUserOrderLists()
			.then(function(data) {
				console.log(data.data)
				if(data.data.length > 0) {
					vm.consume_lists = data.data.reverse()
				} else{
					vm.none_content = true
				}
			})
			.catch(function(e) {
				console.log(e)
			})
		})
	},
}

</script>