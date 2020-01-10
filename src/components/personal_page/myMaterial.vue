<template>
	<div class="myMaterial_w">
		<el-upload :action="'http://ht.idealead.hbindex.com/webapi/User_images/upload_file_once?user_id=' + authorId" list-type="picture-card" class="material_upload material_b":show-file-list="false" :data="picData" :on-success="uploadSuccess" :before-upload="beforeUpload" :on-error="uploadFail">
			<i class="el-icon-plus"></i>
		</el-upload>
		<div class="material_b" v-for="(item, index) in material_own" v-show="!loading">
			<img :src="'http://ht.idealead.hbindex.com/uploadFiles/images/' + item.path" @load="cout_load_img">
			<span class="delete_material close_btn" @click="deleteFunc(item.check_status, item.id, index)"><i></i></span>
		</div>
		<div class="loading" v-if="loading">
			<span></span>
		</div>
	</div>
</template>

<style type="text/css">
	.myMaterial_w{
		margin-top: .2rem;
	}
	.material_b{
		width: 2.24rem;
		height: 2.24rem;
		background: url(../../assets/answer/icon_1.png) repeat top center;
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
		background: url(../../assets/img_load.png) no-repeat top center/100%;
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
	.myMaterial_w .material_b img{
		margin: 0 auto;
		border-radius: .1rem;
		width: 100%;
		height: 100%;
		-o-object-fit: contain;
		object-fit: contain;
	}
	.material_upload {
		background: #efefef;
		box-shadow: 0.05rem 0.05rem 0.05rem rgba(0,0,0,.1);
		overflow: hidden;
		cursor: pointer;
		
	}
	.material_b:hover {
		transform: translateY(-.05rem);
		box-shadow: 0.05rem 0.05rem 0.05rem rgba(0,0,0,.2);
	}
	.material_upload:active{
		transform: translateY(0rem) scale(.95);
	}
	.material_upload:active:before {
		
	}
	.material_upload:before {
		content: '+';
		width: .68rem;
		height: .68rem;
		background-color: #ffffff;
		border-radius: 50%;
		display: block;
		line-height: .68rem;
		color: #dfdfdf;
		font-size: .8rem;
		position: absolute;
		-webkit-transition: all 265ms ease-in;
		transition: all 265ms ease-in;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	.myMaterial_w .material_upload:before{
		display: none;
	}
	.myMaterial_w .el-upload {
		width: 100%;
		height: 100%;
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
import {getUserAllMaterial,delUserMaterial} from '@/api/service.js' 
export default {
	name: 'myMaterial',
	props: {
		authorId: ''
	},
	data: function(){
		return {
			loading: false,
			loading_count:0,
			picData: {
				upload_file_once: {}
			},
			material_own_origin: [],
			material_own_cutout: []
		}
	},
	created() {
		
	},
	mounted() {
		// this.busEvent()
	},
	computed: {
		material_own: function() {
			this.material_own_origin.map((item) => {
				item.check_status = 1
			})
			this.material_own_cutout.map((item) => {
				item.check_status = 2
			})
			return [...this.material_own_origin, ...this.material_own_cutout]
		}
	},
	methods: {
		cout_load_img: function() {
			// 全部load完解除loading
			this.loading_count+=1;
			if( this.loading_count >= this.material_own.length/2){
				this.loading =false
			}
		},
		updatePage: function(data) {
			//上传更新页面
			const me =this;
			me.material_own_origin.unshift({
				author: me.authorId,
				check_status: 1,
				id: data.data.file_id,
				path: data.data.savepath
			})
			me.$message('上传成功！');
		},
		beforeUpload: function(file) {
			console.log(file)
			const me =this;
	        // 上传前
	        const isFormat = file.type === 'image/jpeg' || file.type === 'image/png';
	        const isLt2M = file.size / 1024 / 1024 < 2;

	        me.$set(me.picData, 'upload_file_once', file)

	        if (!isFormat) {
	        	this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
	        }
	        if (isFormat && !isLt2M) {
	        	this.$message.error('上传头像图片大小不能超过 2MB!');
	        }
	        return isFormat && isLt2M;
    	},
    	uploadSuccess: function(res , file) {
	        // 本地上传
	        // 上传成功
	        console.log(res)
	        this.updatePage(res)
	    },
	    uploadFail: function(err, file, fileList){
	        // 上传失败
	        this.$message(err)
	    },
		deleteFunc: function(status, id, index) {
			const me = this;
			// me.axios.get(`/User_images/del_images_self?check_status=${status}&id=${id}`)
			delUserMaterial(status,id)
			.then(function(data) {
				const origin_len = me.material_own_origin.length
				if(status == 1) {
					me.material_own_origin.splice(index, 1)
				}else{
					me.material_own_cutout.splice(index - origin_len , 1)
				}
				me.$message('删除成功！');

				// 统计
				me.mtj_baidu('deleteMate','click','deleteMaterial')
			})
			.catch(function(e) {
				console.log(e)
			})
		}
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			// vm.axios.get("/User_images/find_images_self")
			getUserAllMaterial()
			.then(function(data) {
				console.log(data)
				vm.material_own_origin = data.dataImage.reverse();
				vm.material_own_cutout = data.dataCutout.reverse();
				if(data.dataImage.length!=0 || data.dataCutout.length!=0) {
					vm.loading = true
				}else{
					vm.loading = false
				}
			})
			.catch(function(e) {
				console.log(e)
			})
		})
	}
}

</script>