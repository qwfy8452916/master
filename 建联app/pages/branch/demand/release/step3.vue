<template>
	<view class="wrapper">
		<view class="steps-view">
			<zn-steps
				:steps="initSteps"
				:currentStep="currentStep"></zn-steps>			
		</view>
		<view class="content-wrapper">
			<view class="content-view">
				<view class="title-view">
					<text class="line"></text>
					<text class="title">报价参考</text>
				</view>
				<view class="item-view">
					<text class="item-label">参考网站</text>
					<view class="item-input">
						<zn-picker
							v-model="referenceWebPickerValue"
							:pickerValueMulArray="referenceWebPickerData"
							placeholder="请选择参考网站"
							@picker-confirm="handleReferenceWebPickerConfirm"></zn-picker>
					</view>
				</view>
				<view class="item-view" v-if="referenceWeb!='EXTRA'">
					<text class="item-label">报价参考地</text>
					<view class="item-input">
						<zn-address-picker
							v-model="referenceLocationPickerValue"
							:depth="2"
							placeholder="请选择报价参考地"
							@picker-item-change="handleReferenceLocationPickerChange"
							@picker-confirm="handleReferenceLocationPickerConfirm"></zn-address-picker>
					</view>
				</view>
				<view v-else>
					<view class="item-view" >
						<text class="item-label">报价参考地</text>
						<view class="item-input">
							<input type="text" placeholder="请输入报价参考低" v-model="tenderReferenceExtraAddr"/>
						</view>
					</view>
					<view class="item-view">
						<text class="item-label">报价说明</text>
						<view class="item-input">
							<input type="text" placeholder="请输入报价说明" v-model="tenderReferenceExtraDesc"/>
						</view>
					</view>
				</view>
				
				<view class="item-view">
					<zn-accordion
						title="结算方式描述案例"
						:height="460">
						<view class="accordion-content-view">
							<view class="accordion-view">
								A：需方每批先付定货款，供方后发货；每批货价格按款到账日“XX网（如我的钢铁或西本网，扬州市建筑钢材价格行情）”指定范围内同厂家同规格下浮XX元/吨。
							</view>
							<view class="accordion-view">
								B：每月10日，付清上月产生的所有货款；价格按货到工地日“XX网（如我的钢铁或西本网，扬州市建筑钢材价格行情）”指定范围内同厂家同规格下浮XX元/吨。
							</view>
							<view class="accordion-view">
								C：每批货到工地日， 每90天付清该批货款；价格按货到工地日“XX网（如我的钢铁或西本网，扬州市建筑钢材价格行情）”指定范围内同厂家同规格上浮XX元/吨。
							</view>
						</view>
					</zn-accordion>
				</view>
				<view class="item-view">
					<text class="item-label item-textarea-label">结算方式</text>
					<view class="item-input">
						<textarea
							v-model.trim="paymentDesc"
							placeholder="请填写结算方式"
							class="item-textarea"
							:maxlength="120"
							:auto-height="true"/>
					</view>
				</view>
			</view>
		</view>
		<view class="button-view">
			<button type="primary" @click="next">下一步</button>
		</view>
	</view>
</template>

