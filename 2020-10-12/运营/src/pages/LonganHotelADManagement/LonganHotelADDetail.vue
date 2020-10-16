<template>
  <div class="hotelserviceadd">
    <p class="title">广告页详情</p>
    <el-form
      :model="HotelADData"
      :rules="rules"
      ref="HotelADData"
      label-width="120px"
      class="hotelform"
    >
      <el-form-item label="ID" prop="id">
        <el-input :disabled="true" v-model="HotelADData.id"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="statusName">
        <el-input :disabled="true" v-model="HotelADData.statusName"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="adName">
        <el-input :disabled="true" v-model.trim="HotelADData.adName"></el-input>
      </el-form-item>
      <el-form-item label="级别" prop="adLevel">
        <el-radio-group :disabled="true" v-model="HotelADData.adLevel" @change="selectADRank">
          <el-radio :label="0">通用</el-radio>
          <el-radio :label="1">专用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="HotelADData.adLevel == 0">
        <span slot="label">
          <label class="required-icon">*</label> 适用范围
        </span>
        <el-radio-group :disabled="true" v-model="HotelADData.adScope" @change="selectADScope">
          <el-radio :label="0" class="radioscope">平台</el-radio>
          <br />
          <el-radio :label="1" class="radioscope">特定酒店</el-radio>
          <el-button
            v-if="HotelADData.adScope == 1"
            :disabled="true"
            type="text"
            size="small"
            @click="selectHotel(1)"
          >选择酒店</el-button>
          <br />
          <el-table
            v-if="HotelADData.adScope == 1"
            :data="SelectedHotelData"
            border
            stripe
            style="width:100%;"
          >
            <el-table-column prop="hotelName" label="酒店名称" min-width="240px"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="80px" align="center">
              <template slot-scope="scope">
                <el-button
                  :disabled="true"
                  type="text"
                  size="small"
                  @click="hotelDelete(scope.row.id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-radio :label="2" class="radioscope">除特定酒店外</el-radio>
          <el-button
            v-if="HotelADData.adScope == 2"
            :disabled="true"
            type="text"
            size="small"
            @click="selectHotel(2)"
          >选择酒店</el-button>
          <el-table
            v-if="HotelADData.adScope == 2"
            :data="SelectedHotelData"
            border
            stripe
            style="width:100%;"
          >
            <el-table-column prop="hotelName" label="酒店名称" min-width="240px"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="80px" align="center">
              <template slot-scope="scope">
                <el-button
                  :disabled="true"
                  type="text"
                  size="small"
                  @click="hotelDelete(scope.row.id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="HotelADData.adLevel == 1">
        <span slot="label">
          <label class="required-icon">*</label> 酒店
        </span>
        <el-select
          :disabled="true"
          v-model="HotelADData.hotelId"
          filterable
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getHotelList()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hotelList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="引用次数" prop="userdCount">
        <el-input :disabled="true" v-model="HotelADData.userdCount"></el-input>
      </el-form-item>
      <el-form-item label="创建人" prop="createdByName">
        <el-input :disabled="true" v-model="HotelADData.createdByName"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createdAt">
        <el-input :disabled="true" v-model="HotelADData.createdAt"></el-input>
      </el-form-item>
      <el-form-item v-if="HotelADData.status != 0" label="发布人" prop="issuedByName">
        <el-input :disabled="true" v-model="HotelADData.issuedByName"></el-input>
      </el-form-item>
      <el-form-item v-if="HotelADData.status != 0" label="发布时间" prop="issuedTime">
        <el-input :disabled="true" v-model="HotelADData.issuedTime"></el-input>
      </el-form-item>
      <el-form-item v-if="HotelADData.status != 0" label="最近修改人" prop="lastUpdatedByName">
        <el-input :disabled="true" v-model="HotelADData.lastUpdatedByName"></el-input>
      </el-form-item>
      <el-form-item v-if="HotelADData.status != 0" label="最近修改时间" prop="lastUpdatedAt">
        <el-input :disabled="true" v-model="HotelADData.lastUpdatedAt"></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <label class="required-icon">*</label> 广告内容
        </span>
        <!-- <UEtor :defaultMsg="defaultMsg" :ueConfig="ueConfig" ref="ue"></UEtor> -->
        <div v-html="defaultMsg"></div>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm">返回</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="选择酒店" :visible.sync="dialogVisibleHotel" width="48%">
      <el-form :inline="true" align="left">
        <el-form-item>
          <el-input v-model="inquireHotelName" placeholder="酒店名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="HotelDataList"
        border
        stripe
        @selection-change="selectedHotel"
        style="width:100%;"
      >
        <el-table-column fixed type="selection" width="60px" align="center"></el-table-column>
        <el-table-column prop="hotelName" label="酒店名称" min-width="200px"></el-table-column>
      </el-table>
      <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
      <span slot="footer">
        <div class="scopeensure">
          <el-button @click="dialogVisibleHotel=false">取消</el-button>
          <el-button type="primary" @click="EnsureSelect">确定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LonganPagination from "@/components/LonganPagination";
