<template>
    <div>
        <h2 class="align-left">联采订单列表</h2>
        <el-form :inline="true" :model="formInline" size='medium' class="demo-form-inline align-left">
            <el-form-item label="项目名称">
                <el-input v-model="formInline.project_name" placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item label="产品名">
                <el-cascader
                    :options="options"
                    @active-item-change="handleItemChange"
                    :props="props"
                    v-model="formInline.productId"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.status" placeholder="全部">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="履约中" value="1"></el-option>
                    <el-option label="关闭中" value="2"></el-option>
                    <el-option label="已关闭" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button v-if="dataAuth['F:CM_ORDER_ORDER_DETAIL']" type="primary" class="nomalBtn1 btn-bg" @click="Getdata()">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border stripe style="width:100%;" >
            <el-table-column fixed prop="projectName" label="项目名称" align=center></el-table-column>
            <el-table-column prop="projectNo" label="项目编码" align=center></el-table-column>
            <el-table-column prop="productName" label="产品名" align=center></el-table-column>
            <el-table-column prop="purchaseNum" label="数量" align=center></el-table-column>
            <el-table-column prop="purchaseUnit" label="单位" align=center></el-table-column>
            <el-table-column prop="productSpec" label="规格" align=center></el-table-column>
            <el-table-column prop="supplierEntName" label="供应商" align=center></el-table-column>
            <el-table-column prop="status" label="状态" align=center>
                <template slot-scope="scope">
                    {{ scope.row.status===1 ? "履约中":(scope.row.status===2?"关闭中":"已关闭") }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="200px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="checkdetail(scope.$index, tableData)" class="check-text">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination top">
            <el-pagination
                background
                layout="prev, pager, next"
                :pager-count = "11"
                :page-size="pageSize"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name:"Purorderlist",
    data(){
        return{
            pageSize:10,
            pageTotal: 1,  //默认总条数
            pageNum: 1,   //实际当前页码
            currentPage: 1, //默认当前页码
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
            dataAuth:{
                
            }
        }
    },
    created(){
        this.dataAuth = this.$store.state.authData;

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
        this.Getdata()
    },
    methods:{

        //查看详情
        checkdetail:function(index,row){
           let id=row[index].id
           this.$router.push({path:"/group/Purorderdetail/"+id})
        },

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
            this.formInline.productId=val;
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
  
        Getdata:function(){
            let that = this;
            let length=this.formInline.productId.length-1;
            let productsId = this.formInline.productId[0] === 'all'?[]:this.formInline.productId[length];
            let params = {
                pageNo:this.pageNum,
                pageSize:this.pageSize,
                projectName:this.formInline.project_name,
                productId:productsId,
                status:this.formInline.status,
            }
            that.$api.purorderlist(params).then(response=>{
                let result = response.data;
                if(result.code===0){
                    that.tableData = result.data.records
                    that.tableData = that.tableData.map(item=>{
                        if(!item.supplierEntName){
                            item.supplierEntName = '-'
                        }
                        return item;
                    })
                    that.pageTotal = result.data.total
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


        current(){
            this.pageNum = this.currentPage;
            this.Getdata();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.Getdata();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.Getdata();
        },
    }
}
</script>

<style>

</style>
