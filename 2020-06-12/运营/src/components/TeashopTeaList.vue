<template>
    <div class="tealist">
        <!-- <el-form :inline="true" align=left class="searchform">
            <el-form-item label="商品名称">
                <el-select v-model="inquireTeaName" placeholder="请选择">
                    <el-option v-for="item in prodList" :key="item.prodId" :label="item.prodName" :value="item.prodId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form> -->
        <div><el-button class="addbutton" @click="teaAdd">新增商品</el-button></div>
        <el-table :data="TeaDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="商品id" width="80px" align=center></el-table-column>
            <el-table-column prop="logoUrl" label="商品图片" width="80px" align=center>
                 <template slot-scope="scope">
                    <img :src="scope.row.logoUrl" alt="" style="width:45px;height:35px;margin-bottom:-6px;">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="marketPrice" label="市场价(元)" align=center></el-table-column>
            <el-table-column prop="memberPrice" label="会员价(元)" align=center></el-table-column>
            <el-table-column prop="specification" label="规格" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" align=center></el-table-column>
            <el-table-column prop="onShelfProd" label="上下架" align=center>
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.onShelfProd" @change="updateStatus(scope.row.id, scope.row.onShelfProd)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="teaModify(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="teaDelete(scope.row.id)">删除</el-button>
                    <el-button type="text" size="small" @click="teaDetail(scope.row.id)">查看详情</el-button>
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
            <span>是否确认删除该商品？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="ensureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'TeashopTeaList',
    data(){
        return {
            ttId: '',
            prodList: [],
            inquireTeaName: '',
            TeaDataList: [],
            dialogVisibleDelete: false,
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1
        }
    },
    mounted(){
        this.getTeaList();
        this.teashopTeaList();
    },
    methods: {
        //商品列表
        getTeaList(){
            const params = {};
            this.$api.getTeaList(params)
                .then(response => {
                    const result = response.data;
                    // console.log(result);
                    if(result.code == 0){
                        this.prodList = result.data.map(item => {
                            return{
                                prodId: item.prodId,
                                prodName: item.prodName
                            }
                        })
                        const prodAll = {
                            prodId: '',
                            prodName: '全部'
                        };
                        this.prodList.push(prodAll);
                    }else{
                        this.$message.error('商品列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //商品列表
        teashopTeaList(){
            const params = {
                id: this.inquireTeaName,
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.teashopTeaList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.TeaDataList = result.data.records.map(item => {
                            if(item.onShelf == 0){
                                item.onShelfProd = false
                            }else{
                                item.onShelfProd = true
                            }
                            return item
                        });
                        this.pageTotal = result.data.total;
                        // console.log(this.TeaDataList);
                    }else{
                        this.$message.error('商品列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //修改上架状态
        updateStatus(id,value){
            // console.log(value);
            const params = {};
            this.$api.teashopTeaStatus(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(value){
                            this.$message.success('商品上架修改成功！');
                        }else{
                            this.$message.success('商品下架修改成功！');
                        }
                    }else{
                        if(value){
                            this.$message.error('商品上架修改失败！');
                            this.TeaDataList.onShelfProd = false;
                        }else{
                            this.$message.error('商品下架修改失败！');
                            this.TeaDataList.onShelfProd = true;
                        }
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
            this.teashopTeaList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.teashopTeaList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.teashopTeaList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.teashopTeaList();
        },
        //添加
        teaAdd(){
            this.$router.push({name: 'TeashopTeaAdd'});
        },
        //修改
        teaModify(id){
            this.$router.push({name: 'TeashopTeaModify', query: {id}});
        },
        //删除
        teaDelete(id){
            this.ttId = id;
            this.dialogVisibleDelete = true;
        },
        ensureDetail(){
            const id = this.ttId;
            const params = {};
            this.$api.teashopTeaDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('删除商品成功！');
                        this.dialogVisibleDelete = false;
                        this.teashopTeaList();
                    }else{
                        this.$message.error(result.msg);
                        this.dialogVisibleDelete = false;
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //查看详情
        teaDetail(id){
            this.$router.push({name: 'TeashopTeaDetail', query: {id}});
        },
    }
}
</script>

<style lang="less" scoped>
.tealist{
    .pagination{
        margin-top: 20px;
    }
}
</style>
