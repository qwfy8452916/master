<template>
    <div class="bannerwrap">
        <el-form-item>
            <span slot="label"><label class="required-icon">*</label> banner图</span>
            <el-upload
                :disabled="isDisabled"
                :action="uploadUrl"
                list-type="picture"
                :limit="5"
                :headers="headers"
                name="fileContent"
                :file-list="bannerList"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :on-error="imgUploadError"
                :before-upload="beforeUpload">
                <el-button size="small" type="primary">点击上传</el-button>
                <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片支持jpg、jpeg、png等，最多支持5张</label>
            </el-upload>
        </el-form-item>
        <div class="bannerlink">
            <el-form-item v-for="(item, index) in bannerList" :key="index" class="linkstyle">
                <el-select :disabled="isDisabled" v-model="item.linkId" @change="selectLink(index, item.linkId)" placeholder="选择链接" style="width: 72%">
                    <el-option 
                        v-for="subitem in bannerLinkList" 
                        :key="subitem.id" 
                        :label="subitem.linkName" 
                        :value="subitem.id">
                    </el-option>
                </el-select>&nbsp;&nbsp;
                <el-button v-if="item.isParam" type="text" size="small" @click="linkParam(index)">链接参数</el-button>
            </el-form-item>
        </div>
        <el-dialog title="链接参数" :visible.sync="dialogVisibleParams" width="30%">
            <el-form>
                <el-form-item v-for="(item, index) in paramsList" :key="index" label-width="100px">
                    <span slot="label"><label v-if="item.isNecessary == 1" class="required-icon">*</label> {{item.parameterName}}</span>
                    <el-input :disabled="isDisabled" v-model="item.value" maxlength="50"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogVisibleParams=false">取消</el-button>
                <el-button :disabled="isDisabled" type="primary" @click="EnsureParams">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'BannerPicLinkParams',
    props: ["bannerType","isDisabled","bannerList"],
    data() {
        return{
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            bannerLinkList: [],
            dialogVisibleParams: false,
            bannerIndex: '',
            paramsList: [],
        }
    },
    mounted(){
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.basicDataItems_url();
    },
    methods: {
        //选择链接
        selectLink(index, val){
            let paramState = this.bannerLinkList.find(item => item.id == val);
            if(paramState.isNeedParameter == 1){
                this.bannerList[index].paramsData = [];
                this.bannerList[index].isParam = true;
            }else{
                this.bannerList[index].paramsData = [];
                this.bannerList[index].isParam = false;
            }
            const params = {
                linkId: this.bannerList[index].linkId,
                imageId: this.bannerList[index].id
            };
            //bannerType：1 功能区，2酒店
            if(this.bannerType == 1){
                this.$api.basicDataItems_urlParamsF(params)
                    .then(response => {
                        const result = response.data;
                        if(result.code == 0){
                            this.bannerList[index].paramsLD = result.data;
                        }else{
                            this.$message.error(result.msg);
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }else if(this.bannerType == 2){
                this.$api.basicDataItems_urlParamsH(params)
                    .then(response => {
                        const result = response.data;
                        if(result.code == 0){
                            this.bannerList[index].paramsLD = result.data;
                        }else{
                            this.$message.error(result.msg);
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }
        },
        //链接参数
        linkParam(index){
            this.bannerIndex = index;
            const params = {
                linkId: this.bannerList[index].linkId,
                imageId: this.bannerList[index].id
            };
            //bannerType：1 功能区，2酒店
            if(this.bannerType == 1){
                this.$api.basicDataItems_urlParamsF(params)
                    .then(response => {
                        const result = response.data;
                        if(result.code == 0){
                            this.paramsList = result.data;
                            this.dialogVisibleParams = true;
                        }else{
                            this.$message.error(result.msg);
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }else if(this.bannerType == 2){
                this.$api.basicDataItems_urlParamsH(params)
                    .then(response => {
                        const result = response.data;
                        if(result.code == 0){
                            this.paramsList = result.data;
                            this.dialogVisibleParams = true;
                        }else{
                            this.$message.error(result.msg);
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }
        },
        EnsureParams(){
            for(let i=0; i<this.paramsList.length; i++){
                if(this.paramsList[i].isNecessary == 1 && (this.paramsList[i].value == '' || this.paramsList[i].value == undefined)){
                    this.$message.error('请填写必填参数!');
                    return false
                }
            }
            this.bannerList[this.bannerIndex].paramsData = this.paramsList.map(item => {
                return {
                    id: item.id,
                    value: item.value
                }
            });
            this.dialogVisibleParams = false;
        },
        //获取图片指向链接 - 字典表
        basicDataItems_url(){
            const params = {};
            this.$api.basicDataItems_url(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.bannerLinkList = result.data.map(item => {
                            return{
                                id: item.id,
                                linkName: item.linkName,
                                linkUrl: item.linkUrl,
                                isNeedParameter: item.isNeedParameter,
                            }
                        })
                        const linkNO = {
                            id: 0,
                            linkName: '无链接',
                            linkUrl: '',
                            isNeedParameter: 0,
                        };
                        this.bannerLinkList.push(linkNO);
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
        //图片上传成功
        handleSuccess(res, file, fileList){
            this.bannerList.push({
                id: '',
                name:file.name,
                path:file.response.data,
                url:file.url,
                linkId: 0,
                isParam:false,
                paramsData: [],
                paramsLD: []
            });
        },
        //移除图片
        handleRemove(file, fileList){
            this.$emit('bannerListEvent',{fileList})
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

<style lang="less" scoped>
.bannerwrap{
    position: relative;
    .required-icon{
        color: #F56C6C;
    }
    .bannerlink{
        position: absolute;
        z-index: 10;
        top: 76px;
        left: 200px;
        .el-form-item{
            height: 102px;
            margin-bottom: 0px;
        }
    }
}  
</style>>

