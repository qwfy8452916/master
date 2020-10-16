<template>
  <div class="LonganBookOrderTabPane">
    <el-form
      v-if="isNotDeal"
      :inline="true"
      align="left"
      class="searchform"
    >
      <el-form-item label="客人姓名">
        <el-input
          class="inputWidth"
          v-model="inquireUserName"
          placeholder="请输入客人姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input
          class="inputWidth"
          v-model="inquireOrderCode"
          placeholder="请输入订单号"
        ></el-input>
      </el-form-item>
      <el-form-item label="入住日期">
        <el-date-picker
          class="datePickeWidth"
          v-model="inquireCheckIn"
          type="daterange"
          :disabled="typeNameTab=='待核销'?true:typeNameTab=='今日入住'?true:typeNameTab=='今日新订'?true:false"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="inquire"
        >查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
      <div
        @click="openSearchBox()"
        class="arrowsBox"
      >
        <el-button
          type="text"
          v-if="!isOpenInquire"
        >展&nbsp;&nbsp;开</el-button>
        <el-button
          type="text"
          v-if="isOpenInquire"
        >收&nbsp;&nbsp;起</el-button>
        <i
          class="openJianTou el-icon-arrow-down"
          v-if="!isOpenInquire"
        ></i>
        <i
          class="openJianTou el-icon-arrow-up"
          v-if="isOpenInquire"
        ></i>
      </div>
    </el-form>
    <el-form
      v-if="isNotDeal&&isOpenInquire"
      :inline="true"
      align="left"
      class="hideBox"
    >
      <el-form-item label="订单状态">
        <el-select
          class="inputWidth"
          v-model="inquireDealStatus"
          placeholder="请选择订单状态"
        >
          <el-option
            v-for="item in inquireDealStatusOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          class="inputWidth"
          v-model="inquireUserPhone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认人">
        <el-select
          class="inputWidth"
          v-model="inquireConfirmor"
          placeholder="请选择确认人"
          @focus="changeConfirmor"
        >
          <el-option
            v-for="item in inquireConfirmorOptions"
            :key="item.id"
            :label="item.empName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="后台退订状态">
        <el-select
          class="inputWidth"
          v-model="inquireUnsubscribeStatus"
          placeholder="请选后台退订状态"
        >
          <el-option
            v-for="item in inquireUnsubscribeStatusOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格类型">
        <el-select
          class="inputWidth"
          v-model="inquireRoomPriceType"
          placeholder="请选价格类型"
        >
          <el-option
            label="全部"
            value
          ></el-option>
          <el-option
            label="日历房价"
            value="0"
          ></el-option>
          <el-option
            label="单位协议价"
            value="1"
          ></el-option>
          <el-option
            label="最优弹性价"
            value="2"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="orderListBox">
      <div
        class="orderListTabBox"
        v-if="tabPaneData.length!=0"
      >
        <div class="sortBox">
          <span style="color:#67B0FF;">{{total}}</span>
          <span>条订单</span>
        </div>
        <div
          class="orderListTabContainer"
          :class="{heightOne:isNotDeal,heightTwo:!isNotDeal}"
        >
          <vue-scroll>
            <div
              class="orderListTab"
              v-for="(i,index) in tabPaneData"
              :key="index"
              :class="{active:isActive&&(indexNumber==index)||(oneItemShow&&index==0)}"
              @click.stop="tabClick($event,index,i.id)"
            >
              <div class="oneLine">
                <div class="left">
                  <span
                    class="newOrderSpan statusOne"
                    v-if="i.dealStatus==0"
                  >新订</span>
                  <span
                    class="newOrderSpan statusTWo"
                    v-else-if="i.dealStatus==1"
                  >新订</span>
                  <span
                    class="newOrderSpan statusThree"
                    v-else-if="i.dealStatus==2"
                  >取消</span>
                  <span
                    class="newOrderSpan statusFour"
                    v-else-if="i.dealStatus==3"
                  >退订</span>
                  <span
                    class="newOrderSpan statusFive"
                    v-else-if="i.dealStatus==4"
                  >取消</span>
                  <span
                    class="newOrderSpan statusSix"
                    v-else
                  >新订</span>
                  {{i.orderCode}}
                </div>
                <div class="middle">{{dateCutFive(i.createdAt)}}</div>
                <div class="right">{{i.dealStatusName}}</div>
              </div>
              <div class="twoLine">
                <span class="boldFont">{{i.roomCount}}间</span>
                <span>|</span>
                <span>{{i.resourceName}}</span>
              </div>
              <div class="threeLine">
                <div class="left">
                  <span class="boldFont">{{i.dayCheckIn==0?1 + '晚':i.dayCheckIn + '晚'}}</span>
                  <span>|</span>
                  <span>{{dateCutTwo(i.arrivalDate)}} - {{dateCutTwo(i.leaveDate)}}</span>
                </div>
                <div class="middle"></div>
                <div class="right">{{i.cusName}}</div>
              </div>
            </div>
          </vue-scroll>
        </div>
      </div>
      <div
        class="orderListViewBox"
        v-if="tabPaneData.length!=0"
      >
        <div
          class="orderListViewContainer"
          :class="{heightThree:isNotDeal,heightFour:!isNotDeal}"
        >
          <vue-scroll>
            <div class="baseInfoBOXTitle">
              <div class="left">{{orderListViewData.orderCode}}</div>
              <div class="middle">
                <span class="dealStatusName">{{orderListViewData.dealStatusName}}</span>
                <span
                  class="dealStatusNameSub"
                  v-if="orderListViewData.adminUnsubscribeStatus!=0"
                >{{orderListViewData.adminUnsubscribeStatus==1?"后台退订中":orderListViewData.adminUnsubscribeStatus==2?"已后台退订":"后台退订失败"}}</span>

                <span
                  class="dealStatusNameSub"
                  v-if="orderListViewData.adminUnsubscribeStatus==1"
                >
                  (
                  <span style="color:red;">待审核</span> )
                </span>
              </div>
            </div>
            <div class="baseInfoBOX">
              <div class="baseInfoItem">
                <div class="top">
                  <div class="left payTimeBox">
                    <span
                      class="newOrderSpan statusOne"
                      v-if="orderListViewData.dealStatus==0"
                    >新订</span>
                    <span
                      class="newOrderSpan statusTWo"
                      v-else-if="orderListViewData.dealStatus==1"
                    >新订</span>
                    <span
                      class="newOrderSpan statusThree"
                      v-else-if="orderListViewData.dealStatus==2"
                    >取消</span>
                    <span
                      class="newOrderSpan statusFour"
                      v-else-if="orderListViewData.dealStatus==3"
                    >退订</span>
                    <span
                      class="newOrderSpan statusFive"
                      v-else-if="orderListViewData.dealStatus==4"
                    >取消</span>
                    <span
                      class="newOrderSpan statusSix"
                      v-else
                    >新订</span>
                    {{dateCutFive(orderListViewData.payTime)}}
                  </div>
                  <div class="right">
                    <div class="controlBtnBox">
                      <el-button
                        v-if="typeNameTab=='未处理订单'&&orderListViewData.dealStatus==0"
                        class="controlBtn"
                        @click="refuseOrder(orderListViewData.id)"
                      >拒绝</el-button>
                      <el-button
                        type="primary"
                        v-if="typeNameTab=='未处理订单'&&orderListViewData.dealStatus==0"
                        class="controlBtn"
                        @click="confirmOrder(orderListViewData.id)"
                      >接单</el-button>
                      <el-button
                        type="primary"
                        v-if="typeNameTab=='未处理订单'&&orderListViewData.dealStatus==1"
                        class="controlBtn"
                        @click="writeOfffOrder(orderListViewData.id)"
                      >核销</el-button>
                      <el-button
                        type="info"
                        v-if="typeNameTab=='未处理订单'&&(orderListViewData.dealStatus==0||orderListViewData.dealStatus==1||orderListViewData.dealStatus==6)&&(orderListViewData.adminUnsubscribeStatus!=1&&orderListViewData.adminUnsubscribeStatus!=2)"
                        class="controlBtn"
                        @click="applyUnSubAdminOrder(orderListViewData.id)"
                      >后台退订</el-button>
                      <el-button
                        type="primary"
                        v-if="typeNameTab=='未处理订单'&&orderListViewData.dealStatus==3"
                        class="controlBtn"
                        @click="unsubscribeOrder(orderListViewData.id)"
                      >处理用户退订</el-button>

                      <el-button
                        type="primary"
                        style="margin-right:10px;"
                        v-if="typeNameTab=='今日新订'&&orderListViewData.dealStatus==1"
                        class="controlBtn"
                        @click="writeOfffOrder(orderListViewData.id)"
                      >核销</el-button>
                      <el-button
                        type="info"
                        v-if="typeNameTab=='今日新订'&&(orderListViewData.dealStatus==0||orderListViewData.dealStatus==1||orderListViewData.dealStatus==6)&&(orderListViewData.adminUnsubscribeStatus!=1&&orderListViewData.adminUnsubscribeStatus!=2)"
                        class="controlBtn"
                        @click="applyUnSubAdminOrder(orderListViewData.id)"
                      >后台退订</el-button>
                      <el-button
                        type="primary"
                        v-if="typeNameTab=='今日新订'&&orderListViewData.dealStatus==3"
                        class="controlBtn"
                        @click="unsubscribeOrder(orderListViewData.id)"
                      >处理用户退订</el-button>

                      <el-button
                        type="primary"
                        style="margin-right:10px;"
                        v-if="typeNameTab=='今日入住'&&orderListViewData.dealStatus==1"
                        class="controlBtn"
                        @click="writeOfffOrder(orderListViewData.id)"
                      >核销</el-button>
                      <el-button
                        type="info"
                        v-if="typeNameTab=='今日入住'&&(orderListViewData.dealStatus==0||orderListViewData.dealStatus==1||orderListViewData.dealStatus==6)&&(orderListViewData.adminUnsubscribeStatus!=1&&orderListViewData.adminUnsubscribeStatus!=2)"
                        class="controlBtn"
                        @click="applyUnSubAdminOrder(orderListViewData.id)"
                      >后台退订</el-button>
                      <el-button
                        type="primary"
                        v-if="typeNameTab=='今日入住'&&orderListViewData.dealStatus==3"
                        class="controlBtn"
                        @click="unsubscribeOrder(orderListViewData.id)"
                      >处理用户退订</el-button>

                      <el-button
                        type="primary"
                        style="margin-right:10px;"
                        v-if="typeNameTab=='待核销'&&orderListViewData.dealStatus==1"
                        class="controlBtn"
                        @click="writeOfffOrder(orderListViewData.id)"
                      >核销</el-button>
                      <el-button
                        type="info"
                        v-if="typeNameTab=='待核销'&&(orderListViewData.dealStatus==0||orderListViewData.dealStatus==1||orderListViewData.dealStatus==6)&&(orderListViewData.adminUnsubscribeStatus!=1&&orderListViewData.adminUnsubscribeStatus!=2)"
                        class="controlBtn"
                        @click="applyUnSubAdminOrder(orderListViewData.id)"
                      >后台退订</el-button>
                      <el-button
                        type="primary"
                        v-if="typeNameTab=='待核销'&&orderListViewData.dealStatus==3"
                        class="controlBtn"
                        @click="unsubscribeOrder(orderListViewData.id)"
                      >处理用户退订</el-button>

                      <el-button
                        v-if="typeNameTab=='全部订单'&&orderListViewData.dealStatus==0"
                        class="controlBtn"
                        @click="refuseOrder(orderListViewData.id)"
                      >拒绝</el-button>
                      <el-button
                        type="primary"
                        v-if="typeNameTab=='全部订单'&&orderListViewData.dealStatus==0"
                        class="controlBtn"
                        @click="confirmOrder(orderListViewData.id)"
                      >接单</el-button>
                      <el-button
                        type="primary"
                        v-if="typeNameTab=='全部订单'&&orderListViewData.dealStatus==1"
                        class="controlBtn"
                        @click="writeOfffOrder(orderListViewData.id)"
                      >核销</el-button>
                      <el-button
                        type="info"
                        v-if="typeNameTab=='全部订单'&&(orderListViewData.dealStatus==0||orderListViewData.dealStatus==1||orderListViewData.dealStatus==6)&&(orderListViewData.adminUnsubscribeStatus!=1&&orderListViewData.adminUnsubscribeStatus!=2)"
                        class="controlBtn"
                        @click="applyUnSubAdminOrder(orderListViewData.id)"
                      >后台退订</el-button>
                      <el-button
                        type="primary"
                        v-if="typeNameTab=='全部订单'&&orderListViewData.dealStatus==3"
                        class="controlBtn"
                        @click="unsubscribeOrder(orderListViewData.id)"
                      >处理用户退订</el-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="baseInfoItem">
                <div class="top">
                  <div class="left">客人姓名</div>
                  <div class="right">手机号</div>
                </div>
                <div class="bottom">
                  <div class="left">{{orderListViewData.cusName}}</div>
                  <div class="right">{{orderListViewData.cusPhone}}</div>
                </div>
              </div>
              <div class="baseInfoItem">
                <div class="top">
                  <div class="left">预定房间</div>
                  <div class="right">
                    <el-row>
                      <el-col :span="8">房型</el-col>
                      <el-col :span="4">床型</el-col>
                      <el-col :span="4">间数</el-col>
                      <el-col :span="4">天数</el-col>
                      <el-col :span="4">早餐</el-col>
                    </el-row>
                  </div>
                </div>
                <div class="bottom">
                  <div class="left">{{orderListViewData.resourceName}}{{orderListViewData.windowFlag===0?"(无窗)":orderListViewData.windowFlag===1?"(有窗)":orderListViewData.windowFlag===2?"(飘窗)":"(落地窗)"}}</div>
                  <div class="right">
                    <el-row>
                      <el-col :span="8">{{orderListViewData.roomTypeName}}</el-col>
                      <el-col :span="4">{{orderListViewData.bedTypeName}}</el-col>
                      <el-col :span="4">{{orderListViewData.roomCount}}间</el-col>
                      <el-col :span="4">{{dayCheckIn==0?1 + '晚':dayCheckIn + '晚'}}</el-col>
                      <el-col :span="4">{{orderListViewData.breakfastFlag===0?"无早":orderListViewData.breakfastFlag===1?"单早":"双早"}}</el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div class="baseInfoItem">
                <div class="top">
                  <div class="left">住宿日期</div>
                  <div class="right">到店时间</div>
                </div>
                <div class="bottom">
                  <div class="left">{{dateCutThree(orderListViewData.arrivalDate)}} - {{dateCutThree(orderListViewData.leaveDate)}}</div>
                  <div class="right">{{orderListViewData.arrivalTime}}</div>
                </div>
              </div>
            </div>
            <div class="hosePriceBox">
              <div class="hosePriceTitle">
                <span class="titleMark"></span>房价(RMB)
              </div>
              <div class="hosePriceDesc">
                实付金额&nbsp;
                <span class="actualPay">{{orderListViewData.actualPay}}</span> &nbsp;
                <span class="totalAmount">(&nbsp;房价&nbsp;{{orderListViewData.roomPrice}}</span>, &nbsp;
                <span class="totalAmount">优惠金额&nbsp;{{orderListViewData.couponAmount}}&nbsp;)</span>
                <div
                  @click="openPriceBox()"
                  class="arrowsBox"
                >
                  <el-button
                    type="text"
                    v-if="!isOpenPrice"
                  >展&nbsp;&nbsp;开</el-button>
                  <el-button
                    type="text"
                    v-if="isOpenPrice"
                  >收&nbsp;&nbsp;起</el-button>
                  <i
                    class="openJianTou el-icon-arrow-down"
                    v-if="!isOpenPrice"
                  ></i>
                  <i
                    class="openJianTou el-icon-arrow-up"
                    v-if="isOpenPrice"
                  ></i>
                </div>
              </div>
              <el-timeline
                class="timeline"
                v-if="isOpenPrice&&tableDataDayPrice.length!=0"
              >
                <el-timeline-item
                  v-for="(activity, index) in tableDataDayPrice"
                  :key="index"
                  color="#000"
                  :timestamp="(activity.roomAmount).toString() + '元'"
                >{{activity.liveColumn}}</el-timeline-item>
              </el-timeline>
              <div
                class="totalAmount"
                v-if="tableDataRoomPrice.length!=0&&isOpenPrice"
                style="padding-left:12px;"
              >
                <el-row>
                  <el-col :span="6">红包金额&nbsp;{{tableDataRoomPrice[0].redPacketAmount}}</el-col>
                  <el-col :span="6">分享奖励&nbsp;{{tableDataRoomPrice[0].shareReward}}</el-col>
                  <el-col :span="6">管理奖励&nbsp;{{tableDataRoomPrice[0].shareSecReward}}</el-col>
                  <el-col :span="6">入账金额&nbsp;{{tableDataRoomPrice[0].hotelBookAmount}}</el-col>
                </el-row>
              </div>
              <!-- <el-table :data="tableDataRoomPrice" border style="width: 100%">
              <el-table-column prop="discountWay" label="优惠方式"></el-table-column>
              <el-table-column prop="couponAmount" label="优惠金额"></el-table-column>
              <el-table-column prop="redPacketAmount" label="红包金额"></el-table-column>
              <el-table-column prop="shareReward" label="分享奖励"></el-table-column>
              <el-table-column prop="shareSecReward" label="管理奖励"></el-table-column>
              </el-table>-->

              <!-- <div class="mytableBox" v-if="tableDataDayPrice.length>0">
              <div class="tableRow" v-for=" i in tableDataDayPrice" :key="i.id">
                <span>{{i.liveColumn}}</span>
                <span>{{i.roomAmount}}</span>
              </div>
              </div>-->

              <div class="hosePriceTitle">
                <span class="titleMark"></span>价格类型
              </div>
              <div
                style="padding-left:12px;"
                v-if="orderListViewData.roomPriceType===0"
              >日历房价</div>
              <div
                style="padding-left:12px;"
                v-if="orderListViewData.roomPriceType===1"
              >单位协议价&nbsp;({{orderListViewData.entName}})</div>
              <div
                v-if="orderListViewData.roomPriceType===2&&tableDataRoomPriceType.length!=0"
                style="padding-left:12px;"
              >
                最优弹性价
                <!-- <el-table :data="tableDataRoomPriceType" border style="width: 100%">
                <el-table-column prop="empId" label="员工ID"></el-table-column>
                <el-table-column prop="empName" label="员工姓名"></el-table-column>
                <el-table-column prop="empMobile" label="员工手机号"></el-table-column>
                <el-table-column prop="empAdaptAmount" label="弹性金额"></el-table-column>
                <el-table-column prop="empPercentageAmount" label="提成金额"></el-table-column>
                </el-table>-->
                <el-row>
                  <el-col :span="6">{{tableDataRoomPriceType[0].empName}}&nbsp;(&nbsp;ID:&nbsp;{{tableDataRoomPriceType[0].empId}}&nbsp;)</el-col>
                  <el-col :span="6">{{tableDataRoomPriceType[0].empMobile}}</el-col>
                  <el-col :span="6">
                    提成金额&nbsp;{{tableDataRoomPriceType[0].empPercentageAmount}}&nbsp;元(&nbsp;
                    <span class="totalAmount">弹性金额{{tableDataRoomPriceType[0].empAdaptAmount}}&nbsp;元</span>
                    &nbsp;)
                  </el-col>
                </el-row>
              </div>
              <div class="hosePriceTitle">
                <span class="titleMark"></span>客人要求
              </div>
              <div style="padding-left:12px;">{{orderListViewData.cusRemark||"无"}}</div>
              <div v-if="isNotDeal&&orderListViewData.dealStatus!= 0">
                <div class="hosePriceTitle">
                  <span class="titleMark"></span>确认结果
                </div>
                <!-- <el-table :data="tableDataConfirmor" border style="width: 100%">
                <el-table-column prop="orderDealPersonName" label="确认人"></el-table-column>
                <el-table-column prop="orderDealTime" label="确认时间"></el-table-column>
                <el-table-column prop="dealStatus" label="确认结果"></el-table-column>
                </el-table>-->
                <div
                  style="padding-left:12px;"
                  v-if="tableDataConfirmor.length!=0"
                >
                  <el-row>
                    <el-col :span="6">确认人&nbsp;{{tableDataConfirmor[0].orderDealPersonName}}</el-col>
                    <el-col :span="8">确认时间&nbsp;{{tableDataConfirmor[0].orderDealTime}}</el-col>
                    <el-col :span="6">确认结果&nbsp;{{tableDataConfirmor[0].dealStatus}}</el-col>
                  </el-row>
                </div>
              </div>
              <div v-if="isNotDeal&&orderListViewData.dealStatus== 6&&tableDataWriteOff.length!=0">
                <div class="hosePriceTitle">
                  <span class="titleMark"></span>核销结果
                </div>
                <el-row style="padding-left:12px;">
                  <el-col :span="6">核销人&nbsp;{{tableDataWriteOff[0].wirteOffEmpName}}</el-col>
                  <el-col :span="8">核销时间&nbsp;{{tableDataWriteOff[0].writeOffTime}}</el-col>
                  <el-col :span="6">核销备注&nbsp;{{tableDataWriteOff[0].writeOffRemark||"无"}}</el-col>
                </el-row>
              </div>
            </div>
          </vue-scroll>
        </div>
      </div>
    </div>
    <!-- 接单的confirm start -->
    <el-dialog
      :visible.sync="isConfirmDialog"
      width="30%"
    >
      <span slot="title">是否确认该订单？</span>
      <div slot="footer">
        <el-button @click="isConfirmDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="confirmCommit()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 接单的confirm end -->
    <!-- 拒单的confirm start -->
    <el-dialog
      :visible.sync="isRefuseDialog"
      width="30%"
    >
      <span slot="title">是否拒绝该订单？</span>
      <el-input
        type="textarea"
        :rows="3"
        v-model.trim="refuseReson"
        maxlength="50"
        placeholder="请填写拒绝原因！"
        @blur="refuseResonBlur()"
      ></el-input>
      <div slot="footer">
        <el-button @click="isRefuseDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="refuseCommit()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 拒单的confirm end -->
    <!-- 处理用户退订confirm start -->
    <el-dialog
      :visible.sync="isUnsubscribeDialog"
      width="30%"
    >
      <span slot="title">处理用户退订</span>
      <div class="unsubscribeBox">
        请选择&nbsp;&nbsp;
        <el-radio
          v-model="orderStateDeal"
          label="4"
        >同意</el-radio>
        <el-radio
          v-model="orderStateDeal"
          label="5"
        >拒绝</el-radio>
      </div>
      <el-input
        type="textarea"
        :rows="3"
        v-model.trim="refuseResonDeal"
        maxlength="50"
        placeholder="请填写拒绝原因！"
        @blur="refuseResonDealBlur()"
      ></el-input>
      <div slot="footer">
        <el-button @click="isUnsubscribeDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="unsubscribeCommit()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 处理用户退订confirm end -->
    <!-- 后台退订confirm start -->
    <el-dialog
      :visible.sync="isApplyUnSubAdminDialog"
      width="30%"
    >
      <span slot="title">后台退订</span>
      <el-table
        :data="bookOrderDetailData"
        :show-header="false"
        style="width: 100%"
      >
        <el-table-column prop="liveDate">
          <template slot-scope="scope">
            <span>日期&nbsp;&nbsp;{{scope.row.liveDate.substring(0, 10)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roomCount">
          <template slot-scope="scope">
            <input
              @blur="changeRoomCountInput(scope.row)"
              v-model.number="scope.row.roomCountInput"
              placeholder="请输入房间数"
              class="roomCountInput"
            />
          </template>
        </el-table-column>
        <el-table-column prop="roomAmount">
          <template slot-scope="scope">
            <span>{{scope.row.roomAmount}}￥</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="isApplyUnSubAdminDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="applyUnSubAdminCommit()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 后台退订confirm end -->
    <!-- 接单的confirm start -->
    <el-dialog
      :visible.sync="isWriteoffDialog"
      width="30%"
    >
      <span slot="title">是否确认核销订单？</span>
      <el-row>
        <el-col :span="4">
          <span>核销备注</span>
        </el-col>
        <el-col :span="20">
          <el-input
            type="textarea"
            :rows="3"
            v-model.trim="writeoffRemark"
            maxlength="50"
            placeholder="请填写核销备注！"
          ></el-input>
        </el-col>
      </el-row>

      <div slot="footer">
        <el-button @click="isWriteoffDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="writeoffCommit()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 接单的confirm end -->
    <div class="pagination">
      <HotelPagination
        :pageTotal="total"
        @pageFunc="pageFunc"
        style="margin-top:-6px"
      />
    </div>
  </div>
</template>
<script>
import resetButton from "@/components/resetButton";
import HotelPagination from "@/components/HotelPagination";
export default {
  name: "LonganBookOrderTabPane",
  components: {
    resetButton,
    HotelPagination
  },
  props: ["tabPaneData", "total", "typeNameTab"],
  data() {
    return {
      pageSize: 10, //每页显示条数
      pageNum: 1, //当前页码
      inquireConfirmorOptions: "",
      inquireUserName: "",
      inquireUnsubscribeStatus: "",
      inquireDealStatus: "",
      inquireOrderCode: "",
      inquireCheckIn: [],
      inquireConfirmor: "",
      inquireUserPhone: "",
      inquireRoomPriceType: "",
      indexNumber: "",
      isActive: false,
      orderListViewShow: false,
      orderListViewData: {},
      orgId: "",
      tableDataRoomPrice: [],
      tableDataDayPrice: [],
      tableDataRoomPriceType: [],
      tableDataConfirmor: [],
      tableDataWriteOff: [],
      orderId: "",
      dayCheckIn: "", //住了几天
      hourCheckIn: "", //住了几小时
      oneItemShow: false,
      isConfirmDialog: false, //确认订单dialog
      isRefuseDialog: false, //拒绝订单dialog
      isUnsubscribeDialog: false, //处理退订dialog
      isWriteoffDialog: false, //核销订单dialog
      writeoffRemark: "", //核销备注
      isApplyUnSubAdminDialog: false, //后台退订dialog
      refuseReson: "", //拒绝原因
      orderDetailId: "",
      refuseResonDeal: "", //处理退订
      orderStateDeal: "4", //处理用户退订是否同意
      bookOrderDetailData: [], //订单详情
      hotelId: "",
      isDateSelect: false,
      inquireDealStatusOptions: [
        {
          id: "0",
          name: "待处理"
        },
        {
          id: 1,
          name: "已接单"
        },
        {
          id: 2,
          name: "已拒单"
        },
        {
          id: 3,
          name: "申请退订"
        },
        {
          id: 4,
          name: "已退订"
        },
        {
          id: 6,
          name: "已核销"
        }
      ],
      inquireUnsubscribeStatusOptions: [
        {
          id: 1,
          name: "后台退订中"
        },
        {
          id: 2,
          name: "已后台退订"
        },
        {
          id: -1,
          name: "后台退订失败"
        }
      ],
      isOpenInquire: false, //是否展开查询
      isOpenPrice: true //是否展开价格
    };
  },
  computed: {
    isNotDeal() {
      return this.$store.getters.getIsNotDeal;
    },
    dataLenth() {
      return this.tabPaneData.length;
    }
  },
  watch: {
    isNotDeal(val) {
      return this.$store.getters.getIsNotDeal;
    },
    "$store.getters.getIsOrderChange": {
      handler: function(newName, oldName) {
        if (this.tabPaneData.length > 0) {
          this.orderId = this.tabPaneData[0].id;
          this.bookOrderDetail(this.orderId);
        } else {
          this.orderListViewData = {};
          this.inquireCheckIn = [];
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.hotelId = localStorage.getItem("hotelId");
    this.orgId = localStorage.getItem("orgId");
    if (this.orderListViewData == {}) {
      this.orderListViewShow = false;
    } else {
      this.orderListViewShow = true;
    }
    this.oneItemShow = true;
    this.getInquireConfirmorList();
  },
  methods: {
    changeDate() {
      this.isDateSelect = true;
    },
    openSearchBox() {
      if (this.isOpenInquire) {
        this.isOpenInquire = false;
      } else {
        this.isOpenInquire = true;
      }
    },
    openPriceBox() {
      if (this.isOpenPrice) {
        this.isOpenPrice = false;
      } else {
        this.isOpenPrice = true;
      }
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.bookOrderList();
    },
    changeRoomCountInput(row) {
      let number = row.roomCount - row.unsubscribeRoomCount;
      if (number == 0) {
        this.$message.warning("没有可退订的房间了！");
        return false;
      } else if (number > 0) {
        if (row.roomCountInput > number) {
          this.$message.warning("需要退订的房间数不能大于剩余房间数！");
          return false;
        }
      }
    },
    //处理订单退订
    unsubscribeCommit() {
      if (this.orderStateDeal == "4") {
        this.ensureUnsubscribe();
      } else if (this.orderStateDeal == "5") {
        this.ensureUnsubscribe();
      }
    },
    unsubscribeOrder(id) {
      this.orderDetailId = id;
      this.isUnsubscribeDialog = true;
    },
    //订单退订请求
    ensureUnsubscribe() {
      if (this.orderStateDeal == 5) {
        if (this.refuseResonDeal == "") {
          this.$message.warning("请填写拒绝原因！");
          return false;
        }
      }
      const params = {
        dealStatus: Number(this.orderStateDeal),
        unsubscribeRemark: this.refuseResonDeal
      };
      const id = this.orderDetailId;
      this.$api
        .orderUnsubscribeDeal(params, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("退订处理成功！");
            this.isUnsubscribeDialog = false;
            this.bookOrderDetail(id);
            this.bookOrderList();
          } else {
            this.$message.error(result.msg);
            this.isUnsubscribeDialog = false;
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //订单接单
    confirmCommit() {
      this.ensureDeal();
    },
    confirmOrder(id) {
      this.orderDetailId = id;
      this.isConfirmDialog = true;
    },
    //接单请求
    ensureDeal() {
      const params = {};
      const id = this.orderDetailId;
      this.$api
        .ensureOrderDeal(params, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("接单成功！");
            this.isConfirmDialog = false;
            this.bookOrderDetail(id);
            this.bookOrderList();
          } else {
            this.$message.error(result.msg);
            this.isConfirmDialog = false;
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //拒绝订单
    refuseCommit() {
      if (this.refuseReson == "") {
        this.$message.warning("请填写拒绝原因！");
      } else {
        this.ensureReject();
      }
    },
    refuseOrder(id) {
      this.orderDetailId = id;
      this.isRefuseDialog = true;
    },
    //拒单请求
    ensureReject() {
      const params = {
        rejectRemark: this.refuseReson
      };
      const id = this.orderDetailId;
      this.$api
        .ensureOrderReject(params, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("拒单成功！");
            this.bookOrderDetail(id);
            this.bookOrderList();
            this.isRefuseDialog = false;
          } else {
            this.$message.error(result.msg);
            this.isRefuseDialog = false;
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //核销订单
    writeoffCommit() {
      this.writeOffEnsure();
    },
    writeOfffOrder(id) {
      this.orderDetailId = id;
      this.isWriteoffDialog = true;
    },
    //核销订单请求
    writeOffEnsure(writeoffForm) {
      const params = {
        remark: this.writeoffRemark
      };
      const id = this.orderDetailId;
      this.$api
        .bookOrderWriteOff(params, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("核销成功！");
            this.isWriteoffDialog = false;
            this.bookOrderDetail(id);
            this.bookOrderList();
          } else {
            this.isWriteoffDialog = false;
            this.$message.error(result.msg);
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //后台退订
    applyUnSubAdminCommit() {
      let flag1 = true;
      let flag2 = true;
      let flagArry = [];
      this.bookOrderDetailData.forEach((element, index) => {
        if (element.roomCountInput == "") {
          element.roomCountInput = 0;
          flagArry.push(0);
        } else {
          let number = element.roomCount - element.unsubscribeRoomCount;
          if (number == 0) {
            this.$message.warning(
              "第" + (index + 1) + "条没有可退订的房间了！"
            );
            flag1 = false;
          } else if (number > 0) {
            if (element.roomCountInput > number) {
              this.$message.warning(
                "第" + (index + 1) + "条需要退订的房间数不能大于剩余房间数！"
              );
              flag2 = false;
            } else {
              flagArry.push(1);
            }
          }
        }
      });
      if (flagArry.indexOf(1) != -1) {
        if (flag1 && flag2) {
          this.orderApplyUnSubAdmin();
        }
      } else {
        this.$message.warning("未填写退订房间数");
      }
    },
    applyUnSubAdminOrder(id) {
      this.orderDetailId = id;
      this.isApplyUnSubAdminDialog = true;
    },
    //后台退订请求
    orderApplyUnSubAdmin() {
      const id = this.orderDetailId;
      let params = {
        bookOrderDetailDTOS: []
      };
      this.bookOrderDetailData.forEach(element => {
        params.bookOrderDetailDTOS.push({
          detailId: element.id,
          roomCount: Number(element.roomCountInput)
        });
      });
      this.$api
        .bookOrderApplyUnSubAdmin(params, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("后台退订申请成功！");
            this.isApplyUnSubAdminDialog = false;
            this.bookOrderDetail(id);
            this.bookOrderList();
          } else {
            this.isApplyUnSubAdminDialog = false;
            this.$message.error(result.msg);
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    refuseResonDealBlur() {
      if (this.orderStateDeal == 5) {
        if (this.refuseResonDeal == "") {
          this.$message.warning("请填写拒绝原因！");
          return false;
        }
      }
    },
    refuseResonBlur() {
      if (this.refuseReson == "") {
        this.$message.warning("请填写拒绝原因！");
        return false;
      }
    },
    changeConfirmor() {
      this.getInquireConfirmorList();
    },
    getInquireConfirmorList() {
      const params = {
        orgId: this.orgId
      };
      this.$api
        .empRelationList({ params })
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.inquireConfirmorOptions = result.data.map(item => {
              return {
                id: item.id,
                empName: item.empName
              };
            });
            const empNameAll = {
              id: "",
              empName: "全部"
            };
            this.inquireConfirmorOptions.unshift(empNameAll);
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //订单列表
    bookOrderList() {
      if (this.inquireCheckIn == null) {
        this.inquireCheckIn = [];
      }
      if (!this.isDateSelect) {
        this.inquireCheckIn = [];
      }
      const paramsData = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        orderDealPerson: this.inquireConfirmor || "",
        adminUnsubscribeStatus: this.inquireUnsubscribeStatus || "",
        cusName: this.inquireUserName || "",
        dealStatus: this.inquireDealStatus || "",
        hotelId: this.hotelId || "",
        cusPhone: this.inquireUserPhone || "",
        roomPriceType: this.inquireRoomPriceType,
        orderCode: this.inquireOrderCode || "",
        arrivalStartDate: this.inquireCheckIn[0] || "",
        arrivalEndDate: this.inquireCheckIn[1] || ""
      };
      this.$emit("bookOrderList", paramsData);
    },
    //获取订单详情
    bookOrderDetail(id) {
      const loading = this.$loading({
        lock: true,
        text: "加载中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(192,196,204, 0.4)"
      });
      const params = {};

      this.$api
        .bookOrderDetail(params, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.orderListViewData = result.data;
            this.inquireCheckIn = [];

            this.tableDataRoomPrice = [];
            this.tableDataDayPrice = [];
            this.tableDataRoomPriceType = [];
            this.tableDataConfirmor = [];
            this.bookOrderDetailData = [];
            this.tableDataWriteOff = [];

            if (this.tabPaneData.length == 0) {
              this.inquireCheckIn = [];
            } else {
              this.inquireCheckIn.push(this.orderListViewData.arrivalDate);
              this.inquireCheckIn.push(this.orderListViewData.leaveDate);
              this.isDateSelect = false;
            }

            this.bookOrderDetailData = result.data.bookOrderDetailDTOS;
            this.bookOrderDetailData.forEach(element => {
              element.roomCountInput = 0;
            });
            this.tableDataRoomPrice.push({
              discountWay: result.data.discountWay === 1 ? "满减" : "折扣",
              couponAmount: result.data.couponAmount || 0,
              redPacketAmount: result.data.redPacketAmount || 0,
              shareReward: result.data.shareReward || 0,
              shareSecReward: result.data.shareSecReward || 0,
              hotelBookAmount:result.data.hotelBookAmount || 0,
            });
            //修改过 start
            result.data.bookOrderDetailDTOS.forEach(element => {
              this.tableDataDayPrice.push({
                liveColumn:
                  this.dateCutFour(element.liveDate) +
                  "(" +
                  this.getWeek(element.liveDate) +
                  ")",
                roomAmount: element.roomAmount
              });
            });
            //修改过 end
            this.tableDataRoomPriceType.push({
              empId: result.data.empId,
              empName: result.data.empName,
              empMobile: result.data.empMobile,
              empPercentageAmount: result.data.empPercentageAmount,
              empAdaptAmount: result.data.empAdaptAmount
            });
            this.tableDataConfirmor.push({
              orderDealPersonName: result.data.orderDealPersonName || "",
              orderDealTime: result.data.orderDealTime,
              dealStatus: result.data.dealStatus === 2 ? "已拒单" : "已接单"
            });
            this.tableDataWriteOff.push({
              wirteOffEmpName: result.data.wirteOffEmpName || "",
              writeOffTime: result.data.writeOffTime || "",
              writeOffRemark: result.data.writeOffRemark || ""
            });
            //几晚
            let dayDataNum =
              new Date(result.data.leaveDate).getTime() -
              new Date(result.data.arrivalDate).getTime();
            this.dayCheckIn = dayDataNum / (24 * 60 * 60 * 1000);
            //几小时
            if (result.data.hourTime != "") {
              let hourStart = result.data.hourTime.substr(0, 5) + ":00";
              let hourEnd = result.data.hourTime.substr(6, 5) + ":00";
              let arrivalTime = result.data.arrivalDate + " " + hourStart;
              let leaveTime = result.data.leaveDate + " " + hourEnd;
              let hourDataNum =
                new Date(leaveTime).getTime() - new Date(arrivalTime).getTime();
              let myHourNum = Math.abs(hourDataNum / (60 * 60 * 1000)); //将负数化为正数
              if (myHourNum < 1) {
                this.hourCheckIn = 1;
              } else {
                this.hourCheckIn = Math.ceil(myHourNum);
              }
            }
            loading.close();
          } else {
            this.$message.error("订单详情获取失败！");
            loading.close();
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
      loading.close();
    },
    //点击左边tab的事件
    tabClick(e, index, id) {
      // let ele = document.getElementsByClassName("orderListTab")[index];
      // let txt = " active";
      // this.removeClasss(ele, txt);
      // this.addClasss(ele, txt);
      this.indexNumber = index;
      this.isActive = true;
      this.orderId = id;
      this.oneItemShow = false;
      this.bookOrderDetail(this.orderId);
    },
    removeClasss(ele, txt) {
      var str = ele.className,
        index = str.indexOf(txt);
      if (index > -1) {
        ele.className = str.replace(txt, "");
      }
    },
    addClasss(ele, txt) {
      var str = ele.className;
      ele.className += txt;
    },
    resetFunc() {
      this.inquireUserPhone = "";
      this.inquireRoomPriceType = "";
      this.inquireUserName = "";
      this.inquireUnsubscribeStatus = "";
      this.inquireDealStatus = "";
      this.inquireOrderCode = "";
      this.inquireCheckIn = [];
      this.inquireConfirmor = "";
      this.bookOrderList();
    },
    //查询
    inquire() {
      this.bookOrderList();
      this.isOpenInquire = false;
      this.$store.commit("setSearchList", {
        inquireUserName: this.inquireUserName,
        inquireUnsubscribeStatus: this.inquireUnsubscribeStatus,
        inquireDealStatus: this.inquireDealStatus,
        inquireOrderCode: this.inquireOrderCode,
        inquireCheckIn: this.inquireCheckIn,
        inquireConfirmor: this.inquireConfirmor,
        inquireUserPhone: this.inquireUserPhone,
        inquireRoomPriceType: this.inquireRoomPriceType
      });
    },
    //时间切割月日时分
    dateCutOne(date) {
      if (date) {
        return date
          .replace(/-/g, "/")
          .substring(5)
          .substring(0, 11);
      }
    },
    //月日
    dateCutTwo(date) {
      if (date) {
        return date
          .replace(/-/g, "/")
          .substring(5)
          .substring(0, 5);
      }
    },
    //月-日
    dateCutFour(date) {
      if (date) {
        return date.substring(5).substring(0, 5);
      }
    },
    //年月日
    dateCutThree(date) {
      if (date) {
        return date.replace(/-/g, "/");
      }
    },
    //年月日
    dateCutFive(date) {
      if (date) {
        return date.substring(0, 16);
      }
    },
    getWeek(date) {
      return "天一二三四五六".charAt(new Date(date).getDay());
    }
  }
};
</script>

<style lang="less" scoped>
.LonganBookOrderTabPane {
  font-size: 13px;
  position: relative;
  min-height: 600px;
  .pagination {
    position: fixed;
    bottom: 20px;
    left: 0;
    background: #fff;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
  }
  .searchform {
    background: #fff;
    margin-top: 0px;
    margin-bottom: 0px;
    position: relative;
  }
  // /deep/ .el-form--inline .el-form-item{
  //   margin-left: 4px;
  //   margin-top: 0;
  // }
  .inputWidth {
    width: 200px;
  }
  .arrowsBox {
    margin-left: 12px;
    cursor: pointer;
    display: inline-block;
    .openJianTou {
      color: #409eff;
      font-size: 18px;
    }
  }
  .datePickeWidth {
    width: 260px;
  }
  .roomCountInput {
    width: 120px;
    border: 1px solid #ccc;
    height: 28px;
    border-radius: 4px;
    outline: none;
    padding-left: 8px;
    box-sizing: border-box;
  }
  .boldFont {
    font-weight: bold;
  }
  .active {
    border: 1px solid #0099ff;
  }
  .controlBtnBox {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 12px;
    box-sizing: border-box;
  }
  .dealStatusName {
    color: #2c3e50;
    display: inline-block;
    font-weight: bold;
    margin-right: 12px;
  }
  .dealStatusNameSub {
    color: #2c3e50;
    display: inline-block;
    font-weight: bold;
  }
  .controlBtn {
    // width: 120px;
    height: 42px;
  }
  .unsubscribeBox {
    text-align: left;
    margin-bottom: 12px;
  }
  .newOrderSpan {
    border-radius: 4px;
    width: 40px;
    height: 20px;
    color: #fff;
    font-size: 10px;
    display: inline-flex;
    line-height: 20px;
    padding-left: 9px;
    box-sizing: border-box;
    margin-right: 8px;
  }
  .statusOne {
    background: #f9ac18;
    color: #fff;
  }
  .statusTWo {
    background: #f9ac18;
    color: #fff;
  }
  .statusThree {
    background: #555555;
  }
  .statusFour {
    background: #d9001b;
  }
  .statusFive {
    background: #333333;
  }
  .statusSix {
    background: #f9ac18;
    color: #fff;
  }

  .hideBox {
    position: absolute;
    top: 82px;
    left: 0;
    background: #fff;
    width: 100%;
    z-index: 111;
  }
  .timeline {
    padding-left: 14px;
    display: flex;
    flex-direction: column;
  }
  /deep/ .el-timeline-item__wrapper {
    justify-content: flex-start;
    align-items: center;
    display: flex;
  }
  /deep/ .el-timeline-item__timestamp {
    margin-top: 0;
    margin-left: 20px;
  }
  /deep/ .el-timeline-item__node--normal {
    width: 8px;
    height: 8px;
    margin-top: 8px;
    left: 1px;
  }
  /deep/ .el-timeline-item__timestamp {
    color: #000;
  }
  .payTimeBox {
    display: flex;
    align-items: center;
  }
  .titleMark {
    width: 4px;
    height: 18px;
    background: #3f9eff;
    display: inline-block;
    border-radius: 2px;
    margin-right: 8px;
  }
  .heightOne {
    height: 429px;
  }
  .heightTwo {
    height: 505px;
  }
  .heightThree {
    height: 486px;
  }
  .heightFour {
    height: 568px;
  }
  .orderListTabContainer {
    box-sizing: border-box;
  }
  .orderListViewContainer {
    box-sizing: border-box;
  }
  .orderListBox {
    width: 100%;
    display: flex;
    justify-content: flex-start;

    .orderListTabBox {
      width: 38%;
      padding: 20px;
      background: #f6f6f6;
      .sortBox {
        text-align: left;
        height: 45px;
        padding-left: 10px;
        margin-bottom: 12px;
        background: #fff;
        border-radius: 4px;
        line-height: 45px;
      }
      .orderListTab {
        width: 97%;
        height: 108px;
        border-radius: 4px;
        box-sizing: border-box;
        margin-bottom: 12px;
        background: #fff;
        text-align: left;
        line-height: 28px;
        vertical-align: middle;
        padding: 10px 0px 10px 0px;
        cursor: pointer;
        .oneLine {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          border-bottom: 1px dashed #e8e7e7;
          padding-left: 10px;
          padding-right: 10px;
          box-sizing: border-box;
          align-items: center;
          .left {
            width: 54%;
          }
          .middle {
            width: 32%;
            color: #aaaaaa;
          }
          .right {
            width: 14%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        .twoLine {
          width: 100%;
          padding-left: 15px;
          padding-right: 10px;
          box-sizing: border-box;
          margin-top: 4px;
        }
        .threeLine {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          padding-left: 15px;
          padding-right: 10px;
          box-sizing: border-box;

          .left {
            width: 54%;
          }
          .middle {
            width: 32%;
            color: #aaaaaa;
          }
          .right {
            width: 14%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
      .orderListTab:hover {
        border: 1px solid #0099ff;
      }
    }
    .orderListViewBox {
      width: 62%;
      font-size: 13px;
      text-align: left;
      vertical-align: middle;
      line-height: 28px;
      padding: 20px;
      padding-left: 0px;
      background: #f6f6f6;
      .baseInfoBOXTitle {
        width: 100%;
        padding: 10px 2px 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        line-height: 50px;
        background: #fff;
        font-size: 14px;
        color: #aaaaaa;
        .left {
          width: 28%;
          font-weight: bold;
        }
        .middle {
          width: 72%;
          display: flex;
          justify-content: flex-start;
        }
      }
      .baseInfoBOX {
        width: 100%;
        padding: 0px 2px 0px 20px;
        box-sizing: border-box;
        background: #fff;
        .baseInfoItem {
          width: 100%;
          margin-bottom: 12px;
          .top {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            color: #aaaaaa;
            .left {
              width: 30%;
            }
            .right {
              width: 70%;
            }
          }
          .bottom {
            width: 100%;
            display: flex;
            font-weight: bold;
            justify-content: flex-start;
            .left {
              width: 30%;
            }
            .right {
              width: 70%;
            }
          }
        }
        .baseInfoItem:last-child {
          margin-bottom: 0;
        }
      }
      .hosePriceBox {
        width: 100%;
        padding: 10px 2px 20px 20px;
        background: #fff;
        box-sizing: border-box;
        .hosePriceDesc {
          padding-left: 12px;
        }
        .hosePriceTitle {
          font-size: 14px;
          line-height: 50px;
          font-weight: bold;
          display: flex;
          align-items: center;
          color: #aaaaaa;
        }
        .actualPay {
          color: #f59a23;
          font-size: 14px;
        }
        .totalAmount {
          font-size: 14px;
          color: #aaa;
        }
      }
    }
  }
  .mytableBox {
    width: 100%;
    line-height: 34px;
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    border: 1px solid #ebeef5;
    box-sizing: border-box;

    .tableRow {
      display: flex;
      flex-direction: column;
      span {
        margin-right: 12px;
        padding-left: 10px;
      }
    }
  }
}
</style>