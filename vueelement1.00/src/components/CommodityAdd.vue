<template>
    <div class="hoteladd">
        <p class="title">新增商品</p>
        <el-form :inline="true" :model="CommodityAdd" :rules="rules" ref="CommodityAdd" label-width="140px" class="hotelform">
            <el-form-item label="商品图片" prop="hotelBanner">
                <!-- <el-input v-model="CommodityAdd.hotelBanner"></el-input> -->
                <el-upload 
                    action=""
                    list-type="picture"
                    multiple
                    :limit="5"
                    :file-list="CommodityAdd.bannerList"
                    :on-preview="handlePreview" 
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError">
                    <el-button size="small" type="primary">上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、jpeg、png文件，且不超过2M，图片最多上传5张</label>
                </el-upload>
            </el-form-item>

            <el-form-item label="商品名称" prop="commodityname">
                <el-input v-model="CommodityAdd.commodityname"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" prop="suppliername">
                <el-input v-model="CommodityAdd.suppliername"></el-input>
            </el-form-item>
            <el-form-item label="SQ编号" prop="sqlnumber">
                <el-input v-model="CommodityAdd.sqlnumber"></el-input>
            </el-form-item>
            <el-form-item label="保质期" prop="guaranteetime">
                <el-input class="termput" v-model="CommodityAdd.guaranteetime"></el-input>
                <el-select class="termput" v-model="CommodityAdd.selectdate" placeholder="天" @change="selectdate">
                    <el-option v-for="item in dateriqi" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格" prop="guige">
                <el-input v-model="CommodityAdd.guige"></el-input>
            </el-form-item>
            <el-form-item label="最高采购价" prop="heightprice">
                <el-input v-model="CommodityAdd.heightprice"></el-input>
            </el-form-item>
            <el-form-item label="建议零售价" prop="retailprice">
                <el-input v-model="CommodityAdd.retailprice"></el-input>
            </el-form-item>      
            <el-form-item class="btnwrap">
                <el-button @click="resetForm('CommodityAdd')">取消</el-button>
                <el-button type="primary" @click="submitForm('CommodityAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'CommodityAdd',
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
            dateriqi:[{id:"1",value:"天"},{id:"2",value:"月"},{id:"3",value:"年"}],

            CommodityAdd: {
                // bannerList: [{name:'',url:''}],
                bannerList: [],
                commodityname: '',
                suppliername: '',
                sqlnumber: '',
                guaranteetime:'',
                selectdate: '',
                guige:'',
                heightprice:'',
                retailprice:'',
            },
            rules: {
                commodityname: [
                    {required: true, message: '请填写商品名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '商品名称请保持在32个字符以内', trigger: 'blur'}
                ],
                suppliername: [
                    {required: true, message: '请填写供应商名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '供应商名称请保持在32个字符以内', trigger: 'blur'}
                ],
                sqlnumber: [
                    {required: true, message: '请填写SQ编号', trigger: 'blur'},
                    {min: 1, max: 32, message: 'SQ编号请保持在32个字符以内', trigger: 'blur'}
                ],
                guaranteetime: [
                    {required: true, message: '请填写保质期', trigger: 'blur'},
                    {min: 1, max: 32, message: '保质期请保持在32个字符以内', trigger: 'blur'}
                ],
                guige: [
                    {required: true, message: '请填写规格', trigger: 'blur'},
                    {min: 1, max: 32, message: '规格请保持在32个字符以内', trigger: 'blur'}
                ],
                heightprice: [
                    {required: true, message: '请填最高采购价', trigger: 'blur'},
                    {min: 1, max: 32, message: '最高采购价请保持在32个字符以内', trigger: 'blur'}
                ],
                retailprice: [
                    {required: true, message: '请填写建议零售价', trigger: 'blur'},
                    {min: 1, max: 32, message: '建议零售价请保持在32个字符以内', trigger: 'blur'}
                ],
            },
        }
    },
    mounted(){
        
    },
    methods: {

        //确定-添加酒店
        submitForm(CommodityAdd) {
            // console.log(CommodityAdd.hotelName);
            let that = this;
            let params = {
                commodityname: that.CommodityAdd.commodityname,
                suppliername: that.CommodityAdd.suppliername,
                sqlnumber: that.CommodityAdd.sqlnumber,
                guaranteetime: that.CommodityAdd.guaranteetime,
                selectdate: that.CommodityAdd.selectdate,
                guige: that.CommodityAdd.guige,
                heightprice: that.CommodityAdd.heightprice,
                retailprice: that.CommodityAdd.retailprice,
                bannerList: that.CommodityAdd.bannerList,  
            }
            this.$refs[CommodityAdd].validate((valid) => {
                if (valid) {
                    console.log(params);
                    // this.$api.hotelAdd(params)
                    //     .then(response => {
                    //         if(response.data.msg_code == 10000){

                    //         }else{
                    //             that.$alert(response.data.message,"警告",{
                    //                 confirmButtonText: "确定"
                    //             })
                    //         }
                    //     })
                    //     .catch(error => {
                    //         that.$alert(error,"警告",{
                    //             confirmButtonText: "确定"
                    //         })
                    //     })

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm(CommodityAdd) {
            this.$refs[CommodityAdd].resetFields();
        },
        //选择年月日
        selectdate(e){
          console.log(e)

        },
        //图片上传成功
        handleSuccess(res, file) {
            // this.CommodityAdd.headPhoto = URL.createObjectURL(file.raw);
        },
        //移除图片
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        //点击文件列表中已上传的文件时
        handlePreview(file) {
            // console.log(file);
        },
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file){
            const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //文件超出个数限制时
        handleExceed(file,fileList){
            this.$message.error('上传图片不能超过5张！');

             this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        }
    },
}
</script>


<style lang="less" scoped>
.el-select{
    width: 32%;
  }
.hoteladd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 50%;
        .starclass{
            padding-top: 10px;
        }
        .divskin{
            width: 32%;
            display: inline-block;
            .imgskin{
                background: #f9f;
                width: 90px;
                height: 120px;
                display: inline-block;
            }
        }
        .mapposition{
            width: 100%;
            height: 100px;
            background: #9f9;
        }
        .upload-hint{
            font-size: 12px;
            color: #999;
            line-height: 12px;
        }
        
        .btnwrap{margin-left: 140px;}
        .el-input{width: 225px;}
        .termput{width: 80px;display: inline-block;float: left;
            margin-right: 10px;}
        .btnwrap{margin-left: 140px;}
    }
}

</style>

