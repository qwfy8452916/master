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
					<text class="title">邀请供应商</text>
					<view class="btn-release-demand" @click="addSupplier">
						<text class="iconfont icon">&#xe600;</text>
						<text class="desc">邀请供应商</text>
					</view>
				</view>
				<template v-for="(item,index) in suppliers">
					<view class='supplierCard' :key='index'>
						<view class="btn-delete-supplier">
							<text>{{index+1}}</text>
							<text class="iconfont icon" @click="deletSupplier(index)">&#xe609;</text>
						</view>
						<view class="item-view">
							<text class="item-label">供应商</text>
							<view class="item-input">
								<input
									v-model.trim="item.enterprise_name"
									type="text"
									:maxlength="120"
									placeholder="请填写供应商名称"/>
							</view>
						</view>
						<view class="item-view">
							<text class="item-label">联系人</text>
							<view class="item-input">
								<input
									v-model.trim="item.contact"
									type="text"
									:maxlength="120"
									placeholder="请填写供应商联系人"/>
							</view>
						</view>
						<view class="item-view bottom-none">
							<text class="item-label">联系电话</text>
							<view class="item-input">
								<input
									v-model.trim="item.phone"
									type="number"
									placeholder="请填写供应商联系电话"/>
							</view>
						</view>
					</view>
				</template>
				<view class="item-view">
					<label>
						<switch class="checkbox" type="checkbox" :checked="readAgreement" @change="checkboxChange" />
						<text>我已阅读并同意</text>
					</label>
					<text class="agreement">采购协议</text>
				</view>
			</view>
		</view>
		<view class="button-view">
			<button type="primary" @click="release">发布</button>
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
						statusClass: 'step-is-finish'
					},
					{
						desc: '供应商信息',
						statusClass: 'step-is-active'
					}
				],
				currentStep: 4,
				readAgreement: false, //是否已经勾选协议
				suppliers:[
					{
						enterprise_name: '',
						contact: '',
						phone: ''
					}
				],
				frontStepData:{}
				
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
			//添加供应商卡片
			addSupplier(){
				this.suppliers.push({
					enterprise_name: '',
					contact: '',
					phone: ''
				})
			},
			//删除供应商卡片
			deletSupplier(index){
				if(this.suppliers.length==1){
					uni.showToast({
						title: '至少保留一行数据!',
						icon: 'none'
					})
					return false
				}
				this.suppliers.splice(index,1);
			},
			checkboxChange(event) { //是否勾选协议
				this.readAgreement = event.detail.value;
			},
			release() { //发布
			console.log(111)
				let stepThreeData = this.suppliers
				let params = {
					isPublished:1,
					...this.frontStepData,
					inviteCount: this.suppliers.length,
					invites: JSON.stringify(this.suppliers),
				}
				console.log(params)
				if(this.requiredValidator(stepThreeData)) { //非空校验
					return false
				}
				if(!this.readAgreement) {
					uni.showToast({
						title: '请勾选采购协议',
						icon: 'none'
					})
					return false
				}
				
				this.updateDemand(params, this.demandId)
			},
			requiredValidator(obj) { //非空校验
				const tips = {
					enterprise_name: '供应商名字为必填项',
					phone: '供应商联系电话为必填项',
					contact: '供应商联系人名字为必填项'
				}
				for(let i=0;i<obj.length;i++){
					return Object.keys(obj[i]).some(key => {
						if(!obj[i][key]) {
							uni.showToast({
								title: tips[key],
								icon: 'none'
							})
						}
						return !obj[i][key]
					})
				}
			},
			updateDemand(params, demandId) { //编辑联采需求
                uni.showLoading({
                	title: '提交中',
                	mask: true
                });
				this.$api.branchDemandApi.demandUpdate(params, demandId)
					.then(res => {
                        uni.hideLoading();
						const result = res.data;
						if(result.code === 0) {
                            func.asyncShowToast({
                                title: '发布成功',
                                icon: 'success',
                            })
                            .then(val => {
                                uni.switchTab({
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
			getDemandDetail() { //获取联采需求详情
				return this.$api.branchDemandApi.incompleteDemandDetail(this.demandId)
					.then(res => {
						const result = res.data;
						if(result.code === 0) {
							const demandInfo = result.data;
							const supplierJson = JSON.parse(demandInfo.invites);
							const suppliers = supplierJson.length==0?[{
									enterprise_name: '',
									phone: '',
									contact: ''
								}]:supplierJson;
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
									tenderDesc:demandInfo.tenderDesc,
									tenderReferenceProvinceId:demandInfo.tenderReferenceProvinceId,
									tenderReferenceCityId:demandInfo.tenderReferenceCityId,
									tenderReferenceType:demandInfo.tenderReferenceType,
									settleType:demandInfo.settleType,
									tenderReferenceExtraAddr:demandInfo.tenderReferenceExtraAddr,
									tenderReferenceExtraDesc:demandInfo.tenderReferenceExtraDesc
								},
								suppliers: suppliers
							}
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
			backFillDemandData(demandData) { //回填数据
				this.frontStepData = demandData.frontStepData;
				this.suppliers = demandData.suppliers
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
					position: relative;
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
				.btn-release-demand {
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					right: 0;
					top: 20upx;
					width: 224upx;
					height: 60upx;
					color: $uni-color-primary;
					font-size: 24upx;
					background: rgba(255, 255, 255, 0.7);
					border: 1px solid $uni-color-primary;
					border-top-left-radius: 4px;
					border-bottom-left-radius: 4px;
					.icon {
						color: $uni-color-primary;
						margin-right: 10upx;
					}
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
			.supplierCard{
				margin-bottom: 20upx;
				box-shadow: 0px 0px 30upx 2upx #eee;
				padding: 40upx;
				.bottom-none{
					border-bottom: none;
				}
				.btn-delete-supplier{
					display: flex;
					.icon{
						flex-grow: 1;
						text-align: right;
					}
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
