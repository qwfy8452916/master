<template>
    <div class="hotelheader">
        <div class="loginuser">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{account}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='0'>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="logo">&nbsp;&nbsp;
            <img src="../assets/images/logo.png" alt="logo" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'LonganHeader',
    data(){
        return{
            orgId: '',
            account: ''
        }
    },
    mounted(){
        this.orgId = localStorage.getItem('orgId');
        this.account = localStorage.getItem('account');
    },
    methods:{
        handleCommand(command){
            if(command == 0){
                this.logOut();
            }
        },
        //退出登录
        logOut(){
            window.location.href = 'http://172.16.200.90/longan/opr/#/login/' + this.orgId;
        }
    }
}
</script>

<style scoped>
.el-dropdown-link {
    font-size: 14px;
    cursor: pointer;
}
.el-icon-arrow-down {
    font-size: 14px;
}
</style>



<style lang="less" scoped>
.hotelheader{
    height: 69px;
    border-bottom: 1px solid #ddd;
    margin: -8px -8px 0px -8px;
    padding: 0px 30px;
    .loginuser{
        float: right;
        line-height: 29px;
        margin-top: 30px;
    }
    .logo{
        text-align: left;
        img{
            height: 39px;
            margin-top: 15px;
        }
    }
}
</style>

