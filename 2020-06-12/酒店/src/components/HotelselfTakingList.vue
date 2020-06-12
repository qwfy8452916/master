<template>
   <div class="selfTakingList">
      <el-form :inline="true" align="left">
          <el-form-item label="自提点名称">
              <el-input v-model="pointName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="inquire">查询</el-button>
          </el-form-item>
          <el-form-item>
             <resetButton @resetFunc='resetFunc'/>
          </el-form-item>
      </el-form>
      <div>
         <el-button v-if="authzData['F:BH_HOTEL_SELTTAKING_ADD']" class="addbutton" @click="addbutton">新增</el-button>
      </div>
      <el-table :data="tabledata" border stripe>
         <el-table-column prop="id" label="ID" align="center"></el-table-column>
         <el-table-column prop="hotelName" label="酒店" align="center"></el-table-column>
         <el-table-column prop="pointName" label="自提点名称" align="center"></el-table-column>
         <el-table-column prop="pointInstruction" label="自提点说明" align="center"></el-table-column>
         <el-table-column prop="isActive" label="状态" align="center">
            <template slot-scope="scope">
                <el-switch :disabled="!authzData['F:BH_HOTEL_SELTTAKING_SWITCH']" v-model="scope.row.isActive" :active-value="1" :inactive-value="0" @change="updateStatus(scope.row.id)"></el-switch>
            </template>
         </el-table-column>
         <el-table-column prop="createdBy" label="创建人" align="center"></el-table-column>
         <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
         <el-table-column prop="id" label="操作" align="center" width="240px">
             <template slot-scope="scope">
                 <el-button v-if="authzData['F:BH_HOTEL_SELTTAKING_DETAIL']" type="text" @click="checkDetail(scope.row.id)">详情</el-button>
                 <el-button v-if="authzData['F:BH_HOTEL_SELTTAKING_MODIFY']" type="text" @click="editBtn(scope.row.id)">修改</el-button>
                 <el-button v-if="authzData['F:BH_HOTEL_SELTTAKING_DELETE']" type="text" @click="deldata(scope.row.id)">删除</el-button>
                 <el-button v-if="authzData['F:BH_HOTEL_SELTTAKING_STAFF']" type="text" @click="hexiao(scope.row.id,scope.row.hotelId)">核销人员</el-button>
             </template>
         </el-table-column>
      </el-table>
      <div class="pagination">
            <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
      </div>
      <el-dialog title="提示" :visible.sync="deljudge" width="30%">
        <span>确定要删除该自提点吗?</span>
        <span slot="footer">
           <el-button @click="deljudge=false">取消</el-button>
           <el-button v-if="authzData['F:BH_HOTEL_SELTTAKING_DELETESUBMIT']" type="primary" @click="confirm">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="管理用户" :visible.sync="dislogVisibleRole" width="42%">
            <el-transfer
                filterable
                :data = "hexiaoDataList"
                v-model="selectcabinet"
                :titles="['用户列表', '选中用户']"
                >
            </el-transfer>
            <div slot="footer">
                <el-button @click="dislogVisibleRole = false">取 消</el-button>
                <el-button v-if="authzData['F:BH_HOTEL_SELTTAKING_STAFFSUBMIT']" type="primary" @click="manageEnsure">确 定</el-button>
            </div>
        </el-dialog>
   </div>
</template>

<script>

