<template>
    <div class="commoditymarket">
        <p class="title">修改市场分类</p>
        <el-form :model="CommodityMarketData" :rules="rules" ref="CommodityMarketData" label-width="100px" class="commoditymarketform">
            <el-form-item label="酒店名称" prop="hotelId">
                <el-select v-model="CommodityMarketData.hotelId" placeholder="请选择">
                    <el-option 
                        v-for="item in hotelList" 
                        :key="item.id" 
                        :label="item.hotelName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="市场分类" prop="categoryName">
                <el-input v-model.trim="CommodityMarketData.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="分成协议名称" prop="hshopAllocId">
                <el-select v-model="CommodityMarketData.hshopAllocId" placeholder="请选择">
                    <el-option 
                        v-for="item in protocolList" 
                        :key="item.id" 
                        :label="item.agreementName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否显示" prop="isshow">
                <el-switch v-model="isshow"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzData['F:BO_HOTEL_MARKET_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommodityMarketData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelCommodityMarketModify',
    data(){
        return {
            authzData: '',
            // orgId: '',
            hcmId: '',
            hotelList: [],
            protocolList: [],
            CommodityMarketData: {},
            isshow: false,
            isSubmit: false,
            rules: {
                hotelId: [
                    {required: true, message: '请选择酒店名称', trigger: 'blur'}
                ],
                categoryName: [
                    {required: true, message: '请填写市场分类', trigger: 'blur'},
                    {min: 1, max: 10, message: '请保持在10个字符以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.hcmId = this.$route.query.id;
        this.getHotelInfo();
        this.getprotocolList();
        this.hotelCommodityMarketDetail();
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
                                id: item.id,
                                horgId: item.orgId
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
                        const protocolNo = {
                            agreementName: '暂不选择',
                            id: 0
                        };
                        this.protocolList.push(protocolNo);
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
        //获取酒店商品市场分类
        hotelCommodityMarketDetail(){
            const params = {};
            const id = this.hcmId;
            this.$api.hotelCommodityMarketDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == 0){
                        this.CommodityMarketData = result.data;
                        if(result.data.displayFlag == 1){
                            this.isshow = true;
                        }else{
                            this.isshow = false;
                        }
                    }else{
                        this.$message.error('获取市场分类失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //修改 - 酒店商品市场分类
        submitForm(CommodityMarketData){
            var isVisible;
            if(this.isshow){
                isVisible = '1'
            }else{
                isVisible = '0'
            }
            const params = {
                // encryptedOrgId: this.orgId,
                orgAs: 2,
                hotelId: this.CommodityMarketData.hotelId,
                categoryName: this.CommodityMarketData.categoryName,
                displayFlag: isVisible,
                hshopAllocId: this.CommodityMarketData.hshopAllocId
            };
            // console.log(params);
            // return
            const id = this.hcmId;
            this.$refs[CommodityMarketData].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.hotelCommodityMarketModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                this.$message.success('修改市场分类成功！');
                                this.$router.push({name: 'LonganHotelCommodityMarketList'});
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
