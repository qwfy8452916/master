<template>
    <div class="hoteladd">
        <p class="title">社群成员详情</p>
        <div class="detail">
            <p class="title">报名信息</p>
            <el-divider></el-divider>
            <div class="parts">
                <span>参与状态：</span>
                <span class="content" v-if="fillback.status == 0">未参与</span>
                <span class="content" v-if="fillback.status == 1">报名待审核</span>
                <span class="content" v-if="fillback.status == 2">已报名待签到</span>
                <span class="content" v-if="fillback.status == 3">已签到</span>
                <span class="content" v-if="fillback.status == -1">报名驳回</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>酒店名称：</span><span class="content">{{fillback.hotelName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>会议：</span><span class="content">{{fillback.meetingName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>姓名：</span><span class="content">{{fillback.visitorName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>手机号：</span><span class="content">{{fillback.visitorMobile}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>所在单位：</span><span class="content">{{fillback.visitorOrganisation}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>报名备注：</span><span class="content">{{fillback.visitorRemark}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>报名时间：</span><span class="content">{{fillback.enlistTime == '1970-01-01 00:00:00' ? '-':fillback.enlistTime}}</span>
            </div>
            <el-divider></el-divider>
            <p class="title">其他信息</p>
            <div class="parts">
                <span>审核备注：</span><span class="content">{{fillback.auditRemark}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>审核人：</span><span class="content">{{fillback.auditEmpName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>审核时间：</span><span class="content">{{fillback.auditTime == '1970-01-01 00:00:00' ? '-':fillback.auditTime}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>签到时间：</span><span class="content">{{fillback.signTime == '1970-01-01 00:00:00' ? '-':fillback.signTime}}</span>
            </div>
            <el-divider></el-divider>

        </div>
        <el-button @click="cancelDetail">返回</el-button>
    </div>
</template>

<script>
export default {
    name: 'LaunchCabinetAdd',
    data(){
        return{
            fillback:[],
        }
    },
    created() {
        this.fillback = this.$route.query
    },
    methods: {
        //取消
        cancelDetail(){
            this.$router.push({name: 'HotelActivityMeetingRecords'});
        },
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