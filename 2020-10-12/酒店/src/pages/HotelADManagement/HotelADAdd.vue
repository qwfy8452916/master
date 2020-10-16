<template>
    <div class="hotelserviceadd">
        <p class="title">新增广告页</p>
        <el-form :model="HotelADData" :rules="rules" ref="HotelADData" label-width="80px" class="hotelform">
            <el-form-item label="名称" prop="adName">
                <el-input v-model.trim="HotelADData.adName"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 广告内容</span>
                <UEtor :defaultMsg="defaultMsg" :ueConfig="ueConfig" ref="ue"></UEtor>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('HotelADData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import UEtor from '@/components/UEtor'
export default {
    name: 'HotelADAdd',
    components: {
        UEtor
    },
    data(){
        return{
            authzData: '',
            hotelId: '',
            HotelADData: {},
            isSubmit: false,
            defaultMsg: null,
            ueConfig: {
                initialFrameWidth: 900,
                initialFrameHeight: 350,
            },
            rules: {
                adName: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                    {min: 1, max: 30, message: '名称请保持在30个字符以内', trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hotelId = localStorage.getItem('hotelId');
    },
    methods: {
        //新增广告页
        submitForm(HotelADData){
            let that = this;
            let UEContent = that.$refs.ue.getUEContent();
            
            let hotelInfo = [{id: this.hotelId}];
            const params = {
                adName: this.HotelADData.adName,
                adLevel: 1,
                hotelDTOS: hotelInfo,
                adContent: UEContent,
            };
            this.$refs[HotelADData].validate((valid) => {
                if(valid){
                    if(UEContent == ''){
                        this.$message.error('请输入广告内容！');
                        return false
                    }
                    // console.log(params);
                    // return
                    this.isSubmit = true;
                    this.$api.hotelADAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                this.$message.success('新增广告页成功！');
                                this.$router.push({name: 'HotelADList'});
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
            this.$router.push({name: 'HotelADList'});
        },
    }
}
</script>

<style>
.edui-default .edui-toolbar .edui-combox .edui-combox-body{
    line-height: 22px;
}
</style>

<style lang="less" scoped>
.hotelserviceadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 45%;
        .radioscope{
            line-height: 40px;
        }
    }
    .required-icon{
        color: #F56C6C;
    }
    .pagination{
        margin-top: 20px;
        text-align: center;
    }
    .scopeensure{
        text-align: center;
    }
}
</style>

