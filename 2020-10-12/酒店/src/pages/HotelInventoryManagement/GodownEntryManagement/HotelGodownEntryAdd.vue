<template>
    <div class="godownentryadd">
        <p class="title">新增入库单</p>
        <el-form :model="commodityFormData" :rules="commodityFormData.rules" ref="formData" :inline="true" align=left>
            <el-form-item label="入库单编号" prop="godownEntryCode">
                <el-input :disabled="true" v-model="godownEntryCode"></el-input>
            </el-form-item>
            <!-- <el-form-item label="供应商名称" prop="supplierName">
                <el-input v-model="commodityFormData.supplierName" maxlength="32"></el-input>
            </el-form-item> -->
            <el-form-item label="收货日期" prop="receiveDate">
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
            <div class="commodityadd"><el-button v-if="authzlist['F:BH_INV_GODOWNENTRYLIST_ADD_ADDH']" type="primary" @click.prevent="commodityAddLine">新增行</el-button></div>
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
                <el-table-column prop="prodUnitMeasure" label="规格" width="80px" align=center>
                    <template slot-scope="scope">
                        <label v-html="scope.row.prodUnitMeasure" class="labelclass"></label>
                    </template>
                </el-table-column>
                <el-table-column prop="prodCount" label="数量" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityTableData.'+scope.$index+'.prodCount'" :rules="commodityFormData.rules.number">
                            <el-input v-model.number="scope.row.prodCount"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="prodCode" label="商品编码" align=center>
                    <template slot-scope="scope">
                        <label v-html="scope.row.prodCode" class="labelclass"></label>
                    </template>
                </el-table-column>
                <el-table-column prop="productionDate" label="生产日期" width="200px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityTableData.'+scope.$index+'.productionDate'" :rules="commodityFormData.rules.date">
                            <el-date-picker
                                v-model="scope.row.productionDate"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                :picker-options="horizonDate"
                                placeholder="请选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="prodWarrantyPeriod" label="保质期" align=center>
                    <template slot-scope="scope">
                        <label v-html="scope.row.prodWarrantyPeriod" class="labelclass"></label>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80px" align=center>
                    <template slot-scope="scope">
                        <el-button v-if="authzlist['F:BH_INV_GODOWNENTRYLIST_ADD_DETELEH']" type="text" size="small" @click="deleteLine(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item label="备注" class="wraptextarea">
              <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" v-model="Remarkval"></el-input>
           </el-form-item>
        </el-form>
        <br/>
        <div class="commodityadd">
            <el-button @click="cancelAdd">取消</el-button>
            <el-button v-if="authzlist['F:BH_INV_GODOWNENTRYLIST_ADD_SUBMIT']" type="primary" @click="ensureAdd('formData')">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotelGodownEntryAdd',
    data(){
        return{
            authzlist: {}, //权限数据
            encryptedHotelOrgId: '',
            hotelid:'',
            godownEntryCode: '',
            Remarkval:'',
            disabledjudge:true,
            commodityList: [],
            horizonDate:{
                disabledDate(time){
                    return time.getTime() > Date.now() - 8.64e6
                }
            },
            commodityFormData:{
               typedata:[],
                checkinValue:"",
                merchantdata:[],
                rules:{
                    // supplierName: {required: true, message: '请输入供应商名称！', trigger: 'blur'},
                    typeId:{required: true, message: '请选择类型！', trigger: 'change'},
                    receiveDate: {required: true, message: '请选择收货日期！', trigger: 'change'},
                    name: {required: true, message: '请选择商品名称！', trigger: 'change'},
                    number: {min:0, max:99999999, type: 'number', message: '请输入正确的数量！', trigger: 'blur'},
                    date: {required: true, message: '请选择生产日期！', trigger: 'change'},
                },
                commodityTableData: [{
                    prodCode: '',
                    prodUnitMeasure: '',
                    prodCount: '',
                    productionDate: '',
                    prodWarrantyPeriod: '',
                    hotelProdId:'',    //新增酒店商品id
                }]
            },
        }
    },
    mounted(){
        // this.encryptedHotelOrgId = localStorage.getItem('orgId');
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.hotelid = localStorage.getItem('hotelId');
        this.encryptedHotelOrgId = this.$route.params.orgId;
        this.getType();
        this.godownEntryDataCode();
        this.getruzhuDataList();
    },
    methods: {


        //选择类型
        leixing(e){
          let that=this;
          this.commodityFormData.commodityTableData=[{
                    prodCode: '',
                    prodUnitMeasure: '',
                    prodCount: '',
                    productionDate: '',
                    prodWarrantyPeriod: '',
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

        //获取入库单编号
        godownEntryDataCode(){
             const params = {
                // encryptedHotelOrgId: this.encryptedHotelOrgId
                orgAs:3,
                hotelId:this.hotelid,
            };
            this.$api.godownEntryDataCode(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.godownEntryCode = result.data;
                    }else{
                        this.$message.error('入库单编号获取失败！');
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
        //选择商品
        selectCommodity(index,value){
            const commodityInfo = this.commodityList.find(item => item.prodCode === value);
            console.log(commodityInfo.id);
            this.$set(this.commodityFormData.commodityTableData[index], 'hotelProdId', commodityInfo.id);
            this.$set(this.commodityFormData.commodityTableData[index], 'prodUnitMeasure', commodityInfo.prodProductDTO.prodUnitMeasure);
            this.$set(this.commodityFormData.commodityTableData[index], 'prodCode', commodityInfo.prodProductDTO.prodCode);
            this.$set(this.commodityFormData.commodityTableData[index], 'prodWarrantyPeriod', commodityInfo.prodProductDTO.prodWarrantyPeriod);
        },

        //新增行
        commodityAddLine(){
            let newLine = {
                prodCode: '',
                prodUnitMeasure: '',
                prodCount: '',
                productionDate: '',
                prodWarrantyPeriod: '',
                hotelProdId:'',
            };
            this.commodityFormData.commodityTableData.push(newLine);
        },
        //删除
        deleteLine(index){
            this.commodityFormData.commodityTableData.splice(index, 1);
        },
        //保存
        ensureAdd(formData){
            const that = this;
            const params = {
                    // encryptedHotelOrgId: this.encryptedHotelOrgId,
                    hotelId:this.hotelid,
                    orgAs:3,
                    invInCode: this.godownEntryCode,
                    // supplName: this.commodityFormData.supplierName,
                    receiveTime: this.commodityFormData.receiveDate,
                    merId:this.commodityFormData.checkinValue,
                    ownerOrgKind:this.commodityFormData.typeId,
                    detailDTOList: this.commodityFormData.commodityTableData,
                    invInRemark:this.Remarkval
                };
            this.$refs[formData].validate((valid, model) => {
                // console.log(valid);
                // console.log(JSON.stringify(model));
                if(valid){
                    // console.log(params);
                    this.$api.godownEntryAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.data == true){
                                that.$message.success('入库单新增成功！');
                                that.$router.push({name: 'HotelGodownEntryList'});
                            }else{
                                that.$message.error('入库单新增失败！');
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
            this.$router.push({name: 'HotelGodownEntryList'});
        }
    },
}
</script>

<style scoped>
.el-date-editor.el-input{
    width: 160px;
}
</style>


<style lang="less" scoped>
.godownentryadd{
  .wraptextarea{width:100%;margin-top:30px;
      .textarea{width:400px;}
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

