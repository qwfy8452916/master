<template>
    <div class="servicetypedetail">
        <div class="addlevelone"><el-button type="primary" @click="levelOneAdd">新增一级条目</el-button></div>
        <el-tree
            :data = "typeDataDetail"
            node-key = 'id'
            default-expand-all
            :expand-on-click-node = "false"
            :render-content="renderContent"
            @node-drop="handleDrop"
            draggable>
        </el-tree>
        <el-dialog title="新增一级条目" :visible.sync="dialogLevelOneVisible" width="30%">
            <el-form :model="levelOneData" :rules="rules" ref="levelOneData" label-width="80px">
                <el-form-item prop="imageUrl">
                    <span slot="label"><label class="required-icon">*</label> 图片</span>
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture"
                        :limit="1"
                        name="fileContent"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                        :on-exceed="handleExceed"
                        :file-list="levelOneimageList"
                        :on-error="imgUploadError"
                        :before-upload="beforeUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只支持上传1张图片（建议尺寸：45*35px）</label>
                    </el-upload>
                </el-form-item>
                <el-form-item label="条目名称" prop="name">
                    <el-input v-model.trim="levelOneData.name"></el-input>
                </el-form-item>
                <el-form-item label="价格描述" prop="price">
                    <el-input v-model="levelOneData.price"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLevelOneVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmitLO" @click="ensureLevelOne('levelOneData')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="dialogAddVisible" width="30%">
            <el-form :model="SubclausesDataAdd" :rules="rules" ref="SubclausesDataAdd" label-width="80px">
                <el-form-item prop="imageUrl">
                    <span slot="label"><label class="required-icon">*</label> 图片</span>
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture"
                        :limit="1"
                        name="fileContent"
                        :on-success="handleSuccessChild"
                        :on-remove="handleRemoveChild"
                        :on-exceed="handleExceed"
                        :file-list="SubclausesimageList"
                        :on-error="imgUploadError"
                        :before-upload="beforeUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只支持上传1张图片（建议尺寸：45*35px）</label>
                    </el-upload>
                </el-form-item>
                <el-form-item label="条目名称" prop="name">
                    <el-input v-model.trim="SubclausesDataAdd.name"></el-input>
                </el-form-item>
                <el-form-item label="价格描述" prop="price">
                    <el-input v-model="SubclausesDataAdd.price"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmitAdd" @click="ensureAdd('SubclausesDataAdd')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="dialogModifyVisible" @close="closeFun" width="30%">
            <el-form :model="SubclausesDataModify" :rules="rules" ref="SubclausesDataModify" label-width="80px">
                <el-form-item prop="imageUrl">
                    <span slot="label"><label class="required-icon">*</label> 图片</span>
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture"
                        :limit="1"
                        name="fileContent"
                        :on-success="handleSuccessChildM"
                        :on-remove="handleRemoveChildM"
                        :on-exceed="handleExceed"
                        :file-list="SubclausesimageListM"
                        :on-error="imgUploadError"
                        :before-upload="beforeUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只支持上传1张图片（建议尺寸：45*35px）</label>
                    </el-upload>
                </el-form-item>
                <el-form-item label="条目名称" prop="name">
                    <el-input v-model.trim="SubclausesDataModify.name"></el-input>
                </el-form-item>
                <el-form-item label="价格描述" prop="priceDesc">
                    <el-input v-model="SubclausesDataModify.priceDesc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogModifyVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmitModify" @click="ensureModify('SubclausesDataModify')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogDeleteVisible" width="30%">
            <span>确定删除该服务条目？</span>
            <span slot="footer">
                <el-button @click="dialogDeleteVisible=false">取消</el-button>
                <el-button type="primary" @click="ensureDelete">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
