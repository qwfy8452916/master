<template>
    <div class="ProdCouponBatchAdd">
         <p class="title">新增优惠券批次</p>
         <el-form label-width="130px" style="width:70%" :model="addCoupondata" ref="addCoupondata" :rules="rules">
            <el-form-item class="textinput" label="批次名称" prop="couponBatchName">
                <el-input v-model="addCoupondata.couponBatchName" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item class="textinput" label="优惠券名称" prop="couponName">
                <el-input v-model="addCoupondata.couponName" maxlength="30"></el-input>
            </el-form-item>
            <!-- <el-form-item label="优惠范围" prop="couponRange">
              <el-radio-group v-model="addCoupondata.couponRange">
                <el-radio label="1">商品</el-radio>
                <el-radio label="2">订房</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="酒店名称" prop="hotelRelationFlag">
                 <el-radio @change="changeHotel" v-model="addCoupondata.hotelRelationFlag" label="0">全部可用</el-radio>
                 <div>
                    <el-radio @change="changeHotel" v-model="addCoupondata.hotelRelationFlag" label="2">指定不可用</el-radio>
                    <el-button v-if="addCoupondata.hotelRelationFlag=='2'" type="text" @click="selectHotel('noUseHotel')">选择酒店</el-button>
                    <el-table v-if="addCoupondata.hotelRelationFlag=='2'" :data="addCoupondata.notUseHotel" border stripe style="width:500px">
                       <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
                       <el-table-column prop="id" label="操作" align="center">
                           <template slot-scope="scope">
                              <el-button type="text" @click="delnouserhotel(scope.$index,scope.row)">删除</el-button>
                           </template>
                       </el-table-column>
                    </el-table>
                 </div>
                 <div>
                    <el-radio @change="changeHotel" v-model="addCoupondata.hotelRelationFlag" label="1">指定多个可以</el-radio>
                    <el-button v-if="addCoupondata.hotelRelationFlag=='1'" type="text" @click="selectHotel('moreUseHoteljud')">选择酒店</el-button>
                    <el-table v-if="addCoupondata.hotelRelationFlag=='1'" :data="addCoupondata.moreUseHotel" border stripe style="width:500px">
                       <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
                       <el-table-column prop="id" label="操作" align="center">
                           <template slot-scope="scope">
                              <el-button type="text" @click="delmoreuserhotel(scope.$index,scope.row)">删除</el-button>
                           </template>
                       </el-table-column>
                    </el-table>
                 </div>
                 <div>
                    <el-radio @change="changeHotel" v-model="addCoupondata.hotelRelationFlag" label="3">指定单个可用</el-radio>
                    <el-form-item v-if="addCoupondata.hotelRelationFlag=='3'" label="酒店名称" prop="hotelObj">
                       <el-select v-model="addCoupondata.hotelObj"  @change = "selectOneHotel"
                       filterable value-key="id">
                          <el-option
                          v-for="item in hotelList"
                          :key="item.id"
                          :label="item.hotelName"
                          :value="item">
                          </el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item v-if="addCoupondata.hotelRelationFlag=='3'" label="板块类型" class="textinput">
                      <el-select :disabled="true" v-model="addCoupondata.couponRange" >
                        <el-option label="功能区" value="1"></el-option>
                        <el-option label="客房协议价" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item v-if="addCoupondata.hotelRelationFlag=='3' && addCoupondata.couponRange == 1" label="板块" prop="funcRelationFlag">
                       <el-radio @change="changeFunct" v-model="addCoupondata.funcRelationFlag" label="0">全部可用</el-radio>
                       <div>
                          <el-radio @change="changeFunct" v-model="addCoupondata.funcRelationFlag" label="1">指定可用</el-radio>
                          <el-button v-if="addCoupondata.funcRelationFlag=='1'" type="text" @click="selectFunct('UseFunct')">选择功能区</el-button>
                          <el-table v-if="addCoupondata.funcRelationFlag=='1'" :data="addCoupondata.useFuncData" border stripe style="width:90%">
                              <el-table-column prop="funcCnName" label="功能区" align="center"></el-table-column>
                              <el-table-column prop="id" label="分类" align="center">
                                  <template slot-scope="scope">
                                      <span v-for="(item,key) in scope.row.getTypeData" :key="key">{{item.categoryName}}、</span>
                                  </template>
                              </el-table-column>
                              <el-table-column prop="id" label="选择分类" align="center">
                                 <template slot-scope="scope">
                                    <el-button type="text" @click="selectClass(scope.$index,scope.row)">指定分类</el-button>
                                 </template>
                              </el-table-column>
                              <el-table-column prop="id" label="操作" align="center">
                                 <template slot-scope="scope">
                                    <el-button type="text" @click="deluserFun(scope.$index,scope.row)">删除</el-button>
                                 </template>
                              </el-table-column>
                          </el-table>
                       </div>
                       <div>
                          <el-radio @change="changeFunct" v-model="addCoupondata.funcRelationFlag" label="2">指定不可用</el-radio>
                          <el-button v-if="addCoupondata.funcRelationFlag=='2'" type="text" @click="selectFunct('noUseFunct')">选择功能区</el-button>
                          <el-table v-if="addCoupondata.funcRelationFlag=='2'" :data="addCoupondata.notUseFuncData" border stripe style="width:70%">
                              <el-table-column prop="funcCnName" label="功能区" align="center"></el-table-column>
                              <el-table-column prop="id" label="操作" align="center">
                                 <template slot-scope="scope">
                                    <el-button type="text" @click="delnotuserFun(scope.$index,scope.row)">删除</el-button>
                                 </template>
                              </el-table-column>
                          </el-table>
                       </div>
                    </el-form-item>
                    <el-form-item v-if="addCoupondata.hotelRelationFlag=='3' && addCoupondata.couponRange == 1" label="商品名称" prop="hotelProdRelationFlag" style="margin-top:10px">
                         <el-radio @change="changeProd" v-model="addCoupondata.hotelProdRelationFlag" label="0">全部可用</el-radio>
                         <div>
                            <el-radio @change="changeProd" v-model="addCoupondata.hotelProdRelationFlag" label="1">指定可用</el-radio>
                            <el-button v-if="addCoupondata.hotelProdRelationFlag=='1'" type="text" @click="selectProd('UseProd')">选择商品</el-button>
                            <el-table v-if="addCoupondata.hotelProdRelationFlag=='1'" :data="addCoupondata.useProductdata" border stripe style="width:100%">
                               <el-table-column prop="prodKindName" label="商品类型" align="center"></el-table-column>
                               <el-table-column prop="prodOwnerOrgName" label="商品所属组织" align="center"></el-table-column>
                               <el-table-column prop="prodProductDTO" label="商品名称" align="center">
                                   <template slot-scope="scope">
                                      <span>{{scope.row.prodProductDTO.prodName}}</span>
                                  </template>
                               </el-table-column>
                               <el-table-column prop="prodShowName" label="商品显示名称" align="center"></el-table-column>
                               <el-table-column prop="" label="操作" align="center">
                                  <template slot-scope="scope">
                                      <el-button type="text" @click="deluserProd(scope.$index,scope.row)">删除</el-button>
                                  </template>
                               </el-table-column>
                            </el-table>
                         </div>
                         <div>
                            <el-radio @change="changeProd" v-model="addCoupondata.hotelProdRelationFlag" label="2">指定不可用</el-radio>
                            <el-button v-if="addCoupondata.hotelProdRelationFlag=='2'" type="text" @click="selectProd('noUseProd')">选择商品</el-button>
                            <el-table v-if="addCoupondata.hotelProdRelationFlag=='2'" :data="addCoupondata.notUseProductdata" border stripe style="width:100%">
                               <el-table-column prop="prodKindName" label="商品类型" align="center"></el-table-column>
                               <el-table-column prop="prodOwnerOrgName" label="商品所属组织" align="center"></el-table-column>
                               <el-table-column prop="prodProductDTO" label="商品名称" align="center">
                                  <template slot-scope="scope">
                                    <span>{{scope.row.prodProductDTO.prodName}}</span>
                                  </template>
                               </el-table-column>
                               <el-table-column prop="prodShowName" label="商品显示名称" align="center"></el-table-column>
                               <el-table-column prop="" label="操作" align="center">
                                  <template slot-scope="scope">
                                      <el-button type="text" @click="delnouserProd(scope.$index,scope.row)">删除</el-button>
                                  </template>
                               </el-table-column>
                            </el-table>
                         </div>
                    </el-form-item>
                    <el-form-item v-if="addCoupondata.hotelRelationFlag=='3' && addCoupondata.couponRange == 2" label="板块">客房协议价</el-form-item>
                    <el-form-item v-if="addCoupondata.hotelRelationFlag=='3' && addCoupondata.couponRange == 2" label="房源" prop="roomResourceRelationFlag" style="margin-top:10px"  >
                      <el-radio @change="changeResource" v-model="addCoupondata.roomResourceRelationFlag" label="0">全部可用</el-radio>
                      <div>
                        <el-radio @change="changeResource" v-model="addCoupondata.roomResourceRelationFlag" label="1">指定可用</el-radio>
                        <el-button v-if="addCoupondata.roomResourceRelationFlag=='1'" type="text" @click="selectResource('UseResource')" >选择房源</el-button>
                        <el-table v-if="addCoupondata.roomResourceRelationFlag=='1'" :data="addCoupondata.useResourcedata" border stripe style="width:100%" >
                          <el-table-column prop="roomTypeName" label="房型名称"></el-table-column>
                          <el-table-column prop="resourceName" label="房源名称"></el-table-column>
                          <el-table-column prop="roomCount" label="房量" align="center"></el-table-column>
                          <el-table-column prop="basicPrice" label="基础价格" align="center"></el-table-column>
                          <el-table-column prop label="操作" align="center">
                            <template slot-scope="scope">
                              <el-button type="text" @click="deluserResource(scope.$index,scope.row)">删除</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                      <div>
                        <el-radio @change="changeResource" v-model="addCoupondata.roomResourceRelationFlag" label="2">指定不可用</el-radio>
                        <el-button v-if="addCoupondata.roomResourceRelationFlag=='2'" type="text" @click="selectResource('noUseResource')">选择房源</el-button>
                        <el-table v-if="addCoupondata.roomResourceRelationFlag=='2'" :data="addCoupondata.notUseResourcedata" border stripe style="width:100%">
                          <el-table-column prop="roomTypeName" label="房型名称"></el-table-column>
                          <el-table-column prop="resourceName" label="房源名称"></el-table-column>
                          <el-table-column prop="roomCount" label="房量" align="center"></el-table-column>
                          <el-table-column prop="basicPrice" label="基础价格" align="center"></el-table-column>
                          <el-table-column prop label="操作" align="center">
                            <template slot-scope="scope">
                              <el-button type="text" @click="delnouserResource(scope.$index,scope.row)">删除</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </el-form-item>
                 </div>
            </el-form-item>
            <el-form-item label="场景" prop="sceneCodes">
               <el-select class="scene" multiple collapse-tags v-model="addCoupondata.sceneCodes" placeholder="请选择">
                   <el-option
                   v-for="item in sceneList"
                   :key="item.dictValue"
                   :label="item.dictName"
                   :value="item.dictValue"
                   ></el-option>
               </el-select>
            </el-form-item>

            <!-- <el-form-item label="选择分组" prop="couponLimit"> -->
                <!-- <el-radio @change="changecouponLimit" v-model="addCoupondata.couponLimit" label="0">唯一券</el-radio> -->
                <!-- <div> -->
                   <!-- <el-radio @change="changecouponLimit" v-model="addCoupondata.couponLimit" label="1">分组券</el-radio> -->
                   <el-form-item label="选择分组" prop="groupId">
                       <el-select v-model="addCoupondata.groupId" filterable>
                            <el-option
                            v-for="item in groupList"
                            :key="item.id"
                            :value="item.id"
                            :label="item.groupName"
                            ></el-option>
                       </el-select>
                       <el-button style="margin-left:10px;" type="primary" @click="newAddGroup">新建分组</el-button>
                   </el-form-item>
                <!-- </div> -->
            <!-- </el-form-item> -->
            <el-form-item label="优惠方式" prop="discountWay">
              <el-radio-group v-model="addCoupondata.discountWay">
                <el-radio label="1">满减券</el-radio>
                <el-radio label="2">折扣券</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="addCoupondata.discountWay == 1" label="使用门槛" prop="useLimitMoney">
                满 <el-input v-model="addCoupondata.useLimitMoney" placeholder="使用门槛需高于金额" style="width:334px;margin-right:5px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>元
            </el-form-item>
            <el-form-item v-if="addCoupondata.discountWay == 1" label="优惠券金额" prop="reduceMoney">
                <el-input v-model="addCoupondata.reduceMoney" placeholder="请输入优惠券金额" style="width:349px;margin-right:5px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>元
            </el-form-item>
            <el-form-item v-if="addCoupondata.discountWay == 2" prop="couponDiscount">
                <span slot="label"><label class="required-icon">*</label> 折扣</span>
                <el-input v-model="addCoupondata.couponDiscount" maxlength="10" placeholder="请输入折扣" style="width:349px;margin-right:5px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>%
            </el-form-item>
            <el-form-item v-if="addCoupondata.discountWay == 2" label="封顶金额" prop="discountMaxMoney">
                <el-input v-model="addCoupondata.discountMaxMoney" maxlength="10" placeholder="请输入封顶金额" style="width:349px;margin-right:5px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>元
            </el-form-item>
            <el-form-item v-if="addCoupondata.discountWay == 2" label="最低消费金额" prop="discountMinBuyMoney">
                <el-input v-model="addCoupondata.discountMinBuyMoney" maxlength="10" placeholder="请输入最低消费金额" style="width:349px;margin-right:5px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>元
            </el-form-item>
            <el-form-item label="领取/发放有效期" prop="batchTime">
                 <el-date-picker
                  @change="getdatetime"
                  v-model="addCoupondata.batchTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions0">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="使用有效期" prop="couponTermType">
               <div>
                <el-radio @change="changecouponTermType" v-model="addCoupondata.couponTermType" label="0">领取后</el-radio>
                <el-form-item v-if="addCoupondata.couponTermType==='0'" prop="couponTermAfterDay" class="couponTermType">
                  <el-select v-model="addCoupondata.couponTermAfterDay">
                    <el-option label="即时" value="1"></el-option>
                    <el-option label="第二天" value="2"></el-option>
                    <el-option label="第三天" value="3"></el-option>
                    <el-option label="第四天" value="4"></el-option>
                    <el-option label="第五天" value="5"></el-option>
                    <el-option label="第六天" value="6"></el-option>
                    <el-option label="第七天" value="7"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="addCoupondata.couponTermType==='0'" prop="couponTermDays" class="couponTermType">
                  <el-input v-model.number="addCoupondata.couponTermDays"></el-input> 天内有效
                </el-form-item>
              </div>
               <div style="margin-top:10px;">
                  <el-radio @change="changecouponTermType" v-model="addCoupondata.couponTermType" label="1">固定日期</el-radio>
                  <el-form-item class="couponTermType" v-if="addCoupondata.couponTermType=='1'" prop="couponTermDate">
                         <el-date-picker
                          v-model="addCoupondata.couponTermDate"
                          type="daterange"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="过期日期"
                          :picker-options="pickerOptions0">
                        </el-date-picker>
                  </el-form-item>
               </div>
            </el-form-item>
            <el-form-item label="领取/发放限制">
               <el-checkbox @change="changecanDraw" v-model="addCoupondata.canDraw" true-label="1" false-label="0">可领取</el-checkbox>
               <el-form-item prop="drawWays">
                   <span slot="label"><label class="required-icon">*</label> 领取渠道</span>
                   <el-select multiple collapse-tags v-model="addCoupondata.drawWays" :disabled="addCoupondata.canDraw!='1'">
                      <el-option
                      v-for="item in drawWaysList"
                      :key="item.dictValue"
                      :label="item.dictName"
                      :value="item.dictValue"
                      ></el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="领取总数量" style="margin-top:20px;" prop="drawCountTotal">
                   <el-input :disabled="addCoupondata.canDraw!='1'" v-model.number="addCoupondata.drawCountTotal" style="width:218px;margin-right:5px"></el-input>张
               </el-form-item>
               <el-form-item label="每人领取数量" style="margin-top:20px;" prop="drawCountPerUser">
                   <el-input :disabled="addCoupondata.canDraw!='1'" v-model.number="addCoupondata.drawCountPerUser" style="width:218px;margin-right:5px"></el-input>张
               </el-form-item>
               <el-checkbox @change="changecanGive" v-model="addCoupondata.canGive" true-label="1" false-label="0">可发放</el-checkbox>
               <el-form-item label="发放总数量" style="margin-top:20px;" prop="giveCountTotal">
                   <el-input :disabled="addCoupondata.canGive!='1'" v-model.number="addCoupondata.giveCountTotal" style="width:218px;margin-right:5px"></el-input>张
               </el-form-item>
               <el-form-item label="每人发放数量" style="margin-top:20px;" prop="giveCountPerUser">
                   <el-input :disabled="addCoupondata.canGive!='1'" v-model.number="addCoupondata.giveCountPerUser"  style="width:218px;margin-right:5px"></el-input>张
               </el-form-item>
            </el-form-item>
            <el-form-item label="可售卖" prop="canSell">
              <el-switch v-model="addCoupondata.canSell"></el-switch>
            </el-form-item>
            <el-form-item label="可发送" prop="canGift">
              <el-switch v-model="addCoupondata.canGift"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="cancelBtn">取 消</el-button>
                <el-button v-if="authzData['F:BO_COUPON_OPERBATCH_ADDSUBMIT']" type="primary" @click="sureBtn('addCoupondata')">确 定</el-button>
            </el-form-item>
         </el-form>
         <coupondialog ref="mydialog" @sondatamethod="sondatamethod" :addCoupondata="addCoupondata" @getAppointGroup="getAppointGroup"></coupondialog>
    </div>
