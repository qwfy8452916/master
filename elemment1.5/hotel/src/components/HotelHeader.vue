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
        <div class="logo">
            <!-- <img src="../assets/images/logo.png" alt="logo" /> -->
            &nbsp;酒&nbsp;店&nbsp;后&nbsp;台&nbsp;管&nbsp;理&nbsp;系&nbsp;统&nbsp;
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotelHeader',
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
            window.location.href = 'http://172.16.200.90/longan/hotel/#/login/' + this.orgId;
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
        line-height: 69px;
        font-size: 24px;
        img{
            height: 49px;
            margin-top: 10px;
        }
    }
}
</style>

