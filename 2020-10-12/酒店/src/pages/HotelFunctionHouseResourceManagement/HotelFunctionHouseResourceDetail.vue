<template>
  <div class="HotelFunctionHouseResourceDetail">
    <p class="title">功能区房源详情</p>
    <el-form
      align="left"
      label-width="140px"
      :model="formdata"
      ref="formdata"
      class="HotelFunctionHouseResourceDetailWid"
    >
      <el-form-item label="功能区名称">
        <el-select
          v-model="formdata.inquireFunctionName"
          filterable
          :disabled="true"
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
      <el-form-item label="房型名称">
        <el-select
          v-model="formdata.inquireBookType"
          filterable
          :disabled="true"
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
      <el-form-item label="房源名称">
        <el-select
          v-model="formdata.inquireHouseRerource"
          filterable
          :disabled="true"
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
      <el-form-item label="排序" class="sortForm">
        <el-input :disabled="true" placeholder="请输入排序" v-model.number="formdata.sort" maxlength="9"></el-input>
      </el-form-item>
      <el-form-item label="创建人" class="sortForm">
        <el-input :disabled="true" placeholder="请输入创建人" v-model="formdata.createdBy" ></el-input>
      </el-form-item>
      <el-form-item label="创建时间" class="sortForm">
        <el-input :disabled="true" placeholder="请输入创建时间" v-model="formdata.createdAt" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cacel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HotelFunctionHouseResourceDetail",
  data() {
    return {
      functionOptions: [], //功能区名称options
      houseResourceOptions: [], //房源名称options
      bookTypeOptions: [], //房型options
      formdata: {
        inquireHotelName: "",
        inquireFunctionName: "",
        inquireHouseRerource: "",
        inquireBookType: "",
        sort: 0,
      },
    };
  },
  mounted() {
    this.hotelId = this.$route.query.id;
    this.getFunctionHouseResourceDetails();
  },
  methods: {
    getFunctionHouseResourceDetails() {
      let id = this.hotelId;
      const params = {};
      this.$api
        .bookFuncResourceDetail(params, id)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            let data = result.data;
            this.formdata = {
              inquireHotelName: data.hotelName,
              inquireFunctionName: data.funcName,
              inquireHouseRerource: data.roomResource.resourceName,
              inquireBookType: data.roomType.typeName,
              sort: data.sort,
              createdAt:data.roomResource.createdAt,
              createdBy:data.roomResource.createdBy,
            };
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          })
        });
    },
    //取消
    cacel() {
      this.$router.push({ name: "HotelFunctionHouseResourceList" });
    },
    
  },
};
</script>
<style lang="less" scoped>
.HotelFunctionHouseResourceDetail {
  .HotelFunctionHouseResourceDetailWid {
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



