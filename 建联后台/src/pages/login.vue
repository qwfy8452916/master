<template>
  <el-row
    :span="24"
    type="flex"
    align="middle"
    justify="center"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 0.3)"
    class="zn-login"
  >
    <el-col :span="6" class="zn-login-box">
      <el-form :model="userForm">
        <el-form-item>
          <h1>江建会员登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="userForm.name" type="text" placeholder="用户名/手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model.trim="userForm.password"
            type="password"
            @keyup.enter="login"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked" style="float: left;letter-spacing: 1px; ">自动登录</el-checkbox>
          <div style="float: right;font-size: 14px;cursor:pointer" @click="forgetPassword">忘记密码？</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="zn-login-btn">登录</el-button>
        </el-form-item>
        <!-- <el-form-item>
                    <span class="registerBtn" @click="register">立即注册</span>
                    <span class="backToMain" @click="backToMain">返回首页</span>
        </el-form-item>-->
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userForm: {
        name: "",
        password: ""
      },
      checked: true
    };
  },
  computed: {
    loading() {
      return false;
    }
  },
  created() {},
  methods: {
    login: function() {
      let that = this;
      if (!that.userForm.name) {
        this.$message("用户名不能为空");
        return;
      }
      if (!that.userForm.password) {
        this.$message("密码不能为空");
        return;
      }
      const params = {
        account: that.userForm.name,
        password: that.userForm.password
      };

      that.$api
        .loginIn(params)
        .then(response => {
          let result = response.data;
          if (result.code == 0) {
            localStorage.setItem("token", result.data);
            that.$api.getUserInfo().then(res => {
              localStorage.setItem("userID", res.data.data.id);
              localStorage.setItem("username", res.data.data.username);
              localStorage.setItem("deptID", res.data.data.deptId);
              var userId = res.data.data.id;
              that.$auth.authority(that, 0, userId).then(res => {
                var authObj = {};
                res.forEach(element => {
                  authObj[element.permissionCode] = true;
                });
                var num = 0;
                for (var i in authObj) {
                  num++;
                }
                console.log(authObj, num);
                localStorage.setItem("AuthData", JSON.stringify(authObj));
                that.$store.commit("getAuthData", authObj);
                that.$router.push({ path: "/user" });
              });
            });
          } else {
            that.$alert(result.msg, "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(error => {
          that.$alert(error, "提示", {
            confirmButtonText: "知道了",
            callback: action => {}
          });
        });
    },
    register: function() {},
    backToMain: function() {},
    forgetPassword: function() {
      this.$alert("请联系管理员!!", "提示", {
        confirmButtonText: "知道了",
        callback: action => {}
      });
    }
  }
};
</script>
<style lang="less" scoped>
.zn-login {
  height: 100%;
  overflow: hidden;
  position: fixed;
  width: 100%;
  background: url("../assets/img/login.png") no-repeat;
  background-size: cover;
  .zn-login-box {
    padding: 40px;
    background-color: #fff;
    border-radius: 10px;
  }
  h1 {
    color: #0576db;
  }
  .zn-login-btn {
    width: 280px;
  }
  .registerBtn {
    padding-right: 48px;
    color: #0576db;
    border-right: 1px solid #ebebeb;
    font-size: 14px;
    &:hover {
      text-decoration-line: underline;
    }
  }
  .backToMain {
    color: #666;
    padding-left: 48px;
    font-size: 14px;
    &:hover {
      text-decoration-line: underline;
    }
  }
}
</style>