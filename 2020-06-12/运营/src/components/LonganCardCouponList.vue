<template>
   <div class="CardCouponList">
       <el-form :inline="true" align="left">
           <el-form-item label="酒店">
                <el-select
                    @change="editHotel"
                    v-model="vouOwnerOrgId"
                    filterable
                    remote
                    :remote-method="remoteOrgan"
                    :loading="loadingO"
                    @focus="getOrgan()">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in organNameList" :key="item.index" :label="item.orgName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
           <el-form-item label="卡券名称">
              <el-select
                    v-model="batchId"
                    filterable
                    remote
                    :remote-method="remoteCard"
                    :loading="loadingC"
                    @focus="getCardticketList()"
                    placeholder="请选择"
               >
                 <el-option v-for="item in cardBatchData" :key="item.id" :label="item.vouName" :value="item.id"></el-option>
              </el-select>
           </el-form-item>
           <el-form-item label="顾客">
              <el-select
              v-model="cusId"
              filterable
              remote
              :remote-method="remoteUser"
              :loading="loadingU"
              @focus="getCardUser()"
              placeholder="请选择"
              >
                 <el-option v-for="item in cardUserData" :key="item.id" :label="item.nickName" :value="item.id"></el-option>
              </el-select>
           </el-form-item>
           <el-form-item label="使用场景">
              <el-select v-model="vouUseScene">
                 <el-option v-for="item in UseSceneData" :key="item.dictValue" :label="item.dictName" :value="item.dictValue"></el-option>
              </el-select>
           </el-form-item>
           <el-form-item label="创建日期">
               <el-date-picker
                v-model="createDate"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="过期日期">
               </el-date-picker>
             </el-form-item>
             <el-form-item label="有效期">
               <el-date-picker
                v-model="isActiveDate"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="过期日期">
               </el-date-picker>
             </el-form-item>
           <el-form-item>
             <el-button type="primary" @click="inquire">查询</el-button>
           </el-form-item>
           <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
       </el-form>
       <el-table :data="cardData" border stripe>
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="vouOwnerOrgName" label="酒店" align="center"></el-table-column>
          <el-table-column prop="cusId" label="顾客ID" align="center"></el-table-column>
          <el-table-column prop="cusNickName" label="顾客昵称" align="center"></el-table-column>
          <el-table-column prop="cusPhone" label="顾客手机" align="center"></el-table-column>
          <el-table-column prop="vouName" label="卡券名称" align="center"></el-table-column>
          <el-table-column prop="vouBasicPrice" label="基础价格" align="center"></el-table-column>
          <el-table-column prop="canGive" label="允许转赠" align="center">
             <template slot-scope="scope">
                 <span v-if="scope.row.canGive===0">不可以</span>
                 <span v-if="scope.row.canGive===1">可以</span>
             </template>
          </el-table-column>
          <el-table-column prop="isGived" label="是否转赠" align="center">
             <template slot-scope="scope">
                 <span v-if="scope.row.isGived===0">不是</span>
                 <span v-if="scope.row.isGived===1">是</span>
             </template>
          </el-table-column>
          <el-table-column prop="vouStartDate" label="有效期" align="center" width="180px">
            <template slot-scope="scope">
                 <span>{{scope.row.vouStartDate}}~{{scope.row.vouEndDate}}</span>
             </template>
          </el-table-column>
          <el-table-column prop="vouUseSceneName" label="使用场景" align="center"></el-table-column>
          <el-table-column prop="vouVerifiedTotal" label="可核销次数" align="center">
              <template slot-scope="scope">
                 <div v-if="scope.row.vouUseScene==1">
                    <span>{{scope.row.vouVerifiedTotal}}</span>
                 </div>
                 <div v-if="scope.row.vouUseScene==2">
                     <span>/</span>
                 </div>
               </template>
          </el-table-column>
          <el-table-column prop="vouRemainingVerifiedNum" label="剩余核销次数" align="center">
              <template slot-scope="scope">
                 <div v-if="scope.row.vouUseScene==1">
                    <span>{{scope.row.vouRemainingVerifiedNum}}</span>
                 </div>
                 <div v-if="scope.row.vouUseScene==2">
                     <span>/</span>
                 </div>
               </template>
          </el-table-column>
          <el-table-column prop="vouDeductibleType" label="抵扣类型" align="center">
             <template slot-scope="scope">
                 <div v-if="scope.row.vouUseScene==2">
                    <span v-if="scope.row.vouDeductibleType===0">现金</span>
                    <span v-if="scope.row.vouDeductibleType===1">商品</span>
                 </div>
                 <div v-if="scope.row.vouUseScene==1">
                   <span>/</span>
                 </div>
             </template>
          </el-table-column>
          <el-table-column prop="vouDeductibleType" label="抵扣内容" align="center">
              <template slot-scope="scope">
                 <div v-if="scope.row.vouUseScene==2">
                    <span v-if="scope.row.vouDeductibleType===0">{{scope.row.vouDeductibleMoney}}</span>
                    <span v-if="scope.row.vouDeductibleType===1">{{scope.row.deductHotelProdName}}{{scope.row.deductHotelProdSpecName}}</span>
                 </div>
                 <div v-if="scope.row.vouUseScene==1">
                   <span>/</span>
                 </div>
             </template>
          </el-table-column>
          <el-table-column prop="isUsed" label="使用状态" align="center">
             <template slot-scope="scope">
                 <span v-if="scope.row.isUsed===0">未使用</span>
                 <span v-if="scope.row.isUsed===1">已使用</span>
             </template>
          </el-table-column>
          <el-table-column prop="createdByName" label="创建人" align="center"></el-table-column>
          <el-table-column prop="createdAt" label="创建时间" align="center" width="180px"></el-table-column>
          <el-table-column fixed="right" prop="id" label="操作" align="center" width="240px">
              <template slot-scope="scope">
                 <el-button v-if="authzData['F:BO_VOU_CARDCOUPON_DETAIL']" type="text" @click="detailCard(scope.row.id)">详情</el-button>
                 <el-button v-if="authzData['F:BO_VOU_CARDCOUPON_DELAY']" type="text" @click="yancDate(scope.row.id)">延长有效期</el-button>
                 <el-button v-if="scope.row.vouUseScene==2 && scope.row.isUsed==1" type="text" @click="checkOrder(scope.row.id)">查看订单</el-button>
                 <el-button v-if="authzData['F:BO_VOU_CARDCOUPON_CHECKDETAIL']" type="text" @click="checkcard(scope.row.id)">查看使用明细</el-button>
              </template>
          </el-table-column>
       </el-table>
       <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>

       <el-dialog title="延长有效期" :visible.sync="datchdialog" width="30%">
            <el-form :model="diayancData" ref="diayancData" :rules="rules">
               <el-form-item label="延长有效期至" label-width="120px" class="yanchang" prop="effectiveTime">
                   <el-date-picker
                      value-format="yyyy-MM-dd"
                      v-model="diayancData.effectiveTime"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions0">
                    </el-date-picker>
               </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="datchdialog=false">取 消</el-button>
                <el-button v-if="authzData['F:BO_VOU_CARDCOUPON_DELAY_SUBMIT']" type="primary" @click="sureExtendTimeBtn('diayancData')">确 定</el-button>
            </span>
        </el-dialog>
   </div>
