<template>
    <div class="servicetypeadd">
        <p class="title">新增动态表单明细</p>
        <el-form v-model="ServiceCommonData" :model="ServiceCommonData" :rules="rules" ref="ServiceCommonData" label-width="100px" class="servicefrom">
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="ServiceCommonData.sort"></el-input>
            </el-form-item>
            <el-form-item label="控件类型" prop="widget">
                <el-select v-model="ServiceCommonData.widget" placeholder="请选择">
                    <el-option 
                        v-for="item in itemWidgetList" 
                        :key="item.id" 
                        :label="item.itemName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
                <el-input v-model.trim="ServiceCommonData.showName"></el-input>
            </el-form-item>
            <el-form-item label="字段名" prop="keyName">
                <el-input v-model.trim="ServiceCommonData.keyName"></el-input>
            </el-form-item>
            <el-form-item label="值类型" prop="valueType">
                <el-select v-model="ServiceCommonData.valueType" placeholder="请选择">
                    <el-option 
                        v-for="item in itemValueTypeList" 
                        :key="item.id" 
                        :label="item.itemName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="默认文本" prop="valuePlaceholder">
                <el-input placeholder="placeholder" v-model.trim="ServiceCommonData.valuePlaceholder"></el-input>
            </el-form-item>
            <el-form-item label="值配置类型" prop="valueScopeType">
                <el-select v-model="ServiceCommonData.valueScopeType" placeholder="请选择" >
                    <el-option 
                        v-for="item in itemValueScopeTypeList" 
                        :key="item.id" 
                        :label="item.itemName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="ServiceCommonData.valueScopeType == 'JSON'" prop="valueScopeJson">
                <span slot="label"><label class="required-icon">*</label> 配置JSON</span>
                <el-input type="textarea" :rows="5" maxlength="255" v-model="ServiceCommonData.valueScopeJson" placeholder="请输入配置JSON"></el-input>
            </el-form-item>
            <el-form-item v-if="ServiceCommonData.valueScopeType == 'MIN_ONLY' || ServiceCommonData.valueScopeType == 'MIN_MAX'" prop="valueScopeMin">
                <span slot="label"><label class="required-icon">*</label> 最小值</span>
                <el-input v-model.trim="ServiceCommonData.valueScopeMin"></el-input>
            </el-form-item>
            <el-form-item v-if="ServiceCommonData.valueScopeType == 'MAX_ONLY' || ServiceCommonData.valueScopeType == 'MIN_MAX'" prop="valueScopeMax">
                <span slot="label"><label class="required-icon">*</label> 最大值</span>
                <el-input v-model.trim="ServiceCommonData.valueScopeMax"></el-input>
            </el-form-item>
            <el-form-item label="是否必填" prop="isValueRequired">
                <el-radio-group v-model="ServiceCommonData.isValueRequired">
                    <el-radio :label="0">非必填</el-radio>
                    <el-radio :label="1">必填</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="最多选择数量" prop="maxNum">
                <el-input v-model.number="ServiceCommonData.maxNum"></el-input>
            </el-form-item>
            <el-form-item label="有效性校验" prop="validityCheckReg">
                <el-input placeholder="正则表达式" v-model.trim="ServiceCommonData.validityCheckReg"></el-input>
            </el-form-item>
            <el-form-item label="错误信息提示" prop="errorTip">
                <el-input v-model.trim="ServiceCommonData.errorTip"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('ServiceCommonData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelServiceFormAdd',
    data(){
        var priceReg = /^\d+(\.\d+)?$/
        var validatePrice = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            authzData: '',
            hsId: '',
            itemWidgetList: [],
            itemValueTypeList: [],
            itemValueScopeTypeList: [],
            ServiceCommonData: {
                sort: 0,
                valueScopeJson: '',
                valueScopeMin: '',
                valueScopeMax: '',
                maxNum: 1,
                validityCheckReg: '',
                errorTip: '',
            },
            isSubmit: false,
            headers: {},
            rules: {
                sort: [
                    { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                ],
                widget: [
                    { required: true, message: '请选择控件类型', trigger: 'change' }
                ],
                showName: [
                    {required: true, message: '请填写显示名称', trigger: 'blur'},
                    {min: 1, max: 10, message: '显示名称请保持在10个字符以内', trigger: ['blur','change']}
                ],
                keyName: [
                    {required: true, message: '请填写字段名', trigger: 'blur'},
                    {min: 1, max: 32, message: '字段名请保持在32个字符以内', trigger: ['blur','change']}
                ],
                valueType: [
                    { required: true, message: '请选择值类型', trigger: 'change' }
                ],
                valuePlaceholder: [
                    {min: 1, max: 10, message: '默认文本请保持在10个字符以内', trigger: ['blur','change']}
                ],
                valueScopeType: [
                     { required: true, message: '请选择值配置类型', trigger: 'change' }
                ],
                valueScopeMin: [
                    {min: 1, max: 10, message: '最小值请保持在10个字符以内', trigger: ['blur','change']}
                ],
                valueScopeMax: [
                    {min: 1, max: 10, message: '最大值请保持在10个字符以内', trigger: ['blur','change']}
                ],
                isValueRequired: [
                    { required: true, message: '请选择是否必填', trigger: 'change' }
                ],
                maxNum: [
                    {type: 'number', min: 1, max: 99, message: '最多选择数量请保持在1~99之间', trigger: ['blur','change']}
                ],
                validityCheckReg: [
                    {min: 1, max: 32, message: '有效性校验请保持在32个字符以内', trigger: ['blur','change']}
                ],
                errorTip: [
                    {min: 1, max: 32, message: '错误信息提示请保持在32个字符以内', trigger: ['blur','change']}
                ],
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hsId = this.$route.query.hsId;
        this.widgetDataItems();
        this.valuetypeDataItems();
        this.valuescopetypeDataItems();
    },
    methods: {
        //获取控件类型 - 字典表
        widgetDataItems(){
             const params = {
                key: 'RMSVC_HOTEL_CATEGORY_DYNAMIC_FORM_WIDGET',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.itemWidgetList = result.data.map(item => {
                            return{
                                id: item.dictValue,
                                itemName: item.dictName
                            }
                        })
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
        //获取值类型 - 字典表
        valuetypeDataItems(){
             const params = {
                key: 'RMSVC_HOTEL_CATEGORY_DYNAMIC_FORM_VALUE_TYPE',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.itemValueTypeList = result.data.map(item => {
                            return{
                                id: item.dictValue,
                                itemName: item.dictName
                            }
                        })
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
        //获取值配置类型 - 字典表
        valuescopetypeDataItems(){
             const params = {
                key: 'RMSVC_HOTEL_CATEGORY_DYNAMIC_FORM_VALUE_SCOPE_TYPE',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.itemValueScopeTypeList = result.data.map(item => {
                            return{
                                id: item.dictValue,
                                itemName: item.dictName
                            }
                        })
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
        //确定-新增明细
        submitForm(ServiceCommonData){
            if(this.ServiceCommonData.sort == ''){
                this.ServiceCommonData.sort = 0;
            }
            if(this.ServiceCommonData.maxNum == ''){
                this.ServiceCommonData.maxNum = 1;
            }
            const params = {
                sort: this.ServiceCommonData.sort,
                widget: this.ServiceCommonData.widget,
                showName: this.ServiceCommonData.showName,
                keyName: this.ServiceCommonData.keyName,
                valueType: this.ServiceCommonData.valueType,
                valuePlaceholder: this.ServiceCommonData.valuePlaceholder,
                valueScopeType: this.ServiceCommonData.valueScopeType,
                valueScopeJson: this.ServiceCommonData.valueScopeJson,
                valueScopeMin: this.ServiceCommonData.valueScopeMin,
                valueScopeMax: this.ServiceCommonData.valueScopeMax,
                isValueRequired: this.ServiceCommonData.isValueRequired,
                maxNum: this.ServiceCommonData.maxNum,
                validityCheckReg: this.ServiceCommonData.validityCheckReg,
                errorTip: this.ServiceCommonData.errorTip,
            };
            const hsId = this.hsId;
            this.$refs[ServiceCommonData].validate((valid) => {
                if(valid){
                    if(this.ServiceCommonData.valueScopeType == 'JSON'){
                        if(this.ServiceCommonData.valueScopeJson == ''){
                            this.$message.error("请输入配置JSON");
                            return false;
                        }
                    }else if(this.ServiceCommonData.valueScopeType == 'MIN_ONLY'){
                        if(this.ServiceCommonData.valueScopeMin == ''){
                            this.$message.error("请输入最小值");
                            return false;
                        }
                    }else if(this.ServiceCommonData.valueScopeType == 'MAX_ONLY'){
                        if(this.ServiceCommonData.valueScopeMax == ''){
                            this.$message.error("请输入最大值");
                            return false;
                        }
                    }else if(this.ServiceCommonData.valueScopeType == 'MIN_MAX'){
                        if(this.ServiceCommonData.valueScopeMin == '' || this.ServiceCommonData.valueScopeMax == ''){
                            this.$message.error("请输入最大值、最小值");
                            return false;
                        }
                    }
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.serviceFormAdd(params, hsId)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                this.$message.success('明细新增成功！');
                                const id = this.hsId;
                                this.$router.push({name: 'LonganHotelServiceFormList', query: {id}});
                            }else{
                                this.$message.error(result.msg);
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
                            this.isSubmit = false;
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            const id = this.hsId;
            this.$router.push({name: 'LonganHotelServiceFormList', query: {id}});
        },
    }
}
</script>

<style lang="less" scoped>
.servicetypeadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .servicefrom{
        width: 42%;
        .required-icon{
            color: #ff3030;
        }
    }
}
</style>
