<template>
    <div class="LonganFinancialCost">
        <el-table :data="LonganFinancialCostDataList" border stripe style="width:100%;" >
            <el-table-column prop="prodName" label="商品名称"></el-table-column>
            <el-table-column prop="proTaxRate" label="商品税率%" align=center></el-table-column>
            <el-table-column prop="lossAmount" label="商品损耗金额(元)" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="200px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="changefun(scope.row.prodId)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog class="changebox" title="修改酒店财务成本" :visible.sync="dialogFormVisible" center>
            <el-form :model="form" :rules="rules" ref="form" class="chengebox">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="form.prodName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品税率" :label-width="formLabelWidth" prop="proTaxRate">
                    <el-input v-model.trim="form.proTaxRate"></el-input>%
                </el-form-item>
                <el-form-item label="商品损耗金额" :label-width="formLabelWidth" prop="proLossAmount">
                    <el-input v-model.trim="form.proLossAmount"></el-input>元
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changesub('form')">确 定</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>


<script>
export default {
    name: 'LonganFinancialCost',
    data(){
        var rateReg = /^\d+(\.\d+)?$/
        var validateRate = (rule,value,callback) => {
            if(!rateReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            LonganFinancialCostDataList: [],
            form: {
               prodName: '',
               proTaxRate: '',
               proLossAmount: ''
            },
            dialogFormVisible: false,
            oprId: '',
            formLabelWidth: '120px',
            changeid: '1',
            rules: {
                proTaxRate:[
                    {required: true, validator: validateRate, trigger: ['blur','change']}
                ],
                proLossAmount:[
                    {required: true, validator: validateRate, trigger: ['blur','change']}
                ],
            }
        }
    },
    mounted(){
        // this.oprId=localStorage.getItem('orgId');
        this.oprId = this.$route.params.orgId;
        this.LonganFinancialCost();
    },
    methods: {
        //运营商商品成本列表
        LonganFinancialCost(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                oprOrgId: this.oprId
            };
            this.$api.LonganFinancialCost({params}).then(response=>{
                if(response.data.code==0){
                    this.LonganFinancialCostDataList = response.data.data;
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },
        //修改
        changefun(id){
            this.dialogFormVisible = true;
            this.changeid = id;
            this.$api.LonganFinancialCostDetails(this.changeid).then(response=>{
                if(response.data.code==0){
                    this.form.prodName = response.data.data.productName;
                    this.form.proTaxRate = response.data.data.proTaxRate;
                    this.form.proLossAmount = response.data.data.proLossAmount;
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },
        changesub(formdata){
            const params = {
                proTaxRate: parseFloat(this.form.proTaxRate).toFixed(2),
                proLossAmount: parseFloat(this.form.proLossAmount).toFixed(2)
            }
            this.$refs[formdata].validate((valid) => {
                if (valid) {
                    this.$api.LonganFinancialCostChange(this.changeid,params).then(response=>{
                        if(response.data.code==0){
                            this.dialogFormVisible = false;
                            this.LonganFinancialCost();
                        }else{
                        this.$alert(response.data.msg,"警告",{
                            confirmButtonText: "确定"
                        })
                        }
                    }).catch(err=>{
                        this.$alert(err,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
</style>

