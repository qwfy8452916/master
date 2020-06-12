<template>
    <div class="servicetypelist">
        <p class="title">查看详情</p>
        <div v-if="authzData['F:BH_HOTEL_CULTURE_STORY_ADD']"><el-button class="addbutton" @click="hotelCultureDetailAdd">新增</el-button></div>
        <el-table :data="HotelCultureDetailDataList" border stripe style="width:100%;" >
            <el-table-column label="图片" width="120px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.storyDetailsPath" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="cultureStory" label="文本"></el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BH_HOTEL_CULTURE_STORY_EDIT']" type="text" size="small" @click="hotelCultureDetailModify(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BH_HOTEL_CULTURE_STORY_DELETE']" type="text" size="small" @click="hotelCultureDetailDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="returnlist"><el-button @click="returnHotelCulture">返回</el-button></div>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该故事条目？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'HotelCultureDetail',
    data(){
        return{
            authzData: '',
            hcId: '',
            hcdId: '',
            HotelCultureDetailDataList: [],
            dialogVisibleDelete: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hcId = this.$route.query.id;
        this.hotelCultureDetailList();
    },
    methods: {
        //酒店文化故事详情列表
        hotelCultureDetailList(){
            const params = {};
            const id = this.hcId;
            // console.log(params);
            this.$api.hotelCultureDetailList(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.HotelCultureDetailDataList = result.data;
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
        hotelCultureDetailAdd(){
            const cid  = this.hcId;
            this.$router.push({name:'HotelCultureDetailAdd', query: {cid}});
        },
        //修改
        hotelCultureDetailModify(id){
            const cid = this.hcId;
            this.$router.push({name:'HotelCultureDetailModify', query: {id, cid}});
        },
        //删除
        hotelCultureDetailDelete(id){
            this.hcdId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const id = this.hcId;
            const did = this.hcdId;
            const params = {};
            // console.log(id);
            this.$api.hotelCultureDetailDelete(params,id,did)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.dialogVisibleDelete = false;
                        this.$message.success('删除文化故事详情成功！');
                        this.hotelCultureDetailList();
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
        //返回
        returnHotelCulture(){
            this.$router.push({name:'HotelCultureList'});
        }
    },
}
</script>

<style lang="less" scoped>
.servicetypelist{
    .title{
        text-align: left;
        font-weight: bold;
    }
    .returnlist{
        margin-top: 20px;
        text-align: left;
    }
}
</style>

