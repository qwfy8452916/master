import { get, post, put, del} from 'http.js'
const apis = {
	//微信小程序员工登录
	postwxlogin(data){
		return post('user/emp/wxlogin', {data})
  },
  //微信小程序员工登录
	postwxloginaccount(data){
		return post('user/emp/wxlogin/account', {data})
  },
  //获取权限
	getAuthority(data){
		return get('authz/perm/emp/map', {data})
  },
  //获取账户信息
  getAccountData(data){
    return get('fin/org/account',{data})
  },
  //功能区商品-功能区下拉列表
  getHotelFunctionList(data) {
    return get('hotel/func/hotel/vaild/func', { data })
  },
  //获取组织待收入记录列表信息
  getWaitDivide(data) {
    return get('fin/org/pending', {data})
  },
  //获取待入账详情
  waiteEntryRecordDetail(id){
    return get('fin/org/pending/'+id)
  },
  //获取入账记录
  incomeRecord(data){
    return get('fin/org/income',{data})
  },
  //获取入账记录详情
  incomeRecordDetail(id){
    return get('fin/org/income/'+id)
  },
  //提现明细
  withdrawMoneylist(data){
    return get('fin/withdraw',{data})
  },
  //获取银行信息
  getBankInfo(data){
    return get('fin/org/account',{data})
  },
  //提现
  withdrawal(data){
    return post('fin/withdraw',{data})
  },
  //字典表
  basicDataItems(data){
    return get('basic/dict/items',{data})
  },
  //查看卡券批次列表（分页，条件）
  getCardticketList(data){
    return get('vou/batch',{data})
  },
  //卡券启用禁用
  cardSwitch(id){
    return put('vou/batch/active/'+id)
  },
  //获取卡券线上抵扣商品
  getCardticketProd(data){
    return get('prod/hotel/product/org/entity/prod',{data})
  },
  //根据商品Id查看规格列表
  getCardticketProdspec(data){
    return get('prod/hotel/product/spec',{data})
  },
  //新增卡券批次
  cardticketAdd(data){
    return post('vou/batch',{data})
  },
  //查看卡券批次详情
  cardticketDetail(id){
    return get('vou/batch/'+id)
  },
  //修改卡券批次
  cardticketEdit(data,id){
    return put('vou/batch/'+id,{data})
  },
  //删除卡券批次
  deleCardticket(id){
    return del('vou/batch/'+id)
  },
  //获取顾客数据
  getCardUser(data){
    return get('vou/voucher/vou/cus',{data})
  },
  //获取卡券批次数据
  getCardticketList(data){
    return get('vou/batch',{data})
  },
  //获取用户卡券
  getUseCardticketList(data) {
    return get('vou/voucher', { data })
  },
  //用户卡券延长有效期
  delayCardticketDate(data,id){
    return put('vou/voucher/term/'+id,{data})
  },
  //查看用户卡券详情
  getUseCardticketDetail(id){
    return get('vou/voucher/'+id)
  },
  //根据vouId获取卡券使用记录
  getUseCardticketRecord(data){
    return get('vou/used/record',{data})
  },
  //提现详情
  getcashdetail(id){
    return get('fin/withdraw/'+id)
  },
  //转赠记录
  giveRecord(data){
    return get('vou/giving/record',{data})
  },


}

export default apis