<template>
    <div class="hoteladd">
        <p class="title">顾客详情</p>
        <el-divider></el-divider>

        <div class="title2">顾客信息</div>
        <div class="detail">
            <div class="parts">
                <span>顾客ID：</span><span class="content">{{AeecssDetailData.commonId}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>昵称：</span><span class="content">{{AeecssDetailData.nickName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>手机号：</span><span class="content">{{AeecssDetailData.mobile}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>酒店名称：</span><span class="content">{{AeecssDetailData.hotelName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>是否会员：</span>
                <span class="content" v-if="AeecssDetailData.memberLevel == -1">是</span>
                <span class="content" v-if="AeecssDetailData.memberLevel == 0">否</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>分销级别：</span>
                <span class="content" v-if="AeecssDetailData.shareLevel == -1">未参与</span>
                <span class="content" v-if="AeecssDetailData.shareLevel == 0">分销推广员</span>
                <span class="content" v-if="AeecssDetailData.shareLevel == 1">分销管理员</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>首次访问时间：</span><span class="content">{{AeecssDetailData.firstVisitTimeStr}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>最后登录时间：</span><span class="content">{{AeecssDetailData.lastVisitTimeStr}}</span>
            </div>
            <el-divider></el-divider>
        </div>

        <div class="title2">账户信息</div>
        <div class="detail">
            <div class="parts">
                <span>收入总额：</span><span class="content">{{AeecssDetailData.incomeAmount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>待入账总额：</span><span class="content">{{AeecssDetailData.pendingAmount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>提现总额：</span><span class="content">{{AeecssDetailData.withdrawAmount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>账户余额：</span><span class="content">{{AeecssDetailData.balanceAmount}}</span>
            </div>
            <el-divider></el-divider>
        </div>

        <div class="title2">分销信息</div>
        <div class="detail">
            <div class="parts">
                <span>分销级别：</span>
                <span class="content" v-if="AeecssDetailData.shareLevel == -1">未参与</span>
                <span class="content" v-if="AeecssDetailData.shareLevel == 0">分销推广员</span>
                <span class="content" v-if="AeecssDetailData.shareLevel == 1">分销管理员</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>分享次数：</span><span class="content">{{AeecssDetailData.shareAmount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>分享访问次数：</span><span class="content">{{AeecssDetailData.shareVisitAmount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>订单数量：</span><span class="content">{{AeecssDetailData.orderAmount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>售出商品数量：</span><span class="content">{{AeecssDetailData.prodSaleCount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>订单金额：</span><span class="content">{{AeecssDetailData.orderAmount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>分享奖励：</span><span class="content">{{AeecssDetailData.shareBonus}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>管理奖励：</span><span class="content">{{AeecssDetailData.shareManageBonus}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>下级数量：</span><span class="content">{{AeecssDetailData.subordinateAmount}}</span>
            </div>
            <el-divider></el-divider>
        </div>
        <el-row>
            <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">返回</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'LonganCustomerManageDetail',
    data(){
        return{
            detailId: '',
            AeecssDetailData: ''
        }
    },
    created() {
        this.detailId=this.$route.query.id;
        this.Get_StaffManageDetail()
    },
    methods: {
        cancelbtn(){//返回
            this.$router.push({name:'LonganCustomerManage'})
        },
        Get_StaffManageDetail(){//获取访问记录详情数据
            let that = this;
            that.$api.customerDetail(that.detailId).then(response => {
                const result = response.data;
                if(result.code == '0'){
                    that.AeecssDetailData = result.data;
                }else{
                    that.$message.error(result.msg);
                }
            })
            .catch(error => {
                that.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
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
        .title2{
            font-size: 16px;
            color: #ccc;
            margin-bottom: 15px;
        }
        .detail{
            width: 30%;
            margin-left: 20px;
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