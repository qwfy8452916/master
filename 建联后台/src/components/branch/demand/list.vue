<template>
    <div>
        <h2 class="align-left">我发布的联采需求列表</h2>
        <el-form :inline="true" :model="formInline" size='medium' class="demo-form-inline align-left">
            <el-form-item label="项目名称">
                <el-input v-model="formInline.project_name" placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-cascader
                    :options="options"
                    @active-item-change="handleItemChange"
                    :props="props"
                    v-model="formInline.productId"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.status" placeholder="全部">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="待审核" value="PENDING"></el-option>
                    <el-option label="已驳回" value="REJECT"></el-option>
                    <el-option label="已完成" value="APPROVE"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="nomalBtn1" @click="getTabList(1)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="nomalBtn2" @click="release">发布需求</el-button>
            </el-form-item>
        </el-form>
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column v-for="(value,key) in tableJson"  :prop="key" :label="value" :key="value">
            </el-table-column>
            <el-table-column  label="操作" width="300">
                <template slot-scope="scope">
                    <div class="nomalBtn1 tabelBtn" v-if='scope.row.statusN == 1' @click="editItem(scope.row.id)" v-show="editBtn">编辑</div>
                    <div class="nomalBtn1 tabelBtn width60" v-if='scope.row.statusN == 1' @click="editItem1(scope.row)" v-show="rejectBtn">驳回原因</div>
                    <el-button type="primary" @click="editItem(scope.row.id)">编辑</el-button>
                    <el-button type="primary" @click="viewDetails(scope.row.id)">查看</el-button>
                </template>
            </el-table-column >
        </el-table>
        <div class="pageCont" v-if='total>10'>
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
                status: 'all',
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
                "productName":"产品名",
                'productSpec':"规格",
                'purchaseNum':"拟采数量",
                'publishedAt':"发布日期",
                'tenderDeadline':"截止日期",
                'status':"状态"
            },
        }
    },
    created(){
        this.getProductSelect(0).then(result=>{
            this.options = result.map(item=>{
                return {
                    label: item.categoryName,
                    id: item.id,
                    children:[]
                }
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
            let params = {
                pageNo:page,
                pageSize:10,
            }
            if(that.formInline.project_name){
                params.kw = that.formInline.project_name
            }
            that.$api.demand_list(params).then(response=>{
                let result = response.data;
                if(result.code===0){
                    that.tableData = result.data.records.map(item=>{
                        item.tenderDeadline = that.dateToString(item.tenderDeadline);
                        item.publishedAt = that.dateToString(item.publishedAt);
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
            this.$router.push({path:"/branch/demandDetail/"+id+'/'+0})
        },
        editItem:function(id){
            this.$router.push({path:"/branch/demandDetail/"+id+'/'+1})
        }
    }
}
</script>

<style>

</style>
