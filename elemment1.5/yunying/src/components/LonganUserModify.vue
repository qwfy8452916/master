<template>
    <div class="useradd">
        <p class="title">修改用户信息</p>
        <el-form :model="UserDataAdd" :rules="rules" ref="UserDataAdd" label-width="80px" class="userform">
            <el-form-item label="账号名称" prop="userName">
                <el-input v-model="UserDataAdd.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPWD">
                <el-input v-model="UserDataAdd.userPWD" show-password :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="jobNumber">
                <el-input v-model="UserDataAdd.jobNumber"></el-input>
            </el-form-item>
            <el-form-item label="用户头像" prop="headPhoto">
                <el-upload class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="UserDataAdd.headPhoto" :src="UserDataAdd.headPhoto" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p class="upload-hint">只能上传jpg、png格式，且大小不超过2M</p>
            </el-form-item>
            <el-form-item label="联系电话" prop="mobilePhone">
                <el-input v-model="UserDataAdd.mobilePhone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="userEmail">
                <el-input v-model="UserDataAdd.userEmail"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button type="primary" @click="submitForm('UserDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganUserAdd',
    data(){
        var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
        var validatePhone = (rule,value,callback) => {
            // if(!value){
            //     return callback(new Error('联系电话不能为空！'))
            // }
            if(!phoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            UserDataAdd: {
                userName: '',
                userPWD: '123456',
                jobNumber: '',
                headPhoto: '',
                mobilePhone: '',
                userEmail: ''
            },
            rules: {
                userName: [
                    {required: true, message: '请填写账号名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '账号名称请保持在32个字符以内', trigger: 'blur'}
                ],
                userPWD: [
                    {required: true, message: '请填写密码'}
                ],
                mobilePhone: [
                    {validator: validatePhone,trigger: 'blur'}
                ],
                userEmail: [
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur','change']}
                ],
            },
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            // this.UserDataAdd.headPhoto = URL.createObjectURL(file.raw);
        },
        //修改-用户信息
        submitForm(UserDataAdd) {
            // console.log(UserDataAdd.userName);
            this.$refs[UserDataAdd].validate((valid) => {
            if (valid) {
                // alert('submit!');
                
            } else {
                // console.log('error submit!!');
                return false;
            }
            });
        },
        //取消
        resetForm() {
            this.$router.push({name: 'LonganUserList'});
        }
    },
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 98px;
    height: 98px;
    line-height: 98px;
    text-align: center;
  }
  .avatar {
    width: 98px;
    height: 98px;
    display: block;
  }
</style>

<style lang="less" scoped>
.useradd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .userform{
        width: 40%;
        .upload-hint{
            font-size: 12px;
            color: #999;
            line-height: 12px;
        }
    }
}
</style>

