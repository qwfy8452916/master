<template>
   <div class="CardCouponDetail">
      <el-form align="left" label-width="140px">
          <el-form-item label="酒店">
             <span>{{DetailData.vouOwnerOrgName}}</span>
          </el-form-item>
          <el-form-item label="顾客ID">
             <span>{{DetailData.cusId}}</span>
          </el-form-item>
          <el-form-item label="顾客昵称">
             <span>{{DetailData.cusNickName}}</span>
          </el-form-item>
          <el-form-item label="顾客手机">
             <span>{{DetailData.cusPhone}}</span>
          </el-form-item>
          <el-form-item label="卡券名称">
             <span>{{DetailData.vouName}}</span>
          </el-form-item>
          <el-form-item label="卡券说明">
               <span class="carddesc">{{DetailData.vouInstruction}}</span>
          </el-form-item>
          <el-form-item label="卡券图片" class="cardpicbox">
             <span class="cardpic">
                <img :src="DetailData.vouImageUrl">
             </span>
          </el-form-item>
          <el-form-item label="基础价格">
             <span>{{DetailData.vouBasicPrice}}</span>
          </el-form-item>
          <el-form-item label="允许转赠">
             <span v-if="DetailData.canGive===0">不可以</span>
             <span v-if="DetailData.canGive===1">可以</span>
          </el-form-item>
          <el-form-item label="是否转赠">
             <span v-if="DetailData.isGived===0">不是</span>
             <span v-if="DetailData.isGived===1">是</span>
          </el-form-item>
          <el-form-item label="转赠人ID" v-if="DetailData.isGived==1">
             <span>{{DetailData.givedUserId}}</span>
          </el-form-item>
          <el-form-item label="转赠时间" v-if="DetailData.isGived==1">
             <span>{{DetailData.givedTime}}</span>
          </el-form-item>
          <el-form-item label="有效期">
             <span>{{DetailData.vouStartDate}}-{{DetailData.vouEndDate}}</span>
          </el-form-item>
          <el-form-item label="使用场景">
             <span>{{DetailData.vouUseSceneName}}</span>
          </el-form-item>
          <el-form-item label="核销地点" v-if="DetailData.vouUseScene==1">
             <span>{{DetailData.verifiedAddress}}</span>
          </el-form-item>
          <el-form-item label="可核销次数" v-if="DetailData.vouUseScene==1">
             <span>{{DetailData.vouVerifiedTotal}}</span>
          </el-form-item>
          <el-form-item label="剩余核销次数" v-if="DetailData.vouUseScene==1">
             <span>{{DetailData.vouRemainingVerifiedNum}}</span>
          </el-form-item>
          <el-form-item label="抵扣设置" v-if="DetailData.vouUseScene==2">
             <span v-if="DetailData.vouDeductibleType===0">{{DetailData.vouDeductibleMoney}}</span>
             <span v-if="DetailData.vouDeductibleType===1">{{DetailData.deductHotelProdName}}{{DetailData.deductHotelProdSpecName}}</span>
          </el-form-item>
          <el-form-item label="创建人">
             <span>{{DetailData.createdByName}}</span>
          </el-form-item>
          <el-form-item label="创建时间">
             <span>{{DetailData.createdAt}}</span>
          </el-form-item>

            <el-form-item>
                <el-button @click="cancelBtn">返回</el-button>
            </el-form-item>
      </el-form>
   </div>
</template>

<script>
export default {
  name:"LonganCardCouponDetail",
  data(){


      return {
       LonganName:"",
       detailId:'',
       DetailData:{},
    }
  },
  created(){
        this.detailId=this.$route.query.id;
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.LonganName=localStorage.LonganName;
        this.getUseCardticketDetail()
  },
  mounted(){

  },
  methods:{



        //获取详情
        getUseCardticketDetail(){
          let that=this;
          let params={};
          this.$api.getUseCardticketDetail(params,this.detailId).then(response=>{
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



        cancelBtn(){
          this.$router.push({name:"LonganCardCouponList"})
        },

  }
}
</script>

<style lang="less" scope>
  .CardCouponDetail{
    .el-input,.el-select,.el-textarea{
      width: 300px;
    }
    .vouTermType{
      display: inline-block;
    }
    .vouTermType .el-input{
      width:100px;
    }
    .frequency.el-input{
      width:100px;
    }
    .vouDeductibleType.el-input{
      width:100px;
    }
    .vouVerifiedTotal.el-input{
      width: 200px;
    }
    .vouDeductibleLonganProdId.el-select{
      .el-input{
        width: 230px;
      }
    }
    .Moneywrap{
      display: inline-block;
    }
    .cardpicbox{
      width: 50%;
    }
    .cardpic{
      width: 130px;
      height: 130px;
      overflow: hidden;
      display: inline-block;
        img{
          width: 100%;
          height: 100%;
        }
    }
    .carddesc{
      display: inline-block;
      overflow: hidden;
      width: 460px;
      height: 110px;
      padding: 5px;
      box-sizing: border-box;
      border: 1px solid #c9c9c9;
      vertical-align: top;
    }
  }
</style>



