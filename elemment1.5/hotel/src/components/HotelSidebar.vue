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
            <el-submenu index="7">
                <template slot="title">
                    <i class="el-icon-thirdchengshi"></i>
                    <span>酒店</span>
                </template>
                <el-menu-item index="7-1" @click="sidebarLink('7-1')">信息维护</el-menu-item>
            </el-submenu>
            <el-submenu index="9">
                <template slot="title">
                    <i class="el-icon-thirdfanshe"></i>
                    <span>客房服务</span>
                </template>
                <el-menu-item index="9-1" @click="sidebarLink('9-1')">酒店服务</el-menu-item>
                <el-menu-item index="9-2" @click="sidebarLink('9-2')">查看酒店客服服务记录</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-thirdhuowudui1"></i>
                    <span>库存</span>
                </template>
                <el-menu-item index="2-1" @click="sidebarLink('2-1')">库存管理</el-menu-item>
                <el-menu-item index="2-2" @click="sidebarLink('2-2')">入库单管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-thirdget"></i>
                    <span>补货</span>
                </template>
                <el-menu-item index="3-1" @click="sidebarLink('3-1')">补货管理</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-thirdshujukanban"></i>
                    <span>财务管理</span>
                </template>
                <el-menu-item index="4-1" @click="sidebarLink('4-1')">营收统计</el-menu-item>
                <el-menu-item index="4-2" @click="sidebarLink('4-2')">酒店分成</el-menu-item>
                <el-menu-item index="4-3" @click="sidebarLink('4-3')">提现记录</el-menu-item>
                <el-menu-item index="4-4" @click="sidebarLink('4-4')">补货费记录</el-menu-item>
                <el-menu-item index="4-5" @click="sidebarLink('4-5')">补货费提现记录</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-thirdyuanquyunwei"></i>
                    <span>故障管理</span>
                </template>
                <el-menu-item index="5-1" @click="sidebarLink('5-1')">故障管理</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <i class="el-icon-thirdicon_shiyongwendang"></i>
                    <span>采购单管理</span>
                </template>
                <el-menu-item index="6-1" @click="sidebarLink('6-1')">采购单列表</el-menu-item>
            </el-submenu>
            <el-submenu index="8">
                <template slot="title">
                    <i class="el-icon-thirdbiaodanzujian-biaoge1"></i>
                    <span>柜子管理</span>
                </template>
                <el-menu-item index="8-1" @click="sidebarLink('8-1')">柜子列表</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'HotelSideBar',
    data() {
        return{
        }
    },
    methods: {
        sidebarLink(index){
            if(index == '1-1'){
                this.$router.push({name: 'HotelPrivilegeUserList'});
            }else if(index == '1-2'){
                this.$router.push({name: 'HotelPrivilegeRoleList'});
            }else if(index == '2-1'){
                this.$router.push({name: 'HotelInventoryList'});
            }else if(index == '2-2'){
                this.$router.push({name: 'HotelGodownEntryList'});
            }else if(index == '3-1'){
                this.$router.push({name: 'HotelReplenishList'});
            }else if(index == '4-1'){
                this.$router.push({name: 'HotelRevenueStatistics'});
            }else if(index == '4-2'){
                this.$router.push({name: 'HotelDivideInto'});
            }else if(index == '4-3'){
                this.$router.push({name: 'HotelWithdrawalsRecord'});
            }else if(index == '4-4'){
                this.$router.push({name: 'HotelReplenishmentFeeList'});
            }else if(index == '4-5'){
                this.$router.push({name: 'HotelReplenishmentFeeRecordList'});
            }else if(index == '5-1'){
                this.$router.push({name: 'HotelFaultManagement'});
            }else if(index == '6-1'){
                this.$router.push({name: 'HotelPurchaseOrderlist'});
            }else if(index == '7-1'){
                this.$router.push({name: 'HotelInformationModify'});
            }else if(index == '8-1'){
                this.$router.push({name: 'Cabinetgl'});
            }else if(index == '9-1'){
                this.$router.push({name: 'HotelServiceList'});
            }else if(index == '9-2'){
                this.$router.push({name: 'checkhotelrecord'});
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
    margin-left: -8px;
}
</style>


