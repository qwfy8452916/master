<template>
  <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title"> 
        筑牛网运营后台管理系统
      <!-- <img src="../assets/logo.png"> -->
    </h3>
    <div class="login">
      <el-form-item prop="account">
        <el-input @keyup.enter.native="handleSubmit" type="text" v-model="ruleForm.account" auto-complete="off" placeholder="用户名/手机号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input @keyup.enter.native="handleSubmit" type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox><el-button type="text" class="forgot" @click.native.prevent="forgotPassword" >忘记密码？</el-button>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
      <el-form-item label="没有账号？" style="width:100%;" label-width="90px" >
        <el-button type="text" class="registe">立即注册</el-button>
      </el-form-item> 
    </div>
  </el-form>
</template>

<script>
  import $api from '../api/api'
  import * as util from '../assets/util.js'
  let Base64 = require('js-base64').Base64;
  export default {
    data() {
      return {
        logining: false,
        ruleForm: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [{
              required: true,
              message: '账号不能为空',
              trigger: 'blur'
            },
            //{ validator: validaePass }
          ],
          checkPass: [{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            },
          ]
        },
        checked: true
      };
    },
    mounted: function(){
      this.loadAccountInfo()
    },
    methods: {
      loadAccountInfo(){
        let accountInfo = util.getCookie('login_name');
        if(Boolean(accountInfo) == false){
          console.log('cookie中没有检测到账号信息！');
          return false;
        }else{
          //如果cookie里有账号信息
          console.log('cookie中检测到账号信息！现在开始预填写！');
          this.ruleForm.account = util.getCookie('login_name');
          this.ruleForm.checkPass = util.getCookie('login_password');
        }
      },
      forgotPassword(ev) {
        
      },

      handleSubmit(ev) {
        var _this = this;
        this.logining = true;
        const params = {
          login_name: this.ruleForm.account,
          login_password : this.ruleForm.checkPass
        };
       $api.login(params).then(response => {
          const result = response.data;
          this.logining = false;
          if (result.msg_code == 100000) {
            sessionStorage.setItem('user', JSON.stringify({
              login_name: this.ruleForm.account,
              login_password: this.ruleForm.checkPass
            }))
            let token = Base64.encode(result.response.token);
            util.setCookie('token', result.response.token, 'd20')
            if (this.checked){
              // console.log("勾选了记住密码，现在开始写入cookie");
              util.setCookie('login_name', this.ruleForm.account, 'd20')
              util.setCookie('login_password', this.ruleForm.checkPass, 'd20')
            }else{
              // console.log("没有勾选记住密码，现在开始删除账号cookie");
              util.delCookie('login_name');
              util.delCookie('login_password');
            }
            _this.$emit('login', _this.$router.currentRoute.query.from);
          } else {
            this.$alert(data.message, '警告', {
                confirmButtonText: '确定'
            });
          }
        });
      }
    }
  }
</script>
<style>
.el-input--mini .el-input__inner {
    height: 36px;
}
.el-button--mini {
    padding: 10px 15px;
}
.el-message-box__header .el-message-box__headerbtn{
  border:none !important;
  padding: 0 !important;
}
</style>

<style lang="scss" scoped>
  @import '../styles/vars.scss';
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 8px;
    border-radius: 8px;
    -moz-border-radius: 8px;
    background-clip: padding-box;
    margin: 220px auto;
    width: 415px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .login {
      padding: 0 35px 15px 35px;  
    }
    .title {
      position: relative;
      margin: 0px auto 40px auto;
      text-align: center;
      color: #ffffff;
      background-color: $color-primary;
      height: 50px;
      line-height: 50px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      font-weight: 300;
      font-size: 18px;
      img {
        position: absolute;
        left: 15px;
        top: 8px;
        width: 112px;
        height: 34px;
      }
    }
    button{
      font: normal 500 14px "STHeiti", "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
    }
    .remember {
      margin: 0;
      position:relative;
      top:-10px;
    }
    .forgot {
      color: #0576DB;
      font-size: 14px;
      line-height: 19px;
      position:relative;
      left:160px;
      top:-10px;
    }
    .registe{
      position: relative;
      top: -7px;
      left: -40px;
    }
  }
    .el-input__inner {
        height: 36px !important;
    }
</style>
