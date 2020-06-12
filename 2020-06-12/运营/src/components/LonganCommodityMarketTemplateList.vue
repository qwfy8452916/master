<template>
    <div class="commoditymarket">
        <div>
            <!-- <div v-if="authzData['F:BO_PROD_MARKETTPL_ADD']"><el-button class="addbutton" @click="commodityMarketAdd">添加市场分类</el-button></div>
            <el-table :data="CommodityMarketDataList" border stripe style="width:100%;" >
                <el-table-column prop="categoryName" label="市场分类"></el-table-column>
                <el-table-column label="操作" width="180px" align=center>
                    <template slot-scope="scope">
                        <el-button v-if="authzData['F:BO_PROD_MARKETTPL_EDIT']" type="text" size="small" @click="modifyCommodityMarket(scope.row.id)">修改</el-button>
                        <el-button v-if="authzData['F:BO_PROD_MARKETTPL_DELETE']" type="text" size="small" @click="deleteCommodityMarket(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
                <span>是否确认删除该市场分类？</span>
                <span slot="footer">
                    <el-button @click="dialogVisibleDelete=false">取消</el-button>
                    <el-button type="primary" @click="EnsureDetail">确定</el-button>
                </span>
            </el-dialog> -->
        </div>
        <div class="addlevelone"><el-button type="primary" @click="levelOneAdd">新增</el-button></div>
        <el-tree
            :data = "typeDataDetail"
            :props="defaultProps"
            node-key = 'id'
            default-expand-all
            :expand-on-click-node = "false"
            :render-content="renderContent">
        </el-tree>
        <el-dialog title="新增" :visible.sync="dialogLevelOneVisible" width="30%">
            <el-form :model="levelOneData" :rules="rules" ref="levelOneData" label-width="80px">
                <el-form-item label="市场分类" prop="categoryName">
                    <el-input v-model.trim="levelOneData.categoryName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLevelOneVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmitLO" @click="ensureLevelOne('levelOneData')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="dialogAddVisible" width="30%">
            <el-form :model="SubclausesDataAdd" :rules="rules" ref="SubclausesDataAdd" label-width="80px">
                <el-form-item label="市场分类" prop="categoryName">
                    <el-input v-model.trim="SubclausesDataAdd.categoryName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmitAdd" @click="ensureAdd('SubclausesDataAdd')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="dialogModifyVisible" @close="closeFun" width="30%">
            <el-form :model="SubclausesDataModify" :rules="rules" ref="SubclausesDataModify" label-width="80px">
                <el-form-item label="市场分类" prop="categoryName">
                    <el-input v-model.trim="SubclausesDataModify.categoryName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogModifyVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmitModify" @click="ensureModify('SubclausesDataModify')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogDeleteVisible" width="30%">
            <span>确定删除该市场分类？</span>
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
    name: 'LonganCommodityMarketTemplateList',
    data(){
        const typeDataDetail = [];
        return {
            authzData: '',
            // orgId: '',
            // cmId: '',
            // CommodityMarketDataList: [],
            // dialogVisibleDelete: false

            typeDataDetail: JSON.parse(JSON.stringify(typeDataDetail)),
            defaultProps: {
                children: 'childrenList',
                label: 'categoryName'
            },

            dialogLevelOneVisible: false,
            levelOneData: {},
            isSubmitLO: false,

            dialogAddVisible: false,
            SubclausesDataAdd: {},
            appendData: {},
            isSubmitAdd: false,

            dialogModifyVisible: false,
            SubclausesDataModify: {},
            modifyData: {},
            isSubmitModify: false,

            dialogDeleteVisible: false,
            deleteNode: {},
            deleteData: {},

            rules: {
                categoryName: [
                    {required: true, message: '请填写市场分类', trigger: 'blur'},
                    {min: 1, max: 10, message: '市场分类请保持在10个字段以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        // this.commodityMarketList();
        // this.cmId = this.$route.query.id;
        this.getMarketTemplateDetail();
    },
    methods: {
        //获取市场分类 - 树
        getMarketTemplateDetail(){
            const params = {};
            this.$api.getMarketTemplateDetail(params)
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
            this.dialogLevelOneVisible = true;
        },
        ensureLevelOne(levelOneData){
            const params = {
                categoryName: this.levelOneData.categoryName,
            };
            this.$refs[levelOneData].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmitLO = true;
                    this.$api.marketTemplateAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data != null){
                                    const newOneChild = { id: result.data, categoryName: this.levelOneData.categoryName, childrenList: [] };
                                     if (!this.typeDataDetail.childrenList) {
                                        this.$set(this.typeDataDetail, 'childrenList', []);
                                    }
                                    this.typeDataDetail.push(newOneChild);
                                    this.dialogLevelOneVisible = false;
                                    this.levelOneData.categoryName = '';
                                }else{
                                    this.$message.error('新增市场分类失败！');
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
            this.appendData = data;
            this.dialogAddVisible = true;
        },
        ensureAdd(SubclausesDataAdd){
             const params = {
                parentId: this.appendData.id,
                categoryName: this.SubclausesDataAdd.categoryName,
            };
            this.$refs[SubclausesDataAdd].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmitAdd = true;
                    this.$api.marketTemplateAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data != null){
                                    const newChild = { id: result.data, categoryName: this.SubclausesDataAdd.categoryName, childrenList: [] };
                                     if (!this.appendData.childrenList) {
                                        this.$set(this.appendData, 'childrenList', []);
                                    }
                                    this.appendData.childrenList.push(newChild);
                                    this.dialogAddVisible = false;
                                    this.SubclausesDataAdd.categoryName = '';
                                }else{
                                    this.$message.error('新增市场分类失败！');
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
            const id = this.modifyData.id;
            const params = {};
            this.$api.marketTemplateDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.SubclausesDataModify = result.data;
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
            const id = this.modifyData.id;
            const params = {
                categoryName: this.SubclausesDataModify.categoryName,
            };
            this.$refs[SubclausesDataModify].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.$api.marketTemplateModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data == true){
                                    this.$set(this.modifyData, 'categoryName', this.SubclausesDataModify.categoryName);
                                    this.dialogModifyVisible = false;
                                }else{
                                    this.$message.error('市场分类修改失败！');
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
        closeFun(){
            this.SubclausesimageListM = [];
        },
        //删除子条目
        remove(node, data) {
            if(data.childrenList == null){
                data.childrenList = [];
            }
            if(data.childrenList.length == 0){
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
            this.$api.marketTemplateDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        if(result.data == true){
                            this.getMarketTemplateDetail();
                        }else{
                            that.$message.error('市场分类删除失败！');
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

        // //获取市场分类列表
        // commodityMarketList(){
        //     const params = {
        //         // entryOprOrgId: this.orgId
        //         orgAs: 2
        //     };
        //     // console.log(params);
        //     this.$api.commodityMarketList(params)
        //         .then(response => {
        //             // console.log(response);
        //             const result = response.data;
        //             if(result.code == '0'){
        //                 this.CommodityMarketDataList = result.data;
        //             }else{
        //                 this.$message.error(result.msg);
        //             }
        //         })
        //         .catch(error => {
        //             this.$alert(error,"警告",{
        //                 confirmButtonText: "确定"
        //             })
        //         })
        // },
        // //添加市场分类
        // commodityMarketAdd(){
        //     this.$router.push({name:'LonganCommodityMarketTemplateAdd'});
        // },
        // //修改
        // modifyCommodityMarket(id){
        //     this.$router.push({name:'LonganCommodityMarketTemplateModify', query: {id}});
        // },
        // //删除
        // deleteCommodityMarket(id){
        //     this.cmId = id;
        //     this.dialogVisibleDelete = true;
        // },
        // EnsureDetail(){
        //     const id = this.cmId;
        //     const params = {};
        //     this.$api.commodityMarketDelete(params,id)
        //         .then(response => {
        //             // console.log(response);
        //             const result = response.data;
        //             if(result.code == '0'){
        //                 this.$message.success('删除市场分类模板成功！');
        //                 this.dialogVisibleDelete = false;
        //                 this.commodityMarketList();
        //             }else{
        //                 this.$message.error('删除市场分类模板失败！');
        //                 this.dialogVisibleDelete = false;
        //             }
        //         })
        //         .catch(error => {
        //             this.$alert(error,"警告",{
        //                 confirmButtonText: "确定"
        //             })
        //         })
        // },
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
.commoditymarket{
    .addlevelone{
        text-align: left;
        margin-bottom: 20px;
    }
    .required-icon{
        color: #ff3030;
    }
}
</style>

