<template>
	<div class="tab">
		<div>{{likui}}</div>
<!-- 		<router-link to="/tab">sdfasfsadfasdf</router-link> -->
    <router-link to="/">跳转到首页</router-link>
	</div>
</template>
<script>
	export default{
		 name: 'tab',
		data(){
		   return{
				likui:'大家好我是固定在根目录的路由'
			}
		}
	}
</script>