<template>
	<div class="edited_w">
		<div class="material_b" v-for="(item, index) in origin_design_data" v-show="!loading">
			<a :href="'http://ht.idealead.hbindex.com/html/dist/#/canvas?userType=client&user_id=' + author_id + '&tempId=' + item.id" target="_blank">
				<img :src="'http://ht.idealead.hbindex.com/uploadFiles/images/' + item.path" @load="cout_load_img">
			</a>
			<!-- <img :src="item.watermark_path" class="template_pic"> -->
			<span class="delete_material close_btn" @click="delete_material(index, item.id)"><i></i></span>
			<div class="design_control_block">
				<span>{{item.template_name}}</span>
				<img src="../../assets/person/download.png" class="download_btn" alt="download" @click="download_collection_func(item.path,item.id)">
			</div>
		</div>
		<div class="loading" v-if="loading">
			<span></span>
		</div>
		<p v-if="none_content" class="none_content">目前没有任何已编辑的设计</p>
	</div>
</template>

<style type="text/css" scoped>
	/*common*/
	.edited_w .material_b{
		height: auto;
		background: none;
		overflow: hidden;
	}
	.edited_w .material_b:hover .design_control_block{
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
	.material_b:hover {
		transform: translateY(-.05rem);
		box-shadow: 0.05rem 0.05rem 0.05rem rgba(0,0,0,.2);
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
/*	.material_b .template_pic {
		display: block;
		width: 100%;
		height: auto;
		border-radius: .1rem;
		cursor: pointer;
	}*/
	

</style>
<style type="text/css">
	.none_content{
		color: #333;
		font-size: 0.4rem;
		text-align: center;
		width: 100%;
	}
</style>

<script type="text/javascript">
import bus from "@/bus.js"
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
import watermark from '../../plugins/watermark.js'
import {getUserAllEditedList, delUserEditedList} from '@/api/service.js' 
export default {
	name: 'edited',
	props: {

	},
	data: function(){
		return {
			loading: false,
			none_content: false,
			loading_count:0,
			origin_design_data: []
			
		}
	},
	created() {
		
	},
	mounted() {
	},
	computed: {
		
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
		download_collection_func: function(path,id) {
			const me =this;
			bus.$emit('download', {'path': path, 'id': id})
		},
		delete_material: function(index, id) {
			const me =this;
			// this.axios.post("/Save/del_save",{
			// 	template_id: id
			// })
			delUserEditedList(id)
			.then(function(data) {
				console.log(data)
				me[`origin_design_data`].splice(index, 1)
				me.$message('删除成功！')

				// 统计
				me.mtj_baidu('deleteEdited','click',`deleteEditedTemplate${id}`)
			})
			.catch(function(e) {
				console.log(e)
			})
		},
		
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			// vm.axios.get("/Save/find_save_list")
			getUserAllEditedList()
			.then(function(data) {
				console.log(data.data)
				if(data.data.length != 0){
					let tem_data = data.data;
					vm.loading = true
					// 加水印
					// tem_data.map((item) => {
					// 	vm.watermark('http://ht.idealead.hbindex.com/uploadFiles/images/' + item.path).then(function(value) {
					// 		return item.watermark_path =  value
					// 	})	
					// })
					
					console.log(tem_data)
					
					// console.log(vm.origin_design_data)

					setTimeout(function() {
						vm.origin_design_data = tem_data.reverse()
					}, 500)

					// 
					// vm.$set(vm, 'origin_design_data', tem_data)
				}else{
					vm.loading = false
					vm.none_content = true
				}
			})
			.catch(function(e) {
				console.log(e)
			})
			
			// if(vm.origin_design_data.length!=0) {
				
			// }else{
				
			// }
		})
	},
}

</script>