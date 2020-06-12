<template>
    <div class="booktype">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="房型名称">
                <el-input v-model="inquireTypeName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div v-if="authzlist['F:BH_BOOK_TYPE_ADD']"><el-button class="addbutton" @click="bookTypeAdd">新增房型</el-button></div>
        <el-table :data="bookTypeDataList" border style="width:100%;">
            <el-table-column fixed prop="sort" label="排序" min-width="80px"></el-table-column>
            <el-table-column prop="imageListDTOS" label="图片" min-width="80px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.imageListDTOS.url" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="typeName" label="房型名称" min-width="120px"></el-table-column>
            <el-table-column prop="roomSize" label="面积" min-width="80px"></el-table-column>
            <el-table-column prop="bedTypeName" label="床型" min-width="80px"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="160px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzlist['F:BH_BOOK_TYPE_EDIT']" type="text" size="small" @click="bookTypeModify(scope.row.id)">修改</el-button>
                    <el-button v-if="authzlist['F:BH_BOOK_TYPE_DELETE']" type="text" size="small" @click="bookTypeDelete(scope.row.id)">删除</el-button>
                    <el-button v-if="authzlist['F:BH_BOOK_TYPE_VIEW']" type="text" size="small" @click="bookTypeDetail(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该房型？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import HotelPagination from '@/components/HotelPagination'
import resetButton from './resetButton'
export default {
    name: 'HotelBookTypeList',
    components:{
        HotelPagination,
        resetButton
    },
    data(){
        return {
            authzlist: {}, //权限数据
            hotelId: '',
            inquireTypeName: '',
            bookTypeDataList: [],
            btId: '',
            dialogVisibleDelete: false,
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.hotelId = localStorage.getItem('hotelId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.bookTypeList();
    },
    methods: {
        resetFunc(){
            this.inquireTypeName = ''
            this.bookTypeList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.bookTypeList();
        },
        //房型列表
        bookTypeList(){
            const params = {
                orgAs: 3,
                hotelId: this.hotelId,
                typeName: this.inquireTypeName,
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            };
            // console.log(params);
            this.$api.bookTypeList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.bookTypeDataList = result.data.records;
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
            this.bookTypeList();
            this.$store.commit('setSearchList',{
                inquireTypeName: this.inquireTypeName
            })
        },
        //新增房型
        bookTypeAdd(){
            this.$router.push({name: 'HotelBookTypeAdd'});
        },
        //修改
        bookTypeModify(id){
            this.$router.push({name: 'HotelBookTypeModify', query: {id}});
        },
        //删除
        bookTypeDelete(id){
            this.btId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const params = {};
            const id = this.btId;
            // console.log(params);
            this.$api.bookTypeDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('房型删除成功！');
                        this.bookTypeList();
                        this.dialogVisibleDelete = false;
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
        },
        //查看详情
        bookTypeDetail(id){
            this.$router.push({name: 'HotelBookTypeDetail', query: {id}});
        },
    }
}
</script>

<style>
.el-dialog__header{
    text-align: left;
}
</style>

<style lang="less" scoped>
.booktype{
    .pagination{
        margin-top: 20px;
    }
}
</style>

