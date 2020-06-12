<template>
    <div class="hoteladd">
        <p class="title">修改酒店</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="酒店名称：" prop="hotelName">
                <el-input v-model="Commoditygai.hotelName" placeholder="请输入酒店名称"></el-input>
            </el-form-item>
            <el-form-item label="酒店财运指数：" prop="starLevel">
                <div style="display:flex;align-items:center;height:40px;">
                    <el-rate v-model="Commoditygai.starLevel"></el-rate>
                    <el-button size="small" type="text" @click="Commoditygai.starLevel = 0">清除星级</el-button>
                </div>
            </el-form-item>
            <el-form-item label="酒店图片" prop="imgList">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :file-list="Commoditygai.imgListFix"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    :before-remove="beforeRemove">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,尺寸规格1×1,背景透明,最多支持1张图片</label>
                </el-upload>
                <el-input style="display:none" type="text" v-model="Commoditygai.imgList"/>
            </el-form-item>
            <el-form-item label="投中概率：" prop="hitRate">
                <el-input type="number" v-model.number="Commoditygai.hitRate" placeholder="请输入投中概率"></el-input>
            </el-form-item>
            <el-form-item label="是否显示酒店：" prop="isShow">
                <el-radio-group v-model="Commoditygai.isShow">
                    <el-radio :label="1">显示</el-radio>
                    <el-radio :label="0">不显示</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否开放柜子：" prop="isOpen">
                <el-radio-group v-model="Commoditygai.isOpen">
                    <el-radio :label="1">开放</el-radio>
                    <el-radio :label="0">不开放</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button v-if="authzData['F:BO_FS_HOTEL_EDIT_SUBMIT']" type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'LaunchHotelChange',
    data(){
        return{
            authzData: '',
            Commoditygai: {},
            hotelId:'',
            loadingH: false,
            headers: {},
            uploadUrl: this.$api.upload_file_url,
            rules: {
                hotelId: [
                    {required: true, message: '请填写酒店名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '酒店名称请保持在32个字符以内', trigger: 'blur'}
                ],
                imgList: [
                    {required: true, message: '请上传酒店图片', trigger: 'change'}
                ],
                hitRate: [
                    {required: true, message: '请填写投中概率', trigger: 'blur'},
                    {type:'number', min: 0, max: 999999, message: '投中概率请保持在0-999999之间', trigger: 'blur'}
                ],
            },
        }
    },
   
    created() {
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hotelId = this.$route.query.modifyid;
        this.getfillBackData();
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },

    methods: {
        getfillBackData(){
            let that = this;
            this.$api.FsHotelSearchSingle(this.hotelId).then(response => {
                if(response.data.code == 0){
                    let resData = response.data.data;
                    resData.imgListFix = [{
                        name:response.data.data.hotelImage,
                        url:response.data.data.hotelImageUrl
                    }]
                    resData.imgList = response.data.data.hotelImage
                    that.Commoditygai = resData;
                }else{
                    that.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                that.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //确定-添加酒店
        submitForm(Commoditygai) {
            let params = {
                hotelName: this.Commoditygai.hotelName,
                hitRate: this.Commoditygai.hitRate,
                hotelImage: this.Commoditygai.imgList,
                isShow: this.Commoditygai.isShow,
                isOpen: this.Commoditygai.isOpen,
                starLevel: this.Commoditygai.starLevel,
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.FsHotelChange(this.hotelId,params)
                        .then(response => {
                            if(response.data.code==0){
                               this.$message.success("操作成功")
                               this.$router.push({name:'LaunchHotelManagement'});
                            }else{
                               this.$alert(response.data.msg,"警告",{
                                    confirmButtonText: "确定"
                               })
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                } else {
                    return false;
                }
            });
        },
        //取消
        resetForm(Commoditygai) {
            this.$router.push({name:'LaunchHotelManagement'});
        },

        //删除确认
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //图片上传成功
        handleSuccess(res, file, fileList){
            this.$set(this.Commoditygai,'imgList',res.data)
        },
        //移除图片
        handleRemove(file, fileList){
            this.$set(this.Commoditygai,'imgList','')
        },
        //文件超出个数限制时
        handleExceed(file, fileList){
            this.$message.error('酒店图片只能上传1张！')
        },
        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
        }
    },
}
</script>

<style lang="less" scoped>
.hoteladd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 45%;
        .btnwrap{margin-left: 35px;}
        .el-input,.el-select{width: 225px;}
        .termput{width: 80px;display: inline-block;
            margin-right: 10px;}
    }
}

</style>

