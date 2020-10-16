<template>
    <div class="hoteladd">
        <p class="title">社群成员详情</p>
        <div class="detail">
            <el-divider></el-divider>
            <div class="parts">
                <span>顾客ID：</span><span class="content">{{fillback.fatherId}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>顾客昵称：</span><span class="content">{{fillback.fatherName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>顾客手机：</span><span class="content">{{fillback.fatherMobile}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>社群成员ID：</span><span class="content">{{fillback.userId}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>社群成员昵称：</span><span class="content">{{fillback.userNickName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>社群成员手机：</span><span class="content">{{fillback.userMobile}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>加入社群时间：</span><span class="content">{{fillback.createdAt}}</span>
            </div>
            <el-divider></el-divider>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LonganCustomerReDetail',
    data(){
        return{
            fillback:[],
        }
    },
    created() {
        this.fillback = this.$route.query
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped>
    .hoteladd{
        text-align: left;
        .title{
            font-weight: bold;
        }
        .detail{
            width: 30%;
            font-size: 14px;
            .parts{
                .content{
                    color: #999999;
                }
            }
            .el-divider{
                margin: 10px 0;
            }
        }
    }
</style>