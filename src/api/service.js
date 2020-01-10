import Vue from 'vue'
import axios from 'axios'

// let header = ''
// if (process.env.NODE_ENV == 'development') {    
//     header = '';
// } else if (process.env.NODE_ENV == 'debug') {    
//    header = '';
// } else if (process.env.NODE_ENV == 'production') {    
//    header = '';
// } 


// 抠图接口
/**
 * 200成功
    207抠图已达今日上线
    208非法用户（用户id不存在）
    206抠图失败
    204返回路径为空
    10003窗建文件夹失败
    */
/**
 * [cutoutByJpg 抠图接口]
 * @param  {[type]} path [原始图路径]
 * @param  {Number} type [是否需要保存 1：保存 ，其余的都不保存 初始化不保存]
 * @return {[type]}      [返回抠图的路径和id]
 */
export function cutoutByJpg(path, type = 0) { 

	// 创建axios实例
	// let instance = axios.create({timeout: 5000});

    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.post('/webapi/User_cutout/upload_file_once', {
        	path : path,
            type: type,
        	// user_id: Vue.prototype.getCookie('author_id')
        })        
        .then(res => { 
        	// console.log(res.data)
        	resolve(res.data);
        	
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}


/**
 * [loginByStaffAccount 登录接口]
 * @param  {[String]} email    [员工系统邮箱 初始化：姓名拼音@gdinsight.com]
 * @param  {[String]} password [员工系统密码 初始化：abc123]
 * @return {[type]}          [用户信息]
 */
export function loginByStaffAccount(email, password) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.post('/webapi/User_login/user_login', {
            email : email,
            password: password,
        })        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}


/**
 * [requestFirstQuestion 请求第一道题数据]
 * @return {[type]} [description]
 */
export function requestFirstQuestion() {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.get('/webapi/Label/get_label_class')        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}


/**
 * [requestAnotherQuestion 根据第一道题选项请求剩下三道题的数据]
 * @param  {[type]} selectId [第一道题选择  的选项id]
 * @return {[type]}          [剩下三道题的数据]
 */
export function requestAnotherQuestion(selectId) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.get(`/webapi/Label/get_label_title&label_class_id=${selectId}`)        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}


/**
 * [getImageMainInfo 获取图片主体的left top width height函数 ]
 * @param  {[type]} path [图片路径]
 * @return {[type]}      [返回图片主体的left top width height]
 */
export function getImageMainInfo(path) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.post('/webapi/User_cutout/get_image_body', {
            path : path
        })        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}


/**
 * [cutoutImgMain 剪切出图片的某个部分]
 * @param  {[type]} imgSrc   [图片路径]
 * @param  {[type]} imgData  [剪切图片的位置 left top width height]
 * @param  {[type]} fileType [图片的格式，最终导出的base64保持格式一致]
 * @return {[type]}          [返回base64]
 */
export function cutoutImgMain(imgSrc, imgData, fileType) {
   return new Promise((resolve, reject) => {         
        let spr_val = 10, //弹性值
            sX = imgData.left - spr_val, //left坐标
            sY = imgData.top - spr_val, //top坐标
            sWid = imgData.width + spr_val*2, //宽度
            sHei =imgData.height + spr_val*2; //高度
            
        let image = new Image();
        image.setAttribute("crossOrigin", "anonymous");
        image.src = '/uploadFiles/images/' + imgSrc;

        image.onload = function() {
            let canvas = document.createElement("canvas");
        
            let context = canvas.getContext("2d");
            canvas.width = sWid;
            canvas.height = sHei;
            context.drawImage(image, sX, sY, sWid, sHei,0,0,sWid,sHei);
            let path_cut = '';
            if(fileType == 'png') {
                path_cut = canvas.toDataURL("image/png")
            }else if(fileType == 'jpg') {
                path_cut = canvas.toDataURL("image/jpeg")
            }else{
                path_cut = canvas.toDataURL("image/png")
            }
            
            // console.log('path_cut',path_cut)
            
            if(path_cut != ''){
                resolve(path_cut);
            }else{
                reject('网络不稳定请刷新重试！')
            }
        };    
    })
}

/**
 * [uploadImgFiles 上传图片保存返回path id]
 * @param  {[type]} path     [上传图片的路径]
 * @param  {[type]} fileType [图片的格式，与保存返回的格式一致]
 * @return {[type]}          [返回保存图片的path id]
 */
