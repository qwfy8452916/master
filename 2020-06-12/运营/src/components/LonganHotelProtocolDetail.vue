<template>
    <div class="protocoldetail">
        <p class="title">查看详情</p>
        <el-form :model="ProtocolDataDetail" label-width="140px" class="protocolform">
            <el-form-item label="分成协议名称" prop="allocName">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.allocName"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="allocType">
                <el-radio-group :disabled="true" v-model="ProtocolDataDetail.allocType">
                    <el-radio :label="0">按利润计算</el-radio>
                    <el-radio :label="1">按销售额计算</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="isShowComm" label="佣金比例" prop="commissionRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.commissionRate"></el-input> %
            </el-form-item>
            <el-form-item label="酒店比例" prop="hotelRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.hotelRate"></el-input> %
            </el-form-item>
            <el-form-item label="合伙人比例" prop="partnerRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.partnerRate"></el-input> %
            </el-form-item>
            <el-form-item label="加盟商比例" prop="contributorRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.contributorRate"></el-input> %
            </el-form-item>
            <el-form-item label="城市运营商比例" prop="cityOprRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.cityOprRate"></el-input> %
            </el-form-item>
            <el-form-item label="住橙比例" prop="zcRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.zcRate"></el-input> %
            </el-form-item>
            <!-- <el-form-item label="押金型加盟商比例" prop="depositContributorRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.depositContributorRate"></el-input> %
            </el-form-item>
            <el-form-item label="投资型加盟商比例" prop="investContributorRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.investContributorRate"></el-input> %
            </el-form-item>
            <el-form-item label="押金型城市运营商比例" prop="depositCityOprRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.depositCityOprRate"></el-input> %
            </el-form-item>
            <el-form-item label="投资型城市运营商比例" prop="investCityOprRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.investCityOprRate"></el-input> %
            </el-form-item>
            <el-form-item label="住橙比例(押金型)" prop="depositZcRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.depositZcRate"></el-input> %
            </el-form-item>
            <el-form-item label="住橙比例(投资型)" prop="investZcRate">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.investZcRate"></el-input> %
            </el-form-item> -->

            <!-- <el-form-item>
                <span slot="label"><label class="titlebar">额外扣除&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="分享奖励来源" prop="shareRewardFrom">
                <el-select :disabled="true" v-model="ProtocolDataDetail.shareRewardFrom" placeholder="请选择">
                    <el-option 
                        v-for="item in shareRewardList" 
                        :key="item.id" 
                        :label="item.shareRewardName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分享奖励类型" prop="shareRewardType">
                <el-radio-group :disabled="true" v-model="ProtocolDataDetail.shareRewardType">
                    <el-radio :label="0">比例</el-radio>
                    <el-radio :label="1">金额/件商品</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="ProtocolDataDetail.shareRewardType == 0 || ProtocolDataDetail.shareRewardType == 1" label="分享奖励（员工）" prop="empShareReward">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.empShareReward" maxlength="6"></el-input> {{ProtocolDataDetail.shareRewardType == 0? '%':'元'}}
            </el-form-item>
            <el-form-item v-if="ProtocolDataDetail.shareRewardType == 0 || ProtocolDataDetail.shareRewardType == 1" label="分享奖励（顾客）" prop="cusShareReward">
                <el-input :disabled="true" v-model.trim="ProtocolDataDetail.cusShareReward" maxlength="6"></el-input> {{ProtocolDataDetail.shareRewardType == 0? '%':'元'}}
            </el-form-item> -->
            <el-form-item>
                <el-button @click="resetForm">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelProtocolDetail',
    data(){
        var rateReg = /^\d+(\.\d+)?$/
        var validateRate = (rule,value,callback) => {
            if(!rateReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            hpId: '',
            isShowComm: false,
            shareRewardList: [],
            ProtocolDataDetail: {}
        }
    },
    mounted(){
        this.hpId = this.$route.query.id;
        // this.getShareRewardList();
        this.hotelProtocolDetail();
    },
    methods: {
        //获取分享奖励来源列表
        getShareRewardList(){
            const params = {
                key: 'SHARE_REWARD_FROM',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.shareRewardList = result.data.map(item => {
                            return{
                                id: item.dictValue,
                                shareRewardName: item.dictName
                            }
                        })
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //获取分成协议详情
        hotelProtocolDetail(){
            const params = {};
            const id = this.hpId;
            this.$api.hotelProtocolDetail(params, id)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.ProtocolDataDetail = result.data;
                        if(result.data.allocType == 0){
                            this.isShowComm = false;
                        }else{
                            this.isShowComm = true;
                        }
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //返回
        resetForm() {
            this.$router.push({name: 'LonganHotelProtocolList'});
        },
    },
}
</script>

<style scoped>
.el-input{
    width: 87%;
}
.el-select{
    width: 87%;
}
</style>

<style lang="less" scoped>
.protocoldetail{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .protocolform{
        width: 45%;
        .titlebar{
            font-weight: bold;
            font-size: 16px;
            color: #444;
        }
        .required-icon{
            color: #ff3030;
        }
    }
}
</style>

