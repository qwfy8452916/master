<template>
  <div class="HotelFunctionHouseResourceAdd">
    <p class="title">添加功能区房源</p>
    <el-form
      align="left"
      label-width="140px"
      :model="formdata"
      :rules="rules"
      ref="formdata"
      class="HotelFunctionHouseResourceAddWid"
    >
      <el-form-item label="功能区名称" prop="inquireFunctionName">
        <el-select
          v-model="formdata.inquireFunctionName"
          filterable
          remote
          :remote-method="remoteFunction"
          :loading="loadingF"
          @focus="getHotelFunctionList()"
          placeholder="请选择功能区"
        >
          <el-option
            v-for="item in functionOptions"
            :key="item.id"
            :label="item.funcCnName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房型名称" prop="inquireBookType">
        <el-select
          v-model="formdata.inquireBookType"
          filterable
          remote
          :remote-method="remoteBookType"
          :loading="loadingT"
          @focus="getBookTypeList()"
          @change="changeBookType()"
          placeholder="请选择房型"
        >
          <el-option
            v-for="item in bookTypeOptions"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房源名称" prop="inquireHouseRerource">
        <el-select
          v-model="formdata.inquireHouseRerource"
          filterable
          remote
          :remote-method="remoteBookResource"
          :loading="loadingB"
          @focus="getBookResourceList()"
          placeholder="请选择房源"
        >
          <el-option
            v-for="item in houseResourceOptions"
            :key="item.id"
            :label="item.resourceName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sort" class="sortForm">
        <el-input placeholder="请输入排序" v-model.number="formdata.sort" maxlength="9"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cacel">取消</el-button>
        <el-button type="primary" :disabled="isSubmit" @click="surebtn('formdata')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HotelFunctionHouseResourceAdd",
  data() {
    return {
      authzData: "",
      functionOptions: [], //功能区名称options
      houseResourceOptions: [], //房源名称options
      bookTypeOptions: [], //房型options
      isSubmit: false,
      loadingF: false,
      loadingT: false,
      loadingB: false,
      hotelId: "",
      formdata: {
        inquireFunctionName: "",
        inquireHouseRerource: "",
        inquireBookType: "",
        sort: 0,
      },
      rules: {
        inquireFunctionName: {
          required: true,
          message: "请选择功能区名称",
          trigger: ["blur", "change"],
        },
        inquireBookType: {
          required: true,
          message: "请选择房型",
          trigger: "change",
        },
        inquireHouseRerource: {
          required: true,
          message: "请选择房源",
          trigger: "change",
        },
        sort: [
          {
            type: "number",
            message: "请输入数字",
            trigger: ["blur", "change"],
          },
        ],
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
    this.getHotelFunctionList();
    // this.getBookResourceList();
    this.getBookTypeList();
    this.hotelId = localStorage.getItem("hotelId");
  },
  methods: {
    changeBookType() {
      this.formdata.inquireHouseRerource = "";
      this.getBookResourceList();
    },
    surebtn(formdata) {
      let that = this;
      this.$refs[formdata].validate((valid, model) => {
        if (valid) {
          let params = {
            sort: 0,
            hotelId: this.hotelId,
            funcId: this.formdata.inquireFunctionName,
            roomResourceId: this.formdata.inquireHouseRerource,
            roomTypeId: this.formdata.inquireBookType,
          };
          this.isSubmit = true;
          that.$api
            .bookFuncResourceAdd(params)
            .then((response) => {
              const result = response.data;
              if (result.code == 0) {
                this.$message.success("添加功能区房源成功！");
                that.$router.push({
                  name: "HotelFunctionHouseResourceList",
                });
              } else {
                this.$message.error(result.msg);
                this.isSubmit = false;
              }
            })
            .catch((error) => {
              this.isSubmit = false;
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        } else {
          console.log("error");
          return false;
        }
      });
    },
    //取消
    cacel() {
      this.$router.push({ name: "HotelFunctionHouseResourceList" });
    },
    //房源列表
    getBookResourceList(bName) {
      this.inquireHouseRerource = "";
      this.houseResourceOptions = [];
      if (this.formdata.inquireBookType == "") {
        this.$message.warning("请先选择房型！");
        return false;
      }
      this.loadingB = true;
      const params = {
        orgAs: 3,
        hotelId: this.hotelId,
        resourceName: bName,
        typeId: this.formdata.inquireBookType,
      };
      this.$api
        .bookResourceList(params)
        .then((response) => {
          this.loadingB = false;
          const result = response.data;
          if (result.code == 0) {
            this.houseResourceOptions = result.data.records.map((item) => {
              return {
                id: item.id,
                resourceName: item.resourceName,
              };
            });
            const bookResourceAll = {
              id: "",
              resourceName: "全部",
            };
            this.houseResourceOptions.unshift(bookResourceAll);
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
    //获取功能区通过类型funcType=2为订单类型
    getHotelFunctionList(fName) {
      this.inquireFunctionName = "";
      this.functionOptions = [];
      const params = {
        funcCnName: fName,
        hotelId: this.hotelId,
        funcType: 2,
      };
      this.loadingF = true;
      this.$api
        .getFuncType({ params })
        .then((response) => {
          this.loadingF = false;
          if (response.data.code == 0) {
            let recordsData = response.data.data;
            let areaList = recordsData.map((item) => {
              return {
                funcCnName: item.funcCnName,
                id: item.id,
              };
            });
            areaList.unshift({
              funcCnName: "全部",
              id: "",
            });
            this.functionOptions = areaList;
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
    },
    //获取房型列表
    getBookTypeList(bname) {
      this.inquireBookType = "";
      this.bookTypeOptions = [];
      const params = {
        typeName: bname,
        hotelId: this.hotelId,
      };
      this.loadingT = true;
      this.$api
        .getBookTypeList(params)
        .then((response) => {
          this.loadingT = false;
          if (response.data.code == 0) {
            let recordsData = response.data.data;
            let areaList = recordsData.map((item) => {
              return {
                id: item.id,
                typeName: item.typeName,
              };
            });
            areaList.unshift({
              typeName: "全部",
              id: "",
            });
            this.bookTypeOptions = areaList;
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
    },
    remoteBookResource(val) {
      this.getBookResourceList(val);
    },
    remoteFunction(val) {
      this.getHotelFunctionList(val);
    },
    remoteBookType(val) {
      this.getBookTypeList(val);
    },
  },
};
</script>
<style lang="less" scoped>
.HotelFunctionHouseResourceAdd {
  .HotelFunctionHouseResourceAddWid {
    width: 60%;
  }
}
.sortForm {
  width: 357px;
}
.title {
  font-weight: bold;
  text-align: left;
}
</style>



