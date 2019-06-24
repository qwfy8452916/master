<template>
	<view class="detail-wrapper">
		<template v-if="isShowCountDown">
			<zn-count-down
				:deadline="deadline"
				@timeOut="handleTimeOut"></zn-count-down>
		</template>
		<view class="steps-view">
			<zn-steps
				:steps="steps"
				:currentStep="currentStep"></zn-steps>			
		</view>
		<view class="accordion-view">
			<zn-accordion>
				<template slot="header">
					<view class="iconfont header">&#xe63e;</view>
				</template>
				<view class="content">
					<zn-timeline :timelineArr="timelineArr"></zn-timeline>
				</view>
			</zn-accordion>
		</view>
		<view class="item-wrapper">
			<view class="item-header">
				<view class="title-view">
					<text class="line"></text>
					<text class="title">项目信息</text>
				</view>
				<view class="status" :style="{color: demandStatusColor}">{{ statusText }}</view>
			</view>
			<view class="item-content">
				<view class="content">
					<!-- <view class="desc">
						订单编号：<text class="desc-text">{{ demandOrderNo }}</text>
					</view> -->
					<view class="desc">
						项目名称： <text class="desc-text">{{ programName }}</text>
					</view>
					<view class="desc">
						项目编码：<text class="desc-text">{{ programCode }}</text>
					</view>
					<view class="desc">
						联采单号：<text class="desc-text">{{ programCode }}</text>
					</view>
					<view class="desc">
						发布时间：<text class="desc-text">{{ programCode }}</text>
					</view>
					<!-- <view class="desc">
						采购商：<text class="desc-text">{{ purchaser }}</text>
					</view>
					<view class="desc">
						供应商：<text class="desc-text">{{ supplier }}</text>
					</view> -->
				</view>
			</view>
		</view>
		<view class="item-wrapper">
			<view class="item-header">
				<view class="title-view">
					<text class="line"></text>
					<text class="title">产品信息</text>
				</view>
			</view>
			<view class="item-content">
				<view class="purchaser-content">
					<view class="desc">
						产品名称：<text class="desc-text">{{ productName }}</text>
					</view>
					<view class="desc">
						产品品牌：<text class="desc-text">{{ productBrand }}</text>
					</view>
					<view class="desc">
						需求数量：<text class="desc-text">{{ purchaseCount }}</text>
					</view>
					<view class="desc">
						单位：<text class="desc-text">{{ purchaseCount }}</text>
					</view>
					<view class="desc">
						产品规格：<text class="desc-text">{{ productSpec }}</text>
					</view>
				</view>
			</view>
		</view>
        <view class="item-wrapper">
        	<zn-accordion>
        		<template slot="header">
        			<view class="item-header">
        				<view class="title-view">
        					<text class="line"></text>
        					<text class="title">收货信息</text>
        				</view>
        				<view class="iconfont icon">&#xe63e;</view>
        			</view>
        		</template>
        		<view class="item-content">
        			<view class="content">
        				<view class="desc">
        					收货人：<text class="desc-text">{{ deadline }}</text>
        				</view>
        				<view class="desc">
        					联系电话： <text class="desc-text">增值税发票</text>
        				</view>
        				<view class="desc">
        					身份证：<text class="desc-text">{{ remark }}</text>
        				</view>
        				<view class="desc">
        					收货地址：<text class="desc-text">{{ remark }}</text>
        				</view>
						<view class="desc">
							采购商：<text class="desc-text">{{ purchaser }}</text>
						</view>
        			</view>
        		</view>
        	</zn-accordion>
        </view>
		<view class="item-wrapper">
			<view class="item-header">
				<view class="title-view">
					<text class="line"></text>
					<text class="title">收货信息</text>
				</view>
			</view>
			<view class="item-content">
				<view class="purchaser-content">
					<view class="desc">
						报价参考方式： <text class="desc-text">{{ webPriceReference }}</text>
					</view>
					<view class="desc">
						报价参考地区：<text class="desc-text">{{ referenceLocation }}</text>
					</view>
				</view>
				<view class="pay-content">
					<view class="title">
						结算方式描述
					</view>
					<view class="content">
						{{ paymentDesc }}
					</view>
				</view>
			</view>
		</view>
		<view class="item-wrapper">
			<zn-accordion>
				<template slot="header">
					<view class="item-header">
						<view class="title-view">
							<text class="line"></text>
							<text class="title">供应商信息</text>
						</view>
						<view class="iconfont icon">&#xe63e;</view>
					</view>
				</template>
				<view class="item-content">
					<view class="content" v-for="(item,index) in supplier" :key='index'>
						<view class="desc">
							供应商：<text class="desc-text">{{ item.enterpriseName }}</text>
						</view>
						<view class="desc">
							联系人：<text class="desc-text">{{ item.contact }}</text>
						</view>
						<view class="desc">
							联系人电话：<text class="desc-text">{{ item.phone }}</text>
						</view>
					</view>
				</view>
			</zn-accordion>
		</view>
		<template v-if="demandStatus === 'QUOTING' || demandStatus === 'PRE_FINISH'">
        	<view class="item-wrapper">
        		<view class="item-header">
        			<view class="title-view">
        				<text class="line"></text>
        				<text class="title">报价详情</text>
        			</view>
        		</view>
        		<view class="item-content" v-for="(item, index) in supplierList" :key="index">
        			<view class="content">
        				<view class="quote-view">
        					<view class="title">
        						<text>{{ item.name }}</text>
        					</view>
        					<view class="content">
        						<view class="subtitle">
        							订单支付方式
        						</view>
                                <template v-if="item.supplierPaymentList">
                                	<view class="payment-list" v-for="(priceItem, priceIndex) in item.supplierPaymentList" :key="priceIndex">
                                		<view class="payment-item">
                                			<view class="desc">
                                				{{ priceItem.desc }}
                                			</view>
                                			<view class="price">
                                				{{ priceItem.price }} 元/吨
                                			</view>
                                		</view>
                                	</view>
                                </template>
                                <template v-else>
                                	<view class="payment-list">暂无</view>
                                </template>
                                <view>
                                    <text>报价时间：</text>
                                    <text>{{ item.quoteTime }}</text>
                                </view>
        					</view>
        				</view>
        			</view>
        		</view>
        	</view>
        </template>
        <template v-if="demandStatus === 'FINISH'">
        	<view class="item-wrapper">
        		<view class="item-header">
        			<view class="title-view">
        				<text class="line"></text>
        				<text class="title">供应商报价详情</text>
        			</view>
        		</view>
        		<view class="item-content">
        			<view class="content">
        				<view class="quote-view">
        					<view class="title">
        						<text>供应商报价</text>({{ supplier }})
        					</view>
        					<view class="content">
        						<view class="subtitle">
        							订单支付方式
        						</view>
        						<view class="payment-list" v-for="(item, index) in znPaymentList" :key="index">
        							<view class="payment-item">
        								<view class="desc">
        									{{ item.desc }}
        								</view>
        								<view class="price">
        									{{ item.price }} 元/吨
        								</view>
        							</view>
        						</view>
        					</view>
        				</view>
        			</view>
        		</view>
        	</view>
        	<view class="item-wrapper">
        		<view class="item-header">
        			<view class="title-view">
        				<text class="line"></text>
        				<text class="title">筑牛报价详情</text>
        			</view>
        		</view>
        		<view class="item-content">
        			<view class="content">
        				<view class="quote-view">
        					<view class="title">
        						<text>供应商报价</text>({{ supplier }})
        					</view>
        					<view class="content">
        						<view class="subtitle">
        							订单支付方式
        						</view>
        						<view class="payment-list" v-for="(item, index) in supplierPaymentList" :key="index">
        							<view class="payment-item">
        								<view class="desc">
        									{{ item.desc }}
        								</view>
        								<view class="price">
        									{{ item.price }} 元/吨
        								</view>
        							</view>
        						</view>
        					</view>
        				</view>
        			</view>
        			<view class="content">
        				<view class="quote-view">
        					<view class="title">
        						联采报价
        					</view>
        					<view class="content">
        						<view class="subtitle">
        							订单支付方式
        						</view>
        						<view class="payment-list" v-for="(item, index) in znPaymentList" :key="index">
        							<view class="payment-item">
        								<view class="desc">
        									{{ item.desc }}
        								</view>
        								<view class="price">
        									{{ item.price }} 元/吨
        								</view>
        							</view>
        						</view>
        					</view>
        				</view>
        			</view>
        		</view>
        	</view>
        </template>
		<view class="item-wrapper">
			<zn-accordion>
				<template slot="header">
					<view class="item-header">
						<view class="title-view">
							<text class="line"></text>
							<text class="title">联采规则</text>
						</view>
						<view class="iconfont icon">&#xe63e;</view>
					</view>
				</template>
				<view class="item-content">
					<view class="content">
						<view class="desc">
							供应商报价截止时间：<text class="desc-text">{{ deadline }}</text>
						</view>
						<view class="desc">
							发票要求： <text class="desc-text">增值税发票</text>
						</view>
						<view class="desc">
							联采说明：<text class="desc-text">{{ remark }}</text>
						</view>
						<view class="desc">
							<text>附件</text>
							<zn-image-list :imageList="imageList"></zn-image-list>
						</view>
					</view>
				</view>
			</zn-accordion>
		</view>
		<view class="button-wrapper" v-if="isShowCheckBtn">
			<view class="btn-reject" @click="reject(demandId)" v-if="demandDetailAuthObj.rejectBtn.show">驳回</view>
			<view class="btn-approve" @click="approve(demandId)" v-if="demandDetailAuthObj.approveBtn.show">同意</view>
		</view>
		<view class="button-wrapper" v-if="isShowSelectSupplierBtn && demandDetailAuthObj.selectSupplierBtn.show">
			<view class="btn-select-supplier" @click="selectSupplier(demandPurchaseId)">推荐供应商</view>
		</view>
		<view class="button-wrapper" v-if="isShowViewSupplierQuoteBtn">
            <template v-if="demandStatus === 'ABORT'">
            	<view
            	    class="btn-view-quote btn-single"
            	    @click="viewSupplierQuote(demandPurchaseId)"
            	    v-if="demandDetailAuthObj.viewSupplierQuoteBtn.show">查看供应商报价</view>
            </template>
            <template v-else>
            	<view
            	    class="btn-reselect-supplier"
            	    @click="selectSupplier(demandPurchaseId)"
            	    v-if="demandDetailAuthObj.selectSupplierBtn.show">重新选择供应商</view>
            	<view
            	    class="btn-view-quote"
            	    @click="viewSupplierQuote(demandPurchaseId)"
            	    v-if="demandDetailAuthObj.viewSupplierQuoteBtn.show">查看供应商报价</view>
            </template>
		</view>
	</view>
