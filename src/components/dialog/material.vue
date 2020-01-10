<template>
  <el-dialog
  title="提示"
  :visible.sync="materialVisible"
  width="9.34rem" append-to-body @closed="closedFunc" customClass="material" id="material">
    <div slot="title" class="dialog_header">
      <span>我的素材</span>
    </div>
    <div class="dia_wrap">
      <div class="dia_main">
       <el-upload :action="'//ht.idealead.hbindex.com/webapi/User_images/upload_file_once?user_id=' + user_id" list-type="picture-card" class="material_upload li":show-file-list="false" :data="picData" :on-success="uploadSuccess" :before-upload="beforeUpload" :on-error="uploadFail">
          <i class="el-icon-plus"></i>
       </el-upload>
       <div class="own_material li" v-show="!loading" v-for="(item, index) in material_own" @click="selectPic(item.path, item.id)" :key="index">
        <img :src="'http://ht.idealead.hbindex.com/uploadFiles/images/' + item.path" @load="cout_load_img">
      </div>
      <div class="loading_blok own_material li" v-if="loading">
        <span></span>
      </div>
      </div>
    </div>
</el-dialog>

</template>
<style type="text/css">
  .material .el-dialog__body{padding:0;border-radius: 5px;}
  .material .el-dialog__header{
    overflow: hidden;
    height: .76rem;
  }
  .el-dialog__headerbtn{
    width: .29rem;
    height: .29rem;
    background-color: #ff392c;
    border-radius: 50%;
    transition: all .2s ease
  }
  .el-dialog__headerbtn .el-dialog__close{
    color: #fff!important;
    font-size: .22rem;
    font-weight: bolder;
    line-height: .29rem;
    transition: all .2s ease
  }
  .el-dialog__headerbtn:active{transform: scale(.8);}
  .el-dialog__headerbtn:hover .el-dialog__close{
    transform: rotate(-90deg);
  }
  #material .material_upload{
    box-shadow: none;
  }
  .material_upload .el-upload--picture-card{
    width: 1.71rem;
    height: 1.71rem;
    background: url(../../assets/dialog/upload.png) no-repeat top center/100%;
    transition: all .2s ease;
    float: left;
  }
  #material .material_upload:before{
    display: none;
  }
  .material_upload .el-upload--picture-card i{display: none;}
  .material_upload .el-upload--picture-card:hover, .material_upload .el-upload:focus{
    border: none;
    box-shadow: 1px 1px .1rem #e2e1df;
  }
</style>
<style type="text/css" scoped>
  .dialog_header{
      color: #000;
      font-size: .16rem;
      background-color: #fff;
      margin: 3%;
  }
  .dialog_header span {
    display: block;
    width: .79rem;
    text-align: center;
    position: relative;
    z-index: 1;
    white-space: nowrap;
  }
  .dialog_header span:before {
    content: '';
    width: 100%;
    height: .08rem;
    background-color: #ff392c;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  .dia_wrap{
    height: 4.33rem;
    background-color: #f7f6f4;
    border-radius: 5px;
    padding-top: 1px;
  }
  .dia_main{
    width: 90%;
    height: 90%;
    margin:.2rem auto 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: auto;

  }
  .li{
    margin: 0 .3rem .2rem 0;
  }
  .own_material {
    width: 1.71rem;
    height: 1.71rem;
    background: url(../../assets/answer/icon_1.png) repeat top center;
    border-radius: .05rem;
    cursor: pointer;
    position: relative;
  }
  .own_material span {
    display: block;
    width: 100%;
    height: 100%;
   position: absolute;
   background: #f7f6f4;
  }
  .own_material span:after {
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
  .own_material img{
    margin: 0 auto;
    width: 100%;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
  }
</style>

<script>
  import bus from "@/bus.js"
  export default {
    data() {
      return {
        materialVisible: false,
        loading: false,
        loading_count:0,
        entrance: '',
        user_id: '',
        typeIndex: Number,
        material_own_origin: [], //个人上传素材
        material_own_cutout: [], //个人上传素材的抠图
        picData: {
          upload_file_once: {}
        },

      };
    },
    computed: {
      material_own: function() {
        return [...this.material_own_origin, ...this.material_own_cutout]
      }
    },
    methods: {
      closedFunc: function() {
       let material = document.getElementById('material'); 
        document.body.removeChild(material)
      },
      cout_load_img: function() {
        // 全部load完解除loading
        this.loading_count+=1;
        if( this.loading_count >= this.material_own.length/2){
          this.loading =false
        }
      },
      beforeUpload: function(file) {
        console.log(file.type)
        // 上传前
         const isFormat = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

         this.$set(this.picData, 'upload_file_once', file)

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
          if(res.code == 200) {
            this.judgeUploadFrom(res)
          }else{
            this.$message(res.msg)
          }
      },
      uploadFail: function(err, file, fileList){
        // 上传失败
        this.$message(err)
      },
      selectPic: function(path,id) {
        // 从图库中选择
        this.judgeUploadFrom({
          data: {
            'file_id': id,
            'savepath': path
          }
        })
      },
      // 本地上传和图库选择 公共执行方法
      judgeUploadFrom: function(res) {
        console.log(this.entrance)
        if(this.entrance == 'cutout') {
          bus.$emit('uploadSuccess_cutout', res )

        }else if(this.entrance == 'inputMsg') {

          if(this.typeIndex === 1) {
            // 上传logo成功
            bus.$emit('uploadSuccess_logo', res )

          }else if(this.typeIndex === 2) {
            // 上传logo成功
            bus.$emit('uploadSuccess_product', res )
            
          }else{
            this.$notify({
              title: '警告',
              message: '好像哪里不对哦！',
              type: 'warning'
            });
          }
        }
        this.materialVisible = false;
      },
    }
  };
</script>