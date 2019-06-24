<template>
	<view class="list-wrapper">
        <template ><!--v-if="demandListAuthObj.page.show"-->
        	<view class="header">
        		<view class="search-view">
        			<input
        				type="text"
        				v-model.trim="searchValue"
        				@confirm="search"
        				placeholder="请输入项目名称/产品名称" />
        			<text class="iconfont search-icon">&#xe62f;</text>
        		</view>
        		<!-- <view class="select-view">
        			<picker
        				:range="selectRange"
        				:value="selectIndex"
        				range-key="label"
        				@change="selectChange">
        				<view>{{ selectRange[selectIndex].label }}</view>
        			</picker>
        			<text class="iconfont select-icon">&#xe63e;</text>
        		</view> -->
        	</view>
			<scroll-view scroll-x="true" scroll-left="0" class="nav-bar-view">
				<view class="nav-bar">
					<view
						v-for="(item, index) in selectRange"
						:key="index"
						class="nav-item"
						:class="{active: index === selectIndex}"
						@click="selectChange(index)">
						<text class="desc">
							{{ item.label }}
							<text class="tip" :class="{'tip-show': item.unreadCount > 0}"></text>
						</text>
					</view>
				</view>
				<view class="line" :style="{left: marginLeft}"></view>
			</scroll-view>
            <view class="content">
                <block v-for="(item, index) in demandList" :key="index">
                    <view class="item-wrapper">
                        <view class="item-header">
                            <view class="title-view">
                                <text class="line" :style="{background: item.statusColor}"></text>
                                <text class="title">项目名称：{{ item.programName }}</text>
                            </view>
                            <view>
                                <zn-label :labelText="item.statusText" :color="item.statusColor"></zn-label>
                            </view>
                        </view>
                        <view class="item-content">
                            <view class="content">
                                <view class="desc">
                                    项目编码：{{ item.programCode }}
                                </view>
                                <view class="desc">
                                    产品名称：{{ item.productName }}
                                </view>
                                <view class="desc">
                                    产品规格：{{ item.productSpec }}
                                </view>
                                <view class="desc">
                                    需求数量：{{ item.purchaseCount }}
                                </view>
                                <view class="desc">
                                    发布时间：{{ item.startTime }}
                                </view>
                                <view class="desc">
                                    报价截止：{{ item.endTime }}
                                </view>
                            </view>
                            <view class="operation-wrapper">
                                <view @click="viewDetail(item.id)">查看订单详情</view>
<!--    							<view class="approve-view" v-if="item.isShowCheckBtn">
                                    <view class="btn" @click="approve(item.id, item.recordId)">确认</view>
                                    <view class="btn" @click="reject(item.id, item.recordId)">驳回</view>
                                </view> -->
                                <view class="approve-view" v-if="item.isShowEditBtn && demandListAuthObj.editBtn.show">
                                    <view class="btn" @click="edit(item.id)">编辑</view>
                                </view>
                            </view>
                        </view>	
                    </view>
                </block>
                <template v-if="currentPage >= totalPage">
                    <zn-no-more></zn-no-more>
                </template>
            </view>
        </template>
        <!-- <template v-else>
        	<view class="no-permission">请联系管理员配置权限</view>
        </template> -->
	</view>
</template>

