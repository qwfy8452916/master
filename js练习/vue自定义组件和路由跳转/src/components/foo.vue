<template>
	<div class="foo">
		<div>{{likui1}}</div>
<!-- 		<router-link to="/tab">sdfasfsadfasdf</router-link> -->
    <router-link to="/">跳转到首页</router-link>
	</div>
</template>
<script>
	export default{
		 name: 'foo',
		data(){
		   return{
				likui1:'据英国广播公司网站6月29日报道，中国28日赠送了大量枪支给菲律宾。这批自动步枪和狙击步枪和弹药是杜特尔特上台以来从中国得到的第一批军援。其中有中国提供的具有世界先进水平的7.62毫米高精度狙击步枪。'
			}
		}
	}
</script>