<template>
    <div class="CardCouponRecord">
         <div v-if="DetailData.vouUseScene==1">
         <h3 class="alignleft">核销记录</h3>
         <table>
            <thead>
               <tr>
                  <th>酒店名称</th>
                  <th>卡券名称</th>
                  <th>基础价格</th>
                  <th>有效期</th>
                  <th>可核销次数</th>
                  <th>剩余核销次数</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>{{DetailData.vouOwnerOrgName}}</td>
                  <td>{{DetailData.vouName}}</td>
                  <td>{{DetailData.vouBasicPrice}}</td>
                  <td>{{DetailData.vouStartDate}}-{{DetailData.vouEndDate}}</td>
                  <td>{{DetailData.vouVerifiedTotal}}</td>
                  <td>{{DetailData.vouRemainingVerifiedNum}}</td>
               </tr>
            </tbody>
            <thead>
               <tr>
                  <th>使用场景</th>
                  <th>用户ID</th>
                  <th>用户昵称</th>
                  <th>用户手机号</th>
                  <th></th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>{{DetailData.vouUseSceneName}}</td>
                  <td>{{DetailData.cusId}}</td>
                  <td>{{DetailData.cusNickName}}</td>
                  <td>{{DetailData.cusPhone}}</td>
                  <td></td>
                  <td></td>
               </tr>
            </tbody>
         </table>

         <el-table :data="cardRecordData" border stripe>
            <el-table-column prop="id" label="卡券编号" align="center"></el-table-column>
            <el-table-column prop="verifiedEmpName" label="核销人" align="center"></el-table-column>
            <el-table-column prop="vouUsedTime" label="核销时间" align="center"></el-table-column>
            <el-table-column prop="verifiedAddress" label="核销地点" align="center"></el-table-column>
         </el-table>

         </div>

        <div v-if="DetailData.vouUseScene==2">
         <h3 class="alignleft">卡券使用记录</h3>
         <table>
            <thead>
               <tr>
                  <th>酒店名称</th>
                  <th>卡券名称</th>
                  <th>基础价格</th>
                  <th>有效期</th>
                  <th>是否转赠</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>{{DetailData.vouOwnerOrgName}}</td>
                  <td>{{DetailData.vouName}}</td>
                  <td>{{DetailData.vouBasicPrice}}</td>
                  <td>{{DetailData.vouStartDate}}-{{DetailData.vouEndDate}}</td>
                  <td>
                    <span v-if="DetailData.isGived==1">是</span>
                    <span v-if="DetailData.isGived===0">不是</span>
                  </td>
               </tr>
            </tbody>
            <thead>
               <tr>
                  <th>使用场景</th>
                  <th>用户ID</th>
                  <th>用户昵称</th>
                  <th>用户手机号</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>{{DetailData.vouUseSceneName}}</td>
                  <td>{{DetailData.cusId}}</td>
                  <td>{{DetailData.cusNickName}}</td>
                  <td>{{DetailData.cusPhone}}</td>
                  <td></td>
               </tr>
            </tbody>
         </table>

         <el-table :data="cardRecordData" border stripe>
            <el-table-column prop="vouId" label="卡券编号" align="center"></el-table-column>
            <el-table-column prop="id" label="订单编号" align="center"></el-table-column>
            <el-table-column prop="vouUsedTime" label="使用时间" align="center"></el-table-column>
            <el-table-column v-if="DetailData.vouDeductibleType===0" prop="id" label="抵扣金额" align="center">
               <template>
                  <span>{{DetailData.vouDeductibleMoney}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="id" v-if="DetailData.vouDeductibleType==1" label="抵扣商品" align="center">
               <template>
                   <span>{{DetailData.deductHotelProdName}}<span v-if="DetailData.deductHotelProdSpecName!=null">(</span>{{DetailData.deductHotelProdSpecName}}<span v-if="DetailData.deductHotelProdSpecName!=null">)</span></span>
               </template>
            </el-table-column>
         </el-table>

      </div>



        <el-button class="returnback" @click="cancelbtn">返回</el-button>
    </div>
</template>

<script>
export default {
    name: 'LonganCardCouponRecord',
    data() {
        return{
           checkRecordId:'',
           DetailData:{},  //详情
           cardRecordData:[]  //核销列表数据
        }
    },
    created(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.checkRecordId=this.$route.query.id;
        this.getUseCardticketDetail();
        this.getUseCardticketRecord();
    },
    methods: {


       //获取详情
        getUseCardticketDetail(){
          let that=this;
          let params={};
          this.$api.getUseCardticketDetail(params,this.checkRecordId).then(response=>{
            let result=response.data;
            if(result.code==0){
              that.DetailData=result.data
            }else{
              that.$message.error(result.msg)
            }
          }).catch(error=>{
            that.$alert(error,"警告",{
              confirmButtonText:"确定"
            })
          })
        },

      //卡券使用记录
      getUseCardticketRecord(){
        let that=this;
        let params={
           vouId:this.checkRecordId
        }
        this.$api.getUseCardticketRecord({params}).then(response=>{
           let result=response.data
           if(result.code==0){
              that.cardRecordData=result.data
           }else{
             that.$message.error(result.msg)
           }
        }).catch(error=>{
          that.$alert(error,"警告",{
            confirmButtonText:"确定"
          })
        })
      },

       //取消
      cancelbtn(){
       this.$router.push({name:'LonganCardCouponList'})
      },


    }
}
</script>

<style lang="less" scoped>

.CardCouponRecord{
   width: 70%;
   text-align: left;
   .alignleft{
     font-weight: bold;
   }
   .el-table{
     margin-top: 35px;
   }
   table th,table td{
     text-align: left !important;width: 1%;vertical-align: middle !important;
     padding: 15px 10px;box-sizing: border-box;
   }
   table,table tr th, table tr td { border:1px solid #c9c9c9 !important;background: #fff;}
   table {text-align: center; border-collapse: collapse;}
   .returnback{
     margin-top: 20px;
   }

}

</style>

<style lang="less">

</style>


