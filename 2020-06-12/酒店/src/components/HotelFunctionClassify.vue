<template>
    <div class="functionclassify">
        <div v-if="authzData['F:BH_FUNC_FUNCTION_CLASSIFY_ADD']" class="addlevelone"><el-button type="primary" @click="levelOneAdd">新增一级分类</el-button></div>
        <el-tree
            :data = "typeDataDetail"
            :props="defaultProps"
            node-key = 'id'
            default-expand-all
            :expand-on-click-node = "false"
            :render-content="renderContent">
        </el-tree>
        <br/>
        <div class="addlevelone"><el-button @click="returnList">返回</el-button></div>
        <el-dialog title="新增一级分类" :visible.sync="dialogLevelOneVisible" width="30%">
            <el-form :model="levelOneData" :rules="rules" ref="levelOneData" label-width="100px" class="formclass">
                <el-form-item label="功能区名称" prop="funcName">
                    <el-input :disabled="true" v-model="funcName"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="levelOneData.sort"></el-input>
                </el-form-item>
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model.trim="levelOneData.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="是否显示" prop="isshow">
                    <el-switch v-model="levelOneData.isshow"></el-switch>
                </el-form-item>
                <el-form-item label="选中图标">
                    <!-- <span slot="label"><label class="required-icon">*</label> 选中图标</span> -->
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture"
                        :limit="1"
                        :headers="headers"
                        name="fileContent"
                        :file-list="selectedIcon"
                        :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                        :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                        :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                        :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                        :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label>
                    </el-upload>
                </el-form-item>
                <el-form-item label="未选中图标">
                    <!-- <span slot="label"><label class="required-icon">*</label> 未选中图标</span> -->
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture"
                        :limit="1"
                        :headers="headers"
                        name="fileContent"
                        :file-list="notSelectedIcon"
                        :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 2)}"
                        :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 2)}"
                        :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 2)}"
                        :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 2)}"
                        :before-upload="(file, index) => {return beforeUpload(file, 2)}">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLevelOneVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmitLO" @click="ensureLevelOne('levelOneData')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="dialogAddVisible" width="30%">
            <el-form :model="SubclausesDataAdd" :rules="rules" ref="SubclausesDataAdd" label-width="100px" class="formclass">
                <el-form-item label="功能区名称" prop="funcName">
                    <el-input :disabled="true" v-model="funcName"></el-input>
                </el-form-item>
                <el-form-item label="上级名称">
                    <el-input :disabled="true" v-model="SubclausesDataAdd.parentName"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="SubclausesDataAdd.sort"></el-input>
                </el-form-item>
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model.trim="SubclausesDataAdd.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="是否显示" prop="isshow">
                    <el-switch v-model="SubclausesDataAdd.isshow"></el-switch>
                </el-form-item>
                <el-form-item label="选中图标">
                    <!-- <span slot="label"><label class="required-icon">*</label> 选中图标</span> -->
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture"
                        :limit="1"
                        :headers="headers"
                        name="fileContent"
                        :file-list="selectedIcon"
                        :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                        :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                        :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                        :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                        :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label>
                    </el-upload>
                </el-form-item>
                <el-form-item label="未选中图标">
                    <!-- <span slot="label"><label class="required-icon">*</label> 未选中图标</span> -->
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture"
                        :limit="1"
                        :headers="headers"
                        name="fileContent"
                        :file-list="notSelectedIcon"
                        :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 2)}"
                        :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 2)}"
                        :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 2)}"
                        :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 2)}"
                        :before-upload="(file, index) => {return beforeUpload(file, 2)}">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmitAdd" @click="ensureAdd('SubclausesDataAdd')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="dialogModifyVisible" width="30%">
            <el-form :model="SubclausesDataModify" :rules="rules" ref="SubclausesDataModify" label-width="100px" class="formclass">
                <el-form-item label="功能区名称" prop="funcName">
                    <el-input :disabled="true" v-model="funcName"></el-input>
                </el-form-item>
                <el-form-item v-if="isLevelOneM" label="上级名称">
                    <el-input :disabled="true" v-model="SubclausesDataModify.parentCategoryName"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="SubclausesDataModify.sort"></el-input>
                </el-form-item>
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model.trim="SubclausesDataModify.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="是否显示" prop="isShowM">
                    <el-switch v-model="isShowM"></el-switch>
                </el-form-item>
                <el-form-item label="选中图标">
                    <!-- <span slot="label"><label class="required-icon">*</label> 选中图标</span> -->
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture"
                        :limit="1"
                        :headers="headers"
                        name="fileContent"
                        :file-list="selectedIcon"
                        :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                        :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                        :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                        :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                        :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label>
                    </el-upload>
                </el-form-item>
                <el-form-item label="未选中图标">
                    <!-- <span slot="label"><label class="required-icon">*</label> 未选中图标</span> -->
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture"
                        :limit="1"
                        :headers="headers"
                        name="fileContent"
                        :file-list="notSelectedIcon"
                        :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 2)}"
                        :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 2)}"
                        :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 2)}"
                        :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 2)}"
                        :before-upload="(file, index) => {return beforeUpload(file, 2)}">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogModifyVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmitModify" @click="ensureModify('SubclausesDataModify')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogDeleteVisible" width="30%">
            <span>是否确认删除该分类？</span>
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
    name: 'HotelFunctionClassify',
    data(){
        const typeDataDetail = [];
        return {
            authzData: '',
            hotelId: '',
            funcId: '',
            funcName: '',
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            selectedIcon: [],
            notSelectedIcon: [],
            typeDataDetail: JSON.parse(JSON.stringify(typeDataDetail)),
            defaultProps: {
                children: 'childDtoList',
                label: 'categoryName'
            },

            dialogLevelOneVisible: false,
            levelOneData: {
                sort: 0,
                isshow: false
            },
            isSubmitLO: false,

            dialogAddVisible: false,
            SubclausesDataAdd: {
                sort: 0,
                isshow: false
            },
            appendData: {},
            isSubmitAdd: false,

            dialogModifyVisible: false,
            isLevelOneM: false,
            SubclausesDataModify: {
                sort: 0,
            },

            modifyData: {},
            isSubmitModify: false,
            isShowM: false,
            dialogDeleteVisible: false,
            deleteNode: {},
            deleteData: {},

            rules: {
                sort: [
                    { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                ],
                categoryName: [
                    {required: true, message: '请填写分类名称', trigger: 'blur'},
                    {min: 1, max: 10, message: '分类名称请保持在10个字段以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hotelId = this.$route.query.hotelId;
        this.funcId = this.$route.query.funcId;
        this.funcName = this.$route.query.funcName;
        this.functionClassifyTree();
    },
    methods: {
        //返回
        returnList(){
            this.$router.push({name:'HotelFunctionList'});
        },
        //功能区分类 - 树
        functionClassifyTree(){
            const params = {
                funcId: this.funcId,
                hotelId: this.hotelId
            };
            this.$api.functionClassifyTree(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.typeDataDetail = result.data;
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
        //新增一级条目
        levelOneAdd(){
            this.levelOneData.sort = 0;
            this.selectedIcon = [];
            this.notSelectedIcon = [];
            this.dialogLevelOneVisible = true;
        },
        ensureLevelOne(levelOneData){
            if(this.levelOneData.sort == ''){
                this.levelOneData.sort = 0;
            }
            let isDisplay;
            if(this.levelOneData.isshow){isDisplay = 1;}else{isDisplay = 0;}
            const sIconArr = JSON.stringify(this.selectedIcon.map(item => item.path));
            const sIconStr = sIconArr.substr(2,sIconArr.length-4);
            const nsIconArr = JSON.stringify(this.notSelectedIcon.map(item => item.path));
            const nsIconStr = nsIconArr.substr(2,nsIconArr.length-4);
            const params = {
                hotelId: this.hotelId,
                funcId: this.funcId,
                parentId: 0,
                sort: this.levelOneData.sort,
                categoryName: this.levelOneData.categoryName,
                allocId: this.levelOneData.allocId,
                isShow: isDisplay,
                selectedIcon: sIconStr,
                notSelectedIcon: nsIconStr,
            };
            this.$refs[levelOneData].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmitLO = true;
                    this.$api.functionClassifyAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data != null){
                                    // const newOneChild = { id: result.data, categoryName: this.levelOneData.categoryName, childDtoList: [] };
                                    //  if (!this.typeDataDetail.childDtoList) {
                                    //     this.$set(this.typeDataDetail, 'childDtoList', []);
                                    // }
                                    // this.typeDataDetail.push(newOneChild);
                                    this.functionClassifyTree();
                                    this.dialogLevelOneVisible = false;
                                    this.levelOneData.categoryName = '';
                                    this.levelOneData.allocId = '';
                                    this.levelOneData.isshow = false;
                                }else{
                                    this.$message.error('新增分类失败！');
                                }
                                this.isSubmitLO = false;
                            }else{
                                this.$message.error(result.msg);
                                this.isSubmitLO = false;
                            }
                        })
                        .catch(error => {
                            this.isSubmitLO = false;
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
            if(data.parentId != 0){
                this.$message.warning('仅支持两级分类，无法新增！');
                return false;
            }
            this.SubclausesDataAdd.sort = 0;
            this.selectedIcon = [];
            this.notSelectedIcon = [];
            this.appendData = data;
            this.SubclausesDataAdd.parentName = this.appendData.categoryName;
            this.dialogAddVisible = true;
        },
        ensureAdd(SubclausesDataAdd){
            if(this.SubclausesDataAdd.sort == ''){
                this.SubclausesDataAdd.sort = 0;
            }
            let isDisplay;
            if(this.SubclausesDataAdd.isshow){isDisplay = 1;}else{isDisplay = 0;}
            const sIconArr = JSON.stringify(this.selectedIcon.map(item => item.path));
            const sIconStr = sIconArr.substr(2,sIconArr.length-4);
            const nsIconArr = JSON.stringify(this.notSelectedIcon.map(item => item.path));
            const nsIconStr = nsIconArr.substr(2,nsIconArr.length-4);
             const params = {
                hotelId: this.hotelId,
                funcId: this.funcId,
                parentId: this.appendData.id,
                sort: this.SubclausesDataAdd.sort,
                categoryName: this.SubclausesDataAdd.categoryName,
                allocId: this.SubclausesDataAdd.allocId,
                isShow: isDisplay,
                selectedIcon: sIconStr,
                notSelectedIcon: nsIconStr,
            };
            this.$refs[SubclausesDataAdd].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmitAdd = true;
                    this.$api.functionClassifyAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data != null){
                                    // const newChild = { id: result.data, categoryName: this.SubclausesDataAdd.categoryName, childDtoList: [] };
                                    //  if (!this.appendData.childDtoList) {
                                    //     this.$set(this.appendData, 'childDtoList', []);
                                    // }
                                    // this.appendData.childDtoList.push(newChild);
                                    this.functionClassifyTree();
                                    this.dialogAddVisible = false;
                                    this.SubclausesDataAdd.categoryName = '';
                                    this.SubclausesDataAdd.allocId = '';
                                    this.SubclausesDataAdd.isshow = false;
                                }else{
                                    this.$message.error('新增分类失败！');
                                }
                                this.isSubmitAdd = false;
                            }else{
                                this.$message.error(result.msg);
                                this.isSubmitAdd = false;
                            }
                        })
                        .catch(error => {
                            this.isSubmitAdd = false;
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
            if(this.modifyData.parentId == 0){
                this.isLevelOneM = false;
            }else{
                this.isLevelOneM = true;
            }
            const id = this.modifyData.id;
            const params = {};
            this.$api.functionClassifyDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.SubclausesDataModify = result.data;
                        if(result.data.isShow == 1){
                            this.isShowM = true;
                        }else{
                            this.isShowM = false;
                        }
                        if(result.data.selectedIcon == '' || result.data.selectedIconUrl == null){
                            this.selectedIcon = [];
                        }else{
                            this.selectedIcon = [{
                                name: result.data.selectedIcon,
                                url:  result.data.selectedIconUrl,
                                path: result.data.selectedIcon
                            }];
                        }
                        if(result.data.notSelectedIcon == '' || result.data.notSelectedIconUrl == null){
                            this.notSelectedIcon = [];
                        }else{
                            this.notSelectedIcon = [{
                                name: result.data.notSelectedIcon,
                                url:  result.data.notSelectedIconUrl,
                                path: result.data.notSelectedIcon
                            }];
                        }
                        this.dialogModifyVisible = true;
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
        ensureModify(SubclausesDataModify){
            if(this.SubclausesDataModify.sort == ''){
                this.SubclausesDataModify.sort = 0;
            }
            let isDisplay;
            if(this.isShowM){isDisplay = 1;}else{isDisplay = 0;}
            const id = this.modifyData.id;
            const sIconArr = JSON.stringify(this.selectedIcon.map(item => item.path));
            const sIconStr = sIconArr.substr(2,sIconArr.length-4);
            const nsIconArr = JSON.stringify(this.notSelectedIcon.map(item => item.path));
            const nsIconStr = nsIconArr.substr(2,nsIconArr.length-4);
            const params = {
                hotelId: this.hotelId,
                funcId: this.funcId,
                parentId: this.modifyData.parentId,
                sort: this.SubclausesDataModify.sort,
                categoryName: this.SubclausesDataModify.categoryName,
                allocId: this.SubclausesDataModify.allocId,
                isShow: isDisplay,
                selectedIcon: sIconStr,
                notSelectedIcon: nsIconStr,
            };
            this.$refs[SubclausesDataModify].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.$api.functionClassifyModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data == true){
                                    // this.$set(this.modifyData, 'categoryName', this.SubclausesDataModify.categoryName);
                                    this.functionClassifyTree();
                                    this.dialogModifyVisible = false;
                                }else{
                                    this.$message.error('分类修改失败！');
                                }
                                this.isSubmitModify = false;
                                this.dialogModifyVisible = false;
                            }else{
                                this.$message.error(result.msg);
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
        //删除子条目
        remove(node, data) {
            if(data.childDtoList == null){
                data.childDtoList = [];
            }
            if(data.childDtoList.length == 0){
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
            this.$api.functionClassifyDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        if(result.data == true){
                            this.functionClassifyTree();
                        }else{
                            that.$message.error('分类删除失败！');
                        }
                        that.dialogDeleteVisible = false;
                    }else{
                        that.$message.error(result.msg);
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

        //图片上传成功
        handleSuccess(res, file, fileList, index){
            if(index == 1){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.selectedIcon.push(image);
            }else if(index == 2){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.notSelectedIcon.push(image);
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                this.selectedIcon = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
            }else if(index == 2){
                this.notSelectedIcon = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
            }
        },
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file, index){
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
        handleExceed(file, fileList, index){
            this.$message.error('图片只能上传1张！');
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList, index){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        }
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
.functionclassify{
    .addlevelone{
        text-align: left;
        margin-bottom: 20px;
    }
    .formclass{
        text-align: left;
    }
    .required-icon{
        color: #ff3030;
    }
}
</style>

