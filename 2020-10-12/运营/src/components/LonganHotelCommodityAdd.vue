<template>
    <div class="commoditymodify">
        <p class="title">添加酒店商品</p>
        <el-form v-model="HotelCommodityDataAdd" :model="HotelCommodityDataAdd" :rules="rules" ref="HotelCommodityDataAdd" label-width="120px" class="hotelcommodityform">
            <el-form-item label="商品名称" prop="commodityName">
                <el-select v-model="HotelCommodityDataAdd.commodityName" placeholder="请选择" @change="commoditySelect">
                    <el-option
                        v-for="item in commodityList" 
                        :key="item.id" 
                        :label="item.productName" 
                        :value="item.id"
                        :data-price="item.priceMax">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="安全库存" prop="safeStock">
                <el-input v-model.number="HotelCommodityDataAdd.safeStock"></el-input>
            </el-form-item>
            <el-form-item label="最高采购价" prop="purchasePrice">
                <el-input :disabled="true" v-model="HotelCommodityDataAdd.purchasePrice"></el-input>
            </el-form-item>
            <el-form-item label="采购单价(元)" prop="unitPrice">
                <div class="lookhistoryprice">
                    <el-button type="text" size="small" @click="lookHistoryPrice()">查看历史价格</el-button>
                </div>
                <el-input v-model.trim="HotelCommodityDataAdd.unitPrice" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="零售价" prop="retailPrice">
                <el-input v-model.trim="HotelCommodityDataAdd.retailPrice" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="primary" @click="submitForm('HotelCommodityDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="" :visible.sync="dialogPriceVisible" width="38%">
            <el-table :data="priceData">
                <el-table-column property="startTime" label="开始时间" align=center></el-table-column>
                <el-table-column property="endTime" label="结束时间" align=center></el-table-column>
                <el-table-column property="purPrice" label="采购单价(元)" align=center></el-table-column>
                <el-table-column property="operator" label="操作人" width="80px" align=center></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelCommodityAdd',
    data(){
        return{
            encryptedOprOrgId: '',
            hotelId: '',
            HotelCommodityDataAdd: {},
            dialogPriceVisible: false,
            commodityList: {},
            priceData: [],
            rules: {
                commodityName: [
                    {required: true, message: '请填写商品名称', trigger: 'blur'},
                ],
                safeStock: [
                    {required: true, message: '请填写安全库存', trigger: 'blur'},
                    {min: 0, max: 999999999.99, type: 'number', message: '安全库存不能超过1000000000.00', trigger: ['blur','change']}
                ],
                unitPrice: [
                    {required: true, message: '请填写采购单价',  trigger: 'blur'},
                ],
                retailPrice: [
                    {required: true, message: '请填写零售价',  trigger: 'blur'},
                    // {min: 0, max: 999999999.99, type: 'number', message: '零售价不能超过1000000000.00', trigger: ['blur','change']}
                ]
           }
        }
    },
    mounted(){
        // this.encryptedOprOrgId = localStorage.getItem('orgId');
        this.encryptedOprOrgId = this.$route.params.orgId;
        this.hotelId = this.$route.query.id
        this.hotelCommodityList();
    },
    methods: {
        //获取酒店商品名称-最高采购价
        hotelCommodityList(){
            const params = {
                hotelId: this.hotelId
            };
            this.$api.hotelCommodityNameList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.commodityList = result.data;
                    }else{
                        this.$message.error('酒店商品信息获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //获取最高采购价
        commoditySelect(value){
            const price = this.commodityList.find(item => item.id === value);
            this.HotelCommodityDataAdd.purchasePrice = price.priceMax;
        },
        //查看历史价格
        lookHistoryPrice(){
            if(!this.HotelCommodityDataAdd.commodityName){
                this.$message.warning('请选择商品名称！');
                return false;
            }
            const params = {
                hotelId: this.hotelId,
                prodId: this.HotelCommodityDataAdd.commodityName
            };
            // console.log(params);
            this.$api.lookHistoryPrice(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.priceData = result.data;
                        this.dialogPriceVisible = true;
                    }else{
                        this.$message.error('历史价格获取失败！');
                    }
                })
                .catch(error => {
                     this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-添加酒店商品
        submitForm(HotelCommodityDataAdd){
            let that = this;
            const params = {
                encryptedOprOrgId: that.encryptedOprOrgId,
                hotelId: that.hotelId,
                prodId: that.HotelCommodityDataAdd.commodityName,
                prodSafeCount: that.HotelCommodityDataAdd.safeStock,
                prodPurPrice: parseFloat(that.HotelCommodityDataAdd.unitPrice).toFixed(2),
                prodRetailPrice: parseFloat(that.HotelCommodityDataAdd.retailPrice).toFixed(2)
            };
            this.$refs[HotelCommodityDataAdd].validate((valid) => {
                if (valid) {
                    // console.log(params);
                    // return
                    this.$api.hotelCommodityAdd(params)
                        .then(response => {
                            const result = response.data;
                            if(result.code == '0'){
                                that.$message.success('酒店商品添加成功！');
                                const id = that.hotelId;
                                const orgId = that.encryptedOprOrgId;
                                that.$router.push({name: 'LonganHotelCommodityList', params:{orgId}, query: {id}});
                            }else{
                                that.$message.error('酒店商品添加失败！');
                            }
                        })
                        .catch(error => {
                            that.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm(){
            const orgId = this.encryptedOprOrgId;
            const id = this.hotelId;
            this.$router.push({name: 'LonganHotelCommodityList', params:{orgId}, query: {id}});
        }
    }

}
</script>

<style lang="less" scoped>
.commoditymodify{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelcommodityform{
        width: 42%;
    }
    .lookhistoryprice{
        float: right;
        margin-right: -82px;
    }
}
</style>
