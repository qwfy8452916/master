import { get, post, put, del} from 'http.js'
const apis = {
	//登录接口
	login(data){
		return post('/fs/investor/loginByWX',{data})
	},
	//订单接口
	order(data){
		return post('/fs/investor/order',{data})
	},
	//支付接口
	wxPay(data){
		return post('/fs/investor/order/pay',{data})
	},
	//计算金额
	amount(data){
		return post('/fs/investor/order/amount',{data})
	},
	//获取可用优惠券
	getcoupons(data){
		return get('/fs/investor/coupon/user',{data})
	},
	//领取优惠券
	getcoupon(data){
		return put('/fs/investor/coupon/user',{data})
	},
	//可领取优惠券
	getablecoupon(){
		return get('/fs/coupon')
	},
	//抽奖
	getawards(data){
		return get('/fs/investor/cabinet/user/fortune/star',{data})
	},
	//用户获取可抽取酒店
	getInitHotel(data){
		return get('/fs/hotel/user',{data})
	},
	//用户获取柜子（包含类型）
	getUserCabinet(data){
		return get('/fs/investor/cabinet/user/type',{data})
	},
	//用户获取柜子
	getUserCabinetAll(){
		return get('/fs/investor/cabinet/user')
	},
	//访问记录
	getUserAccess(data){
		return post('/fs/investor/access',{data})
	},
	//优惠券列表
	getUserCoupon(data){
		return get('/fs/investor/coupon/user/type',{data})
	},
	//注册投资人
	regInvestor(data){
		return put('/fs/investor/',{data})
	},
	//获取用户红包
	getredPacket(data) {
		return get('/fs/redPacket/user', {data})
	},
	//创建红包
	postredPacket(data) {
		return post('/fs/redPacket', {data})
	},
	//领取红包
	receiveenvelope(data) {
		return get('/fs/balance/detail/redPacket', {data})
	},
	//柜子类型
	getcabtype(){
		return get('/fs/cabType/all')
	},
	//渠道登录
	channelLogin(data) {
		return post('/fs/channelPartner/login', {data})
	},
	//渠道商分享链接
	channelLink(data) {
		return get('/fs/shareCode/channel', { data })
	},
	//渠道商分享链接添加
	channelLinkAdd(data) {
		return post('/fs/shareCode', { data })
	},
	//渠道商分享链接详情
	channelLinkDetail(id) {
		return get('/fs/shareCode/' + id)
	},
	//渠道商分享链接修改
	channelLinkEdit(data, id) {
		return put('/fs/shareCode/channel/' + id, { data })
	},
	//财富合伙人
	channelPartner(data){
		return get('/fs/investor/partner/all', { data })
	},
	//投资记录
	channelRecord(data){
		return get('/fs/investor/order/user', { data })
	},
	//我的社群
	mypartners(data) {
		return get('/fs/investor/partner/all', { data })
	},
	//我的社群投资记录
	mypartnerRecords(data) {
		return get('/fs/investor/order/user', { data })
	},
	//个人中心数据
	mypersonnalRecords() {
		return get('/fs/investor/userCenter')
	},
	//获取余额
	getmyCase(){
		return get('/fs/balance')
	},
	//提现申请
	drawmyCase(data){
		return post('/fs/balance/detail/cashOut',{data})
	},
	//微信授权
	wxgetaAuth(data){
		return post('/fs/investor/grantByWx',{data})
	},
	//微信授权
	wxgetshareCode(data){
		return get('/fs/shareCode/checkCode', {data})
	},
	//退款
	rebackMoney(data){
		return post('/fs/refound', {data})
	},
	//智盒市场
	cabMarket(data){
		return get('/fs/balance/market', {data})
	},
	//获取首发状态
	getFirstStatus(){
		return get('/fs/cabinet/status')
	},
	//升级财富特使
	upgrades(id){
		return put('/fs/investor/'+id+'/specialEnvoyLevel/appl')
	},
	//用户退款记录
	getRebackRecords(){
		return get('/fs/refound/user')
	},
	//获取柜子首发详情
	getCabFirstList(){
		return get('/fs/cabinet/detail')
	},
}

export default apis