</template>

<script>
import coupondialog from '@/components/LonganCoupondia'
export default {
    name:"LonganProdCouponBatchAdd",
    components:{
      coupondialog,
    },
    data(){
        var ValiduseLimitMoney = (rule,value,callback) => {
            // console.log(this.addCoupondata.useLimitMoney)
            // console.log(this.addCoupondata.reduceMoney)
            if(this.addCoupondata.useLimitMoney<=0 || this.addCoupondata.useLimitMoney=='' || parseInt(this.addCoupondata.useLimitMoney)<parseInt(this.addCoupondata.reduceMoney)){
                // console.log("走")
                callback(new Error('11'))
            }else{
                callback()
            }
        }
        var ValidreduceMoney = (rule,value,callback) => {
            if(this.addCoupondata.reduceMoney<=0 || this.addCoupondata.reduceMoney=='' || parseInt(this.addCoupondata.useLimitMoney)<parseInt(this.addCoupondata.reduceMoney)){
                callback(new Error('11'))
            }else{
                callback()
            }
        }
      return {
          authzData:'',
          couponType:'', //优惠券类型
          hotelList:[],  //单个酒店列表
          sceneList:[],
          groupList:[],
          drawWaysList:[],
          addCoupondata:{
            couponBatchName:"",  //批次名称
            couponName:"", //优惠券名称
            couponRange: "1", //优惠范围
            hotelRelationFlag:'', //酒店是否可用
            hotelObj:'', //选择酒店对象
            singleHotelId:'',  //单个酒店id
            hotelName:"",  //单个酒店名称
            funcRelationFlag:'',  //功能区是否可用
            hotelProdRelationFlag:'',  //商品名称是否可用
            roomResourceRelationFlag: "", //房源名称是否可用
            // couponLimit:'',  //选择类型
            groupId:'', //选择分组
            discountWay: "1",   //优惠方式 1:满减券 2:折扣券
            useLimitMoney:'', //使用限制金额
            reduceMoney:'', //优惠券金额
            couponDiscount: "",   //折扣
            discountMaxMoney: 0,   //封顶金额
            discountMinBuyMoney: 0,   //最低消费金额
            batchTime:[], //领取/发放有效期
            couponTermType:'', //使用期限类型
            couponTermDate:[], //使用期限的起始时间
            couponTermAfterDay: "1", //领取后几天起有效
            couponTermDays:'', //领取后使用的限定天数
            canDraw:null,  //是否可以领取
            drawWays:[], //领取渠道
            drawCountTotal:0, //可领取总数量
            drawCountPerUser:0, //每人可领取数量
            canGive:'1', //是否可以发放
            giveCountTotal:0, //可发放总数量
            giveCountPerUser:0, //每人发放数量
            canSell: false,   //是否可售卖
            canGift: false,   //是否可发送

            funcId:'',  //获取分类的功能区id
            getTypeData:[],  //选中的分类数据
            categoryIds:[], //选中的分类id数据
            selectClassIndex:null, //选择分类当前索引
            sceneCodes:[],  //选择场景
            // groupName:'',  //新建 分组名称
            // groupOwnerOrgKind:'',  //新建 分组类型

            notUseHotel:[], //指定酒店不可用
            moreUseHotel:[],  //指定多个酒店可以
            HotelIds:[], //传递酒店id

            useFuncData:[],  //指定可用功能区
            notUseFuncData:[], //指定不可用功能区
            checkedkeysData:[], //选中的市场分类
            sendFunctionData:[], //传递的功能区数据

            HotelProductdata:[],  //传递的酒店商品数据
            useProductdata:[],  //指定可用商品
            notUseProductdata:[], //指定不可用商品

            HotelResourcedata: [], //传递的酒店房源数据
            useResourcedata: [], //指定可用房源
            notUseResourcedata: [], //指定不可用房源
         },
         rules:{
             couponBatchName:{required:true,message:"请输入批次名称",trigger:'blur'},
             couponName:{required:true,message:"请输入优惠券名称",trigger:'blur'},
             couponRange: {required: true,message: "请选择优惠范围",trigger: "change"},
             hotelRelationFlag:{required:true,message:"请选择使用的酒店范围",trigger:'change'},
             funcRelationFlag:{required:true,message:"请选择使用的功能区范围",trigger:'change'},
             hotelProdRelationFlag:{required:true,message:"请选择使用的商品范围",trigger:'change'},
             roomResourceRelationFlag: {required: true,message: "请选择使用的房源范围",trigger: "change"},
             groupId:{required:true,message:"请选择优惠券分组",trigger:'change'},
            //  useLimitMoney:{required:true,validator:ValiduseLimitMoney,message:"请填写正确的优惠券使用门槛金额",trigger:'blur'},
            //  reduceMoney:{required:true,validator:ValidreduceMoney,message:"请填写正确的优惠券金额",trigger:'blur'},
             discountWay: {required: true, message: "请选择优惠方式",trigger: "change"},
             batchTime:{required:true,message:"请选择领取/发放有效期",trigger:'change'},
             couponTermType:{required:true,message:"请选择使用有效期方式",trigger:'change'},
             couponTermDays:{required:true,min:1,type:'number',message:"请填写领取后天数",trigger:'blur'},
             couponTermDate:{required:true,message:"请选择优惠券使用的固定日期",trigger:'change'},
             drawCountTotal:{required:true,min:0,type:'number',message:"请填写领取总数量",trigger:'blur'},
             drawCountPerUser:{required:true,min:0,type:'number',message:"请填写每人领取数量",trigger:'blur'},
             giveCountTotal:{required:true,min:0,type:'number',message:"请填写发放总数量",trigger:'blur'},
             giveCountPerUser:{required:true,min:0,type:'number',message:"请填写每人发放数量",trigger:'blur'},
             hotelObj:{required:true,message:"请选择酒店名",trigger:'change'},
             groupName:{required:true,message:"请输入分组名称",trigger:'blur'},
         },
         pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
         }
        },


      }
    },
    mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
      this.getHotelList();
      this.getsceneList();
      this.getdrawWaysList();
      this.getAppointGroup();
    },
    methods:{
        //指定单个酒店可用
        selectOneHotel(e){
          this.addCoupondata.singleHotelId=e.id;
          this.addCoupondata.hotelName = e.hotelName;
        },
        //获取酒店数据
        sondatamethod(e){
          if(e.hoteldialogjudge=='noUseHotel'){
              this.addCoupondata.notUseHotel=e.selectHotelData
              this.addCoupondata.HotelIds=e.selectHotelData.map(item=>{
                 return item.id;
              })
          }else if(e.hoteldialogjudge=='moreUseHoteljud'){
              this.addCoupondata.moreUseHotel=e.selectHotelData;
              this.addCoupondata.HotelIds=e.selectHotelData.map(item=>{
                 return item.id;
              })
          }else if(e.functdialogjudge=='UseFunct'){
              this.addCoupondata.useFuncData=e.selectFunctData

              this.$forceUpdate();
          }else if(e.functdialogjudge=='noUseFunct'){
              this.addCoupondata.notUseFuncData=e.selectFunctData

              this.$forceUpdate();
          }else if(e.typedialogjudge=='typeClass'){
              this.addCoupondata.getTypeData=e.getTypedata;
              this.addCoupondata.categoryIds=e.getTypekey;
              this.addCoupondata.useFuncData[this.selectClassIndex].getTypeData=e.getTypedata;
              this.addCoupondata.useFuncData[this.selectClassIndex].categoryIds=e.getTypekey;

          }else if(e.proddialogjudge=='UseProd'){
              this.addCoupondata.useProductdata=e.selectProdData;
              this.addCoupondata.HotelProductdata=e.selectProdData.map(item=>{
                return {
                   hotelProdId:item.id,
                   prodCode:item.prodCode
                }
              })
          }else if(e.proddialogjudge=='noUseProd'){
              this.addCoupondata.notUseProductdata=e.selectProdData;
              this.addCoupondata.HotelProductdata=e.selectProdData.map(item=>{
                return {
                   hotelProdId:item.id,
                   prodCode:item.prodCode
                }
              })
          }else if (e.resourcedialogjudge == "UseResource") {
            this.addCoupondata.useResourcedata = e.selectResourceData;
            this.addCoupondata.HotelResourcedata = e.selectResourceData.map(item => {
              return {
                roomResourceId: item.id,
              };
            });
          } else if (e.resourcedialogjudge == "noUseResource") {
            this.addCoupondata.notUseResourcedata = e.selectResourceData;
            this.addCoupondata.HotelResourcedata = e.selectResourceData.map(item => {
              return {
                roomResourceId: item.id,
              };
            });
          }

        },

        //取消
        cancelBtn(){
          this.$router.push({name:"LonganProdCouponBatch"})
        },
        //确定
        sureBtn(addCoupondata){
          let that=this;
          if(this.addCoupondata.hotelRelationFlag=='1' || this.addCoupondata.hotelRelationFlag=='2'){
              if(this.addCoupondata.HotelIds.length<=0){
                 this.$message.error("请选择酒店")
                 return false;
              }
          }
          if(this.addCoupondata.useFuncData.length>0){
               this.addCoupondata.sendFunctionData=this.addCoupondata.useFuncData.map(item=>{
                 return {
                    funcId:item.id,
                    categoryIds:item.categoryIds,
                 }
              })
          }else if(this.addCoupondata.notUseFuncData.length>0){
               this.addCoupondata.sendFunctionData=this.addCoupondata.notUseFuncData.map(item=>{
                 return {
                    funcId:item.id,
                    categoryIds:item.categoryIds,
                 }
              })
          }else{
              this.addCoupondata.sendFunctionData=[];
          }
          if(this.addCoupondata.couponTermType=='0' && this.addCoupondata.couponTermDays=='0'){
              this.$message.error("领取后天数不能为0")
              return false;
          }
          if(this.addCoupondata.discountMaxMoney != ""){
            this.addCoupondata.discountMaxMoney = parseFloat(this.addCoupondata.discountMaxMoney).toFixed(2);
          }else{
            this.addCoupondata.discountMaxMoney = 0;
          }
          if(this.addCoupondata.discountMinBuyMoney != ""){
            this.addCoupondata.discountMinBuyMoney = parseFloat(this.addCoupondata.discountMinBuyMoney).toFixed(2);
          }else{
            this.addCoupondata.discountMinBuyMoney = 0;
          }
          if(this.addCoupondata.canDraw == '1'){
            if(this.addCoupondata.drawWays.length == 0){
              this.$message.error("请选择领取渠道");
              return false;
            }
          }
          let params={
             couponOwnerOrgKind:2,
             couponType:1,
             couponBatchName:this.addCoupondata.couponBatchName,
             couponName:this.addCoupondata.couponName,
             couponRange: this.addCoupondata.couponRange,
             hotelRelationFlag:this.addCoupondata.hotelRelationFlag,
             sceneCodes:this.addCoupondata.sceneCodes,
             couponLimit:1,
             groupId:this.addCoupondata.groupId,
             discountWay: this.addCoupondata.discountWay,
             useLimitMoney:this.addCoupondata.useLimitMoney,
             reduceMoney:this.addCoupondata.reduceMoney,
             couponDiscount: this.addCoupondata.couponDiscount,
             discountMaxMoney: this.addCoupondata.discountMaxMoney,
             discountMinBuyMoney: this.addCoupondata.discountMinBuyMoney,
             batchStartTime:this.addCoupondata.batchTime[0],
             batchEndTime:this.addCoupondata.batchTime[1],
             couponTermType:this.addCoupondata.couponTermType,
             couponTermAfterDay: this.addCoupondata.couponTermAfterDay,
             couponTermDays:this.addCoupondata.couponTermDays,
             couponTermStartDate:this.addCoupondata.couponTermDate[0],
             couponTermEndDate:this.addCoupondata.couponTermDate[1],
             canDraw:this.addCoupondata.canDraw,
             drawWays:this.addCoupondata.drawWays,
             drawCountTotal:this.addCoupondata.drawCountTotal,
             drawCountPerUser:this.addCoupondata.drawCountPerUser,
             canGive:this.addCoupondata.canGive,
             giveCountTotal:this.addCoupondata.giveCountTotal,
             giveCountPerUser:this.addCoupondata.giveCountPerUser,
             canSell: that.switchFunc(this.addCoupondata.canSell),
             canGift: that.switchFunc(this.addCoupondata.canGift),
             hotelIds:this.addCoupondata.HotelIds,
             batchHotelRelation:{
                hotelId:this.addCoupondata.singleHotelId,
                funcRelationFlag:this.addCoupondata.funcRelationFlag,
                hotelProdRelationFlag:this.addCoupondata.hotelProdRelationFlag,
                batchHotelFuncRelations:this.addCoupondata.sendFunctionData,
                batchHotelProdRelations:this.addCoupondata.HotelProductdata,
                roomResourceRelationFlag: this.addCoupondata.roomResourceRelationFlag,
                batchRoomResourceRelations: this.addCoupondata.HotelResourcedata,
             },
          };
          this.$refs[addCoupondata].validate((valid,model)=>{
            if(valid){
              if(this.addCoupondata.funcRelationFlag=='1' || this.addCoupondata.funcRelationFlag=='2'){
                  if(this.addCoupondata.sendFunctionData.length<=0){
                    this.$message.error("请选择功能区")
                    return false;
                  }
              }

              if(this.addCoupondata.hotelProdRelationFlag=='1' || this.addCoupondata.hotelProdRelationFlag=='2') {
                  if(this.addCoupondata.HotelProductdata.length<=0){
                    this.$message.error("请选择商品")
                    return false;
                  }
               }
               if ( this.addCoupondata.roomResourceRelationFlag == "1" || this.addCoupondata.roomResourceRelationFlag == "2" ) {
                if (this.addCoupondata.HotelResourcedata.length <= 0) {
                  this.$message.error("请选择房源");
                  return false;
                }
              }
              if(this.addCoupondata.discountWay == "2"){
                if(this.addCoupondata.couponDiscount == ""){
                  this.$message.error("请输入折扣");
                  return false;
                }
              }
               this.$api.addCouponBatch(params)
                .then(response=>{
                  if(response.data.code=='0'){
                      that.$message.success("操作成功")
                      that.$router.push({name:"LonganProdCouponBatch"})
                  }else{
                      this.$message.error(result.msg);
                  }
                }).catch(error=>{
                  that.$alert(error,"警告",{
                    confirmButtonText:"确定"
                  })
                })
            }else{
               console.log("error")
            }
          })
        },
        //switch转换
        switchFunc(val){
            if(val){ return 1 }else{ return 0 }
        },
        //单选按钮选中酒店
        changeHotel(e){
          if(e=='0'){
            this.addCoupondata.hotelObj="";
            this.addCoupondata.notUseHotel=[];
            this.addCoupondata.moreUseHotel=[];
            this.addCoupondata.HotelIds=[];
            this.addCoupondata.singleHotelId='';
            this.addCoupondata.funcRelationFlag='';
            this.addCoupondata.useFuncData=[];
            this.addCoupondata.notUseFuncData=[];
            this.addCoupondata.hotelProdRelationFlag="";
            this.addCoupondata.roomResourceRelationFlag = "";
            this.addCoupondata.useProductdata = [];
            this.addCoupondata.useResourcedata = [];
            this.addCoupondata.notUseProductdata = [];
            this.addCoupondata.notUseResourcedata = [];
            this.addCoupondata.HotelProductdata = [];
            this.addCoupondata.HotelResourcedata = [];
          }else if(e=='1'){
            this.addCoupondata.hotelObj="";
            this.addCoupondata.notUseHotel=[];
            this.addCoupondata.singleHotelId='';
            this.addCoupondata.funcRelationFlag='';
            this.addCoupondata.useFuncData=[];
            this.addCoupondata.notUseFuncData=[];
            this.addCoupondata.hotelProdRelationFlag="";
            this.addCoupondata.roomResourceRelationFlag = "";
            this.addCoupondata.useProductdata = [];
            this.addCoupondata.useResourcedata = [];
            this.addCoupondata.notUseProductdata = [];
            this.addCoupondata.notUseResourcedata = [];
          }else if(e=='2'){
            this.addCoupondata.hotelObj="";
            this.addCoupondata.moreUseHotel=[];
            this.addCoupondata.singleHotelId='';
            this.addCoupondata.funcRelationFlag='';
            this.addCoupondata.useFuncData=[];
            this.addCoupondata.notUseFuncData=[];
            this.addCoupondata.hotelProdRelationFlag="";
            this.addCoupondata.roomResourceRelationFlag = "";
            this.addCoupondata.useProductdata = [];
            this.addCoupondata.useResourcedata = [];
            this.addCoupondata.notUseProductdata = [];
            this.addCoupondata.notUseResourcedata = [];
          }else if(e=='3'){
            this.addCoupondata.hotelObj="";
            this.addCoupondata.singleHotelId='';
            this.addCoupondata.funcRelationFlag='';
            this.addCoupondata.useFuncData=[];
            this.addCoupondata.notUseFuncData=[];
            this.addCoupondata.hotelProdRelationFlag="";
            this.addCoupondata.roomResourceRelationFlag = "";
            this.addCoupondata.useProductdata = [];
            this.addCoupondata.useResourcedata = [];
            this.addCoupondata.notUseProductdata = [];
            this.addCoupondata.notUseResourcedata = [];
          }
        },
        //单选按钮选中功能区
        changeFunct(e){
          if(e=='0'){
            this.addCoupondata.useFuncData=[];
            this.addCoupondata.notUseFuncData=[];
          }else if(e=='1'){
            this.addCoupondata.notUseFuncData=[];
          }else if(e=='2'){
            this.addCoupondata.useFuncData=[];
          }
        },
        //单选按钮选中酒店商品
        changeProd(e){
          if(e=='0'){
            this.addCoupondata.useProductdata=[];
            this.addCoupondata.notUseProductdata=[];
            this.addCoupondata.HotelProductdata=[];
          }else if(e=='1'){
            this.addCoupondata.notUseProductdata=[];
          }else if(e=='2'){
            this.addCoupondata.useProductdata=[];
          }
        },
        //单选按钮选中酒店房源
        changeResource(e){
          if (e == "0") {
            this.addCoupondata.useResourcedata = [];
            this.addCoupondata.notUseResourcedata = [];
            this.addCoupondata.HotelResourcedata = [];
          } else if (e == "1") {
            this.addCoupondata.notUseResourcedata = [];
          } else if (e == "2") {
            this.addCoupondata.useResourcedata = [];
          }
        },
        //选择类型
        changecouponLimit(e){
           if(e==='0'){
             this.addCoupondata.groupId='';
           }
        },
        //选择使用有效期
        changecouponTermType(e){
          if(e=='0'){
            this.addCoupondata.couponTermDate=[];
          }else if(e=='1'){
            this.addCoupondata.couponTermDays="";
          }
        },
        //领取发放——可领取
        changecanDraw(e){
          if(e!='1'){
            this.addCoupondata.drawWays=[];
            this.addCoupondata.drawCountTotal=0;
            this.addCoupondata.drawCountPerUser=0;
          }
        },
        //领取发放——可发放
        changecanGive(e){
          if(e!='1'){
            this.addCoupondata.giveCountTotal=0;
            this.addCoupondata.giveCountPerUser=0;
          }
        },
        //选择酒店
        selectHotel(e){
          this.$refs.mydialog.showdialog(e);
        },
        //选择功能区
        selectFunct(e){
          if(this.addCoupondata.singleHotelId===''){
            this.$message.error("请选择酒店");
            return false;
          }
          this.$refs.mydialog.functshowdialog(e);
        },
        //选择商品
        selectProd(e){
           if(this.addCoupondata.singleHotelId===''){
            this.$message.error("请选择酒店");
            return false;
          }
          this.$refs.mydialog.prodshowdialog(e);
        },
        //选择房源
        selectResource(e){
          if (this.addCoupondata.singleHotelId === "") {
            this.$message.error("请选择酒店");
            return false;
          }
          this.$refs.mydialog.resourceshowdialog(e);
        },
        //删除不能使用酒店
        delnouserhotel(index,row){
          let that=this;
          this.addCoupondata.notUseHotel.splice(index,1)
        },
        //删除多个可以
        delmoreuserhotel(index,row){
          let that=this;
          this.addCoupondata.moreUseHotel.splice(index,1)
        },
        //删除可用功能区
        deluserFun(index,row){
          let that=this;
          this.addCoupondata.useFuncData.splice(index,1)
        },
        //可用功能区选择指定分类
        selectClass(index,row){
          let that=this;
          this.selectClassIndex=index;
          this.addCoupondata.funcId=row.id;
          //获取当前弹窗选中的分类id
          this.addCoupondata.checkedkeysData=this.addCoupondata.useFuncData[index].categoryIds
          this.$refs.mydialog.Classifyshowdialog();
        },
        //删除不可用功能区
        delnotuserFun(index,row){
          let that=this;
          this.addCoupondata.notUseFuncData.splice(index,1);

        },
        //删除可用商品
        deluserProd(index,row){
          let that=this;
          this.addCoupondata.useProductdata.splice(index,1)
        },
        //删除不可用商品
        delnouserProd(index,row){
          let that=this;
          this.addCoupondata.notUseProductdata.splice(index,1)
        },
        //删除可用房源
        deluserResource(index, row) {
          let that = this;
          this.addCoupondata.useResourcedata.splice(index, 1);
        },
        //删除不可用房源
        delnouserResource(index, row) {
          let that = this;
          this.addCoupondata.notUseResourcedata.splice(index, 1);
        },
        //酒店列表
        getHotelList(){
            let that=this;
            this.loadingH = true;
            const params = {
                hotelName:'',
                orgAs:2
            };
            this.$api.getAppointHotel({params})
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName,
                                isSelect:false,
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
          //新建分组
          newAddGroup(){
            this.$refs.mydialog.addGroupshowdialog();
          },
          //场景列表
          getsceneList(){
            let that=this;
            // this.loadingH = true;
            const params = {
                key:'COUPON_SCENE',
                orgId:'0'
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;

                    if(result.code == 0){
                        this.sceneList = result.data.map(item => {
                            return{
                               dictName:item.dictName,
                               dictValue:item.dictValue,
                               id:item.dictValue
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
          //渠道列表
          getdrawWaysList(){
            let that=this;
            // this.loadingH = true;
            const params = {
                key:'DRAW_WAY',
                orgId:'0'
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    // console.log(result)
                    if(result.code == 0){
                        that.drawWaysList = result.data.map(item => {
                            return{
                               dictName:item.dictName,
                               dictValue:item.dictValue,
                               id:item.dictValue
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
          //获取分组券分组列表
          getAppointGroup(){
            let that=this;
            let params="";
            this.$api.getAppointGroup(params).then(response=>{
                if(response.data.code=='0'){

                    that.groupList=response.data.data
                }else{
                  that.$alert(response.data.msg,"警告",{
                    confirmButtonText:"确定"
                  })
                }
            }).catch(error=>{
                that.$alert(error,"警告",{
                  confirmButtonText:"确定"
                })
            })
          },
        //处理日期时间
        getdatetime(e){
            // console.log(e)
          this.changetime(e)
        },
        changetime(e){
          var d = new Date(e[0])

          var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' +       d.getMinutes() + ':' + d.getSeconds();

          var d2 = new Date(e[1])

          var times2=d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate() + ' ' + d2.getHours() + ':' +       d2.getMinutes() + ':' + d2.getSeconds();
          this.addCoupondata.batchTime[0]=times
          this.addCoupondata.batchTime[1]=times2
          // console.log(this.addCoupondata.batchTime)
        },

   },

}
</script>

<style lang="less" scope>
   .ProdCouponBatchAdd{
      text-align: left;
      .title{font-weight: bold;}
      .textinput.el-form-item{
        width: 70% !important;
      }
      .couponTermType{
         display: inline-block;
        .el-input{width: 150px;}
      }
      .required-icon{
        color: #ff3030;
      }
   }
</style>
