<template>
    <div class="servicetypelist">
        <div v-if="authzData['F:BH_RMSVC_SERVICELIST_CATALOG_ADD']"><el-button class="addbutton" @click="serviceCatalogueAdd">新增服务类型目录</el-button></div>
        <el-table :data="ServiceCatalogueDataList" border style="width:100%;" >
            <el-table-column fixed prop="sort" label="排序"></el-table-column>
            <el-table-column prop="iconUrl" label="图标" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.iconUrl" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="目录名称"></el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BH_RMSVC_SERVICELIST_CATALOG_EDIT']" type="text" size="small" @click="serviceCatalogueModify(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BH_RMSVC_SERVICELIST_CATALOG_DELETE']" type="text" size="small" @click="serviceCatalogueDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="returnbtn">
            <el-button @click="returnFun">返回</el-button>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该服务类型目录？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'HotelServiceCatalogueList',
    data(){
        return{
            authzData: '',
            hsId: '',
            ServiceCatalogueDataList: [],
            scId: '',
            dialogVisibleDelete: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hsId = this.$route.query.id;
        this.serviceCatalogueList();
    },
    methods: {
        //服务类型目录列表
        serviceCatalogueList(){
            const params = {};
            // console.log(params);
            const hsId = this.hsId;
            this.$api.serviceCatalogueList(params, hsId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.ServiceCatalogueDataList = result.data;
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
        serviceCatalogueAdd(){
            const hsId = this.hsId;
            this.$router.push({name:'HotelServiceCatalogueAdd', query: {hsId}});
        },
        //修改
        serviceCatalogueModify(id){
            const hsId = this.hsId;
            this.$router.push({name:'HotelServiceCatalogueModify', query: {hsId, id}});
        },
        //删除
        serviceCatalogueDelete(id){
            this.scId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const hsId = this.hsId;
            const scId = this.scId;
            const params = {};
            this.$api.serviceCatalogueDelete(params, hsId, scId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('删除服务类型目录成功！');
                        this.dialogVisibleDelete = false;
                        this.serviceCatalogueList();
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
        //返回
        returnFun(){
            this.$router.push({name:'HotelServiceList'});
        },
    },
}
</script>

<style lang="less" scoped>
.servicetypelist{
    text-align: left;
    .returnbtn{
        margin-top: 20px;
    }
}
</style>
