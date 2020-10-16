<template>
    <div class="hoteladd">
        <p class="title">查看详情</p>
        <el-divider></el-divider>
        <div class="detail">
            <div class="parts">
                <span>ID：</span><span class="content">{{redpackDetailData.id}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>订单类型：</span><span class="content">{{redpackDetailData.businessType==1?'购物订单':'订房订单'}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>订单号：</span><span class="content">{{redpackDetailData.businessCode}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>分享人ID：</span><span class="content">{{redpackDetailData.fromCustomId}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>分享人昵称：</span><span class="content">{{redpackDetailData.fromCustomNickName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>分享人手机号：</span><span class="content">{{redpackDetailData.fromCustomMobile}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>分享次数：</span><span class="content">{{redpackDetailData.shareCount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>红包总金额：</span><span class="content">{{redpackDetailData.totalAmount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>红包数量：</span><span class="content">{{redpackDetailData.totalNum}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>已领取数量：</span><span class="content">{{redpackDetailData.receivedNum}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>已领取金额：</span><span class="content">{{redpackDetailData.receviedAmount}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>创建时间：</span><span class="content">{{redpackDetailData.createdAt=='1970-01-01 00:00:00'?'-':redpackDetailData.createdAt}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>截至时间：</span><span class="content">{{redpackDetailData.deadlineAt=='1970-01-01 00:00:00'?'-':redpackDetailData.deadlineAt}}</span>
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
    name: 'HotelRedpackDetail',
    data(){
        return{
            detailId: '',
            redpackDetailData: ''
        }
    },
    created() {
        this.detailId=this.$route.query.id;
        this.getRedpackDetail()
    },
    methods: {
        cancelbtn(){//返回
            this.$router.push({name:'HotelRedPackList'})
        },
        getRedpackDetail(){//获取访问记录详情数据
            let that = this;
            that.$api.selRedpackDetail(that.detailId).then(response => {
                const result = response.data;
                if(result.code == '0'){
                    that.redpackDetailData = result.data;
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