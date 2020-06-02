<template>
<el-scrollbar style="height:100%;">
  <el-menu
    default-active="/branch/demandList"
    background-color="#1B1D2A"
    text-color="#fff"
    active-text-color="#409EFF"
    class="el-menu-vertical-demo"
    :style="style"
    route="true"
    @select="handleSelect"
  >
    <div class="zn-userhead" v-if="authzData['M:CM_BDEMAND_BDEMAND'] || authzData['M:CM_BORDER_BORDER']">
      <img src="../../assets/img/branch.png" alt="">
      分公司操作平台
      </div>
    <el-menu-item index="/branch/branchstaging"  v-if="authzData['M:BJ_BRANCHSTAGE_BRANCHSTAGE']">
      <span slot="title">分公司工作台</span>
    </el-menu-item>
    <el-menu-item index="/branch/demandList"  v-if="authzData['M:CM_BDEMAND_BDEMAND']">
      <span slot="title">分公司联采需求列表</span>
    </el-menu-item>
    <el-menu-item index="/branch/Purorderlist" v-if="authzData['M:CM_BORDER_BORDER']">
      <span slot="title">联采订单列表</span>
    </el-menu-item>
    <div class="zn-userhead" v-if="authzData['M:CM_DEMAND_DEMAND'] || authzData['M:CM_ORDER_ORDER']">
      <img src="../../assets/img/group.png" alt="">
      集团操作平台
      </div>
    <el-menu-item index="/group/groupstaging" v-if="authzData['M:BJ_GROUPSTAGE_GROUPSTAGE']">
      <span slot="title">集团工作台</span>
    </el-menu-item>
    <el-menu-item index="/group/demandList" v-if="authzData['M:CM_DEMAND_DEMAND']">
      <span slot="title">集团联采需求列表</span>
    </el-menu-item>
    <el-menu-item index="/group/Purorderlist" v-if="authzData['M:CM_ORDER_ORDER']">
      <span slot="title">联采订单列表</span>
    </el-menu-item>
    <!-- <el-menu-item index="/branch/Delivlist">
			<span slot="title">供货单列表</span>
		</el-menu-item>
		<el-menu-item index="4">
			<span slot="title">结算单列表</span>
		</el-menu-item>
		<el-menu-item index="5">
			<span slot="title">付款单列表</span>
    </el-menu-item>-->
    <div class="zn-userhead">
      <img src="../../assets/img/user.png" alt="">
      用户信息管理
      </div>
    <!-- <el-menu-item index="/user/department">
      <span slot="title">部门管理</span>
    </el-menu-item>
    <el-menu-item index="/user/userManager">
      <span slot="title">用户管理</span>
    </el-menu-item> -->
    <!-- <el-menu-item index="/user/userRole">
      <span slot="title">权限管理</span>
    </el-menu-item> -->
     <el-menu-item index="/user/userRole" v-if="authzData['M:BJ_AUTHZ_AUTHZ']">
      <span slot="title">权限管理</span>
    </el-menu-item>
    <el-menu-item index="/user/department" v-if="authzData['M:BJ_USERDEPART_USERDEPART']">
      <span slot="title">部门管理</span>
    </el-menu-item>
    <el-menu-item index="/user/userManager" v-if="authzData['M:BJ_USER_USER']">
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/user/changePwd" v-if="authzData['M:BJ_USER_USER']">
      <span slot="title">修改密码</span>
    </el-menu-item>  
    <div class="zn-userhead" v-if="authzData['M:CM_SETSTYLE_SETSTYLE']">
      <img src="../../assets/img/settle.png" alt="">
      结算方式管理
      </div>
    <el-menu-item index="/basic/payment" v-if="authzData['M:CM_SETSTYLE_SETSTYLE']">
      <span slot="title">结算方式</span>
    </el-menu-item>
    <el-menu-item index="/group/infomanage" v-if="authzData['M:CM_INFOMANAGE_INFOMANAGE']">
      <span slot="title">消息管理</span>
    </el-menu-item>
    <el-menu-item index="/branch/infocenter" v-if="authzData['M:CM_INFOCEBTER_INFOCENTER']">
      <span slot="title">消息中心</span>
    </el-menu-item>
    <el-menu-item index="/group/datacenter" v-if="authzData['M:CM_DATACENTER_DATACENTER']">
      <span slot="title">数据中心</span>
    </el-menu-item>
    <a href="ftp://res.zhuniu.com/App_package/jiangjian.apk" style="text-align:left;display:block;padding-left:40px"><span slot="title">江建联采客户端下载</span></a>
  
  </el-menu>
</el-scrollbar>
</template>

<script>
export default {
  name: "sideBarMenu",
  props: {
    sideBarMenuList: Array
  },
  data() {
    return {
      style:{height:'auto'},
      currentIndex: "",
      userDataName: "",
      authzData:{},
      showcircle:true
          
    };
  },
  created() {
    this.authzData = this.$store.state.authData;
    // this.currentIndex = this.$route.meta.indexN;
    // this.userDataName = this.$cookies.get("userDataName");
    // this.userDataSrc = this.$cookies.get("userDataSrc");
  },
  mounted(){
    let height = window.screen.availHeight;
    this.style.height = height - 70 + 'px';
  },
  methods: {
    //点击logo跳到首页
    logoToMain() {
      window.location.href = "http://www.zhuniu.com";
    },
    //跳转
    href(tag) {
      let that = this;
      that.$store.state.routeList.forEach(function(item, index) {
        if (tag == item.tag && item.route) {
          that.$router.push({ path: item.route });
          that.showcircle = true;
          return false;
        }
      });
    },
    handleSelect(key, keyPath) {
      this.$router.push({ path: key });
    }
  }
};
</script>

<style lang="less" scoped>
.zn-userhead {
  display: flex;
  align-items: center;
  height: 42px;
  padding-left: 16px;
  // padding-right: 30px;
  box-sizing: border-box;
  letter-spacing: 1px;
  color: #fff;
  background-repeat: no-repeat;
  background-size: 65px 65px;
  background-position: 25px 20px;
  cursor: pointer;
  text-align: left;
  background-color: #343644;
  font-size: 16px;
  img{
    margin-right: 10px;
    width: 18px;
    height: 19px;
  }
}
.blue{
    height: 10px;
    width: 10px;
    background-color: #0066CC;
    border-radius: 50%;
    top: 20px;
    position: absolute;
    left: 40px;
}

</style>