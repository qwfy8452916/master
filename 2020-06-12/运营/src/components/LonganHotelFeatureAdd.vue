<template>
    <div class="hotelfeatureadd">
        <p class="title">添加客房设施</p>
        <el-form :model="HotelFeatureData" :rules="rules" ref="HotelFeatureData" label-width="100px" class="hotelfeatureform">
            <el-form-item label="酒店名称" prop="hotelInfo">
                <el-select 
                    v-model="HotelFeatureData.hotelInfo" 
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择" 
                    @change="getHotelOrgId">
                    <el-option 
                        v-for="item in hotelList" 
                        :key="item.id" 
                        :label="item.hotelName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客房设施" prop="featureInfo">
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
                <el-button v-if="authzData['F:BO_HOTEL_FEATURE_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('HotelFeatureData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelFeatureAdd',
    data(){
        return{
            authzData: '',
            // orgId: '',
            hId: '',
            hotelList: [],
            featureList: [],
            HotelFeatureData: {},
            isSubmit: false,
            rules: {
                hotelInfo: [
                    {required: true, message: '请选择酒店', trigger: 'blur'}
                ],
                featureInfo: [
                    {required: true, message: '请选择客房设施', trigger: 'blur'}
                ]
            },
            loadingH: false,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.getHotelList();
    },
    methods: {
        //获取酒店信息
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                hotelName: hName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.hotelList(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName,
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
        remoteHotel(val){
            this.getHotelList(val);
        },
        //获取酒店orgId
        getHotelOrgId(value){
            this.hId = value;
            this.getHotelFeatureType();
        },
        //获取客房设施列表
        getHotelFeatureType(){
            const params = {
                // encryptedOprOrgId: this.orgId,
                orgAs: 2,
                hotelId: this.hId,
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
                // encryptedOprOrgId: this.orgId,
                orgAs: 2,
                hotelId: this.HotelFeatureData.hotelInfo,
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
                                    this.$message.success('酒店客房设施添加成功！');
                                    this.$router.push({name: 'LonganHotelFeature'});
                                }else{
                                    this.$message.error('酒店客房设施添加失败！');
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
            this.$router.push({name: 'LonganHotelFeature'});
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

