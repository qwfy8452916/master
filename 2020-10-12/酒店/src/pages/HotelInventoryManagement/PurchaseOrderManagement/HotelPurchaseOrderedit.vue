<template>
    <div class="purchaseadd">
        <el-form :model="commodityFormData" :inline="true" align=left ref="commodityFormData">
            <el-form-item label="采购单id" class="seeordertitle">
                <el-input v-model="commodityFormData.purCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" class="seeordertitle">
                <el-input v-model="commodityFormData.supplName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="采购人手机号" class="seeordertitle" prop="purMobile" >
                <el-input maxlength="11" v-model.trim="commodityFormData.purMobile" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="预计到货时间" class="adddateone seeordertitle">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" :disabled="true" v-model="commodityFormData.arrivedAt" style="width: 202px;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="到货方式" class="seeordertitle">
                <el-input v-model="commodityFormData.arrivedWay" :disabled="true"></el-input>
            </el-form-item>
        <el-table :data="commodityFormData.purOrderDetailDTOS
" border style="width:100%;" >
            <el-table-column fixed prop="prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="prodSize" label="规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center></el-table-column>
            <el-table-column prop="remark" label="备注" align=center></el-table-column>
        </el-table>
        <el-form-item label="" class="wraptextarea">
              <el-input class="textarea" :rows="3" type="textarea" v-model="commodityFormData.oprRemark" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="" class="wraptextarea">
              <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" v-model="commodityFormData.hotelRemark"></el-input>
        </el-form-item>
      </el-form>
        <el-row>
        <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">返回</el-button>
                <el-button v-if="authzlist['F:BH_PUR_PURCHASEORDERLISTALTERSUBMIT']" type="primary" @click="surebtn()">确定</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: 'HotelPurchaseOrderedit',
    data() {
        return{
            authzlist: {}, //权限数据
            prodchangeid:"",  //查看id
            commodityFormData:{},  //数据
            hotelRemarkdetail:"",  //酒店备注
        }
    },
    created(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.prodchangeid=this.$route.query.productid;
        this.Getdata()
    },
    methods: {


       //取消
      cancelbtn(){
       this.$router.push({name:'HotelPurchaseOrderlist'})
      },

       //确定
      surebtn(){
         let that=this;
            let params={
               hotelRemark:that.commodityFormData.hotelRemark,
            };
            this.$api.Hoteleditpurchaseorder(params,that.prodchangeid).then(response=>{
                if(response.data.code==0){
                       that.$message.success('修改采购单成功！');
                       this.$router.push({name:'HotelPurchaseOrderlist'})
                }else{
                  that.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              that.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
      },

        //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.Hotellookpurchaseorder({params},that.prodchangeid).then(response=>{
                if(response.data.code==0){
                  that.commodityFormData=response.data.data
                }else{
                  that.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              that.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        }

    }
}
</script>

<style lang="less" scoped>
.purchaseadd{
    width: 80%;
    .wraptextarea{width:100%;margin-top:30px;
      .textarea{width:400px;}
    }
   .niuwrap{text-align:left;margin-top: 60px;}
}

</style>

<style>
   .seeordertitle .el-form-item__label{width:100px;}
</style>


