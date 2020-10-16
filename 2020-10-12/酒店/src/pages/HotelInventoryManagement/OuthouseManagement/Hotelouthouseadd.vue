<template>
    <div class="godownentryadd">
        <p class="title">新增出库单</p>
        <el-form :model="commodityFormData" :rules="commodityFormData.rules" ref="formData" :inline="true" align=left>
            <el-form-item label="出库单编号" prop="godownEntryCode">
                <el-input :disabled="true" v-model="commodityFormData.godownEntryCode"></el-input>
            </el-form-item>

            <el-form-item label="出库日期" prop="receiveDate">
                <el-date-picker
                    v-model="commodityFormData.receiveDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="horizonDate"
                    placeholder="请选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="类型" prop="typeId">
                <el-select v-model="commodityFormData.typeId" @change="leixing">
                    <el-option v-for="item in commodityFormData.typedata" :key="item.dictValue" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入驻商名称" prop="checkinValue">
                <el-select v-model="commodityFormData.checkinValue" :disabled="disabledjudge" @change="merchantsj">
                  <el-option v-for="item in commodityFormData.merchantdata" :key="item.id" :label="item.merchantName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <div class="commodityadd"><el-button v-if="authzlist['F:BH_INV_OUTHOUSELIST_ADD_ADDH']" type="primary" @click.prevent="commodityAddLine">新增行</el-button></div>
            <el-table
                :data="commodityFormData.commodityTableData"
                border
                style="width:100%;"
                class="commoditytable">
                <el-table-column prop="prodCode" label="商品名称" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityTableData.'+scope.$index+'.prodCode'" :rules="commodityFormData.rules.name">
                            <el-select
                                v-model="scope.row.prodCode"
                                @change="selectCommodity(scope.$index,scope.row.prodCode)"
                                placeholder="请选择商品">
                                <el-option
                                    v-for="item in commodityList"
                                    :key="item.prodProductDTO.prodCode"
                                    :label="item.prodProductDTO.prodName"
                                    :value="item.prodProductDTO.prodCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="specification" label="规格" width="80px" align=center>
                    <template slot-scope="scope">
                        <label v-html="scope.row.specification" class="labelclass"></label>
                    </template>
                </el-table-column>
                <el-table-column prop="prodCount" label="数量" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityTableData.'+scope.$index+'.prodCount'" :rules="commodityFormData.rules.number">
                            <el-input v-model.number="scope.row.prodCount" @blur="inspectnumber"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="prodCode" label="商品编码" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityTableData.'+scope.$index+'.prodCode'" :rules="commodityFormData.rules.prodCode">
                            <el-input v-model="scope.row.prodCode" :disabled="true"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="prodDesc" label="商品描述" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityTableData.'+scope.$index+'.prodDesc'" :rules="commodityFormData.rules.prodDesc">
                            <el-input v-model.number="scope.row.prodDesc"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80px" align=center>
                    <template slot-scope="scope">
                        <el-button v-if="authzlist['F:BH_INV_OUTHOUSELIST_ADD_DETELEH']" type="text" size="small" @click="deleteLine(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item label="收货人" prop="consignee" class="widthlimit">
                <el-input v-model="commodityFormData.consignee"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="contactphone" class="widthlimit">
                <el-input v-model="commodityFormData.contactphone"></el-input>
            </el-form-item>
            <el-form-item label="出库原因" class="wraptextarea widthlimit">
              <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" v-model="outreason"></el-input>
           </el-form-item>
            <el-form-item label="备注" class="wraptextarea widthlimit">
              <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" v-model="Remarkval"></el-input>
           </el-form-item>
        </el-form>
        <br/>
        <div class="commodityadd">
            <el-button @click="cancelAdd">取消</el-button>
            <el-button v-if="authzlist['F:BH_INV_OUTHOUSELIST_ADDSUBMIT']" type="primary" @click="ensureAdd('formData')">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Hotelouthouseadd',
    data(){
        return{
            authzlist: {}, //权限数据
            encryptedHotelOrgId: '',
            hotelid:'',
            Remarkval:'',
            outreason:'',
            commodityList: [],
            disabledjudge:true,
            horizonDate:{
                disabledDate(time){
                    return time.getTime() > Date.now() - 8.64e6
                }
            },
            stockprocount:'',    //库存数量
            commodityFormData:{
              typeId:"",
              checkinValue:"",
              consignee:'',
              contactphone:'',
              typedata:[{id:"",value:"请选择"},{id:"2",value:"运营商品"},{id:"3",value:"自营商品"},{id:"5",value:"入驻商品"}],
              merchantdata:[],
              godownEntryCode:"",

                rules:{
                    godownEntryCode: {required: true, message: '请填写出库单id！', trigger: 'blur'},
                    receiveDate: {required: true, message: '请选择出库日期！', trigger: 'change'},
                    typeId:{required: true, message: '请选择类型！', trigger: 'change'},
                    name: {required: true, message: '请选择商品名称！', trigger: 'change'},
                    number: {min:1, max:99999999, type: 'number', message: '请输入正确的数量！', trigger: 'blur'},
                    consignee:{required: true, message: '请填写收货人！', trigger: 'blur'},
                    contactphone:{required: true, message: '请填写联系电话！', trigger: 'blur'},
                    prodDesc:{required: true, message: '请填写商品描述！', trigger: 'blur'},
                },
                commodityTableData: [{
                    prodCode: '',
                    specification: '',
                    prodCount: '',
                    prodDesc: '',
                    hotelProdId:'',    //新增酒店商品id
                }]
            },
        }

    },
    created(){
    //   this.encryptedHotelOrgId = localStorage.getItem('orgId');
    (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
      this.hotelid = localStorage.getItem('hotelId');
      this.encryptedHotelOrgId = this.$route.params.orgId;
      this.getType();
      this.getruzhuDataList();
    },
    mounted(){

        this.godownEntryDataCode();

    },
    methods: {

      //选择类型
      leixing(e){
        let that=this;
        this.commodityFormData.commodityTableData=[{
                    prodCode: '',
                    specification: '',
                    prodCount: '',
                    prodDesc: '',
                    hotelProdId:'',
                }];

          if(e==5){
            this.disabledjudge=false
            this.commodityFormData.checkinValue=that.commodityFormData.merchantdata[0].id
          }else{
            this.disabledjudge=true
            this.commodityFormData.checkinValue=""
          }
          this.commodityFormData.typeValue=e
          this.productDataList();
      },

      	//获取类型
        getType(){
          let that=this;
          let params={
             key:'PROD_KIND',
             orgId:0
          }
          this.$api.basicDataItems(params).then(response=>{
             if(response.data.code=='0'){
                that.commodityFormData.typedata=response.data.data
                const allType={
                  dictName:"全部",
                  dictValue:""
                }
                that.commodityFormData.typedata.unshift(allType)
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

      //选择入驻商
      merchantsj(e){
         this.commodityFormData.checkinValue=e
         this.productDataList();
      },

        //获取出库单编号
        godownEntryDataCode(){
             let that=this;
             const params = {
                // encryptedHotelOrgId : this.encryptedHotelOrgId
                hotelId:this.hotelid,
                orgAs:3
            };
            this.$api.getoutDataCode({params})
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        that.commodityFormData.godownEntryCode = result.data;
                        console.log(that.commodityFormData.godownEntryCode)
                    }else{
                        that.$message.error('入库单编号获取失败！');
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //获取商品列表
        productDataList(){
            let that=this;
            const params = {
                // encryptedHotelOrgId: that.encryptedHotelOrgId,
                orgAs:0,
                hotelId:this.hotelid,
                prodOwnerOrgKind:this.commodityFormData.typeId,
                merId:this.commodityFormData.checkinValue
            };
            this.$api.getHotelprodDataList({params})
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        console.log(this.commodityList)
                        this.commodityList = result.data;
                    }else{
                        this.$message.error('商品列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },

        //根据运营商组织Id获取所有酒店
        // gethotelDataList(){
        //     let that=this;

        //     const params = {

        //     };
        //     this.$api.gethotelDataList({params},that.encryptedHotelOrgId)
        //         .then(response => {
        //             console.log(response.data.data.encryptedOprOrgId);
        //             if(response.data.code == 0){
        //                 that.getruzhuDataList(response.data.data.encryptedOprOrgId)
        //             }else{
        //                 this.$message.error('获取失败！');
        //             }
        //         })
        //         .catch(error => {
        //             this.$alert(error,"警告",{
        //                 confirmButtonText: "确定"
        //             })
        //         })
        // },

         //获取入驻商列表ByOprOrgId
        getruzhuDataList(oprOrgId){
            let that=this;
            const params = {
                // oprOrgId:oprOrgId
                orgAs:3,
            };
            this.$api.getruzhuDataList({params})
                .then(response => {
                    if(response.data.code == 0){
                       that.commodityFormData.merchantdata=response.data.data
                       console.log(that.commodityFormData.merchantdata)
                    }else{
                        this.$message.error('获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //选择商品
        selectCommodity(index,value){
            const commodityInfo = this.commodityList.find(item => item.prodCode === value);
            this.stockprocount=commodityInfo.invProdAmount
            console.log(this.stockprocount)
            this.$set(this.commodityFormData.commodityTableData[index], 'hotelProdId', commodityInfo.id);
            this.$set(this.commodityFormData.commodityTableData[index], 'specification', commodityInfo.prodProductDTO.prodUnitMeasure);
            this.$set(this.commodityFormData.commodityTableData[index], 'prodCode', commodityInfo.prodProductDTO.prodCode);
        },
        //新增行
        commodityAddLine(){
            let newLine = {
                prodCode: '',
                specification: '',
                prodCount: '',
                prodDesc: '',
                hotelProdId:'',
            };
            this.commodityFormData.commodityTableData.push(newLine);
        },
        //删除
        deleteLine(index){
            this.commodityFormData.commodityTableData.splice(index, 1);
        },
        //验证库存
        inspectnumber:function(){
           let that=this;
           for(let i=0;i<this.commodityFormData.commodityTableData.length;i++){
              if(this.commodityFormData.commodityTableData[i]){
                let commodityInfo2 = this.commodityList.find(item => item.prodCode === this.commodityFormData.commodityTableData[i].prodCode);
                if(commodityInfo2.invProdAmount<=0 && this.commodityFormData.commodityTableData[i].prodCount!=''){
                  that.$message.error(commodityInfo2.prodProductDTO.prodName+'没有库存了,请选择其它商品');
                  return false
                }else if(this.commodityFormData.commodityTableData[i].prodCount>commodityInfo2.invProdAmount){
                  that.$message.error(commodityInfo2.prodProductDTO.prodName+'出库数量不能大于库存');
                  return false
                }

              }

           }
        },

        //保存
        ensureAdd(formData){
            const that = this;
            const params = {
                    // encryptedHotelOrgId: this.encryptedHotelOrgId,
                    hotelId:this.hotelid,
                    invOutCode: this.commodityFormData.godownEntryCode,
                    outTime: this.commodityFormData.receiveDate,
                    ownerOrgKind:this.commodityFormData.typeId,
                    merId: this.commodityFormData.checkinValue,
                    detailDTOList:this.commodityFormData.commodityTableData,
                    consigneeName:this.commodityFormData.consignee,
                    consigneePhone:this.commodityFormData.contactphone,
                    invOutReason:this.outreason,
                    invOutRemark:this.Remarkval
                };
                for(let i=0;i<this.commodityFormData.commodityTableData.length;i++){
                    if(this.commodityFormData.commodityTableData[i]){
                      let commodityInfo2 = this.commodityList.find(item => item.prodCode === this.commodityFormData.commodityTableData[i].prodCode);
                      if(commodityInfo2.invProdAmount<=0 && this.commodityFormData.commodityTableData[i].prodCount!=''){
                        that.$message.error(commodityInfo2.prodProductDTO.prodName+'没有库存了,请选择其它商品');
                        return false
                      }else if(this.commodityFormData.commodityTableData[i].prodCount>commodityInfo2.invProdAmount){
                        that.$message.error(commodityInfo2.prodProductDTO.prodName+'出库数量不能大于库存');
                        return false
                      }

                    }

                }
            this.$refs[formData].validate((valid, model) => {

                if(valid){
                    // console.log(params);
                    this.$api.addourorder(params)
                        .then(response => {
                            const result = response.data;
                            if(result.data == true){
                                that.$message.success('出库单新增成功！');
                                that.$router.push({name: 'Hotelouthouselist'});
                            }else{
                                that.$message.error('出库单新增失败！');
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
        cancelAdd(){
            this.$router.push({name: 'Hotelouthouselist'});
        }
    },
}
</script>

<style>

.widthlimit .el-form-item__label{width: 80px;}
</style>


<style lang="less" scoped>
.godownentryadd{
  .widthlimit{width: 100%;}
  .wraptextarea{width:100%;margin-top:30px;
      .textarea{width:400px;}
    }
    .el-date-editor.el-input{
    width: 160px;
}

    .title{
        font-weight: bold;
        text-align: left;
    }
    .commodityadd{
        width: 100%;
        text-align: left;
        margin-bottom: 10px;
    }
    .labelclass{
        display: inline-block;
        line-height: 40px;
        margin-bottom: 22px;
    }
}
</style>

