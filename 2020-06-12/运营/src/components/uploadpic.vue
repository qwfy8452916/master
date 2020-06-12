<template>
    <div class="picwrap">
        <el-form-item label="商品描述图">
            <el-upload
                :disabled="isDisabled"
                :action="uploadUrl"
                list-type="picture"
                :headers="headers"
                name="fileContent"
                :file-list="descList"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :on-error="imgUploadError">
                <!-- :limit="5" 限制上传数量   -->
                <!-- :on-exceed="handleExceed"  文件超出个数限制时的钩子 -->
                <el-button size="small" type="primary">点击上传</el-button>
                <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片支持jpg、jpeg、png等</label>
            </el-upload>
        </el-form-item>
        <div class="sortwrap">
            <el-form-item label="排序" v-for="(item,index) in descList" :key="index" class="sortlabel">
                <el-input :disabled="isDisabled" v-model="item.sort" class="sortinput"></el-input>
            </el-form-item>
        </div>
    </div>
</template>

<script>
export default {
    name:"uploadpic",
    data(){
        return {
            uploadUrl: this.$api.upload_file_url,
            headers: {},
        }
    },
    props: ["isDisabled","descList"],
    // props:{
    //     descList:Array,
    // },
    mounted(){
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
    },
    methods:{
        //图片上传成功
        handleSuccess(res, file, fileList){
            this.descList.push({
                name:file.name,
                path:file.response.data,
                url:file.url,
                sort:''
            });
        },
        //移除图片
        handleRemove(file, fileList){
            this.$emit('descListevent',{fileList})
        },
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file){
            const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
            if (!isJPG) {
                this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
            }
            return isJPG;
        },
        //文件超出个数限制时
        handleExceed(file, fileList){
            this.$message.error('上传图片超出限制！');
        },
        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
        }
    }
}
</script>

<style lang="less" scope>
.picwrap{
    position:relative;
    .sortwrap{
        position: absolute;
        top: 78px;
        left: 280px;
        width: 25%;
        // display: inline;
        z-index:10;
        .sortlabel{
            display: inline-block;
            margin-bottom: 60px;
            .el-form-item__label{
                width: 100px !important;
            }
            .el-form-item__content{
                margin-left: 100px !important;
            }
        }
        .sortinput{
            width: 60px;
        }
    }
}
</style>






