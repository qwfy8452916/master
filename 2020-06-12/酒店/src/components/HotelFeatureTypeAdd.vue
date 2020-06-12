<template>
    <div class="hotelfeatureadd">
        <p class="title">添加客房设施分类</p>
        <el-form :model="HotelFeatureData" :rules="rules" ref="HotelFeatureData" label-width="100px" class="hotelfeatureform">
            <el-form-item label="客房设施分类" prop="featureInfo">
                <el-select v-model="HotelFeatureData.featureInfo" placeholder="请选择">
                    <el-option 
                        v-for="item in featureList"
                        :key="item.id" 
                        :label="item.featureName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzlist['F:BH_HOTEL_FEATURETYPEADDSUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('HotelFeatureData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'HotelFeatureTypeAdd',
    data(){
        return{
            // orgId: '',
            authzlist: {}, //权限数据
            hotelId: '',
            featureList: [],
            HotelFeatureData: {},
            isSubmit: false,
            rules: {
                featureInfo: [
                    {required: true, message: '请选择客房设施分类', trigger: 'blur'}
                ]
            }
        }
    },
    mounted(){
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.hotelId = localStorage.getItem('hotelId');
        this.getHotelFeatureType();
    },
    methods: {
        //获取客房设施分类列表
        getHotelFeatureType(){
            const params = {
                // encryptedHotelOrgId: this.orgId
                orgAs: 3
            };
            // console.log(params);
            this.$api.hotelfeatureList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == 0){
                        this.featureList = result.data.map(item => {
                            return{
                                featureName: item.feName,
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
        //添加酒店服务类型
        submitForm(HotelFeatureData){
            const params = {
                // encryptedhotelOrgId: this.orgId,
                orgAs: 3,
                hotelId: this.hotelId,
                typeId: this.HotelFeatureData.featureInfo
            };
            this.$refs[HotelFeatureData].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.HotelFeatureAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                if(result.data == true){
                                    this.$message.success('客房设施分类添加成功！');
                                    this.$router.push({name: 'HotelFeatureType'});
                                }else{
                                    this.$message.error('客房设施分类添加失败！');
                                    this.isSubmit = false;
                                }
                            }else{
                                this.$message.error(result.msg);
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
                            this.isSubmit = false;
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
            this.$router.push({name: 'HotelFeatureType'});
        }
    }
}
</script>

<style lang="less" scoped>
.hotelfeatureadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelfeatureform{
        width: 42%;
    }
}
</style>

