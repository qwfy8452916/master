<template>
    <div class="servicetypelist">
        <div class="servicetypeadd"><el-button type="primary" v-if="isServiceAdd" @click="serviceTypeAdd">添加酒店服务类型</el-button></div>
        <el-table :data="ServiceTypeDataList" border style="width:100%;" >
            <el-table-column prop="rmsvcName" label="客房服务类型" align=center></el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="DeleteServiceType(scope.row.id)">移除</el-button>
                    <el-button type="text" size="small" @click="detailServiceType(scope.row.id)">设置客房服务明细</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认移除该服务类型？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'HotelServiceList',
    data(){
        return{
            orgId: '',
            hstId: '',
            ServiceTypeDataList: [],
            isServiceAdd: true,
            dialogVisibleDelete: false
        }
    },
    mounted(){
        this.orgId = localStorage.getItem('orgId');
        this.getHotelServiceType();
        this.hotelServiceList();
    },
    methods: {
        //获取服务类型
        getHotelServiceType(){
            const params = {
                entryHotelOrgId: this.orgId
            };
            this.$api.serviceTypeList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        if(result.data.length == 0){
                            this.isServiceAdd = false;
                        }else{
                            this.isServiceAdd = true;
                        }
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //酒店服务类型列表
        hotelServiceList(){
            const params = {
                encryHOrgId: this.orgId,
            };
            // console.log(params);
            this.$api.hotelServiceList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.ServiceTypeDataList = result.data.records;
                    }else{
                        this.$message.error('酒店服务列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //新增
        serviceTypeAdd(){
            this.$router.push({name:'HotelServiceAdd'});
        },
        //移除
        DeleteServiceType(id){
            this.hstId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const id = this.hstId;
            const params = {};
            // console.log(id);
            this.$api.HotelServiceTypeDelete(params,id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data == true){
                            this.$message.success('移除酒店服务类型成功！');
                            this.getHotelServiceType();
                            this.hotelServiceList();
                        }else{
                            this.$message.error('移除酒店服务类型失败！');
                        }
                        this.dialogVisibleDelete = false;
                    }else{
                        this.$message.error('移除酒店服务类型失败！');
                        this.dialogVisibleDelete = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //设置客房服务明细
        detailServiceType(id){
            this.$router.push({name:'HotelServiceDetail', query: {id}});
        },
    },
}
</script>

<style>
.el-dialog__header{
    text-align: left;
}
</style>


<style lang="less" scoped>
.servicetypelist{
    .servicetypeadd{
        float: left;
        margin-bottom: 10px;
    }
}
</style>

