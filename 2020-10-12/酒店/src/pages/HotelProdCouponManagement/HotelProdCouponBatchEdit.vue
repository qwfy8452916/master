<template>
    <div class="ProdCouponBatchEdit">
         <p class="title">修改优惠券批次</p>
         <el-form label-width="130px" style="width:70%" :model="addCoupondata" ref="addCoupondata" :rules="rules">
            <el-form-item class="textinput" label="批次名称" prop="couponBatchName">
                <el-input v-model="addCoupondata.couponBatchName" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item class="textinput" label="优惠券名称" prop="couponName">
                <el-input v-model="addCoupondata.couponName" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="优惠范围" prop="couponRange">
              <el-radio-group :disabled="true" v-model="addCoupondata.couponRange">
                <el-radio :label="1">商品</el-radio>
                <el-radio :label="2">订房</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="板块类型" class="textinput">
              <el-select :disabled="true" v-model="addCoupondata.couponRange" >
                <el-option label="功能区" :value="1"></el-option>
                <el-option label="客房协议价" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="addCoupondata.couponRange == 1" label="板块">
                <el-radio @change="changeFunct" :disabled="true" v-model="addCoupondata.batchHotelRelation.funcRelationFlag" :label="0">全部可用</el-radio>
                <div>
                  <el-radio @change="changeFunct" :disabled="true" v-model="addCoupondata.batchHotelRelation.funcRelationFlag" :label="1">指定可用</el-radio>
                  <el-button :disabled="true" v-if="addCoupondata.batchHotelRelation.funcRelationFlag=='1'" type="text" @click="selectFunct('UseFunct')">选择功能区</el-button>
                  <el-table v-if="addCoupondata.batchHotelRelation.funcRelationFlag=='1'" :data="addCoupondata.useFuncData" border stripe style="width:90%">
                      <el-table-column prop="funcName" label="功能区" align="center"></el-table-column>
                      <el-table-column prop="batchCategoryRelations" label="分类" align="center">
                          <template slot-scope="scope">
                              <span v-for="(item,key) in scope.row.batchCategoryRelations" :key="key">{{item.categoryName}}、</span>
                          </template>
                      </el-table-column>
                      <el-table-column prop="id" label="选择分类" align="center">
                          <template slot-scope="scope">
                            <el-button type="text" :disabled="true" @click="selectClass(scope.$index,scope.row)">指定分类</el-button>
                          </template>
                      </el-table-column>
                      <el-table-column prop="id" label="操作" align="center">
                          <template slot-scope="scope">
                            <el-button type="text" :disabled="true" @click="deluserFun(scope.$index,scope.row)">删除</el-button>
                          </template>
                      </el-table-column>
                  </el-table>
                </div>
                <div>
                  <el-radio @change="changeFunct" :disabled="true" v-model="addCoupondata.batchHotelRelation.funcRelationFlag" :label="2">指定不可用</el-radio>
                  <el-button v-if="addCoupondata.batchHotelRelation.funcRelationFlag=='2'" :disabled="true" type="text" @click="selectFunct('noUseFunct')">选择功能区</el-button>
                  <el-table v-if="addCoupondata.batchHotelRelation.funcRelationFlag=='2'" :data="addCoupondata.notUseFuncData" border stripe style="width:70%">
                      <el-table-column prop="funcName" label="功能区" align="center"></el-table-column>
                      <el-table-column prop="id" label="操作" align="center">
                          <template slot-scope="scope">
                            <el-button type="text" :disabled="true" @click="delnotuserFun(scope.$index,scope.row)">删除</el-button>
                          </template>
                      </el-table-column>
                  </el-table>
                </div>
            </el-form-item>
            <el-form-item v-if="addCoupondata.couponRange == 1" label="商品名称" prop="hotelProdRelationFlag" style="margin-top:10px">
                  <el-radio @change="changeProd" :disabled="true" v-model="addCoupondata.batchHotelRelation.hotelProdRelationFlag" :label="0">全部可用</el-radio>
                  <div>
                    <el-radio @change="changeProd" :disabled="true" v-model="addCoupondata.batchHotelRelation.hotelProdRelationFlag" :label="1">指定可用</el-radio>
                    <el-button :disabled="true" v-if="addCoupondata.batchHotelRelation.hotelProdRelationFlag=='1'" type="text" @click="selectProd('UseProd')">选择商品</el-button>
                    <el-table v-if="addCoupondata.batchHotelRelation.hotelProdRelationFlag=='1'" :data="addCoupondata.useProductdata" border stripe style="width:100%">
                        <el-table-column prop="prodOwnerOrgKindName" label="商品类型" align="center"></el-table-column>
                        <el-table-column prop="prodOwnerOrgName" label="商品所属组织" align="center"></el-table-column>
                        <el-table-column prop="prodName" label="商品名称" align="center">
                        </el-table-column>
                        <el-table-column prop="prodShowName" label="商品显示名称" align="center"></el-table-column>
                        <el-table-column prop="" label="操作" align="center">
                          <template slot-scope="scope">
                              <el-button :disabled="true" type="text" @click="deluserProd(scope.$index,scope.row)">删除</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                  </div>
                  <div>
                    <el-radio @change="changeProd" :disabled="true" v-model="addCoupondata.batchHotelRelation.hotelProdRelationFlag" :label="2">指定不可用</el-radio>
                    <el-button v-if="addCoupondata.batchHotelRelation.hotelProdRelationFlag=='2'" type="text" @click="selectProd('noUseProd')" :disabled="true">选择商品</el-button>
                    <el-table v-if="addCoupondata.batchHotelRelation.hotelProdRelationFlag=='2'" :data="addCoupondata.notUseProductdata" border stripe style="width:100%">
                        <el-table-column prop="prodOwnerOrgKindName" label="商品类型" align="center"></el-table-column>
                        <el-table-column prop="prodOwnerOrgName" label="商品所属组织" align="center"></el-table-column>
                        <el-table-column prop="prodName" label="商品名称" align="center">
                        </el-table-column>
                        <el-table-column prop="prodShowName" label="商品显示名称" align="center"></el-table-column>
                        <el-table-column prop="" label="操作" align="center">
                          <template slot-scope="scope">
                              <el-button type="text" :disabled="true" @click="delnouserProd(scope.$index,scope.row)">删除</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                  </div>
            </el-form-item>
            <el-form-item v-if="addCoupondata.couponRange == 2" label="板块">客房协议价</el-form-item>
            <el-form-item v-if="addCoupondata.couponRange == 2" label="房源" prop="roomResourceRelationFlag" style="margin-top:10px"  >
              <el-radio @change="changeResource" :disabled="true" v-model="addCoupondata.batchHotelRelation.roomResourceRelationFlag" :label="0">全部可用</el-radio>
              <div>
                <el-radio @change="changeResource" :disabled="true" v-model="addCoupondata.batchHotelRelation.roomResourceRelationFlag" :label="1">指定可用</el-radio>
                <el-button :disabled="true" v-if="addCoupondata.batchHotelRelation.roomResourceRelationFlag=='1'" type="text" @click="selectResource('UseResource')" >选择房源</el-button>
                <el-table v-if="addCoupondata.batchHotelRelation.roomResourceRelationFlag=='1'" :data="addCoupondata.useResourcedata" border stripe style="width:100%" >
                  <el-table-column prop="roomTypeName" label="房型名称"></el-table-column>
                  <el-table-column prop="resourceName" label="房源名称"></el-table-column>
                  <el-table-column prop="roomCount" label="房量" align="center"></el-table-column>
                  <el-table-column prop="basicPrice" label="基础价格" align="center"></el-table-column>
                  <el-table-column prop label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button :disabled="true" type="text" @click="deluserResource(scope.$index,scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div>
                <el-radio @change="changeResource" :disabled="true" v-model="addCoupondata.batchHotelRelation.roomResourceRelationFlag" :label="2">指定不可用</el-radio>
                <el-button :disabled="true" v-if="addCoupondata.batchHotelRelation.roomResourceRelationFlag=='2'" type="text" @click="selectResource('noUseResource')">选择房源</el-button>
                <el-table v-if="addCoupondata.batchHotelRelation.roomResourceRelationFlag=='2'" :data="addCoupondata.notUseResourcedata" border stripe style="width:100%">
                  <el-table-column prop="roomTypeName" label="房型名称"></el-table-column>
                  <el-table-column prop="resourceName" label="房源名称"></el-table-column>
                  <el-table-column prop="roomCount" label="房量" align="center"></el-table-column>
                  <el-table-column prop="basicPrice" label="基础价格" align="center"></el-table-column>
                  <el-table-column prop label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button :disabled="true" type="text" @click="delnouserResource(scope.$index,scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
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

            <el-form-item label="选择分组" prop="groupId">
                <el-select :disabled="true" v-model="addCoupondata.groupId" filterable>
                    <el-option
                    v-for="item in groupList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.groupName"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="优惠方式" prop="discountWay">
              <el-radio-group :disabled="true" v-model="addCoupondata.discountWay">
                <el-radio :label="1">满减券</el-radio>
                <el-radio :label="2">折扣券</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="addCoupondata.discountWay == 1" label="使用门槛" prop="useLimitMoney">
                满 <el-input v-model.number="addCoupondata.useLimitMoney" :disabled="true" placeholder="使用门槛需高于金额" style="width:334px;margin-right:5px" maxlength="12"></el-input>元
            </el-form-item>
            <el-form-item v-if="addCoupondata.discountWay == 1" label="优惠券金额" prop="reduceMoney">
                <el-input v-model.number="addCoupondata.reduceMoney" :disabled="true" placeholder="请输入优惠券金额" style="width:349px;margin-right:5px" maxlength="12"></el-input>元
            </el-form-item>
            <el-form-item v-if="addCoupondata.discountWay == 2" prop="couponDiscount">
                <span slot="label"><label class="required-icon">*</label> 折扣</span>
                <el-input v-model="addCoupondata.couponDiscount" :disabled="true" maxlength="12" placeholder="请输入折扣" style="width:349px;margin-right:5px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>%
            </el-form-item>
            <el-form-item v-if="addCoupondata.discountWay == 2" label="最高优惠金额" prop="discountMaxMoney">
                <el-input v-model="addCoupondata.discountMaxMoney" :disabled="true" maxlength="12" placeholder="请输入最高优惠金额" style="width:349px;margin-right:5px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>元
            </el-form-item>
            <el-form-item v-if="addCoupondata.discountWay == 2" label="最低消费金额" prop="discountMinBuyMoney">
                <el-input v-model="addCoupondata.discountMinBuyMoney" :disabled="true" maxlength="12" placeholder="请输入最低消费金额" style="width:349px;margin-right:5px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>元
            </el-form-item>
            <el-form-item label="领取/发放有效期" prop="batchTime">
                 <el-date-picker
                  @input="getdatetime"
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
                  <el-radio @change="changecouponTermType" v-model="addCoupondata.couponTermType" :label="0">领取后</el-radio>
                    <el-form-item v-if="addCoupondata.couponTermType =='0'" prop="couponTermAfterDay" class="couponTermType">
                      <el-select v-model="addCoupondata.couponTermAfterDay">
                        <el-option label="即时" :value="1"></el-option>
                        <el-option label="第二天" :value="2"></el-option>
                        <el-option label="第三天" :value="3"></el-option>
                        <el-option label="第四天" :value="4"></el-option>
                        <el-option label="第五天" :value="5"></el-option>
                        <el-option label="第六天" :value="6"></el-option>
                        <el-option label="第七天" :value="7"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item v-if="addCoupondata.couponTermType=='0'" prop="couponTermDays" class="couponTermType">
                         <el-input v-model.number="addCoupondata.couponTermDays" maxlength="4"></el-input> 天内有效
                    </el-form-item>
               </div>
               <div style="margin-top:10px;">
                  <el-radio @change="changecouponTermType" v-model="addCoupondata.couponTermType" :label="1">固定日期</el-radio>
                  <el-form-item class="couponTermType" v-if="addCoupondata.couponTermType=='1'" prop="couponTermDate">
                         <el-date-picker
                          @input="changecouponTermDate"
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
               <el-checkbox @change="changecanDraw" v-model="addCoupondata.canDraw" :true-label="1" :false-label="0">可领取</el-checkbox>
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
                   <el-input :disabled="addCoupondata.canDraw!='1'" v-model.number="addCoupondata.drawCountTotal" style="width:218px;margin-right:5px" maxlength="5"></el-input>张
               </el-form-item>
               <el-form-item label="每人领取数量" style="margin-top:20px;" prop="drawCountPerUser">
                   <el-input :disabled="addCoupondata.canDraw!='1'" v-model.number="addCoupondata.drawCountPerUser" style="width:218px;margin-right:5px" maxlength="5"></el-input>张
               </el-form-item>
               <el-checkbox @change="changecanGive" v-model="addCoupondata.canGive" :true-label="1" :false-label="0">可发放</el-checkbox>
               <el-form-item label="发放总数量" style="margin-top:20px;" prop="giveCountTotal">
                   <el-input :disabled="addCoupondata.canGive!='1'" v-model.number="addCoupondata.giveCountTotal" style="width:218px;margin-right:5px" maxlength="5"></el-input>张
               </el-form-item>
               <el-form-item label="每人发放数量" style="margin-top:20px;" prop="giveCountPerUser">
                   <el-input :disabled="addCoupondata.canGive!='1'" v-model.number="addCoupondata.giveCountPerUser"  style="width:218px;margin-right:5px" maxlength="5"></el-input>张
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
                <el-button v-if="authzData['F:BH_COUPON_HOTELBATCH_MODSUBMIT']" type="primary" @click="sureBtn('addCoupondata')">确 定</el-button>
            </el-form-item>
         </el-form>

    </div>
