<template>
	<div class="baz">
		<div>{{likui3}}</div>
<!-- 		<router-link to="/tab">sdfasfsadfasdf</router-link> -->
    <router-link to="/">跳转到首页</router-link>
	</div>
</template>
<script>
	export default{
		 name: 'baz',
		data(){
		   return{
				likui3:'记者：习近平主席今天抵达香港，并将出席香港回归20周年庆祝大会。据媒体报道，作为庆祝活动的一部分，中国首艘航空母舰辽宁舰也将于7月访问香港。请予以证实。吴谦：香港回归祖国20周年也是解放军进驻香港20周年，是值得庆祝和纪念的。辽宁舰航母编队将在跨区训练期间赴香港，参加解放军进驻香港20周年的庆祝活动，具体活动安排将适时发布信息。（图张凯摄）'
			}
		}
	}
</script>