<template>
    <div class="servicetypelist">
        <el-form :inline="true" align=left class="searchform">
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
            <el-form-item label="是否有效">
                <el-select v-model="inquireIsValid" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="ENABLED"></el-option>
                    <el-option label="否" value="DISABLED"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <!-- <div><el-button class="addbutton" v-if="isServiceAdd && authzlist['F:BH_RMSVC_SERVICELISTADD']" @click="serviceTypeAdd">添加酒店服务类型</el-button></div> -->
        <div><el-button class="addbutton" v-if="authzlist['F:BH_RMSVC_SERVICELISTADD']" @click="serviceTypeAdd">添加酒店服务类型</el-button></div>
        <el-table :data="ServiceTypeDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="sort" label="排序" min-width="80px"></el-table-column>
            <el-table-column prop="categoryName" label="服务类型" min-width="120px"></el-table-column>
            <el-table-column prop="isValid" label="是否有效" min-width="100px" align=center>
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isValid" @change="updateStatus(scope.row.id, scope.row.isValid)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="showName" label="显示名称" min-width="140px"></el-table-column>
            <el-table-column prop="styleName" label="明细样式" min-width="140px"></el-table-column>
            <el-table-column fixed="right" label="操作" width="240px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzlist['F:BH_RMSVC_SERVICELIST_EDIT']" type="text" size="small" @click="ModifyServiceType(scope.row.id)">修改</el-button>
                    <el-button v-if="authzlist['F:BH_RMSVC_SERVICELISTDELETE']" type="text" size="small" @click="DeleteServiceType(scope.row.id)">移除</el-button>
                    <!-- <el-button v-if="authzlist['F:BH_RMSVC_RMSVC_DETAIL']" type="text" size="small" @click="detailServiceType(scope.row.id)">设置客房服务明细</el-button> -->
                    <el-button v-if="authzlist['F:BH_RMSVC_SERVICELIST_CATALOG'] && (scope.row.style == 'LIST_ORDER' || scope.row.style == 'ICON_ORDER')" type="text" size="small" @click="ManageCatalogue(scope.row.id)">管理目录</el-button>
                    <el-button v-if="authzlist['F:BH_RMSVC_SERVICELIST_PART']" type="text" size="small" @click="ManageParticulars(scope.row.id, scope.row.style)">管理明细</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认移除该服务类型？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button v-if="authzlist['F:BH_RMSVC_SERVICELISTDELETE']" type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import HotelPagination from '@/components/HotelPagination'
import resetButton from './resetButton'
export default {
    name: 'HotelServiceList',
    components:{
        HotelPagination,
        resetButton
    },
    data(){
        return{
            authzlist: {}, //权限数据
            hotelId: '',
            hstId: '',
            inquireServiceType: '',
            serviceList: [],
            inquireIsValid: '',
            ServiceTypeDataList: [],
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
            // isServiceAdd: false,
            dialogVisibleDelete: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err});//获取权限数据
        // this.getHotelServiceType();
        this.hotelId = localStorage.getItem('hotelId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.serviceTypeSelect();
        this.hotelServiceList();
    },
    methods: {
        resetFunc(){
            this.inquireServiceType = ''
            this.inquireIsValid = ''
            this.hotelServiceList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.hotelServiceList();
        },
        //获取服务类型
        getHotelServiceType(){
            const params = {};
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
        //服务类型-查询列表
        serviceTypeSelect(){
            const params = {};
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
                        this.serviceList.unshift(allList);
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
        //酒店服务类型列表
        hotelServiceList(){
            const params = {
                hotelId: this.hotelId,
                categoryId: this.inquireServiceType,
                status: this.inquireIsValid,
                isPage: 1,
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            };
            // console.log(params);
            this.$api.hotelServiceList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.ServiceTypeDataList = result.data.records.map(item => {
                            if(item.status == 'ENABLED'){
                                item.isValid = true;
                            }else{
                                item.isValid = false;
                            }
                            return item;
                        });
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
            this.hotelServiceList();
            this.$store.commit('setSearchList',{
                inquireServiceType: this.inquireServiceType,
                inquireIsValid:this.inquireIsValid
            })
        },
        //新增
        serviceTypeAdd(){
            this.$router.push({name:'HotelServiceAdd'});
        },
        //修改状态 - 是否有效
        updateStatus(id,value){
            const params = {};
            if(value){
                this.$api.hotelServiceEnable(params, id)
                    .then(response => {
                        // console.log(response);
                        const result = response.data;
                        if(result.code == '0'){
                            this.$message.success('服务类型启用成功！');
                        }else{
                            this.$message.error(result.msg);
                        }
                        this.hotelServiceList();
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }else{
                this.$api.hotelServiceDisable(params, id)
                    .then(response => {
                        // console.log(response);
                        const result = response.data;
                        if(result.code == '0'){
                            this.$message.success('服务类型禁用成功！');
                        }else{
                            this.$message.error(result.msg);
                        }
                        this.hotelServiceList();
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }
        },
        //修改
        ModifyServiceType(id){
            this.$router.push({name:'HotelServiceModify', query: {id}});
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
                            this.$message.success('移除服务类型成功！');
                            // this.getHotelServiceType();
                            this.hotelServiceList();
                        }else{
                            this.$message.error('移除服务类型失败！');
                        }
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
        // //设置客房服务明细
        // detailServiceType(id){
        //     this.$router.push({name:'HotelServiceDetail', query: {id}});
        // },
        //管理目录
        ManageCatalogue(id){
            this.$router.push({name:'HotelServiceCatalogueList', query: {id}});
        },
        //管理明细
        ManageParticulars(id, style){
            if(style == 'PIC_ONLY'){   //纯图片
                this.$router.push({name:'HotelServicePicture', query: {id}});
            }else if(style == 'LIST_ORDER'){   //列表
                this.$router.push({name:'HotelServiceSelectList', query: {id}});
            }else if(style == 'ICON_ORDER'){   //图标
                this.$router.push({name:'HotelServiceIconList', query: {id}});
            }else if(style == 'BANNER_DETAIL_ORDER'){   //Banner
                this.$router.push({name:'HotelServiceBannerList', query: {id}});
            }else if(style == 'DYNAMIC_FORM'){   //动态表单
                this.$router.push({name:'HotelServiceFormList', query: {id}});
            }
            
        }
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
    .pagination{
        margin-top: 20px;
    }
}
</style>