<script>
	import znLabel from '../../../../components/zn-label.vue'
	import znNoMore from '../../../../components/zn-no-more.vue'
	import dayjs from 'dayjs'
	
	const DEMAND_COLOR_WAIT_FOR_CHECK = '#0066CC';
	const DEMAND_COLOR_REJECT = '#EB6877';
	const DEMAND_COLOR_WAIT_FOR_QUOTE = '#F39800';
	const DEMAND_COLOR_QUOTING = '#EC6941';
	const DEMAND_COLOR_ABORTION = '#E4007F';
	const DEMAND_COLOR_SUCCESS = '#32B16C';
	const DEMAND_COLOR_FULFILL = '#00A0E9';
	const DEMAND_COLOR_CLOSING = '#E60012';
	const DEMAND_COLOR_FINISHED = '#AAAAAA';
	const DEMAND_COLOR_STOP_BID = '#920783';
	const DEMAND_COLOR_BRANCH_REJECT = '#EB6877';
	const DEMAND_COLOR_WAIT_FOR_BRANCH_CHECK = '#0066CC';

	export default {
		name: 'demand-list-branch',
		components: {
			znLabel,
			znNoMore
		},
		data() {
			return {
				loading: false,
				token: this.$store.state.token,
				searchValue: '',
				selectIndex: 0,
				selectRange: [
					{
						label: '全部',
						unreadCount:0,
						value: '1,2,3,4,5,6,7,8,9'
					},
					{
						label: '待审核',
						unreadCount:0,
						value: 2
					},
					{
						label: '需求驳回',
						unreadCount:0,
						value: 3
					},
					{
						label: '已通过',
						unreadCount:0,
						value: '4,5,6'
					},
					{
						label: '待确认报价',
						unreadCount:0,
						value: 7
					},
					{
						label: '报价驳回',
						unreadCount:0,
						value: 8
					},
					{
						label: '已完成',
						unreadCount:0,
						value: 9
					}
				],
				demandList: [],
				currentPage: 1,
				perPage: 10,
				total: '',
                demandListAuthObj: {
                    page: {
                        chName: '显示',
                        show: false
                    },
                    viewDetailBtn: {
                        chName: '查看详情',
                        show: false
                    },
                    editBtn: {
                        chName: '编辑',
                        show: false
                    },
                    rejectBtn: {
                        chName: '驳回',
                        show: false
                    },
                    approveBtn: {
                        chName: '同意成交',
                        show: false
                    }
                }
			}
		},
		computed: {
			selectStatus() {
				return this.selectRange[this.selectIndex]['value']
			},
			totalPage() { //总页数
				return Math.ceil(this.total / this.perPage)
			},
			marginLeft() {
				return uni.upx2px(46 + 188 * this.selectIndex) + 'px'
			}
		},
		created() {
			//this.getAuth();
			this.init();
		},
// 		onReachBottom() {
// 			this.loadMore();
// 		},
		methods: {
			selectChange(index) { //选择器改变
				this.selectIndex = index;
				this.init();
			},
			getDemandList() { //获取联采需求列表
				const params = {
					pageSize: this.perPage,
					pageNo: this.currentPage,
					status: this.selectStatus,
					kw: this.searchValue,
					//type: 'BRANCH'
				}
				uni.showLoading({
					title: '加载中'
				})
				this.$api.branchDemandApi.demandList(params)
					.then(res => {
						const result = res.data;
						uni.hideLoading();
						if(result.code === 0){
							const demandArr = result.data.records;
							this.total = result.total;
							demandArr.forEach((item, index) => {
								let element = {
									id: item.id,
									programName: item.projectName,
									programCode: item.projectNo,
									//supplierName: item.supplier_company_name,
									productName: item.productName,
									purchaseCount: item.purchaseNum,
									productSpec:item.productSpec,
									startTime: dayjs(item.publishedAt).format('YYYY-MM-DD HH:mm:ss'),
									endTime: dayjs(item.tenderDeadline).format('YYYY-MM-DD HH:mm:ss'),
									isShowCheckBtn: false,
									isShowEditBtn: false
								}
								const { color, text } = this.getStatusInfo(item.status);
								element.statusColor = color;
								element.statusText = text;
								console.log(text)
								// if(item.status === 'PRE_FINISH') { //流程控制决定显示或隐藏按钮
								// 	element.isShowCheckBtn = true;
								// 	if(item.records.length > 0) {
								// 		element.recordId = item.records[0]['id'];
								// 	}
								// }
								// if(item.status === 'REJECT') { //集团驳回联采需求
								// 	element.isShowEditBtn = true;
								// }
								this.demandList.push(element);
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
			getStatusInfo(status) { //获取状态颜色和文案
				let color;
				let text;
				console.log(status)
				switch (status) {
					case 2:
						color = DEMAND_COLOR_WAIT_FOR_CHECK;
						text = '待审核';
						break;
					case 8: 
						color = DEMAND_COLOR_REJECT;
						text = '报价驳回';
						break;
					case 7: 
						color = DEMAND_COLOR_WAIT_FOR_QUOTE;
						text = '待确认报价';
						break;
					case 3: 
						color = DEMAND_COLOR_BRANCH_REJECT;
						text = '需求驳回';
						break;
						color = DEMAND_COLOR_ABORTION;
						text = '已流标';
						break;
					case 7:
						color = DEMAND_COLOR_WAIT_FOR_BRANCH_CHECK;
						text = '待确认';
						break;
					case 4:
						color = DEMAND_COLOR_SUCCESS;
						text = '已通过';
						break;
					case 5:
						color = DEMAND_COLOR_SUCCESS;
						text = '已通过';
						break;
					case 9:
						color = DEMAND_COLOR_SUCCESS;
						text = '已完成';
						break;
					default:
						color = '#0066cc';
						text = ''
				}
				return {
					color,
					text
				}
			},
            init() { //初始化
                this.currentPage = 1; //重置当前页
                this.demandList = []; //清空当前列表
                this.getDemandList();
            },
			loadMore() { //加载更多
				if(this.loading) {
					return false
				}
				if(this.currentPage >= this.totalPage) {
					return false
				}
				this.currentPage += 1;
				this.getDemandList()
			},
			search() { //搜索
				this.init();
			},
			approve(demandId, recordId) { //同意
				uni.navigateTo({
					url: `/pages/branch/demand/approve/approve?demandId=${demandId}&recordId=${recordId}`
				})
			},
			reject(demandId, recordId) { //驳回
				uni.navigateTo({
					url: `/pages/branch/demand/reject/reject?demandId=${demandId}&recordId=${recordId}`
				})
			},
			viewDetail(demandId) { //查看详情
				uni.navigateTo({
					url: `/pages/branch/demand/detail/detail?demandId=${demandId}`
				})
			},
			edit(demandId) { //编辑联采需求
				uni.navigateTo({
					url: `/pages/branch/demand/edit/step1?demandId=${demandId}`
				})
			},
            getAuth() { //获取权限
                const demandListPermissionObj = this.$store.getters.permissionList.MobileJointPurchaseOrderList;
                this.$func.getAuth(demandListPermissionObj, this.demandListAuthObj)
            }
		}
	}
</script>

<style lang="scss" scoped>
	.list-wrapper {
		padding-bottom: 20upx;
		.header {
			display: flex;
			flex-wrap: nowrap;
			padding: 20upx 30upx;
			background: #fff;
			border-bottom: 1px solid #eee;
			.search-view {
				position: relative;
				flex-grow: 1;
				padding-right: 40upx;
				// border-right: 1px solid #ddd;
				font-size: 24upx;
				input {
					background: #eee;
					padding-left: 56upx;
				}
				.input-placeholder {
					font-size: 24upx;
				}
				.search-icon {
					position: absolute;
					top: 12upx;
					left: 20upx;
					display: inline-block;
					font-size: 30upx;
					color: #999;
				}
			}
			.select-view {
				position: relative;
				width: 170upx;
				padding-right: 20upx;
				font-size: 28upx;
				line-height: 56upx;
				color: $uni-color-primary;
				text-align: center;
				.select-icon {
					position: absolute;
					top: 0;
					right: 0;
					font-size: 30upx;
					color: $uni-color-primary;
				}
			}
		}
		.nav-bar-view {
			position: sticky;
			/* #ifdef APP-PLUS */
			top: 0;
			/* #endif */
			/* #ifdef H5 */
			top: var(--window-top);
			/* #endif */
			width: 100%;
			height: 88upx;
			line-height: 88upx;
			background: #fff;
			font-size: 28upx;
			color: #333333;
			margin:20upx 0;
			.nav-bar {
				display: -webkit-box;
				.nav-item {
					width: 25%;
					text-align: center;
					.desc {
						position: relative;
						.tip {
							position: absolute;
							top: -3upx;
							right: -6upx;
							display: inline-block;
							width: 12upx;
							height: 12upx;
							background: #EE1E1E;
							border-radius: 50%;
							visibility: hidden;
							opacity: 0;
							transform: scale(0);
							transition: all .5s ease;
						}
						.tip-show {
							visibility: visible;
							opacity: 1;
							transform: scale(1);
						}
					}
				}
				.active {
					color: $uni-color-primary;
				}
			}
			.line {
				position: absolute;
				left: 100upx;
				bottom: 0;
				width: 90upx;
				height: 6upx;
				border-radius: 3px;
				background: $uni-color-primary;
				transition: all .5s ease;
			}
		}
		.content {
			.item-wrapper {
				background: #fff;
				padding: 10upx 30upx;
				margin-bottom: 20upx;
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
					.line {
						display: inline-block;
						width: 6upx;
						height: 32upx;
						margin-right: 20upx;
						border-radius: 3upx;
						vertical-align: middle;
					}
				}
				.item-content {
					display: flex;
					flex-wrap: nowrap;
					padding-top: 30upx;
					.content {
						flex-grow: 1;
						line-height: 56upx;
						font-size: 28upx;
						color: #999;
						overflow: hidden;
						.desc {
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}
					}
					.operation-wrapper {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						width: 180upx;
						font-size: 24upx;
						color: $uni-color-primary;
						.btn {
							width: 160upx;
							height: 48upx;
							line-height: 48upx;
							text-align: center;
							border: 1upx solid $uni-color-primary;
							border-radius: 4upx;
							margin-top: 20upx;
						}
					}
				}
			}
		}
	}
</style>
