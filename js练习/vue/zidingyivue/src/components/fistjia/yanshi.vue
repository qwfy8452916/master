<template>
	<div class="afirst">
		1111
		<div class="bfirst" @click="dianji">222</div>
		<div @click="$store.commit('zheng')">变正值</div>
		<div @click="$store.commit('fu')">变负值</div>
		<div>{{$store.state.isRed}}</div>
		<div @click="$store.commit('jia')">{{$store.state.datasj}}</div>
	</div>

</template>

<script>
    import store from '@/store/store'
	import { xx,first } from '@/api/api'

	export default{
		name:'yanshi',
		store,
		data(){
			return {
             
				
			}
		},
		methods:{
          dianji(){
          	console.log('dsad')
          	xx()
          	first()
          }
		}
	}

</script>

<style scoped lang="less">
	.afirst{color: #3a09c4;
		.bfirst{color: #ff5353;}
	}
</style>