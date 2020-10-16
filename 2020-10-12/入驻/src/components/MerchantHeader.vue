<template>
    <div class="merchantheader">
        <div class="loginuser">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='3'><i class="el-icon-thirdicon_zhanghao"></i>个人信息</el-dropdown-item>
                    <el-dropdown-item command='2'><i class="el-icon-thirdtianxie"></i>修改密码</el-dropdown-item>
                    <el-dropdown-item v-if="authzData['M:BM_MER_MERINFO']" command='1'><i class="el-icon-thirdicon_bangzhuwendang"></i>企业信息</el-dropdown-item>
                    <el-dropdown-item command='0'><i class="el-icon-thirdfabu"></i>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="logo" @click="returnIndex">
            <img src="../assets/images/logo.png" alt="logo" />
            <p>管理后台</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MerchantHeader',
    data(){
        return{
            authzData: '',
            // orgId: '',
            userName: '',
            userId: ''
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,1)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        this.userName = localStorage.getItem('userName');
        // this.userId = localStorage.getItem('userId');
        // this.getUserInfo();
    },
    methods:{
        //获取用户信息
        getUserInfo(){
            const params = {};
            const id = this.userId;
            this.$api.personalInfoDetail(params, id)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.userName = result.data.empName;
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
		returnIndex(){
            this.$router.push({name: 'index'});
        },
        handleCommand(command){
            if(command == 0){
                this.logOut();
            }else if(command == 1){
                this.$router.push({name: 'MerchantInformation'});
            }else if(command == 2){
                this.$router.push({name: 'MerchantPrivilegeUpdatePWD'});
            }else if(command == 3){
                this.$router.push({name: 'MerchantPrivilegeUpdateUserInfo'});
            }
        },
        //退出登录
        logOut(){
            // window.location.href = 'http://172.16.200.90/longan/mer/#/login';
            this.$router.push({name: 'login'});
        }
    }
}
</script>

<style scoped>
.el-dropdown{
    color: #fff;
}
.el-dropdown-link {
    font-size: 14px;
    cursor: pointer;
}
.el-icon-arrow-down {
    font-size: 14px;
}
</style>

<style lang="less" scoped>
.merchantheader{
    position: fixed;
    z-index: 1000;
    top: 0px;
    width: calc(100% - 60px);
    height: 69px;
    border-bottom: 1px solid #409eff;
    padding: 0px 30px;
    background: #409eff;
    .loginuser{
        float: right;
        line-height: 29px;
        margin-top: 20px;
    }
    .logo{
        text-align: left;
        float: left;
        cursor: pointer;
        img{
            height: 38px;
            margin-top: 15px;
            float: left;
        }
        p{
            font-size: 22px;
            color: #fff;
            line-height: 32px;
            float: left;
            margin: 18px 0px 19px 30px;
            padding: 0px 30px;
            border-left: 2px solid #fff;
        }
    }
}
</style>

