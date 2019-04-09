<template>
    <div class="sidebar">
        <div class="logo">
            <img src="../assets/images/hckj.png" alt="logo" />
        </div>
        <el-menu default-active="1-1" :default-openeds="openeds">
            <el-submenu index="1">
                <template slot="title">
                    <span>用户</span>
                </template>
                <el-menu-item index="1-1" @click="sidebarLink('1-1')">用户管理</el-menu-item>
                <!-- <el-menu-item index="1-2" @click="sidebarLink('1-2')">新增用户</el-menu-item> -->
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <span>酒店</span>
                </template>
                <el-menu-item index="2-1" @click="sidebarLink('2-1')">酒店管理</el-menu-item>
                <el-menu-item index="2-2" @click="sidebarLink('2-2')">商品管理</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <span>库存</span>
                </template>
                <el-menu-item index="6-1" @click="sidebarLink('6-1')">查看库存</el-menu-item>
                <!-- <el-menu-item index="6-2" @click="sidebarLink('6-2')">商品管理</el-menu-item> -->
            </el-submenu>
            <!-- <el-submenu index="3">
                <template slot="title">
                    <span>权限管理</span>
                </template>
                <el-submenu index="3-1">
                    <template slot="title">用户管理</template>
                    <el-menu-item index="3-1-1" @click="sidebarLink('3-1-1')">用户列表</el-menu-item>
                    <el-menu-item index="3-1-2" @click="sidebarLink('3-1-2')">新增用户</el-menu-item>
                </el-submenu>
                <el-submenu index="3-2">
                    <template slot="title">权限管理</template>
                    <el-menu-item index="3-2-1" @click="sidebarLink('3-2-1')">角色列表</el-menu-item>
                    <el-menu-item index="3-2-2" @click="sidebarLink('3-2-2')">新增角色</el-menu-item>
                </el-submenu>
            </el-submenu> -->
                <el-submenu index="4">
                    <template slot="title">
                        <span>柜子管理</span>
                    </template>
                    <el-menu-item index="4-1" @click="sidebarLink('4-1')">柜子列表</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="5-1" @click="sidebarLink('5-1')">商品列表</el-menu-item>
                    <el-menu-item index="5-2" @click="sidebarLink('5-2')">新增商品</el-menu-item>
                </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'LonganSidebar',
    data() {
        return{
            openeds: ['1','2','3','4'],   //菜单默认打开第一个
        }
    },
    methods: {
        sidebarLink(index){
            // console.log(index);
            if(index == '1-1'){
                this.$router.push({name: 'LonganPrivilegeUserList'});
            }else if(index == '1-2'){
                this.$router.push({name: 'PrivilegeUserAdd'});
            }else if(index == '2-1'){
                this.$router.push({name: 'LonganHotelList'});
            }else if(index == '2-2'){
                this.$router.push({name: 'LonganHotelCommodityList'});
            }else if(index == '4-1'){
                this.$router.push({name: 'Cabinetgl'});
            }else if(index == '5-1'){
                this.$router.push({name: 'CommodityList'});
            }else if(index == '5-2'){
                this.$router.push({name: 'CommodityAdd'});
            }
        }
        // handleOpen(key, keyPath) {
        //     console.log(key, keyPath);
        // },
        // handleClose(key, keyPath) {
        //     console.log(key, keyPath);
        // }
    }
}
</script>

<style lang="less" scoped>
.sidebar{
    float: left;
    width: 300px;
    text-align: left;
    // border-right: 1px solid #ccc;
    // min-height: 99vh;
    .logo{
        text-align: center;
        // margin: 10px auto;
        img{
            width: 140px;
            // height: 50px;
            display: inline-block;
        }
    }
}
</style>
