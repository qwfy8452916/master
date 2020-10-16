<template>
    <div class="hoteladd">
        <p class="title">查看详情</p>
        <el-divider></el-divider>

        <div class="title2">员工信息</div>
        <div class="detail">
            <div class="parts">
                <span>员工ID：</span><span class="content">{{AeecssDetailData.empId}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>组织：</span><span class="content">{{AeecssDetailData.orgName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>账户：</span><span class="content">{{AeecssDetailData.account}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>工号：</span><span class="content">{{AeecssDetailData.empNo}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>姓名：</span><span class="content">{{AeecssDetailData.empName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>手机号：</span><span class="content">{{AeecssDetailData.empPhone}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>邮箱：</span><span class="content">{{AeecssDetailData.email}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>添加时间：</span><span class="content">{{AeecssDetailData.createTime}}</span>
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
                <span>待入账总额：</span><span class="content">{{AeecssDetailData.pendingIncomeAmount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>提现总额：</span><span class="content">{{AeecssDetailData.withdraw}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>账户余额：</span><span class="content">{{AeecssDetailData.balance}}</span>
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
                <span>订单数量：</span><span class="content">{{AeecssDetailData.orderCount}}</span>
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
    name: 'LonganStaffManageDetail',
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
            this.$router.push({name:'LonganStaffManage'})
        },
        Get_StaffManageDetail(){//获取访问记录详情数据
            let that = this;
            that.$api.getStaffManageDetail(that.detailId).then(response => {
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