export function uploadImgFiles(path, fileType) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.post('/webapi/User_images/save_main_body', {
            image_base64: path,
            type: fileType
        })        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [getUserAllCollectTem 获取用户全部模板数据]
 * @param  {[type]} userid     [用户userId]
 * @return {[type]}        [description]
 */
export function getUserAllCollectTem() {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.get('/webapi/Collection/find_collection')        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}


/**
 * [collectTempate 收藏模板]
 * @param  {[type]} id     [模板id]
 * @param  {[type]} render [判断该模板的类别 1：用户渲染图 2：原图]
 * @return {[type]}          []
 */
export function collectTempate(id, render) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.post('/webapi/Collection/add_collection', {
            template_id: id,
            is_user: render
        })        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [cancelCollectTempate 取消收藏模板]
 * @param  {[type]} id     [模板id]
 * @param  {[type]} render [判断该模板的类别 1：用户渲染图 2：原图]
 * @return {[type]}          []
 */
export function cancelCollectTempate(id, render) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.get(`/webapi/Collection/change_collection?template_id=${id}&is_user=${render}`)        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [addDownloadOrder 模板下载接口]
 * @param {[type]} temId [模板的id]
 */
export function addDownloadOrder(temId) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.post('/webapi/Order/add_order', {
            template_id: temId
        })        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [loadMoreTemplate 加载更多模板函数]
 * @param  {[type]} page [页码]
 * @return {[type]}      [description]
 */
export function loadMoreTemplate(page) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.get(`/webapi/Template/get_paging&page=${page}`)        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [getMatchTemplate 获得匹配模板接口]
 * @param  {[Array]} labels [用户的标签]
 * @return {[type]}        [description]
 */
export function getMatchTemplate(labels) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.post('/webapi/Template/get_all_template', {
            labels: labels
        })        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [getUserOrderLists 获取用户全部订单接口]
 * @return {[type]} [description]
 */
export function getUserOrderLists() {
     return new Promise((resolve, reject) => {         
        Vue.prototype.axios.get('/webapi/Order/find_order_self')        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [getUserAllEditedList 获取用户所有已编辑模板接口]
 * @return {[type]} [description]
 */
export function getUserAllEditedList() {
     return new Promise((resolve, reject) => {         
        Vue.prototype.axios.get('/webapi/Save/find_save_list')        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [delUserEditedList 删除某一个已编辑模板接口]
 * @param  {[type]} id [要删除的模板id]
 * @return {[type]}    [description]
 */
export function delUserEditedList(id) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.post('/webapi/Save/del_save', {
            template_id: id
        })        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}


/**
 * [getUserAllMaterial 获取用户全部素材接口]
 * @return {[type]} [description]
 */
export function getUserAllMaterial() {
     return new Promise((resolve, reject) => {         
        Vue.prototype.axios.get('/webapi/User_images/find_images_self')        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [delUserMaterial 删除某一个素材]
 * @param  {[type]} status [该素材是属于抠图，还是原始图 1：原始图  2：抠图]
 * @param  {[type]} id     [素材id]
 * @return {[type]}        [description]
 */
export function delUserMaterial(status,id) {
     return new Promise((resolve, reject) => {         
        Vue.prototype.axios.get(`/webapi/User_images/del_images_self?check_status=${status}&id=${id}`)        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}


/**
 * [saveUserCutoutImg 保存用户抠图结果接口]
 * @param  {[type]} userId [用户id]
 * @param  {[type]} path   [抠图路径]
 * @return {[type]}        [description]
 */
export function saveUserCutoutImg(userId,path) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.post('/webapi/User_cutout/save_cutout_file', {
            user_id: userId,
            path: path
        })        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [getUserInfo 个人中心获取个人信息 userId]
 * @return {[type]} [description]
 */
export function getUserInfo() {
     return new Promise((resolve, reject) => {         
        Vue.prototype.axios.get('/webapi/User/get_dep_user')        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [sendFeedBack 反馈函数]
 * @param  {[type]} emoj_index [index]
 * @param  {[type]} content    [description]
 * @return {[type]}            [description]
 */
export function sendFeedBack(emoj_index,content) {
    return new Promise((resolve, reject) => {         
        Vue.prototype.axios.post('/webapi/Feedback/add_feedback', {
            feedback_class: emoj_index,
            content: content
        })        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

/**
 * [getAlPath 获取所有图片path]
 * @return {[type]} [description]
 */
export function getAllPath() {
     return new Promise((resolve, reject) => {         
        Vue.prototype.axios.get('/webapi/Label/get_qa_path')        
        .then(res => { 
            resolve(res.data);
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}