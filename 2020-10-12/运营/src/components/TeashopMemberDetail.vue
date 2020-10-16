<template>
    <div class="menberdetail">
        <p class="title">查看详情</p>
        <table cellpadding="0" cellspacing="0" class="memberTable">
            <tr>
                <td class="subTitle">用户ID</td>
                <td class="subcont">{{MemberDataDetail.id}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户昵称</td>
                <td class="subcont">{{MemberDataDetail.nickName}}</td>
            </tr>
            <tr>
                <td class="subTitle">会员姓名</td>
                <td class="subcont">{{MemberDataDetail.membershipName}}</td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{MemberDataDetail.membershipPhone}}</td>
            </tr>
            <tr>
                <td class="subTitle">绑定时间</td>
                <td class="subcont">{{MemberDataDetail.bindTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">过期时间</td>
                <td class="subcont">{{MemberDataDetail.deadlineDate}}</td>
            </tr>
            <tr>
                <td class="subTitle">账户余额(元)</td>
                <td class="subcont">{{MemberDataDetail.balance}}</td>
            </tr>
        </table>
        <div style="width:100%;float:left;"><el-button type="primary" @click="resetForm">返回</el-button></div>
    </div>
</template>

<script>
export default {
    name: 'TeashopMemberDetail',
    data(){
        return {
            tmId: '',
            MemberDataDetail: {}
        }
    },
    mounted(){
        this.tmId = this.$route.query.id;
        this.memberDetail();
    },
    methods: {
        //获取会员信息
        memberDetail(){
            const params = {};
            const id = this.tmId;
            this.$api.memberDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.MemberDataDetail = result.data;
                    }else{
                        this.$message.error('会员信息获取失败！');
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
            this.$router.push({name: 'TeashopMemberManage'});
        },
    },
}
</script>

<style lang="less" scoped>
.menberdetail{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .memberTable{
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
