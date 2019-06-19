<template>
    <div class="purchaseadd">
        <el-form :model="commodityFormData" :inline="true" :rules="rules" ref="commodityFormData" align=left>
            <el-form-item label="采购单id" class="ordertitle">
                <el-input v-model="commodityFormData.purCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="酒店名称" class="ordertitle" prop="hotelName">
                 <el-select class="termput" v-model="commodityFormData
.hotelName" placeholder="请选择" @change="selectdate">
                    <el-option v-for="item in hoteldata" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商名称" class="ordertitle" prop="supplName">
                <el-input maxlength="32" v-model.trim="commodityFormData.supplName"></el-input>
            </el-form-item>
            <el-form-item label="采购人手机号" class="ordertitle" prop="purMobile" >
                <el-input maxlength="11" v-model.trim="commodityFormData.purMobile"></el-input>
            </el-form-item>
            <el-form-item label="预计到货时间" class="adddateone ordertitle" prop="arrivedate">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="commodityFormData.arrivedAt" style="width: 202px;" format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="到货方式" class="ordertitle">
                <el-input v-model="commodityFormData.arrivedWay"></el-input>
            </el-form-item>

        <el-row>
        <el-col :span="24" class="addcommodity">
                <el-button type="primary" @click="addproduct()">新增行</el-button>
            </el-col>
        </el-row>

        <el-table :data="commodityFormData.purOrderDetailDTOS" border style="width:100%;" >
            <el-table-column fixed prop="prodId" label="商品名称" align=center>
                 <template slot-scope="scope">
                        <el-form-item :prop="'purOrderDetailDTOS.'+scope.$index+'.prodId'" :rules="rules.name">
                            <el-select
                                v-model="scope.row.prodId"
                                @change="selectCommodity(scope.$index,scope.row.prodId)"
                                placeholder="请选择商品">
                                <el-option
                                    v-for="item in commodityList"
                                    :key="item.prodId"
                                    :label="item.productName"
                                    :value="item.prodId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                  </template>
            </el-table-column>
            <el-table-column prop="prodSize" label="规格" align=center>
                <template slot-scope="scope">
                        <label v-html="scope.row.prodSize" class="labelclass"></label>
                </template>
            </el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center>
                 <template slot-scope="scope">
                        <el-form-item :prop="'purOrderDetailDTOS.'+scope.$index+'.prodCount'" :rules="rules.number">
                            <el-input v-model.number="scope.row.prodCount"></el-input>
                        </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" align=center>
                 <template slot-scope="scope">
                        <el-form-item :prop="'purOrderDetailDTOS.'+scope.$index+'.remark'">
                            <el-input v-model="scope.row.remark"></el-input>
                        </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="" label="操作" align=center is-center>
                <template slot-scope="scope">
                            <el-button type="text" size="small" @click="deleteLine(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-form-item label="备注" class="wraptextarea">
              <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" v-model="commodityFormData.oprRemark"></el-input>
        </el-form-item>

      </el-form>

        <el-row>
        <el-col :span="24" class="niuwrap">
                <el-button type="primary" @click="cancelbtn()">取消</el-button>
                <el-button type="primary" @click="surebtn('commodityFormData')">确定</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: 'PurchaseOrderedit',
    data() {
      var mPhoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
      var validatePhone = (rule,value,callback) => {
             if(!value){
                callback()
            }else if(!mPhoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            prodchangeid:"",  //修改id
            orgIdid:"",  //标识
            hoteldata:null,  //酒店下拉数据
            oprRemarkval:"",   //备注
            commodityList:[],  //选择商品
            selecthotelid:"", //所选酒店id

            commodityFormData:{
              hotelName:"",
              supplName:"",

              purOrderDetailDTOS:[{
                 prodId: '',  //商品名称
                 prodSize: '',    //商品规格
                 prodCount: '',  //商品数量
                 remark: '',   //备注
              }]
            },
             rules:{
                    hotelName: {required: true, message: '请选择酒店名称！', trigger: 'blur'},
                    supplName: {required: true, message: '请输入供应商名称！', trigger: 'blur'},
                    name: {required: true, message: '请选择商品名称！', trigger: 'change'},
                    number: {min:0, max:99999999, type: 'number', message: '请输入正确的数量！', trigger: 'blur'},
                    purMobile:{validator: validatePhone, trigger: 'blur'}
                },

        }
    },
    created(){
        this.prodchangeid=this.$route.params.productid;
        this.orgIdid=localStorage.orgId
        this.Getdata()
        this.gethotel()
    },
    methods: {
        //添加商品
        addproduct(){
          let newLine = {
                prodId: '',
                prodSize: '',
                prodCount: '',
                remark: '',
            };
            this.commodityFormData.purOrderDetailDTOS.push(newLine);

        },
        //删除
        deleteLine(index){
            this.commodityFormData.purOrderDetailDTOS.splice(index,1)
        },
        //得到酒店数据
         gethotel(){
            let that=this;
            let params="";
            this.$api.queryhotel(params,that.orgIdid).then(response=>{
              if(response.data.code==0){
                  that.hoteldata=response.data.data
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

         //得到酒店商品数据
         gethotelprod(e){
            let that=this;
            let params="";
            this.$api.queryhotelprod(params,e).then(response=>{
              if(response.data.code==0){
                  that.commodityList=response.data.data
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


        //选择酒店
        selectdate(e){
          let that=this;
          that.selecthotelid=e;
          that.gethotelprod(e)
        },

        //选择酒店商品
        selectCommodity(index,value){
            const commodityInfo = this.commodityList.find(item => item.prodId === value);
            this.$set(this.commodityFormData.purOrderDetailDTOS[index], 'prodSize', commodityInfo.proSize);
        },

        //确定添加
        surebtn(commodityFormData){
          let that=this;
          let id=that.prodchangeid

          let params={
             hotelId:that.selecthotelid,
             orgId:that.orgIdid,
             purCode:that.commodityFormData.purCode,
             hotelName:that.commodityFormData.hotelName,
             supplName:that.commodityFormData.supplName,
             purMobile:that.commodityFormData.purMobile,
             arrivedAt:that.commodityFormData.arrivedAt,
             arrivedWay:that.commodityFormData.arrivedWay,
             oprRemark:that.commodityFormData.oprRemark,
             purOrderDetailDTOS:that.commodityFormData.purOrderDetailDTOS
          }
          this.$refs[commodityFormData].validate((valid) => {

             if(valid){

                    this.$api.uploadpurchaseorder(params,id)
                        .then(response => {
                          if(response.data.code==0){
                              that.$message.success('修改采购单成功！');
                                    that.$router.push({name: 'PurchaseOrderlist'});
                          }else{
                            that.$alert(response.data.msg,"警告",{
                            confirmButtonText: "确定"
                             })
                          }
                        })
                        .catch(error => {
                            that.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!');
                    return false
                }
          })
        },

      //取消
      cancelbtn(){
       this.$router.push({name:'PurchaseOrderlist'})
      },

      //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.lookpurchaseorder({params},that.prodchangeid).then(response=>{
                if(response.data.code==0){
                  that.commodityFormData=response.data.data
                  that.selecthotelid=response.data.data.hotelId
                  let e=response.data.data.hotelId
                  that.gethotelprod(e)
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
   .addcommodity{text-align:left;margin-bottom: 12px;}
   .niuwrap{text-align:left;margin-top: 60px;}
}

</style>
<style>
   .ordertitle .el-form-item__label{width:100px;}
</style>





