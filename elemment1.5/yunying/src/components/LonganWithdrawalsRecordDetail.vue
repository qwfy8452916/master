<template>
    <div class="LonganWithdrawalsRecordDetail">
        <ul class="detailul">
            <li>
                <div>状态</div>
                <div v-if="LonganWithdrawalsRecordDetails.withdrawalStatus == 3">待处理</div>
                <div v-else-if="LonganWithdrawalsRecordDetails.withdrawalStatus == 1">转账成功</div>
                <div v-else-if="LonganWithdrawalsRecordDetails.withdrawalStatus == 2">转账失败</div>
            </li>
            <li>
                <div>酒店名称</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelName}}</div>
            </li>
            <li>
                <div>申请时间</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelWithdrawalTime}}</div>
            </li>
            <li>
                <div>提现金额</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelWithdrawalAmount}}</div>
            </li>
            <li>
                <div>提现人</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelWithdrawalName}}</div>
            </li>
            <li>
                <div>开户银行</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelBank}}</div>
            </li>
            <li>
                <div>账户名称</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelAccountName}}</div>
            </li>
            <li>
                <div>账号</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelAccount}}</div>
            </li>
            <li>
                <div>转账时间</div>
                <div>{{LonganWithdrawalsRecordDetails.porDisposeTime}}</div>
            </li>
            <li>
                <div>转账凭证</div>
                <div><a :href="LonganWithdrawalsRecordDetails.porDisposeUrl" target="_blank">{{LonganWithdrawalsRecordDetails.porDisposeUrl}}</a></div>
            </li>
            <li>
                <div>备注</div>
                <div>{{LonganWithdrawalsRecordDetails.porDisposeRemark}}</div>
            </li>
            <li>
                <div>处理人</div>
                <div>{{LonganWithdrawalsRecordDetails.porDisposeName}}</div>
            </li>
            <li>
                <div>处理时间</div>
                <div>{{LonganWithdrawalsRecordDetails.porTransferTime}}</div>
            </li>
        </ul>
        <div class="text-left">
            <el-button type="primary" @click="backbtn">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LonganWithdrawalsRecordDetail',
    data(){
        return{
            LonganWithdrawalsRecordDetails: {},
            id: ''
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        this.LonganWithdrawalsRecordDetail();
    },
    methods: {
        //酒店提现记录详情
        LonganWithdrawalsRecordDetail(){
            this.$api.LonganWithdrawalsRecordDetail(this.id).then(response=>{
                if(response.data.code==0){
                    this.LonganWithdrawalsRecordDetails = response.data.data;
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
        backbtn(){
            this.$router.push({name: 'LonganWithdrawalsRecord'});
        }
    }
}
</script>

<style lang="less" scoped>
.detailul{
    width: 400px;
    border: 1px solid #ccc;
    padding-left: 0;
    margin-bottom: 20px;
}
.detailul li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.detailul li:last-child{
    border-bottom: none;
}
.detailul li div{
    font-size: 14px;
    color: #000;
    height: 60px;
}
.detailul li div:first-child{
    width: 25%;
    text-align: right;
    padding-right: 10px;
    border-right: 1px solid #ccc;
    line-height: 60px;
}
.detailul li div:last-child{
    width: 73%;
    text-align: left;
    padding-left: 10px;
    display: flex;
    align-items: center;
}
.text-left{
    text-align: left;
}
</style>

