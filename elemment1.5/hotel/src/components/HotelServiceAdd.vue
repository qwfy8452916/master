<template>
    <div class="hotelserviceadd">
        <p class="title">添加酒店服务类型</p>
        <el-form :model="HotelServiceTypeData" :rules="rules" ref="HotelServiceTypeData" label-width="100px" class="hotelservicetypeform">
            <el-form-item label="服务类型" prop="serviceType">
                <el-select v-model="HotelServiceTypeData.serviceType" placeholder="请选择">
                    <el-option 
                        v-for="item in serviceList" 
                        :key="item.id" 
                        :label="item.serviceName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('HotelServiceTypeData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'HotelServiceAdd',
    data(){
        return{
            orgId: '',
            hotelList: [],
            serviceList: [],
            HotelServiceTypeData: {},
            isSubmit: false,
            rules: {
                serviceType: [
                    {required: true, message: '请选择服务类型', trigger: 'blur'}
                ]
            }
        }
    },
    mounted(){
        this.orgId = localStorage.getItem('orgId');
        this.getHotelServiceType();
    },
    methods: {
        //获取服务类型
        getHotelServiceType(){
            const params = {
                entryHotelOrgId: this.orgId
            };
            this.$api.serviceTypeList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.serviceList = result.data.map(item => {
                            return{
                                serviceName: item.rmsvcName,
                                id: item.id
                            }
                        })
                    }else{
                        this.$message.error('服务类型获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //添加酒店服务类型
        submitForm(HotelServiceTypeData){
            const params = {
                encryHOrgId: this.orgId,
                rmsvcId: this.HotelServiceTypeData.serviceType
            };
            this.$refs[HotelServiceTypeData].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.HotelServiceTypeAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                if(result.data == true){
                                    this.$message.success('添加酒店服务类型成功！');
                                    this.$router.push({name: 'HotelServiceList'});
                                }else{
                                    this.$message.error('添加酒店服务类型失败！');
                                    this.isSubmit = false;
                                }
                            }else{
                                this.$message.error('添加酒店服务类型失败！');
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
            this.$router.push({name: 'HotelServiceList'});
        }
    }
}
</script>

<style lang="less" scoped>
.hotelserviceadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelservicetypeform{
        width: 42%;
    }
}
</style>

