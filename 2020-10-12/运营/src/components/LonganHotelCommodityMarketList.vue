<template>
    <div class="commoditymarket">
        <el-form :inline="true" align=left class="formclass">
            <el-form-item label="酒店名称">
                <el-select 
                    v-model="inquireHotelName" 
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option 
                        v-for="item in hotelList" 
                        :key="item.id" 
                        :label="item.hotelName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-button v-if="authzData['F:BO_HOTEL_MARKET_ADD']" class="addbutton" @click="levelOneAdd">新增</el-button>
            <el-button v-if="authzData['F:BO_HOTEL_MARKET_IMPORT']" class="addbutton" @click="importTemplate">导入模板</el-button>
        </div>
        <!-- <el-table :data="CommodityMarketDataList" border style="width:100%;" >
            <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="categoryName" label="市场分类"></el-table-column>
            <el-table-column prop="hshopAllocIdName" label="分成协议名称"></el-table-column>
            <el-table-column prop="displayFlag" label="是否显示" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.displayFlag == 1">是</span>
                    <span v-else>否</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_HOTEL_MARKET_EDIT']" type="text" size="small" @click="modifyCommodityMarket(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_MARKET_DELETE']" type="text" size="small" @click="deleteCommodityMarket(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该商品市场分类？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDelete">确定</el-button>
            </span>
        </el-dialog> -->
        <el-tree
            :data = "typeDataDetail"
            :props="defaultProps"
            node-key = 'id'
            default-expand-all
            :expand-on-click-node = "false"
            :render-content="renderContent">
        </el-tree>
        <el-dialog title="新增市场分类" :visible.sync="dialogLevelOneVisible" width="30%">
            <el-form :model="levelOneData" :rules="rules" ref="levelOneData" label-width="100px" class="formclass">
                <el-form-item label="酒店名称" prop="hotelId">
                    <el-select 
                        v-model="levelOneData.hotelId" 
                        filterable
                        remote
                        :remote-method="remoteHotel"
                        :loading="loadingH"
                        @focus="getHotelList()"
                        placeholder="请选择">
                        <el-option 
                            v-for="item in hotelList" 
                            :key="item.id" 
                            :label="item.hotelName" 
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市场分类" prop="categoryName">
                    <el-input v-model.trim="levelOneData.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="是否显示" prop="isshow">
                    <el-switch v-model="levelOneData.isshow"></el-switch>
                </el-form-item>
                <el-form-item label="商城分成协议" prop="hshopAllocId">
                    <el-select v-model="levelOneData.hshopAllocId" placeholder="请选择">
                        <el-option
                            v-for="item in protocolList" 
                            :key="item.id" 
                            :label="item.allocName" 
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLevelOneVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmitLO" @click="ensureLevelOne('levelOneData')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="dialogAddVisible" width="30%">
            <el-form :model="SubclausesDataAdd" :rules="rules" ref="SubclausesDataAdd" label-width="100px" class="formclass">
                <el-form-item label="上级名称">
                    <el-input :disabled="true" v-model="SubclausesDataAdd.parentName"></el-input>
                </el-form-item>
                <el-form-item label="市场分类" prop="categoryName">
                    <el-input v-model.trim="SubclausesDataAdd.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="是否显示" prop="isshow">
                    <el-switch v-model="SubclausesDataAdd.isshow"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmitAdd" @click="ensureAdd('SubclausesDataAdd')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改市场分类" :visible.sync="dialogModifyVisible" width="30%">
            <el-form :model="SubclausesDataModify" :rules="rules" ref="SubclausesDataModify" label-width="100px" class="formclass">
                <el-form-item v-if="isLevelOneM" label="酒店名称" prop="hotelId">
                    <el-select 
                        v-model="SubclausesDataModify.hotelId" 
                        filterable
                        remote
                        :remote-method="remoteHotel"
                        :loading="loadingH"
                        @focus="getHotelList()"
                        placeholder="请选择">
                        <el-option 
                            v-for="item in hotelList" 
                            :key="item.id" 
                            :label="item.hotelName" 
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else label="上级名称">
                    <el-input :disabled="true" v-model="SubclausesDataModify.parentName"></el-input>
                </el-form-item>
                <el-form-item label="市场分类" prop="categoryName">
                    <el-input v-model.trim="SubclausesDataModify.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="是否显示" prop="isShowM">
                    <el-switch v-model="isShowM"></el-switch>
                </el-form-item>
                <el-form-item v-if="isLevelOneM" label="商城分成协议" prop="hshopAllocId">
                    <el-select v-model="SubclausesDataModify.hshopAllocId" placeholder="请选择">
                        <el-option
                            v-for="item in protocolList" 
                            :key="item.id" 
                            :label="item.allocName" 
                            :value="item.id">
                        </el-option>
                    </el-select>
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
    name: 'LonganHotelCommodityMarketList',
    data(){
        const typeDataDetail = [];
        return {
            authzData: '',
            // orgId: '',
            inquireHotelName: '',
            hotelList: [],
            loadingH: false,
            // cmId: '',
            // CommodityMarketDataList: [],
            // dialogVisibleDelete: false,
            
            typeDataDetail: JSON.parse(JSON.stringify(typeDataDetail)),
            defaultProps: {
                children: 'childrenList',
                label: 'categoryName'
            },
            protocolList: [],   //分成协议列表
            dialogLevelOneVisible: false,
            levelOneData: {
                isshow: false
            },
            isSubmitLO: false,
            dialogAddVisible: false,
            SubclausesDataAdd: {
                isshow: false
            },
            appendData: {},
            isSubmitAdd: false,

            dialogModifyVisible: false,
            isLevelOneM: false,
            SubclausesDataModify: {},
            isShowM: false,
            modifyData: {},
            isSubmitModify: false,

            dialogDeleteVisible: false,
            deleteNode: {},
            deleteData: {},

            rules: {
                hotelId: [
                    {required: true, message: '请选择酒店名称', trigger: 'change'}
                ],
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
        this.getHotelList();
        this.getprotocolList();
    },
    methods: {
        //获取酒店信息
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                hotelName: hName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.hotelList(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName
                            }
                        })
                        this.inquireHotelName = this.hotelList[0].id;
                        // this.hotelCommodityMarketList();
                        this.getHotelMarketDetail(this.inquireHotelName);
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
        remoteHotel(val){
            this.getHotelList(val);
        },
        //获取分成协议列表
        getprotocolList(){
            const params = {};
            this.$api.getprotocolList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.protocolList = result.data.map(item => {
                            return{
                                allocName: item.allocName,
                                id: item.id
                            }
                        })
                        const proNo = {
                            id: 0,
                            allocName: '暂不选择',
                        }
                        this.protocolList.push(proNo);
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
        //获取市场分类 - 树
        getHotelMarketDetail(hotelId){
            const params = {
                hotelId: hotelId
            };
            this.$api.getHotelMarketDetail(params)
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
            let isDisplay;
            if(this.levelOneData.isshow){isDisplay = 1;}else{isDisplay = 0;}
            const params = {
                hotelId: this.levelOneData.hotelId,
                categoryName: this.levelOneData.categoryName,
                displayFlag: isDisplay,
                hshopAllocId: this.levelOneData.hshopAllocId,
                parentId: 0
            };
            this.$refs[levelOneData].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmitLO = true;
                    this.$api.hotelMarketAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data != null){
                                    // const newOneChild = { id: result.data, categoryName: this.levelOneData.categoryName, childrenList: [] };
                                    //  if (!this.typeDataDetail.childrenList) {
                                    //     this.$set(this.typeDataDetail, 'childrenList', []);
                                    // }
                                    // this.typeDataDetail.push(newOneChild);
                                    // this.dialogLevelOneVisible = false;
                                    // this.levelOneData.categoryName = '';
                                    this.getHotelMarketDetail(this.levelOneData.hotelId);
                                    this.inquireHotelName = this.levelOneData.hotelId
                                    this.dialogLevelOneVisible = false;
                                    this.levelOneData.hotelId = '';
                                    this.levelOneData.categoryName = '';
                                    this.levelOneData.isshow = false;
                                    this.levelOneData.hshopAllocId = '';
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
            this.SubclausesDataAdd.parentName = this.appendData.categoryName;
            this.dialogAddVisible = true;
        },
        ensureAdd(SubclausesDataAdd){
            let isDisplay;
            if(this.SubclausesDataAdd.isshow){isDisplay = 1;}else{isDisplay = 0;}
            const params = {
                hotelId: this.appendData.hotelId,
                categoryName: this.SubclausesDataAdd.categoryName,
                displayFlag: isDisplay,
                parentId: this.appendData.id
            };
            this.$refs[SubclausesDataAdd].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmitAdd = true;
                    this.$api.hotelMarketAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data != null){
                                    // const newChild = { id: result.data, categoryName: this.SubclausesDataAdd.categoryName, childrenList: [] };
                                    //  if (!this.appendData.childrenList) {
                                    //     this.$set(this.appendData, 'childrenList', []);
                                    // }
                                    // this.appendData.childrenList.push(newChild);
                                    // this.dialogAddVisible = false;
                                    // this.SubclausesDataAdd.categoryName = '';
                                    this.getHotelMarketDetail(this.appendData.hotelId);
                                    this.inquireHotelName = this.appendData.hotelId;
                                    this.dialogAddVisible = false;
                                    this.SubclausesDataAdd.categoryName = '';
                                    this.SubclausesDataAdd.isshow = false;
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
        //修改市场分类
        modify(data){
            // console.log(data);
            this.modifyData = data;
            if(this.modifyData.parentId == 0){
                this.isLevelOneM = true;
            }else{
                this.isLevelOneM = false;
            }
            const id = this.modifyData.id;
            const params = {};
            this.$api.hotelMarketDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.SubclausesDataModify = result.data;
                        if(result.data.displayFlag == 1){
                            this.isShowM = true;
                        }else{
                            this.isShowM = false;
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
            let isDisplay;
            if(this.isShowM){isDisplay = 1;}else{isDisplay = 0;}
            const id = this.modifyData.id;
            const params = {
                hotelId: this.SubclausesDataModify.hotelId,
                categoryName: this.SubclausesDataModify.categoryName,
                displayFlag: isDisplay,
                hshopAllocId: this.SubclausesDataModify.hshopAllocId,
                parentId: this.modifyData.parentId
            };
            this.$refs[SubclausesDataModify].validate((valid) => {
                if(valid){
                    // console.log(params);
                    // return
                    this.$api.hotelMarketModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data == true){
                                    // this.$set(this.modifyData, 'categoryName', this.SubclausesDataModify.categoryName);
                                    // this.dialogModifyVisible = false;
                                    this.getHotelMarketDetail(this.SubclausesDataModify.hotelId);
                                    this.inquireHotelName = this.SubclausesDataModify.hotelId;
                                    this.dialogAddVisible = false;
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
                this.$message.warning('此市场分类存在子级，无法删除！');
            }
        },
        ensureDelete(){
            const that = this;
            const id = this.deleteData.id;
            const params = {};
            this.$api.hotelMarketDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        if(result.data == true){
                            this.getHotelMarketDetail(this.inquireHotelName);
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
        //查询
        inquire(){
            this.getHotelMarketDetail(this.inquireHotelName);
        },
        //导入模板
        importTemplate(){
            const params = {};
            const id = this.inquireHotelName;
            // console.log(params);
            this.$api.hotelMarketTpl(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data){
                            this.$message.success('导入模板成功！');
                            this.getHotelMarketDetail(this.inquireHotelName);
                        }else{
                            this.$message.error('导入模板失败！');
                        }
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
        // //获取市场分类列表
        // hotelCommodityMarketList(){
        //     const params = {
        //         // encryptedOrgId: this.orgId,
        //         orgAs: 2,
        //         hotelId: this.inquireHotelName
        //     };
        //     // console.log(params);
        //     this.$api.hotelCommodityMarketList(params)
        //         .then(response => {
        //             // console.log(response);
        //             const result = response.data;
        //             if(result.code == '0'){
        //                 this.CommodityMarketDataList = result.data;
        //             }else{
        //                 this.$message.error('市场分类列表获取失败！');
        //             }
        //         })
        //         .catch(error => {
        //             this.$alert(error,"警告",{
        //                 confirmButtonText: "确定"
        //             })
        //         })
        // },
        // //查询
        // inquire(){
        //     this.hotelCommodityMarketList();
        // },
        // //添加市场分类
        // commodityMarketAdd(){
        //     this.$router.push({name:'LonganHotelCommodityMarketAdd'});
        // },
        // //导入模板
        // importTemplate(){
        //     const params = {
        //         // encryptedOrgId: this.orgId,
        //         orgAs: 2,
        //         hotelId: this.inquireHotelName
        //     };
        //     // console.log(params);
        //     this.$api.hotelCommodityMarketTemplate(params)
        //         .then(response => {
        //             // console.log(response);
        //             const result = response.data;
        //             if(result.code == '0'){
        //                 if(result.data){
        //                     this.$message.success('导入模板成功！');
        //                     this.hotelCommodityMarketList();
        //                 }else{
        //                     this.$message.error('导入模板失败！');
        //                 }
        //             }else{
        //                 this.$message.error('导入模板失败！');
        //             }
        //         })
        //         .catch(error => {
        //             this.$alert(error,"警告",{
        //                 confirmButtonText: "确定"
        //             })
        //         })
        // },
        // //修改
        // modifyCommodityMarket(id){
        //     this.$router.push({name:'LonganHotelCommodityMarketModify', query: {id}});
        // },
        // //删除
        // deleteCommodityMarket(id){
        //     this.cmId = id;
        //     this.dialogVisibleDelete = true;
        // },
        // EnsureDelete(){
        //     const id = this.cmId;
        //     const params = {};
        //     this.$api.hotelCommodityMarketDelete(params, id)
        //         .then(response => {
        //             // console.log(response);
        //             const result = response.data;
        //             if(result.code == '0'){
        //                 this.$message.success('删除市场分类成功！');
        //                 this.dialogVisibleDelete = false;
        //                 this.hotelCommodityMarketList();
        //             }else{
        //                 this.$message.error(result.msg);
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

<style scoped>
.el-dialog__header{
    text-align: left;
}
</style>

<style lang="less" scoped>
.el-tree{
    margin-top: 70px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.commoditymarket{
    .formclass{
        text-align: left;
    }
    .addlevelone{
        text-align: left;
        margin-bottom: 20px;
    }
    .required-icon{
        color: #ff3030;
    }
}
</style>

