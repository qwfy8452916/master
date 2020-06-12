<template>
    <div class="menbercarddetail">
        <p class="title">查看详情</p>
        <table cellpadding="0" cellspacing="0" class="membercardTable">
            <tr>
                <td class="subTitle">状态</td>
                <td class="subcont">
                    <span v-if="MembercardDataDetail.cardStatus == 0">未分发</span>
                    <span v-else-if="MembercardDataDetail.cardStatus == 1">未绑定</span>
                    <span v-else-if="MembercardDataDetail.cardStatus == 2">已绑定</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">类型</td>
                <td class="subcont">
                    <span v-if="MembercardDataDetail.type == 0">后台生成</span>
                    <span v-else-if="MembercardDataDetail.type == 1">会员分享</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">会员卡卡号</td>
                <td class="subcont">{{MembercardDataDetail.cardCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">会员卡姓名</td>
                <td class="subcont">{{MembercardDataDetail.name}}</td>
            </tr>
            <tr>
                <td class="subTitle">金额(元)</td>
                <td class="subcont">{{MembercardDataDetail.amount}}</td>
            </tr>
            <tr>
                <td class="subTitle">有效期</td>
                <td class="subcont">{{MembercardDataDetail.validDate}}</td>
            </tr>
            <tr>
                <td class="subTitle">会员期限</td>
                <td class="subcont">{{MembercardDataDetail.membershipPeriod}}</td>
            </tr>
            <tr>
                <td class="subTitle">创建人</td>
                <td class="subcont">{{MembercardDataDetail.createdByName}}</td>
            </tr>
            <tr>
                <td class="subTitle">创建时间</td>
                <td class="subcont">{{MembercardDataDetail.createdAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">会员姓名</td>
                <td class="subcont">{{MembercardDataDetail.memberShipName}}</td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{MembercardDataDetail.memberShipPhone}}</td>
            </tr>
            <tr>
                <td class="subTitle">分发人</td>
                <td class="subcont">{{MembercardDataDetail.distributePerson}}</td>
            </tr>
            <tr>
                <td class="subTitle">分发时间</td>
                <td class="subcont">{{MembercardDataDetail.distributeTime}}</td>
            </tr>
        </table>
        <div style="width:100%;float:left;"><el-button type="primary" @click="resetForm">返回</el-button></div>
    </div>
</template>

<script>
export default {
    name: 'TeashopMembercardDetail',
    data(){
        return {
            tmId: '',
            MembercardDataDetail: {}
        }
    },
    mounted(){
        this.tmId = this.$route.query.id;
        this.memberCardDetail();
    },
    methods: {
        //获取会员卡信息
        memberCardDetail(){
            const params = {};
            const id = this.tmId;
            this.$api.memberCardDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.MembercardDataDetail = result.data;
                        this.MembercardDataDetail.validDate = result.data.validStartDate + ' 至 ' + result.data.validEndDate
                    }else{
                        this.$message.error('会员卡信息获取失败！');
                        this.isSubmit = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //返回
        resetForm(){
            this.$router.push({name: 'TeashopMembercardList'});
        },
    },
}
</script>

<style lang="less" scoped>
.menbercarddetail{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .membercardTable{
        font-size: 14px;
        border-top: 1px solid #eee;
        border-left: 1px solid #eee;
        margin-right: 80px;
        margin-bottom: 30px;
        float: left;
        td{
            height: 30px;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            padding: 0px 10px;
        }
        .subTitle{
            width: 100px;
            text-align: right;
            color: #909399;
        }
        .subcont{
            width: 240px;
        }
    }
}
</style>
