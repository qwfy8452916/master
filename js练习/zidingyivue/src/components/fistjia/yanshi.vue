<template>
    
	<div class="afirst">
		<div @click="zhixing()">打印dagefile缓存vuex数据</div>
		<div>{{$store.getters.requiredata}}<span>{{$store.getters.age}}</span></div>
		<div @click="mockajax">打印mock数据</div>
		<div v-for="item in mockshujv">{{item.pos}}</div>
		<router-link router-link to="/zujiandata">跳转到接口调试页</router-link><br/>
		1111
		<div class="bfirst" @click="dianji">222</div>
		<div @click="$store.commit('zheng')">变正值</div>
		<div @click="$store.commit('fu')">变负值</div>
		<div>{{$store.state.isRed}}</div>
		<div @click="$store.commit('jia')">{{$store.state.datasj}}</div>

		<el-row>
		 <el-button type="primary">主要按钮</el-button>
		</el-row>
	</div>
    
</template>


<script>
    import store from '@/store/store'
	import { xx,first,mockajax} from '@/api/api'


	import indexdata from '@/mock'


	export default{
		name:'yanshi',
		store,
		data(){
			return {
             mockshujv:null,		
			}
		},
		methods:{
          dianji(){
          	console.log('dsad')
          	xx()
          	first()
		  },

		//   请求mock数据
		  mockajax(){
			 var nowvariable=456,
				 nowvariable='调用的mock接口函数在组件中定义变量';
				 mockajax({
					 
				 }).then(res=>{
					 this.$message({
						type: 'success',
						message: '添加成功!'
					})
					this.mockshujv=res.data.data
				 })
		  },
		  zhixing(){
			  this.$store.dispatch('ceshiajax')
		  }
		}
	}

</script>

<style scoped lang="less">
	.afirst{color: #3a09c4;
		.bfirst{color: #ff5353;}
	}
</style>