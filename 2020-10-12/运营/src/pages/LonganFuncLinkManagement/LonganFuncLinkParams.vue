
<template>
  <div class="CabTypeListAdd">
    <p class="title">参数管理</p>
    <el-form align="left" :model="addLinkData" ref="addLinkData">
      <el-form-item label="链接名称" label-width="120px" prop="linkName">
        <el-input :disabled="true" v-model="addLinkData.linkName" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="类型" label-width="120px" prop="linkType">
        <el-select :disabled="true" v-model="addLinkData.linkType">
          <el-option label="内部链接" :value="1"></el-option>
          <el-option label="外部链接" :value="2"></el-option>
        </el-select>
        <el-popover
          placement="right-start"
          title="提示"
          width="200"
          trigger="hover"
          content="外部链接指在浏览器可以直接访问的链接；内部链接指只有指定终端内部才有意义的页面路径，内部链接必须指定适用的终端，不同终端可以定义不同格式的路径"
        >
          <el-button style="border:none;padding:0;vertical-align:middle" slot="reference">
            <i class="el-icon-warning-outline" style="font-size:18px;"></i>
          </el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="终端" label-width="120px" prop="linkTerminal">
        <el-select :disabled="true" v-model="addLinkData.linkTerminal">
          <el-option label="购物小程序" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="链接路径" label-width="120px" prop="linkUrl">
        <el-input :disabled="true" v-model="addLinkData.linkUrl"></el-input>
      </el-form-item>
      <el-form-item label="需要参数" label-width="120px" prop="isNeedParameter">
        <el-switch :disabled="true" v-model="addLinkData.isNeedParameter"></el-switch>
        <el-popover
          placement="right-start"
          title="提示"
          width="200"
          trigger="hover"
          content="默认为不需要；不需要参数的链接不能设置参数如果打开此开关，则新增的链接状态为“禁用”，且必须设置参数后才可以启用"
        >
          <el-button style="border:none;padding:0;vertical-align:middle" slot="reference">
            <i class="el-icon-warning-outline" style="font-size:18px;"></i>
          </el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="备注" label-width="120px" prop="linkRemark">
        <el-input
          :disabled="true"
          v-model="addLinkData.linkRemark"
          maxlength="250"
          type="textarea"
          :rows="8"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="addbutton" @click="addNewSetting">新增参数</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="paramData" border stripe style="width:100%;">
      <el-table-column prop="parameterName" label="参数名称" align="center"></el-table-column>
      <el-table-column prop="defaultValue" label="默认值" align="center"></el-table-column>
      <el-table-column label="是否必需" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isNecessary == 0">否</span>
          <span v-if="scope.row.isNecessary == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="parameterInstructions" label="参数说明" align="center"></el-table-column>
      <el-table-column fixed="right" width="200" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="paramsChange(scope.$index, paramData)">修改</el-button>
          <el-button type="text" size="small" @click="paramsDelete(scope.$index, paramData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :before-close="clearData1" width="30%" :visible.sync="dialogVisible" title="新增参数">
      <el-form align="left" :rules="rules" :model="addParmas" ref="addParmas">
        <el-form-item label="参数名称" label-width="120px" prop="parameterName">
          <el-input v-model="addParmas.parameterName" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="默认值" label-width="120px" prop="defaultValue">
          <el-input v-model="addParmas.defaultValue" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="是否必需" label-width="120px" prop="isNecessary">
          <el-switch v-model="addParmas.isNecessary"></el-switch>
        </el-form-item>
        <el-form-item label="参数说明" label-width="120px" prop="parameterInstructions">
          <el-input
            v-model="addParmas.parameterInstructions"
            maxlength="200"
            type="textarea"
            :rows="8"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button class="cancelleft" @click="clearData1">取消</el-button>
          <el-button type="primary" @click="sureBtn('addParmas')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :before-close="clearData2" width="30%" :visible.sync="dialogVisible2" title="修改参数">
      <el-form align="left" :rules="rules" :model="addParmas" ref="addParmas">
        <el-form-item label="参数名称" label-width="120px" prop="parameterName">
          <el-input v-model="addParmas.parameterName" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="默认值" label-width="120px" prop="defaultValue">
          <el-input v-model="addParmas.defaultValue" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="是否必需" label-width="120px" prop="isNecessary">
          <el-switch v-model="addParmas.isNecessary"></el-switch>
        </el-form-item>
        <el-form-item label="参数说明" label-width="120px" prop="parameterInstructions">
          <el-input
            v-model="addParmas.parameterInstructions"
            maxlength="200"
            type="textarea"
            :rows="8"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button class="cancelleft" @click="clearData2">取消</el-button>
          <el-button type="primary" @click="sureBtn2('addParmas')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-button @click="restBtn" class="restBtn">返回</el-button>
  </div>
