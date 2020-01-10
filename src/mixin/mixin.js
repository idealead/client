import bus from "@/bus.js"
import axios from 'axios'
import watermark from '../plugins/watermark.js'
import {mapState, mapGetters, mapMutations} from 'vuex' //引入state，getters，mutations
export default {
	data() {
		return {
			max_request : 4, //请求次数
			// feedBack_flag: false,
		}
	},
	computed: {
		...mapState(['questionOriginData', 'answer_index', 'author_id']),
		curSelectIndex: function() {
			// 当前题目选择的答案序号
			return this.questionOriginData[this.answer_index-1].selectIndex
		}
	},
	mounted(){

	},
	methods:{
		...mapMutations(['setQuestionOriginData', 'setUserStatus', 'setAnswerIndex']),
		openMater: function(type,userId, typeIndex = 0) {
			this.$material ({
				entrance: type,
				user_id: userId,
				typeIndex: typeIndex
			})
		},
		openLogin: function() {
			this.$login ({
				loginSuccess: (data) => {
					// 修改vuex
					this.setUserStatus(data)
					this.$router.push('inputMsg/q1');
				},
				// click: () => {
				// 	this.$router.push('……')
				// }
			})
		},
		single_select_btn(index, aIndex = this.answer_index) {
			// aIndex 问题序号
			// index 答案序号
			const me =this;
			let stage_data = me.questionOriginData[aIndex-1].btns;
			for (let i = 0; i < stage_data.length; i++) {
				me.$set(stage_data[i], 'select', 0)
			}
			me.$set(stage_data[index], 'select', 1)
			me.setQuestionOriginData([stage_data,index])
			me.mtj_baidu('QA','click','QAChoiceId_' + stage_data[index].id)
		},
		downloadIamge(imgsrc, name, flag) {//下载图片地址和图片名
			const me =this;
			var image = new Image();
		    // 解决跨域 Canvas 污染问题
		    image.setAttribute("crossOrigin", "anonymous");
		    image.onload = function() {
	      	var canvas = document.createElement("canvas");
	      	canvas.width = image.width;
	      	canvas.height = image.height;
	      	var context = canvas.getContext("2d");
	      	context.drawImage(image, 0, 0, image.width, image.height);
	      	if(flag) {
		          var url = canvas.toDataURL("image/jpeg"); //得到图片的base64编码数据
		      }else{
		          var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
		      }

	        var a = document.createElement("a"); // 生成一个a元素
	        var event = new MouseEvent("click"); // 创建一个单击事件
	        a.download = name || "photo"; // 设置图片名称

	        // console.log(me.dataURLtoBlob(url))

	        a.href =URL.createObjectURL(me.dataURLtoBlob(url)); // 将生成的URL设置为a.href属性
	        a.dispatchEvent(event); // 触发a的单击事件
		    };
		    image.src = imgsrc;
		},
		dataURLtoBlob: function(dataurl) {
			var arr = dataurl.split(','), 
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]), 
			n = bstr.length, 
			u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new Blob([u8arr], { type: mime });
		},
		downs(url,flag){
			this.downloadIamge(url, 'pic', flag)
		},
		// 加水印函数
		watermark: function(src) {
			const options = {
				init(img) {
					img.crossOrigin = 'anonymous'
				}
			};
			console.log('water')
			let src_=watermark([src], options)
				.image(watermark.text.lowerRight('Insight', '120px serif', '#fff', 0.9))
				.then(function(url) {
					return url
				});
				watermark.destroy()
				return src_
		},
		// 普通统计函数
		mtj_baidu: function(tag,action, other=tag) {
			let userId =this.author_id
			// alert(other)
			// _hmt.push(['_trackEvent', tag, action, userId, other]);
			// MtaH5.clickStat(other)
			MtaH5.clickStat(other)
		},
		// loadingImg: function(src) {
		// 	let count = 0;
		// 	let imgs = [
		// 		'//ht.idealead.hbindex.com/uploadFiles/images/bq/ydtx.jpg',
		// 		require('@/assets/answer/pic_2.jpg'),
		// 		require('@/assets/answer/pic_3.jpg'),
		// 		require('@/assets/answer/pic_4.jpg'),
		// 	]
		// 	for (let img of imgs) {
		// 		let image = new Image();
		// 		image.src = img;
		// 		image.onload = () => {
		// 			count++;
		// 		};
		// 	}

		// }
		// qa统计函数
		// mtj_baidu_qa: function(tag,action,other) {
		// 	let userId =this.author_id
		// 	_hmt.push(['_trackEvent', tag, action, userId,other]);
		// }

		// 抠图函数
		// to_cutout: function(path) {
		// 	const me = this;
		// 	let cutout_path = '';
		// 	this.axios.post("/User_cutout/upload_file_once",{
		// 		path: path
		// 	})
		// 	.then(function(data) {
		// 		console.log(data.data)
		// 		if(data.data.code == 200) {
		// 			// me.loading = false
		// 			cutout_path = 'http://ht.idealead.hbindex.com/uploadFiles/images/' + data.data.path
		// 		}else{
		// 			console.log(1)
		// 			// me.to_cutout(path)
		// 			// me.loading = false
		// 		}
				
		// 	})
		// 	.catch(function(e) {
		// 		console.log(e)
		// 		console.log(1)
		// 		// me.to_cutout(path)
		// 	})
		// 	console.log(2)
		// 	return cutout_path
		// },
	}
}