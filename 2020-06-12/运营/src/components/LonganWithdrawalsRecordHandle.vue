<template>
    <div class="LonganWithdrawalsRecordHandle">
        <ul class="detailul">
            <li>
                <div>状态</div>
                <div v-if="LonganWithdrawalsRecordDetails.withdrawalStatus == 3">待处理</div>
                <div v-else-if="LonganWithdrawalsRecordDetails.withdrawalStatus == 1">转账成功</div>
                <div v-else-if="LonganWithdrawalsRecordDetails.withdrawalStatus == 2">转账失败</div>
            </li>
            <li>
                <div>酒店名称</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelName}}</div>
            </li>
            <li>
                <div>申请时间</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelWithdrawalTime}}</div>
            </li>
            <li>
                <div>提现金额</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelWithdrawalAmount}}</div>
            </li>
            <li>
                <div>提现人</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelWithdrawalName}}</div>
            </li>
            <li>
                <div>开户银行</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelBank}}</div>
            </li>
            <li>
                <div>账户名称</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelAccountName}}</div>
            </li>
            <li>
                <div>账号</div>
                <div>{{LonganWithdrawalsRecordDetails.hotelAccount}}</div>
            </li>
        </ul>
        <div class="text-left">
            <el-button v-if="authzData['F:BO_FIN_WITHDRAW_DEAL']" type="success" @click="agree = true">处理</el-button>
            <el-button type="primary" @click="backbtn">返回</el-button>
        </div>
        <el-dialog class="changebox" title="同意提现申请" :visible.sync="agree">
            <el-form :model="form">
                <el-form-item label="处理状态:">
                    <el-select v-model="form.withdrawalStatus" @change="typechange">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-show="ShowType">
                    <el-form-item label="转账时间:">
                        <el-date-picker
                            v-model="form.porDisposeTime"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="转账凭证:">
                        <el-upload
                            class="upload-demo"
                            :action="uploadUrl"
                            :limit="1"
                            name="fileContent"
                            :on-success="handleSuccess"
                            :on-remove="handleRemove"
                            :on-exceed="handleExceed"
                            :on-error="imgUploadError"
                            :before-upload="beforeUpload">
                            <el-button size="small" type="primary">上传凭证</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </div>
                <el-form-item label="备注:">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.porDisposeRemark">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="agree = false">取 消</el-button>
                <el-button type="primary" @click="patchporDisposePath">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganWithdrawalsRecordHandle',
    data(){
        return{
            authzData: '',
            uploadUrl: this.$api.upload_file_url,
            LonganWithdrawalsRecordDetails: {},
            agree: false,
            ShowType: true,
            options: [{
                value: '1',
                label: '已转账'
                }, {
                value: '2',
                label: '转账失败'
            }],
            form: {
                hotelId: '',
                hotelWithdrawalAmount: '',
                withdrawalStatus: '',
                porDisposePath: '',
                porDisposeTime: '',
                porDisposeRemark: ''
            },
            id: ''
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.id = this.$route.query.id;
        this.form.hotelId = this.$route.query.hotelId;
        this.LonganWithdrawalsRecordHandle();
    },
    methods: {
        //酒店提现记录详情
        LonganWithdrawalsRecordHandle(){
            this.$api.LonganWithdrawalsRecordDetail(this.id).then(response=>{
                if(response.data.code==0){
                    this.LonganWithdrawalsRecordDetails = response.data.data;
                    this.form.hotelWithdrawalAmount = this.LonganWithdrawalsRecordDetails.hotelWithdrawalAmount;
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },
        //返回
        backbtn(){
            this.$router.push({name: 'LonganWithdrawalsRecord'});
        },
        typechange(){
            if(this.form.withdrawalStatus == 2){
                this.ShowType = false;
            }else{
                this.ShowType = true;
            }
        },
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file){
            const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传商品图片大小不能超过500kb!');
            }
            return isJPG && isLt2M;
        },
        //图片上传成功
        handleSuccess(res, file, fileList) {
            this.form.porDisposePath = res.data;
        },
        //移除图片
        handleRemove(file, fileList) {
            this.form.porDisposePath = '';
        },
        //文件超出个数限制时
        handleExceed(file,fileList){
            this.$message.error('只能上传1张图片！');
        },
        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
        },
        //提交处理状态
        patchporDisposePath(){
            console.log();
            if(this.form.withdrawalStatus == ''){
                this.$message.error('请选择处理状态');
                return false;
            }else if(this.form.withdrawalStatus == 1){
                if(this.form.porDisposeTime == ''){
                    this.$message.error('请选择转账时间');
                    return false;
                }else if(this.form.porDisposePath == ''){
                    this.$message.error('请上传转账凭证');
                    return false;
                }
            }
            if(this.form.porDisposeRemark.length>=200){
                this.$message.error('备注内容不可超过200字');
                return false;
            }
            this.$api.patchporDisposePath(this.id,this.form).then(response=>{
                if(response.data.code==0){
                    this.agree = false;
                    if(response.data.data){
                        this.$router.push({name: 'LonganWithdrawalsRecord'});
                    }
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        }
    }
}
</script>

<style lang="less" scoped>
.detailul{
    width: 400px;
    border: 1px solid #ccc;
    padding-left: 0;
    margin-bottom: 20px;
}
.detailul li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.detailul li:last-child{
    border-bottom: none;
}
.detailul li div{
    font-size: 14px;
    color: #000;
    height: 60px;
}
.detailul li div:first-child{
    width: 25%;
    text-align: right;
    padding-right: 10px;
    border-right: 1px solid #ccc;
    line-height: 60px;
}
.detailul li div:last-child{
    width: 73%;
    text-align: left;
    padding-left: 10px;
    display: flex;
    align-items: center;
}
.text-left{
    text-align: left;
}
</style>

