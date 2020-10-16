<template>
  <div class="ContentTemp">
    <el-form align="left" :inline="true">
      <el-form-item label="消息类型">
        <el-select v-model="messageStatus">
          <el-option
            v-for="item in messageTypeData"
            :key="item.dictValue"
            :label="item.dictName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板id">
        <el-input v-model="templateid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <div class="addranchisee">
      <el-button
        class="addbutton"
        v-if="authzData['F:BO_MSG_CONTENTTEMP_ADD']"
        type="primary"
        @click="addranchisee"
      >+创建</el-button>
    </div>
    <el-table :data="contentTempData" stripe style="width:100%">
      <el-table-column prop="ctpType" label="消息类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.ctpType=='1'">微信服务号模板消息</span>
          <span v-if="scope.row.ctpType=='2'">微信小程序订阅消息</span>
          <span v-if="scope.row.ctpType=='3'">短消息</span>
        </template>
      </el-table-column>
      <el-table-column prop="ctpCode" label="模板id" align="center"></el-table-column>
      <el-table-column prop="platformTemplateContent" label="内容/说明" align="center"></el-table-column>
      <el-table-column prop="ctpCode" fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_MSG_CONTENTTEMP_MODIFY']"
            @click="editMsgContent(scope.row.ctpCode,scope.row.ctpType)"
            type="text"
            size="small"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BO_MSG_CONTENTTEMP_DELETE']"
            @click="deleteMsgContent(scope.row.ctpCode)"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <!-- 内容模板弹窗 -->
    <el-dialog
      class="createTemp"
      :title="contentTempTitle"
      :visible.sync="showhidemsgone"
      center
      width="30%"
    >
      <el-form :model="msgContentTemplateDTO" :rules="rules" ref="msgContentTemplateDTO">
        <el-form-item label="选择类型" label-width="108px" prop="ctpType">
          <!-- <el-select v-model="msgContentTemplateDTO.ctpType" @change="selectType">
                       <el-option label="模板消息" value="1"></el-option>
                       <el-option label="订阅消息" value="2"></el-option>
                       <el-option label="短消息" value="3"></el-option>
          </el-select>-->
          <el-select v-model="msgContentTemplateDTO.ctpType" @change="selectType">
            <el-option
              v-for="item in addmessageTypeData"
              :key="item.dictValue"
              :label="item.dictName"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" label-width="108px" prop="ctpTitle">
          <el-input v-model="msgContentTemplateDTO.ctpTitle"></el-input>
        </el-form-item>
        <el-form-item
          v-if="msgContentTemplateDTO.ctpType!='3'"
          label="Appid"
          prop="platformAppId"
          label-width="108px"
        >
          <el-input v-model="msgContentTemplateDTO.platformAppId"></el-input>
        </el-form-item>
        <el-form-item label="模板id" label-width="108px" prop="ctpCode">
          <el-input v-model="msgContentTemplateDTO.ctpCode"></el-input>
        </el-form-item>
        <el-form-item label="参数转换规则" label-width="108px" prop="platformParamsTransRule">
          <el-input
            v-model="msgContentTemplateDTO.platformParamsTransRule"
            type="textarea"
            rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="108px" prop="platformTemplateContent">
          <el-input
            @keyup.native="wordStatic(this);"
            v-model="msgContentTemplateDTO.platformTemplateContent"
            type="textarea"
            rows="3"
            :maxlength="maxNumber"
          ></el-input>
          <div class="weui_textarea_counter">
            <span id="num">{{msgContentTemplateDTO.platformTemplateContent.length}}</span>
            /{{maxNumber}}
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showhidemsgone=false">取 消</el-button>
        <el-button
          type="primary"
          v-if="authzData['F:BO_MSG_CONTENTTEMP_SUBMIT']"
          @click="createSure('msgContentTemplateDTO')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 内容模板弹窗 -->

    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认删除该内容模板？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="Confirmdel()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganContentTemp",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1, //实际当前页码
      templateid: "", //模板id
      messageStatus: "", //消息模板
      showhidemsgone: false,
      dialogVisibleDelete: false,
      maxNumber: 255, //字数限制
      judgeBtn: "", //创建更新判断
      contentTempTitle: "", //模板弹窗标题
      contentTempcode: "", //模板更新ctpCode
      messageTypeData: [], //全部消息类型数据
      addmessageTypeData: [], //新增消息类型数据
      msgContentTemplateDTO: {
        ctpType: "", //模板类型
        ctpTitle: "", //标题
        platformAppId: "", //appid
        ctpCode: "", //消息内容模板id
        platformParamsTransRule: "", //参数转换规则
        platformTemplateContent: "", //模板内容
      },
      rules: {
        ctpType: { required: true, message: "请选择模板类型", trigger: "blur" },
        ctpTitle: { required: true, message: "请填写标题", trigger: "blur" },
        ctpCode: { required: true, message: "请填写模板id", trigger: "blur" },
        platformParamsTransRule: {
          required: true,
          message: "请填写参数转换规则",
          trigger: "blur",
        },
        platformTemplateContent: {
          required: true,
          message: "请填写内容",
          trigger: "blur",
        },
        platformAppId: {
          required: true,
          message: "请填写APPid",
          trigger: "blur",
        },
      },
      contentTempData: [], //待发送列表数据
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
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.messageType();
    this.contentTempList();
  },
  methods: {
    resetFunc() {
      this.messageStatus = "";
      this.templateid = "";
      this.contentTempList();
    },
    //修改获取内容模板详情
    editMsgContent(e, ctpType) {
      let that = this;
      this.judgeBtn = "编辑";
      this.contentTempTitle = "修改内容模板";

      if (ctpType == 3) {
        this.maxNumber = 72;
      } else {
        this.maxNumber = 255;
      }

      this.contentTempcode = e;
      let params = "";
      this.$api
        .contentTempDetail(params, e)
        .then((response) => {
          if (response.data.code == "0") {
            that.msgContentTemplateDTO = response.data.data;
            that.showhidemsgone = true;
            that.$nextTick(() => {
              that.clearValidate("msgContentTemplateDTO");
            });
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

    deleteMsgContent(e) {
      this.dialogVisibleDelete = true;
      this.contentTempcode = e;
    },

    //删除确定
    Confirmdel() {
      let that = this;
      let params = "";
      this.$api
        .delContentTemp(params, that.contentTempcode)
        .then((response) => {
          if (response.data.code == "0") {
            that.contentTempList();
            that.dialogVisibleDelete = false;
          } else {
            that.dialogVisibleDelete = false;
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

    createSure(msgContentTemplateDTO) {
      let that = this;
      let params = {
        ctpType: that.msgContentTemplateDTO.ctpType,
        ctpTitle: that.msgContentTemplateDTO.ctpTitle,
        ctpCode: that.msgContentTemplateDTO.ctpCode,
        platformParamsTransRule:
          that.msgContentTemplateDTO.platformParamsTransRule,
        platformTemplateContent:
          that.msgContentTemplateDTO.platformTemplateContent,
        platformAppId: that.msgContentTemplateDTO.platformAppId,
      };
      this.$refs[msgContentTemplateDTO].validate((valid, model) => {
        if (valid) {
          if (that.judgeBtn === "创建") {
            that.createContentTemp(params);
          } else if (that.judgeBtn === "编辑") {
            that.editContentTemp(params);
          }
        } else {
          console.log("error submit!");
        }
      });
    },
    //创建内容模板
    createContentTemp(params) {
      let that = this;
      this.$api
        .createContentTemp(params)
        .then((response) => {
          if (response.data.code == "0") {
            that.$message.success("操作成功!");
            that.showhidemsgone = false;
            that.contentTempList(params);
          } else {
            that.showhidemsgone = false;
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

    //更新内容模板
    editContentTemp(params) {
      let that = this;
      this.$api
        .editContentTemp(params, that.contentTempcode)
        .then((response) => {
          if (response.data.code == "0") {
            that.$message.success("操作成功");
            that.showhidemsgone = false;
            that.contentTempList();
          } else {
            that.showhidemsgone = false;
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

    selectType(e) {
      if (e == 3) {
        this.maxNumber = 72;
        this.msgContentTemplateDTO.platformAppId = "";
      } else {
        this.maxNumber = 255;
      }
    },

    contentTempList() {
      let that = this;
      let params = {
        pageNo: that.pageNum,
        pageSize: that.pageSize,
        isPage: true,
        ctpType: that.messageStatus,
        ctpCode: that.templateid,
      };
      this.$api
        .contentTempList({ params })
        .then((response) => {
          if (response.data.code == "0") {
            that.contentTempData = response.data.data.records;
            that.pageTotal = response.data.data.total;
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

    //创建内容模板
    addranchisee() {
      this.judgeBtn = "创建";
      this.contentTempTitle = "创建内容模板";

      (this.msgContentTemplateDTO = {
        ctpType: "",
        ctpTitle: "",
        platformAppId: "",
        ctpCode: "",
        platformParamsTransRule: "",
        platformTemplateContent: "",
      }),
        (this.showhidemsgone = true);
      this.$nextTick(() => {
        this.clearValidate("msgContentTemplateDTO");
      });
    },

    //获取消息类型
    messageType() {
      let that = this;
      this.$api
        .messageType()
        .then((response) => {
          if (response.data.code == "0") {
            that.messageTypeData = response.data.data;
            let nowaddmessageTypeData = JSON.stringify(response.data.data);
            nowaddmessageTypeData = JSON.parse(nowaddmessageTypeData);
            that.addmessageTypeData = nowaddmessageTypeData.map((item) => {
              return {
                dictName: item.dictName,
                dictValue: parseInt(item.dictValue),
              };
            });

            let allObject = {
              dictName: "全部",
              dictValue: "",
            };
            that.messageTypeData.unshift(allObject);
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

    inquire() {
      this.contentTempList();
      this.$store.commit("setSearchList", {
        messageStatus: this.messageStatus,
        templateid: this.templateid,
      });
    },
    //页面跳转
    current() {
      this.pageNum = this.currentPage;
      this.contentTempList();
    },
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.contentTempList();
    },

    wordStatic() {
      var content = document.getElementById("num");
      if (content) {
        var value = this.msgContentTemplateDTO.platformTemplateContent;
        value = value.replace(/\n|\r/gi, "");
        content.innerText = value.length;
      }
    },

    clearValidate(msgContentTemplateDTO) {
      let that = this;
      that.$refs[msgContentTemplateDTO].clearValidate();
    },
  },
};
</script>

<style lang="less">
.ContentTemp {
  .el-dialog__header {
    text-align: left;
  }
  .el-form-item__content {
    text-align: left;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .messageone .el-dialog {
    width: 35%;
  }
  .msghang {
    .msgcontent {
      width: calc(100% - 50px);
      display: inline-block;
    }
  }
  .createTemp {
    .el-select {
      width: 100%;
    }
  }
}
</style>

<style lang="less" scoped>
.ContentTemp {
  .el-dialog__header {
    text-align: left;
  }

  .messageone {
    .msghang {
      text-align: left;
      clear: both;
      .msg_title {
        float: left;
        display: inline-block;
        width: 50px;
        text-align: right;
        .msgcontent {
          display: inline-block !important;
          float: left;
        }
      }
    }
  }
  .weui_textarea_counter {
    text-align: right;
  }
  .addranchisee {
    float: left;
    margin-bottom: 10px;
  }
}
</style>