let id = 1000;
export default {
    name: 'HotelServiceDetail',
    data(){
        const typeDataDetail = [];
        return{
            hstId: '',
            typeDataDetail: JSON.parse(JSON.stringify(typeDataDetail)),
            uploadUrl: this.$api.upload_file_url,

            dialogLevelOneVisible: false,
            levelOneData: {},
            levelOneimageList: [],
            imagePath: '',
            isSubmitLO: false,

            dialogAddVisible: false,
            SubclausesDataAdd: {},
            SubclausesimageList: [],
            imagePathChild: '',
            appendData: {},
            isSubmitAdd: false,

            dialogModifyVisible: false,
            SubclausesDataModify: {},
            SubclausesimageListM: [],
            imagePathChildM: '',
            modifyData: {},
            isSubmitModify: false,

            dialogDeleteVisible: false,
            deleteNode: {},
            deleteData: {},

            rules: {
                name: [
                    {required: true, message: '请填写条目名称', trigger: 'blur'},
                    {min: 1, max: 10, message: '条目名称请保持在10个字段以内', trigger: ['blur','change']}
                ],
                price: [
                    {min: 0, max: 18, message: '价格描述请保持在18个字段以内', trigger: ['blur','change']}
                ],
                priceDesc: [
                    {min: 0, max: 18, message: '价格描述请保持在18个字段以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        this.hstId = this.$route.query.id;
        this.getServiceTypeDetail();
    },
    methods: {
        //获取明细条目
        getServiceTypeDetail(){
            const params = {
                hotelTypeId: this.hstId
            };
            // console.log(params);
            this.$api.getHotelServiceDetail(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.typeDataDetail = result.data;
                    }else{
                        this.$message.error('获取明细条目失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //移动
        handleDrop(draggingNode, dropNode, dropType, ev) {
            // console.log(draggingNode);
            // console.log(dropNode);
            // console.log(dropType);
            //服务类型Id   this.hstId
            //自身Id   
            var selfData = draggingNode.data;
            var selfId = selfData.id;
            //父Id   
            var parentData = dropNode.parent;
            var parentId, locationIndex;
            if(parentData.data.id){
                parentId = parentData.data.id;
                locationIndex = parentData.data.children.findIndex(ind => ind.id === selfData.id);
            }else{
                parentId = 0;
                locationIndex = parentData.data.findIndex(ind => ind.id === selfData.id);
            }
            //所在位置索引
            // const locationData = parentData.data.children;
            // const locationIndex = locationData.findIndex(ind => ind.id === selfData.id);

            const params = {
                id: selfId,      //自身Id
                rmsvcHotelId: this.hstId,      //服务类型Id
                targetId: parentId,      //目标位 父Id
                targetIndex: locationIndex      //目标位 索引
            };
            // console.log(params);
            this.$api.hotellocationMove(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == 0){
                        if(result.data == true){
                            this.getServiceTypeDetail();
                        }else{
                            this.$message.error('移动失败！');
                            this.getServiceTypeDetail();
                        }
                    }else{
                        this.$message.error('移动失败！');
                        this.getServiceTypeDetail();
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //新增一级条目
        levelOneAdd(){
            this.dialogLevelOneVisible = true;
        },
        ensureLevelOne(levelOneData){
            const params = {
                rmsvcHotelId: this.hstId,
                imagePath: this.imagePath,
                name: this.levelOneData.name,
                priceDesc: this.levelOneData.price
            };
            this.$refs[levelOneData].validate((valid) => {
                if(valid){
                    if(this.imagePath == ''){
                        this.$message.error('请上传图片!');
                        return false
                    }
                    // console.log(params);
                    this.isSubmitLO = true;
                    this.$api.hotelstlevelOneAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data != null){
                                    const newOneChild = { id: result.data, label: this.levelOneData.name, children: [] };
                                     if (!this.typeDataDetail.children) {
                                        this.$set(this.typeDataDetail, 'children', []);
                                    }
                                    this.typeDataDetail.push(newOneChild);
                                    this.dialogLevelOneVisible = false;
                                    this.levelOneimageList = [];
                                    this.imagePath = '';
                                    this.levelOneData.name = '';
                                }else{
                                    this.$message.error('新增一级条目失败！');
                                }
                                this.isSubmitLO = false;
                            }else{
                                this.$message.error('新增一级条目失败！');
                                this.isSubmitLO = false;
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
        //新增子条目
        append(data) {
            // console.log(data);
            this.appendData = data;
            this.dialogAddVisible = true;
        },
        ensureAdd(SubclausesDataAdd){
             const params = {
                rmsvcHotelId: this.hstId,
                parentId: this.appendData.id,
                imagePath: this.imagePathChild,
                name: this.SubclausesDataAdd.name,
                priceDesc: this.SubclausesDataAdd.price
            };
            this.$refs[SubclausesDataAdd].validate((valid) => {
                if(valid){
                    if(this.imagePathChild == ''){
                        this.$message.error('请上传图片!');
                        return false
                    }
                    // console.log(params);
                    this.isSubmitAdd = true;
                    this.$api.hotelstlevelOneAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data != null){
                                    const newChild = { id: result.data, label: this.SubclausesDataAdd.name, children: [] };
                                     if (!this.appendData.children) {
                                        this.$set(this.appendData, 'children', []);
                                    }
                                    this.appendData.children.push(newChild);
                                    this.dialogAddVisible = false;
                                    this.SubclausesimageList = [];
                                    this.imagePathChild = '';
                                    this.SubclausesDataAdd.name = '';
                                    this.SubclausesDataAdd.price = '';
                                }else{
                                    this.$message.error('新增条目失败！');
                                }
                                this.isSubmitAdd = false;
                            }else{
                                this.$message.error('新增条目失败！');
                                this.isSubmitAdd = false;
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
        //修改条目
        modify(data){
            // console.log(data);
            this.modifyData = data;
            const id = this.modifyData.id;
            const params = {};
            this.$api.hotelstlevelOneDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.SubclausesDataModify = result.data;
                        this.SubclausesimageListM = [{name: result.data.imagePath, url: result.data.imageUrl}];
                        this.imagePathChildM = result.data.imagePath;
                        this.dialogModifyVisible = true;
                    }else{
                        this.$message.error('条目信息获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        ensureModify(SubclausesDataModify){
            const id = this.modifyData.id;
            const params = {
                imagePath: this.imagePathChildM,
                name: this.SubclausesDataModify.name,
                priceDesc: this.SubclausesDataModify.priceDesc
            };
            this.$refs[SubclausesDataModify].validate((valid) => {
                if(valid){
                    if(this.imagePathChildM == ''){
                        this.$message.error('请上传图片!');
                        return false
                    }
                    // console.log(params);
                    this.$api.hotelstlevelOneModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data == true){
                                    this.$set(this.modifyData, 'label', this.SubclausesDataModify.name);
                                    this.dialogModifyVisible = false;
                                }else{
                                    this.$message.error('条目信息修改失败！');
                                }
                                this.isSubmitModify = false;
                                this.dialogModifyVisible = false;
                            }else{
                                this.$message.error('条目信息修改失败！');
                                this.isSubmitModify = false;
                                this.dialogModifyVisible = false;
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
        closeFun(){
            this.SubclausesimageListM = [];
        },
        //删除子条目
        remove(node, data) {
            if(data.children.length == 0){
                this.deleteNode = node;
                this.deleteData = data;
                this.dialogDeleteVisible = true;
            }else{
                this.$message.warning('此条目下存在子级，无法删除！');
            }
        },
        ensureDelete(){
            const that = this;
            const id = this.deleteData.id;
            const params = {};
            this.$api.hotelstlevelOneDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        if(result.data == true){
                            this.getServiceTypeDetail();
                        }else{
                            that.$message.error('条目信息修改失败！');
                        }
                        that.dialogDeleteVisible = false;
                    }else{
                        that.$message.error('条目信息删除失败！');
                        that.dialogDeleteVisible = false;
                    }
                })
                .catch(error => {
                     this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>
                        <el-button size="mini" type="text" on-click={ () => this.append(data) }>新增</el-button>
                        <el-button size="mini" type="text" on-click={ () => this.modify(data) }>修改</el-button>
                        <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                    </span>
                </span>
            );
        },

        //文件上传之前调用 做一些拦截限制
        beforeUpload(file){
            const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传商品图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //文件超出个数限制时
        handleExceed(file,fileList){
            this.$message.error('只能上传1张图片！');
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        },
        //新增一级条目 - 图片上传成功
        handleSuccess(res, file, fileList) {
            this.imagePath = res.data;
        },
        //新增一级条目 - 移除图片
        handleRemove(file, fileList) {
           this.imagePath = '';
        },
        //新增子条目 - 图片上传成功
        handleSuccessChild(res, file, fileList){
            this.imagePathChild = res.data;
        },
        //新增子条目 - 移除图片
        handleRemoveChild(file, fileList){
            this.imagePathChild = '';
        },
        //修改条目 - 图片上传成功
        handleSuccessChildM(res, file, fileList){
            this.imagePathChildM = res.data;
        },
        //修改条目 - 移除图片
        handleRemoveChildM(file, fileList){
            this.imagePathChildM = '';
        },
    }
}
</script>

<style lang="less" scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.servicetypedetail{
    .addlevelone{
        text-align: left;
        margin-bottom: 20px;
    }
    .required-icon{
        color: #ff3030;
    }
}
</style>

