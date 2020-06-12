<template>
   <div class="CardticketList">
       <el-form :inline="true" align="left">
           <el-form-item label="卡券名称">
              <el-input v-model="vouName"></el-input>
           </el-form-item>
           <el-form-item label="使用场景">
              <el-select v-model="vouUseScene">
                 <el-option v-for="item in UseSceneData" :key="item.dictValue" :label="item.dictName" :value="item.dictValue"></el-option>
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
           <el-button v-if="authzData['F:BH_VOU_CARDTICKET_ADD']" class="addbutton" @click="addbutton">新增</el-button>
       </div>
       <el-table :data="cardData" border stripe>
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="vouOwnerOrgName" label="酒店" align="center"></el-table-column>
          <el-table-column prop="vouName" label="卡券名称" align="center"></el-table-column>
          <el-table-column prop="vouBasicPrice" label="基础价格" align="center"></el-table-column>
          <el-table-column prop="canGive" label="允许转赠" align="center">
             <template slot-scope="scope">
                 <span v-if="scope.row.canGive===0">不可以</span>
                 <span v-if="scope.row.canGive===1">可以</span>
             </template>
          </el-table-column>
          <el-table-column prop="vouTermType" label="使用有效期" align="center">
             <template slot-scope="scope">
                 <span v-if="scope.row.vouTermType===0">{{scope.row.vouTermDays}}</span>
                 <span v-if="scope.row.vouTermType===1">{{scope.row.vouTermStartDate}}~{{scope.row.vouTermEndDate}}</span>
             </template>
          </el-table-column>
          <el-table-column prop="vouUseSceneName" label="使用场景" align="center"></el-table-column>
          <el-table-column prop="vouVerifiedTotal" label="核销次数" align="center">
               <template slot-scope="scope">
                 <div v-if="scope.row.vouUseScene==1">
                    <span v-if="scope.row.vouVerifiedTotal==1">1</span>
                    <span v-if="scope.row.vouVerifiedTotal>1">{{scope.row.vouVerifiedTotal}}</span>
                 </div>
                 <div v-if="scope.row.vouUseScene==2">
                     <span>/</span>
                 </div>
             </template>
          </el-table-column>
          <el-table-column prop="isActive" label="状态" align="center">
             <template slot-scope="scope">
                <el-switch :disabled="!authzData['F:BH_VOU_CARDTICKET_SWITCH']" v-model="scope.row.isActive" :active-value="1" :inactive-value="0" @change="updateStatus(scope.row.id)"></el-switch>
             </template>
          </el-table-column>
          <el-table-column prop="createdByName" label="创建人" align="center"></el-table-column>
          <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="id" label="操作" align="center" width="200px">
              <template slot-scope="scope">
                 <el-button v-if="authzData['F:BH_VOU_CARDTICKET_DETAIL']" type="text" @click="detailCard(scope.row.id)">详情</el-button>
                 <el-button v-if="authzData['F:BH_VOU_CARDTICKET_MODIFY']" type="text" @click="editCard(scope.row.id)">修改</el-button>
                 <el-button v-if="authzData['F:BH_VOU_CARDTICKET_DELETE']" type="text" @click="delcard(scope.row.id)">删除</el-button>
              </template>
          </el-table-column>
       </el-table>
       <div class="pagination">
            <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
       <el-dialog title="提示" :visible.sync="delcardjudge" width="30%">
          <span>确定要删除此卡券吗?</span>
          <span slot="footer">
            <el-button @click="delcardjudge=false">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
          </span>
       </el-dialog>
   </div>
</template>

<script>
  import resetButton from './resetButton'
  import HotelPagination from '@/components/HotelPagination'
  export default{
    name:"HotelCardticketList",
    components:{
        resetButton,
        HotelPagination
    },
    data(){
      return {
         authzData: '',
         delelId:'',
         UseSceneData:[],
         cardData:[],
         vouName:'',
         vouUseScene:'',
         delcardjudge:false,
         pageTotal: 0,
         pageSize: 10,
         pageNum: 1,
      }
    },
    mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})

       if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
              this[item] = this.$store.state.searchList[item]
            }
        }
        this.getUseScene();
        this.getCardticketList();
    },
    methods:{
      resetFunc(){
            this.vouName = ''
            this.vouUseScene=''
            this.getCardticketList();
        },

        getCardticketList(){
          let that=this;
          let params={
            orgAs:3,
            vouName:this.vouName,
            vouUseScene:this.vouUseScene,
            pageNo: this.pageNum,
            pageSize: this.pageSize
          }
          this.$api.getCardticketList({params}).then(response=>{
              const result=response.data;
              if(result.code==0){
                that.cardData=result.data.records
                that.pageTotal=result.data.total
              }else{
                this.$message.error(result.msg);
              }
          }).catch(error=>{
            this.$alert(error,"警告",{
               confirmButtonText:"确定"
            })
          })
        },

        //编辑
        editCard(id){
          this.$router.push({name:"HotelCardticketEdit",query:{id}})
        },

        //详情
        detailCard(id){
          this.$router.push({name:"HotelCardticketDetail",query:{id}})
        },

        //确认启用禁用
        updateStatus(id){
          let that=this;
          let params="";
           this.$api.getCardticketisActive(params,id).then(response=>{
             if(response.data.code=='0'){
                that.$message.success("操作成功")
                that.getCardticketList();
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

        //获取场景
        getUseScene(){
          let that=this;
          let params={
            key:"VOU_USE_SCENE",
            orgId:'0'
          }
          this.$api.basicDataItems(params).then(response=>{
              const result=response.data;
              if(result.code==0){
                that.UseSceneData=result.data
                let allObj={
                   dictName:"全部",
                   dictValue:"",
                }
                that.UseSceneData.unshift(allObj)
              }
          }).catch(error=>{
            this.$alert(error,"警告",{
               confirmButtonText:"确定"
            })
          })
        },

        addbutton(){
          this.$router.push({name:"HotelCardticketAdd"})
        },


        delcard(id){
          this.delelId=id;
          this.delcardjudge=true
        },

        //确定删除
        confirm(){
          let that=this;
          let params={};
          this.$api.deleCardticket(params,that.delelId).then(response=>{
            let result=response.data;
            if(result.code==0){
              that.delcardjudge=false;
              that.$message.success("操作成功")
              that.getCardticketList();
            }else{
              that.$message.error(result.msg)
            }
          }).catch(error=>{
            that.$alert(error,"警告",{
              confirmButtonText:"确定"
            })
          })
        },

        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.getCardticketList();
        },

        //查询
        inquire(){
            this.pageNum = 1;
            this.getCardticketList();
            this.$store.commit('setSearchList',{
                vouName: this.vouName,
                vouUseScene:this.vouUseScene,
            })
        },
    }
  }
</script>

<style lang="less" scope>
.CardticketList{
  .el-dialog__footer{text-align: center !important;}
  .pagination{
        margin-top: 20px;
  }
}
</style>



