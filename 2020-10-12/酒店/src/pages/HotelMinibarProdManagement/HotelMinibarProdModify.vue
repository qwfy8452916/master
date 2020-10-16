<template>
    <div class="functionadd">
        <p class="title">修改</p>
        <el-form :model="MiniDeployData" :rules="rules" ref="MiniDeployData" label-width="100px" class="functionform">
            <el-form-item label="配置名称" prop="profileName">
                <el-input v-model.trim="MiniDeployData.profileName"></el-input>
            </el-form-item>
            <el-form-item label="柜子类型" prop="cabType">
                <el-select :disabled="true" v-model="MiniDeployData.cabType" placeholder="请选择">
                    <el-option v-for="item in cabList" :key="item.id" :label="item.cabName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BH_PROD_MINIPROD_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('MiniDeployData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'HotelMinibarProdModify',
    data(){
        return {
            authzData: '',
            hotelId: '',
            mpId: '',
            cabList: [],
            MiniDeployData: {},
            isSubmit: false,
            rules: {
                profileName: [
                    {required: true, message: '请填写配置名称', trigger: 'blur'},
                    {min: 1, max: 10, message: '配置名称请保持在10个字符以内', trigger: ['blur','change']}
                ],
                cabType: [
                    { required: true, message: '请选择柜子类型', trigger: 'change' }
                ]
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hotelId = localStorage.getItem('hotelId');
        this.mpId = this.$route.query.id;
        this.getCabList();
        this.miniDeployDetail();
    },
    methods: {
        //柜子列表
        getCabList(){
            const params = {
                // virtualFlag: 1           //是否是实体柜
            };
            this.$api.cabTypeList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.cabList = result.data.map(item => {
                            return{
                                id: item.cabType,
                                cabName: item.cabTypeName
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
        //获取配置详情
        miniDeployDetail(){
            const params = {};
            const id = this.mpId;
            this.$api.miniDeployDetail(params, id)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.MiniDeployData = result.data;
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
        submitForm(MiniDeployData){
            const params = {
                hotelId: this.hotelId,
                profileName: this.MiniDeployData.profileName,
                cabType: this.MiniDeployData.cabType,
            };
            const id = this.mpId;
            this.$refs[MiniDeployData].validate((valid) => {
                if (valid) {
                    // console.log(params);
                    // return
                    this.isSubmit = true;
                    this.$api.miniDeployModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('修改成功！');
                                this.$router.push({name: 'HotelMinibarProdList'});
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
            this.$router.push({name: 'HotelMinibarProdList'});
        }
    },
}
</script>

<style>
.el-checkbox:last-of-type{
    margin-right: 6px;
}
</style>

<style scoped>
.el-input{
    width: 92%;
}
.el-select{
    width: 92%;
}
</style>

<style lang="less" scoped>
.functionadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .functionform{
        width: 42%;
        .required-icon{
            color: #F56C6C;
        }
        .treestyle{
            background: #fff;
            border: 1px solid #444;
            position: absolute;
            z-index: 10;
            width: 100%;
            padding: 5px 0px;
            border: 1px solid transparent;
            border-color: rgba(68,68,68,0.1);
            box-shadow: 0px 0px 1px rgba(68,68,68,0.1);
            margin-top: 10px;
            .closetree{
                position: absolute;
                right: 10px;
                top: 0px;
                z-index: 10;
            }
        }
    }
}
</style>
