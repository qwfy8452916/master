<template>
  <div class="classify">
    <div class="module-header">
      <div class="top"><span class="caption">预算类目管理</span><div class="r mr-10"><el-button type="success" @click="createClassify">添加顶级类目</el-button></div></div>
    </div>
    <el-row class="mt-20" style="height: 35px; line-height: 35px;">
      <el-col :span="12">类目名称</el-col>
      <el-col :span="12" class="text-right" style="padding-right: 60px;">操作</el-col>
    </el-row>
    <el-tree
      v-loading="loading"
      :data="data"
      :props="defaultProps"
      :expand-on-click-node="false"
      default-expand-all
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            v-if="parseInt(data.type) !== 2"
            type="text"
            size="mini"
            @click="() => createSubClassify(node, data)">
            新增分类/项目
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => editClassifyAction(node, data)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => handleDelClick(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <!--新增/编辑顶级类目弹窗-->
    <el-dialog :visible.sync="classifyVisible" title="新建顶级分类" class="classify-action" @close="closeTopClassifyForm">
      <el-form v-loading="topLoading" ref="ruleForm" :model="topClassifyForm" :rules="topClassifyRules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="类目名称：" prop="classifyName">
          <el-input v-model="topClassifyForm.classifyName"/>
        </el-form-item>
        <el-form-item label="排序值：" prop="sort">
          <el-input v-model="topClassifyForm.sort"/>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button type="primary" @click="submitTopClassifyForm('ruleForm')">保存</el-button>
          <el-button @click="resetTopClassifyForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--新增/编辑顶级类目弹窗-->
    <el-dialog :visible.sync="subClassifyVisible" title="新建分类/项目" class="classify-action" @close="closeSubClassifyForm">
      <el-tabs v-model="activeName">
        <el-tab-pane label="分类" name="first">
          <el-form v-loading="subClassifyLoading" ref="classifyRuleForm" :model="classifyForm" :rules="classifyRules" label-width="100px" class="demo-ruleForm mt-20">
            <el-form-item label="类目名称：" prop="classifyName">
              <el-input v-model="classifyForm.classifyName"/>
            </el-form-item>
            <el-form-item label="排序值：" prop="sort">
              <el-input v-model="classifyForm.sort"/>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="submitSubClassifyForm('classifyRuleForm')">保存</el-button>
              <el-button @click="resetSubClassifyForm('classifyRuleForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="项目" name="second">
          <el-form v-loading="subItemLoading" ref="itemRuleForm" :model="itemForm" :rules="itemRules" label-width="100px" class="demo-ruleForm mt-20">
            <el-form-item label="类目名称：" prop="classifyName">
              <el-input v-model="itemForm.classifyName"/>
            </el-form-item>
            <el-form-item label="计量方式：" prop="calc">
              <el-radio v-model="itemForm.calc" label="1">面积</el-radio>
              <el-radio v-model="itemForm.calc" label="2">数量</el-radio>
            </el-form-item>
            <el-form-item label="面积比例：" prop="areaRate">
              <el-input v-model="itemForm.areaRate" placeholder="请输入数字">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="适用区域：" prop="fixedPos">
              <el-radio v-model="itemForm.fixedPos" label="kt">客厅</el-radio>
              <el-radio v-model="itemForm.fixedPos" label="cf">厨房</el-radio>
              <el-radio v-model="itemForm.fixedPos" label="ws">卧室</el-radio>
              <el-radio v-model="itemForm.fixedPos" label="wsj">卫生间</el-radio>
              <el-radio v-model="itemForm.fixedPos" label="yt">阳台</el-radio>
            </el-form-item>
            <el-form-item label="排序值：" prop="sort">
              <el-input v-model="itemForm.sort"/>
            </el-form-item>
            <el-form-item label="" prop="name">
              <el-button type="primary" @click="submitSubClassifyForm('itemRuleForm')">保存</el-button>
              <el-button @click="resetSubClassifyForm('itemRuleForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import { fetchClassifyList, fetchTopClassifyAdd, fetchTopClassifyEdit, fetchClassifyDel } from '@/api/budget'
import { filterSpecialSymbal } from '@/utils/index'
const validateInteger = (rule, value, callback) => {
  if (!value) {
    return new Error('排序值不能为空，请输入')
  } else {
    if (value < 1 || !Number.isInteger(Number(value))) {
      callback(new Error('排序值输入有误'))
    } else {
      callback()
    }
  }
}
export default {
  name: 'Classify',
  data() {
    return {
      data: null,
      defaultProps: {
        children: 'children',
        label: 'cate_name'
      },
      classifyVisible: false,
      topClassifyForm: {
        classifyName: '',
        sort: ''
      },
      topClassifyRules: {
        classifyName: [
          { required: true, message: '请输入类目名称', trigger: 'blur' },
          { min: 1, max: 80, message: '类目名称仅支持输入80位', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序值', trigger: 'blur' },
          { validator: validateInteger, trigger: 'blur' }
        ]
      },
      subClassifyVisible: false,
      classifyForm: {
        classifyName: '',
        sort: ''
      },
      classifyRules: {
        classifyName: [
          { required: true, message: '请输入类目名称', trigger: 'blur' },
          { min: 1, max: 80, message: '类目名称仅支持输入80位', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序值', trigger: 'blur' },
          { validator: validateInteger, trigger: 'blur' }
        ]
      },
      itemForm: {
        classifyName: '',
        calc: '',
        areaRate: '',
        fixedPos: '',
        sort: ''
      },
      itemRules: {
        classifyName: [
          { required: true, message: '请输入类目名称', trigger: 'blur' },
          { min: 1, max: 80, message: '项目名称仅支持输入80位', trigger: 'blur' }
        ],
        calc: [
          { required: true, message: '请选择计量方式', trigger: 'change' }
        ],
        areaRate: [
          { required: true, message: '请输入面积比例', trigger: 'blur' }
        ],
        fixedPos: [
          { required: true, message: '请选择适用区域', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '请输入排序值', trigger: 'blur' },
          { validator: validateInteger, trigger: 'blur' }
        ]
      },
      activeName: 'first',
      parentId: '',
      loading: false,
      topLoading: false,
      subClassifyLoading: false,
      subItemLoading: false,
      isEdit: false,
      itemId: ''
    }
  },
  watch: {
    'topClassifyForm.classifyName'(val) {
      this.$nextTick(() => {
        this.topClassifyForm.classifyName = filterSpecialSymbal(val)
      })
    },
    'topClassifyForm.sort'(val) {
      this.$nextTick(() => {
        this.topClassifyForm.sort = filterSpecialSymbal(val)
      })
    },
    'classifyForm.classifyName'(val) {
      this.$nextTick(() => {
        this.classifyForm.classifyName = filterSpecialSymbal(val)
      })
    },
    'classifyForm.sort'(val) {
      this.$nextTick(() => {
        this.classifyForm.sort = filterSpecialSymbal(val)
      })
    },
    'itemForm.classifyName'(val) {
      this.$nextTick(() => {
        this.itemForm.classifyName = filterSpecialSymbal(val)
      })
    },
    'itemForm.sort'(val) {
      this.$nextTick(() => {
        this.itemForm.sort = filterSpecialSymbal(val)
      })
    },
    'itemForm.areaRate'(val) {
      this.$nextTick(() => {
        this.itemForm.areaRate = String(this.itemForm.areaRate).replace(/[^\d.]*/g, '')
      })
    }
  },
  created() {
    this.fetchClassifyList()
  },
  methods: {
    createClassify() {
      this.classifyVisible = true
    },
    createSubClassify(node, data) {
      this.subClassifyVisible = true
      this.parentId = data.id
    },
    fetchClassifyList(query) {
      this.loading = true
      fetchClassifyList().then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.data = res.data.data
          this.loading = false
        }
      })
    },
    fetchClassifyAdd(query, tag, cb) {
      if (tag === 'ruleForm') {
        this.topLoading = true
      } else if (tag === 'classifyRuleForm') {
        this.subClassifyLoading = true
      } else if (tag === 'itemRuleForm') {
        this.subItemLoading = true
      }
      fetchTopClassifyAdd(query).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          cb && cb.call(this)
          if (tag === 'ruleForm') {
            this.classifyVisible = false
            this.topLoading = false
          } else if (tag === 'classifyRuleForm') {
            this.subClassifyLoading = false
            this.subClassifyVisible = false
          } else if (tag === 'itemRuleForm') {
            this.subItemLoading = false
            this.subClassifyVisible = false
          }
          this.fetchClassifyList()
        }
      })
    },
    fetchClassifyEdit(query, tag, cb) {
      if (tag === 'ruleForm') {
        this.topLoading = true
      } else if (tag === 'classifyRuleForm') {
        this.subClassifyLoading = true
      } else if (tag === 'itemRuleForm') {
        this.subItemLoading = true
      }
      fetchTopClassifyEdit(query).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          cb && cb.call(this)
          if (tag === 'ruleForm') {
            this.classifyVisible = false
            this.topLoading = false
          } else if (tag === 'classifyRuleForm') {
            this.subClassifyLoading = false
            this.subClassifyVisible = false
          } else if (tag === 'itemRuleForm') {
            this.subItemLoading = false
            this.subClassifyVisible = false
          }
          this.fetchClassifyList()
        }
      })
    },
    fetchClassifyDel(id, cb) {
      const query = {
        id: id
      }
      this.loading = true
      fetchClassifyDel(query).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          cb && cb.call(this)
        } else {
          this.$message.error(res.data.error_msg)
        }
        this.loading = false
      })
    },
    submitTopClassifyForm(formName) {
      const queryObj = {
        type: 1,
        cate_name: this.topClassifyForm.classifyName,
        sort: parseInt(this.topClassifyForm.sort),
        grade: 1
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.isEdit) {
            this.fetchClassifyAdd(queryObj, formName, () => {
              this.topClassifyForm.classifyName = ''
              this.topClassifyForm.sort = ''
            })
          } else {
            const editQuery = Object.assign({}, queryObj, {
              id: this.itemId
            })
            this.fetchClassifyEdit(editQuery, formName, () => {
              this.topClassifyForm.classifyName = ''
              this.topClassifyForm.sort = ''
            })
            this.closeDialog()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetTopClassifyForm(formName) {
      this.classifyVisible = false
      this.closeDialog()
    },
    submitSubClassifyForm(formName) {
      let queryObj = null
      if (formName === 'classifyRuleForm') {
        queryObj = {
          type: 1,
          cate_name: this.classifyForm.classifyName,
          sort: parseInt(this.classifyForm.sort),
          parent_id: parseInt(this.parentId),
          grade: 2
        }
      } else if (formName === 'itemRuleForm') {
        queryObj = {
          type: 2,
          cate_name: this.itemForm.classifyName,
          sort: parseInt(this.itemForm.sort),
          count_type: parseInt(this.itemForm.calc),
          area_ratio: parseFloat(this.itemForm.areaRate),
          suit_area: this.itemForm.fixedPos,
          parent_id: parseInt(this.parentId),
          grade: 3
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.isEdit) {
            this.fetchClassifyAdd(queryObj, formName, () => {
              if (formName === 'classifyRuleForm') {
                this.classifyForm.classifyName = ''
                this.classifyForm.sort = ''
                this.parentId = ''
              } else if (formName === 'itemRuleForm') {
                this.itemForm.classifyName = ''
                this.itemForm.sort = ''
                this.itemForm.calc = ''
                this.itemForm.areaRate = ''
                this.itemForm.fixedPos = ''
                this.parentId = ''
              }
            })
          } else {
            const editQuery = Object.assign({}, queryObj, {
              id: this.itemId
            })
            this.fetchClassifyEdit(editQuery, formName, () => {
              if (formName === 'classifyRuleForm') {
                this.classifyForm.classifyName = ''
                this.classifyForm.sort = ''
                this.parentId = ''
              } else if (formName === 'itemRuleForm') {
                this.itemForm.classifyName = ''
                this.itemForm.sort = ''
                this.itemForm.calc = ''
                this.itemForm.areaRate = ''
                this.itemForm.fixedPos = ''
                this.parentId = ''
              }
              this.closeDialog()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetSubClassifyForm(formName) {
      this.subClassifyVisible = false
      this.closeDialog()
    },
    editClassifyAction(node, data) {
      if (parseInt(data.type) === 2) {
        this.subClassifyVisible = true
        this.activeName = 'second'
        this.itemForm.classifyName = data.cate_name
        this.itemForm.calc = String(data.count_type)
        this.itemForm.areaRate = data.area_ratio
        this.itemForm.fixedPos = data.suit_area
        this.itemForm.sort = data.sort
        this.parentId = node.parent.data.id
      } else if (parseInt(data.type) === 1) {
        this.subClassifyVisible = true
        this.activeName = 'first'
        this.classifyForm.classifyName = data.cate_name
        this.classifyForm.sort = data.sort
        this.parentId = node.parent.data.id
      } else {
        this.classifyVisible = true
        this.topClassifyForm.classifyName = data.cate_name
        this.topClassifyForm.sort = data.sort
      }
      this.isEdit = true
      this.itemId = data.id
    },
    handleDelClick(node, data) {
      this.$confirm('您确认删除吗', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.fetchClassifyDel(data.id, () => {
            this.fetchClassifyList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    closeTopClassifyForm() {
      this.closeDialog()
      this.topClassifyForm.classifyName = ''
      this.topClassifyForm.sort = ''
    },
    closeSubClassifyForm() {
      this.closeDialog()
      this.classifyForm.classifyName = ''
      this.classifyForm.sort = ''
      this.itemForm.classifyName = ''
      this.itemForm.calc = ''
      this.itemForm.areaRate = ''
      this.itemForm.fixedPos = ''
      this.itemForm.sort = ''
    },
    closeDialog() {
      this.isEdit = false
      this.itemId = ''
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .classify{
    margin:30px;
    .custom-tree-node{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 8px;
      font-size: 14px;
      height: 35px;
    }
  }
</style>
