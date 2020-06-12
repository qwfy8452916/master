<template>
    <div class="servicetypelist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称">
                <el-select 
                    v-model="inquireHotelName"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酒店文化故事">
                <el-input v-model="inquireCultureName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div v-if="authzData['F:BO_HOTEL_CULTURE_ADD']"><el-button class="addbutton" @click="hotelCultureAdd">新增</el-button></div>
        <el-table :data="hotelCultureDataList" border stripe style="width:100%;" >
            <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="cultureStoryName" label="酒店文化故事"></el-table-column>
            <el-table-column label="图片" width="160px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.storyPath" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_HOTEL_CULTURE_EDIT']" type="text" size="small" @click="hotelCultureModify(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_CULTURE_DELETE']" type="text" size="small" @click="hotelCultureDelete(scope.row.id)">删除</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_CULTURE_VIEW']" type="text" size="small" @click="hotelCultureDetail(scope.row.id)">查看详情</el-button>
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
            <span>是否确认删除该文化故事？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'LonganHotelCultureList',
    components:{
        resetButton
    },
    data(){
        return{
            authzData: '',
            hcId: '',
            hotelList: [],
            loadingH: false,
            inquireHotelName: '',
            inquireCultureName: '',
            hotelCultureDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            dialogVisibleDelete: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.hotelCultureList();
    },
    methods: {
        resetFunc(){
            this.inquireHotelName = ''
            this.inquireCultureName = ''
            this.hotelCultureList();
        },
        //酒店列表
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
                        const hotelAll = {
                            id: '',
                            hotelName: '全部'
                        };
                        this.hotelList.unshift(hotelAll);
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
        //酒店文化故事列表
        hotelCultureList(){
            const params = {
                hotelId: this.inquireHotelName,
                cultureStoryName: this.inquireCultureName,
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.hotelCultureList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.hotelCultureDataList = result.data.records;
                        this.pageTotal = response.data.data.total;
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
            this.hotelCultureList();
            this.$store.commit('setSearchList',{
                inquireHotelName: this.inquireHotelName,
                inquireCultureName:this.inquireCultureName
            })
        },
        current(){
            this.pageNum = this.currentPage;
            this.hotelCultureList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.hotelCultureList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.hotelCultureList();
        },
        //新增
        hotelCultureAdd(){
            this.$router.push({name:'LonganHotelCultureAdd'});
        },
        //修改
        hotelCultureModify(id){
            this.$router.push({name:'LonganHotelCultureModify', query: {id}});
        },
        //删除
        hotelCultureDelete(id){
            this.hcId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const id = this.hcId;
            const params = {};
            // console.log(id);
            this.$api.hotelCultureDelete(params,id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.dialogVisibleDelete = false;
                        this.$message.success('删除文化故事成功！');
                        this.hotelCultureList();
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
        //查看详情
        hotelCultureDetail(id){
            this.$router.push({name:'LonganHotelCultureDetail', query: {id}});
        },
    },
}
</script>

<style lang="less" scoped>
.servicetypelist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

