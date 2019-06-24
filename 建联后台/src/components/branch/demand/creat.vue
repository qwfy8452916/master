<template>
    <div class="zn-demand">
        <el-form :model="demandForm" :rules="ruleForm" ref="demandForm" label-width="120px" class="align-left">
            <h2>项目信息</h2>
            <el-row :span='24'>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="项目名称" prop="projectName">
                        <el-input placeholder="请输入项目名称" v-model="demandForm.projectName" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="项目编码" prop="projectNo">
                        <el-input placeholder="请输入项目编号" v-model="demandForm.projectNo" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <h2>产品信息</h2>
            <el-row :span="24">
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="产品名称" prop="productId">
                        <el-cascader
                            :options="optionsProduct"
                            @active-item-change="handleItemChange"
                            :props="props"
                            v-model="demandForm.productId"
                            :disabled="isedit==0"
                        ></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="品牌" prop="productBrand ">
                        <el-input placeholder="请输入品牌" v-model="demandForm.productBrand" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="数量" prop="purchaseNum">
                        <el-input placeholder="请输入数量" v-model="demandForm.purchaseNum" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :span='24'>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="单位" prop="purchaseUnit">
                        <el-input placeholder="请输入单位名称" v-model="demandForm.purchaseUnit" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="产品规格" prop="productSpec">
                        <el-input placeholder="请输入产品规格" v-model="demandForm.productSpec" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <h2>联采规则</h2>
            <el-row :span='24'>
                <el-col :xs="14" :sm="14" :md="14" :lg="9" :xl="9">
                    <el-form-item label="供应商报价截止时间" prop="tenderDeadline" label-width="150px">
                        <el-date-picker
                            v-model="demandForm.tenderDeadline"
                            type="datetime"
                            value-format= 'yyyy-MM-dd HH:mm:ss'
                            placeholder="选择日期时间"
                            :picker-options="dateOptions"
                            :disabled="isedit==0"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发票要求">
                        <span>增值税发票（交易过程中涉及的开票都采用增值税发票）</span>
                    </el-form-item>
                    <el-form-item label="联采说明" prop="tenderDesc">
                        <el-input type="textarea" rows="6" resize='none' v-model="demandForm.tenderDesc" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <el-form-item label="上传附件" prop="fileList">
                        <el-upload
                            class="upload-demo"
                            :action="this.$api.upload_file_url"
                            name='fileContent'
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :on-success="handleSuccess"
                            multiple
                            :file-list="demandForm.fileList"
                            :disabled="isedit==0">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">您可以将招标文件或其他您认为需要让报价供应商知晓的内容以附件形式上传，上传支持jpg、jpeg、gif、png、docx、xls、xlsx、pdf格式。</div>
                        </el-upload>
                    </el-form-item>
                    <h2>收货信息</h2>
                    <el-form-item label="收货地址" prop="address">
                        <el-cascader
                            :options="location_list"
                            @active-item-change="handleLocationItemChange"
                            :props="props"
                            v-model="demandForm.address"
                            :disabled="isedit==0"></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="shippingAddr">
                        <el-input placeholder="请输入详细地址" v-model="demandForm.shippingAddr" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <el-form-item label="验收人姓名" prop="shippingInspector">
                        <el-input placeholder="请输入验收人姓名" v-model="demandForm.shippingInspector" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <el-form-item label="验收人联系电话" prop="shippingInspectorMobile">
                        <el-input placeholder="请输入验收人联系电话" v-model="demandForm.shippingInspectorMobile" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <el-form-item label="验收人身份证号" prop="shippingInspectorIdentityCard">
                        <el-input placeholder="请输入验收人身份证号" v-model="demandForm.shippingInspectorIdentityCard" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <h2>订单方式</h2>
                    <el-form-item label="报价参考方式" prop="tenderReferenceType">
                        <!-- <el-input placeholder="如我的钢铁网，西本网等" v-model="demandForm.quote_price"></el-input> -->
                        <el-select v-model="demandForm.tenderReferenceType" placeholder="请选择" :disabled="isedit==0">
                            <el-option value="XB" label="西本网"></el-option>
                            <el-option value="WDGT" label="我的钢铁"></el-option>
                            <el-option value="EXTRA" label="其他"></el-option>
                        </el-select>
                    </el-form-item>
                    <div v-if="demandForm.tenderReferenceType=='EXTRA'">
                    <el-form-item label="报价参考地" prop="tenderReferenceExtraAddr">
                        <el-input placeholder="如北京，上海等" v-model="demandForm.tenderReferenceExtraAddr" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <el-form-item label="报价参考说明" prop="tenderReferenceExtraDesc">
                        <el-input placeholder="请输入报价说明" v-model="demandForm.tenderReferenceExtraDesc" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    </div>
                    <div v-else>
                        <el-form-item label="报价参考地" prop="tenderAddress">
                        <el-cascader
                            :options="optionsAdd"
                            @active-item-change="handleAddrItemChange"
                            :props="props"
                            v-model="demandForm.tenderAddress"
                            :disabled="isedit==0"
                        ></el-cascader>
                    </el-form-item>
                    </div>
                    <el-form-item label="结算方式" prop="price_type">
                        <el-input type="textarea" rows="6" v-model="demandForm.price_type" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <h2>供应商信息</h2>
                    <el-form-item>
                        <el-button type="primary" @click="pushSupplierCardShow" :disabled="isedit==0">推荐供应商</el-button>
                    </el-form-item>
                    <el-form-item v-for="(item,index) in supplierFormSure" :key="index">
                        <div class="supplierListBox">
                            <div class="containBox">
                                <div class="supplierName">{{item.enterprise_name||'--'}}</div>
                                <div class="suppliercontact"><span>{{item.contact}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.phone}}</span></div>
                            </div>
                            <div class="editBox">
                                <i class="el-icon-delete" @click="isedit==0?'':deleteSupplier(supplierFormSure,index)" style="font-size:20px"></i>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox :checked="demandForm.isread">阅读采购协议</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="default">取消</el-button>
                        <el-button type="primary" @click="demandSure" v-show="isedit!=0">确定</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            
        </el-form>
        <!-- 图片弹框预览 -->
        <el-dialog title="查看图片" :visible.sync="imgVisible" width="60%" >
            <div><img :src='imgurl' style="margin: 0 auto;display: inherit;width: 100%"/></div>
        </el-dialog>
        <el-dialog  class='align-left' title="推荐供应商" :visible.sync="pushSupplierCard" width="60%" >
            <div class="a">
                <el-button @click="addSupplier" type="primary">添加</el-button>
            </div>
            <div v-for="(item,index) in supplierForm" :key="index">
                <div class="align-right">
                    <i class="el-icon-delete" @click="deleteSupplier(supplierForm,index)" style="font-size:20px"></i>
                </div>
                <el-form label-position='right' label-width="200px">
                    <el-form-item label="邀请供应商（企业名称）" >
                        <el-input v-model="item.enterprise_name"></el-input>
                    </el-form-item>
                    <el-form-item label="邀请供应商联系人" >
                        <el-input v-model="item.contact"></el-input>
                    </el-form-item>
                    <el-form-item label="邀请供应商联系方式" >
                        <el-input v-model="item.phone"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="pushSupplierCard = false">取 消</el-button>
                <el-button type="primary" @click="pushSupplierSure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:'',
            isedit:'',
            //时间默认当前时间
            dateOptions: {
                disabledDate(time) {
                  return time.getTime() <= Date.now();
                }
            },
            props: {
                label:'label',
                value:'id',
                children: 'children'
            },
            //产品名称
            optionsProduct:[],
            //地址
            location_list:[],
            optionsAdd:[],
            //上传查看大图
            imgVisible:false,
            imgurl:'',
            demandForm:{
                projectName:'',
                projectNo:'',
                productId:[],
                productBrand:'',
                purchaseNum:'',
                purchaseUnit:'',
                productSpec:'',
                tenderDeadline:'',
                tenderDesc:'',
                fileList:[],
                address:[],
                shippingAddr:'',
                shippingInspector:'',
                shippingInspectorMobile:'',
                shippingInspectorIdentityCard:'',
                tenderReferenceType:'',
                tenderAddress:[],
                price_type:'',
                tenderReferenceExtraAddr:'',
                tenderReferenceExtraDesc:'',
                isread:false,
            },
            ruleForm:{
                projectName:[
                    {required:true,message:'请输入项目名称',trigger:'blur'}
                ],
                projectNo:[
                    {required:true,message:'请输入项目编码',trigger:'blur'}
                ],
                productId:[
                    {required:true,message:'请输入产品名称',trigger:'blur'}
                ],
                productBrand:[
                    {required:true,message:'请输入品牌名称',trigger:'blur'}
                ],
                purchaseNum:[
                    {required:true,message:'请输入数量',trigger:'blur'}
                ],
                purchaseUnit:[
                    {required:true,message:'请输入单位',trigger:'blur'}
                ],
                productSpec:[
                    {required:true,message:'请输入规格',trigger:'blur'}
                ],
                tenderDeadline:[
                    {required:true,message:'请输入截止时间',trigger:'blur'}
                ],
                address:[
                    {required:true,message:'请输入地址',trigger:'blur'}
                ],
                shippingAddr:[
                    {required:true,message:'请输入详细地址',trigger:'blur'}
                ],
                shippingInspector:[
                    {required:true,message:'请输入验收人名称',trigger:'blur'}
                ],
                shippingInspectorMobile:[
                    {required:true,message:'请输入正确的验收人手机',trigger:'blur',min: 11, max: 11}
                ],
                tenderReferenceType:[
                    {required:true,message:'请输入参考价格',trigger:'blur'}
                ],
                tenderAddress:[
                    {required:true,message:'请输入参考地址',trigger:'blur'}
                ]
            },
            //供应商弹窗
            pushSupplierCard:false,
            supplierForm:[
                {
                    enterprise_name:'',
                    contact:'',
                    phone:''
                }
            ],
            supplierFormSure:[],
        }
    },
    created(){
        this.getRegionList('PROVINCE','','').then(result => {
            this.location_list = result.map(item => {
                return {
                    label: item.dictName,
                    id: item.dictValue,
                    key:item.dictKey,
                    children: []
                }
            });
            this.optionsAdd = result.map(item => {
                return {
                    label: item.dictName,
                    id: item.dictValue,
                    key:item.dictKey,
                    children: []
                }
            })
        });
        this.getProductSelect(0).then(result=>{
            this.optionsProduct = result.map(item=>{
                return {
                    label: item.categoryName,
                    id: item.id,
                    children:[]
                }
            })
        })
    },
    mounted(){
        if(this.$route.params){
            this.id = this.$route.params.id;
            this.isedit = this.$route.params.isedit;
            this.getdemandDetail()
        }
    },
    methods:{
        //详情
        getdemandDetail(){
            let that = this;
            that.$api.demand_detail(that.id).then(response=>{
                let result = response.data;
                if(result.code===0){
                    that.demandForm = result.data;
                    that.supplierForm = JSON.parse(result.data.invites);
                    that.supplierFormSure = JSON.parse(result.data.invites);
                    that.demandForm['fileList'] = JSON.parse(result.data.tenderAttachments).map(item=>{
                        return {
                            url:item.filePath
                        }
                    });
                    that.demandForm['tenderDeadline'] = that.dateToString(result.data.tenderDeadline);
                    that.demandForm['productId']=[result.data.productId];
                    that.demandForm['address'] = [result.data.shippingProvinceId,result.data.shippingCityId,result.data.shippingCountyId];
                    that.demandForm['tenderAddress'] = [result.data.tenderReferenceProvinceId,result.data.tenderReferenceCityId]
                    that.getProductSelect(result.data.productId)
                }

            })
        },
        //上传图片
        handleSuccess(response,file,fileList){
            const image = {
                name: file.name,
                url: file.url,
                path: response.data
            }
            this.demandForm.fileList.push(image);
        },
        handleRemove(file, fileList) {
            this.demandForm.fileList = fileList.map((item, index)=>{
               return {
                  name: item.name,
                  url: item.url,
                  path: item.path
               }
            })
        },
        handlePreview(file) {
            let that=this;
            if(file.raw.type.indexOf("image")>-1){
                that.imgVisible=true;
                that.imgurl=file.url;
            }
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //产品分类
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
        handleItemChange:function(val){
            const level = val.length;
            let parentId = val[level - 1];
            if(level >= 2){ //显示两级
                return false
            }
            const index = this.optionsProduct.findIndex(item => item.id == parentId);
            if(this.hasChildren(this.optionsProduct,index)){ //防止重复请求
                return false
            }
            this.getProductSelect(parentId)
                .then(result => {
                    if(index != -1){
                        this.optionsProduct[index]['children'] = result.map(item => {
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
        /**
         * 获取省市县的列表
         * @param  {entId,key,parentKey,parentValue}父级ID
         * @return {Array}          当前父级ID下的子列表
         */
        getRegionList(key,parentKey,parentValue){
            let that = this;
            let params = {
                entId:'0',
                key:key,
                parentKey:parentKey,
                parentValue:parentValue
            }
            return that.$api.regionList(params)
                .then(response => {
                    let result = response.data;
                    if(result.code === 0){
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
        /**
         * 判断location是否有子列表
         * @param  {Number}  index 索引值
         * @return {Boolean}
         */
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
        //处理父级选项变化
        handleLocationItemChange(val){ //val各父级选项组成的数组
            const level = val.length;
            let parentValue = val[level - 1];
            if(level > 2){ //显示省、市,区
                return false
            }
            let parentindex,index,key;
            if(level==1){
                index = this.location_list.findIndex(item => item.id == parentValue);
                key = this.location_list[index].key;
            }else if(level==2){
                parentindex = this.location_list.findIndex(item => item.id == val[0]);
                index = this.location_list[parentindex].children.findIndex(item=> item.id == val[1]);
                key = this.location_list[parentindex].children[index].key;
            }
            let childrenKey = "PROVINCE";
            switch (key) { 
                case "PROVINCE":
                    childrenKey = "CITY";
                    break;
                case "CITY":
                    childrenKey = "AREA";
                    break;
                default:
                    childrenKey = "PROVINCE"
            }
            if(this.hasChildren(this.location_list,index,parentindex)){ //防止重复请求
                return false
            }
            this.getRegionList(childrenKey,key,parentValue)
                .then(result => {
                    if(index != -1&&level==1){
                        this.location_list[index]['children'] = result.map(item => {
                            let element = {
                                label: item.dictName,
                                id: item.dictValue,
                                key:item.dictKey,
                                children: []
                            };
                            return element
                        });
                    }else if(index != -1&&level==2){
                        this.location_list[parentindex]['children'][index]['children'] = result.map(item => {
                            let element = {
                                label: item.dictName,
                                id: item.dictValue,
                                key:item.dictKey
                            };
                            return element
                        });
                    }else{
                        console.log(`找不到该parentValue： ${parentValue}`)
                    }
                })
        },
        //报价参考地
        handleAddrItemChange:function(val){
            const level = val.length;
            let parentId = val[level - 1];
            if(level >= 2){ //显示省、市
                return false
            }
            const index = this.optionsAdd.findIndex(item => item.id == parentId);
            const key = this.location_list[index].key;
            let childrenKey = "PROVINCE";
            switch (key) { 
                case "PROVINCE":
                    childrenKey = "CITY";
                    break;
                case "CITY":
                    childrenKey = "AREA";
                    break;
                default:
                    childrenKey = "PROVINCE"
            }
            if(this.hasChildren(this.optionsAdd,index)){ //防止重复请求
                return false
            }
            this.getRegionList(childrenKey,key,parentId)
                .then(result => {
                    if(index != -1){
                        this.optionsAdd[index]['children'] = result.map(item => {
                            let element = {
                                label: item.dictName,
                                id: item.dictValue,
                                key:item.dictKey
                            };
                            return element
                        });
                    }else{
                        console.log(`找不到该parentId： ${parentId}`)
                    }
                })
        },
        //供应商弹窗
        pushSupplierCardShow(){
            this.pushSupplierCard = true;
            this.supplierForm = [
                {
                    enterprise_name:'',
                    contact:'',
                    phone:''
                }
            ]
        },
        //新增供应商
        addSupplier:function(){
            this.supplierForm.push({
                enterprise_name:'',
                contact:'',
                phone:''
            })
        },
        //删除供应商
        deleteSupplier:function(form,index){
            if(form.length == 1){
                this.$message({
                    message: '至少保留一行数据!',
                    type: 'warning'
                });
                return false
            }
            form.splice(index,1)
        },
        //确定供应商
        pushSupplierSure:function(){
            for(let i=0;i<this.supplierForm.length;i++){
                if(Object.keys(this.supplierForm[i]).some(key => !this.supplierForm[i][key])){ //参数非空校验
                    this.$message({
                        message: '请完善信息',
                        type: 'warning'
                    })
                    return false
                }
            }
            this.supplierFormSure.push(...this.supplierForm);
            this.pushSupplierCard = false;
        },
        //确定需求单
        demandSure:function(){
            let that = this;
            let tenderAttachments = this.demandForm['fileList'].map(item=>{
                return item.url
            });
            this.$refs['demandForm'].validate((valid)=>{
                if(valid){
                    let params = {
                        inviteCount:that.supplierFormSure.length,
                        invites:JSON.stringify(that.supplierFormSure),
                        isPublish:1,
                        productBrand:this.demandForm['productBrand'],
                        productId:this.demandForm['productId'][1],
                        productSpec:this.demandForm['productSpec'],
                        projectName:this.demandForm['projectName'],
                        projectNo:this.demandForm['projectNo'],
                        purchaseNum:this.demandForm['purchaseNum'],
                        purchaseUnit:this.demandForm['purchaseUnit'],
                        shippingAddr:this.demandForm['shippingAddr'],
                        shippingCityId:this.demandForm['address'][1],
                        shippingCountyId:this.demandForm['address'][2],
                        shippingInspector:this.demandForm['shippingInspector'],
                        shippingInspectorIdentityCard:this.demandForm['shippingInspectorIdentityCard'],
                        shippingInspectorMobile:this.demandForm['shippingInspectorMobile'],
                        shippingProvinceId:this.demandForm['address'][0],
                        tenderAttachments:JSON.stringify(tenderAttachments),
                        tenderDeadline:this.demandForm['tenderDeadline'],
                        tenderDesc:this.demandForm['tenderDesc'],
                        tenderReferenceCityId:this.demandForm['tenderAddress'][1],
                        price_type:this.demandForm['price_type'],
                        tenderReferenceExtraAddr:this.demandForm['tenderReferenceExtraAddr'],
                        tenderReferenceExtraDesc:this.demandForm['tenderReferenceExtraDesc'],
                        tenderReferenceProvinceId:this.demandForm['tenderAddress'][0],
                        tenderReferenceType:this.demandForm['tenderReferenceType']
                    }
                    if(that.id){
                        that.$api.demand_edit(that.id,params).then(response=>{
                            that.$message({
                                message: '编辑成功',
                                type: 'success'
                            })
                            that.$router.push({path:'demandList'})
                        })
                    }else{
                        that.$api.demand_add(params).then(response=>{
                            that.$message({
                                message: '新增成功',
                                type: 'success'
                            })
                            that.$router.push({path:'demandList'})
                        })
                    }
                    
                }else{
                    this.$message({
                        message: '请完善信息',
                        type: 'warning'
                    })
                }
            })
            
        }
        
    }

}
</script>

<style lang='less'>
    .zn-demand{
        h2{
            padding-left: 20px;
        }
        .supplierListBox{
            width: 100%;
            display: flex;
            align-items: center;
            background-color: #eee;
            padding: 10px;
            .containBox{
                flex-grow: 1;
                line-height: 30px;
            }
        }
    }
</style>
