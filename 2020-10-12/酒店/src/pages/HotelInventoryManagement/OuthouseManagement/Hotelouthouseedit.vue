<template>
    <div class="godownentryadd">
        <p class="title">修改出库单</p>
        <el-form :model="commodityFormData" :rules="commodityFormData.rules" ref="formData" :inline="true" align=left>
            <el-form-item label="出库单编号" prop="invOutCode">
                <el-input v-model="commodityFormData.godownEntryDataDetail.invOutCode" maxlength="11" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="出库日期" prop="godownEntryDataDetail.outTime" :rules="commodityFormData.rules.outTime">
                <el-date-picker
                    v-model="commodityFormData.godownEntryDataDetail.outTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="horizonDate"
                    placeholder="请选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="类型" prop="godownEntryDataDetail.ownerOrgKind" :rules="commodityFormData.rules.ownerOrgKind">
                <el-select v-model="commodityFormData.godownEntryDataDetail.ownerOrgKind" @change="leixing">
                    <el-option v-for="item in commodityFormData.typedata" :key="item.dictValue" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入驻商名称" prop="merId">
                <el-select v-model="commodityFormData.godownEntryDataDetail.merId" :disabled="disabledjudge" @change="merchantsj">
                  <el-option v-for="item in commodityFormData.merchantdata" :key="item.id" :label="item.merchantName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <div class="commodityadd"><el-button v-if="authzlist['F:BH_INV_OUTHOUSELISTALTER_ADDH']" type="primary" @click.prevent="commodityAddLine">新增行</el-button></div>
            <el-table
                :data="commodityFormData.commodityDataList"
                border
                style="width:100%;"
                class="commoditytable">
                <el-table-column prop="prodCode" label="商品名称" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityDataList.'+scope.$index+'.prodCode'" :rules="commodityFormData.rules.name">
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
                <el-table-column prop="prodUnitMeasure" label="规格" width="80px" align=center>
                    <template slot-scope="scope">
                        <label v-html="scope.row.prodUnitMeasure" class="labelclass"></label>
                    </template>
                </el-table-column>
                <el-table-column prop="prodCount" label="数量" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityDataList.'+scope.$index+'.prodCount'" :rules="commodityFormData.rules.number">
                            <el-input v-model.number="scope.row.prodCount" @blur="inspectnumber"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="prodCode" label="商品编码" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityDataList.'+scope.$index+'.prodCode'" :rules="commodityFormData.rules.prodCode">
                            <el-input v-model="scope.row.prodCode" :disabled="true"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="prodDesc" label="商品描述" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityDataList.'+scope.$index+'.prodDesc'" :rules="commodityFormData.rules.prodDesc">
                            <el-input v-model.number="scope.row.prodDesc"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80px" align=center>
                    <template slot-scope="scope">
                        <el-button v-if="authzlist['F:BH_INV_OUTHOUSELISTALTER_DETELEH']" type="text" size="small" @click="deleteLine(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item label="收货人" prop="godownEntryDataDetail.consigneeName" class="widthlimit" :rules="commodityFormData.rules.consigneeName">
                <el-input v-model="commodityFormData.godownEntryDataDetail.consigneeName"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="godownEntryDataDetail.consigneePhone" class="widthlimit" :rules="commodityFormData.rules.consigneePhone">
                <el-input v-model="commodityFormData.godownEntryDataDetail.consigneePhone"></el-input>
            </el-form-item>
            <el-form-item label="出库原因" class="wraptextarea widthlimit">
              <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" v-model="commodityFormData.godownEntryDataDetail.invOutReason"></el-input>
           </el-form-item>
            <el-form-item label="备注" class="wraptextarea widthlimit">
              <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" v-model="commodityFormData.godownEntryDataDetail.invOutRemark"></el-input>
           </el-form-item>
        </el-form>
        <br/>
        <div class="commodityadd">
            <el-button @click="cancelAdd">取消</el-button>
            <el-button v-if="authzlist['F:BH_INV_OUTHOUSELISTALTERSUBMIT']" type="primary" @click="ensureAdd('formData')">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Hotelouthouseedit',
    data(){
        return{
            hotelid:'',
            authzlist:{},
            encryptedHotelOrgId: '',
            Remarkval:'',
            outreason:'',
            commodityList: [],
            gEId:"",
            disabledjudge:true,
            stockprocount:'',  //库存数量
            defaultmerId:'',   //选择类型入驻商默认id
            horizonDate:{
                disabledDate(time){
                    return time.getTime() > Date.now() - 8.64e6
                }
            },
            commodityDataList2:[],
            commodityFormData:{
              godownEntryDataDetail:{},
              typeId:"",
              checkinValue:"",
              consignee:'',
              contactphone:'',
              typedata:[{id:"",value:"请选择"},{id:3,value:"自营商品"},{id:2,value:"运营商品"},{id:5,value:"入驻商品"}],
              merchantdata:[],
              godownEntryCode:"",
                rules:{
                    godownEntryCode: {required: true, message: '请填写出库单id！', trigger: 'blur'},
                    outTime: {required: true, message: '请选择出库日期！', trigger: 'change'},
                    ownerOrgKind:{required: true, message: '请选择类型！', trigger: 'change'},
                    name: {required: true, message: '请选择商品名称！', trigger: 'change'},
                    number: {min:0, max:99999999, type: 'number', message: '请输入正确的数量！', trigger: 'blur'},
                    consigneeName:{required: true, message: '请填写收货人！', trigger: 'blur'},
                    consigneePhone:{required: true, message: '请填写联系电话！', trigger: 'blur'},
                    prodDesc:{required: true, message: '请填写商品描述！', trigger: 'blur'},
                },
                commodityDataList: [{
                    prodCode: '',
                    prodUnitMeasure: '',
                    prodCount: '',
                    prodDesc: '',
                    hotelProdId:'',    //新增酒店商品id
                }]
            },
        }
    },
    created(){
    //   this.encryptedHotelOrgId = localStorage.getItem('orgId');
      // this.encryptedHotelOrgId = this.$route.params.orgId;
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
      this.hotelid = localStorage.getItem('hotelId');
      this.gEId = this.$route.query.id;
      this.getType();
      this.getruzhuDataList();
      this.outhouseDetail();


    },
    mounted(){


    },
    methods: {

      //选择类型
      leixing(e){

        this.commodityFormData.commodityDataList=[{
                    prodCode: '',
                    prodUnitMeasure: '',
                    prodCount: '',
                    prodDesc: '',
                    hotelProdId:'',
                }];

          if(e==5){
            this.disabledjudge=false
            if(this.defaultmerId){
              this.commodityFormData.godownEntryDataDetail.merId=this.defaultmerId
            }else{
              this.commodityFormData.godownEntryDataDetail.merId=this.commodityFormData.merchantdata[0].id
            }

          }else{
            this.disabledjudge=true
            this.commodityFormData.godownEntryDataDetail.merId=""
          }
          this.commodityFormData.godownEntryDataDetail.ownerOrgKind=e
          this.productDataList();
       },

      //选择入驻商
      merchantsj(e){
         this.commodityFormData.godownEntryDataDetail.merId=e
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


      //出库单详情
        outhouseDetail(){
            let that=this;
            const params = {};
            const id = this.gEId;
            this.$api.outhouseDetail(params, id)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        that.commodityFormData.godownEntryDataDetail = result.data;
                        that.commodityFormData.commodityDataList = result.data.detailDTOList;
                        that.defaultmerId=that.commodityFormData.godownEntryDataDetail.merId
                        that.commodityDataList2=result.data.detailDTOList;
                        console.log(that.commodityDataList2)
                        this.productDataList();
                        if(that.commodityFormData.godownEntryDataDetail.ownerOrgKind==5){
                           that.disabledjudge=false
                        }else{
                          that.disabledjudge=true
                        }
                    }else{
                        that.$message.error('入库单详情获取失败！');
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
                // orgAs:3,
                orgAs:0,
                hotelId:this.hotelid,
                prodOwnerOrgKind:this.commodityFormData.godownEntryDataDetail.ownerOrgKind,
                merId:this.commodityFormData.godownEntryDataDetail.merId
            };
            this.$api.productDataList({params})
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
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


         //获取入驻商列表ByOprOrgId
        getruzhuDataList(oprOrgId){
            let that=this;
            const params = {
                // oprOrgId:oprOrgId
                orgAs:3
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
            console.log(commodityInfo.invProdAmount)
            this.$set(this.commodityFormData.commodityTableData[index], 'hotelProdId', commodityInfo.id);
            this.$set(this.commodityFormData.commodityDataList[index], 'prodUnitMeasure', commodityInfo.prodProductDTO.prodUnitMeasure);
            this.$set(this.commodityFormData.commodityDataList[index], 'prodCode', commodityInfo.prodProductDTO.prodCode);
        },
        //新增行
        commodityAddLine(){
            let newLine = {
                prodCode: '',
                prodUnitMeasure: '',
                prodCount: '',
                prodDesc: '',
                hotelProdId:'',
            };
            this.commodityFormData.commodityDataList.push(newLine);
        },
        //删除
        deleteLine(index){
            this.commodityFormData.commodityDataList.splice(index, 1);
        },

        //验证库存
        inspectnumber:function(){
           let that=this;
           for(let i=0;i<this.commodityFormData.commodityDataList.length;i++){
              if(this.commodityFormData.commodityDataList[i]){
                let commodityInfo2 = this.commodityList.find(item => item.prodCode === this.commodityFormData.commodityDataList[i].prodCode);
                // console.log(commodityInfo2.prodProductDTO.prodName)
                if(commodityInfo2.invProdAmount<=0 && this.commodityFormData.commodityDataList[i].prodCount!=''){
                  that.$message.error(commodityInfo2.prodProductDTO.prodName+'没有库存了,请选择其它商品');
                  return false
                }else if(this.commodityFormData.commodityDataList[i].prodCount>commodityInfo2.invProdAmount){
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
                    hotelId:this.hotelid,
                    // encryptedHotelOrgId: this.encryptedHotelOrgId,
                    invOutCode: this.commodityFormData.godownEntryDataDetail.invOutCode,
                    outTime: this.commodityFormData.godownEntryDataDetail.outTime,
                    ownerOrgKind:this.commodityFormData.godownEntryDataDetail.ownerOrgKind,
                    merId: this.commodityFormData.godownEntryDataDetail.merId,
                    detailDTOList:this.commodityFormData.commodityDataList,
                    consigneeName:this.commodityFormData.godownEntryDataDetail.consigneeName,
                    consigneePhone:this.commodityFormData.godownEntryDataDetail.consigneePhone,
                    invOutReason:this.commodityFormData.godownEntryDataDetail.invOutReason,
                    invOutRemark:this.commodityFormData.godownEntryDataDetail.invOutRemark
                };

                for(let i=0;i<this.commodityFormData.commodityDataList.length;i++){
                    if(this.commodityFormData.commodityDataList[i]){
                      let commodityInfo2 = this.commodityList.find(item => item.prodCode === this.commodityFormData.commodityDataList[i].prodCode);
                      console.log(commodityInfo2)
                      if(commodityInfo2.invProdAmount<=0 && this.commodityFormData.commodityDataList[i].prodCount!=''){
                        that.$message.error(commodityInfo2.prodProductDTO.prodName+'没有库存了,请选择其它商品');
                        return false
                      }else if(this.commodityFormData.commodityDataList[i].prodCount>commodityInfo2.invProdAmount){
                        that.$message.error(commodityInfo2.prodProductDTO.prodName+'出库数量不能大于库存');
                        return false
                      }

                    }

                }

            this.$refs[formData].validate((valid, model) => {

                if(valid){
                    const id = this.gEId;
                    this.$api.modifyupdate(params,id)
                        .then(response => {
                            const result = response.data;
                            if(result.data == true){
                                that.$message.success('出库单修改成功！');
                                that.$router.push({name: 'Hotelouthouselist'});
                            }else{
                                that.$message.error('出库单修改失败！');
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

