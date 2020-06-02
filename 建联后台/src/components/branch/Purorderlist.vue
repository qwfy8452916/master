<template>
    <div class="purorderlist">
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
                <el-button type="primary" class="nomalBtn1 btn-bg" @click="Getdata()">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border stripe style="width:100%;" >
            <el-table-column fixed prop="projectName" label="项目名称" align=center></el-table-column>
            <el-table-column prop="projectNo" label="项目编码" align=center></el-table-column>
            <el-table-column prop="productName" label="产品名" align=center></el-table-column>
            <el-table-column prop="productSpec" label="规格" align=center></el-table-column>
            <el-table-column prop="purchaseNum" label="数量" align=center></el-table-column>     
            <el-table-column prop="supplierEntName" label="供应商" align=center></el-table-column>
            <el-table-column prop="status" label="状态" align=center>
                <template slot-scope="scope" class="edit-text">
                    {{ scope.row.status===1 ? "履约中":(scope.row.status===2?"关闭中":"已关闭") }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="200px" align=center>
                <template slot-scope="scope">
                    <!-- <div v-if="scope.row.status===1">
                            <el-button type="text" size="small" @click="supplyList(scope.$index, tableData)">创建供货单</el-button>
                            <el-button type="text" size="small" @click="checkdetail(scope.$index, tableData)">查看详情</el-button>
                    </div> -->
                    <div>
                        <el-button type="text" v-if="dataAuth['F:CM_BORDER_BORDER_DETAIL']" size="small" @click="checkdetail(scope.$index, tableData)" class="check-text">查看详情</el-button>
                        <el-button type="text" v-if="!dataAuth['F:CM_BORDER_BORDER_DETAIL']" size="small" @click="checkdetail(scope.$index, tableData)">无</el-button>
                    </div>
                    
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
        <el-dialog title="创建供货单" :visible.sync="dialogVisible1" width="90%">
            <div class="align-left hangitem">
                <span>报价参考:</span><span>西本</span>
            </div>
            <div class="align-left hangitem">
                <span>参考地:</span><span>天津,天津市</span>
            </div>
            <div class="align-left hangitem">
                <span class="hangitemtitle">*计划收货时间：（须当前时间两日后）</span>
                <el-date-picker
                    v-model="receiveTime"
                    type="datetime"
                    value-format= 'yyyy-MM-dd HH:mm:ss'
                    placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <div class="align-left">
                <h5 class="align-left inline-block">参数详情</h5>
                <el-button class="marginleft15" type="primary" @click.prevent="AddLine">新增一栏</el-button>
            </div>
            <el-table :data="tableData1" border stripe style="width:1000px;margin-bottom:30px;">
                <el-table-column fixed prop="productName" label="产品名" align=center>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.productName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="productNum" label="数量" align=center>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.productNum"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="productUnit" label="单位" align=center>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.productUnit"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="productSpec" label="规格" align=center>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.productSpec"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="productDesc" label="产品说明" align=center>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.productDesc"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="productRemark" label="备注" align=center>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.productRemark"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align=center>
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableData1)"
                        type="text"
                        size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button class="marginleft15" @click="cancel">取消</el-button>
            <el-button class="marginleft15" type="primary" @click="ensureCreate()">确定</el-button>
            
        </el-dialog>
        <el-dialog title="查看详情" :visible.sync="dialogVisible1" width="90%">
            <div class="align-left hangitem">
                <span>报价参考:</span><span>西本</span>
            </div>
            <div class="align-left hangitem">
                <span>参考地:</span><span>天津,天津市</span>
            </div>
            <div class="align-left hangitem">
                <span class="hangitemtitle">*计划收货时间：（须当前时间两日后）</span>
                <el-date-picker
                    v-model="receiveTime"
                    type="datetime"
                    value-format= 'yyyy-MM-dd HH:mm:ss'
                    placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <div class="align-left">
                <h5 class="align-left inline-block">参数详情</h5>
                <el-button class="marginleft15" type="primary" @click.prevent="AddLine">新增一栏</el-button>
            </div>
            <el-table :data="tableData1" border stripe style="width:1000px;margin-bottom:30px;">
                <el-table-column fixed prop="productName" label="产品名" align=center>
                    <template slot-scope="scope">
                            <el-input v-model="scope.row.productName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="productNum" label="数量" align=center>
                    <template slot-scope="scope">
                            <el-input v-model="scope.row.productNum"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="productUnit" label="单位" align=center>
                    <template slot-scope="scope">
                            <el-input v-model="scope.row.productUnit"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="productSpec" label="规格" align=center>
                    <template slot-scope="scope">
                            <el-input v-model="scope.row.productSpec"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="productDesc" label="产品说明" align=center>
                    <template slot-scope="scope">
                            <el-input v-model="scope.row.productDesc"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="productRemark" label="备注" align=center>
                    <template slot-scope="scope">
                            <el-input v-model="scope.row.productRemark"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align=center>
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableData1)"
                        type="text"
                        size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button class="marginleft15" @click="cancel">取消</el-button>
            <el-button class="marginleft15" type="primary" @click="ensureCreate()">确定</el-button>
            
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogCreate" width="20%" top="30vh">
            <span>是否确认发布？</span>
            <span slot="footer">
                <el-button @click="dialogCreate=false">取消</el-button>
                <el-button type="primary" @click.native.prevent="createSupList()">确定</el-button>
            </span>
        </el-dialog>
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
            tableData1:[],
            dialogCreate:false,
            dialogVisible1:false,
            receiveTime:'',
            dataAuth:{
                
            },
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
        //取消
        cancel(){
            let that = this;
            that.tableData1 = [];
            that.dialogVisible1 = false;
        },
        //确认发布
        ensureCreate(){
            this.dialogCreate = true;
        },
        //确定创建供货单
        createSupList(){
            let that = this;
            const params = {    
                // orderId: that.checkid,
                orderId:'M1904656596555656',
                scheduledReceiveAt:that.receiveTime,
                delivDetailDTOList: that.tableData1
            };
            this.$api.createSupList(params).then(response => {
                    const result = response.data;   
                    if(result.code == '0'){
                        this.dialogCreate = false;
                        this.dialogVisible1 = false;
                        this.tableData1 = [];
                        this.$message.success('新增供货单成功！');

                        this.Getdata();
                    }else{
                        this.dialogCreate = false;
                        that.dialogVisible1 = false;0
                        this.$message.error('新增供货单失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //删除行
        deleteRow(index, rows){
            if(rows.length == 1){
                return 
            }
            rows.splice(index, 1);
        },
        //新增行
        AddLine(){
            let newLine = {
                productName: '',
                productSpec:'',
                productNum: '',
                productUnit:'',
                productRemark: '',
                productDesc: ''
            };
            this.tableData1.push(newLine);
        },


        //查看详情
        checkdetail:function(){
          let that=this;
          that.dialogVisible = true;
        },
        //创建供货单
        supplyList(){
          let that=this;
          that.dialogVisible1 = true;
        },



        //查看详情
        checkdetail:function(index,row){
           let id=row[index].id

           this.$router.push({path:"/branch/Purorderdetailbra/"+id})
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
            that.$api.companyOrder(params).then(response=>{
                let result = response.data;
                if(result.code===0){
                    that.tableData = result.data.records
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

<style lang="less">
.purorderlist{
  .el-dialog__title{color: #fff;}
  .el-dialog__header{background: #2793f4;text-align: left !important;
  }
  .el-dialog__headerbtn .el-dialog__close{color: #fff;}
  .el-collapse-item__header{text-align: left;}
  .inline-block{display:inline-block;}
  .marginleft15{margin-left: 15px;}
}


</style>


<style lang="less" scoped>
.purorderlist{
  .orderxq{font-size: 14px;
  li{margin-bottom: 10px;overflow:hidden;
    .hanginline{display: inline-block;float: left;}
    .inlineleft{margin-left: 100px;}
  }
  
  }
  .baojiatable,.baojiatable th,.baojiatable tr td {border:1px solid #797979 !important;
  border-collapse: collapse;}

          .colorful{
            height: 30px;
            line-height: 30px;
            padding: 0 1%;
            text-align: center;
            margin-top: -20px;
            .color{
                float: right;
                width: 80px;
                color: #333;
                font-size: 8px;
                .colorful1{
                    display: inline-block;
                    height: 10px;
                    width: 10px;
                    background-color: #AAA;
                    margin-right: 5%;
                    border-radius: 20%;
                }
                .colorful2{
                    display: inline-block;
                    height: 10px;
                    width: 10px;
                    background-color: #D82A2A;
                    margin-right: 5%;
                    border-radius: 20%;
                }
                .colorful3{
                    display: inline-block;
                    height: 10px;
                    width: 10px;
                    background-color: #1482E5;
                    margin-right: 5%;
                    border-radius: 20%;
                }
                .colorful4{
                    display: inline-block;
                    height: 10px;
                    width: 10px;
                    background-color: #78C04C;
                    margin-right: 5%;
                    border-radius: 20%;
                }
            }
        }
        .zn-steps{
            position: relative;
            list-style: none;
            display: flex;
            padding-left: 0;
            color: #999;
            width: 100%;
            margin-top: 0;
             li{display: inline-block;overflow: hidden;float: left;
             list-style: none;
              .parentdiv{display:inline-block;float: left;
               .step-icon-wrapper{width:50px;height:50px;border:1px solid #ccc;border-radius: 50%;display: inline-block;
                 .step-icon-div{padding-top: 5px;}
                  }
                  .step-title{padding-top: 5px;color: #333;}
                  .step-icon-content{
                      .step-icon-div{padding-top: 5px;}
                  }
                 }
                 .stepxianwrap{display: inline-block;width: 100px;float: left;
                 height: 76px;padding:0 5px;box-sizing: border-box;
                  .release{font-size: 12px;padding-top: 8px;
                    padding-bottom: 5px;
                    height: 12px;}
                  .xiantiao{height: 1px;width: 100%;background: #5ab225;}
                 }

                 .step-success{
                        color: #5AB225 !important;
                        border-color: #5AB225 !important;
                    }
             }
        }
        .inputshuru{height: 30px;line-height: 30px;outline: none;width: 270px;
        border:1px solid #d7d7d7;text-indent: 5px;}
        .hangitem{margin-bottom: 25px;}
        .hangitemtitle{display: inline-block;text-align: left;}
        .filese{color: #0000ff;margin-top: 5px;}

}

  
</style>
