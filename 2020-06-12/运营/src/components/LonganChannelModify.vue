<template>
    <div class="channeladd">
        <p class="title">修改渠道</p>
        <el-form :model="ChannelData" :rules="rules" ref="ChannelData" label-width="80px" class="channelform">
            <el-form-item label="渠道名称" prop="channelName">
                <el-input :disabled="true" v-model.trim="ChannelData.channelName"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
                <el-input :disabled="true" v-model.trim="ChannelData.userName"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="contactName">
                <el-input v-model.trim="ChannelData.contactName"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="contactMobile">
                <el-input v-model.trim="ChannelData.contactMobile"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BO_FS_CHANNEL_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('ChannelData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganChannelModify',
    data(){
        var mPhoneReg = /^1\d{10}$/
        var validateMPhone = (rule,value,callback) => {
            if(!mPhoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var accountReg = /^[0-9a-zA-Z]{6,18}$/
        var validateAccount = (rule,value,callback) => {
            if(!accountReg.test(value)){
                callback(new Error('请输入6-18位字母或数字或字母数字组合'))
            }else{
                callback()
            }
        }
        return {
            authzData: '',
            cId: '',
            ChannelData: {},
            isSubmit: false,
            rules: {
                channelName: [
                    {required: true, message: '请输入渠道名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '渠道名称请保持在32个字符以内', trigger: ['blur','change']}
                ],
                userName: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 1, max: 20, message: '用户名请保持在20个字符以内', trigger: ['blur','change']}
                    // {required: true, validator: validateAccount, trigger: ['blur','change']}
                ],
                contactName: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                    {min: 1, max: 10, message: '姓名请保持在10个字符以内', trigger: ['blur','change']}
                ],
                contactMobile: [
                    {required: true, validator: validateMPhone, trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.cId = this.$route.query.id;
        this.channelDetail();
    },
    methods: {
        //渠道详情
        channelDetail(){
            const params = {};
            const id = this.cId;
            this.$api.channelDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.ChannelData = result.data;
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
        //确定 - 修改
        submitForm(ChannelData){
            const params = {
                channelName: this.ChannelData.channelName,
                userName: this.ChannelData.userName,
                contactName: this.ChannelData.contactName,
                contactMobile: this.ChannelData.contactMobile,
            };
            const id = this.cId;
            this.$refs[ChannelData].validate((valid) => {
                if (valid) {
                    // console.log(params);
                    // return
                    this.isSubmit = true;
                    this.$api.channelModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('渠道修改成功！');
                                this.$router.push({name: 'LonganChannelList'});
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            this.$router.push({name: 'LonganChannelList'});
        },
    },
}
</script>

<style lang="less" scoped>
.channeladd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .channelform{
        width: 42%;
        .required-icon{
            color: #F56C6C;
        }
    }
}
</style>
