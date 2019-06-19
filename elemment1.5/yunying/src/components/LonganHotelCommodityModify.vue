<template>
    <div class="commoditymodify">
        <p class="title">修改酒店商品</p>
        <el-form v-model="HotelCommodityDataModity" :model="HotelCommodityDataModity" :rules="rules" ref="HotelCommodityDataModity" label-width="120px" class="hotelcommodityform">
            <el-form-item label="商品名称" prop="productName">
                <el-select :disabled="true" v-model="HotelCommodityDataModity.prodId" placeholder="请选择" @change="commoditySelect">
                    <el-option
                        v-for="item in commodityList" 
                        :key="item.id" 
                        :label="item.productName" 
                        :value="item.id"
                        :data-price="item.priceMax">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="安全库存" prop="prodSafeCount">
                <el-input v-model.number="HotelCommodityDataModity.prodSafeCount"></el-input>
            </el-form-item>
            <el-form-item label="最高采购价" prop="priceMax">
                <el-input :disabled="true" v-model="HotelCommodityDataModity.priceMax"></el-input>
            </el-form-item>
            <el-form-item label="采购单价(元)" prop="prodPurPrice">
                <div class="lookhistoryprice">
                    <el-button type="text" size="small" @click="lookHistoryPrice()">查看历史价格</el-button>
                </div>
                <el-input v-model.trim="HotelCommodityDataModity.prodPurPrice" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="零售价" prop="prodRetailPrice">
                <el-input v-model.trim="HotelCommodityDataModity.prodRetailPrice" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="primary" @click="submitForm('HotelCommodityDataModity')">确定</el-button>
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
    name: 'LonganHotelCommodityModify',
    data(){
        return{
            id: '',
            hotelId: '',
            HotelCommodityDataModity: {},
            cDetailList: {},
            commodityList: {},
            dialogPriceVisible: false,
            priceData: [],
            rules: {
                commodityName: [
                    {required: true, message: '请填写商品名称', trigger: 'blur'},
                ],
                safeStock: [
                    {required: true, message: '请填写安全库存', trigger: 'blur'},
                    {min: 0, max: 999999999.99, type: 'number', message: '安全库存不能超过1000000000.00', trigger: ['blur','change']}
                ],
                prodPurPrice: [
                    {required: true, message: '请填写采购单价',  trigger: 'blur'},
                ],
                prodRetailPrice: [
                    {required: true, message: '请填写零售价', trigger: 'blur'},
                    // {min: 0, max: 999999999.99, type: 'number', message: '零售价不能超过1000000000.00', trigger: ['blur','change']}
                ]
           }
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        this.hotelId = this.$route.params.hotelId;
        this.hotelCommodityDetail();
        this.hotelCommodityList();
    },
    methods: {
        //获取酒店商品详情
        hotelCommodityDetail(){
            const params = {};
            const id = this.id;
            this.$api.hotelCommodityDetail(params, id)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        // console.log(result.data);
                        this.HotelCommodityDataModity = result.data;
                        this.cDetailList = {
                            id: result.data.prodId,
                            priceMax: result.data.priceMax,
                            productName: result.data.productName
                        };
                        // console.log(this.cDetailList);
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
                        this.commodityList.push(this.cDetailList);
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
            this.HotelCommodityDataModity.priceMax = price.priceMax;
        },
        //查看历史价格
        lookHistoryPrice(){
            const params = {
                hotelId: this.hotelId,
                prodId: this.HotelCommodityDataModity.prodId
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
        //确定-修改酒店商品
        submitForm(HotelCommodityDataModity){
            let that = this;
            const params = {
                hotelId: that.hotelId,
                prodId: that.HotelCommodityDataModity.prodId,
                prodSafeCount: that.HotelCommodityDataModity.prodSafeCount,
                prodPurPrice: parseFloat(that.HotelCommodityDataModity.prodPurPrice).toFixed(2),
                prodRetailPrice: parseFloat(that.HotelCommodityDataModity.prodRetailPrice).toFixed(2),
            };
            const id = that.id;
            // console.log(params);
            this.$refs[HotelCommodityDataModity].validate((valid) => {
                if (valid) {
                    this.$api.hotelCommodityModify(params,id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                that.$message.success('酒店商品修改成功！');
                                const id = that.hotelId;
                                that.$router.push({name: 'LonganHotelCommodityList', query: {id}});
                            }else{
                                that.$message.error('酒店商品修改失败！');
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
            const id = this.hotelId;
            this.$router.push({name: 'LonganHotelCommodityList', query: {id}});
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
