<template>
    <div class="commoditydetail">
        <p class="title">商品详情</p>
        <el-form v-model="CommodityDetailData" :model="CommodityDetailData" label-width="140px" class="commodityform">
            <el-form-item label="商品名称" prop="prodName">
                <el-input :disabled="true" v-model="CommodityDetailData.prodName"></el-input>
            </el-form-item>
            <el-form-item label="显示名称" prop="prodShowName">
                <el-input :disabled="true" v-model="CommodityDetailData.prodShowName"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" prop="prodCode">
                <el-input :disabled="true" v-model="CommodityDetailData.prodCode"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="prodKindName">
                <el-input :disabled="true" v-model="CommodityDetailData.prodKindName"></el-input>
            </el-form-item>
            <!-- <el-form-item v-if="CommodityDetailData.prodOwnerOrgKind != 2">
                <span v-if="CommodityDetailData.prodOwnerOrgKind == '3'" slot="label">酒店名称</span>
                <span v-else slot="label">入驻商名称</span>
                <el-input v-if="CommodityDetailData.prodOwnerOrgKind == '3'" :disabled="true" v-model="CommodityDetailData.hotelName"></el-input>
                <el-input v-else :disabled="true" v-model="CommodityDetailData.merName"></el-input>
            </el-form-item> -->
            <el-form-item label="供应商" prop="prodSupplName">
            <!-- <el-form-item label="商品所有人组织名称" prop="prodSupplName"> -->
                <el-input :disabled="true" v-model="CommodityDetailData.prodSupplName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="最高采购价" prop="prodPurMaxPrice">
                <el-input :disabled="true" v-model="CommodityDetailData.prodPurMaxPrice"></el-input> 元
            </el-form-item> -->
            <el-form-item label="商品形式" prop="prodType">
                <el-input :disabled="true" v-model="CommodityDetailData.prodTypeName"></el-input>
            </el-form-item>
            <el-form-item v-if="CommodityDetailData.prodType==2" label="卡券选择" prop="prodWarrantyPeriod">
                <el-input :disabled="true" v-model="CommodityDetailData.prodWarrantyPeriod"></el-input>
            </el-form-item>
            <el-form-item label="保质期" prop="prodWarrantyPeriod">
                <el-input :disabled="true" v-model="CommodityDetailData.prodWarrantyPeriod"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="prodUnitMeasure">
                <el-input :disabled="true" v-model="CommodityDetailData.prodUnitMeasure"></el-input>
            </el-form-item>
            <el-form-item label="供货价" prop="prodSupplyPrice">
                <el-input :disabled="true" v-model="CommodityDetailData.prodSupplyPrice"></el-input> 元
            </el-form-item>
            <el-form-item label="零售价" prop="prodRetailPrice">
                <el-input :disabled="true" v-model="CommodityDetailData.prodRetailPrice"></el-input> 元
            </el-form-item>
            <el-form-item label="划线价" prop="">
                <el-input :disabled="true" v-model="CommodityDetailData.prodAdvisePrice"></el-input> 元
            </el-form-item>
            <!-- <el-form-item label="建议零售价" prop="prodAdvisePrice">
                <el-input :disabled="true" v-model="CommodityDetailData.prodAdvisePrice"></el-input> 元
            </el-form-item> -->
            <el-form-item label="统计分类" prop="statisticsCategoryId">
                <el-input v-if="CommodityDetailData.statisticsCategoryId == 0" :disabled="true" value="无"></el-input>
                <el-input v-else :disabled="true" v-model="categoryName"></el-input>
            </el-form-item>
            <el-form-item label="商品列表图" prop="">
                <el-upload
                    :disabled="true"
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    name="fileContent"
                    :file-list="imgList">
                    <el-button :disabled="true" size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品详情banner" prop="">
                <el-upload
                    :disabled="true"
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    name="fileContent"
                    :file-list="bannerList">
                    <el-button :disabled="true" size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                </el-upload>
            </el-form-item>
            <!-- <el-form-item label="商品描述图" prop="">
                <el-upload
                    :disabled="true"
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    name="fileContent"
                    :file-list="descList">
                    <el-button :disabled="true" size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式</label>
                </el-upload>
            </el-form-item> -->
            <uploadpic :isDisabled="isDisabled" :descList="descList" @descListevent="descListevent"></uploadpic>
            <el-form-item>
                <el-button @click="returnList">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import uploadpic from "@/components/uploadpic"
export default {
    name: 'LonganAllCommodityDetail',
    components:{
        uploadpic,
    },
    data(){
        return {
            acId: '',
            CommodityDetailData: {},
            categoryName: '',
            uploadUrl: this.$api.upload_file_url,
            imgList: [],
            bannerList: [],
            categoryList: [],
            isDisabled: true,
            descList: [],
        }
    },
    mounted(){
        this.acId = this.$route.query.id;
        this.allCommodityDetail();
    },
    methods: {
        //商品描述图
        descListevent(e){
            this.descList = e.fileList;
        },
        //商品详情
        allCommodityDetail(){
            const params = {};
            const id = this.acId;
            this.$api.PlatformCommodityDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.CommodityDetailData = result.data;
                        if(result.data.prodType == 1){
                            this.CommodityDetailData.prodTypeName = '实物';
                        }else{
                            this.CommodityDetailData.prodTypeName = '电子';
                        }
                        // console.log(this.CommodityDetailData);
                        if(result.data.statisticsCategoryId != 0){
                             this.categoryName = result.data.prodStatCategoryDTO.categoryName;
                        }
                        this.imgList = [{
                            name: result.data.prodLogoPath,
                            url:  result.data.prodLogoUrl,
                            path: result.data.prodLogoPath
                        }];
                        this.bannerList = result.data.bannerImageList.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.imageUrl,
                                path: item.imagePath
                            }
                        });
                        this.descList = result.data.descImageList.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.imageUrl,
                                path: item.imagePath,
                                sort: item.sort,
                            }
                        });
                    }else{
                        this.$message.error('商品详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error, '警告', {
                        confirmButtonText: '确定'
                    })
                })
        },
        //返回
        returnList(){
            this.$router.push({name: 'LonganAllCommodityManage'});
        }
    },
}
</script>

<style scoped>
.el-input{
    width: 82%;
}
.el-select{
    width: 82%;
}
.el-textarea{
    width: 82%;
}
</style>

<style lang="less" scoped>
.commoditydetail{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .commodityform{
        width: 42%;
    }
}
</style>
