<template>
    <div class="commoditymarket">
        <p class="title">新增市场分类</p>
        <el-form :model="CommodityMarketData" :rules="rules" ref="CommodityMarketData" label-width="100px" class="commoditymarketform">
            <el-form-item label="市场分类" prop="marketType">
                <el-input v-model.trim="CommodityMarketData.marketType"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="isshow">
                <el-switch v-model="CommodityMarketData.isshow"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzlist['F:BH_HOTEL_COMMODITYMARKETLISTADDSUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommodityMarketData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'HotelCommodityMarketAdd',
    data(){
        return {
            authzlist: {}, //权限数据
            orgId: '',
            CommodityMarketData: {
                marketType: '',
                isshow: false
            },
            isSubmit: false,
            rules: {
                marketType: [
                    {required: true, message: '请填写市场分类', trigger: 'blur'},
                    {min: 1, max: 10, message: '请保持在10个字符以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
    },
    methods: {
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
                orgAs: 3,
                categoryName: this.CommodityMarketData.marketType,
                displayFlag: isVisible
            };
            this.$refs[CommodityMarketData].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.hotelCommodityMarketAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                if(result.data == true){
                                    this.$message.success('新增市场分类成功！');
                                    this.$router.push({name: 'HotelCommodityMarketList'});
                                }else{
                                    this.$message.error('新增市场分类失败！');
                                    this.isSubmit = false;
                                }
                            }else{
                                this.$message.error('新增市场分类失败！');
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
            this.$router.push({name: 'HotelCommodityMarketList'});
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
