<template>
    <!-- <div class="login-wrapper">
        <p class="title">管理后台</p>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px">
            <el-form-item label="用户账号" prop="account">
                <el-input ref="loginname" v-model="loginForm.account" @keyup.enter.native="login('loginForm')"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" show-password @keyup.enter.native="login('loginForm')"></el-input>
            </el-form-item>
            <br/>
            <el-form-item>
                <el-button type="primary" @click="login('loginForm')">登录</el-button>
            </el-form-item>
            <div class="forgetpwd">
                <el-button type="text" size="small" @click="isDialogShow = true">忘记密码&nbsp;？</el-button>
            </div>
        </el-form>
        <el-dialog
            title="提示"
            :visible.sync="isDialogShow"
            width="30%">
            <span>请联系管理员</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>
        <div class="background-animation">
            <ul class="background-bubbles">
                <li v-for="(item,index) in bubbles" :key="index"></li>
            </ul>
        </div>
    </div> -->
    <div class="login-bg">
        <div class="login-form">
            <div class="login-l">
                <!-- <img alt="loginbg" src="../assets/images/login_bg.png" /> -->
                <div class="title">
                    <span class="ctitle">管理后台</span><br/>
                    <span class="etitle">Admin Console</span>
                </div>
            </div>
            <div class="login-r">
                <div class="r-info">
                    <p class="title">账号密码登录</p>
                    <el-form :model="loginForm" :rules="rules" ref="loginForm">
                        <span class="lab">用户账号</span>
                        <el-form-item prop="account">
                            <el-input ref="loginname" v-model="loginForm.account" @keyup.enter.native="login('loginForm')"></el-input>
                        </el-form-item>
                        <span class="lab">密码</span>
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" show-password @keyup.enter.native="login('loginForm')"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item>
                            <el-button type="primary" @click="login('loginForm')">登录</el-button>
                        </el-form-item>
                        <div class="forgetpwd">
                            <!-- <el-button type="text" size="small" @click="isDialogShow = true">忘记密码&nbsp;？</el-button> -->
                            <label class="labpwd" @click="isDialogShow = true">忘记密码&nbsp;？</label>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="isDialogShow"
            width="30%">
            <span>请联系管理员</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="isDialogShow = false" style="width: 20%; border-radius: 4px;">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'login',
    // head() {
    //     return{
    //         title: '酒店管理系统',
    //         meta: [
    //             {hid:'description', name:'description', content:'description'}
    //         ]
    //     }
    // },
    data() {
        return {
            // orgId: '',
            loginForm: {},
            rules: {
                account: [
                    { required: true, message: '用户账号不能为空！', trigger: 'blur'},
                    { min:1, max: 32, message: '用户账号请保持在32个字段以内', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '密码不能为空！', trigger: 'blur'},
                    { min:1, max: 18, message: '密码请保持在18个字段以内', trigger: 'blur'}
                ],
            },
            isDialogShow: false,
            bubbles: []
        }
    },
    created() {
        this.bubbles.length = 5;
    },
    mounted(){
        window.localStorage.clear();
        // this.orgId = this.$route.params.orgId;
        this.$refs['loginname'].focus();
        console.log(this.$api)
    },
    methods: {
        login(loginForm) {
            let that = this;
            // const path = this.orgId;
            const orgType = [3];
            const params = {
                account: this.loginForm.account,
                password: this.loginForm.password,
                orgTypes: orgType
            };
            this.$refs[loginForm].validate((valid) => {
                if(valid){
                    // console.log(params, path);
                    this.$api.login(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                that.$message.success('登录成功！');
                                localStorage.setItem('orgAs', 3);
                                const limitToken = 'Bearer' + result.data.token;
                                const userName = result.data.empName;
                                const userId = result.data.empId;
                                const hotelId = result.data.hotelDTO.id;
                                const hotelName = result.data.hotelDTO.hotelName;
                                const hotelIsSupportTakeOutOrder = result.data.hotelDTO.isSupportTakeOutOrder;
                                const orgId=result.data.hotelDTO.orgId;
                                localStorage.setItem('Authorization', limitToken);
                                // localStorage.setItem('orgType', orgType);
                                localStorage.setItem('userName', userName);
                                localStorage.setItem('userId', userId);
                                localStorage.setItem('hotelId', hotelId);
                                localStorage.setItem('hotelName', hotelName);
                                localStorage.setItem('hotelIsSupportTakeOutOrder', hotelIsSupportTakeOutOrder);
                                localStorage.setItem('orgId',orgId)

                                // that.$router.push({name: "HotelCardticketList"});
                                that.$router.push({name: "HomePage"});
                            }else{
                                that.$message.error(result.msg);
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!');
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
/* .el-form{
    width: 90%;
}
.el-input{
    width: 80%;
}*/

.el-input__inner{
    background-color: #f3f3f3 !important;
    border: 2px solid #000 !important;
}
.el-button{
    width: 100%;
}

/* .el-button{
    width: 40%;
    margin-left: -40px;
} */
</style>

<style lang="less" scoped>
.login-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form{
        background: #fff;
        width: 64%;
        height: 76%;
        box-shadow: 0px 0px 5px 2px #eee;
        display: flex;
        .login-l{
            width: 64%;
            background: url(../assets/images/login_bg.png) no-repeat;
            background-size: auto 101%;
            background-position: center center;
            display: flex;
            justify-content: center;
            align-items: center;
            .title{
                text-align: left;
                color: #fff;
                .ctitle{
                    font-size: 36px;
                    line-height: 48px;
                }
                .etitle{
                    font-size: 20px;
                    line-height: 28px;
                }
            }
        }
        .login-r{
            width: 36%;
            color: #666;
            text-align: left;
            display: flex;
            justify-content: center;
            align-items: center;
            .r-info{
                width: 72%;
                .title{
                    font-size: 19px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    margin: 0px 0px 50px 0px;
                }
                .lab{
                    font-size: 14px;
                    color: #999;
                    margin-top: 36px;
                    margin-bottom: 6px;
                    display: block;
                }
                .forgetpwd{
                    .labpwd{
                        cursor: pointer;
                        font-size: 12px;
                        color: #666;
                    }
                }
            }
        }
    }
}

.login-wrapper{
    width: 300px;
    height: 320px;
    padding: 10px 100px;
    border: 2px solid #409eff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: absolute;
    top: calc(50% - 200px);
    left: calc(50% - 250px);
    .title{
        font-size: 28px;
        margin-bottom: 40px;
    }
    .forgetpwd{
        text-align: right;
        margin: -100px -40px 0px 0px;
    }
    .background-bubbles {
        position: fixed;
        //使气泡背景充满整个屏幕
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        li{
            position: absolute;
            // bottom 的设置是为了营造出气泡从页面底部冒出的效果；
            bottom: -100px;
            // 默认的气泡大小；
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.15);
            list-style: none;
            // 使用自定义动画使气泡渐现、上升和翻滚；
            animation: animationSquare 16s infinite alternate;
            transition-timing-function: linear;
            // 分别设置每个气泡不同的位置、大小、透明度和速度，以显得有层次感；
            &:nth-child(1){
                left: 46%;
                animation-delay: 6s;   //延时
                animation-duration: 14s;   //动画时长
                background: rgba(255,255,0,0.15);
            }
            &:nth-child(2){
                left: 12%;
                animation-delay: 4s;   //延时
                animation-duration: 15s;   //动画时长
                background: rgba(0,0,255,0.1);
            }
            &:nth-child(3){
                left: 27%;
                width: 60px;
                height: 60px;
                animation-delay: 2s;   //延时
                animation-duration: 14s;   //动画时长
                background: rgba(0,255,0,0.15);
            }
            &:nth-child(4){
                left: 65%;
                width: 30px;
                height: 30px;
                animation-delay: 1s;   //延时
                background: rgba(255,0,255,0.05);
            }
            &:nth-child(5){
                left: 88%;
                width: 80px;
                height: 80px;
                animation-delay: 3s;   //延时
                animation-duration: 10s;   //动画时长
                background: rgba(255,0,0,0.1);
            }
        }
        // 自定义 animationSquare 动画；
        @keyframes animationSquare {
            0%{
                opacity: 0.5;
                transform: translateY(0px) rotate(45deg);
            }
            25%{
                opacity: 0.75;
                transform: translateY(-300px) rotate(90deg);
            }
            50%{
                opacity: 1;
                transform: translateY(-600px) rotate(135deg);
            }
            100%{
                opacity: 0;
                transform: translateY(-1000px) rotate(180deg);
            }
        }
    }

}
</style>

