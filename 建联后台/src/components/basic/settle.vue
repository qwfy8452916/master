<template>
    <div>
        <p class="title">结算方式管理</p>
        <el-form :inline="true" :model="SettleForm" class="demo-form-inline" align=left>
            <el-form-item label="状态">
                <el-select v-model="SettleForm.isActive">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已启用" value="1"></el-option>
                    <el-option label="已禁用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">查询</el-button>
            </el-form-item>
            <el-form-item class="addSettleItem">
                <el-button type="primary" @click="addSettle" plain>+ 新增结算方式</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="SettleList"
            border
            style="width: 100%">
            <el-table-column
                prop="content"
                label="付款方式描述" align=center>
            </el-table-column>
            <el-table-column
                prop="mode"
                label="价格时间规则" align=center>
            </el-table-column>
            <el-table-column prop="isActive" label="状态" width="100px" align=center>
                <template slot-scope="scope">{{scope.row.isActive=='1'?'已启用':'已禁用'}}</template>
            </el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button  :type="scope.row.isActive == '1' ? 'info' : 'primary'" @click="disableSettle(scope.row.id,scope.row.isActive)" size="mini">{{ scope.row.isActive == '0' ? '启用' : '禁用' }}</el-button>
                    <el-button  type="danger" plain @click="deleteSettle(scope.row.id)" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="pageSize"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div> -->
        <el-dialog title="提示" :visible.sync="dialogVisibleDisable" width="30%">
            <span>是否确认{{settleState=='1'?'启用':'禁用'}}该结算方式？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDisable=false">取消</el-button>
                <el-button type="primary" @click="disableEnsure">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该结算方式？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="deleteEnsure">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                token: '',
                SettleForm: {
                    isActive:''
                },
                settleId:'',
                dialogVisibleDisable:false,
                dialogVisibleDelete:false,
                SettleList: [],
                settleState:'',
                // pageSize:10,
                // pageTotal: 1,  //默认总条数
                // pageNum: 1,   //实际当前页码
                // currentPage: 1, //默认当前页码
                // url: '/api/frontend/joint_purchase/normal',
            }
        },
        mounted(){
        },
        methods: {
            //筛选
            submit(){
                this.currentPage = 1;
                this.getSettleList();
            },
            // //跳转
            // current(){
            //     this.pageNum = this.currentPage;
            //     this.getSettleList();
            // },
            // //上一页
            // prev(){
            //     this.pageNum = this.pageNum - 1;
            //     this.getSettleList();
            // },
            // //下一页
            // next(){
            //     this.pageNum = this.pageNum + 1;
            //     this.getSettleList();
            // },
            //跳转到新增结算方式页面
            addSettle(){
                this.$router.push({name: 'settleAdd'});
            },
            //删除当前结算方式
            deleteSettle(id){
                this.settleId = id;
                this.dialogVisibleDelete = true;
            },
            deleteEnsure(){
                const params = {};
                const id = this.settleId ;
                $api.deleteSettle(params,id)
                    .then(response => {
                        const result = response.data;
                        if(result.code == '0'){
                            this.dialogVisibleDelete = false;
                            this.$message.success('删除成功！');
                            this.getSettleList();
                        }else{
                            this.dialogVisibleDelete = false;
                            this.$message.error('删除失败！');
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })

            },
            //启用或禁用当前结算方式
            disableSettle(id,state){
                this.settleId = id;
                if(state == 0){
                    this.settleState = 1;
                }else{
                    this.settleState = 0;
                }
                this.dialogVisibleDisable = true;
            },
            disableEnsure(){
                const id = this.settleId;
                const params = this.settleState;
                $api.disableSettle(params,id)
                    .then(response => {
                        if(response.data.code == 0){
                            if(this.settleState == 1){
                                this.$message.success('禁用成功！');
                            }else{
                                this.$message.success('启用成功！');
                            }
                            this.getSettleList();
                            this.dialogVisibleDisable = false;
                        }else{
                            if(this.settleState == 1){
                                this.$message.error('禁用失败！');
                            }else{
                                this.$message.error('启用失败！');
                            }
                            this.dialogVisibleDisable = false;
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                        this.dialogVisibleDisable = false;
                    })
            },
            //获取结算方式列表
            getSettleList(){
                const params =  this.SettleForm.isActive;
                $api.getSettle(params).then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.SettleList = result.data;
                        // this.pageTotal = result.data.length;
                    }else{
                        this.$message.error('获取角色列表失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
                
            }
        },
        created(){
            this.getSettleList();
        }
    }
</script>


<style lang="less" scoped>
    .title{
        font-weight: bold;
        font-size:26px;
        text-align: left;
    }
    .addSettleItem{
        float: right;
    }
    .pagination{
        margin-top: 20px;
    }
</style>