</template>

<script>
export default {
    name:"HotelProdCouponBatchEdit",
    data(){

        var Validdate = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(this.addCoupondata.couponTermType=='1' && this.addCoupondata.couponTermDate.length<=0){
                callback(new Error('11'))
            }else{
                callback()
            }
        }

      return {
          authzData:'',
          batchId:"", //批次id
          hotelList:[],  //单个酒店列表
          sceneList:[],
          groupList:[],
          drawWaysList:[],
          addCoupondata:{
            batchHotelRelation:{
              funcRelationFlag:'',  //功能区是否可用
            },
            couponBatchName:"",  //批次名称
            couponName:"", //优惠券名称
            hotelRelationFlag:'', //酒店是否可用
            hotelObj:'', //选择酒店对象
            singleHotelId:'',  //单个酒店id
            hotelName:"",  //单个酒店名称

            hotelProdRelationFlag:'',  //商品名称是否可用
            roomResourceRelationFlag:'',  //房源名称是否可用
            couponLimit:'',  //选择类型
            groupId:'', //选择分组
            useLimitMoney:'', //使用限制金额
            reduceMoney:'', //优惠券金额
            batchTime:[], //领取/发放有效期
            couponTermType:'', //使用期限类型
            couponTermDate:[], //使用期限的起始时间
            couponTermDays:'', //领取后使用的限定天数
            canDraw:null,  //是否可以领取
            drawWays:[], //领取渠道
            drawCountTotal:0, //可领取总数量
            drawCountPerUser:0, //每人可领取数量
            canGive:'1', //是否可以发放
            giveCountTotal:0, //可发放总数量
            giveCountPerUser:0, //每人发放数量



            funcId:'',  //获取分类的功能区id
            getTypeData:[],  //选中的分类数据
            categoryIds:[], //选中的分类id数据
            selectClassIndex:null, //选择分类当前索引
            sceneCodes:[],  //选择场景


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
             couponRange:{required:true,message:"请选择优惠范围",trigger:'blur'},
             batchTime:{required:true,message:"请选择领取/发放有效期",trigger:'change'},
             discountWay: {required: true,message: "请选择优惠方式",trigger: "change"},
             couponTermType:{required:true,message:"请选择使用有效期方式",trigger:'change'},
             couponTermDays:{required:true,min:1,type:'number',message:"请填写领取后天数",trigger:'blur'},
             couponTermDate:{validator: Validdate,message:"请选择优惠券使用的固定日期",trigger:'blur'},
             drawCountTotal:{required:true,min:0,type:'number',message:"请填写领取总数量",trigger:'blur'},
             drawCountPerUser:{required:true,min:0,type:'number',message:"请填写每人领取数量",trigger:'blur'},
             giveCountTotal:{required:true,min:0,type:'number',message:"请填写发放总数量",trigger:'blur'},
             giveCountPerUser:{required:true,min:0,type:'number',message:"请填写每人发放数量",trigger:'blur'},
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
      this.getsceneList();
      this.getdrawWaysList();
      this.getAppointGroup();
      this.batchId=this.$route.query.id;
      this.checkCouponBatch();
    },
    methods:{
        //指定单个酒店可用
        selectOneHotel(e){
          this.addCoupondata.singleHotelId=e.id;
          this.addCoupondata.hotelName = e.hotelName;
        },

        //取消
        cancelBtn(){
          this.$router.push({name:"HotelProdCouponBatch"})
        },
        //switch转换
        switchFunc(val) {
          if(val){ return 1 }else{ return 0 }
        },
        //确定
        sureBtn(addCoupondata){
          let that=this;
          if(this.addCoupondata.couponTermType=='0' && this.addCoupondata.couponTermDays=='0'){
              this.$message.error("领取后天数不能为0")
              return false;
          }
          if(this.addCoupondata.canDraw == '1'){
            if(this.addCoupondata.drawWays.length == 0){
              this.$message.error("请选择领取渠道");
              return false;
            }
          }
          let params={
             couponOwnerOrgKind:that.addCoupondata.couponOwnerOrgKind,
             couponType:that.addCoupondata.couponType,
             couponRange: this.addCoupondata.couponRange,
             couponLimit:that.addCoupondata.couponLimit,
             couponBatchName:this.addCoupondata.couponBatchName,
             couponName:this.addCoupondata.couponName,
             sceneCodes:this.addCoupondata.sceneCodes,
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
          };
          this.$refs[addCoupondata].validate((valid,model)=>{
            if(valid){
               this.$api.editCouponBatch(params,that.batchId).then(response=>{
                 if(response.data.code=='0'){
                    that.$message.success("操作成功")
                    that.$router.push({name:"HotelProdCouponBatch"})
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
            }else{
               console.log("error")
            }
          })


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


        //删除可用功能区
        deluserFun(index,row){
          let that=this;
          this.addCoupondata.useFuncData.splice(index,1)
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

          //场景列表
          getsceneList(){
            let that=this;
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
            const params = {
                key:'DRAW_WAY',
                orgId:'0'
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    console.log(result)
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

          //transform 转换
          transformFunc(val) {
            if(val == 1){ return true }else{ return false }
          },
          //查看优惠券批次详情
          checkCouponBatch(){
            let that=this;
            let params="";
            this.$api.checkCouponBatch(params,that.batchId).then(response=>{
              const result = response.data;
              if(response.data.code=='0'){
                 that.addCoupondata=response.data.data;
                 that.addCoupondata.canSell = that.transformFunc(result.data.canSell);
                 that.addCoupondata.canGift = that.transformFunc(result.data.canGift);
                 if(response.data.data.batchSceneRelations!=null){
                   that.addCoupondata.sceneCodes=response.data.data.batchSceneRelations.map(item=>{
                      return item.sceneCode;
                    })
                 }
                 if(response.data.data.batchDrawWayRelations!=null){
                   that.addCoupondata.drawWays=response.data.data.batchDrawWayRelations.map(item=>{
                   return item.drawWay;
                   })
                 }
                 if(response.data.data.batchHotelRelations!=null){
                    that.addCoupondata.hotelIds=response.data.data.batchHotelRelations.map(item=>{
                    return item.hotelId;
                   })
                 }


                if(that.addCoupondata.batchHotelRelation!=null){
                      //获取功能区列表
                      if(that.addCoupondata.batchHotelRelation.funcRelationFlag=='0'){
                          that.addCoupondata.useFuncData=[];
                          that.addCoupondata.notUseFuncData=[];
                      }else if(that.addCoupondata.batchHotelRelation.funcRelationFlag=='1'){
                          that.addCoupondata.useFuncData=response.data.data.batchHotelRelation.batchHotelFuncRelations;
                      }else if(that.addCoupondata.batchHotelRelation.funcRelationFlag=='2'){
                          that.addCoupondata.notUseFuncData=response.data.data.batchHotelRelation.batchHotelFuncRelations;
                      }
                      //获取商品列表
                      if(that.addCoupondata.batchHotelRelation.hotelProdRelationFlag=='0'){
                          that.addCoupondata.useProductdata=[];
                          that.addCoupondata.notUseProductdata=[];
                      }else if(that.addCoupondata.batchHotelRelation.hotelProdRelationFlag=='1'){
                          that.addCoupondata.useProductdata=response.data.data.batchHotelRelation.batchHotelProdRelations;
                      }else if(that.addCoupondata.batchHotelRelation.hotelProdRelationFlag=='2'){
                          that.addCoupondata.notUseProductdata=response.data.data.batchHotelRelation.batchHotelProdRelations;
                      }
                      //获取房源列表
                      if(that.addCoupondata.batchHotelRelation.roomResourceRelationFlag=='0'){
                          that.addCoupondata.useResourcedata=[];
                          that.addCoupondata.notUseResourcedata=[];
                      }else if(that.addCoupondata.batchHotelRelation.roomResourceRelationFlag=='1'){
                          that.addCoupondata.useResourcedata=response.data.data.batchHotelRelation.batchRoomResourceRelations;
                      }else if(that.addCoupondata.batchHotelRelation.roomResourceRelationFlag=='2'){
                          that.addCoupondata.notUseResourcedata=response.data.data.batchHotelRelation.batchRoomResourceRelations;
                      }
                 }
                 that.addCoupondata.batchTime=[];
                 that.addCoupondata.batchTime[0]=response.data.data.batchStartTime;
                 that.addCoupondata.batchTime[1]=response.data.data.batchEndTime;
                 that.addCoupondata.couponTermDate=[];
                 if(response.data.data.couponTermStartDate!==null || response.data.data.couponTermEndDate!==null){
                   that.addCoupondata.couponTermDate[0]=response.data.data.couponTermStartDate;
                   that.addCoupondata.couponTermDate[1]=response.data.data.couponTermEndDate;
                 }


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

          changecouponTermDate(e){
             console.log(e)
             this.changetime2(e)
          },

          getdatetime(e){
          this.changetime(e)
        },

        changetime(e){
          let d = new Date(e[0])

          let times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' +       d.getMinutes() + ':' + d.getSeconds();

          let d2 = new Date(e[1])

          let times2=d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate() + ' ' + d2.getHours() + ':' +       d2.getMinutes() + ':' + d2.getSeconds();
          this.addCoupondata.batchTime[0]=times
          this.addCoupondata.batchTime[1]=times2
          this.$forceUpdate();
        },

        changetime2(e){
          let d = new Date(e[0])

          let times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' +       d.getMinutes() + ':' + d.getSeconds();

          let d2 = new Date(e[1])

          let times2=d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate() + ' ' + d2.getHours() + ':' +       d2.getMinutes() + ':' + d2.getSeconds();
          this.addCoupondata.couponTermDate[0]=times
          this.addCoupondata.couponTermDate[1]=times2
          this.$forceUpdate();
        },


   },

}
</script>

<style lang="less" scope>

   .ProdCouponBatchEdit{
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
      .el-radio__input.is-disabled+span.el-radio__label{
        color: #5b5959;
      }
      .el-button.is-disabled{
        color: #999;
      }
      .el-radio__input.is-disabled .el-radio__inner, .el-radio__input.is-disabled.is-checked .el-radio__inner{
        color: #333;
        background-color: none !important;
      }
   }
</style>
