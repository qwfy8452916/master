<template>
    <div class="frame">
        <LonganHeader/>
        <div class="content">
            <LonganSidebar @menuStatus="mStatus"/>
            <div class="main" :class="isMenuShow?'menus':'menuh'">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import LonganHeader from '@/components/LonganHeader'
import LonganSidebar from '@/components/LonganSidebar'
export default {
    name: 'HomePage',
    components: {
        LonganHeader,
        LonganSidebar
    },
    data() {
        return{
           isMenuShow: true
        }
    },
    mounted(){
        this.$router.push({name:'index'});
        // this.$router.push({name:'LonganHotelPlatCommodityList'});
    },
    methods: {
        mStatus(data){
            if(data){
                this.isMenuShow = false;
            }else{
                this.isMenuShow = true;
            }
        }
    }
}
</script>

<style>
.searchform{
    background: #f2f2f2;
    padding-top: 20px;
    margin-bottom: 10px;
    text-align: left;
}
.el-form--inline .el-form-item{
    margin-left: 15px;
}
.el-table td,.el-table th{
  padding: 5px 0px !important;
}
.el-table th{
    color: #fff !important;
    background: rgba(64,158,255,0.8) !important;
    border: 0px !important;
}
.el-table .cell{
  padding-top: 5px;
  padding-bottom: 5px;
}
.el-input__inner{
    height: 36px !important;
    line-height: 36px !important;
}
.el-pagination__sizes{
    margin: -5px 10px 0px 0px !important;
}
.el-pagination__jump{
    margin: -5px 0px 0px 24px !important;
}
</style>

<style lang="less">
.menus{
    margin-left: 240px;
}
.menuh{
    margin-left: 65px;
}
.frame{
    padding: 0;
    margin: 0;
    .content{
        // display: flex;
        // height: 100%;
        // overflow: auto;
        padding-top: 70px;
        .main{
            // float: left;
            // width: calc(100% - 60px);
            padding: 20px 30px;
            .addbutton{
                float: left;
                margin: 0px 10px 10px 0px;
                background: #ffa522;
                border: #dda522;
                color: #fff;
            }
            .addbutton:hover{
                background: rgba(255,165,34,0.8);
                border: #dda522;
                color: #fff;
            }
            .inquireReset{
                background: #71a8e0;
                color: #fff;
            }
        }
    }
}
</style>


