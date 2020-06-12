<template>
    <div class="ExpressTemplate">
        <div v-if="authzData['F:BO_PROD_EXPRESSTPL_ADD']" style="display:flex;"><el-button class="addbutton" @click="addNewExpress">新增运费模板</el-button></div>
        <div class="module"
        v-for="(item,index) in itemList"
        :key="index">
            <div class="header">
                <div>{{item.modelName}}</div>
                <div>最后编辑时间：{{item.lastUpdatedAt}}</div>
                <div class="operate">
                    <span v-if="authzData['F:BO_PROD_EXPRESSTPL_EDIT']" @click="changeOne(item.id)">修改</span>
                    <span v-if="authzData['F:BO_PROD_EXPRESSTPL_DELETE']" @click="cancelOne(item.id)">删除</span>
                </div>
            </div>
            <div class="content" style="padding-top:20px;">
                <div class="items"
                v-for="(itemIn,index1) in tableTitle"
                :key="index1">
                    <div class="title">{{itemIn}}</div>
                </div>
            </div>
            <div class="content"
            style="padding-bottom:20px;"
            v-show="!item.isFree"
            v-for="(items,index2) in item.prodExpressSettingDTOS"
            :key="index2">
                <div class="items"
                v-for="(itemIn,index3) in items"
                :key="index3">
                    <div class="value">{{itemIn}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'LonganExpressTemplate',
    data(){
        return {
            authzData: '',
            tableTitle:['运送到','首件数（件）','首费（元）','续件数（件）','续费（元）'],
            itemList:[],
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.getData()
    },
    methods: {
        addNewExpress(){
            this.$router.push({name:'LonganExpressAdd'});
        },
        cancelOne(itemId){
            // console.log(itemId);
            let guiId=itemId;
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.deleteExpressFee(guiId).then(response => {
                    if(response.data.code == 0){
                        this.$message.success("操作成功");
                        this.getData();
                    }else{
                        that.$alert(response.data.data.msg,"警告",{
                            confirmButtonText: "确定"
                        })
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        changeOne(itemId){
            this.$router.push({name:'LonganExpressChange',query:{modifyid:itemId}})
        },
        getData(){
            this.$api.getExpressFee().then(response => {
                if(response.data.code == 0){
                    // console.log(response.data.data);
                    this.itemList = response.data.data.map(item => {
                        let prodExpressSettingDTOS = []
                        let modelName = item.modelName
                        if(item.prodExpressSettingDTOS[0]){
                            item.prodExpressSettingDTOS.forEach(keys=>{
                                let settingAddress = ''
                                keys.provinceNames.forEach(ele=>{
                                    settingAddress += ele+' '
                                })
                                prodExpressSettingDTOS.push({
                                    settingAddress: settingAddress,
                                    firstFeeCount: keys.firstFeeCount,
                                    firstFee: keys.firstFee,
                                    moreFeeCount: keys.moreFeeCount,
                                    moreFee: keys.moreFee
                                })
                            })
                        }
                        return {
                            id:item.id,
                            isFree: item.isFree,
                            modelName: modelName,
                            // freeAddress: !item.isFree?freeAddress?freeAddress+'包邮':'不包邮':'包邮',
                            lastUpdatedAt: item.lastUpdatedAt,
                            prodExpressSettingDTOS:prodExpressSettingDTOS
                        }
                    })
                }else{
                    this.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        }
    }
}
</script>

<style lang='less' scoped>
.ExpressTemplate{
    text-align: left;
    font-size:14px;
    .module{
        margin-top: 20px;
        width: 800px;
        .header{
            display:flex;
            justify-content: space-between;
            background-color: rgb(13,152,228);
            color: white;
            align-items:center;
            padding: 20px 20px;
            .operate{
                span{
                    cursor: pointer;
                }
            }
        }
        .content{
            display: flex;
            background: rgb(246,246,246);
            padding:0 20px;
            .items{
                width: 100px;
                .title{
                    font-weight: 600;
                    margin-bottom: 15px;
                }
                margin-right: 20px;
            }
            .items:nth-child(1){
                width: 200px;
            }
        }
    }
}
</style>