</template>

<script>
export default {
  name: "LonganFuncLinkParams",
  data() {
    return {
      paramData: [],
      authzData: "",
      addLinkData: {
        linkName: "",
        linkType: "",
        linkTerminal: "",
        linkUrl: "",
        isNeedParameter: false,
        linkRemark: "",
      },
      linkID: "",
      dialogVisible: false,
      dialogVisible2: false,
      paramsId: "",
      addParmas: {
        parameterName: "",
        defaultValue: "",
        isNecessary: false,
        parameterInstructions: "",
      },
      rules: {
        parameterName: {
          required: true,
          message: "请填写参数名称",
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
    this.linkID = this.$route.query.modifyid;
    this.getFillBackData();
    this.getParamsData();
  },
  methods: {
    //返回
    restBtn() {
      this.$router.go(-1)
    },
    //新增参数
    addNewSetting() {
      this.dialogVisible = true;
    },

    //确定
    sureBtn(addParmas) {
      let that = this;
      let params = {
        parameterName: this.addParmas.parameterName,
        defaultValue: this.addParmas.defaultValue,
        parameterInstructions: this.addParmas.parameterInstructions,
        linkId: this.linkID,
        isNecessary: this.addParmas.isNecessary ? 1 : 0,
      };
      this.$refs[addParmas].validate((valid, model) => {
        if (valid) {
          this.$api.addNewParams(params).then((response) => {
            if (response.data.code == "0") {
              that.$message.success("操作成功");
              this.clearData1();
              this.getParamsData();
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
    clearData1() {
      this.addParmas = {
        parameterName: "",
        defaultValue: "",
        isNecessary: false,
        parameterInstructions: "",
      };
      this.dialogVisible = false;
    },
    clearData2() {
      this.addParmas = {
        parameterName: "",
        defaultValue: "",
        isNecessary: false,
        parameterInstructions: "",
      };
      this.dialogVisible2 = false;
    },
    //修改
    sureBtn2(addParmas) {
      let that = this;
      let params = {
        parameterName: this.addParmas.parameterName,
        defaultValue: this.addParmas.defaultValue,
        parameterInstructions: this.addParmas.parameterInstructions,
        linkId: this.linkID,
        isNecessary: this.addParmas.isNecessary ? 1 : 0,
      };
      this.$refs[addParmas].validate((valid, model) => {
        if (valid) {
          this.$api.changeNewParams(params, this.paramsId).then((response) => {
            if (response.data.code == "0") {
              that.$message.success("操作成功");
              this.dialogVisible2 = false;
              this.getParamsData();
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
    getParamsData() {
      var that = this;
      var params = {
        linkId: this.linkID,
      };
      this.$api
        .selNewParams({ params })
        .then((response) => {
          if (response.data.code == 0) {
            this.paramData = response.data.data;
          } else {
            that.$alert(response.data.data.msg, "警告", {
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
    //修改按钮
    paramsChange(index, row) {
      this.dialogVisible2 = true;
      let guiId = row[index].id;
      this.paramsId = row[index].id;
      this.$api
        .selOneNewParams(guiId)
        .then((response) => {
          if (response.data.code == 0) {
            this.addParmas.parameterName = response.data.data.parameterName;
            this.addParmas.defaultValue = response.data.data.defaultValue;
            this.addParmas.parameterInstructions =
              response.data.data.parameterInstructions;
            this.addParmas.isNecessary = response.data.data.isNecessary
              ? true
              : false;
          } else {
            that.$alert(response.data.data.msg, "警告", {
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
    //删除
    paramsDelete(index, row) {
      let guiId = row[index].id;
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .delNewParams(guiId)
            .then((response) => {
              if (response.data.code == 0) {
                this.$message.success("操作成功");
                this.getParamsData();
              } else {
                this.$alert(response.data.msg, "警告", {
                  confirmButtonText: "确定",
                });
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //获取回填数据
    getFillBackData() {
      let that = this;
      this.$api
        .seloneNewLink(this.linkID)
        .then((response) => {
          if (response.data.code == 0) {
            this.addLinkData.linkName = response.data.data.linkName;
            this.addLinkData.linkType = response.data.data.linkType;
            this.addLinkData.linkTerminal = response.data.data.linkTerminal;
            this.addLinkData.linkUrl = response.data.data.linkUrl;
            this.addLinkData.linkRemark = response.data.data.linkRemark;
            this.addLinkData.isNeedParameter = response.data.data
              .isNeedParameter
              ? true
              : false;
          } else {
            that.$alert(response.data.data.msg, "警告", {
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
.CabTypeListAdd {
  width: 60%;
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
  .restBtn{
    float: left;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>




















