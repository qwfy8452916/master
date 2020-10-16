
<template>
  <div class="CabTypeEdit">
    <p class="title">修改柜子类型</p>
    <el-form align="left" :model="addCabinetData" :rules="rules" ref="addCabinetData">
      <el-form-item label="类型编码" label-width="120px" prop="cabType">
        <el-input :disabled="true" v-model="addCabinetData.cabType" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="类型名称" label-width="120px" prop="cabTypeName">
        <el-input v-model="addCabinetData.cabTypeName" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="是否虚拟柜子" label-width="120px" prop="virtualFlag">
        <el-switch v-model="addCabinetData.virtualFlag" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="格子数" label-width="120px" prop="latticeCount">
        <el-input :disabled="true" v-model="addCabinetData.latticeCount"></el-input>
      </el-form-item>
      <el-form-item
        v-if="!addCabinetData.virtualFlag"
        label="柜子布局"
        label-width="120px"
        prop="pageLayout"
      >
        <el-input v-model="addCabinetData.pageLayout" type="textarea" :rows="8"></el-input>
      </el-form-item>
      <el-form-item label-width="120px">
        <el-button class="cancelleft" @click="cancelBtn">取消</el-button>
        <el-button
          type="primary"
          v-if="authzData['F:BO_CAB_CABTYPE_MODSUBMIT']"
          @click="sureBtn('addCabinetData')"
        >确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LonganCabTypeEdit",
  data() {
    return {
      authzData: "",
      cabinetTypeId: "", //柜子类型id
      addCabinetData: {
        cabType: "", //类型编码
        cabTypeName: "", //类型名称
        virtualFlag: 0, //是否虚拟柜子
        latticeCount: "", //格子数
        pageLayout: "", //柜子布局
      },
      rules: {
        cabType: { required: true, message: "请填写类型编码", trigger: "blur" },
        cabTypeName: {
          required: true,
          message: "请填写类型名称",
          trigger: "blur",
        },
        latticeCount: {
          required: true,
          min: 1,
          type: "number",
          message: "请填格子数",
          trigger: "blur",
        },
        homePage: {
          required: true,
          message: "请选择默认首页",
          trigger: "change",
        },
        pageLayout: {
          required: true,
          message: "请填写柜子布局",
          trigger: "blur",
        },
      },
    };
  },
  mounted() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzData = response;
      })
      .catch((err) => {
        this.authzData = err;
      });
    this.cabinetTypeId = this.$route.query.id;
    this.CabinetTypeDetail();
  },
  methods: {
    //取消
    cancelBtn() {
      this.$router.push({ name: "LonganCabTypeList" });
    },

    //确定
    sureBtn(addCabinetData) {
      let that = this;
      let params = {
        cabType: this.addCabinetData.cabType,
        cabTypeName: this.addCabinetData.cabTypeName,
        virtualFlag: this.addCabinetData.virtualFlag,
        latticeCount: this.addCabinetData.virtualFlag
          ? undefined
          : this.addCabinetData.latticeCount,
        pageLayout: this.addCabinetData.pageLayout,
      };
      this.$refs[addCabinetData].validate((valid, model) => {
        if (valid) {
          this.$api
            .editCabinetType(params, that.cabinetTypeId)
            .then((response) => {
              if (response.data.code == "0") {
                that.$message.success("操作成功");
                that.$router.push({ name: "LonganCabTypeList" });
              } else {
                that.$alert(response.data.msg, "警告", {
                  confirmButtonText: "确定",
                });
              }
            });
        } else {
          console.log("error!");
        }
      });
    },

    //获取详情
    CabinetTypeDetail() {
      let that = this;
      let params = "";
      this.$api
        .CabinetTypeDetail(params, that.cabinetTypeId)
        .then((response) => {
          if (response.data.code == "0") {
            that.addCabinetData = response.data.data;
          } else {
            that.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
  },
};
</script>

<style lang="less" scope>
.CabTypeEdit {
  .title {
    font-weight: bold;
    text-align: left;
  }
  .el-input,
  .el-select,
  .el-textarea {
    width: 270px;
  }
  .cancelleft.el-button--primary {
    margin-left: 50px;
  }
}
</style>