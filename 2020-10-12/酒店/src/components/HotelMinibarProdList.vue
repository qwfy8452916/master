<template>
    <div class="functionlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="配置名称">
                <el-input v-model="inquireDeployName"></el-input>
            </el-form-item>
            <el-form-item label="是否默认">
                <el-select v-model="inquireIsDefault" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div v-if="authzData['F:BH_PROD_MINIPROD_ADD']"><el-button class="addbutton" @click="miniDeployAdd">新增配置商品</el-button></div>
        <el-table :data="miniDeployDataList" border stripe style="width:100%;" >
            <el-table-column prop="profileName" label="配置名称"></el-table-column>
            <el-table-column prop="isDefault" label="是否为默认">
                <template slot-scope="scope">
                    <span v-if="scope.row.isDefault == 1">是</span>
                    <span v-else>否</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="240px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BH_PROD_MINIPROD_EDIT'] && scope.row.isDefault != 1" type="text" size="small" @click="miniDeployModify(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BH_PROD_MINIPROD_DELETE'] && scope.row.isDefault != 1" type="text" size="small" @click="miniDeployDelete(scope.row.id)">删除</el-button>
                    <el-button v-if="authzData['F:BH_PROD_MINIPROD_PROD']" type="text" size="small" @click="deployProdSelect(scope.row.hotelId, scope.row.id, scope.row.isDefault)">选择商品</el-button>
                    <el-button v-if="authzData['F:BH_PROD_MINIPROD_ROOM'] && scope.row.isDefault != 1" type="text" size="small" @click="deployRoomSelect(scope.row.hotelId, scope.row.id)">选择房间</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="10"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>如果您删除该配置商品，将使用默认配置<br/>是否确认删除？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDelete">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="管理房间" :visible.sync="dislogVisibleRoom" width="42%" class="userMangeDialog">
            <el-transfer
                filterable
                :data = "roomDataList"
                v-model="prodDataRoom"
                :titles="['未使用房间', '已选中房间']"
                >
            </el-transfer>
            <div slot="footer">
                <el-button @click="dislogVisibleRoom = false">取 消</el-button>
                <el-button type="primary" @click="manageEnsure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'HotelMinibarProdList',
    data(){
        return{
            authzData: '',
            inquireHid: '',
            mpId: '',
            hotelId: '',
            inquireDeployName: '',
            inquireIsDefault: '',
            miniDeployDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            dialogVisibleDelete: false,
            roomDataList: [],
            prodDataRoom: [],
            dislogVisibleRoom: false
        }
    },
    components:{
        resetButton
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hotelId = localStorage.getItem('hotelId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.miniDeployList();
    },
    methods: {
        resetFunc(){
            this.inquireDeployName = ''
            this.inquireIsDefault = ''
            this.miniDeployList();
        },
        //迷你吧配置列表
        miniDeployList(){
            const params = {
                hotelId: this.hotelId,
                profileName: this.inquireDeployName,
                isDefault: this.inquireIsDefault,
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.miniDeployList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.miniDeployDataList = result.data.records.map(item => {
                            if(item.isOnShelf == 1){
                                item.onShelfProd = true;
                            }else{
                                item.onShelfProd = false;
                            }
                            return item;
                        });
                        this.pageTotal = result.data.total;
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
        //查询
        inquire(){
            this.pageNum = 1;
            this.miniDeployList();
            this.$store.commit('setSearchList',{
                inquireDeployName: this.inquireDeployName,
                inquireIsDefault:this.inquireIsDefault
            })
        },
        current(){
            this.pageNum = this.currentPage;
            this.miniDeployList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.miniDeployList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.miniDeployList();
        },
        //新增
        miniDeployAdd(){
            this.$router.push({name:'HotelMinibarProdAdd'});
        },
        //修改
        miniDeployModify(id){
            this.$router.push({name:'HotelMinibarProdModify', query: {id}});
        },
        //删除
        miniDeployDelete(id){
            this.mpId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDelete(){
            const id = this.mpId;
            const params = {};
            // console.log(id);
            this.$api.miniDeployDelete(params,id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.dialogVisibleDelete = false;
                        this.$message.success('删除成功！');
                        this.miniDeployList();
                    }else{
                        this.dialogVisibleDelete = false;
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //选择商品
        deployProdSelect(hotelId, id, isDefault){
            this.$router.push({name:'HotelCabCommodityManage', query: {hotelId, id}});
            // if(isDefault == 1){
            //     this.$router.push({name:'HotelCabCommodityManage', query: {hotelId, id}});
            // }else{
            //     //验证有没有配置房间
            //     const params = {
            //         hotelId: hotelId,
            //         profileId: id
            //     };
            //     this.$api.validIsHaveRoom(params)
            //         .then(response => {
            //             const result = response.data;
            //             if(result.code == '0'){
            //                 this.$router.push({name:'HotelCabCommodityManage', query: {hotelId, id}});
            //             }else{
            //                 this.$message.error(result.msg);
            //             }
            //         })
            //         .catch(error => {
            //             this.$alert(error,"警告",{
            //                 confirmButtonText: "确定"
            //             })
            //         })
            // }
        },
        //选择房间
        deployRoomSelect(hotelId, id){
            this.hotelId = hotelId;
            this.mpId = id;
            this.roomDataList = [];
            this.prodDataRoom = [];
            this.getMiniRoomList();
            this.dislogVisibleRoom = true;
        },
        //获取房间列表
        getMiniRoomList(){
            const params = {
                hotelId: this.hotelId,
                profileId: this.mpId
            };
            this.$api.getMiniRoomList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const roomList = result.data;
                        // if(roomList.length != 0){
                            this.roomDataList = roomList.map(item => {
                                return{
                                    key: item.id,
                                    label: item.roomCode,
                                    disable: ''
                                }
                            });
                        // }
                        this.getSelectedRoomList();
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
        //获取选中房间列表
        getSelectedRoomList(){
            const params = {
                hotelId: this.hotelId,
                profileId: this.mpId
            };
            this.$api.getSelectedRoomList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const selectedList = result.data;
                        const allList = result.data.map(item => {
                            return{
                                key: item.cabId,
                                label: item.roomCode,
                                disable: ''
                            }
                        });
                        this.roomDataList = this.roomDataList.concat(allList);
                        if(selectedList.length != 0){
                            for(let i = 0; i < selectedList.length; i++){
                                this.prodDataRoom.push(selectedList[i].cabId);
                            }
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
        manageEnsure(){
            const params = {
                hotelId: this.hotelId,
                profileId: this.mpId,
                cabIdList: this.prodDataRoom
            };
            this.$api.modifyMiniRoom(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('选择房间成功！');
                        this.dislogVisibleRoom = false;
                    }else{
                        this.$message.error(result.msg);
                        this.dislogVisibleRoom = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
    },
}
</script>

<style>
/* .el-dialog__header{
    text-align: left;
} */
.el-transfer-panel{
    text-align: left;
    width: 230px !important;
}
</style>

<style lang="less" scoped>
.functionlist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

