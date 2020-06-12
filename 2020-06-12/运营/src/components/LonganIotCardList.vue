<template>
   <div class="iotCardList">
       <el-form :inline="true" align="left">
          <el-form-item label="控制板物联卡卡号">
              <el-input v-model="iotcardval"></el-input>
          </el-form-item>
          <el-form-item label="禁/启用状态">
              <el-select v-model="isActive">
                <el-option value="" label="全部"></el-option>
                <el-option value="0" label="禁用"></el-option>
                <el-option value="1" label="启用"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="inquire">查询</el-button>
          </el-form-item>
          <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
       </el-form>
       <div>
           <el-button class="addbutton" v-if="authzData['F:BO_CAB_IOTCARD_ADD']" @click="addbtn">新增</el-button>
       </div>
       <el-table
          :data="dataList"
          border
          stripe
          style="width:100%">
          <el-table-column prop="ccid" label="控制板物联卡号" align="center"></el-table-column>
          <el-table-column label="禁/启用" align="center">
               <template slot-scope="scope">
                    <el-switch v-if="authzData['F:BO_CAB_IOTCARD_SWITCH']" v-model="scope.row.isActive" @change="changeStatus(scope.row.id,scope.row.isActive,scope.$index)"></el-switch>
               </template>
          </el-table-column>
          <el-table-column label="禁用原因" align="center">
               <template slot-scope="scope">
                 {{scope.row.isActive?'-':scope.row.forbiddenReason}}
               </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
               <template slot-scope="scope">
                    <el-button type="text" v-if="authzData['F:BO_CAB_IOTCARD_MODIFY']" @click="changeiotcard(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_CAB_IOTCARD_DELETE']" type="text" @click="deliotcard(scope.row.id)">删除</el-button>
               </template>
          </el-table-column>
       </el-table>
       <div class="pagination">
          <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              :pager-count = "11"
              :page-size="10"
              :total="pageTotal"
              :current-page.sync="currentPage"
              @current-change = "current"
              @prev-click="prev"
              @next-click="next">
          </el-pagination>
        </div>

        <el-dialog title="新增" @close="dialogcreatedit=false;formdata.iotcardval=''" :visible.sync="dialogcreatedit" width="40%" center>
            <el-form :model="formdata" :rules="rules" ref="formdata">
                <el-form-item label="控制板物联卡号" label-width="150px" prop="iotcardval">
                    <el-input maxlength="20" v-model="formdata.iotcardval"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogcreatedit=false;formdata.iotcardval=''">取 消</el-button>
                <el-button v-if="authzData['F:BO_CAB_IOTCARD_ADDSUBMIT']" type="primary" @click="sureBtn('formdata')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改" @close="dialogchangeEdit=false;formdata.iotcardval=''" :visible.sync="dialogchangeEdit" width="40%" center>
            <el-form :model="formdata" :rules="rules" ref="formdata">
                <el-form-item label="控制板物联卡号" label-width="150px" prop="iotcardval">
                    <el-input maxlength="20" v-model="formdata.iotcardval"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogchangeEdit=false;formdata.iotcardval=''">取 消</el-button>
                <el-button type="primary" @click="sureChange('formdata')">确 定</el-button>
            </div>
        </el-dialog>
   </div>
</template>

