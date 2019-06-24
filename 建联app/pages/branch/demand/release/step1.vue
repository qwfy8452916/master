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
					<text class="title">项目信息</text>
				</view>
				<view class="item-view">
					<text class="item-label">项目名称</text>
					<view class="item-input">
						<input
							v-model.trim="programName"
							type="text"
							:maxlength="120"
							placeholder="请填写项目名称"/>
					</view>
				</view>
				<view class="item-view">
					<text class="item-label">项目编号</text>
					<view class="item-input">
						<input
							v-model.trim="programCode"
							type="text"
							:maxlength="120"
							placeholder="请填写项目编号"/>
					</view>
				</view>	
			</view>
			<view class="content-view">
				<view class="title-view">
					<text class="line"></text>
					<text class="title">产品信息</text>
				</view>
				<view class="item-view">
					<text class="item-label">产品名称</text>
					<view class="item-input">
						<zn-picker
							:pickerValueConfirmed="productCategoryPickerValue"
							:pickerValueMulArray="productCategoryList"
							placeholder="请选择产品名称"
							@picker-item-change="handleProductCategoryPickerChange"
							@picker-confirm="handleProductCategoryPickerConfirm"></zn-picker>
					</view>
				</view>
				<view class="item-view">
					<text class="item-label">产品品牌</text>
					<view class="item-input">
						<input
							v-model.trim="productBrand"
							type="text"
							:maxlength="120"
							placeholder="请填写产品品牌"/>
					</view>
				</view>
				<view class="item-view">
					<text class="item-label">数量</text>
					<view class="item-input">
						<input
							v-model.trim="count"
							type="digit"
							:maxlength="120"
							:placeholder="countPlaceholder"/>
					</view>
				</view>
				<view class="item-view">
					<text class="item-label">单位</text>
					<view class="item-input">
						<input
							v-model.trim="unit"
							type="text"
							:maxlength="120"
							:placeholder="unitPlaceholder"/>
					</view>
				</view>
				<view class="item-view">
					<text class="item-label">产品规格</text>
					<view class="item-input spec-input">
						<input
							v-model.trim="specMin"
							type="digit"
							:maxlength="12"
							placeholder="最小规格"/>
					</view>
					<view class="spec-line">——</view>
					<view class="item-input spec-input">
						<input
							v-model.trim="specMax"
							type="digit"
							:maxlength="12"
							placeholder="最大规格"/>
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
	import { validater } from '../../../../common/utils/validater.js'
	
	export default {
		name: 'demand-release-step1',
		components: {
			znSteps,
			znPicker
		},
		data() {
			return {
				token: this.$store.state.token,
				demandId: '',
				initSteps: [
					{
						desc: '基本信息',
						statusClass: 'step-is-active'
					},
					{
						desc: '采购信息',
						statusClass: 'step-is-wait'
					},
					{
						desc: '报价参考',
						statusClass: 'step-is-wait'
					},
					{
						desc: '供应商信息',
						statusClass: 'step-is-wait'
					}
				],
				currentStep: 1,
				productCategoryPickerValue: [],
				productCategoryList: [
					[],
					[]
				],
				programName: '',
				programCode: '',
				productBrand: '',
				count: '',
				unit:'',
				unitPlaceholder:'请填写产品单位',
				countPlaceholder: '请填写产品数量',
				specMin: '',
				specMax: '',
				categoryId: ''
			}		
		},
		computed: {
			isEdit() { //是否编辑联采需求
				return !!this.demandId
			}
		},
		onLoad(option) {
			if(option.incompleteDemandId) {
				this.demandId = option.incompleteDemandId;
			}
			uni.showLoading({
				title: '加载中'
			})
			if(this.isEdit) {
				this.editInit();
			}else {
				this.init()
			}
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			/**
			 * 获取产品种类的列表
			 * @param  {Number} parentId 父级ID(不传则为第一层)
			 * @return {Promise}         当前父级ID下的子列表
			 */
			getProductCategoryList(parentId) {
				return this.$api.publicApi.productCategory(parentId)
						.then(res => {
							const result = res.data;
							if(result.code === 0) {
								return result.data
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
			/*一级产品分类改变二级对应改变*/
			handleProductCategoryPickerChange(pickerObj) { //产品种类
				this.getProductCategoryList(pickerObj.itemArr[0].value) //获取第二级产品列表
					.then(val => {
						const secondArr = val.map((item, index) => {
							return {
								label: item.categoryName,
								value: item.id
							}
						});
						this.productCategoryList.splice(1,1,secondArr)
					})
			},
			handleProductCategoryPickerConfirm(pickerObj) { //已选的产品种类
				this.categoryId = pickerObj['itemArr'][1]['value'];
				for(let i=0;i<pickerObj.itemArr.length;i++){
					//this.$set(this.productCategoryPickerValue,i,pickerObj['itemArr'][i]['value'])
					this.productCategoryPickerValue.splice(1,i,pickerObj['itemArr'][i]['value'])
				}
			},
			next() { //下一步
				const stepOneData = {
					programName: this.programName,
					programCode: this.programCode,
					productBrand: this.productBrand,
					count: this.count,
					unit:this.unit,
					specMin: this.specMin,
					specMax: this.specMax,
					categoryId: this.categoryId
				}
				const params = {
					isPublished:0,
					projectName: this.programName,
					projectNo: this.programCode,
					productId: this.categoryId,
					productBrand: this.productBrand,
					productSpec: this.specMin + '-' + this.specMax,
					purchaseNum: this.count,
					purchaseUnit:this.unit
				}
				if(this.requiredValidator(stepOneData)) { //非空校验
					return false
				}
				uni.showLoading();
				if(this.isEdit) { //编辑
					this.updateDemand(params, this.demandId)
				}else {
					this.addDemand(params)
				}
			},
			requiredValidator(obj) { //非空校验
				const tips = {
					programName: '项目名称为必填项',
					programCode: '项目编码为必填项',
					productBrand: '产品品牌为必填项',
					count: '采购数量为必填项',
					unit:'单位必填',
					specMin: '最小规格为必填项',
					specMax: '最大规格为必填项',
					categoryId: '产品种类ID为必填项'
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
			addDemand(params) { //新增联采需求
				this.$api.branchDemandApi.demandAdd(params)
					.then(res => {
						const result = res.data;
						if(result.code === 0) {
							uni.hideLoading();
							this.demandId = result.data.id;
							uni.navigateTo({
								url: `/pages/branch/demand/release/step2?id=${this.demandId}`
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
			updateDemand(params, demandId) { //编辑联采需求
				this.$api.branchDemandApi.demandUpdate(params, demandId)
					.then(res => {
						const result = res.data;
						if(result.code === 0) {
							uni.hideLoading();
							uni.navigateTo({
								url: `/pages/branch/demand/release/step2?id=${this.demandId}`
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
							const spec = demandInfo.productSpec;
							return {
								programName: demandInfo.projectName,
								programCode: demandInfo.projectNo,
								productBrand: demandInfo.productBrand,
								categoryId: demandInfo.productId,
								specMin: spec.split('-')[0],
								specMax: spec.split('-')[0],
								count: demandInfo.purchaseNum,
								unit:demandInfo.purchaseUnit
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
			/**
			 * 获取产品种类的index
			 * @param  {Array}  categoryList 产品种类列表
			 * @param  {Number} categoryId   产品的ID
			 * @return {Number}          	 当前项在列表中的index
			 */
			getProductCategoryIndex(categoryList, categoryId) {
				let categoryIndex = categoryList.findIndex(item => parseInt(item.id) === parseInt(categoryId));
				if(categoryIndex === -1) {
					console.error('未匹配到该种类')
					return false
				}
				return categoryIndex
			},
			backFillDemandData(demandData) { //回填数据
				this.programName = demandData.programName;
				this.programCode = demandData.programCode;
				this.productBrand = demandData.productBrand;
				this.categoryId = demandData.categoryId;
				this.specMin = demandData.specMin;
				this.specMax = demandData.specMax;
				this.count = demandData.count;
				this.unit = demandData.unit
			},
			init() { //初始化
				//产品种类
				Promise.all([this.getProductCategoryList(0)]).then(val=>{
					this.productCategoryList[0] = val[0].map((item, index) => {
						return {
							label: item.categoryName,
							value: item.id
						}
					});
				}).then(()=>{
					this.getProductCategoryList(this.productCategoryList[0][0].value) //获取第二级产品列表
						.then(val => {
							this.productCategoryList[1] = val.map((item, index) => {
								return {
									label: item.categoryName,
									value: item.id
								}
							});
						});
				})
				// this.getProductCategoryList(0) //获取第一级产品列表
				// 	.then(val => {
				// 		this.productCategoryList[0] = val.map((item, index) => {
				// 			return {
				// 				label: item.categoryName,
				// 				value: item.id
				// 			}
				// 		});
				// 		
				// 		this.getProductCategoryList(this.productCategoryList[0][0].value) //获取第二级产品列表
				// 			.then(val => {
				// 				this.productCategoryList[1] = val.map((item, index) => {
				// 					return {
				// 						label: item.categoryName,
				// 						value: item.id
				// 					}
				// 				});
				// 			});
				// })
			},
			editInit() { //编辑时初始化
				//获取详情、初始化产品列表
				Promise.all([this.getProductCategoryList(), this.getProductCategoryList(1), this.getDemandDetail()])
					.then(result => {
						const productCategoryColumnOne = result[0]; //产品种类第一列
						const productCategoryColumnTwo = result[1]; //产品种类第二列
						const demandStepOneData = result[2]; //联采需求第一步数据
						const categoryId = demandStepOneData.categoryId;
						const categoryIndex = this.getProductCategoryIndex(productCategoryColumnTwo, categoryId);
						this.productCategoryList[0] = productCategoryColumnOne.map((item, index) => {
							return {
								label: item.name,
								value: item.id,
								type: item.type
							}
						})
						this.productCategoryList[1] = productCategoryColumnTwo.map((item, index) => {
							return {
								label: item.name,
								value: item.id,
								type: item.type
							}
						});
						this.productCategoryPickerValue = [0, categoryIndex];
						this.backFillDemandData(demandStepOneData)
					})
					.catch(err => {
						console.log(err);
						uni.showToast({
							title: JSON.stringify(err),
							icon: 'none'
						})
					})
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
					.accordion-content {
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
		.button-view {
			margin: 100upx 30upx 20upx;
			button {
				background: $uni-color-primary;
			}
		}
	}
</style>
