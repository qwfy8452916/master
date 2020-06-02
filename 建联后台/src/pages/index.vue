<template>
    <el-container>
        <el-aside width="250px">
            <aside-menu/>
        </el-aside>
        <el-container>
            <el-header>
                <zn-header></zn-header>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import AsideMenu from '../components/public/SideBarMenu'
import ZnHeader from '../components/public/ZnHeader'
export default {
    components:{
        AsideMenu,
        ZnHeader
    }

}
</script>

<style>
.el-table th{
    color: #fff !important;
    background: #409EFF !important;
    border: 0px !important;
}
</style>
