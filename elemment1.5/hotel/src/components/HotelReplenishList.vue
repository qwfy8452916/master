<template>
    <div class="replenishlist">
         <el-form :inline="true" align=left>
            <el-form-item label="楼层">
                <el-input v-model="inquireFloor"></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="inquireCommodityName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="exportlist"><el-button type="primary" @click="outExe">导出</el-button></div>
        <el-table 
            :data="HotelReplenishDataList"
            :span-method="arraySpanMethod"
            border 
            style="width:100%;" >
            <el-table-column prop="roomFloor" label="楼层" width="80px" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="cabId" label="柜子编号" align=center></el-table-column>
            <el-table-column prop="productName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="replCount" label="补货数量" align=center></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'HotelReplenishList',
    data(){
        return{
            orgId: '',
            inquireFloor: '',
            inquireCommodityName: '',
            HotelReplenishDataList: [],
            commodityTotal: []
        }
    },
    mounted(){
        this.orgId = localStorage.getItem('orgId');
        this.getReplenishList();
    },
    methods: {
        //获取补货单列表
        getReplenishList(){
            const params = {
                orgId: this.orgId,
                roomFloor: this.inquireFloor,
                prodName: this.inquireCommodityName
            };
            // console.log(params);
            this.$api.getReplenishList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const commodifyList = result.data;
                        this.HotelReplenishDataList = commodifyList.emptyLatticeList.map(item => {
                            item.replCount = 1;
                            return item
                        });
                        this.commodityTotal = commodifyList.prodStatsAmtList;
                        if(this.commodityTotal != ''){
                            this.totalNum();
                        }
                    }else{
                        that.$message.error('获取补货单列表失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })

        },
        //总计
        totalNum(){
            const comm = this.commodityTotal;
            let commodityStr = '';
            for(let i = 0; i < comm.length; i++){
                commodityStr += comm[i].productName + comm[i].allsum + '\xa0\xa0\xa0';
            }
            // console.log(commodityStr);
            this.HotelReplenishDataList.push(
                {
                    roomFloor: '总计',
                    roomCode: commodityStr,
                    cabId: '',
                    productName: '',
                    replCount: ''
                }
            );
        },
        //合并列-总计
        arraySpanMethod({ row, column, rowIndex, columnIndex}){
            const rowNum = this.HotelReplenishDataList.length - 1;
            if(rowIndex === rowNum){
                if (columnIndex === 1) {
                    return [1, 4];
                } 
            }
        },
        //查询
        inquire(){
            this.getReplenishList();
        },
        //导出
        outExe(){
            this.$confirm('此操作将导出excel文件，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.excelData = this.HotelReplenishDataList;
                this.export2Excel();
            }).catch(() => {

            });
        },
        export2Excel(){
            let that = this;
            require.ensure([], () => {
                const { export_json_to_excel } = require('../vendor/Export2Excel.js');
                const tHeader = ['楼层','房间号','柜子编号','商品名称','补货数量'];     // 导出的表头名
                const filterVal = ['roomFloor','roomCode','cabId','productName','replCount'];     // 导出的表头字段名
                const list = that.excelData;
                const data = that.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '补货单列表');
            })
        },
        formatJson(filterVal, jsonData){
            return jsonData.map(v => filterVal.map(j => v[j]));
        }
    }
}
</script>

<style lang="less" scoped>
.replenishlist{
    .exportlist{
        float: left;
        margin-bottom: 10px;
    }
}
</style>