</template>

<script>
	import znSteps from '../../../../components/zn-steps.vue'
	import znAccordion from '../../../../components/zn-accordion.vue'
	import znImageList from '../../../../components/zn-image-list.vue'
	import znTimeline from '../../../../components/zn-timeline.vue'
	import znCountDown from '../../../../components/zn-count-down.vue'
	import dayjs from 'dayjs'
	
	const DEMAND_COLOR_SUCCESS = '#0066CC';
	const DEMAND_COLOR_ERROR = '#EE1E1E';
	const ERROR_STATUS_LIST = ['REJECT', 'PRE_FINISH_REJECT'];
	export default {
		name: 'demand-detail-group',
		components: {
			znSteps,
			znAccordion,
			znImageList,
			znTimeline,
			znCountDown
		},
		data() {
			return {
				token: this.$store.state.token,
				demandId: '',
				recordId: '',
				demandPurchaseId: '',
				steps: [],
				currentStep: 0,
				demandOrderNo: '',
				programName: '',
				programCode: '',
				purchaser: '',
				supplier: '',
				recommendSupplier: '',
				recommendSupplierMobile: '',
				demandStatusColor: DEMAND_COLOR_SUCCESS,
				productName: '',
				webPriceReference: '',
				productBrand: '',
				referenceLocation: '',
				productSpec: '',
				purchaseCount: '',
				paymentDesc: '',
				demandStatus: '',
				imageList : [],
				deadline: '',
				remark: '',
				timelineArr: [],
                supplierPaymentList: [],
                znPaymentList: [],
                supplierList: [],
				isShowCheckBtn: false,
                demandDetailAuthObj: {
                    approveBtn: {
                        chName: '通过',
                        show: true
                    },
                    rejectBtn: {
                        chName: '驳回',
                        show: true
                    },
                    selectSupplierBtn: {
                        chName: '推送供应商',
                        show: true
                    },
                    viewSupplierQuoteBtn: {
                        chName: '查看供应商报价',
                        show: true
                    }
                }
			}
		},
		computed: {
			statusText() {
				const statusText = {
					2: '待审核',
					3: '需求驳回',
					4: '待推送供应商',
					5: '待报价',
					6: '待选择供应商',
					7: '待确认报价',
					8: '报价驳回',
					9: '已完成'
				}
				return statusText[this.demandStatus] || '--'
			},
			isShowSelectSupplierBtn() { //是否显示推送供应商按钮
				return this.demandStatus === 4
			},
			isShowViewSupplierQuoteBtn() { //是否显示查看供应商报价按钮
				return this.demandStatus === 7 
			},
			isShowCountDown() { //是否显示供应商报价倒计时
				return this.demandStatus === 5 
			}
		},
		onLoad(option) {
			this.demandId = option.demandId;
			this.getDetail();
			// this.getDemandProcess();
			// this.getDemandProcessLog();
   //          this.getAuth();
		},
		methods: {
			approve(demandId) { //同意
				uni.showModal({
					title:'提示',
					content:'是否确认通过审核？',
					showCancel:true,
					success:(res)=>{
						if(res.confirm){
							this.approveInfo(demandId);
						}else {
							this.$func.asyncShowToast({
							    title: '已取消',
							    icon: 'none',
							    duration: 3000
							})
						}
					}
				})
			},
			approveInfo(demandId){
				let params = {
					checkResult:'1',
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				this.$api.groupDemandApi.demandCustomExamine(params, this.demandId)
					.then(res => {
				        uni.hideLoading();
						const result = res.data;
						if(result.code === 0) {
				            this.$func.asyncShowToast({
				                title: '操作成功',
				                icon: 'success',
				                duration: 3000
				            }).then(val => {
                                uni.navigateTo({
                                	url: '/pages/tabBar/joint-list/joint-list'
                                })
                            })
						}else {
							console.log(result);
							uni.showToast({
								title: result.message,
								icon: 'none'
							})
						}
					})
					.catch(err => {
				        uni.hideLoading();
						console.log(err);
						uni.showToast({
							title: JSON.stringify(err),
							icon: 'none'
						})
					})
			},
			reject(demandId) { //驳回
				uni.navigateTo({
					url: `/pages/group/demand/reject/reject?demandId=${demandId}`
				})
			},
			selectSupplier(demandPurchaseId) { //选择供应商
				uni.navigateTo({
					url: `/pages/group/demand/select-supplier/select-supplier?demandPurchaseId=${demandPurchaseId}`
				})
			},
			viewSupplierQuote(demandPurchaseId) { //查看供应商报价
				uni.navigateTo({
					url: `/pages/group/demand/supplier-quote-list/supplier-quote-list?demandPurchaseId=${demandPurchaseId}`
				})
			},
			getDemandProcess() { //获取联采需求进度条
				const params = {
					token: this.token,
					demand_id: this.demandId
				}
				this.$api.groupDemandApi.demandProcess(params, this.demandId)
					.then(res => {
						const result = res.data;
						if(result.msg_code === 100000) {
							const steps = result.response.process;
							this.currentStep = result.response.step;
							this.steps = steps.map((item, index) => {
								let element = {};
								element.desc = item.title;
								element.statusClass = this.getStepStatusClass(index, item.status);
								return element
							})
						}else {
							console.log(result);
							uni.showToast({
								title: result.message,
								icon: 'none'
							})
						}
					})
					.catch(err => {
						console.log(err);
						uni.showToast({
							title: JSON.stringify(err),
							icon: 'none'
						})
					})
			},
			/**
			 * 获取当前步状态的类名
			 * @param  {Number} index   当前循环项的index
			 * @param  {String} status  当前循环项的状态
			 * @return {String}         当前循环项的类名
			 */
			getStepStatusClass(index, status) {
				let statusClass = '';
				if(status === 'CHECK_REJECT' || status === 'BRANCH_REJECT') {
					statusClass = 'step-is-error';
					return statusClass
				}
				if(this.currentStep > index + 1) {
					statusClass = 'step-is-finish';
				} else if (this.currentStep === index + 1) {
					statusClass = 'step-is-active';
				} else {
					statusClass ='step-is-wait';
				}
				return statusClass
			},
			getDemandProcessLog() { //获取联采需求操作日志
				const params = {
					token: this.token,
					demand_id: this.demandId
				}
				this.$api.groupDemandApi.demandProcessLog(params, this.demandId)
					.then(res => {
						const result = res.data;
						if(result.msg_code === 100000) {
							const listLength = result.response.length;
							let logList = result.response.map((item, index) => {
								let element = {
									demandReleaser: item.demand_submitting_name || '--',
									releaseTime: item.created_at || '--',
									approver: item.demand_submitter || '--',
									approveTime: item.updated_at || '--',
									duration: item.format_diachronic || '--',
									remark: item.remarks || '--',
									log: item.demand_desc,
									isActive: index === listLength - 1
								}
								if(item.demand_status == 'REJECT'){
							    	element.statusText = '不通过';
							    }else if(item.demand_status == 'BRANCH_REJECT'){
							    	element.statusText = '不通过';
							    }else if(item.demand_status == 'BRANCH_ACCEPECT'){
							    	element.statusText = '已完成';
							    }else{
							    	element.statusText = '通过';
							    }
								return element
							})
							this.timelineArr = logList.reverse();
						}else {
							console.log(result);
							uni.showToast({
								title: result.message,
								icon: 'none'
							})
						}
					})
					.catch(err => {
						console.log(err);
						uni.showToast({
							title: JSON.stringify(err),
							icon: 'none'
						})
					})
			},
			getDetail() { //获取联采需求详情
				this.$api.groupDemandApi.demandDetail(this.demandId)
					.then(res => {
						const result = res.data;
						if(result.code === 0) {
							const demandInfo = result.data;
							const webPriceReferenceText = {
								XB: '西本网',
								MY_STEEL: '我的钢铁',
								EXTRA:'其他'
							}
							this.demandPurchaseId = this.demandId;//联采需求单ID
							// this.demandOrderNo = demandInfo.projectNo;
							this.getProductName(demandInfo.productId);
							this.getAddressName([demandInfo.shippingProvinceId,demandInfo.shippingCityId,demandInfo.shippingCountyId])
							this.programName = demandInfo.projectName;
							this.programCode = demandInfo.projectNo;
							//this.receiveAddress = demandInfo.shippingProvinceId + demandInfo.shippingCityId + demandInfo.shippingCountyId;
							this.receiveAddressDetail = demandInfo.shippingAddr;
							this.receiver = demandInfo.shippingInspector;
							this.receiverMobile = demandInfo.shippingInspectorMobile;
							this.receiverIdentityCard = demandInfo.shippingInspectorIdentityCard || '--';
							// this.purchaser = demandInfo.member.member_auth.auth_name;
							const supplierArr = JSON.parse(demandInfo.invites);
							this.supplier = supplierArr;
							// this.productName = demandInfo.category.name;
							this.webPriceReference = webPriceReferenceText[demandInfo.tenderReferenceType];
							this.productBrand = demandInfo.productBrand;
							
							if(demandInfo.tenderReferenceType == 'EXTRA'){
								this.referenceLocation = demandInfo.tenderReferenceExtraAddr;
								this.tenderReferenceExtraDesc = demandInfo.tenderReferenceExtraDesc
							}else{
								this.getTenderAddressName([demandInfo.tenderReferenceProvinceId,demandInfo.tenderReferenceCityId])
							}
							
							
							this.productSpec = demandInfo.productSpec;
							this.purchaseCount = demandInfo.purchaseNum;
							this.productUnit = demandInfo.purchaseUnit;
							this.paymentDesc = demandInfo.settleDesc;
							
							this.demandStatus = demandInfo.status;
							
							
							this.rejectReason = demandInfo.reject_reason;
							this.deadline = dayjs(demandInfo.tenderDeadline).format('YYYY-MM-DD HH:mm:ss');
							this.remark = demandInfo.tenderDesc || '--';
							const attachments = JSON.parse(demandInfo.tenderAttachments)
							this.imageList = attachments.map((item, index) => {
								return {
									src: item.filePathUri
								}
							})
							
                            if(demandInfo.status == 2) { //流程控制决定显示或隐藏按钮
                                this.isShowCheckBtn = true;
                            }
							
                            // if(demandInfo.purchase_demand
                            //     && demandInfo.purchase_demand.demand_purchase_quoted_price_records
                            //     && demandInfo.purchase_demand.demand_purchase_quoted_price_records.length > 0) { //报价详情
                            //     const supplierArr = demandInfo.purchase_demand.demand_purchase_quoted_price_records;
                            //     this.supplierList = supplierArr.map((item, index) => {
                            //         const element = {
                            //             name: item.supplier.member_auth.auth_name,
                            //             quoteTime: item.updated_at || '--'
                            //         };
                            //         if(item['super_quote_prices']) {
                            //             const paymentObj = JSON.parse(item['super_quote_prices']);
                            //             const supplierPaymentList = paymentObj.supplier;
                            //             element.supplierPaymentList = supplierPaymentList.map((item, index) => { //供应商报价
                            //                 return {
                            //                     desc: item.description,
                            //                     price: this.$func.signToWords(item.price)
                            //                 }
                            //             })
                            //         }
                            //         return element
                            //     })
                            //     if(supplierArr[0]['super_quote_prices']) { //供应商报完价后
                            //         const paymentObj = JSON.parse(supplierArr[0]['super_quote_prices']);
                            //         const supplierPaymentList = paymentObj.supplier;
                            //         const znPaymentList = paymentObj.zn;
                            //         this.supplierPaymentList = supplierPaymentList.map((item, index) => { //供应商报价
                            //             return {
                            //             	desc: item.description,
                            //             	price: this.$func.signToWords(item.price)
                            //             }
                            //         })
                            //         this.znPaymentList = znPaymentList.map((item, index) => { //筑牛报价
                            //             return {
                            //             	desc: item.description,
                            //             	price: this.$func.signToWords(item.price)
                            //             }
                            //         })
                            //     }
                            // }
						}else {
							console.log(result);
							uni.showToast({
								title: result.message,
								icon: 'none'
							})
						}
					})
					.catch(err => {
						console.log(err);
						uni.showToast({
							title: JSON.stringify(err),
							icon: 'none'
						})
					})
			},
			//根据产品名称 获取产品名称
			getProductName(id){
				let that = this;
				let params = {
					id:id
				}
				that.$api.publicApi.productCategoryPraentId(params).then(res=>{
					let result = res.data
					if(result.code===0){
						this.productName = result.data.parentName+'/'+result.data.categoryName;
					} else {
						console.log(result);
						uni.showToast({
							title: result.message,
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err);
					uni.showToast({
						title: JSON.stringify(err),
						icon: 'none'
					})
				})
			},
			//根据地址id获取地址名称
			async getAddressName(addArr){
				let that = this;
				let addNameArr = [];
				const defaultIdArr = [
					{key:'PROVINCE',value:addArr[0],parentKey:'',parentValue:''},
					{key:'CITY',value:addArr[1],parentKey:'PROVINCE',parentValue:addArr[0]},
					{key:'AREA',value:addArr[2],parentKey:'CITY',parentValue:addArr[1]}
				]
				for(let i = 0; i < addArr.length; i++) {
					const childArr = await this.getRegionList(defaultIdArr[i].key,defaultIdArr[i].parentKey,defaultIdArr[i].parentValue);
					const childList = childArr.map((item, index) => {
						return {
							label: item.dictName,
							value: item.dictValue,
							key:item.dictKey,
							parentKey:item.dictParentKey,
							parentVlaue:item.dictParentValue
						}
					});
					let childIndex = childList.findIndex(item=>item.value==defaultIdArr[i].value);
					addNameArr.splice(i, 1, childList[childIndex].label);
				}
				this.receiveAddress = addNameArr.join('/');
			},
			async getTenderAddressName(addArr){
				let that = this;
				let addNameArr = [];
				const defaultIdArr = [
					{key:'PROVINCE',value:addArr[0],parentKey:'',parentValue:''},
					{key:'CITY',value:addArr[1],parentKey:'PROVINCE',parentValue:addArr[0]},
					{key:'AREA',value:addArr[2],parentKey:'CITY',parentValue:addArr[1]}
				]
				for(let i = 0; i < addArr.length; i++) {
					const childArr = await this.getRegionList(defaultIdArr[i].key,defaultIdArr[i].parentKey,defaultIdArr[i].parentValue);
					const childList = childArr.map((item, index) => {
						return {
							label: item.dictName,
							value: item.dictValue,
							key:item.dictKey,
							parentKey:item.dictParentKey,
							parentVlaue:item.dictParentValue
						}
					});
					let childIndex = childList.findIndex(item=>item.value==defaultIdArr[i].value);
					addNameArr.splice(i, 1, childList[childIndex].label);
				}
				this.referenceLocation = addNameArr.join('/');
			},
			/**
			 * 获取省市县的列表
			 * @param  {Number} parentId 父级ID
			 * @return {Promise}          当前父级ID下的子列表
			 */
			getRegionList(key,parentKey,parentValue){
				let params = {};
				params = {
					entId:'0',
					key:key,
					parentKey:parentKey,
					parentValue:parentValue
				}
				return this.$api.publicApi.regionList(params)
					.then(res => {
						const result = res.data;
						if(result.code === 0) {
							return result.data
						}else {
							console.log(result);
							uni.showToast({
								title: result.msg,
								icon: 'none'
							})
						}
					})
					.catch(err => {
						console.log(err);
						uni.showToast({
							title: JSON.stringify(err),
							icon: 'none'
						})
					})
			},
			handleTimeOut(isTimeOut) {
				
			},
            getAuth() { //获取权限
                const demandListPermissionObj = this.$store.getters.permissionList.MobileJointPurchaseOrderList;
                this.$func.getAuth(demandListPermissionObj, this.demandDetailAuthObj)
            },
            rolesIntersection(userRoles, flowRoles){ //用户角色与流程审核角色的交集
                const arr = [];
                flowRoles.forEach((flowItem, flowIndex) => {
                    userRoles.forEach((userItem, userIndex) => {
                        if(userItem === flowItem.examine_id){
                            arr.push(flowItem);
                        }
                    })
                })
                return arr
            },
            showFlowsAuditBtn(records){ //流程审核按钮显示
                const currentUserRoles = this.$store.state.currentUserRoles;
                let rolesIntersection = [];
                if(records.length > 0 && currentUserRoles && currentUserRoles.length > 0){
                    rolesIntersection = this.rolesIntersection(currentUserRoles, records);
                }
                return rolesIntersection
            }
		}
	}
</script>

<style lang="scss">
	@mixin btn() {
		width: 50%;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		color: #fff;
		font-size: 32upx;
	}
	.detail-wrapper {
		padding-bottom: 120upx;
		.steps-view {
			background: #fff;
			padding: 10upx 30upx;
		}
		.accordion-view {
			.header {
				background: #fff;
				height: 50upx;
				line-height: 50upx;
				text-align: center;
				border-top: 1px solid #E6E6E6;
				color: #999;				
			}
			.content {
				padding-left: 30upx;
				padding-right: 30upx;
			}
		}
		.item-wrapper {
			background: #fff;
			padding: 10upx 30upx;
			margin-top: 20upx;
			.item-header {
				display: flex;
				justify-content: space-between;
				font-size: 32upx;
				color: #333;
				font-weight: 700;
				padding-top: 30upx;
				padding-bottom: 30upx;
				border-bottom: 1px solid #eee;
				.title-view {
					display: flex;
					align-items: center;
				}
				.status {
					font-size: 28upx;
					font-weight: 400;
				}
				.line {
					display: inline-block;
					width: 6upx;
					height: 32upx;
					margin-right: 20upx;
					border-radius: 3upx;
					vertical-align: middle;
					background: $uni-color-primary;
				}
				.icon {
					font-weight: 400;
				}
			}
			.item-content {
				padding-top: 20upx;
				.content {
					line-height: 56upx;
					font-size: 28upx;
					color: #999;
					overflow: hidden;
					.desc {
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						.desc-text {
							color: #666;
						}
					}
				}
				.purchaser-content {
					display: flex;
					flex-wrap: wrap;
					line-height: 56upx;
					font-size: 28upx;
					color: #999;
					border-bottom: 1px solid #eee;
					padding: 10upx 0;
					.desc {
						width: 50%;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						.desc-text {
							color: #666;
						}
					}					
				}
				.pay-content {
					padding: 10upx 0;
					line-height: 56upx;
					font-size: 28upx;
					border-bottom: 1px solid #eee;
					.content {
						color: $uni-color-primary;
					}
				}
                .quote-view {
                	font-size: 28upx;
                	color: #666;
                	.title {
                		height: 88upx;
                		line-height: 88upx;
                		border-bottom: 1px solid #eee;
                	}
                	.content {
                		line-height: 56upx;
                        border-bottom: 1px solid #ddd;
                		.subtitle {
                			color: #999;
                		}
                		.payment-item {
                			display: flex;
                			color: $uni-color-primary;
                			.desc {
                				width: 50%;
                			}
                			.price {
                				width: 50%;
                			}
                		}
                	}
                }
			}
		}
		.button-wrapper {
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			flex-wrap: nowrap;
			width: 100%;
			.btn-reject {
				@include btn();
				background: #1F89E7;
			}
			.btn-approve {
				@include btn();
				background: $uni-color-primary;
			}
			.btn-select-supplier{
				@include btn();
				width: 100%;
				background: $uni-color-primary;
			}
			.btn-reselect-supplier {
				@include btn();
				background: #1F89E7;
			}
			.btn-view-quote {
				@include btn();
				background: $uni-color-primary;
			}
            .btn-single {
                width: 100%;
            }
		}
	}
</style>
