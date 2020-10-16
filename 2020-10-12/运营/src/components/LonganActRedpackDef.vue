<template>
    <div class="hoteladd">
        <p class="title">活动明细</p>
        <div class="detail">
            <p style="color:#ccc;">活动信息</p>
            <el-divider></el-divider>
            <div class="parts">
                <span>活动名称：</span><span class="content">{{actName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>活动类型：</span><span class="content">{{actType}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>活动时间：</span><span class="content">{{actBegin+' 至 '+actEnd}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>级别：</span><span class="content">{{actScopeLevel}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>酒店名称：</span><span class="content">{{hotelName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts" v-if="dateSels">
                <span class="content" style="margin-left:70px;">{{dateSels}}</span>
            </div>
            <el-divider v-if="dateSels"></el-divider>
            <div class="parts" v-if="timeSels">
                <span class="content" style="margin-left:70px;">{{timeSels}}</span>
            </div>
            <el-divider v-if="timeSels"></el-divider>
            <div class="parts">
                <span>参与次数：</span><span class="content">
                    {{showType}}
                </span>
            </div>
            <el-divider></el-divider>
        </div>
        <p style="color:#ccc;">活动说明</p>
        <el-form :model="Commoditygai" :rules="rulesC" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="最小订单金额" prop="minOrderNum">
                <el-input v-model="Commoditygai.minOrderNum" placeholder="请输入最小订单金额"></el-input>
            </el-form-item>
            <el-form-item label="红包数量阶梯">
                <el-button type="primary" @click="addRedpack">添加</el-button>
                <el-popover
                    placement="right-start"
                    title="提示"
                    width="200"
                    trigger="hover"
                    content="红包个数的范围：大于最小金额，小于等于最大金额">
                    <el-button style="border:none;padding:0;vertical-align:middle;margin-bottom:10px" slot="reference">
                        <i class="el-icon-warning-outline" style="font-size:18px"></i>
                    </el-button>
                </el-popover>
                <el-table :data="tableData" border>
                    <el-table-column align="center" label="红包最小金额/元" prop="minRedpackNum"></el-table-column>
                    <el-table-column align="center" label="红包最大金额/元" prop="maxRedpackNum"></el-table-column>
                    <el-table-column align="center" label="红包数量/个">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isSet">
                                <el-input size="mini" style="width:60px" @blur="sureNum(scope.$index,scope.row.redpackNum)" placeholder="请输入内容" v-model="scope.row.redpackNum"></el-input>
                            </span>
                            <span v-else>{{scope.row.redpackNum}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="deleteRedpack(scope.$index)">删除</el-button>
                            <el-button type="text" size="small" @click="changeRedNum(scope.$index)">修改数量</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <p style="color:#ccc;padding-left:50px;">转发信息</p>
            <el-form-item label="转发提示：" prop="shareMsg">
                <el-popover
                    placement="right-start"
                    title="提示"
                    width="200"
                    trigger="hover"
                    :content="prompt">
                    <el-button style="border:none;padding:0;vertical-align:middle;margin-bottom:20px" slot="reference">
                        <i class="el-icon-warning-outline" style="font-size:18px"></i>
                    </el-button>
                </el-popover>
                <el-input style="width:300px" maxlength="50" v-model="Commoditygai.shareMsg" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="转发预览：" prop="shareImgType">
                <el-radio-group v-model="Commoditygai.shareImgType">
                  <el-radio :label="0">使用默认</el-radio>
                  <el-radio :label="1">自定义</el-radio>
                </el-radio-group>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    v-show="Commoditygai.shareImgType"
                    :limit="1"
                    :headers="headers"
                    :file-list="imageList1"
                    name="fileContent"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    :before-remove="beforeRemove">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,最多支持1张图片</label>
                </el-upload>
            </el-form-item>
            <p style="color:#ccc;padding-left:50px;">海报信息</p>
            <el-form-item label="海报开关：" prop="posterFlag">
                <el-switch v-model="Commoditygai.posterFlag"></el-switch>
            </el-form-item>
            <el-form-item v-if="Commoditygai.posterFlag" label="海报模板：" prop="posterImgPath">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :file-list="imageList2"
                    :on-success="handleSuccess1"
                    :on-remove="handleRemove1"
                    :on-exceed="handleExceed1"
                    :on-error="imgUploadError1"
                    :before-remove="beforeRemove1">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,最多支持1张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item v-if="Commoditygai.posterFlag" label="二维码：" prop="posterQr">
                <div>
                    <span>位置：</span>
                    <span>X轴：<el-input style="width:120px" v-model="Commoditygai.posterQrX" placeholder="请填写二维码X轴位置"></el-input></span>
                    <span>Y轴：<el-input style="width:120px" v-model="Commoditygai.posterQrY" placeholder="请填写二维码Y轴位置"></el-input></span>
                </div>
                <div>
                    <span>尺寸：<el-input style="width:120px" v-model="Commoditygai.posterQrPx" placeholder="请填写二维码尺寸"></el-input></span>
                </div>
                <!-- <el-checkbox v-model="Commoditygai.posterQrBtFlag" label="二维码区域覆盖图片背景"></el-checkbox> -->
            </el-form-item>
            <el-form-item label="广告页：" prop="adPage">
                <el-checkbox v-model="Commoditygai.ifadPage"></el-checkbox>
                <el-select v-model="Commoditygai.adPage" @focus="getADpages" placeholder="选择广告页">
                  <el-option v-for="item in allAdPageList" :key="item.id" :label="item.adName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告后页：" prop="adAfterPage">
                <el-checkbox v-model="Commoditygai.ifadAfterPage"></el-checkbox>
                <el-select
                 @focus="getAlllinks"
                 @change="getSelectLink"
                  v-model="Commoditygai.adAfterPage"
                   placeholder="选择广告后页">
                  <el-option v-for="item in allLinkList" :key="item.id" :label="item.linkName" :value="item.id"></el-option>
                </el-select>
                <el-button v-if="ifHasParam" type="primary" size="small" @click="changelink">链接参数</el-button>
            </el-form-item>
            <p style="color:#ccc;padding-left:50px;">分享红包设置</p>
            <el-form-item label="板块类型" prop="modelData">
                <el-button type="primary" @click="addModelType">添加</el-button>
                <el-table :header-cell-style="{background:'rgba(64,158,255,0.8)',border:'1px rgb(235,238,245) solid !important'}" :data="modelData">
                    <el-table-column label="范围" align="center">
                        <el-table-column align="center" label="板块类型">
                            <template slot-scope="scope">
                                <span v-if="scope.row.modelType == 1">功能区</span>
                                <span v-if="scope.row.modelType == 2">客房协议价</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="板块" prop="modelName"></el-table-column>
                    </el-table-column>
                    <el-table-column label="金额" align="center">
                        <el-table-column align="center" prop="redPacketAmountFromName" label="来源"></el-table-column>
                        <el-table-column align="center" label="计算类型">
                            <template slot-scope="scope">
                                <span v-if="scope.row.redSetType == 1">比例</span>
                                <span v-if="scope.row.redSetType == 2">固定金额</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="bonusBaselineTypeName" label="计算基准"></el-table-column>
                        <el-table-column align="center" label="红包比例/红包金额" prop="redPacketRate"></el-table-column>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="RedModelDetail(scope.$index,modelData)">详情</el-button>
                            <el-button type="text" size="small" @click="changeRedModel(scope.$index,modelData)">修改</el-button>
                            <el-button type="text" size="small" @click="deleteRedModel(scope.$index,modelData)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-dialog 
            :visible.sync="dialogVisible"
            :before-close="cancelRed"
            title="添加"
            width="30%">
                <el-form-item label="红包金额">
                    <el-input v-model="addrednum" placeholder="请输入红包金额"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="none" @click="cancelRed()">取消</el-button>
                    <el-button type="primary" @click="ensureRed()">确定</el-button>
                </el-form-item>
            </el-dialog>
            <el-form-item>
                <el-button type="none" @click="cancelRedpack()">取消</el-button>
                <el-button type="primary" @click="ensureRedpack('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
        <el-dialog 
        :visible.sync="dialogVisible1"
        :before-close="cancelModel"
        :title="modelTitle"
        width="900px">
            <el-form :model="modelTypeObj" :disabled='this.modeTitleType == 3' :rules="rulesM" ref="modelTypeObj" label-width="140px" style="width:80%;" class="hotelform">
                <el-form-item label="板块类型：" prop="modelType">
                    <el-select @change="changeModel" v-model="modelTypeObj.modelType" placeholder="请选择板块类型">
                        <el-option v-for="item in modelTypeList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="板块：" prop="modelId">
                    <el-select @change="clearShareObj" :disabled="!ifSelect" v-model="modelTypeObj.modelId" placeholder="请选择板块">
                        <el-option v-for="item in modelList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="modelTypeObj.modelType != 2" label="选择分类：" prop="sort">
                    <el-radio-group v-model="modelTypeObj.sort" style="margin-top:12px;">
                        <div>
                            <el-radio :label="0" style="margin-right:10px">全部可用</el-radio>
                        </div>
                        <div style="margin-bottom:20px;margin-top:10px;">
                            <el-radio :label="1">指定可用</el-radio>
                            <el-button type="text" size="small" @click="chooseType(1)">选择分类</el-button>
                            <el-table :data="typeChooseList1" border>
                                <el-table-column align="center" label="分类" width="200px" prop="categoryName"></el-table-column>
                                <el-table-column align="center" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="deleteSort(scope.$index,1)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div style="margin-bottom:20px;margin-top:10px;">
                            <el-radio :label="2">指定不可用</el-radio>
                            <el-button type="text" size="small" @click="chooseType(2)">选择分类</el-button>
                            <el-table :data="typeChooseList2" border>
                                <el-table-column align="center" label="分类" width="200px" prop="categoryName"></el-table-column>
                                <el-table-column align="center" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="deleteSort(scope.$index,2)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="modelTypeObj.modelType != 2" label="商品名称：" prop="goods">
                    <el-radio-group v-model="modelTypeObj.goods" style="margin-top:12px;">
                        <div>
                            <el-radio :label="0" style="margin-right:10px">全部可用</el-radio>
                        </div>
                        <div style="margin-bottom:20px;margin-top:10px;">
                            <el-radio :label="1">指定可用</el-radio>
                            <el-button type="text" size="small" @click="chooseGood(1)">选择商品</el-button>
                            <el-table :data="goodsChooseList1" border style="width:600px">
                                <el-table-column label="商品类型" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.hotelProduct.prodKindName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品所属组织" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.hotelProduct.prodOwnerOrgName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品名称" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.hotelProduct.prodProductDTO.prodName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品显示名称" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.funcProdShowName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="deleteGoods(scope.$index,1)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div style="margin-bottom:20px;margin-top:10px;">
                            <el-radio :label="2">指定不可用</el-radio>
                            <el-button type="text" size="small" @click="chooseGood(2)">选择商品</el-button>
                            <el-table :data="goodsChooseList2" border>
                                <el-table-column label="商品类型" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.hotelProduct.prodKindName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品所属组织" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.hotelProduct.prodOwnerOrgName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品名称" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.hotelProduct.prodProductDTO.prodName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品显示名称" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.funcProdShowName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="deleteGoods(scope.$index,2)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="modelTypeObj.modelType != 1" label="选择房源：" prop="rooms">
                    <el-radio-group v-model="modelTypeObj.rooms" style="margin-top:12px;">
                        <div>
                            <el-radio :label="0" style="margin-right:10px">全部可用</el-radio>
                        </div>
                        <div style="margin-bottom:20px;margin-top:10px;">
                            <el-radio :label="1">指定可用</el-radio>
                            <el-button type="text" size="small" @click="chooseRoom(1)">选择房源</el-button>
                            <el-table :data="roomsChooseList1" border style="width:600px">
                                <el-table-column label="房型名称" prop="roomTypeName" align="center"></el-table-column>
                                <el-table-column label="房源名称" prop="resourceName" align="center"></el-table-column>
                                <el-table-column align="center" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="deleteRooms(scope.$index,1)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div style="margin-bottom:20px;margin-top:10px;">
                            <el-radio :label="2">指定不可用</el-radio>
                            <el-button type="text" size="small" @click="chooseRoom(2)">选择房源</el-button>
                            <el-table :data="roomsChooseList2" border>
                                <el-table-column label="房型名称" prop="roomTypeName" align="center"></el-table-column>
                                <el-table-column label="房源名称" prop="resourceName" align="center"></el-table-column>
                                <el-table-column align="center" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="deleteRooms(scope.$index,2)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="红包奖励来源：" prop="bonusAmountFrom">
                    <el-select v-model="modelTypeObj.bonusAmountFrom" placeholder="请选择奖励来源">
                        <el-option v-for="item in bonusAmountList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="红包奖励类型：" prop="bonusType">
                    <el-radio-group @change="modelTypeObj.redpackBili='';" v-model="modelTypeObj.bonusType">
                        <div style="margin-bottom:20px;margin-top:10px;">
                            <el-radio :label="1">比例</el-radio>
                            <el-form-item v-if="modelTypeObj.bonusType == 1" style="height:60px;" label="计算基准" prop="bonusBaselineType">
                                <el-select v-model="modelTypeObj.bonusBaselineType" placeholder="请选择计算基准">
                                    <el-option v-for="item in BaselineList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="modelTypeObj.bonusType == 1" style="height:60px;" label="红包比例" prop="redpackBili">
                                <el-input style="width:140px;" v-model.trim="modelTypeObj.redpackBili"></el-input><span>&nbsp;%</span>
                            </el-form-item>
                        </div>
                        <div>
                            <el-radio :label="2" style="margin-right:10px">固定金额/件商品</el-radio>
                            <el-form-item v-if="modelTypeObj.bonusType == 2" style="height:60px;" label="红包金额" prop="redpackBili">
                                <el-input style="width:140px;" v-model.trim="modelTypeObj.redpackBili"></el-input><span>&nbsp;元</span>
                            </el-form-item>
                        </div>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div style="margin-left:140px">
                <el-button type="none" v-if="this.modeTitleType != 3" @click="cancelModel()">取消</el-button>
                <el-button type="none" v-else @click="cancelModel()">返回</el-button>
                <el-button type="primary" v-if="this.modeTitleType != 3" @click="ensureAddModel('modelTypeObj')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog 
        :visible.sync="dialogVisible2"
        :before-close="cancelType"
        title="选择分类"
        style="text-align:center"
        width="400px">
            <!-- <div class="block" style="text-align:center">
                <el-cascader
                    v-model="sortBox"
                    :options="options"
                    :props="props"
                    :loading="loading"
                    collapse-tags
                    clearable>
                </el-cascader>
                <div style="margin-top:20px">
                    <el-button type="none" @click="cancelType()">取消</el-button>
                    <el-button type="primary" @click="ensureType()">确定</el-button>
                </div>
            </div> -->
            <el-select
                v-model="sortBox" 
                :multiple-limit="chooseTypes == 1?1:0"
                multiple
                reserve-keyword
                collapse-tags 
                placeholder="请选择分类">
                <el-option v-for="item in batchData" :key="item.id" :value="item.id" :label="item.categoryName"></el-option>
            </el-select>
            <div style="margin-top:20px">
                <el-button type="none" @click="cancelType()">取消</el-button>
                <el-button type="primary" @click="ensureType()">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog 
        :visible.sync="dialogVisible3"
        :before-close="cancelGoods"
         title="请选择酒店商品"
         width="800px">
            <div class="searchHotel">
                <el-select 
                    v-model="inquireCommodityName"
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loadingP"
                    @focus="getProdList()"
                    placeholder="请输入商品名称">
                    <el-option v-for="item in prodList" :key="item.id" :label="item.prodName" :value="item.id"></el-option>
                </el-select>
                <el-button type="primary" @click="searchFuncPro">搜索</el-button>
            </div>
            <div class="chooseTable">
                <el-table border stripe 
                style="width:100%;" 
                :data="searchGoodsList"
                ref="multipleTable"
                @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        :selectable="checkSelectable"
                        width="55">
                    </el-table-column>
                    <el-table-column label="商品类型" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.hotelProduct.prodKindName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品所属组织" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.hotelProduct.prodOwnerOrgName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.hotelProduct.prodProductDTO.prodName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品显示名称" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.funcProdShowName}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next, jumper"
                        :pager-count="5"
                        :page-size="pageSize"
                        :total="pageTotal"
                        :current-page.sync="pageNum"
                        @current-change = "current"
                        @prev-click="prev"
                        @next-click="next">
                    </el-pagination>
                </div>
            </div>
            <div class="operate">
                <el-button type="none" @click="cancelGoods()">取消</el-button>
                <el-button type="primary" @click="ensureGoods()">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog 
        :visible.sync="dialogVisible4"
        :before-close="cancelRooms"
         title="请选择房源"
         width="800px">
            <div class="searchHotel">
                <el-input v-model="resourceName" style="width:250px" placeholder="输入房源名称"></el-input>
                <el-button type="primary" @click="searchRooms">搜索</el-button>
            </div>
            <div class="chooseTable">
                <el-table border stripe
                style="width:100%;" 
                :data="searchRoomsList"
                ref="multipleTable1"
                @selection-change="handleSelectionChange1">
                    <el-table-column
                        type="selection"
                        :selectable="checkSelectable1"
                        width="55">
                    </el-table-column>
                    <el-table-column label="房型名称" prop="roomTypeName" align="center"></el-table-column>
                    <el-table-column label="房源名称" prop="resourceName" align="center"></el-table-column>
                    <el-table-column label="房量" prop="roomCount" align="center"></el-table-column>
                    <el-table-column label="基础价格" prop="basicPrice" align="center"></el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next, jumper"
                        :pager-count="5"
                        :page-size="pageSize1"
                        :total="pageTotal1"
                        :current-page.sync="pageNum1"
                        @current-change = "current1"
                        @prev-click="prev1"
                        @next-click="next1">
                    </el-pagination>
                </div>
            </div>
            <div class="operate">
                <el-button type="none" @click="cancelRooms()">取消</el-button>
                <el-button type="primary" @click="ensureRooms()">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog 
        :visible.sync="dialogVisible5"
        :before-close="cancelLink"
         title="修改参数"
         width="500px">
            <div>
            <el-form :model="modelLink" ref="modelLink" class="hotelform">
                <div v-for="item in paramData" :key="item.id">
                    <el-form-item
                     :label="item.parameterName"
                      label-width="140px"
                     :prop="item.parameterName"
                      :rules="item.isNecessary?[{ required: true, message: '请填写参数',trigger:'blur'}]:[]">
                        <el-input maxlength="50" v-model="modelLink[item.parameterName]" :placeholder="item.parameterInstructions"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            </div>
            <div class="operate">
                <el-button type="none" @click="cancelLink()">取消</el-button>
                <el-button type="primary" @click="ensureLink('modelLink')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LaunchCabinetAdd',
    data(){
        var validator1 = (rule, value, callback) => {
            if(this.modelTypeObj.bonusType == 1){
                if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)){
                    callback(new Error('请规范填写比例'));
                }else{
                    callback();
                }
            }else if(this.modelTypeObj.bonusType == 2){
                if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(value)){
                    callback(new Error('请规范填写金额'));
                }else{
                    callback();
                }
            }
        }
        var validator2 = (rule, value, callback) => {
            if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(value)){
                callback(new Error('请规范填写金额'));
            }else{
                callback();
            }
        }
        var shareImgType = (rule, value, callback) => {
            if(value == 1 && !this.Commoditygai.shareImgCustomPath){
                callback(new Error('请上传转发预览图片'));
            }else{
                callback();
            }
        }
        var posterImgPath = (rule, value, callback) => {
            if(!value && this.Commoditygai.posterFlag){
                callback(new Error('请上传海报模板'));
            }else{
                callback();
            }
        }
        var adAfterPage = (rule, value, callback) => {
            if(!this.Commoditygai.adAfterPage && this.Commoditygai.ifadAfterPage){
                callback(new Error('请选择广告后页'));
            }else{
                let ifall = true
                for(var item in this.modelLink){
                    if(this.modelLink[item] == ''){
                        ifall = false
                    }              
                }
                if(!ifall){
                    callback(new Error('请配置广告后页的参数'));
                }else{
                    callback();
                }
            }
        }
        var adPage = (rule, value, callback) => {
            if(!this.Commoditygai.adPage && this.Commoditygai.ifadPage){
                callback(new Error('请选择广告页'));
            }else{
                callback();
            }
        }
        var modelData = (rule, value, callback) => {
            if(!this.modelData.length){
                callback(new Error('请添加板块类型'));
            }else{
                callback();
            }
        }
        var posterRule = (rule, value, callback) => {
            if(!this.Commoditygai.posterQrX){
                callback(new Error('请填写二维码X轴位置'));
            }else if(!this.Commoditygai.posterQrY){
                callback(new Error('请填写二维码Y轴位置'));
            }else if(!this.Commoditygai.posterQrPx){
                callback(new Error('请填写二维码尺寸'));
            }else{
                callback();
            }
        }
        var validateSort = (rule, value, callback) => {
            if(value == 1 && !this.typeChooseList1.length){
                callback(new Error('请至少选择一个分类'));
            }else if(value == 2 && !this.typeChooseList2.length){
                callback(new Error('请至少选择一个分类'));
            }else{
                callback();
            }
        }
        var validateGoods = (rule, value, callback) => {
            if(value == 1 && !this.goodsChooseList1.length){
                callback(new Error('请至少选择一个商品'));
            }else if(value == 2 && !this.goodsChooseList2.length){
                callback(new Error('请至少选择一个商品'));
            }else{
                callback();
            }
        }
        var validateRooms = (rule, value, callback) => {
            if(value == 1 && !this.roomsChooseList1.length){
                callback(new Error('请至少选择一个房源'));
            }else if(value == 2 && !this.roomsChooseList2.length){
                callback(new Error('请至少选择一个房源'));
            }else{
                callback();
            }
        }
        return{
            uploadUrl: this.$api.upload_file_url,
            headers:'',
            // props: { multiple: true ,value:'id',label:'categoryName',children:'childDtoList'},
            // options:[],
            prompt:`1、我收到一个现金红包，发给大家一起领，领取后可提入微信零钱
                    2、{{nickName}}给你发了一个现金红包，领取后可以微信零钱。
                    {{nickName}}：分享人的昵称，取不到昵称则固定为“好友”`,
            batchData:[],
            loadingP:false,
            inquireCommodityName:'',
            resourceName:'',
            searchGoodsList:[],
            searchRoomsList:[],
            chooseModelID:"",
            ifHasParam:false,
            currentLinkId:'',
            modelLink:{},
            imageList1:[],
            imageList2:[],
            Commoditygai:{
                minOrderNum:'',
                settingLadderDTOS:'',
                shareMsg: '',
                shareImgType: 0,
                shareImgCustomPath:'',
                posterFlag:false,
                posterImgPath:'',
                posterQrX:'',
                posterQrY:'',
                // posterQrBtFlag:false,
                posterQrPx:'',
                adPage:'',
                ifadPage:false,
                adAfterPage:'',
                ifadAfterPage:false,
            },
            modelTypeObj:{
                modelType:'',
                modelName:'',
                modelId:'',
                sort:'',
                goods:'',
                rooms:'',
                bonusAmountFrom:'',
                bonusType:'',
                bonusBaselineType:'',
                redpackBili:'',
            },
            actName:'',
            paramData:'',
            actType:'',
            actScopeLevel:'',
            actBegin:'',
            actEnd:'',
            dateSels:'',
            timeSels:'',
            showType:"",
            actID:'',
            hotelId:'',
            hotelName:'',
            tableData:[],
            modelTypeList:[
                {
                    id:1,
                    label:'功能区'
                },
                {
                    id:2,
                    label:'客房协议价'
                },
            ],
            BaselineList:[],
            prodList:[],
            sortBox:[],
            sortBoxs:[[],[]],
            modelList:[],
            typeChooseList1:[],
            typeChooseList2:[],
            goodsChooseList1:[],
            goodsChooseList2:[],
            roomsChooseList1:[],
            roomsChooseList2:[],
            modelData:[],
            addrednum:"",
            dialogVisible:false,
            dialogVisible1:false,
            dialogVisible2:false,
            dialogVisible3:false,
            dialogVisible4:false,
            dialogVisible5:false,
            chooseTypes:'',
            chooseGoods:'',
            chooseRooms:'',
            loading:false,
            findItemIndex:'',
            bonusAmountList:[],
            allLinkList:[],
            modelTitleList:[
                {
                    id:1,
                    title:'新增板块类型',
                },
                {
                    id:2,
                    title:'修改板块类型',
                },
                {
                    id:3,
                    title:'板块类型详情',
                },
            ],
            modeTitleType:"",
            allAdPageList:[],
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            pageNum: 1, //当前页码
            pageSize1:10,   //每页显示条数
            pageTotal1: 1,   //默认总条数
            pageNum1: 1, //当前页码
            detailId:'',
            adAfterPageID:'',
            modelLinkCopy:{},
            rulesC: {
                minOrderNum: [
                    {required: true, message: '请填写最小订单金额', trigger: 'blur'},
                    {validator: validator2,trigger: 'blur'},
                ],
                shareImgType: [
                    {validator: shareImgType,trigger: 'blur'},
                ],
                posterImgPath: [
                    {validator: posterImgPath,trigger: 'blur'},
                ],
                posterQr: [{validator:posterRule,trigger:"blur"}],
                adPage: [{validator:adPage,trigger:"blur"}],
                // adAfterPage: [{validator:adAfterPage,trigger:"blur"}],
                modelData: [
                    {required: true, validator: modelData,trigger: 'change'},
                ],
            },
            rulesM: {
                modelType: [
                    {required: true, message: '请选择板块类型', trigger: 'change'},
                ],
                modelId: [
                    {required: true, message: '请选择板块', trigger: 'change'}
                ],
                sort: [
                    {required: true, message: '请选择分类', trigger: 'change'},
                    {validator: validateSort,trigger: 'blur'}
                ],
                goods: [
                    {required: true, message: '请选择商品', trigger: 'change'},
                    {validator: validateGoods,trigger: 'blur'}
                ],
                rooms: [
                    {required: true, message: '请选择房源', trigger: 'change'},
                    {validator: validateRooms,trigger: 'blur'}
                ],
                bonusAmountFrom: [
                    {required: true, message: '请选择红包奖励来源', trigger: 'change'}
                ],
                bonusType: [
                    {required: true, message: '请选择分享奖励类型', trigger: 'change'}
                ],
                bonusBaselineType: [
                    {required: true, message: '请选择计算基准', trigger: 'change'}
                ],
                redpackBili: [
                    {required: true, message: '请填写红包比例或者金额', trigger: 'blur'},
                    {validator: validator1,trigger: 'blur'}
                ],
            },
        }
    },
    computed:{
        ifSelect(){
            if(this.modelTypeObj.modelType){
                return true
            }else{
                return false
            }
        },
        modelTitle(){
            if(this.modeTitleType){
                return this.modelTitleList.find(item => {
                    return item.id == this.modeTitleType
                }).title
            }else {
                return ''
            }
        }
    },
    created() {
        this.actID = this.$route.query.modifyid;
        this.hotelId = this.$route.query.hotelId;
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.getbonusAmountList()
        // this.getFillbackData();
        this.getADpages();
        this.getAlllinks();
    },
    methods: {
        clearShareObj(e){
            this.modelTypeObj.modelName = this.modelList.find(item => item.id == e).label
            this.clearSelectData()
        },
        clearSelectData(){
            this.sortBoxs = [[],[]]
            this.typeChooseList1 = []
            this.typeChooseList2 = []
            this.goodsChooseList1 = []
            this.goodsChooseList2 = []
            this.roomsChooseList1 = []
            this.roomsChooseList2 = []
        },
        getAlllinks(){ 
            let that=this;
            let params = {
                pageNo: 1,
                pageSize: 150,
            }
            this.$api.selNewLink({params}).then(response => {
                if(response.data.code == 0){
                    that.allLinkList = response.data.data.records.filter(item => item.isEnable == 1);
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
        },
        getADpages(){
            this.$api.selAllAdPages({hotelId:this.hotelId}).then(response => {
                if(response.data.code == 0){
                    this.allAdPageList = response.data.data;
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
        },
        getSelectLink(id){
            let isNeedParameter = this.allLinkList.find(item => {
                return item.id == id
            })
            this.adAfterPageID = id
            if(isNeedParameter){
                if(isNeedParameter.isNeedParameter){
                    this.ifHasParam = true
                    this.getParamsData()
                }else{
                    this.ifHasParam = false
                    this.modelLink = {}
                }
            }
        },
        cancelLink(){
            this.dialogVisible5 = false;
            let obj = {}
            for(var item in this.modelLinkCopy){
                obj[item] = this.modelLinkCopy[item]
            }
            this.modelLink = obj
        },
        changelink(){
            this.dialogVisible5 = true
            this.getParamsData()
        },
        spliteLinks(stringLink){
            if(stringLink != ''){
                stringLink.split('&').forEach(item => {
                    let param = item.split('=')[0]
                    let value = item.split('=')[1]
                    this.$set(this.modelLink,param.toString(),value)
                })
            }
        },
        ensureLink(modelLink){
            this.$refs[modelLink].validate((valid) => {
                if (valid) {
                    this.dialogVisible5 = false
                    this.$message.success("操作成功");
                    let obj = {}
                    for(var item in this.modelLink){
                        obj[item] = this.modelLink[item]
                    }
                    this.modelLinkCopy = obj 
                } else {
                    return false;
                }
            })
        },
        getParamsData(){
            var that = this
            var params = {
                linkId:this.Commoditygai.adAfterPage
            }
            this.$api.selNewParams({params}).then(response => {
                if(response.data.code == 0){
                    this.paramData = response.data.data
                    this.modelLink = {}
                    if(this.adAfterPageID == this.currentLinkId){
                        let obj = {}
                        for(var item in this.modelLinkCopy){
                            obj[item] = this.modelLinkCopy[item]
                        }
                        this.modelLink = obj
                        let newobj = {}
                        this.paramData.forEach(item => {
                            let ifhas = false
                            let value = ''
                            for(var items in this.modelLink){
                                if(item.parameterName == items){
                                    ifhas = true
                                    value = this.modelLink[items]
                                }
                            }
                            if(ifhas){
                                newobj[item.parameterName] = value
                            }else{
                                newobj[item.parameterName] = item.defaultValue
                            }
                        })
                        this.modelLink = newobj
                    }else{
                        let newObj = {}
                        this.paramData.forEach(item => {
                            this.$set(newObj,item.parameterName.toString(),item.defaultValue)
                        })
                        this.modelLink = newObj
                        let obj = {}
                        for(var item in this.modelLink){
                            obj[item] = this.modelLink[item]
                        }
                        this.modelLinkCopy = obj
                        this.currentLinkId = this.adAfterPageID
                    }
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
        },
        changeAFName(id){
            return this.bonusAmountList.find(item => {
                return item.id == id
            })
        },
        changeBSName(id){
            return this.BaselineList.find(item => {
                return item.id == id
            })
        },
         //删除
        deleteRedModel(index,row){
            this.$confirm('是否确认删除该板块类型?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message.success("操作成功");
                this.modelData.splice(index,1)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //详情
        RedModelDetail(index,row){
            this.chooseModelID = index;
            this.dialogVisible1= true
            this.modeTitleType = 3
            this.getModelData()
        },
        //修改
        changeRedModel(index,row){
            this.chooseModelID = index;
            this.dialogVisible1= true
            this.modeTitleType = 2
            this.getModelData()
        },
        getModelData(){
            let resdata = this.modelData[this.chooseModelID];
            this.modelTypeObj.modelType = resdata.modelType
            this.modelTypeObj.modelName = resdata.modelName
            this.modelTypeObj.modelId = resdata.modelId
            if(this.modelTypeObj.modelType == 1){
                this.getSelectedHotel()
                this.modelTypeObj.sort = resdata.categoryScopeType
                this.modelTypeObj.goods = resdata.prodScopeType
                if(this.modelTypeObj.sort == 1){
                    this.typeChooseList1 = !resdata.categoryScopeDetailList?[]:resdata.categoryScopeDetailList
                    this.sortBoxs[0] = resdata.categoryScopeList
                }else if(this.modelTypeObj.sort == 2){
                    this.typeChooseList2 = !resdata.categoryScopeDetailList?[]:resdata.categoryScopeDetailList
                    this.sortBoxs[1] = resdata.categoryScopeList
                }
                if(this.modelTypeObj.goods == 1){
                    this.goodsChooseList1 = !resdata.prodScopeDetailList?[]:resdata.prodScopeDetailList
                }else if(this.modelTypeObj.goods == 2){
                    this.goodsChooseList2 = !resdata.prodScopeDetailList?[]:resdata.prodScopeDetailList
                }
            }else if(this.modelTypeObj.modelType == 2){
                this.modelList = [{id:-1,label:"客房协议价"}]
                this.modelTypeObj.rooms = resdata.prodScopeType
                if(this.modelTypeObj.rooms == 1){
                    this.roomsChooseList1 = !resdata.prodScopeDetailList?[]:resdata.prodScopeDetailList
                }else if(this.modelTypeObj.rooms == 2){
                    this.roomsChooseList2 = !resdata.prodScopeDetailList?[]:resdata.prodScopeDetailList
                }
            }
            this.modelTypeObj.bonusAmountFrom = resdata.redPacketAmountFrom
            this.modelTypeObj.bonusType = resdata.redSetType
            this.modelTypeObj.bonusBaselineType = resdata.bonusBaselineType === 0?'':resdata.bonusBaselineType
            this.modelTypeObj.redpackBili = resdata.redPacketRate
        },
        getModelDataList(){
            this.modelData.forEach(item => {
                item.redPacketAmountFromName = this.changeAFName(item.redPacketAmountFrom).label
                item.bonusBaselineTypeName = !item.bonusBaselineType?'-':this.changeBSName(item.bonusBaselineType).label
            })
        },
        //计算基准
        getBaselineList(){
            this.$api.basicDataItems({key:'SHARE_BONUS_BASE ',orgId: 0}).then(response => {
                if(response.data.code==0){
                    let recordsData = response.data.data;
                    this.BaselineList = recordsData.map(item=>{
                        return {
                            label: item.dictName,
                            id: parseInt(item.dictValue),
                        }
                    })
                    this.getFillbackData()
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //奖励来源
        getbonusAmountList(){
            this.$api.basicDataItems({key:'SHARE_BONUS_FROM',orgId: 0}).then(response => {
                if(response.data.code==0){
                    let recordsData = response.data.data;
                    this.bonusAmountList = recordsData.map(item=>{
                        return {
                            label: item.dictName,
                            id: parseInt(item.dictValue),
                        }
                    })
                    this.getBaselineList()
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //搜索商品
        searchFuncPro(){
            this.functionProdList()
        },
        //搜索房源
        searchRooms(){
            this.getRoomList()
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.functionProdList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.functionProdList();
        },
        //当前页码
        current(){
            this.functionProdList();
        },
        //上一页
        prev1(){
            this.pageNum1 = this.pageNum1 - 1;
            this.getRoomList();
        },
        //下一页
        next1(){
            this.pageNum1 = this.pageNum1 + 1;
            this.getRoomList();
        },
        //当前页码
        current1(){
            this.getRoomList();
        },
        //检查是否已选中
        checkSelectable(row,index){
            let flag = true;
            if(this.chooseGoods == 1){
                this.goodsChooseList1.forEach(item => {
                    if(item.id == row.id){
                        flag = false
                    }
                })
            }else if(this.chooseGoods == 2){
                this.goodsChooseList2.forEach(item => {
                    if(item.id == row.id){
                        flag = false
                    }
                })
            }
            return flag
        },
        handleSelectionChange(val) {
            // this.hotelSelection = val;
            if(this.chooseGoods == 1){
                if(val.length < 2){
                    this.hotelSelection = val;
                }else{
                    let tableIndex = this.searchGoodsList.find(item => {
                        return item.id == val[0].id
                    })
                    this.$refs.multipleTable.toggleRowSelection(tableIndex,false);
                }
            }else{
                this.hotelSelection = val;
            }
        },
        //确认商品
        ensureGoods(){
            let hotelSelections = this.hotelSelection
            if(this.chooseGoods == 1){
                this.goodsChooseList1 = hotelSelections
            }else if(this.chooseGoods == 2){
                this.goodsChooseList2 = this.goodsChooseList2.concat(hotelSelections)
            }
            this.$refs['modelTypeObj'].validate();
            this.cancelGoods()
        },
        //检查是否已选中
        checkSelectable1(row,index){
            let flag = true;
            if(this.chooseRooms == 1){
                this.roomsChooseList1.forEach(item => {
                    if(item.id == row.id){
                        flag = false
                    }
                })
            }else if(this.chooseRooms == 2){
                this.roomsChooseList2.forEach(item => {
                    if(item.id == row.id){
                        flag = false
                    }
                })
            }
            return flag
        },
        handleSelectionChange1(val) {
            // this.hotelSelection = val;
            if(this.chooseRooms == 1){
                if(val.length < 2){
                    this.hotelSelection = val;
                }else{
                    let tableIndex = this.searchRoomsList.find(item => {
                        return item.id == val[0].id
                    })
                    this.$refs.multipleTable1.toggleRowSelection(tableIndex,false);
                }
            }else{
                this.hotelSelection = val;
            }
        },
        //确认房源
        ensureRooms(){
            let hotelSelections = this.hotelSelection
            if(this.chooseRooms == 1){
                this.roomsChooseList1 = hotelSelections
            }else if(this.chooseRooms == 2){
                this.roomsChooseList2 = this.roomsChooseList2.concat(hotelSelections)
            }
            this.$refs['modelTypeObj'].validate();
            this.cancelRooms()
        },
        //商品列表
        getProdList(pName){
            this.loadingP = true;
            const params = {
                orgAs: '',
                prodName: pName,
                // hotelId: this.hotelId,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.platformCommodityList(params)
                .then(response => {
                    this.loadingP = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.prodList = result.data.records.map(item => {
                            return{
                                id: item.prodCode,
                                prodName: item.prodName
                            }
                        })
                        const prodAll = {
                            id: '',
                            prodName: '全部'
                        };
                        this.prodList.unshift(prodAll);
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
        //房源列表
        getRoomList(){
            const params = {
                resourceName: this.resourceName,
                hotelId: this.hotelId,
                orgAs: 2,
                pageSize: this.pageSize1,
                pageNo: this.pageNum1,
            };
            this.$api.bookResourceList(params).then(response=>{
                if(response.data.code=='0'){
                    this.searchRoomsList = response.data.data.records
                    this.pageTotal1 = response.data.data.total;
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText:"确定"
                    })
                }
            }).catch(error=>{
                    this.$alert(error,"警告",{
                    confirmButtonText:"确定"
                })
            })
        },
        
        remoteProd(val){
            this.getProdList(val);
        },
        cancelType(){
            this.dialogVisible2 = false
            this.batchData = []
        },
        cancelGoods(){
            this.dialogVisible3 = false
            this.inquireCommodityName = ''
            this.searchGoodsList = []
        },
        cancelRooms(){
            this.dialogVisible4 = false
            this.resourceName = ''
            this.searchRoomsList = []
        },
        deleteSort(index,type){
            if(type == 1){
                this.sortBoxs[0].splice(index,1)
                this.typeChooseList1.splice(index,1)
            }else if(type == 2){
                this.sortBoxs[1].splice(index,1)
                this.typeChooseList2.splice(index,1)
            }
        },
        deleteGoods(index,type){
            if(type == 1){
                this.goodsChooseList1.splice(index,1)
            }else if(type == 2){
                this.goodsChooseList2.splice(index,1)
            }
        },
        deleteRooms(index,type){
            if(type == 1){
                this.roomsChooseList1.splice(index,1)
            }else if(type == 2){
                this.roomsChooseList2.splice(index,1)
            }
        },
        chooseType(type){
            if(!this.modelTypeObj.modelType || !this.modelTypeObj.modelId){
                 this.$message({
                    message: '请先选择板块类型及板块',
                    type: 'warning'
                });
                return ;
            }
            this.chooseTypes = type
            this.dialogVisible2 = true
            if(this.chooseTypes == 1){
                this.sortBox = this.sortBoxs[0]
            }else if(this.chooseTypes == 2){
                this.sortBox = this.sortBoxs[1]
            }
            // this.getChooseType()
            this.getCatTypes()
        },
        chooseGood(type){
            if(!this.modelTypeObj.modelType || !this.modelTypeObj.modelId){
                 this.$message({
                    message: '请先选择板块类型及板块',
                    type: 'warning'
                });
                return ;
            }
            this.chooseGoods = type
            this.dialogVisible3 = true
            this.functionProdList()
        },
        chooseRoom(type){
            if(!this.modelTypeObj.modelType || !this.modelTypeObj.modelId){
                 this.$message({
                    message: '请先选择板块类型及板块',
                    type: 'warning'
                });
                return ;
            }
            this.chooseRooms = type
            this.dialogVisible4 = true
            this.getRoomList()
        },
        ensureType(){
            if(this.chooseTypes == 1){
                this.typeChooseList1 = this.getSortList(this.sortBox)
                this.sortBoxs[0] = this.sortBox
            }else if(this.chooseTypes == 2){
                this.typeChooseList2 = this.getSortList(this.sortBox)
                this.sortBoxs[1] = this.sortBox
            }
            this.$refs['modelTypeObj'].validate();
            this.cancelType()
        },
        getSortList(IdObj){
            return IdObj.map(item => {
                return this.findItem(item)
            })
            // return IdObj.map(item => {
            //     let sortName = ''
            //     item.forEach((ele,index)=>{
            //         let findEle = this.findItem(this.options,ele)
            //         if(!index){
            //             sortName += findEle.categoryName
            //         }else{
            //             sortName += ('/'+findEle.categoryName)
            //         }
            //     })
            //     return {sortName}
            // })
        },
        findItem(ele){
            return this.batchData.find(item=>{
                return item.id == ele
            })
        },
        // findItem(obj,ele){
        //     obj.forEach(item=>{
        //         if(item.id == ele){
        //             this.findItemIndex = item
        //             return;
        //         }else if(item.childDtoList && item.childDtoList.length){
        //             this.findItem(item.childDtoList,ele)
        //         }
        //     })
        //     return this.findItemIndex
        // },
        //功能区商品列表
        functionProdList(){
            const params = {
                hotelId: this.hotelId,
                funcId: this.modelTypeObj.modelId,
                prodCode: this.inquireCommodityName,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            this.$api.functionProdList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.searchGoodsList = result.data.records
                        this.pageTotal = result.data.total;
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
        getCatTypes(){
            let params={
                hotelId: this.hotelId,  
                funcId: this.modelTypeObj.modelId,
            }
            this.loading = true;
            this.$api.functionClassifyTree(params).then(response=>{
                this.loading = false;
                if(response.data.code=='0'){
                    this.getTreeData(response.data.data);
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText:"确定"
                    })
                }
            }).catch(error=>{
                    this.$alert(error,"警告",{
                    confirmButtonText:"确定"
                })
            })
        },
        getTreeData(data){
            for(var i=0;i<data.length;i++){
                this.batchData.push({
                    categoryName: data[i].categoryName,
                    id: data[i].id,
                })
                if( data[i].childDtoList && data[i].childDtoList.length ){
                    this.getTreeData(data[i].childDtoList);
                }
            }
        },
        changeModel(){
            this.modelTypeObj.modelId = ''
            if(this.modelTypeObj.modelType){
                if(this.modelTypeObj.modelType == 1){
                    this.getSelectedHotel()
                }else if(this.modelTypeObj.modelType == 2){
                    this.modelList = [{id:-1,label:"客房协议价"}]
                }
            }
        },
        getSelectedHotel(){
            const params = {
                hotelId: this.hotelId,
            }
            this.$api.getCouponFunctionList(params).then(response => {
                if(response.data.code==0){
                    let recordsData = response.data.data;
                    let areaList = recordsData.map(item=>{
                        return {
                            label: item.funcCnName,
                            id: item.id,
                        }
                    })
                    this.modelList = areaList;
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        cancelRed(){
            this.addrednum = ''
            this.dialogVisible = false
        },
        //取消板块添加
        cancelModel(){
            this.modelTypeObj = {
                modelType:'',
                modelName:'',
                modelId:'',
                sort:'',
                goods:'',
                rooms:'',
                bonusAmountFrom:'',
                bonusType:'',
                bonusBaselineType:'',
                redpackBili:'',
            }
            this.dialogVisible1 = false
            this.clearSelectData()
            this.$refs['modelTypeObj'].resetFields();
        },
        //确认添加板块
        ensureAddModel(modelTypeObj) {
            let params = {
                actRedPacketSettingId: this.detailId,
                modelId: this.modelTypeObj.modelId,
                modelType: this.modelTypeObj.modelType,
                modelName: this.modelTypeObj.modelName,
                redPacketRate: this.modelTypeObj.redpackBili,
                redSetType: this.modelTypeObj.bonusType,
                redPacketAmountFrom: this.modelTypeObj.bonusAmountFrom,
            }
            if(params.redSetType == 1){
                params.bonusBaselineType = this.modelTypeObj.bonusBaselineType
            }
            if(params.modelType == 1){
                //功能区
                params.categoryScopeType = this.modelTypeObj.sort
                params.prodScopeType = this.modelTypeObj.goods
                if(params.categoryScopeType == 1){
                    params.categoryScopeList = this.sortBoxs[0]
                    params.categoryScopeDetailList = this.typeChooseList1
                }else if(params.categoryScopeType == 2){
                    params.categoryScopeList = this.sortBoxs[1]
                    params.categoryScopeDetailList = this.typeChooseList2
                }
                if(params.prodScopeType == 1){
                    params.prodScopeList = this.goodsChooseList1.map(item => {
                        return item.id
                    })
                    params.prodScopeDetailList = this.goodsChooseList1
                }else if(params.prodScopeType == 2){
                    params.prodScopeList = this.goodsChooseList2.map(item => {
                        return item.id
                    })
                    params.prodScopeDetailList = this.goodsChooseList2
                }
            }else if(params.modelType == 2){
                //客房协议价
                params.prodScopeType = this.modelTypeObj.rooms
                if(params.prodScopeType == 1){
                    params.prodScopeList = this.roomsChooseList1.map(item => {
                        return item.id
                    })
                    params.prodScopeDetailList = this.roomsChooseList1
                }else if(params.prodScopeType == 2){
                    params.prodScopeList = this.roomsChooseList2.map(item => {
                        return item.id
                    })
                    params.prodScopeDetailList = this.roomsChooseList2
                }
            }
            this.$refs[modelTypeObj].validate((valid) => {
                if (valid) {
                    if(this.modeTitleType == 1){
                        this.$message.success("操作成功")
                        this.modelData.push(params)
                        this.cancelModel()
                    }else if(this.modeTitleType == 2){
                        this.$message.success("操作成功")
                        this.$set(this.modelData,this.chooseModelID,params)
                        this.cancelModel()
                    }
                    this.getModelDataList()
                } else {
                    return false;
                }
            });
        },
        getLinkParm(obj){
            var i = 0 
            var stringLink = ''
            for(var item in obj){
                if(i>0){
                    stringLink += ('&'+item+'='+obj[item])
                }else{
                    stringLink += (item+'='+obj[item])
                }
                i++
            }
            return stringLink

        },
        //确认明细
        ensureRedpack(Commoditygai) {
            let params = {
                actHotelId: this.hotelId,
                minOrderAmount: this.Commoditygai.minOrderNum,
                posterFlag:this.Commoditygai.posterFlag?1:0,
                posterImg:this.Commoditygai.posterImgPath,
                posterQrPx:this.Commoditygai.posterQrPx,
                // posterQrTransparentFlag:this.Commoditygai.posterQrBtFlag?1:0,
                posterQrX:this.Commoditygai.posterQrX,
                posterQrY:this.Commoditygai.posterQrY,
                shareImgType:this.Commoditygai.shareImgType,
                shareMsg:this.Commoditygai.shareMsg,
                adFlag:this.Commoditygai.ifadPage?1:0,
                adLinkFlag:this.Commoditygai.ifadAfterPage?1:0,
            }
            if(params.shareImgType){
                params.shareImgCustomPath = this.Commoditygai.shareImgCustomPath
            }
            if(this.Commoditygai.ifadPage){
                params.hotelAdId = this.Commoditygai.adPage
            }
            if(this.Commoditygai.ifadAfterPage){
                params.hotelAdLinkId = this.Commoditygai.adAfterPage
                if(JSON.stringify(this.modelLink) != '{}'){
                    params.hotelAdLinkParm = this.getLinkParm(this.modelLink)
                }else{
                    params.hotelAdLinkParm = ''
                }
            }
            params.settingLadderDTOS = this.tableData.map(item => {
                return {
                    maxAmount: item.maxRedpackNum=='∞'?-999:item.maxRedpackNum,
                    minAmount: item.minRedpackNum,
                    redPacketCount: item.redpackNum
                }
            }) 
            params.actRedPacketSettingDetailDTOS = this.modelData.map(item => {
                return {
                    actRedPacketSettingId: item.actRedPacketSettingId,
                    bonusBaselineType: item.bonusBaselineType,
                    modelId: item.modelId,
                    modelType: item.modelType,
                    redPacketAmountFrom: item.redPacketAmountFrom,
                    redPacketRate: item.redPacketRate,
                    redSetType: item.redSetType,
                    prodScopeType: item.prodScopeType === undefined?undefined:item.prodScopeType,
                    prodScopeList: item.prodScopeList === undefined?undefined:item.prodScopeList,
                    categoryScopeType: item.categoryScopeType === undefined?undefined:item.categoryScopeType,
                    categoryScopeList: item.categoryScopeList === undefined?undefined:item.categoryScopeList,
                }
            })
            // return
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.resetRedpackModel(params,this.actID)
                        .then(response => {
                            if(response.data.code==0){
                                this.$message.success("操作成功")
                                this.$router.push({name:'LonganActivityList'});
                            }else{
                               this.$alert(response.data.msg,"警告",{
                                    confirmButtonText: "确定"
                               })
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                } else {
                    return false;
                }
            });
        },
        cancelRedpack(){
            this.$router.push({name:'LonganActivityList'});
        },
        changeRedNum(num){
            this.tableData[num].isSet = true
        },
        sureNum(num,value){
            if(!/(^[1-9]([0-9]+)$)|(^[1-9]$)/.test(value)){
                this.$message({
                    message: '请规范填写个数',
                    type: 'warning'
                });
                this.tableData[num].redpackNum = 1
            }
            this.tableData[num].isSet = false
        },
        deleteRedpack(num){
            if(this.tableData.length == 1){
                this.$message.error('至少保留一条数据');
            }else{
                if(this.tableData[num].maxRedpackNum == '∞'){
                    this.tableData[num-1].maxRedpackNum = '∞'
                }else{
                    this.tableData[num+1].minRedpackNum = this.tableData[num].minRedpackNum
                }
                this.tableData.splice(num,1)
            }
        },
        ensureRed(){
            if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(this.addrednum)){
                this.$message({
                    message: '请规范输入红包金额',
                    type: 'warning'
                })
            }else{
                this.tableData.forEach((item,index) => {
                    if(Number(item.minRedpackNum)<Number(this.addrednum) && (Number(item.maxRedpackNum)>Number(this.addrednum)||item.maxRedpackNum=='∞')){
                        let insertObj = {
                            minRedpackNum: item.minRedpackNum,
                            maxRedpackNum: this.addrednum,
                            redpackNum: item.redpackNum,
                            isSet:false
                        }
                        item.minRedpackNum = this.addrednum
                        this.tableData.splice(index,0,insertObj)
                        this.cancelRed()
                    }
                    if(Number(item.minRedpackNum) == Number(this.addrednum) || Number(item.maxRedpackNum) == Number(this.addrednum)){
                        this.$message({
                            message: '已有该红包金额区间，请重新输入其他金额！',
                            type: 'warning'
                        })
                    }
                })
            }
        },
        addRedpack(){
            this.dialogVisible = true
        },
        addModelType(){
            this.dialogVisible1 = true
            this.modeTitleType = 1
        },
        getFillbackData(){
            this.$api.selectActivityOne(this.actID).then(response => {
                if(response.data.code == 0){
                    this.actName = response.data.data.actName
                    this.hotelName = response.data.data.actHotelDTOS[0].hotelName
                    this.actScopeLevel = response.data.data.actScopeLevel?'单店':'平台'
                    this.actBegin = response.data.data.actBegin.split(' ')[0]
                    this.actEnd = response.data.data.actEnd.split(' ')[0]
                    this.actPartInCount = response.data.data.actPartInCount
                    this.actPartInCountType = response.data.data.actPartInCountType
                    let actDetail = response.data.data.actHotelDTOS[0].details[0]
                    this.detailId = actDetail.id
                    this.Commoditygai.minOrderNum = actDetail.minOrderAmount
                    this.Commoditygai.shareMsg = actDetail.shareMsg
                    this.Commoditygai.shareImgType = actDetail.shareImgType
                    this.Commoditygai.posterFlag = actDetail.posterFlag?true:false
                    this.Commoditygai.shareImgCustomPath = actDetail.shareImgCustomPath
                    this.Commoditygai.posterImgPath = actDetail.posterImg
                    this.Commoditygai.posterQrX = actDetail.posterQrX
                    this.Commoditygai.posterQrY = actDetail.posterQrY
                    // this.Commoditygai.posterQrBtFlag = actDetail.posterQrTransparentFlag?true:false
                    this.Commoditygai.posterQrPx = actDetail.posterQrPx
                    this.Commoditygai.adPage = actDetail.hotelAdId
                    this.Commoditygai.ifadPage = actDetail.adFlag?true:false
                    this.Commoditygai.adAfterPage = actDetail.hotelAdLinkId
                    this.Commoditygai.hotelAdLinkParm = actDetail.hotelAdLinkParm
                    if(this.Commoditygai.hotelAdLinkParm){
                        this.spliteLinks(this.Commoditygai.hotelAdLinkParm)
                    }
                    this.Commoditygai.ifadAfterPage = actDetail.adLinkFlag?true:false
                    this.currentLinkId = this.adAfterPageID = actDetail.hotelAdLinkId
                    let isNeedParameter = this.allLinkList.find(item => {
                        return item.id == this.currentLinkId
                    })
                    if(isNeedParameter){
                        if(isNeedParameter.isNeedParameter){
                            this.ifHasParam = true
                            let obj = {}
                            for(var item in this.modelLink){
                                obj[item] = this.modelLink[item]
                            }
                            this.modelLinkCopy = obj
                        }else{
                            this.ifHasParam = false
                        }
                    }
                    if(this.Commoditygai.adAfterPage){
                        this.getParamsData()
                    }
                    if(this.Commoditygai.shareImgType){
                        this.imageList1 = [{
                            name:actDetail.shareImgCustomPath,
                            url:actDetail.shareImgCustomUrl
                        }]
                    }
                    if(this.Commoditygai.posterFlag){
                        this.imageList2 = [{
                            name:actDetail.posterImg,
                            url:actDetail.posterImgUrl
                        }]
                    }
                    this.tableData = actDetail.settingLadderDTOS.map(item => {
                        return {
                            maxRedpackNum: item.maxAmount == -999?'∞':item.maxAmount,
                            minRedpackNum: item.minAmount,
                            redpackNum: item.redPacketCount,
                            isSet: false,
                        }
                    })
                    if(this.actPartInCountType == 0){
                        this.showType = '不限制'
                    }else if(this.actPartInCountType == 1){
                        this.showType = this.actPartInCount + '次/每类型'
                    }else if(this.actPartInCountType == 2){
                        this.showType = this.actPartInCount + '次/每活动'
                    }else if(this.actPartInCountType == 3){
                        this.showType = this.actPartInCount + '次/每天'
                    }else if(this.actPartInCountType == 4){
                        this.showType = this.actPartInCount + '次/每周'
                    }else if(this.actPartInCountType == 5){
                        this.showType = this.actPartInCount + '次/每月'
                    }
                    this.modelData = actDetail.settingDetailDTOS?actDetail.settingDetailDTOS:[]
                    this.getModelDataList()
                    this.getActList(response.data.data.actType)
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
        },
        //获取活动列表
        getActList(type){
            this.$api.basicDataItems({key:'ACTTYPE',orgId:0}).then(response => {
                if(response.data.code==0){
                    this.actType = response.data.data.find(item => {
                        return item.dictValue == type
                    }).dictName
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
         //删除确认
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //图片上传成功
        handleSuccess(res, file, fileList){
            this.Commoditygai.shareImgCustomPath = res.data
        },
        //移除图片
        handleRemove(file, fileList){
            this.Commoditygai.shareImgCustomPath = ''
        },
        //文件超出个数限制时
        handleExceed(file, fileList){
            this.$message.error('图片只能上传1张！')
        },
        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
        },

        //删除确认
        beforeRemove1(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //图片上传成功
        handleSuccess1(res, file, fileList){
            this.Commoditygai.posterImgPath = res.data
        },
        //移除图片
        handleRemove1(file, fileList){
            this.Commoditygai.posterImgPath = ''
        },
        //文件超出个数限制时
        handleExceed1(file, fileList){
            this.$message.error('图片只能上传1张！')
        },
        //图片上传失败
        imgUploadError1(file,fileList){
            this.$message.error('上传图片失败！');
        }
    }
}
</script>

<style lang="less" scoped>
    .hoteladd{
        text-align: left;
        .title{
            font-weight: bold;
        }
        .detail{
            width: 30%;
            font-size: 14px;
            .parts{
                .content{
                    color: #999999;
                }
            }
            .el-divider{
                margin: 10px 0;
            }
        }
        .operate{
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        .wrapper{
            color: #333;
        }
    }
    .pagination{
        text-align: center;
        margin-top: 20px
    }
    .searchHotel{
        text-align: left
    }
    .hotelform{
        width: 960px;
        .el-input,.el-select{width: 225px;}
    }
</style>