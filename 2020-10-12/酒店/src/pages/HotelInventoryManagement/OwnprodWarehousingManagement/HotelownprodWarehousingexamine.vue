<template>
    <div class="godownentryadd">
        <p class="title">审核自营商品入库单</p>
        <el-form :model="godownEntryDataDetail" :inline="true" align=left>
            <el-form-item label="入库单编号" prop="invInCode">
                <el-input :disabled="true" v-model="godownEntryDataDetail.invInCode"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" prop="supplName">
                <el-input :disabled="true" v-model="godownEntryDataDetail.supplName"></el-input>
            </el-form-item>
            <el-form-item label="收货日期" prop="receiveAt">
                <el-date-picker
                    v-model="godownEntryDataDetail.receiveAt"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :disabled="true"
                    placeholder="请选择日期">
                </el-date-picker>
            </el-form-item>

        <el-table :data="commodityDataList" border style="width:100%;" >
            <el-table-column fixed prop="productName" label="商品名称" width="80px" align=center></el-table-column>
            <el-table-column prop="proSize" label="规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center></el-table-column>
            <el-table-column prop="sqSign" label="商品编码" align=center></el-table-column>
            <el-table-column prop="productiveAt" label="生产日期" align=center></el-table-column>
            <el-table-column prop="expPeriod" label="保质期" align=center></el-table-column>
        </el-table>
        <el-form-item label="备注" class="wraptextarea">
              <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" v-model="Remarkval"></el-input>
        </el-form-item>
        </el-form>
        <br/>
        <div class="commodityadd">
            <el-button type="primary" @click="rejectniu">驳回</el-button>
            <el-button type="primary" @click="adoptniu">通过</el-button>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <el-input class="textarea" :rows="3" placeholder="请输入驳回原因" type="textarea" v-model="Remarkval"></el-input>
            <span slot="footer" class="foottk">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="dialogVisibleDelete2" width="30%">
            <el-input class="textarea" :rows="3" placeholder="备注" type="textarea" v-model="Remarkval"></el-input>
            <span slot="footer" class="foottk">
                <el-button @click="dialogVisibleDelete2=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail2">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'HotelownprodWarehousingexamine',
    data(){
        return{
            gEId: '',
            godownEntryDataDetail: {},
            commodityDataList: [],
            Remarkval:'',
            dialogVisibleDelete:false,
            dialogVisibleDelete2:false
        }
    },
    mounted(){
        this.gEId = this.$route.query.id;
        this.godownEntryDetail();
    },
    methods: {
        //入库单详情
        godownEntryDetail(){
            const params = {};
            const id = this.gEId;
            this.$api.godownEntryDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.godownEntryDataDetail = result.data;
                        this.commodityDataList = result.data.invInDetailExtraDTOList;
                    }else{
                        this.$message.error('入库单详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },


       //驳回
        rejectniu(){
            this.dialogVisibleDelete=true
        },

        //驳回确定
        EnsureDetail(){
            this.dialogVisibleDelete=false
        },
        //通过
        adoptniu(){
          this.dialogVisibleDelete2=true
        },
        //通过确定
        EnsureDetail2(){
            this.dialogVisibleDelete2=false
        },
    },
}
</script>

<style lang="less" scoped>
.godownentryadd{
     .wraptextarea{width:100%;margin-top:30px;
     .textarea{width:400px;}
    }
    .foottk{text-align: center;display: block;}
    .title{
        font-weight: bold;
        text-align: left;
    }
    .commodityadd{
        width: 100%;
        text-align: left;
        margin-bottom: 10px;
    }
}
</style>

