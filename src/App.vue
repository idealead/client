<template>
	<div id="app">
		<!--header -->
		<block-w></block-w>
		<transition appear appear-active-class="animated fadeIn">
			<router-view></router-view> 
		</transition>	
	</div>
</template>

<script>

import {getAllPath} from '@/api/service.js' 
export default {
  name: 'app',
  mounted () {
  	window.addEventListener('hashchange', () => {
  		let currentPath = window.location.hash.slice(1)
  		if (this.$route.path !== currentPath) {
  			this.$router.push(currentPath)
  		}
  	}, false)
  },
  beforeCreate() {
  	let imgs_online = [];
  	let count = 0;
  	getAllPath()
  	.then(res => {
  		console.log(res.data)
  		imgs_online = res.data
  		imgs_online.map(item => {
  			let image = new Image();
  			image.src = '//ht.idealead.hbindex.com/uploadFiles/images' + item.path;
  			image.onload = () => {
  				count++;
  			};
  		})
  	})
  	.catch(err => {
  		console.log(err)
  	})

  }
}
</script>

<style>
	*{
		padding:0;
		margin:0;
	}
	#app {
		width: 100%;
		height: 100%;
		font-family: 'SiYuan';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		overflow: hidden;
		/*margin-top: 60px;*/
	}
	.fadeIn{
		opacity: 1;
		transition: all .2s ease-in
	}
	.fadeOut{
		opacity: 0;
		transition: all .2s ease-out
	}
	.close_btn{
		width: .29rem;
		height: .29rem;
		background-color: #ff392c;
		border-radius: 50%;
		-webkit-transition: all .2s ease;
		transition: all .2s ease;
		cursor: pointer;
	}
	.close_btn i{
		color: #fff!important;
		font-size: .22rem;
		font-weight: bolder;
		line-height: .29rem;
		-webkit-transition: all .2s ease;
		transition: all .2s ease;
		font-family: element-icons!important;
		font-style: normal;
		font-weight: bolder;
		display: inherit;
	}
	.close_btn:hover i {
		transform: rotate(90deg);
	}
	.close_btn:active {
		transform: scale(.8) 
	}
	.close_btn i:before {
		content: "\e6db";
		list-style: normal;
	}
	.scroll::-webkit-scrollbar {/*滚动条整体样式*/
		width: .05rem;     /*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	.scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
		border-radius: .1rem;
		-webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.2);
		background: #535353;
	}

	.scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(255,255,255,255.2);
		border-radius: .1rem;
		background: #EDEDED;
	}
</style>
