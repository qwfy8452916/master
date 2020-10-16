<template>
    <div class="HotelWithdrawalsRecordDetail">
        <ul class="HotelDivideIntoul">
            <li>
                <span>状态</span>
                <span v-if="HotelWithdrawalsRecordDetails.withdrawalStatus == 3">待处理</span>
                <span v-else-if="HotelWithdrawalsRecordDetails.withdrawalStatus == 1">转账成功</span>
                <span v-else-if="HotelWithdrawalsRecordDetails.withdrawalStatus == 2">转账失败</span>
            </li>
            <li>
                <span>申请时间</span><span>{{HotelWithdrawalsRecordDetails.hotelWithdrawalTime}}</span>
            </li>
            <li>
                <span>提现金额</span><span>{{HotelWithdrawalsRecordDetails.hotelWithdrawalAmount}}</span>
            </li>
            <li>
                <span>提现人</span><span>{{HotelWithdrawalsRecordDetails.hotelWithdrawalName}}</span>
            </li>
            <li>
                <span>开户银行</span><span>{{HotelWithdrawalsRecordDetails.hotelBank}}</span>
            </li>
            <li>
                <span>账户名称</span><span>{{HotelWithdrawalsRecordDetails.hotelAccountName}}</span>
            </li>
            <li>
                <span>账号</span><span>{{HotelWithdrawalsRecordDetails.hotelAccount}}</span>
            </li>
            <li>
                <span>转账时间</span><span>{{HotelWithdrawalsRecordDetails.porDisposeTime}}</span>
            </li>
            <li>
                <span>转账凭证</span><span><a :href="HotelWithdrawalsRecordDetails.porDisposeUrl" target="_blank">{{HotelWithdrawalsRecordDetails.porDisposeUrl}}</a></span>
            </li>
            <li>
                <span>转账说明</span><span>{{HotelWithdrawalsRecordDetails.porDisposeRemark}}</span>
            </li>
            <li>
                <span>处理人</span><span>{{HotelWithdrawalsRecordDetails.porDisposeName}}</span>
            </li>
            <li>
                <span>处理时间</span><span>{{HotelWithdrawalsRecordDetails.porTransferTime}}</span>
            </li>
        </ul>
        <div class="btnbox">
            <el-button type="primary" @click="backbfun">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotelWithdrawalsRecordDetail',
    data(){
        return{
            HotelWithdrawalsRecordDetails: {},
            id: ''
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        this.HotelWithdrawalsRecordDetail();
    },
    methods: {
        //酒店提现详情
        HotelWithdrawalsRecordDetail(){
            this.$api.HotelWithdrawalsRecordDetail(this.id).then(response=>{
                if(response.data.code==0){
                    this.HotelWithdrawalsRecordDetails = response.data.data;
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },
        //返回
        backbfun(){
            this.$router.push({name: 'HotelWithdrawalsRecord'});
        }
    }
}
</script>

<style lang="less" scoped>
    .HotelDivideIntoul{
        width: 500px;
        border: 1px solid #ccc;
        padding: 0;
        margin-bottom: 20px;
    }
    .HotelDivideIntoul li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
    }
    .HotelDivideIntoul li:last-child{
        border-bottom: none;
    }
    .HotelDivideIntoul li span{
        width: 70%;
        font-size: 16px;
        color: #333;
        text-align: left;
        padding-left: 5px;
    }
    .HotelDivideIntoul li span:first-child{
        display: block;
        line-height: 60px;
        border-right: 1px solid #ccc;
        text-align: right;
        padding-right: 10px;
        width: 20%;
    }
    .HotelDivideIntoul li span:last-child{
        display: flex;
        height: 60px;
        align-items: center;
    }
    .btnbox{
        text-align: left;
    }
</style>