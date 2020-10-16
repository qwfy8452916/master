<template>
    <div class="ProdCouponBatchCheck">
         <p class="title">查看详情</p>
         <el-form label-width="130px" style="width:70%" :model="addCoupondata" ref="addCoupondata">
            <el-form-item class="textinput" label="批次名称" prop="couponBatchName">
                <el-input v-model="addCoupondata.couponBatchName" :disabled="true" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item class="textinput" label="优惠券名称" prop="couponName">
                <el-input v-model="addCoupondata.couponName" :disabled="true" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="酒店名称" prop="hotelRelationFlag">
                 <el-radio :disabled="true" v-model="addCoupondata.hotelRelationFlag" :label="0">全部可用</el-radio>
                 <div>
                    <el-radio :disabled="true" v-model="addCoupondata.hotelRelationFlag" :label="2">指定不可用</el-radio>
                    <el-button v-if="addCoupondata.hotelRelationFlag=='2'" :disabled="true" type="text" @click="selectHotel('noUseHotel')">选择酒店</el-button>
                    <el-table v-if="addCoupondata.hotelRelationFlag=='2'" :data="addCoupondata.notUseHotel" border stripe style="width:500px">
                       <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>

                    </el-table>
                 </div>

                 <div>
                    <el-radio :disabled="true" v-model="addCoupondata.hotelRelationFlag" :label="1">指定多个可以</el-radio>
                    <el-button v-if="addCoupondata.hotelRelationFlag=='1'" :disabled="true" type="text" @click="selectHotel('moreUseHoteljud')">选择酒店</el-button>
                    <el-table v-if="addCoupondata.hotelRelationFlag=='1'" :data="addCoupondata.moreUseHotel" border stripe style="width:500px">
                       <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
                    </el-table>
                 </div>

                 <div>
                    <el-radio :disabled="true" v-model="addCoupondata.hotelRelationFlag" :label="3">指定单个可用</el-radio>
                    <el-form-item v-if="addCoupondata.hotelRelationFlag=='3'" label="酒店名称" prop="hotelObj">
                       <el-select :disabled="true" v-model="addCoupondata.batchHotelRelation.hotelId"
                       filterable value-key="id">
                          <el-option
                          v-for="item in hotelList"
                          :key="item.id"
                          :label="item.hotelName"
                          :value="item.id"
                         >
                          </el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item label="功能区" v-if="addCoupondata.hotelRelationFlag=='3'">
                       <el-radio :disabled="true" v-model="addCoupondata.batchHotelRelation.funcRelationFlag" :label="0">全部可用</el-radio>
                       <div>
                          <el-radio :disabled="true" v-model="addCoupondata.batchHotelRelation.funcRelationFlag" :label="1">指定可用</el-radio>
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
                          </el-table>
                       </div>
                       <div>
                          <el-radio :disabled="true" v-model="addCoupondata.batchHotelRelation.funcRelationFlag" :label="2">指定不可用</el-radio>
                          <el-button v-if="addCoupondata.batchHotelRelation.funcRelationFlag=='2'" :disabled="true" type="text" @click="selectFunct('noUseFunct')">选择功能区</el-button>
                          <el-table v-if="addCoupondata.batchHotelRelation.funcRelationFlag=='2'" :data="addCoupondata.notUseFuncData" border stripe style="width:70%">
                              <el-table-column prop="funcName" label="功能区" align="center"></el-table-column>
                          </el-table>
                       </div>
                    </el-form-item>
                    <el-form-item label="商品名称" v-if="addCoupondata.hotelRelationFlag=='3'">
                         <el-radio :disabled="true" v-model="addCoupondata.batchHotelRelation.hotelProdRelationFlag" :label="0">全部可用</el-radio>
                         <div>
                            <el-radio :disabled="true" v-model="addCoupondata.batchHotelRelation.hotelProdRelationFlag" :label="1">指定可用</el-radio>
                            <el-button :disabled="true" v-if="addCoupondata.batchHotelRelation.hotelProdRelationFlag=='1'" type="text" @click="selectProd('UseProd')">选择商品</el-button>
                            <el-table v-if="addCoupondata.batchHotelRelation.hotelProdRelationFlag=='1'" :data="addCoupondata.useProductdata" border stripe style="width:100%">
                               <el-table-column prop="prodOwnerOrgKindName" label="商品类型" align="center"></el-table-column>
                               <el-table-column prop="prodOwnerOrgName" label="商品所属组织" align="center"></el-table-column>
                               <el-table-column prop="prodName" label="商品名称" align="center">
                               </el-table-column>
                               <el-table-column prop="prodShowName" label="商品显示名称" align="center"></el-table-column>
                            </el-table>
                         </div>
                         <div>
                            <el-radio :disabled="true" v-model="addCoupondata.batchHotelRelation.hotelProdRelationFlag" :label="2">指定不可用</el-radio>
                            <el-button v-if="addCoupondata.batchHotelRelation.hotelProdRelationFlag=='2'" type="text" @click="selectProd('noUseProd')" :disabled="true">选择商品</el-button>
                            <el-table v-if="addCoupondata.batchHotelRelation.hotelProdRelationFlag=='2'" :data="addCoupondata.notUseProductdata" border stripe style="width:100%">
                               <el-table-column prop="prodOwnerOrgKindName" label="商品类型" align="center"></el-table-column>
                               <el-table-column prop="prodOwnerOrgName" label="商品所属组织" align="center"></el-table-column>
                               <el-table-column prop="prodName" label="商品名称" align="center">
                               </el-table-column>
                               <el-table-column prop="prodShowName" label="商品显示名称" align="center"></el-table-column>
                            </el-table>
                         </div>
                    </el-form-item>
                 </div>
            </el-form-item>
            <el-form-item label="场景" prop="sceneCodes">
               <el-select class="scene" multiple collapse-tags :disabled="true" v-model="addCoupondata.sceneCodes" placeholder="请选择">
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
            <el-form-item label="优惠方式">
              <el-radio-group v-model="addCoupondata.discountWay" :disabled="true" @change="discountEvent">
                <el-radio-button label="1">满减券</el-radio-button>
                <el-radio-button label="2">折扣券</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <div v-if="addCoupondata.discountWay==1">
            <el-form-item label="使用门槛" prop="useLimitMoney">
                满<el-input v-model="addCoupondata.useLimitMoney" :disabled="true" placeholder="使用门槛需高于金额" style="width:334px;margin-right:5px"></el-input>元
            </el-form-item>
            <el-form-item label="优惠券金额" prop="reduceMoney">
                <el-input v-model="addCoupondata.reduceMoney" :disabled="true" placeholder="请输入优惠券金额" style="width:349px;margin-right:5px"></el-input>元
            </el-form-item>
            </div>
            <div v-if="addCoupondata.discountWay==2">
              <el-form-item label="折扣" prop="couponDiscount">
                <el-input
                  :disabled="true"
                  v-model="addCoupondata.couponDiscount"
                  style="width:334px;margin-right:5px"
                  oninput="value=value.replace(/[^0-9.]/g,'')"
                ></el-input>%
              </el-form-item>
              <el-form-item label="最高优惠金额" prop="discountMaxMoney">
                <el-input
                  :disabled="true"
                  v-model="addCoupondata.discountMaxMoney"
                  style="width:334px;margin-right:5px"
                  oninput="value=value.replace(/[^0-9.]/g,'')"
                ></el-input>元
              </el-form-item>
              <el-form-item label="最低消费金额" prop="discountMinBuyMoney">
                <el-input
                  :disabled="true"
                  v-model="addCoupondata.discountMinBuyMoney"
                  style="width:334px;margin-right:5px"
                  oninput="value=value.replace(/[^0-9.]/g,'')"
                ></el-input>元
              </el-form-item>
            </div>
            <el-form-item label="领取/发放有效期" prop="batchTime">
                 <el-date-picker
                  :disabled="true"
                  @input="getdatetime"
                  v-model="addCoupondata.batchTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>

            </el-form-item>
            <el-form-item label="使用有效期" prop="couponTermType">
               <div>
                  <el-radio :disabled="true" v-model="addCoupondata.couponTermType" :label="0">领取后</el-radio>
                    <el-form-item prop="couponTermAfterDay" class="couponTermType" v-if="addCoupondata.couponTermType=='0'">
                        <el-select v-model="addCoupondata.couponTermAfterDay" :disabled="true">
                           <el-option label="即时" :value="1"></el-option>
                           <el-option label="第二天" :value="2"></el-option>
                           <el-option label="第三天" :value="3"></el-option>
                           <el-option label="第四天" :value="4"></el-option>
                           <el-option label="第五天" :value="5"></el-option>
                           <el-option label="第六天" :value="6"></el-option>
                           <el-option label="第七天" :value="7"></el-option>
                        </el-select>
                    </el-form-item>
                    <span v-if="addCoupondata.couponTermType=='0'">起</span>
                    <el-form-item class="couponTermType" v-if="addCoupondata.couponTermType=='0'" prop="couponTermDays">
                         <el-input :disabled="true" v-model="addCoupondata.couponTermDays"></el-input>天
                    </el-form-item>
               </div>
               <div style="margin-top:10px;">
                  <el-radio :disabled="true" v-model="addCoupondata.couponTermType" :label="1">固定日期</el-radio>
                  <el-form-item class="couponTermType" v-if="addCoupondata.couponTermType=='1'" prop="couponTermDate">
                         <el-date-picker
                          :disabled="true"
                          @input="changecouponTermDate"
                          v-model="addCoupondata.couponTermDate"
                          type="daterange"
                          format="yyyy-MM-dd"
                          value-frmat="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="过期日期">
                        </el-date-picker>
                  </el-form-item>
               </div>
            </el-form-item>
            <el-form-item label="领取/发放限制">
               <el-checkbox :disabled="true" v-model="addCoupondata.canDraw" :true-label="1" :false-label="0">可领取</el-checkbox>
               <el-form-item label="领取渠道" prop="drawWays">
                   <el-select multiple collapse-tags v-model="addCoupondata.drawWays" :disabled="true">
                      <el-option
                      v-for="item in drawWaysList"
                      :key="item.dictValue"
                      :label="item.dictName"
                      :value="item.dictValue"
                      ></el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="领取总数量" style="margin-top:20px;" prop="drawCountTotal">
                   <el-input :disabled="true" v-model.number="addCoupondata.drawCountTotal" style="width:218px;margin-right:5px"></el-input>张
               </el-form-item>
               <el-form-item label="每人领取数量" style="margin-top:20px;" prop="drawCountPerUser">
                   <el-input :disabled="true" v-model="addCoupondata.drawCountPerUser" style="width:218px;margin-right:5px"></el-input>张
               </el-form-item>

               <el-checkbox v-model="addCoupondata.canGive" :disabled="true" :true-label="1" :false-label="0">可发放</el-checkbox>
               <el-form-item label="发放总数量" style="margin-top:20px;" prop="giveCountTotal">
                   <el-input :disabled="true" v-model="addCoupondata.giveCountTotal" style="width:218px;margin-right:5px"></el-input>张
               </el-form-item>
               <el-form-item label="每人发放数量" style="margin-top:20px;" prop="giveCountPerUser">
                   <el-input :disabled="true" v-model="addCoupondata.giveCountPerUser"  style="width:218px;margin-right:5px"></el-input>张
               </el-form-item>
            </el-form-item>
            <el-form-item label="可售卖" style="margin-top:20px;" prop="canSell">
                <el-switch :disabled="true" v-model.number="addCoupondata.canSell" :active-value="1" :inactive-value="0"></el-switch>
              </el-form-item>
              <el-form-item label="可发送" style="margin-top:20px;" prop="canGift">
                  <el-switch :disabled="true" v-model.number="addCoupondata.canGift" :active-value="1" :inactive-value="0"></el-switch>
              </el-form-item>

            <el-form-item>
                <el-button @click="cancelBtn">返 回</el-button>
            </el-form-item>
         </el-form>

    </div>
