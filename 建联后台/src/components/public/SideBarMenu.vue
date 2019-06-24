<template>
	<el-menu default-active="/branch/demandList" background-color="#545c64"
      text-color="#fff"
      active-text-color="#409EFF" class="el-menu-vertical-demo" route=true @select="handleSelect">

		<div class="zn-userhead">
		    分公司
		</div>
		<el-menu-item index="/branch/demandList">
			<span slot="title">联采需求列表</span>
		</el-menu-item>
		<el-menu-item index="2">
			<span slot="title">联采订单列表</span>
		</el-menu-item>
		<el-menu-item index="3">
			<span slot="title">供货单列表</span>
		</el-menu-item>
		<el-menu-item index="4">
			<span slot="title">结算单列表</span>
		</el-menu-item>
		<el-menu-item index="5">
			<span slot="title">付款单列表</span>
		</el-menu-item>
    </el-menu>
</template>

<script>
	export default{
		name: 'sideBarMenu',
		props: {
			sideBarMenuList: Array
		},
		data(){
			return{
				currentIndex: '',
				userDataName:"",
			}
		},
		created(){
			this.currentIndex = this.$route.meta.indexN;
			this.userDataName = this.$cookies.get('userDataName');
			this.userDataSrc = this.$cookies.get('userDataSrc');
		},
		methods: {
			//点击logo跳到首页
			logoToMain(){
			    window.location.href = 'http://www.zhuniu.com';
			},
			//跳转
			href(tag){
				let that=this;
				that.$store.state.routeList.forEach(function(item, index){
					if(tag == item.tag && item.route){
						that.$router.push({path: item.route})
						return false
					}
				})
			},
			handleSelect(key, keyPath){
				this.$router.push({path: key})
			}
		}
	}
</script>

<style lang="less" scoped>
	.zn-userhead{
	    height: 100px;
	    padding-left: 100px;
	    padding-top: 30px;
	    padding-right: 30px;
	    box-sizing: border-box;
	    letter-spacing: 1px;
	    color: #fff;
	    background-repeat:no-repeat;
	    background-size: 65px 65px;
	    background-position: 25px 20px;
		cursor: pointer;
	}
</style>