<script>
	import znSteps from '../../../../components/zn-steps.vue'
	import znPicker from '../../../../components/zn-picker.vue'
	import znUpload from '../../../../components/zn-upload.vue'
	import znAccordion from '../../../../components/zn-accordion.vue'
	import znAddressPicker from '../../../../components/zn-address-picker.vue'
    import { func } from '../../../../common/utils/func.js'
	import dayjs from 'dayjs'
	
	export default {
		name: 'demand-release-step3',
		components: {
			znSteps,
			znPicker,
			znUpload,
			znAccordion,
			znAddressPicker
		},
		data() {
			return {
				token: this.$store.state.token,
				demandId: '',
				initSteps: [
					{
						desc: '基本信息',
						statusClass: 'step-is-finish'
					},
					{
						desc: '采购信息',
						statusClass: 'step-is-finish'
					},
					{
						desc: '报价参考',
						statusClass: 'step-is-active'
					},
					{
						desc: '供应商信息',
						statusClass: 'step-is-wait'
					}
				],
				currentStep: 3,
				referenceWebPickerData: [
					[
						{
							label: '西本网',
							value: 'XB'
						},
						{
							label: '我的钢铁',
							value: 'WDGT'
						},
						{
							label: '其他',
							value: 'EXTRA'
						}
					]
				],
				frontStepData:{},
				referenceWebPickerValue: [],
				referenceLocationPickerValue: [],
				referenceWeb: '',
				paymentDesc: '',
				tenderReferenceExtraDesc:'',
				tenderReferenceExtraAddr:''
			}		
		},
		computed: {
			
		},
		onLoad(option) {
			this.demandId = option.id;
			uni.showLoading({
				title: '加载中'
			})
			this.getDemandDetail() //获取联采需求详情
				.then(res => {
					this.backFillDemandData(res)
				})
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			handleReferenceWebPickerConfirm(pickerObj) { //监听参考网站选择器确定事件
				this.referenceWeb = pickerObj['itemArr'][0]['value'];
			},
			handleReferenceLocationPickerChange(pickerObj) { //监听参考地选择器选项改变事件
				const { indexArr, itemArr } = pickerObj;
			},
			handleReferenceLocationPickerConfirm(pickerObj) { //监听参考地选择器确定事件
				const { itemArr } = pickerObj;
			},
			next() { //发布
				let stepThreeData = {}
				if(this.referenceWeb=='EXTRA'){
					stepThreeData = {
						referenceWeb: this.referenceWeb,
						tenderReferenceExtraAddr:this.tenderReferenceExtraAddr,
						tenderReferenceExtraDesc:this.tenderReferenceExtraDesc,
						paymentDesc: this.paymentDesc
					}
				}else{
					stepThreeData = {
						referenceWeb: this.referenceWeb,
						refereceProvinceId: this.referenceLocationPickerValue[0],
						refereceCityId: this.referenceLocationPickerValue[1],
						paymentDesc: this.paymentDesc
					}
				}
				console.log(this.frontStepData)
				let params = {
					isPublished:0,
					...this.frontStepData,
					settleType: this.paymentDesc,
					tenderReferenceType: this.referenceWeb,
					tenderReferenceCityId: this.referenceLocationPickerValue[1],
					tenderReferenceProvinceId: this.referenceLocationPickerValue[0],
					tenderReferenceExtraAddr:this.tenderReferenceExtraAddr,
					tenderReferenceExtraDesc:this.tenderReferenceExtraDesc
				}
				if(this.requiredValidator(stepThreeData)) { //非空校验
					return false
				}
				this.updateDemand(params, this.demandId)
			},
			requiredValidator(obj) { //非空校验
				const tips = {
					referenceWeb: '参考网站为必填项',
					refereceProvinceId: '参考地为必填项',
					refereceCityId: '参考地为必填项',
					paymentDesc: '结算方式描述为必填项',
					tenderReferenceExtraAddr:'参考地为必填项',
					tenderReferenceExtraDesc:'报价说明为必填项',
				}
				return Object.keys(obj).some(key => {
					if(!obj[key]) {
						uni.showToast({
							title: tips[key],
							icon: 'none'
						})
					}
					return !obj[key]
				})
			},
			updateDemand(params, demandId) { //编辑联采需求
                this.$api.branchDemandApi.demandUpdate(params, demandId)
                	.then(res => {
                		const result = res.data;
                		if(result.code === 0) {
                			uni.hideLoading();
                			uni.navigateTo({
                				url: `/pages/branch/demand/release/step4?id=${this.demandId}`
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
			getDemandDetail() { //获取联采需求详情
				return this.$api.branchDemandApi.incompleteDemandDetail(this.demandId)
					.then(res => {
						const result = res.data;
						if(result.code === 0) {
							const demandInfo = result.data;
							const provinceId = demandInfo.tenderReferenceProvinceId && parseInt(demandInfo.tenderReferenceProvinceId);
							const cityId = demandInfo.tenderReferenceCityId && parseInt(demandInfo.tenderReferenceCityId);
							
                            let referenceWebPickerValue = [];
                            let referenceLocationPickerValue = [];
                            if(demandInfo.tenderReferenceType) {
                               const referenceWebPickerIndex = this.getReferenceWebPickerIndex(this.referenceWebPickerData[0], demandInfo.tenderReferenceType);
                               referenceWebPickerValue = [referenceWebPickerIndex];
                            }
							if(provinceId && cityId) {
                                referenceLocationPickerValue = [provinceId, cityId];
                            }
								
							let tenderAttachments = JSON.parse(demandInfo.tenderAttachments).map(item=>{
								return item.filePath
							})
							
                            return {
								frontStepData:{
									productBrand:demandInfo.productBrand,
									productId:demandInfo.productId,
									productSpec:demandInfo.productSpec,
									projectName:demandInfo.projectName,
									projectNo:demandInfo.projectNo,
									purchaseNum:demandInfo.purchaseNum,
									purchaseUnit:demandInfo.purchaseUnit,
									shippingAddr:demandInfo.shippingAddr,
									shippingCityId:demandInfo.shippingCityId,
									shippingCountyId:demandInfo.shippingCountyId,
									shippingInspector:demandInfo.shippingInspector,
									shippingInspectorIdentityCard:demandInfo.shippingInspectorIdentityCard,
									shippingInspectorMobile:demandInfo.shippingInspectorMobile,
									shippingProvinceId:demandInfo.shippingProvinceId,
									tenderAttachments:JSON.stringify(tenderAttachments),
									tenderDeadline:dayjs(demandInfo.tenderDeadline).format('YYYY-MM-DD HH:mm:ss'),
									tenderDesc:demandInfo.tenderDesc
								},
								referenceWeb: demandInfo.tenderReferenceType || '',
								refereceProvinceId: provinceId,
								refereceCityId: cityId,
								paymentDesc: demandInfo.settleType || '',
								referenceWebPickerValue,
								referenceLocationPickerValue
							}
						}else {
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
			getReferenceWebPickerIndex(referenceWebPickerData, referenceWeb) { //获取参考网站的index
				let referenceWebIndex = referenceWebPickerData.findIndex(item => item.value === referenceWeb);
				if(referenceWebIndex === -1) {
					console.error('未匹配到该参考网址');
					return false
				}
				return referenceWebIndex
			},
			backFillDemandData(demandData) { //回填数据
				this.frontStepData = demandData.frontStepData;
				this.referenceWeb = demandData.referenceWeb;
				this.paymentDesc = demandData.paymentDesc;
				this.referenceWebPickerValue = demandData.referenceWebPickerValue;
				this.referenceLocationPickerValue = demandData.referenceLocationPickerValue;
			}
		}
	}
</script>

<style lang="scss">
	.wrapper {
		font-size: 28upx;
		.steps-view {
			background: #fff;
			padding: 30upx;
		}
		.content-wrapper {
			.content-view {
				margin-top: 20upx;
				padding: 10upx 30upx;
				background: #fff;
				.title-view {
					font-size: 32upx;
					color: #333;
					font-weight: 700;
					padding-top: 30upx;
					padding-bottom: 30upx;
					border-bottom: 1px solid #eee;
				}
				.line {
					display: inline-block;
					width: 6upx;
					height: 32upx;
					background: $uni-color-primary;
					margin-right: 20upx;
					border-radius: 3upx;
					vertical-align: middle;
				}
				.title{
					vertical-align: middle;
				}
				.item-view {
					display: flex;
					padding-top: 20upx;
					padding-bottom: 20upx;
					border-bottom: 1px solid #eee;
					.item-label {
						display: flex;
						align-items: center;
						font-size: 26upx;
						padding-right: 30upx;
						min-width: 130upx;
					}
					.item-input {
						flex-grow: 1;
						input {
							width: 100%;
						}
						switch {
							float: right;
						}
					}
					.spec-input {
						flex-grow: 0;
						width: 150upx;
					}
					.spec-line {
						margin-right: 50upx;
					}
					.item-textarea {
						width: 100%;
						height: 54upx;
						line-height: 54upx;
					}
					.item-textarea-label {
						align-self: flex-start;
					}
					.input-placeholder {
						color: $uni-text-color-placeholder;
					}
					.textarea-placeholder {
						font-size: 28upx;
						color: $uni-text-color-placeholder;
					}
					.accordion-content-view {
						padding: 20upx 0;
						color: #aaa;
					}
				}
				.item-view-upload {
					padding-top: 20upx;
				}
				.tip {
					font-size: 20upx;
					color: #999;
					line-height: 30upx;
				}
				.agreement {
					color: $uni-color-primary;
					text-decoration: underline;
				}
			}
		}
		.content-wrapper-1,
		.content-wrapper-2,
		.content-wrapper-3{
			display: block;
		}
		.button-view {
			margin: 140upx 30upx 20upx;
			button {
				background: $uni-color-primary;
			}
		}
	}
</style>