<script>
import resetButton from './resetButton'
   export default {
     name:"LonganIotCardList",
     components:{
        resetButton
    },
     data(){
       return {
          authzData:'',
          pageTotal: 1,
          currentPage: 1,
          pageNum: 1,
          iotcardval:'',
          formdata:{
            iotcardval:'',
          },
          dialogcreatedit:false,
          dataList:[],
          rules:{
            iotcardval:[
              {required:true,message:"请输入控制板物联卡卡号",trigger:"blur"}
            ]
          },
          isActive: '',
          dialogchangeEdit: false,
          selectID:'',
          forbiddenReason:''
       }
     },
     mounted(){
       (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
       if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                 this[item] = this.$store.state.searchList[item]
            }
        }
       this.inquire()
     },
     methods:{
       resetFunc(){
            this.isActive = ''
            this.iotcardval = ''
            this.inquire();
        },
        //新增编辑确定
        sureBtn(formdata){
           let params = {
             ccid: this.formdata.iotcardval
           }
           this.$refs[formdata].validate((valid,model)=>{
              if(valid){
                this.$api.addControlCcid(params)
                .then(response => {
                    if(response.data.code==0){
                      this.$message.success("操作成功");
                      this.dialogcreatedit = false;
                      this.invoiceRateList();
                    }else{
                      this.$alert(response.data.msg,"警告",{
                          confirmButtonText: "确定"
                      })
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
              }
           })
        },
        //更改状态
        changeStatus(id,isActive,index){
          console.log(index);
          // return
          if(!isActive){
            this.$prompt('请输入禁用理由', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /^.{1,50}$/,
              inputErrorMessage: '理由不可为空或超过50字符！'
            }).then(({ value }) => {
              let params = {
                forbiddenReason: value
              }
              this.$api.isActiveCcid(id,params)
              .then(response => {
                  if(response.data.code==0){
                    this.$message.success("禁用成功");
                    this.invoiceRateList();
                  }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                  }
              })
              .catch(error => {
                  this.$alert(error,"警告",{
                      confirmButtonText: "确定"
                  })
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
              this.dataList[index].isActive = true
            });
          }else{
            this.$api.isActiveCcid(id,{})
            .then(response => {
                if(response.data.code==0){
                  this.$message.success("启用成功");

                }else{
                  this.$alert(response.data.msg,"警告",{
                      confirmButtonText: "确定"
                  })
                  this.dataList[index].isActive = false
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
          }
        },
        //修改
        changeiotcard(id){
          this.dialogchangeEdit=true;
          this.selectID = id
          this.$api.getControlCcidone(id)
            .then(response => {
                if(response.data.code==0){
                  // this.dataList = response.data.data.records
                  this.formdata = {iotcardval:response.data.data.ccid}
                }else{
                  this.$alert(response.data.msg,"警告",{
                      confirmButtonText: "确定"
                  })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //确定删除
        deliotcard(itemId){
          let guiId=itemId;
          this.$confirm('是否确认删除该卡号?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.$api.delControlCcid(guiId).then(response => {
                  if(response.data.code == 0){
                      this.$message.success("操作成功");
                      this.invoiceRateList();
                  }else{
                      this.$alert(response.data.data.msg,"警告",{
                          confirmButtonText: "确定"
                      })
                  }
              })
              .catch(error => {
                  this.$alert(error,"警告",{
                      confirmButtonText: "确定"
                  })
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
        },
        //新增
        addbtn(){
          this.dialogcreatedit=true;
        },
        //查询
        inquire(){
          this.pageNum = 1;
          this.invoiceRateList();
          this.$store.commit('setSearchList',{
                iotcardval: this.iotcardval,
                isActive:this.isActive
            })
        },
        //获取列表
        invoiceRateList(){
          let params = {
            ccid: this.iotcardval,
            isActive: this.isActive,
            pageNo: this.pageNum,
            pageSize: 10
          }
          this.$api.getControlCcids({params})
            .then(response => {
                if(response.data.code==0){
                  this.dataList = response.data.data.records
                  this.dataList.forEach(item => {
                    if(item.isActive){
                      item.isActive = true
                    }else{
                      item.isActive = false
                    }
                  })
                  this.pageTotal = response.data.data.total
                }else{
                  this.$alert(response.data.msg,"警告",{
                      confirmButtonText: "确定"
                  })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //确认修改
        sureChange(){
          let params = {
             ccid: this.formdata.iotcardval
          }
          this.$api.changeControlCcid(params,this.selectID).then(response => {
            if(response.data.code == 0){
                this.$message.success("操作成功");
                this.dialogchangeEdit = false;
                this.invoiceRateList();
            }else{
                this.$alert(response.data.data.msg,"警告",{
                    confirmButtonText: "确定"
                })
            }
          })
          .catch(error => {
            this.$alert(error,"警告",{
                confirmButtonText: "确定"
            })
          })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.invoiceRateList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.invoiceRateList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.invoiceRateList();
        },
     },
   }
</script>

<style lang="less">
.iotCardList{
  .delwrap{
      .el-dialog__footer{text-align:center !important;}
    }
  }

</style>


