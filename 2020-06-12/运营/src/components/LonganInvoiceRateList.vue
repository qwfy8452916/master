<template>
    <div class="protocollist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="商品销售发票税率名称">
                <el-input v-model="inquireName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div v-if="authzData['F:BO_FIN_PRODRATE_ADD']"><el-button class="addbutton" @click="invoiceRateAdd">新增</el-button></div>
        <el-table 
            :data="invoiceRateDataList" 
            border
            stripe 
            style="width:100%;">
            <el-table-column fixed prop="taxRateName" label="商品销售发票税率名称"></el-table-column>
            <el-table-column fixed prop="taxRate" label="商品销售发票税率"></el-table-column>
            <el-table-column v-if="authzData['F:BO_FIN_PRODRATE_DEFAULT']" prop="isDefaultRate" label="设为默认税率" align=center>
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isDefaultRate" @change="rateSetDefault(scope.row.id)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_FIN_PRODRATE_EDIT']" type="text" size="small" @click="invoiceRateModify(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_FIN_PRODRATE_DELETE']" type="text" size="small" @click="invoiceRateDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该商品销售发票税率？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
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
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'LonganInvoiceRateList',
    components:{
        resetButton
    },
    data(){
        return{
            authzData: '',
            oprId: '',
            inquireName: '',
            irId: '',
            invoiceRateDataList: [],
            dialogVisibleDelete: false,
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.oprId = localStorage.getItem('oprId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.invoiceRateList(1);
    },
    methods: {
        resetFunc(){
            this.inquireName = ''
            this.invoiceRateList();
        },
        //获取商品销售发票税率列表
        invoiceRateList(page){
            const params = {
                oprId: this.oprId,
                taxRateName : this.inquireName,
                pageNo: page,
                pageSize: 10
            };
            this.$api.invoiceRateList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.invoiceRateDataList = result.data.records.map(item => {
                            if(item.isDefault == 0){
                                item.isDefaultRate = false;
                            }else{
                                item.isDefaultRate = true;
                            }
                            return item
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
            this.invoiceRateList(this.pageNum);
            this.$store.commit('setSearchList',{
                inquireName: this.inquireName
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.invoiceRateList(this.pageNum);
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.invoiceRateList(this.pageNum);
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.invoiceRateList(this.pageNum);
        },
        //新增
        invoiceRateAdd(){
            this.$router.push({name: 'LonganInvoiceRateAdd'});
        },
        //设为默认税率
        rateSetDefault(id){
            const params = {};
            this.$api.rateSetDefault(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('设置成功！');
                        this.invoiceRateList(this.pageNum);
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
        //修改
        invoiceRateModify(id){
            this.$router.push({name: 'LonganInvoiceRateModify', query: {id}});
        },
        //删除
        invoiceRateDelete(id){
            this.irId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const params = {};
            const id = this.irId;
            // console.log(params);
            this.$api.invoiceRateDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data){
                            this.$message.success('商品销售发票税率删除成功！');
                            this.invoiceRateList(this.pageNum);
                            this.dialogVisibleDelete = false;
                        }else{
                            this.$message.error('商品销售发票税率删除失败！');
                            this.dialogVisibleDelete = false;
                        }
                    }else{
                        this.$message.error(result.msg);
                        this.dialogVisibleDelete = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        }
    }
}
</script>

<style>
.el-dialog__header{
    text-align: left;
}
</style>

<style lang="less" scoped>
.protocollist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

