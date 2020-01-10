import Vue from 'vue'
import Material from './material.vue'
// import axios from 'axios'
import {getUserAllMaterial} from '@/api/service.js' 


const MaterialBox = Vue.extend(Material)

Material.install = function (data) {
  let instance = new MaterialBox({
    data
  }).$mount()

  // document.body.appendChild(instance.$el)


  instance.entrance = data.entrance || ''
  instance.user_id = data.user_id || ''
  instance.typeIndex = data.typeIndex || 0

  Vue.nextTick(() => {

  	// instance.axios.get("/User_images/find_images_self")
    getUserAllMaterial() 
  	.then(function(data) {
  		console.log(data)
      instance.material_own_origin = data.dataImage.reverse();
      instance.material_own_cutout = data.dataCutout.reverse();
      instance.loading = true
      if(data.dataImage.length!=0 || data.dataCutout.length!=0) {
        instance.loading = true
      }else{
        instance.loading = false
      }
  	})
  	.catch(function(e) {

  	})
    instance.materialVisible = true
    // show 和弹窗组件里的show对应，用于控制显隐
  })
}

export default Material
