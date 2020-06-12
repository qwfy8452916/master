<template>
    <div class="servicetypelist">
        <div v-if="authzData['F:BH_HOTEL_CULTURE_ADD']"><el-button class="addbutton" @click="hotelCultureAdd">新增</el-button></div>
        <el-table :data="hotelCultureDataList" border stripe style="width:100%;" >
            <el-table-column prop="cultureStoryName" label="酒店文化故事"></el-table-column>
            <el-table-column label="图片" width="160px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.storyPath" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BH_HOTEL_CULTURE_EDIT']" type="text" size="small" @click="hotelCultureModify(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BH_HOTEL_CULTURE_DELETE']" type="text" size="small" @click="hotelCultureDelete(scope.row.id)">删除</el-button>
                    <el-button v-if="authzData['F:BH_HOTEL_CULTURE_VIEW']" type="text" size="small" @click="hotelCultureDetail(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
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
export default {
    name: 'HotelCultureList',
    data(){
        return{
            authzData: '',
            hotelId: '',
            hcId: '',
            hotelCultureDataList: [],
            dialogVisibleDelete: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hotelId = localStorage.getItem('hotelId');
        this.hotelCultureList();
    },
    methods: {
        //酒店文化故事列表
        hotelCultureList(){
            const params = {
                hotelId: this.hotelId,
            };
            // console.log(params);
            this.$api.hotelCultureList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.hotelCultureDataList = result.data;
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
        //新增
        hotelCultureAdd(){
            this.$router.push({name:'HotelCultureAdd'});
        },
        //修改
        hotelCultureModify(id){
            this.$router.push({name:'HotelCultureModify', query: {id}});
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
            this.$router.push({name:'HotelCultureDetail', query: {id}});
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

