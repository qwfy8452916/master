<template>
    <div class="commoditymodify">
        <p class="title">修改柜子商品</p>
        <el-form v-model="HotelCommodityDataModity" :model="HotelCommodityDataModity" :rules="rules" ref="HotelCommodityDataModity" label-width="100px" class="hotelcommodityform">
            <el-form-item label="商品名称" prop="commodityName">
                <el-select v-model="HotelCommodityDataModity.commodityName" placeholder="请选择" @change="cabinetCommodityListFun">
                    <el-option
                        v-for="item in cabinetCommodityList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="primary" @click="submitForm('HotelCommodityDataModity')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelCabinetModify',
    data(){
        return{
            id: '',
            hotelId: '',
            HotelCommodityDataModity: {},
            cabinetCommodityList: [],
            rules: {
                commodityName: [
                    {required: true, message: '请填写商品名称', trigger: 'change'},
                ]
            }
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        this.hotelId = this.$route.params.hotelId;
        this.hotelCommodityDetail();
        this.cabinetCommodityListFun();
    },
    methods: {
        //获取柜子商品详情
        hotelCommodityDetail(){
            const params = {};
            const id = this.id;
            this.$api.hotelCabinetDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const productId = result.data.prodId;
                        this.HotelCommodityDataModity = result.data;
                        // if(productId == '0'){
                        //     this.HotelCommodityDataModity.commodityName = '';
                        // }else{
                        //     this.HotelCommodityDataModity.commodityName = productId;
                        // }
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
        //获取商品列表
        cabinetCommodityListFun(){
            const params = {
                hotelId: this.hotelId
            };
            // console.log(params);
            this.$api.hotelCabinetCommodityList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const productData = result.data.list;
                        const productList = productData.map((item, index) => {
                            return {
                                label: item.productName,
                                value: item.prodId
                            }
                        })
                        this.cabinetCommodityList = productList;
                    }else{
                        this.$message.error('酒店商品列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-修改柜子商品
        submitForm(HotelCommodityDataModity){
            const params = {
                hotelId: this.hotelId,
                id: this.id,
                latticeCode: this.HotelCommodityDataModity.latticeCode,   //格子编号
                prodId: this.HotelCommodityDataModity.commodityName
            };
            const id = this.id;
            let that = this;
            // console.log(params);
            this.$refs[HotelCommodityDataModity].validate((valid) => {
                if (valid) {
                    that.$api.hotelCabinetCommodityModify(params,id)
                        .then(response => {
                            if(response.data.code == '0'){
                                that.$message.success('修改柜子商品信息成功！');
                                const id = that.hotelId;
                                that.$router.push({name: 'LonganHotelCabinetList', query: {id}});
                            }else{
                                that.$message.error('修改酒店商品信息失败！');
                            }
                        })
                        .catch(error => {
                            that.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm(){
            this.$router.push({name: 'LonganHotelCabinetList', query: {id: this.hotelId}});
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
}
</style>
