<template>
    <div class="sidebar">
        <el-menu :unique-opened="true">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-thirdhezuohuobanmiyueguanli"></i>
                    <span>用户</span>
                </template>
                <el-menu-item index="1-1" @click="sidebarLink('1-1')">用户管理</el-menu-item>
                <el-menu-item index="1-2" @click="sidebarLink('1-2')">角色管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-thirdchengshi"></i>
                    <span>酒店</span>
                </template>
                <el-menu-item index="2-1" @click="sidebarLink('2-1')">酒店管理</el-menu-item>
            </el-submenu>
            <el-submenu index="11">
                <template slot="title">
                    <i class="el-icon-thirdfanshe"></i>
                    <span>客房服务</span>
                </template>
                <el-menu-item index="11-1" @click="sidebarLink('11-1')">自有服务</el-menu-item>
                <el-menu-item index="11-2" @click="sidebarLink('11-2')">酒店服务</el-menu-item>
                <el-menu-item index="11-3" @click="sidebarLink('11-3')">查看酒店客服服务记录</el-menu-item>
            </el-submenu>
            <el-submenu index="12">
                <template slot="title">
                    <i class="el-icon-thirdfengche"></i>
                    <span>特色</span>
                </template>
                <el-menu-item index="11-1" @click="sidebarLink('12-1')">通用特色</el-menu-item>
                <el-menu-item index="11-2" @click="sidebarLink('12-2')">酒店特色</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <i class="el-icon-thirdhuowudui1"></i>
                    <span>库存</span>
                </template>
                <el-menu-item index="6-1" @click="sidebarLink('6-1')">库存管理</el-menu-item>
                <el-menu-item index="6-2" @click="sidebarLink('6-2')">入库单管理</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-thirdbiaodanzujian-biaoge1"></i>
                    <span>柜子管理</span>
                </template>
                <el-menu-item index="4-1" @click="sidebarLink('4-1')">柜子列表</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-thirdmoshubang"></i>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="5-1" @click="sidebarLink('5-1')">商品列表</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title">
                    <i class="el-icon-thirdtianshenpi"></i>
                    <span>采购单管理</span>
                </template>
                <el-menu-item index="7-1" @click="sidebarLink('7-1')">采购单列表</el-menu-item>
            </el-submenu>
            <el-submenu index="8">
                <template slot="title">
                    <i class="el-icon-thirdshujukanban"></i>
                    <span>财务管理</span>
                </template>
                <el-menu-item index="8-1" @click="sidebarLink('8-1')">营收统计</el-menu-item>
                <el-menu-item index="8-2" @click="sidebarLink('8-2')">酒店分成</el-menu-item>
                <el-menu-item index="8-3" @click="sidebarLink('8-3')">酒店提现记录</el-menu-item>
                <el-menu-item index="8-4" @click="sidebarLink('8-4')">补货费记录</el-menu-item>
                <el-menu-item index="8-5" @click="sidebarLink('8-5')">补货费提现记录</el-menu-item>
                <el-menu-item index="8-6" @click="sidebarLink('8-6')">设置财务成本</el-menu-item>
            </el-submenu>
            <el-submenu index="9">
                <template slot="title">
                    <i class="el-icon-thirdyunyingguanli"></i>
                    <span>运营分析</span>
                </template>
                <el-menu-item index="9-1" @click="sidebarLink('9-1')">订单统计</el-menu-item>
            </el-submenu>
            <el-submenu index="10">
                <template slot="title">
                    <i class="el-icon-thirdyuanquyunwei"></i>
                    <span>故障管理</span>
                </template>
                <el-menu-item index="10-1" @click="sidebarLink('10-1')">报修单</el-menu-item>
                <el-menu-item index="10-2" @click="sidebarLink('10-2')">柜子异常状态</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'LonganSidebar',
    data() {
        return{
        }
    },
    methods: {
        sidebarLink(index){
            // console.log(index);
            if(index == '1-1'){
                this.$router.push({name: 'LonganPrivilegeUserList'});
            }else if(index == '1-2'){
                this.$router.push({name: 'LonganPrivilegeRoleList'});
            }else if(index == '2-1'){
                this.$router.push({name: 'LonganHotelList'});
            }else if(index == '6-1'){
                this.$router.push({name: 'LonganInventoryList'});
            }else if(index == '6-2'){
                this.$router.push({name: 'LonganGodownEntryList'});
            }else if(index == '4-1'){
                this.$router.push({name: 'Cabinetgl'});
            }else if(index == '5-1'){
                this.$router.push({name: 'CommodityList'});
            }else if(index == '7-1'){
                this.$router.push({name: 'PurchaseOrderlist'});
            }else if(index == '8-1'){
                this.$router.push({name: 'LonganRevenueStatistics'});
            }else if(index == '8-2'){
                this.$router.push({name: 'LonganDivideInto'});
            }else if(index == '8-3'){
                this.$router.push({name: 'LonganWithdrawalsRecord'});
            }else if(index == '8-4'){
                this.$router.push({name: 'LonganReplenishmentFee'});
            }else if(index == '8-5'){
                this.$router.push({name: 'LonganReplenishmentFeeDiscount'});
            }else if(index == '8-6'){
                this.$router.push({name: 'LonganFinancialCost'});
            }else if(index == '9-1'){
                this.$router.push({name: 'LonganOperationAnalysis'});
            }else if(index == '10-1'){
                this.$router.push({name: 'LonganDeclarationForm'});
            }else if(index == '10-2'){
                this.$router.push({name: 'LonganAbnormalStateOfCabinet'});
            }else if(index == '11-1'){
                this.$router.push({name: 'LonganServiceTypeList'});
            }else if(index == '11-2'){
                this.$router.push({name: 'LonganHotelServiceList'});
            }else if(index == '11-3'){
                this.$router.push({name: 'checkhotelrecord'});
            }else if(index == '12-1'){
                this.$router.push({name: 'LonganCommonFeature'});
            }else if(index == '12-2'){
                this.$router.push({name: 'LonganHotelFeature'});
            }
        }
    }
}
</script>

<style>
.el-submenu .el-menu{
    background: rgba(64,158,255,0.1);
}
</style>

<style lang="less" scoped>
.sidebar{
    float: left;
    width: 300px;
    text-align: left;
}
</style>
