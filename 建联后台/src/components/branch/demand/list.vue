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
                    :show-all-levels="false"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.status" placeholder="全部">
                    <el-option label="全部" value="2,3,4,5,6,7,8,9"></el-option>
                    <el-option label="已完成" value="9"></el-option>
                    <el-option label="报价驳回" value="8"></el-option>
                    <el-option label="待确认报价" value="7"></el-option>
                    <el-option label="已通过" value="4,5,6"></el-option>
                    <el-option label="需求驳回" value="3"></el-option>
                    <el-option label="待审核" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="nomalBtn1 btn-bg" @click="getTabList(1)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" class="nomalBtn2 btn-bg" v-if="dataAuth['F:CM_BDEMAND_BDEMAND_CREATE']" @click="release">发布需求</el-button>
            </el-form-item>
        </el-form>
        <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
            <el-table-column align=center v-for="(value,key) in tableJson"  :prop="key" :label="value" :key="value">
            </el-table-column>
            <el-table-column align=center label="操作" width="300">
                <template slot-scope="scope">
                    <!-- <div class="nomalBtn1 tabelBtn" v-if='scope.row.statusN == 1' @click="editItem(scope.row.id)" v-show="editBtn">编辑</div>
                    <div class="nomalBtn1 tabelBtn width60" v-if='scope.row.statusN == 1' @click="editItem1(scope.row)" v-show="rejectBtn">驳回原因</div> -->
                    <el-button type="text" v-show="dataAuth['F:CM_BDEMAND_BDEMAND_RECREATE']" v-if="scope.row.status == 3" @click="editItem(scope.row.id)" class="edit-text">编辑</el-button>
                    <el-button type="text" v-if="dataAuth['F:CM_BDEMAND_BDEMAND_DETAIL']" @click="viewDetails(scope.row.id)" class="check-text">查看</el-button>
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
            dataAuth:{}
        }
    },
    created(){
        this.dataAuth = this.$store.state.authData
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
            console.log(this.options)
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
            let params = {
                pageNo:page,
                pageSize:10,
                categoryId:productsId,
            }
            if(that.formInline.project_name){
                params.kw = that.formInline.project_name
            }
            if(that.formInline.status){
                params.status = that.formInline.status
            }
            console.log(this.formInline.productId);
            that.$api.companyDemand(params).then(response=>{
                let result = response.data;
                if(result.code===0){
                    that.tableData = result.data.records.map(item=>{
                        item.tenderDeadline = that.dateToString(item.tenderDeadline);
                        item.publishedAt = that.dateToString(item.publishedAt);
                        item.statusText = that.getStatusInfo(item.status);
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
