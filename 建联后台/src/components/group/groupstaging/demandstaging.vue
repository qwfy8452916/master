<template>
    <div>
        <h2 class="align-left">工作台-联采需求</h2>
        <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
            <el-table-column align=center v-for="(value,key) in tableJson"  :prop="key" :label="value" :key="value">
            </el-table-column>
            <el-table-column align=center label="操作" width="300">
                <template slot-scope="scope">
                    <el-button type="text" v-show="dataAuth['F:BJ_DEMAND_DEMAND_APPROVE']" v-if="scope.row.status == 2" @click="approve(scope.row.id)" class="edit-text">同意</el-button>
                    <el-button type="text" v-show="dataAuth['F:BJ_DEMAND_DEMAND_REJECT']" v-if="scope.row.status == 2" @click="reject(scope.row.id)" class="refue-text">驳回</el-button>
                    <el-button type="text" v-show="dataAuth['F:CM_DEMAND_DEMAND_DETAIL_INVITE']" v-if="scope.row.status == 4" @click="viewDetails(scope.row.id)" class="edit-text">邀约报价</el-button>
                    <el-button type="text" v-show="dataAuth['F:CM_DEMAND_DEMAND_DETAIL_INVITE']" v-if="scope.row.status == 5"  @click="viewDetails(scope.row.id)" class="edit-text">邀约报价</el-button>
                    <el-button type="text" v-if="dataAuth['F:CM_DEMAND_DEMAND_DETAIL']" @click="viewDetails(scope.row.id)" class="check-text">查看</el-button>
                </template>
            </el-table-column >
        </el-table>
        <div class="pageCont top" v-if='total>10'>
            <el-pagination background layout="prev, pager, next" :total="total" :currentPage="currentPage"  @current-change="current_change"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formInline:{
                project_name: '',
                status: '',
                productId:[]
            },
            props: {
                label:'label',
                value: 'id',
                children: 'children'
            },
            options:[],
            tableData:[],
            total:0,
            currentPage:0,
            tableJson:{
                "projectName":"项目名称",
                "projectNo":"项目编码",
                "productName":"分类",
                'productSpec':"规格",
                'purchaseNum':"需求数量",
                'publishedAt':"发布日期",
                'tenderDeadline':"截止日期",
                'statusText':"状态"
            },
            dataAuth:{},
            state:''
        }
    },
    created(){
        this.dataAuth = this.$store.state.authData;
        console.log(this.dataAuth)
        this.getProductSelect(0).then(result=>{
            this.options = result.map(item=>{
                return {
                    label: item.categoryName,
                    id: item.id,
                    children:[]
                }
            })
            this.options.splice(0,0,{
                label:'全部',
                id: "all"
            })
        });
        this.getTabList(1)
    },
    methods:{
        getProductSelect:function(id){
            let that = this;
            return that.$api.getProudctSelect(id)
                .then(response => {
                    let result = response.data;
                    if(result.code == 0){
                        return result.data
                    }else{
                        that.$alert(result.message , '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    that.$alert(error,'提示',{
                        confirmButtonText: '知道了',
                        callback: action => {}
                    })
                })
        },
        hasChildren(List,index,parentindex){
            if(parentindex != undefined){
                if(List[parentindex]['children'][index]['children'] && List[parentindex]['children'][index]['children'].length > 0){
                    return true
                }
            }else{
                if(List[index]['children'] && List[index]['children'].length > 0){
                    return true
                }
            }
            return false
        },
        handleItemChange:function(val){
            const level = val.length;
            let parentId = val[level - 1];
            if(level >= 2){ //显示两级
                return false
            }
            const index = this.options.findIndex(item => item.id == parentId);
            if(this.hasChildren(this.options,index)){ //防止重复请求
                return false
            }
            this.getProductSelect(parentId)
                .then(result => {
                    if(index != -1){
                        this.options[index]['children'] = result.map(item => {
                            let element = {
                                id: item.id,
                                label: item.categoryName
                            };
                            return element
                        });
                        console.log(this.options);
                    }else{
                        console.log(`找不到该parentId： ${parentId}`)
                    }
                })
        },
        onSubmit:function(){

        },
        current_change(currentPage){
            this.currentPage = currentPage;
            this.getTabList(currentPage);
        },
        getTabList:function(page){
            let that = this;
            let length=this.formInline.productId.length-1;
            let productsId = this.formInline.productId[0] === 'all'?[]:this.formInline.productId[length];
            let status = [2,4,5];
            this.state = status.join(',');
            let params = {
                pageNo:page,
                pageSize:10,
                categoryId:productsId,
                status:this.state
            }
            if(that.formInline.project_name){
                params.kw = that.formInline.project_name
            }
            if(that.formInline.status){
                params.status = that.formInline.status
            }
            that.$api.demand_list(params).then(response=>{
                let result = response.data;
                if(result.code===0){
                    that.tableData = result.data.records.filter(item=>{
                        item.tenderDeadline = that.dateToString(item.tenderDeadline);
                        item.publishedAt = that.dateToString(item.publishedAt);
                        item.statusText = that.getGroupStatusInfo(item.status);
                        return item;
                    });
                    that.total = result.data.total
                }else{
                    that.$alert(response.data.msg , '警告', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                }
            }).catch(function (error) {
                that.$alert(error , '警告', {
                    confirmButtonText: '确定',
                    callback: action => {
                        // that.canClick = !that.canClick;
                    }
                });
            });
        },
        //发布需求
        release:function(){
            this.$router.push({path:"/branch/demandCreat"})
        },
        //查看详情
        viewDetails:function(id){
            this.$router.push({path:"/group/demandDetail/"+id})
        },
        editItem:function(id){
            this.$router.push({path:"/branch/demandDetail/"+id+'/'+1})
        },
         //同意
        approve:function(id){
            //this.$router.push({path:"/branch/demandDetail/"+id+'/'+1})
            this.$confirm('是否确认通过审核?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.approveInfo(id);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消审核'
                });          
            });
        },
        approveInfo(demandId){
            let params = {
                checkResult:'1',
            }
            this.$api.demand_check(demandId, params)
                .then(res => {
                    const result = res.data;
                    if(result.code === 0) {
                        this.$message({
                            message: '审核成功',
                            type: 'success'
                        });
                        this.getTabList(this.currentPage);
                    }else {
                        this.$message({
                            message: result,
                            type: 'warning'
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$message({
                        message: err,
                        type: 'warning'
                    });
                })
        },
        reject:function(id){
            let that = this;
            this.$prompt('请输入驳回原因', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern:  /\S/,
                inputErrorMessage: '请输入驳回原因'
            }).then(({ value }) => {
                that.rejectInfo(id,value);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        rejectInfo:function(id,value){
            let params = {
                checkResult: '0',
                rejectReason: value
            }
            this.$api.demand_check(id, params)
                .then(res => {
                    const result = res.data;
                    if(result.code === 0) {
                        this.$message({
                            message: '驳回成功',
                            type: 'success'
                        });
                        this.getTabList(this.currentPage);
                    }else {
                        this.$message({
                            message: result,
                            type: 'warning'
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$message({
                        message: err,
                        type: 'warning'
                    });
                })
        }
    }
}
</script>

<style>

</style>