import resetButton from './resetButton'
import HotelPagination from '@/components/HotelPagination'
export default {
  name:'HotelselfTakingList',
  components:{
        resetButton,
        HotelPagination
    },
  data(){
    return {
      authzData: '',
      hotelId:'',
      tabledata:[],
      hexiaoId:'',
      hexiaoHotelId:'',
      deleId:'',
      pointName:'',
      deljudge:false,
      dislogVisibleRole:false,
      hotelList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      leftdata:[],
      rughtdata:[],
      hexiaoDataList: [],
      selectcabinet: [],
    }
  },
  mounted(){
    (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    this.hotelId=localStorage.hotelId;
    if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
                console.log(item)
            }
      }
     this.selftakingList();
    //  this.getSelftakeStaff()

  },
  methods:{
     resetFunc(){
            this.pointName = '';
            this.inquireHotelName='';
            this.selftakingList();
        },


         //核销人员
        hexiao(id,hotelId){
           let that=this;
           this.selectcabinet=[];
           this.hexiaoId=id;
           this.hexiaoHotelId=hotelId;

           that.getAllSelftakeStaff(function(e){
               that.getSelftakeStaff(function(l){
                 that.dislogVisibleRole=true;
                 that.hexiaoDataList=e.concat(l)
             })
           })

        },

        getAllSelftakeStaff(e){
           let that=this;
           let params={
             hotelId:that.hexiaoHotelId,
             pointId:that.hexiaoId
           };
           this.$api.getAllSelftakeStaff({params}).then(response=>{
                const result = response.data;
                if(result.code == 0){

                  that.leftdata=result.data.map(item=>{
                    return {
                      key:item.id,
                      label:item.empName,
                    }
                  })
                  typeof e == "function" && e(that.leftdata);
                }else{
                   this.$message.error(result.msg);
                }
           }).catch(error=>{
             this.$alert(error,"警告",{
                  confirmButtonText: "确定"
              })
           })
        },

        getSelftakeStaff(l){
           let that=this;
           let params={
               pointId:that.hexiaoId
           }
           this.$api.getSelftakeStaff({params}).then(response=>{
                const result = response.data;
                if(result.code == 0){
                  that.selectcabinet=result.data.map(item=>item.verifiedEmpId)
                  that.rightdata=result.data.map(item=>{
                    return {
                      key:item.verifiedEmpId,
                      label:item.verifiedEmpName,
                    }
                  })
                  typeof l == "function" && l(that.rightdata);
                }else{
                   that.selectcabinet=[]
                   that.rightdata=[]
                   this.$message.error(result.msg);
                }
           }).catch(error=>{
             this.$alert(error,"警告",{
                  confirmButtonText: "确定"
              })
           })
        },

       manageEnsure(){
          let that=this;
           let params={
               pickUpPointId:that.hexiaoId,
               verifiedEmpIds:that.selectcabinet
           }
           this.$api.addSelftakeStaff(params).then(response=>{
                const result = response.data;
                if(result.code == 0){
                  that.dislogVisibleRole=false;
                  that.$message.success("操作成功")
                }else{
                   this.$message.error(result.msg);
                }
           }).catch(error=>{
             this.$alert(error,"警告",{
                  confirmButtonText: "确定"
              })
           })
        },

        //开启关闭状态
        updateStatus(id){
          let that=this;
          let params={}
          this.$api.selftakeStatus(params,id).then(response=>{
               const result = response.data;
                if(result.code == 0){
                   this.$message.success("操作成功");
                }else{
                   this.$message.error(result.msg);
                }
          }).catch(error=>{
             this.$alert(error,"警告",{
                  confirmButtonText: "确定"
              })
          })
        },

        checkDetail(id){
          this.$router.push({name:"HotelselfTakingDetail",query:{id}})
        },

        editBtn(id){
            this.$router.push({name:"HotelselfTakingEdit",query:{id}})
        },

        addbutton(){
          this.$router.push({name:"HotelselfTakingAdd"})
        },

        inquire(){
          this.pageNum = 1;
          this.selftakingList();
          this.$store.commit('setSearchList',{
                inquireHotelName: this.inquireHotelName,
                pointName: this.pointName,
            })
        },


        selftakingList(){
          let that=this;
          const params = {
                hotelId: this.hotelId,
                pointName: this.pointName,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            this.$api.selftakingList({params})
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                      that.pageTotal = result.data.total;
                      that.tabledata=result.data.records
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })

        },

        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.selftakingList();
        },

        deldata(id){
          this.deleId=id;
          this.deljudge=true
        },

        confirm(){
          let that=this;
          const params={};
          this.$api.deleteSelftake(params,this.deleId).then(response=>{
             const result = response.data;
              if(result.code == 0){
                  this.deljudge=false
                  this.$message.success("操作成功");
                  this.selftakingList();
              }else{
                  this.$message.error(result.msg);
              }
          }).catch(error=>{
            this.$alert(error,"警告",{
                  confirmButtonText: "确定"
              })
          })
        },
  }
}
</script>
<style lang="less">
  .selfTakingList{
      .el-dialog__footer{text-align: center !important;}
      .el-checkbox{
         display: block;
         text-align: left;
      }
   }
</style>
<style lang="less" scoped>
   .selfTakingList{
      .pagination{
        margin-top: 20px;
      }
   }
</style>
