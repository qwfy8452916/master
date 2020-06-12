<template>
   <div class="CabTypeList">
      <el-form :inline="true" align="left">
          <el-form-item label="类型编码">
             <el-input v-model="typeCode"></el-input>
          </el-form-item>
          <el-form-item label="类型名称">
             <el-input v-model="typeName"></el-input>
          </el-form-item>
          <el-form-item label="格子数">
             <el-input v-model="latticeNum"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="searchBtn">查询</el-button>
          </el-form-item>
          <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
      </el-form>
      <div class="addwrap">
          <el-button class="addbutton" v-if="authzData['F:BO_CAB_CABTYPE_ADD']" @click="addcabType">新增</el-button>
      </div>
      <el-table :data="cabinetTypeData" border stripe style="width:100%">
         <el-table-column prop="cabType" label="类型编码" align="center"></el-table-column>
         <el-table-column prop="cabTypeName" label="类型名称" align="center"></el-table-column>
         <el-table-column prop="virtualFlag" label="是否是虚拟柜" align="center">
             <template slot-scope="scope">
                 <span v-if="scope.row.virtualFlag=='0'">否</span>
                 <span v-if="scope.row.virtualFlag=='1'">是</span>
             </template>
         </el-table-column>
         <el-table-column prop="latticeCount" label="格子数量" align="center"></el-table-column>
         <el-table-column label="操作" align="center" width="200px">
             <template slot-scope="scope">
                <el-button type="text" v-if="authzData['F:BO_CAB_CABTYPE_MODIFY']" @click="editCabType(scope.row.id)">修改</el-button>
                <el-button v-if="authzData['F:BO_CAB_CABTYPE_DELETE']" type="text" @click="deleBtn(scope.row.id)">删除</el-button>
                <el-button type="text" v-if="authzData['F:BO_CAB_CABTYPE_DETAIL']" @click="checkDetail(scope.row.id)">查看详情</el-button>
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
        <el-dialog title="提示" :visible.sync="dialogdel" class="dialogdel" width="30%">
           <span>是否确认删除该柜子类型？</span>
           <span slot="footer">
             <el-button type="primary" @click="dialogdel=false">取消</el-button>
             <el-button type="primary" @click="confirmBtn">确定</el-button>
           </span>
        </el-dialog>
   </div>
</template>

<script>
import resetButton from './resetButton'
   export default {
     name:'LonganCabTypeList',
     components:{
        resetButton
    },
     data(){
       return {
         authzData:'',
         cabinetTypeId:'', //柜子类型id
         pageTotal:1, //总页数
         currentPage:1, //默认当前页数
         pageNum:1, //当前页码
         pageSize:10, //每页显示条数
         dialogdel:false,
         typeCode:'', //类型编码
         typeName:'', //类型名称
         latticeNum:'', //格子数
         cabinetTypeData:[], //柜子类型数据
       }
     },
     mounted(){
       (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
       if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                 this[item] = this.$store.state.searchList[item]
            }
        }
       this.CabinetType();
     },
     methods:{
         resetFunc(){
            this.latticeNum = ''
            this.typeCode = ''
            this.typeName = ''
            this.CabinetType();
        },
       //查询
       searchBtn(){
          this.CabinetType();
          this.$store.commit('setSearchList',{
                typeCode: this.typeCode,
                latticeNum: this.latticeNum,
                typeName:this.typeName
            })
       },

       //新增
       addcabType(){
         this.$router.push({name:"LonganCabTypeListAdd"})
       },
       //修改
       editCabType(id){
         this.$router.push({name:"LonganCabTypeEdit",query:{id}})
       },

       deleBtn(id){
         this.cabinetTypeId=id;
         this.dialogdel=true;
       },

       confirmBtn(){
         let that=this;
         let params="";
         this.$api.delteCabinetType(params,that.cabinetTypeId).then(response=>{
            if(response.data.code=='0'){
               that.CabinetType();
               that.dialogdel=false;
               that.$message.success("操作成功")
            }else{
              that.$alert(response.data.msg,"警告",{
                confirmButtonText:"确定"
              })
            }
         }).catch(error=>{
            that.$alert(error,"警告",{
              confirmButtonText:"确定"
            })
         })
       },

       //查看详情
       checkDetail(id){
          this.$router.push({name:"LonganCabTypeDetail",query:{id}})
       },

       CabinetType(){
         let that=this;
         let params={
            pageNo:this.pageNum,
            pageSize:this.pageSize,
            cabType:this.typeCode,
            cabTypeName:this.typeName,
            latticeCount:this.latticeNum,
         };
         this.$api.CabinetType({params}).then(response=>{
           if(response.data.code=='0'){
              that.pageTotal=response.data.data.total;
              that.cabinetTypeData=response.data.data.records;
           }else{
             that.$alert(response.data.msg,"警告",{
               confirmButtonText:"确定"
             })
            }
         }).catch(error=>{
           that.$alert(error,"警告",{
             confirmButtonText:"确定"
           })
         })
       },

       current(){
            this.pageNum = this.currentPage;
            this.CabinetType();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.CabinetType();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.CabinetType();
        },

     },
   }
</script>

<style lang="less" scope>
.CabTypeList{
  .addwrap{text-align: left;margin-bottom: 10px;}
  .dialogdel{
    .el-dialog__footer{text-align: center;}
  }
 }
</style>
