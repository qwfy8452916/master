<template>
  <div>
    <!-- banner图片上传 -->
    <div class="bannerwrap" v-if="showBanner">
      <el-form-item>
        <span slot="label">
          <label class="required-icon">*</label> banner图
        </span>
        <el-upload
          :disabled="isDisabled"
          :action="uploadUrl"
          list-type="picture"
          :limit="5"
          :headers="headers"
          name="fileContent"
          :file-list="bannerList"
          :on-success="handleSuccessBanner"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :on-error="imgUploadError"
          :before-upload="beforeUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片支持jpg、jpeg、png等，最多支持5张</label>
        </el-upload>
      </el-form-item>
      <div class="bannerlink">
        <el-form-item v-for="(item, index) in bannerList" :key="index" class="linkstyle">
          <el-select
            :disabled="isDisabled"
            v-model="item.linkId"
            @change="selectLink(index, item.linkId)"
            placeholder="选择链接"
            style="width: 72%"
          >
            <el-option
              v-for="subitem in bannerLinkList"
              :key="subitem.id"
              :label="subitem.linkName"
              :value="subitem.id"
            ></el-option>
          </el-select>&nbsp;&nbsp;
          <el-button v-if="item.isParam" type="text" size="small" @click="linkParam(index)">链接参数</el-button>
        </el-form-item>
      </div>
      <el-dialog title="链接参数" :visible.sync="dialogVisibleParams" width="30%">
        <el-form>
          <el-form-item v-for="(item, index) in paramsList" :key="index" label-width="100px">
            <span slot="label">
              <label v-if="item.isNecessary == 1" class="required-icon">*</label>
              {{item.parameterName}}
            </span>
            <el-input :disabled="isDisabled" v-model="item.value" maxlength="50"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="dialogVisibleParams=false">取消</el-button>
          <el-button :disabled="isDisabled" type="primary" @click="EnsureParams">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 有表单验证的图片上传 -->
    <div class="picwrap" v-if="showFormDesc">
      <el-form-item :label="formLabel" :prop="formProps">
        <el-upload
          :disabled="isDisabled"
          :action="uploadUrl"
          list-type="picture"
          :headers="headers"
          name="fileContent"
          :file-list="descList"
          :before-upload="beforeUpload"
          :on-success="handleSuccessDesc"
          :on-remove="handleRemove"
          :on-error="imgUploadError"
        >
          <!-- :limit="5" 限制上传数量   -->
          <!-- :on-exceed="handleExceed"  文件超出个数限制时的钩子 -->
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片支持jpg、jpeg、png等</label>
        </el-upload>
      </el-form-item>
      <div class="sortwrap">
        <el-form-item label="排序" v-for="(item,index) in descList" :key="index" class="sortlabel">
          <el-input :disabled="isDisabled" v-model="item.sort" class="sortinput"></el-input>
        </el-form-item>
      </div>
    </div>
    <!-- 纯商品描述图片上传 -->
    <div class="picwrap" v-if="showDesc">
      <el-form-item label="商品描述图">
        <el-upload
          :disabled="isDisabled"
          :action="uploadUrl"
          list-type="picture"
          :headers="headers"
          name="fileContent"
          :file-list="descList"
          :before-upload="beforeUpload"
          :on-success="handleSuccessDesc"
          :on-remove="handleRemove"
          :on-error="imgUploadError"
        >
          <!-- :limit="5" 限制上传数量   -->
          <!-- :on-exceed="handleExceed"  文件超出个数限制时的钩子 -->
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片支持jpg、jpeg、png等</label>
        </el-upload>
      </el-form-item>
      <div class="sortwrap">
        <el-form-item label="排序" v-for="(item,index) in descList" :key="index" class="sortlabel">
          <el-input :disabled="isDisabled" v-model="item.sort" class="sortinput"></el-input>
        </el-form-item>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "uploadPicCommen",
  props: {
    /* 
    根据参数传值调用组件说明：
    uploadType为banner的时候需要传递参数bannerType(功能去方式)，bannerList(数据列表)，isDisabled(是否禁用)，@bannerListEvent（移除图片）。
    uploadType为formDesc的时候需要传递参数descList(数据列表)，isDisabled(是否禁用)，formLabel（名称），formProps（form规则rule的参数），@descListEvent（移除图片）。
    uploadType为desc的时候需要传递参数descList(数据列表)，isDisabled(是否禁用)，@descListEvent（移除图片）。
    bannerList:[
      id: "",
        name: file.name,
        path: file.response.data,
        url: file.url,
        linkId: 0,
        isParam: false,
        paramsData: [],
        paramsLD: [],
    ]
    descList{
      name: file.name,
        path: file.response.data,
        url: file.url,
        sort: "",
    }
    */
    uploadType: {
      type: String,
      default: "", //desc/formDesc/banner
    },
    bannerType: {
      type: Number,
      default: 1,
    },
    bannerList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    descList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    formLabel: {
      type: String,
      default: "",
    },
    formProps: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      uploadUrl: this.$api.upload_file_url,
      bannerLinkList: [],
      dialogVisibleParams: false,
      bannerIndex: "",
      paramsList: [],
      showBanner: false,
      showFormDesc: false,
      showDesc: false,
    };
  },
  computed: {
    token() {
      return localStorage.getItem("Authorization");
    },
    headers() {
      return { Authorization: localStorage.getItem("Authorization") };
    },
  },
  mounted() {
    this.basicDataItems_url();
    if (this.uploadType === "banner") {
      this.showBanner = true;
      this.showFormDesc = false;
      this.showDesc = false;
    } else if (this.uploadType === "formDesc") {
      this.showBanner = false;
      this.showFormDesc = true;
      this.showDesc = false;
    } else if (this.uploadType === "desc") {
      this.showBanner = false;
      this.showFormDesc = false;
      this.showDesc = true;
    }
  },
  methods: {
    //选择链接
    selectLink(index, val) {
      let paramState = this.bannerLinkList.find((item) => item.id == val);
      if (paramState.isNeedParameter == 1) {
        this.bannerList[index].paramsData = [];
        this.bannerList[index].isParam = true;
      } else {
        this.bannerList[index].paramsData = [];
        this.bannerList[index].isParam = false;
      }
      const params = {
        linkId: this.bannerList[index].linkId,
        imageId: this.bannerList[index].id,
      };
      //bannerType：1 功能区，2酒店
      if (this.bannerType == 1) {
        this.$api
          .basicDataItems_urlParamsF(params)
          .then((response) => {
            const result = response.data;
            if (result.code == 0) {
              this.bannerList[index].paramsLD = result.data;
            } else {
              this.$message.error(result.msg);
            }
          })
          .catch((error) => {
            this.$alert(error, "警告", {
              confirmButtonText: "确定",
            });
          });
      } else if (this.bannerType == 2) {
        this.$api
          .basicDataItems_urlParamsH(params)
          .then((response) => {
            const result = response.data;
            if (result.code == 0) {
              this.bannerList[index].paramsLD = result.data;
            } else {
              this.$message.error(result.msg);
            }
          })
          .catch((error) => {
            this.$alert(error, "警告", {
              confirmButtonText: "确定",
            });
          });
      }
    },
    //链接参数
    linkParam(index) {
      this.bannerIndex = index;
      const params = {
        linkId: this.bannerList[index].linkId,
        imageId: this.bannerList[index].id,
      };
      //bannerType：1 功能区，2酒店
      if (this.bannerType == 1) {
        this.$api
          .basicDataItems_urlParamsF(params)
          .then((response) => {
            const result = response.data;
            if (result.code == 0) {
              this.paramsList = result.data;
              this.dialogVisibleParams = true;
            } else {
              this.$message.error(result.msg);
            }
          })
          .catch((error) => {
            this.$alert(error, "警告", {
              confirmButtonText: "确定",
            });
          });
      } else if (this.bannerType == 2) {
        this.$api
          .basicDataItems_urlParamsH(params)
          .then((response) => {
            const result = response.data;
            if (result.code == 0) {
              this.paramsList = result.data;
              this.dialogVisibleParams = true;
            } else {
              this.$message.error(result.msg);
            }
          })
          .catch((error) => {
            this.$alert(error, "警告", {
              confirmButtonText: "确定",
            });
          });
      }
    },
    EnsureParams() {
      for (let i = 0; i < this.paramsList.length; i++) {
        if (
          this.paramsList[i].isNecessary == 1 &&
          (this.paramsList[i].value == "" ||
            this.paramsList[i].value == undefined)
        ) {
          this.$message.error("请填写必填参数!");
          return false;
        }
      }
      this.bannerList[this.bannerIndex].paramsData = this.paramsList.map(
        (item) => {
          return {
            id: item.id,
            value: item.value,
          };
        }
      );
      this.dialogVisibleParams = false;
    },
    //获取图片指向链接 - 字典表
    basicDataItems_url() {
      const params = {};
      this.$api
        .basicDataItems_url(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            this.bannerLinkList = result.data.map((item) => {
              return {
                id: item.id,
                linkName: item.linkName,
                linkUrl: item.linkUrl,
                isNeedParameter: item.isNeedParameter,
              };
            });
            const linkNO = {
              id: 0,
              linkName: "无链接",
              linkUrl: "",
              isNeedParameter: 0,
            };
            this.bannerLinkList.push(linkNO);
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //图片上传成功
    handleSuccessBanner(res, file, fileList) {
      this.bannerList.push({
        id: "",
        name: file.name,
        path: file.response.data,
        url: file.url,
        linkId: 0,
        isParam: false,
        paramsData: [],
        paramsLD: [],
      });
    },
    handleSuccessDesc(res, file, fileList) {
      this.descList.push({
        name: file.name,
        path: file.response.data,
        url: file.url,
        sort: "",
      });
    },
    //移除图片
    handleRemove(file, fileList) {
      if (this.uploadType === "banner") {
        this.$emit("bannerListEvent", { fileList });
      } else {
        this.$emit("descListevent", { fileList });
      }
    },
    //文件上传之前调用 做一些拦截限制
    beforeUpload(file) {
      if (file.type != "") {
        const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (this.token) {
          if (!isJPG) {
            this.$message.error("上传的图片只能是jpg、jpeg、png格式!");
          }
          if (!isLt2M) {
            this.$message.error("上传商品图片大小不能超过 2MB!");
          }
          return isJPG && isLt2M;
        } else {
          this.$message.error("您未登录或者登录已过期!");
          this.$router.push({ path: "/login" });
        }
      } else {
        this.$message.error("文件上传失败!");
        return false;
      }
    },
    //文件超出个数限制时
    handleExceed(file, fileList) {
      this.$message.error("上传图片超出限制！");
    },
    //图片上传失败
    imgUploadError(file, fileList) {
      this.$message.error("上传图片失败！");
    },
  },
};
</script>

<style lang="less" scoped>
.bannerwrap {
  position: relative;
  .required-icon {
    color: #f56c6c;
  }
  .bannerlink {
    position: absolute;
    z-index: 10;
    top: 76px;
    left: 200px;
    .el-form-item {
      height: 102px;
      margin-bottom: 0px;
    }
  }
}
.picwrap {
  position: relative;
  .sortwrap {
    position: absolute;
    top: 78px;
    left: 280px;
    width: 25%;
    // display: inline;
    z-index: 10;
    .sortlabel {
      display: inline-block;
      margin-bottom: 60px;
      .el-form-item__label {
        width: 100px !important;
      }
      .el-form-item__content {
        margin-left: 100px !important;
      }
    }
    .sortinput {
      width: 60px;
    }
  }
}
</style>>

