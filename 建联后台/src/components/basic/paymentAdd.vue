<template>
  <div>
    <h2 class="align-left">添加结算方式</h2>
    <el-container>
      <el-main style="left:0;width:45%;">
        <p class="subtitle align-left">结算方式描述</p>
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="content" style="resize:none;" class="align-left"></el-input>
        <div class="dateRadioDiv align-left">
          <p class="subtitle">时间选择</p>
          <el-row class="dateRadioItem">
            <el-col :span="5">
              <el-radio v-model="dateRadio" label="PAY_IN_DAYS">货到工地日</el-radio>
            </el-col>
            <el-col :span="6">
              <input class="dateInput" v-model="delayDays" />天付款
            </el-col>
          </el-row>
          <el-row class="dateRadioItem">
            <el-col :span="5">
              <el-radio v-model="dateRadio" label="DAY_IN_MONTH">每月付款日期</el-radio>
            </el-col>
            <el-col :span="6">
              <input class="dateInput" v-model="payDate" />日
            </el-col>
          </el-row>
          <el-row class="dateRadioItem">
            <el-col :span="10">
              <el-radio v-model="dateRadio" label="other">其他（先发货后付款，支付日期不定）</el-radio>
            </el-col>
          </el-row>
        </div>
        <el-button @click="cancel" class="cancel-btn">取消</el-button>
        <el-button class="btn-mid" type="primary" @click="submit" v-if="authzData['F:CM_SETSTYLE_SETSTYLE_ADD']">添加</el-button>    
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      content: "",
      dateRadio: "PAY_IN_DAYS",
      delayDays: "",
      payDate: "",
      exampleFold: true,
      unfoldBtnDiv: false,
      authzData:{ 
      },
    };
  },
  methods: {
    submit() {
      let that = this;
      let params = {
        content: that.content,
        isActive: "1"
      };
      if (!that.content) {
        that.$message({
          message: "请输入付款方式",
          type: "warning"
        });
        return false;
      }
      if (that.dateRadio == "PAY_IN_DAYS") {
        if (!that.delayDays) {
          that.$message({
            message: "请输入天数",
            type: "warning"
          });
          return false;
        }
        params.pointDay = that.delayDays;
        params.type = 2;
      } else if(that.dateRadio == "DAY_IN_MONTH"){
        if (!that.payDate) {
          that.$message({
            message: "请输入天数",
            type: "warning"
          });
          return false;
        }
        params.pointDay = that.payDate;
        params.type = 3;
      }else{
         params.type = 1;
      }
      that.$api.addSettle(params).then(response => {
        if (response.data.code == "0") {
          that.$message({
            message: "添加成功",
            type: "success"
          });
          that.$router.push("/basic/payment");
        }
      });
    },
    cancel() {
      this.content = "";
    this.$router.push("/basic/payment");
    },
    showExample() {
      this.exampleFold = !this.exampleFold;
      this.unfoldBtnDiv = !this.unfoldBtnDiv;
    }
  },
  created() {
     this.authzData = this.$store.state.authData
  }
};
</script>


<style lang="less" scoped>
.subtitle {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
.example {
  position: relative;
  margin-left: 20px;
}
.fold {
  height: 300px;
  overflow: hidden;
}
.fold-btn-div {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-top: 100px;
  height: 50px;
  text-align: center;
  background: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);
}
.unfold-btn-div {
  bottom: -50px;
  background: 0;
}
.dateRadioDiv {
  margin-bottom: 30px;
}
.dateRadioItem {
  padding-bottom: 15px;
}
.dateInput {
  width: 60px;
  border-radius: 5px;
  outline: 0;
  border: 1px solid #999;
  margin-right: 10px;
}
</style>