</template>



<script>


export default {
    name:"MerchantProdCouponBatchCheck",

    data(){
      var ValidcanDraw = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(this.addCoupondata.canDraw=='1' && this.addCoupondata.drawWays.length<=0){
                callback(new Error('11'))
            }else{
                callback()
            }
        }

      return {
          batchId:"", //批次id
          hotelList:[],  //单个酒店列表
          sceneList:[],
          groupList:[],
          drawWaysList:[],
          addCoupondata:{
            couponBatchName:"",  //批次名称
            couponName:"", //优惠券名称
            hotelRelationFlag:'', //酒店是否可用
            hotelObj:'', //选择酒店对象
            singleHotelId:'',  //单个酒店id
            hotelName:"",  //单个酒店名称
            funcRelationFlag:'',  //功能区是否可用
            hotelProdRelationFlag:'',  //商品名称是否可用
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
         },



      }
    },
    mounted(){
      this.getHotelList();
      this.getsceneList();
      this.getdrawWaysList();
      this.getAppointGroup();
      this.batchId=this.$route.query.id;
      this.checkCouponBatch();

    },

    methods:{




        //返回
        cancelBtn(){
          this.$router.push({name:"MerchantProdCouponBatch"})
        },



        //酒店列表
        getHotelList(){
            let that=this;
            this.loadingH = true;
            const params = {
                hotelName:'',
                orgAs:5
            };
            this.$api.getAppointHotel(params)
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

          //查看优惠券批次详情
          checkCouponBatch(){
            let that=this;
            let params="";
            this.$api.checkCouponBatch(params,that.batchId).then(response=>{
              if(response.data.code=='0'){
                 that.addCoupondata=response.data.data;
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

                 //获取酒店列表
                 if(that.addCoupondata.hotelRelationFlag=='0'){
                    that.addCoupondata.notUseHotel=[];
                    that.addCoupondata.moreUseHotel=[];
                 }else if(that.addCoupondata.hotelRelationFlag=='1'){
                    that.addCoupondata.moreUseHotel=response.data.data.batchHotelRelations;
                 }else if(that.addCoupondata.hotelRelationFlag=='2'){
                    that.addCoupondata.notUseHotel=response.data.data.batchHotelRelations;
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
                 }
                 that.addCoupondata.batchTime=[];
                 that.addCoupondata.batchTime[0]=response.data.data.batchStartTime;
                 that.addCoupondata.batchTime[1]=response.data.data.batchEndTime;
                 that.addCoupondata.couponTermDate=[];
                 that.addCoupondata.couponTermDate[0]=response.data.data.couponTermStartDate;
                 that.addCoupondata.couponTermDate[1]=response.data.data.couponTermEndDate;

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

   .ProdCouponBatchCheck{
      text-align: left;
      .title{font-weight: bold;}
      .textinput.el-form-item{
        width: 70% !important;
      }
      .couponTermType{
         display: inline-block;
        .el-input{width: 150px;}
      }
      .el-radio__input.is-disabled+span.el-radio__label{
        color: #333;
      }
      .el-button.is-disabled{
        color: #333;
      }
      .el-radio__input.is-disabled .el-radio__inner, .el-radio__input.is-disabled.is-checked .el-radio__inner{
        color: #333;
        background-color: none !important;
      }
      .el-input.is-disabled .el-input__inner,.el-range-editor.is-disabled input{
        color: #333;
      }
      .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        background: #409EFF !important;
      }

   }
</style>