</template>

<script>
  import resetButton from './resetButton'
  import LonganPagination from '@/components/LonganPagination'
  export default{
    name:"LonganCardCouponList",
    components:{
        resetButton,
        LonganPagination
    },
    data(){
      return {
         authzData: '',
         delelId:'',
         delayId:'', //延长id
         loadingO:false,
         organNameList:[], //酒店组织数据
         createDate:[],
         isActiveDate:[],
         UseSceneData:[],
         cardBatchData:[], // 卡券批次数据
         cardUserData:[], // 顾客数据
         cardData:[],
         vouOwnerOrgId:'',
         batchId:'',
         cusId:'',
         vouUseScene:'',
         datchdialog:false,
         loadingC:false,
         loadingU:false,
         pageTotal: 0,
         pageSize: 10,
         pageNum: 1,
         diayancData:{
           effectiveTime:''
         },
         rules:{
           effectiveTime:{required:true,message:"请选择延长日期",tirgger:"change"}
         },
         pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
          }
        },
      }
    },
    mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})

       if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
              this[item] = this.$store.state.searchList[item]
            }
        }
        // this.getCardticketList();
        this.getCardUser();
        this.getUseScene();
        this.getUseCardticketList();
    },
    methods:{
      resetFunc(){
            this.vouOwnerOrgId=''
            this.batchId = ''
            this.cusId=''
            this.vouUseScene=''
            this.createDate=[]
            this.isActiveDate=[]
            this.getUseCardticketList();
        },

        getUseCardticketList(){
          let that=this;
          if(this.createDate==null){
             this.createDate=[];
          }
          if(this.vouEndDate==null){
             this.vouEndDate=[];
          }
          let params={
            vouOwnerOrgId:this.vouOwnerOrgId,
            batchId:this.batchId,
            cusId:this.cusId,
            vouUseScene:this.vouUseScene,
            vouCreateStartDate:this.createDate[0],
            vouCreateEndDate:this.createDate[1],
            vouStartDate:this.isActiveDate[0],
            vouEndDate:this.isActiveDate[1],
            pageNo: this.pageNum,
            pageSize: this.pageSize
          }
          this.$api.getUseCardticketList({params}).then(response=>{
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

        //延长有效期
        yancDate(id){
            this.delayId=id;
            this.diayancData.effectiveTime="";
            this.datchdialog=true;
            this.$nextTick(()=>{
               this.$refs['diayancData'].clearValidate();
              })
        },

        //确定延长
        sureExtendTimeBtn(diayancData){
          let that=this;
          this.$refs[diayancData].validate((valid,model)=>{
             if(valid){
               let params={
                     vouEndDate:this.diayancData.effectiveTime
                    };
                 that.$api.delayCardticketDate(params,that.delayId).then(response=>{
                    let result=response.data;
                    if(result.code==0){
                       that.$message.success("操作成功")
                       that.datchdialog=false;
                       that.getUseCardticketList();
                    }else{
                      that.$message.error(result.msg)
                    }
                 }).catch(error=>{
                   that.$alert(error,"警告",{
                     confirmButtonText:"确定"
                   })
                 })
             }else{
               console.log("error!")
             }
          })

        },

        //查看使用明细
        checkcard(id){
          this.$router.push({name:"LonganCardCouponRecord",query:{id}})
        },

        //查看订单
        checkOrder(id){
          this.getUseCardticketRecord(id);
        },

        //卡券使用记录获取订单id
      getUseCardticketRecord(vouId){
        let that=this;
        let params={
           vouId:vouId
        }
        this.$api.getUseCardticketRecord({params}).then(response=>{
           let result=response.data
           if(result.code==0){
               let id=result.data[0].orderId
               that.$router.push({name:"LonganOrderCouponDetails",query:{id}})
           }else{
             that.$message.error(result.msg)
           }
        }).catch(error=>{
          that.$alert(error,"警告",{
            confirmButtonText:"确定"
          })
        })
      },

        //详情
        detailCard(id){
          this.$router.push({name:"LonganCardCouponDetail",query:{id}})
        },

        //确认启用禁用
        updateStatus(id){
          let that=this;
          let params="";
           this.$api.getCardticketisActive(params,id).then(response=>{
             if(response.data.code=='0'){
                that.$message.success("操作成功")
                that.getUseCardticketList();
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


        //酒店组织列表
        getOrgan(oName){
            let that = this;
            this.loadingO = true;
            let params = {
                orgName: oName,
                orgKind:3,
                pageNo: 1,
                pageSize: 50
            }
            this.$api.getOrganization({params})
                .then(response => {
                    this.loadingO = false;
                    const result = response.data;
                    if(result.code == 0){
                        that.organNameList = result.data.records;
                    }else{
                        this.$message.error(result.msg);
                    }
                }).catch(err=>{
                    this.$alert(err,"警告",{
                        confirmButtonText:"确定"
                    })
                })
        },

        remoteOrgan(val){
            this.getOrgan(val);

        },

        editHotel(){
          this.batchId=''
        },


        //卡券批次名称
        getCardticketList(kName){
          let that=this;
          // if(this.vouOwnerOrgId==''){
          //   this.$message.error("请选择酒店")
          //   return false;
          // }
          let params={
            orgAs:'',
            vouOwnerOrgId:this.vouOwnerOrgId,
            vouName:kName,
            pageNo: 1,
            pageSize: 50
          }
          this.$api.getCardticketList({params}).then(response=>{
              const result=response.data;
              if(result.code==0){
                that.cardBatchData=result.data.records
              }else{
                this.$message.error(result.msg);
              }
          }).catch(error=>{
            this.$alert(error,"警告",{
               confirmButtonText:"确定"
            })
          })
        },

        remoteCard(val){
           this.getCardticketList(val)
        },

        //获取顾客
        getCardUser(cName){
           let that=this;
          let params={
            nickName:cName,
            pageNo: 1,
            pageSize: 50
          }
          this.$api.getCardUser({params}).then(response=>{
              const result=response.data;
              if(result.code==0){
                that.cardUserData=result.data
              }else{
                this.$message.error(result.msg);
              }
          }).catch(error=>{
            this.$alert(error,"警告",{
               confirmButtonText:"确定"
            })
          })
        },

        remoteUser(val){
           this.getCardUser(val)
        },


        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.getUseCardticketList();
        },

        //查询
        inquire(){
            this.pageNum = 1;
            this.getUseCardticketList();
            this.$store.commit('setSearchList',{
                vouOwnerOrgId:this.vouOwnerOrgId,
                batchId: this.batchId,
                cusId:this.cusId,
                vouUseScene:this.vouUseScene,
                createDate:this.createDate,
                isActiveDate:this.isActiveDate,
            })
        },
    }
  }
</script>

<style lang="less" scope>
.CardCouponList{
  .el-dialog__footer{text-align: center !important;}
  .yanchang{
     .el-input{
        width: 100% !important;
     }
  }
  .pagination{
        margin-top: 20px;
    }
}
</style>



