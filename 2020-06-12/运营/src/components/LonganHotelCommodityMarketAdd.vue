<template>
    <div class="commoditymarket">
        <p class="title">新增市场分类</p>
        <el-form :model="CommodityMarketData" :rules="rules" ref="CommodityMarketData" label-width="100px" class="commoditymarketform">
            <el-form-item label="酒店名称" prop="hotelInfo">
                <el-select v-model="CommodityMarketData.hotelInfo" placeholder="请选择">
                    <el-option 
                        v-for="item in hotelList" 
                        :key="item.id" 
                        :label="item.hotelName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="市场分类" prop="marketType">
                <el-input v-model.trim="CommodityMarketData.marketType"></el-input>
            </el-form-item>
            <el-form-item label="分成协议名称" prop="agreementName">
                <el-select v-model="CommodityMarketData.agreementName" placeholder="请选择">
                    <el-option 
                        v-for="item in protocolList" 
                        :key="item.id" 
                        :label="item.agreementName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否显示" prop="isshow">
                <el-switch v-model="CommodityMarketData.isshow"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzData['F:BO_HOTEL_MARKET_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommodityMarketData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelCommodityMarketAdd',
    data(){
        return {
            authzData: '',
            // orgId: '',
            hotelList: [],
            protocolList: [],
            CommodityMarketData: {
                hotelId: '',
                marketType: '',
                isshow: false
            },
            isSubmit: false,
            rules: {
                hotelInfo: [
                    {required: true, message: '请选择酒店名称', trigger: 'blur'}
                ],
                marketType: [
                    {required: true, message: '请填写市场分类', trigger: 'blur'},
                    {min: 1, max: 10, message: '请保持在10个字符以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = this.$route.params.orgId;
        this.getHotelInfo();
        this.getprotocolList();
    },
    methods: {
        //获取酒店信息
        getHotelInfo(){
            // const orgId = this.orgId;
            const params = {
                orgAs: 2
            };
            this.$api.getHotelNameAll(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.map(item => {
                            return{
                                hotelName: item.hotelName,
                                id: item.id
                            }
                        })
                    }else{
                        this.$message.error('酒店列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //获取分成协议列表
        getprotocolList(){
            const params = {};
            this.$api.getprotocolList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.protocolList = result.data.map(item => {
                            return{
                                agreementName: item.allocName,
                                id: item.id
                            }
                        })
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //添加 - 酒店商品市场分类
        submitForm(CommodityMarketData){
            var isVisible;
            if(this.CommodityMarketData.isshow){
                isVisible = '1'
            }else{
                isVisible = '0'
            }
            const params = {
                // encryptedOrgId: this.orgId,
                orgAs: 2,
                hotelId: this.CommodityMarketData.hotelInfo,
                categoryName: this.CommodityMarketData.marketType,
                displayFlag: isVisible,
                hshopAllocId: this.CommodityMarketData.agreementName
            };
            // console.log(params);
            // return
            this.$refs[CommodityMarketData].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.HotelCommodityMarketAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                if(result.data == true){
                                    this.$message.success('新增市场分类成功！');
                                    this.$router.push({name: 'LonganHotelCommodityMarketList'});
                                }else{
                                    this.$message.error(result.msg);
                                    this.isSubmit = false;
                                }
                            }else{
                                this.$message.error(result.msg);
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            this.$router.push({name: 'LonganHotelCommodityMarketList'});
        }
    }
}
</script>

<style scoped>
.el-select{
    width: 100%;
}
</style>


<style lang="less" scoped>
.commoditymarket{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .commoditymarketform{
        width: 42%;
    }
}
</style>
