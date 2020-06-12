<template>
    <div class="Franchisee">
        <el-form :model="query" ref="query" :inline="true" align=left class="searchform">
            <el-form-item label="合作伙伴名称" prop="franchiseename">
                <el-input v-model="query.franchiseename"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
                <!-- <el-button class="resetbtn" type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button> -->
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div v-if="authzData['F:BO_ALLY_ALLY_ADD']" class="addranchisee"><el-button class="addbutton" @click="addranchisee">新增</el-button></div>
        <el-table :data="FranchiseeDataList" border stripe style="width:100%;" >
            <el-table-column prop="id" label="id" align=center></el-table-column>
            <el-table-column prop="type" label="类型" align=center>
               <template slot-scope="scope">
                  <span v-if="scope.row.type=='c'">企业</span>
                  <span v-if="scope.row.type=='p'">个人</span>
               </template>
            </el-table-column>
            <el-table-column prop="uscc" label="企业信用代码/身份证" width="160px" align=center>
               <template slot-scope="scope">
                   <span v-if="scope.row.uscc!=''">{{scope.row.uscc}}</span>
                   <span v-else>{{scope.row.idno}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="name" label="合作伙伴名称" align=center></el-table-column>
            <el-table-column prop="contact" label="联系人" align=center></el-table-column>
            <el-table-column prop="contactPhone" label="手机号" align=center></el-table-column>
            <el-table-column prop="addressAll" label="区域" align=center width="320px">
               <template slot-scope="scope">

                   <span v-if="scope.row.provinceName!=null">{{scope.row.provinceName.dictName}}</span><span v-if="scope.row.cityName!=null">{{scope.row.cityName.dictName}}</span><span v-if="scope.row.areaName!=null">{{scope.row.areaName.dictName}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="添加时间" align=center></el-table-column>
            <el-table-column label="操作" align=center fixed="right" width="320px">
               <template slot-scope="scope">
                    <el-button  v-if="authzData['F:BO_ALLY_ALLY_EDIT'] && scope.row.isDeleted=='1'" :disabled="true" type="text" size="small" @click="edit(scope.row.id)">修改</el-button>
                    <el-button  v-else-if="authzData['F:BO_ALLY_ALLY_EDIT']" type="text" size="small" @click="edit(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_ALLY_ALLY_USING']" type="text" size="small" @click="prohibit(scope.$index,FranchiseeDataList)">
                        <span v-if="scope.row.isDeleted=='1'">启用</span>
                        <span v-if="scope.row.isDeleted=='0'">禁用</span>
                    </el-button>
                    <el-button v-if="authzData['F:BO_ALLY_ALLY_RESETPWD'] && scope.row.isDeleted=='1'" :disabled="true" type="text" size="small" @click="reset(scope.row.id)">重置密码</el-button>
                    <el-button v-else-if="authzData['F:BO_ALLY_ALLY_RESETPWD']" type="text" size="small" @click="reset(scope.row.id)">重置密码</el-button>
                    <el-button v-if="authzData['F:BO_ALLY_PARTNER_SETTING'] && scope.row.isDeleted=='1'" :disabled="true" type="text" size="small" @click="partnersetup(scope.row.id,scope.row.name)">合作伙伴设置</el-button>
                    <el-button v-else-if="authzData['F:BO_ALLY_PARTNER_SETTING']" type="text" size="small" @click="partnersetup(scope.row.id,scope.row.name)">合作伙伴设置</el-button>
                    <el-button v-if="authzData['F:BO_ALLY_ALLY_VIEW'] && scope.row.isDeleted=='1'" :disabled="true" type="text" size="small" @click="lookdetail(scope.row.id)">查看详情</el-button>
                    <el-button v-else-if="authzData['F:BO_ALLY_ALLY_VIEW']" type="text" size="small" @click="lookdetail(scope.row.id)">查看详情</el-button>
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

        <el-dialog class="qiyongtis" title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>{{prohibitdescribe}}</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="sureswitch">确定</el-button>
            </span>
        </el-dialog>

        <!-- 重置密码 -->
          <el-dialog class="resetpassword" title="重置密码" :visible.sync='dialogpassword' center width="30%">
             <el-form>
                <el-form-item label="新密码" label-width="100px">
                  <el-input type="password" v-model="newpassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" label-width="100px">
                  <el-input type="password" v-model="surepassword"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary"  @click="dialogpassword=false">取 消</el-button>
                <el-button type="primary" @click="surereset">确 定</el-button>
              </div>
          </el-dialog>
        <!-- 重置密码 -->
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'LonganFranchiseelist',
    components:{
        resetButton
    },
    data(){
        return{
            authzData: '',
            FranchiseeDataList:[],
            newpassword:'',
            surepassword:'',
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            oprId: '',
            dialogVisibleDelete:false,
            dialogpassword:false,
            prohibitId:'',  //启用禁用id
            resetId:'',   //重置密码
            prohibitdescribe:'',  //禁用启用描述
            query:{
              franchiseename:'',
              currentPage:'',
            }
        }
    },
    created(){
      if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.currentPage=this.$route.query.query.currentPage
        }
    },

    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.oprId = this.$route.params.orgId;

        if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.query=this.$route.query.query;
            this.pageNum=this.$route.query.query.currentPage
        }
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this.query[item] = this.$store.state.searchList[item]
            }
        }
        this.Franchisee();
    },
    methods: {
        resetFunc(){
            this.query.franchiseename = ''
            this.Franchisee();
        },
         //重置
         resetbtn(query){
           this.$refs[query].resetFields();
         },

         //查看详情
         lookdetail(id){
            this.query.currentPage=this.currentPage
            let query=this.query
            this.$router.push({name:'LonganFranchiseeedetail',query:{id,query}})
         },

         //新增加盟商
         addranchisee(id){
            this.$router.push({name:'LonganFranchiseeadd'})
         },



         //禁用启用
         prohibit(index,row){
            this.prohibitId=row[index].id;
            if(row[index].isDeleted=="1"){
              this.prohibitdescribe="是否确认启用该合作伙伴？"
            }else if(row[index].isDeleted=="0"){
              this.prohibitdescribe="是否确认禁用该合作伙伴？"
            }
            this.dialogVisibleDelete=true;
         },

         //确定启用禁用
         sureswitch(id){
            let that=this;
            let params="";
            this.$api.prohibitpartner({params},that.prohibitId).then(response=>{
                if(response.data.code==0){
                    that.$message.success("操作成功")
                    that.dialogVisibleDelete=false;
                    that.Franchisee();
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })

         },

         //重置密码
         reset(id){
            this.resetId=id;
            this.newpassword=''
            this.surepassword=''
            this.dialogpassword=true;

         },

         partnersetup(id,namexm){
            this.query.currentPage=this.currentPage
            let query=this.query
            this.$router.push({name:'LonganPartnerSetup',query:{id,namexm,query}})
         },

         //确定重置密码
         surereset(){
            let that=this;
            if(that.newpassword==''){
               that.$message.error('请输入新密码!')
               return false
            }
            if(that.surepassword==''){
               that.$message.error('请输入确认密码!')
               return false
            }
            if(that.newpassword!=that.surepassword){
               that.$message.error('两次输入的密码不一致!')
               return false
            }
             let params={
                newPassWord:this.surepassword,
             }
            this.$api.Resetpassword(params,that.resetId).then(response=>{
                if(response.data.code==0){
                  that.$message.success("操作成功")
                  this.dialogpassword=false;
                }else{
                  this.$alert(response.data.msg,"警告",{
                     confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
         },

         //编辑
         edit(id){
            this.$router.push({name:'LonganFranchiseeedit',query:{id}})
         },


        Franchisee(){
            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                allyName: this.query.franchiseename,
            };
            this.$api.getPartnerdata({params}).then(response=>{
                if(response.data.code==0){
                    this.FranchiseeDataList = response.data.data.records;
                    this.pageTotal = response.data.data.total
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })

        },





        //查询
        inquire(){
            this.pageNum=1;
            this.currentPage=1;
            this.Franchisee();
            this.$store.commit('setSearchList',{
                franchiseename: this.query.franchiseename
            })
        },

        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.Franchisee();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.Franchisee();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.Franchisee();
        }
    }
}
</script>

<style lang="less" scoped>
.Franchisee{
    .Revenue-font{
        text-align: left;
        margin-bottom: 20px;
    }
    .pagination{
        margin-top: 20px;
    }
    .cell a{
        display: block;
        margin-bottom: 10px;
    }
    .addranchisee{
        float: left;
        margin-bottom: 10px;
    }


}

</style>

<style lang="less">
  .Franchisee{
    .el-dialog__footer{text-align: center !important;}
    .qiyongtis .el-dialog{width: 350px !important;}
    .resetpassword .el-dialog{width: 500px !important;}

    .resetbtn.el-button--primary{
        background-color: #71a8e0;
        border-color: #71a8e0;
    }

  }
</style>


