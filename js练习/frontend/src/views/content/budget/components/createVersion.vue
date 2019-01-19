<template>
  <div class="create-version">
    <div class="module-header">
      <div class="top"><span class="caption"><router-link to="/content/budget-version">预算版本管理</router-link> > 新建/编辑预算版本</span></div>
    </div>
    <div class="form-block  mt-20">
      <el-form ref="ruleForm" :model="rulesForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="版本名称：" prop="versionName">
          <el-input v-model="rulesForm.versionName"/>
        </el-form-item>
        <el-row class="mt-20">
          <el-col :span="8">类目名称</el-col>
          <el-col :span="8" class="text-center ">计量方式</el-col>
          <el-col :span="8" class="text-center "><span class="red">*</span>单价</el-col>
        </el-row>
        <el-tree
          v-loading="loading"
          :data="data"
          :props="defaultProps"
          :expand-on-click-node="false"
          default-expand-all
        >
          <div slot-scope="{ node, data }" class="custom-tree-node">
            <div style="width: 33.33%">{{ node.label }}</div>
            <div style="width: 33.33%" class="text-center">{{ data.count_type | switchCountType }}</div>
            <div v-if="data.count_type" style="width: 33.33%"><el-input :value="data.version_price" class="single-price" @blur="(event) => priceAction(node, data, event)"/></div>
            <div v-else class="text-center" style="width: 33.33%">--</div>
          </div>
        </el-tree>
        <el-form-item label="排序值：" prop="sort" class="mt-20">
          <el-input v-model="rulesForm.sort" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { fetchVersionAdd, fetchVersionEdit, fetchClassifyList, fetchVersionDetail } from '@/api/budget'
import { filterCateDetail, filterSpecialSymbal } from '@/utils/index'
export default {
  name: 'CreateVersion',
  filters: {
    switchCountType(val) {
      if (!val) {
        return '--'
      }
      switch (val) {
        case 1:
          val = '面积'
          break
        case 2:
          val = '数量'
          break
      }
      return val
    }
  },
  data() {
    return {
      data: null,
      calc: '',
      defaultProps: {
        children: 'children',
        label: 'cate_name'
      },
      rulesForm: {
        versionName: '',
        sort: ''
      },
      rules: {
        versionName: [
          { required: true, message: '版本名称不能为空，请输入', trigger: 'blur' },
          { min: 0, max: 8, message: '版本名称仅支持输入80位', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '排序值不能为空，请输入', trigger: 'blur' }
        ]
      },
      cate_detail: [],
      singlePrice: '',
      versionId: '',
      loading: false
    }
  },
  watch: {
    versionId() {
      if (this.versionId) {
        this.fetchVersionDetail()
      }
    },
    'rulesForm.versionName'(val) {
      this.$nextTick(() => {
        this.rulesForm.versionName = filterSpecialSymbal(val)
      })
    },
    'rulesForm.sort'(val) {
      this.$nextTick(() => {
        this.rulesForm.sort = filterSpecialSymbal(val)
      })
    }
  },
  created() {
    if (this.$route.params.id) {
      this.versionId = this.$route.params.id
    } else {
      this.fetchClassifyList()
    }
    this.filterPrice()
  },
  methods: {
    fetchClassifyList() {
      this.loading = true
      fetchClassifyList().then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.data = res.data.data
          this.loading = false
        }
      })
    },
    fetchVersionAdd() {
      this.loading = true
      fetchVersionAdd({
        version_name: this.rulesForm.versionName,
        sort: this.rulesForm.sort,
        cate_detail: this.cate_detail
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$router.push('/content/budget-version')
          this.loading = false
        }
      })
    },
    fetchVersionEdit() {
      this.loading = true
      fetchVersionEdit({
        version_name: this.rulesForm.versionName,
        sort: this.rulesForm.sort,
        cate_detail: this.cate_detail,
        id: this.versionId
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$router.push('/content/budget-version')
          this.loading = false
        }
      })
    },
    fetchVersionDetail() {
      this.loading = true
      fetchVersionDetail({
        id: this.versionId
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.data = res.data.data.cate_detail
          this.rulesForm.versionName = res.data.data.version_name
          this.rulesForm.sort = res.data.data.sort
          this.loading = false
          this.cate_detail = filterCateDetail(res.data.data.cate_detail)
        }
      })
    },
    submitForm(formName) {
      let priceEmpty = false
      const singlePrice = document.getElementsByClassName('single-price')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (let i = 0; i < singlePrice.length; i++) {
            if (!singlePrice[i].getElementsByTagName('input')[0].value) {
              priceEmpty = true
            }
          }
          if (priceEmpty) {
            this.$message.error('价格不能为空，请输入')
            return
          }
          if (this.versionId) {
            this.fetchVersionEdit()
          } else {
            this.fetchVersionAdd()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$router.push('/content/budget-version')
    },
    priceAction(node, data, e) {
      let isDeal = false
      this.cate_detail.forEach((item, index) => {
        if (parseInt(item.cate_id) === parseInt(data.id)) {
          if (!e.target.value) {
            this.cate_detail.splice(index, 1)
          } else {
            item.version_price = e.target.value
          }
          isDeal = true
        }
      })
      if (!isDeal) {
        this.cate_detail.push({
          cate_id: data.id,
          version_price: e.target.value
        })
      }
    },
    filterPrice() {
      document.addEventListener('keyup', function(event) {
        event.target.value = event.target.value.replace(/[^\d.]*/g, '')
      }, false)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-tree-node__content{
    height: 60px;
    overflow: hidden;
  }
  .create-version{
    margin: 30px;
    .el-row{
      margin-top: 20px;
    }
    .custom-tree-node{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 8px;
      height: 52px;
      line-height: 52px;
    }
  }
</style>
