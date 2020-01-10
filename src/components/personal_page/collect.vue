<template>
	<div class="collect_w">
		<div class="material_b" v-for="(item, index) in filter_collect_data" v-show="!loading">
			<!-- <img :src="'http://ht.idealead.hbindex.com/uploadFiles/images/'+ item.path" @load="cout_load_img"> -->
			<a :href="'http://ht.idealead.hbindex.com/html/dist/#/canvas?userType=client&user_id=' + author_id + '&tempId=' + item.template_id" target="_blank">
			<img :src="'http://ht.idealead.hbindex.com/uploadFiles/images/' + item.path" @load="cout_load_img">
			</a>
			<!-- <img :src="item.watermark_path" class="template_pic"> -->
			<span class="delete_material close_btn" @click="delete_collect_func(item.template_id, item.level, index)"><i></i></span>
			<div class="design_control_block">
				<span>{{item.template_name}}</span>
				<img src="../../assets/person/download.png" class="download_btn" alt="download" @click="download_collection_func(item.path, item.template_id)">
			</div>
		</div>
		<div class="loading" v-if="loading">
			<span></span>
		</div>
		<p v-if="none_content" class="none_content">还没收藏的设计稿</p>
	</div>
</template>

<style type="text/css" scoped>
	/*common*/
	.material_b{
		width: 2.24rem;
		height: 2.24rem;
		background: url(../../assets/answer/icon_1.png) repeat top center;
		margin: .1rem .1rem;
		border-radius: .1rem;
		position: relative;
		transition: all .2s ease
	}

	.collect_w .material_b{
		height: auto;
		background: none;
		overflow: hidden;
	}
	.collect_w .material_b:hover .design_control_block{
		transform: translateY(0);
	}
	.design_control_block{
		width: 100%;
		height: .47rem;
		background: rgba(30,30,30,.9);
		position: absolute;
		bottom: 0;
		transition: all .2s ease;
		transform: translateY(100%);
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.design_control_block span {
		color: #e6e6e6;
		font-size: .16rem;
	}
	.download_btn{
		width: .14rem;
		border-radius: 0;
		transition: all .2s ease;
	}
	.download_btn:active{
		transform: scale(.8)
	}

	.close_btn {
		width: .29rem;
		height: .29rem;
		background-color: #ff392c;
		border-radius: 50%;
		transition: all .2s ease;
		cursor: pointer;
	}
	.close_btn i {
		color: #fff!important;
		font-size: .22rem;
		line-height: .29rem;
		transition: all .2s ease;
		font-family: element-icons!important;
		font-style: normal;
		font-weight: bolder;
		display: inherit;
	}

	/*.delete_material{
		position: absolute;
		right: 3%;
		top: 3%;
		box-shadow: 0.05rem 0.05rem 0.05rem rgba(0,0,0,.1);
	}*/
	/*.material_b .template_pic {
		display: block;
		width: 100%;
		height: auto;
		border-radius: .1rem;
		cursor: pointer;
	}*/
	.material_b:hover {
		transform: translateY(-.05rem);
		box-shadow: 0.05rem 0.05rem 0.05rem rgba(0,0,0,.2);
	}


</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import {getUserAllCollectTem, cancelCollectTempate} from '@/api/service.js' 
export default {
	name: 'collect',
	props: {
		// download_tips_dia: Boolean
	},
	data: function(){
		return {
			loading: false,
			none_content: false,
			loading_count:0,
			origin_design_data: Array,
		}
	},
	created() {
		
	},
	mounted() {
	},
	computed: {
		filter_collect_data: function() {
			return this.origin_design_data
		}
	},
	methods: {
		cout_load_img: function() {
			// 全部load完解除loading
			const me =this;
			this.loading_count+=1;
			if( this.loading_count >= this.origin_design_data.length){
				this.loading = false
			}
		},
		delete_collect_func: function(id, level, index) {
			// 删除收藏模板
			const me =this;
			let	is_user = 0;
			if(level == "permanent") {
				is_user = 2
			}else{
				is_user = 1
			}
			// me.axios.get(`/Collection/change_collection?template_id=${id}&is_user=${is_user}`)
			cancelCollectTempate(id,is_user)
			.then(function(data) {
				console.log(data)
				me.origin_design_data.splice(index,1)
				console.log(me.filter_collect_data)
				me.$message('取消成功');

				// 统计
				me.mtj_baidu('deleteCollect','click',`deleteCollectTemplate${id}`)
			})
			.catch(function(e) {
				console.log(e)
			})
		},
		download_collection_func: function(path,id) {
			const me =this;
			bus.$emit('download', {'path': path, 'id': id})
		},
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			// vm.axios.get("/Collection/find_collection")
			getUserAllCollectTem()
			.then(function(data) {
				console.log(data.data)
				if(data.data.length != 0){
					let tem_data = data.data;
					vm.loading = true
					// // 加水印
					// tem_data.map((item) => {
					// 	vm.watermark('http://ht.idealead.hbindex.com/uploadFiles/images/' + item.path).then(function(value) {
					// 		return item.watermark_path =  value
					// 	})	
					// })

					setTimeout(function() {
						vm.origin_design_data = tem_data.reverse()
					}, 500)
				}else{
					vm.loading = false
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