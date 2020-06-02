 <template>
  <div class="deptmodify">
    <h2 class="align-left">修改部门信息</h2>
    <el-form
      :model="deptDataModify"
      :rules="rules"
      ref="deptDataModify"
      label-width="80px"
      class="deptform"
    >
      <el-form-item label="上级部门" prop="parentId">
        <el-select v-model="deptDataModify.parentId" placeholder="请选择">
          <el-option
            :label="item.deptName"
            v-for="item in deptDataList"
            :key="item.id"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="deptDataModify.deptName"></el-input>
      </el-form-item>
      <el-form-item label="部门描述" prop="deptDesc">
        <el-input v-model="deptDataModify.deptDesc"></el-input>
      </el-form-item>
      <el-form-item label="部门角色" prop="deptRole">
        <el-checkbox-group v-model="deptRole">
          <el-checkbox
            :label="item.id"
            :value="item.id"
            v-for="item in roleDataList"
            :key="item.roleName"
          >{{item.roleName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="部门类型" prop="deptType">
        <el-select v-model="deptDataModify.deptType" placeholder="请选择">
          <el-option label="分公司" value="1"></el-option>
          <el-option label="职能部门" value="2"></el-option>
        </el-select>
      </el-form-item>
        <el-button @click="resetForm('deptDataModify')" class="cancel-btn">取消</el-button>
        <el-button class="btn-mid" type="primary" :disabled="isSubmit" v-if="dataAuth['F:BJ_USERDEPART_UPDATE_APPROVE']" @click="submitForm('deptDataModify')">确定</el-button>
    </el-form>
  </div>
</template>

<script>
import privilegeApi from "../../request/api.js";
export default {
  name: "departmentModify",
  data() {
    return {
      deptId: "",
      deptDataList: [],
      roleDataList: [],
      isSubmit: false,
      deptDataModify: {
        parentId: "",
        deptName: "",
        deptDesc: "",
        deptType: "1"
      },
      dataAuth:{
         
      },
      deptRole: [],
      rules: {
        deptName: [
          { required: true, message: "请填写部门名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "部门名称请保持在10个字符以内",
            trigger: "blur"
          }
        ],
        deptRole: [
          { required: true, message: "请选择部门角色", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.deptId = this.$route.params.id;
    this.getdeptInfo();
    this.deptList();
    this.roleList();
    this.dataAuth = this.$store.state.authData;

  },
  methods: {
    //获取部门列表
    deptList() {
      privilegeApi
        .deptList()
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.deptDataList = result.data;
          } else {
            this.$message.error("获取部门列表失败！");
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //获取角色列表
    roleList() {
      privilegeApi
        .roleList()
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.roleDataList = result.data.records;
          } else {
            this.$message.error("获取角色列表失败！");
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //获取部门信息
    getdeptInfo() {
      const id = this.deptId;
      privilegeApi
        .deptDetail(id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.deptDataModify = result.data;
            this.deptRole = JSON.parse(result.data.deptRole);
            this.deptDataModify.deptType = JSON.stringify(result.data.deptType);
          } else {
            this.$message.error("获取部门信息失败！");
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //确定-修改部门信息
    submitForm(deptDataModify) {
      let that = this;
      if (that.deptRole.length== 0) {
        this.$message({
          message: "请选择部门角色",
          type: "warning"
        });
        return;
      }
      const params = {
        parentId: that.deptDataModify.parentId,
        deptName: that.deptDataModify.deptName,
        deptDesc: that.deptDataModify.deptDesc,
        deptRole: JSON.stringify(that.deptRole),
        deptType: that.deptDataModify.deptType
      };
      const id = that.deptId;
      this.$refs[deptDataModify].validate(valid => {
        if (valid) {
          this.isSubmit = true;
          privilegeApi
            .deptModify(params, id)
            .then(response => {
              const result = response.data;
              if (result.code == "0") {
                that.$message.success("修改部门信息成功！");
                that.$router.push({ name: "department" });
              } else {
                this.isSubmit = false;
                that.$message.error("修改部门信息失败！");
              }
            })
            .catch(error => {
              this.isSubmit = false;
              that.$alert(error, "警告", {
                confirmButtonText: "确定"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消
    resetForm(deptDataModify) {
      this.$router.push({ name: "department" });
    }
  }
};
</script>

<style lang="less" scoped>
.deptmodify {
  text-align: left;
  .title {
    font-weight: bold;
    text-align: left;
    font-size: 26px;
  }
  .deptform {
    width: 42%;
  }
}
</style>

