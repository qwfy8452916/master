<template>
    <div class="servicetypelist">
        <el-form :inline="true" align=left>
            <el-form-item label="酒店名称">
                <el-input v-model="inquireHotelName"></el-input>
            </el-form-item>
            <el-form-item label="服务类型">
                <el-select v-model="inquireServiceType" placeholder="请选择">
                    <el-option
                        v-for="item in serviceList" 
                        :key="item.id" 
                        :label="item.serviceName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="servicetypeadd"><el-button type="primary" @click="serviceTypeAdd">添加酒店服务类型</el-button></div>
        <el-table :data="ServiceTypeDataList" border style="width:100%;" >
            <el-table-column prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="rmsvcName" label="客房服务类型" align=center></el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="DeleteServiceType(scope.row.id)">移除</el-button>
                    <el-button type="text" size="small" @click="detailServiceType(scope.row.id)">设置客房服务明细</el-button>
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
    name: 'LonganHotelServiceList',
    data(){
        return{
            orgId: '',
            hstId: '',
            inquireHotelName: '',
            inquireServiceType: '',
            serviceList: [],
            ServiceTypeDataList: [],

            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            dialogVisibleDelete: false
        }
    },
    mounted(){
        this.orgId = localStorage.getItem('orgId');
        this.serviceTypeSelect();
        this.hotelServiceList();
    },
    methods: {
        //服务类型-查询列表
        serviceTypeSelect(){
            const params = {
                oprOrgId: this.orgId
            };
            this.$api.serviceTypeList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.serviceList = result.data.map(item => {
                            return{
                                serviceName: item.name,
                                id: item.id
                            }
                        })
                        const allList = {
                            serviceName: '全部',
                            id: ''
                        };
                        this.serviceList.push(allList);
                    }else{
                        this.$message.error('服务类型获取失败！');
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
                encryOprOrgId: this.orgId,
                hotelName: this.inquireHotelName,
                rmsvcId: this.inquireServiceType,
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.hotelServiceList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.ServiceTypeDataList = result.data.records;
                        this.pageTotal = response.data.data.total;
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
        //查询
        inquire(){
            this.pageNum = 1;
            this.hotelServiceList();
        },
        current(){
            this.pageNum = this.currentPage;
            this.hotelServiceList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.hotelServiceList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.hotelServiceList();
        },
        //新增
        serviceTypeAdd(){
            this.$router.push({name:'LonganHotelServiceAdd'});
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
            this.$router.push({name:'LonganHotelServiceDetail', query: {id}});
        },
    },
}
</script>

<style lang="less" scoped>
.servicetypelist{
    .servicetypeadd{
        float: left;
        margin-bottom: 10px;
    }
    .pagination{
        margin-top: 20px;
    }
}
</style>

