<template>
	<div class="afirst">
		<div @click="ceshiajax" style="color:blue;">点击输出接口数据</div>
		<div>显示打印的数据~~:<span style="color:#ff5353;">{{ajaxshujv}}</span></div>
		yanshi002222第二个演示
		<div class="bfirst" @click="dianji">222</div>
		<div @click="$store.commit('zheng')">变正值</div>
		<div @click="$store.commit('fu')">变负值</div>
		<div>{{$store.state.isRed}}</div>
		<div @click="$store.commit('jia')">{{$store.state.datasj}}</div>

		<el-row>
		 <el-button type="primary">主要按钮</el-button>
		</el-row>
         <div>{{$store.state.hello}}</div>
         <div>{{$store.state.zjdata}}</div>
         <zujian01></zujian01>
   

	</div>
    
</template>


<script>
    import store from '@/store/store'
    import { xx,first,ceshiajax} from '@/api/api'
    // import tongxin from '@/components/zujiantongxin2/zujiandata'
    
    // import zujian01 from '@/components/layer/zujian/zujian01'

	export default{
		name:'yanshi02',
		store,
        // tongxin,
		data(){
			return {
             ajaxshujv:"默认数据",
				
			}
        },
        // components: {zujian01},
        components: {
            zujian01:require('@/components/layer/zujian/zujian01').default
        },
		methods:{
          dianji(){
          	console.log('dsad')
          	xx()
          	first()
		  },
		   ceshiajax(){
			 var nowvariable=456,
				 nowvariable='调用的接口函数在组件中定义变量';
				 ceshiajax({
					 
				 }).then(res=>{
					 this.$message({
						type: 'success',
						message: '添加成功!'
					})
					 this.ajaxshujv=res.data.error_msg
					 console.log(res)
				 })
		  },
		}
	}

</script>

<style scoped lang="less">
	.afirst{color: #3a09c4;
		.bfirst{color: #ff5353;}
	}
</style>