import UEtor from "@/components/UEtor";
export default {
  name: "LonganHotelADDetail",
  components: {
    LonganPagination,
    UEtor,
  },
  data() {
    return {
      authzData: "",
      ADId: "",
      hotelList: [],
      loadingH: false,
      HotelADData: {},
      isSubmit: false,
      SelectedHotelData: [],
      scopeType: "",
      dialogVisibleHotel: false,
      inquireHotelName: "",
      HotelDataList: [],
      HotelIds: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      defaultMsg: null,
      ueConfig: {
        initialFrameWidth: 900,
        initialFrameHeight: 350,
      },
      rules: {
        adName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "名称请保持在30个字符以内",
            trigger: ["blur", "change"],
          },
        ],
        adLevel: [{ required: true, message: "请选择级别", trigger: "blur" }],
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
    this.ADId = this.$route.query.id;
    this.getHotelList();
    this.hotelADDetail();
  },
  methods: {
    //广告详情
    hotelADDetail() {
      const params = {};
      this.$api
        .hotelADDetail(params, this.ADId)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.HotelADData = result.data;
            if (result.data.status == 0) {
              this.HotelADData.statusName = "草稿";
              this.defaultMsg = result.data.adContent;
            } else if (result.data.status == 1) {
              this.HotelADData.statusName = "已发布";
              this.defaultMsg = result.data.adContent;
            } else if (result.data.status == 2) {
              this.HotelADData.statusName = "已修改待发布";
              this.defaultMsg = result.data.adModifyContent;
            }
            if (result.data.adLevel == 0 && result.data.adScope != 0) {
              this.SelectedHotelData = result.data.hotelDTOS.map((item) => {
                return {
                  id: item.id,
                  hotelName: item.hotelName,
                };
              });
            }
            if (result.data.adLevel == 1) {
              this.HotelADData.hotelId = result.data.hotelDTOS[0].id;
            }
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
    //选择级别
    selectADRank(val) {
      if (val == 1) {
        this.getHotelList();
      }
    },
    //选择适用范围
    selectADScope(val) {
      this.SelectedHotelData = [];
    },
    //适用范围 - 选择酒店
    selectHotel(type) {
      this.scopeType = type;
      this.inquireHotelName = "";
      this.HotelIds = [];
      this.scopeHotelList();
    },
    //搜索
    inquire() {
      this.pageNum = 1;
      this.scopeHotelList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.scopeHotelList();
    },
    //酒店列表
    scopeHotelList() {
      const params = {
        orgAs: 2,
        hotelName: this.inquireHotelName,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .hotelList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.HotelDataList = result.data.records.map((item) => {
              return {
                id: item.id,
                hotelName: item.hotelName,
              };
            });
            this.pageTotal = result.data.total;
            this.dialogVisibleHotel = true;
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
    selectedHotel(val) {
      this.HotelIds = val;
    },
    EnsureSelect() {
      this.SelectedHotelData = this.HotelIds;
      this.dialogVisibleHotel = false;
    },
    //适用范围 - 删除
    hotelDelete(id) {
      let deleteIndex = this.SelectedHotelData.findIndex(
        (item) => item.id == id
      );
      this.SelectedHotelData.splice(deleteIndex, 1);
    },
    //获取酒店信息
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        hotelName: hName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .hotelList(params)
        .then((response) => {
          this.loadingH = false;
          const result = response.data;
          if (result.code == 0) {
            this.hotelList = result.data.records.map((item) => {
              return {
                id: item.id,
                hotelName: item.hotelName,
              };
            });
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
    remoteHotel(val) {
      this.getHotelList(val);
    },

    //修改广告页
    submitForm(HotelADData) {
      let that = this;
      let UEContent = that.$refs.ue.getUEContent();

      let hotelInfo;
      if (this.HotelADData.adLevel == 0) {
        hotelInfo = this.SelectedHotelData;
      } else {
        hotelInfo = [{ id: this.HotelADData.hotelId }];
      }
      const params = {
        adName: this.HotelADData.adName,
        adLevel: this.HotelADData.adLevel,
        adScope: this.HotelADData.adScope,
        hotelDTOS: hotelInfo,
        adModifyContent: UEContent,
      };
      this.$refs[HotelADData].validate((valid) => {
        if (valid) {
          if (this.HotelADData.adLevel == 0) {
            if (this.HotelADData.adScope == undefined) {
              this.$message.error("请选择适用范围！");
              return false;
            } else {
              if (this.HotelADData.adScope != 0) {
                if (this.SelectedHotelData.length == 0) {
                  this.$message.error("请选择酒店！");
                  return false;
                }
              }
            }
          } else if (this.HotelADData.adLevel == 1) {
            if (this.HotelADData.hotelId == undefined) {
              this.$message.error("请选择酒店！");
              return false;
            }
          }
          if (UEContent == "") {
            this.$message.error("请输入广告内容！");
            return false;
          }
          // console.log(params);
          // return
          this.isSubmit = true;
          this.$api
            .hotelADModify(params, this.ADId)
            .then((response) => {
              // console.log(response);
              const result = response.data;
              if (result.code == 0) {
                this.$message.success("修改广告页成功！");
                this.$router.push({ name: "LonganHotelADList" });
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消
    resetForm() {
      this.$router.push({ name: "LonganHotelADList" });
    },
  },
};
</script>

<style>
.edui-default .edui-toolbar .edui-combox .edui-combox-body {
  line-height: 22px;
}
</style>

<style lang="less" scoped>
.hotelserviceadd {
  text-align: left;
  .title {
    font-weight: bold;
  }
  .hotelform {
    width: 45%;
    .radioscope {
      line-height: 40px;
    }
  }
  .required-icon {
    color: #f56c6c;
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  .scopeensure {
    text-align: center;
  }
}
</style>

