<template>
    <div class="commoditymodify">
        <p class="title">修改酒店商品</p>
        <el-form v-model="HotelCommodityDataModity" :model="HotelCommodityDataModity" :rules="rules" ref="HotelCommodityDataModity" label-width="100px" class="hotelcommodityform">
            <el-form-item label="商品名称" prop="commodityName">
                <el-input v-model="HotelCommodityDataModity.commodityName"></el-input>
            </el-form-item>
            <el-form-item label="安全库存" prop="anquankucun">
                <el-input v-model.number="HotelCommodityDataModity.anquankucun"></el-input>
            </el-form-item>
            <el-form-item label="最高采购价" prop="caigou">
                <el-input :disabled="true" v-model="HotelCommodityDataModity.caigou"></el-input>
            </el-form-item>
            <el-form-item label="建议零售价" prop="jianyi">
                <el-input v-model.number="HotelCommodityDataModity.jianyi"></el-input>
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
    name: 'LonganHotelCommodityModify',
    data(){
        return{
            hotelId: '',
            HotelCommodityDataModity: {},
            rules: {
                commodityName: [
                    {required: true, message: '请填写商品名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '商品名称请保持在32个字符以内', trigger: ['blur','change']}
                ],
                anquankucun: [
                    {type: 'number', message: '请输入数字', trigger: 'blur'},
                ],
                jianyi: [
                    {type: 'number', message: '请输入数字', trigger: 'blur'},
                ]
           }
        }
    },
    mounted(){
        this.hotelId = this.$route.query.id
        // this.hotelCommodityDetail();
    },
    methods: {
        //获取酒店商品详情
        hotelCommodityDetail(){
            const params = {};
            const id = this.hotelId;
            this.$api.hotelCommodityDetail(params, id)
                .then(response => {
                    console.log(response);
                    // if(response.data.code == '0'){
                    //     this.HotelCommodityDataModity = response.data.data;
                    // }else{
                    //     this.$message.error('酒店商品信息获取失败！');
                    // }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-修改酒店商品
        submitForm(HotelCommodityDataModity){
            const params = {

            };
            const id = this.hotelId;
            this.$refs[HotelCommodityDataModity].validate((valid) => {
                if (valid) {
                    this.$api.hotelCommodityModify(params,id)
                        .then(response => {
                            console.log(response);
                            // if(response.data.code == '0'){
                            //     this.$message.success('修改酒店商品信息成功！');
                            //     setTimeout(function(){
                            //         this.$router.push({name: 'LonganHotelCommodityList'});
                            //     },3000);
                            // }else{
                            //     this.$message.error('修改酒店商品信息失败！');
                            // }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
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
            this.$router.push({name: 'LonganHotelCommodityList'});
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
