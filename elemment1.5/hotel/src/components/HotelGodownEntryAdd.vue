<template>
    <div class="godownentryadd">
        <p class="title">新增入库单</p>
        <el-form :model="commodityFormData" :rules="commodityFormData.rules" ref="formData" :inline="true" align=left>
            <el-form-item label="入库单编号" prop="godownEntryCode">
                <el-input :disabled="true" v-model="godownEntryCode"></el-input>
            </el-form-item>
            <!-- <el-form-item label="操作人" prop="operatorName">
                <el-input :disabled="true" v-model="operatorName"></el-input>
            </el-form-item> -->
            <el-form-item label="供应商名称" prop="supplierName">
                <el-input v-model="commodityFormData.supplierName"></el-input>
            </el-form-item>
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
            <div class="commodityadd"><el-button type="primary" @click.prevent="commodityAddLine">新增行</el-button></div>
            <el-table 
                :data="commodityFormData.commodityTableData" 
                border 
                style="width:100%;"
                class="commoditytable">
                <el-table-column prop="prodId" label="商品名称" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityTableData.'+scope.$index+'.prodId'" :rules="commodityFormData.rules.name">
                            <el-select
                                v-model="scope.row.prodId"
                                @change="selectCommodity(scope.$index,scope.row.prodId)"
                                placeholder="请选择商品">
                                <el-option
                                    v-for="item in commodityList"
                                    :key="item.id"
                                    :label="item.productName"
                                    :value="item.id">
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
                            <el-input v-model.number="scope.row.prodCount"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="commodityCode" label="商品编码" align=center>
                    <template slot-scope="scope">
                        <label v-html="scope.row.commodityCode" class="labelclass"></label>
                    </template>
                </el-table-column>
                <el-table-column prop="productiveAt" label="生产日期" width="180px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'commodityTableData.'+scope.$index+'.productiveAt'" :rules="commodityFormData.rules.date">
                            <el-date-picker
                                v-model="scope.row.productiveAt"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                :picker-options="horizonDate"
                                placeholder="请选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="expirationDate" label="保质期" align=center>
                    <template slot-scope="scope">
                        <label v-html="scope.row.expirationDate" class="labelclass"></label>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80px" align=center>
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="deleteLine(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <br/>
        <div class="commodityadd">
            <el-button @click="cancelAdd">取消</el-button>
            <el-button type="primary" @click="ensureAdd('formData')">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotelGodownEntryAdd',
    data(){
        return{
            encryptedHotelOrgId: '',
            godownEntryCode: '',
            // operatorName: '27',
            commodityList: [],
            horizonDate:{
                disabledDate(time){
                    return time.getTime() > Date.now() - 8.64e6
                }
            },
            commodityFormData:{
                rules:{
                    supplierName: {required: true, message: '请输入供应商名称！', trigger: 'blur'},
                    receiveDate: {required: true, message: '请选择收货日期！', trigger: 'change'},

                    name: {required: true, message: '请选择商品名称！', trigger: 'change'},
                    number: {min:0, max:99999999, type: 'number', message: '请输入正确的数量！', trigger: 'blur'},
                    date: {required: true, message: '请选择生产日期！', trigger: 'change'},
                },
                commodityTableData: [{
                    prodId: '',
                    specification: '',
                    prodCount: '',
                    commodityCode: '',
                    productiveAt: '',
                    expirationDate: ''
                }]
            },
        }
    },
    mounted(){
        this.encryptedHotelOrgId = localStorage.getItem('orgId');
        this.godownEntryDataCode();
        this.commodityDataList();
    },
    methods: {
        //获取入库单编号
        godownEntryDataCode(){
             const params = {
                encryptedHotelOrgId: this.encryptedHotelOrgId
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
        //获取商品列表  
        commodityDataList(){
            const params = {};
            this.$api.commodityDataList(params)
                .then(response => {
                    // console.log(response);
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
        //选择商品
        selectCommodity(index,value){
            const commodityInfo = this.commodityList.find(item => item.id === value);
            // console.log(commodityInfo);
            this.$set(this.commodityFormData.commodityTableData[index], 'specification', commodityInfo.proSize);
            this.$set(this.commodityFormData.commodityTableData[index], 'commodityCode', commodityInfo.sqSign);
            this.$set(this.commodityFormData.commodityTableData[index], 'expirationDate', commodityInfo.expPeriod);
        },
        //新增行
        commodityAddLine(){
            let newLine = {
                prodId: '',
                specification: '',
                prodCount: '',
                commodityCode: '',
                productiveAt: '',
                expirationDate: ''
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
                    encryptedHotelOrgId: this.encryptedHotelOrgId,
                    invInCode: this.godownEntryCode,
                    // createdBy: this.operatorName,
                    supplName: this.commodityFormData.supplierName,
                    receiveAt: this.commodityFormData.receiveDate,
                    invInDetailDTOList: this.commodityFormData.commodityTableData,
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

