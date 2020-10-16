<template>
    <div class="hoteladd">
        <p class="title">查看详情</p>
        <div class="detail">
            <div class="parts">
                <span>顾客ID：</span><span class="content">{{AeecssDetailData.commonId}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>顾客昵称：</span><span class="content">{{AeecssDetailData.nickName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>姓名：</span><span class="content">{{AeecssDetailData.name}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>顾客手机：</span><span class="content">{{AeecssDetailData.phone}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>酒店名称：</span><span class="content">{{AeecssDetailData.hotelName}}</span>
            </div>
            <el-divider></el-divider>
        </div>
        <p class="title">访问记录</p>
        <div class="detail">
            <div class="parts">
                <span>打开方式：</span>
                <span class="content" v-if="AeecssDetailData.openWay == 1">扫码进入</span>
                <span class="content" v-if="AeecssDetailData.openWay == 2">分享进入</span>
                <span class="content" v-if="AeecssDetailData.openWay == 3">直接打开</span>
                <span class="content" v-if="AeecssDetailData.openWay == 4">外部链接跳转</span>
                <span class="content" v-if="AeecssDetailData.openWay == 5">访问足迹</span>
            </div>
            <el-divider></el-divider>
            <div v-if="AeecssDetailData.openWay == 1">
                <div class="parts">
                    <span>楼层房间号：</span><span class="content">{{AeecssDetailData.cabFloorRoom}}</span>
                </div>
                <el-divider></el-divider>
            </div>
            <div v-if="AeecssDetailData.openWay == 2">
                <div class="parts">
                    <span>分享人ID：</span><span class="content">{{AeecssDetailData.sharerId}}</span>
                </div>
                <el-divider></el-divider>
                <div class="parts">
                    <span>分享人昵称：</span><span class="content">{{AeecssDetailData.sharerNickName}}</span>
                </div>
                <el-divider></el-divider>
            </div>
            <div v-if="AeecssDetailData.openWay == 3 || AeecssDetailData.openWay == 5">
                <div class="parts">
                    <span>原打开方式：</span>
                    <span class="content" v-if="AeecssDetailData.lastedopenWay == 1">扫码进入</span>
                    <span class="content" v-if="AeecssDetailData.lastedopenWay == 2">分享进入</span>
                    <span class="content" v-if="AeecssDetailData.lastedopenWay == 3">直接打开</span>
                    <span class="content" v-if="AeecssDetailData.lastedopenWay == 4">外部链接跳转</span>
                    <span class="content" v-if="AeecssDetailData.lastedopenWay == 5">访问足迹</span>
                </div>
                <el-divider></el-divider>
                <div class="parts">
                    <span>楼层房间号：</span><span class="content">{{AeecssDetailData.cabFloorRoom}}</span>
                </div>
                <el-divider></el-divider>
            </div>
            <div class="parts">
                <span>访问时间：</span><span class="content">{{AeecssDetailData.createdAt}}</span>
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
    name: 'LonganCustomerAccessDetail',
    data(){
        return{
            detailId: '',
            AeecssDetailData: ''
        }
    },
    created() {
        this.detailId=this.$route.query.id;
        this.GetAeecssDetaildata()
    },
    methods: {
        cancelbtn(){//返回
            this.$router.push({name:'LonganCustomerAccess'})
        },
        GetAeecssDetaildata(){//获取访问记录详情数据
            let that = this;
            that.$api.getCustomerAccessDetail(that.detailId).then(response => {
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