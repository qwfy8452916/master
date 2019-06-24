import {get, post, put, del} from '../../common/utils/request.js'

const apis = {
	demandAdd(data) { //新增联采需求
		return post('/api/jiangjian/req/req', { data })
	},
	
	incompleteDemandDetail(incompleteDemandId) { //不完整需求详情
		return get('/api/jiangjian/req/req/' + incompleteDemandId)
	},
	
	demandDetail(id) { //联采需求详情
		return get('/api/jiangjian/req/req/' + id)
	},
	
	demandUpdate(data, demandId) { //编辑联采需求
		return put('/api/jiangjian/req/req/' + demandId, { data })
	},
	
	demandList(data) { //联采需求列表
		return get('/api/jiangjian/req/req', { data })
	},
	
	demandDelete(data, demandId) { //删除未完成需求
		return del('/api/jiangjian/req/req/' + demandId, { data })
	},
	
	purchaseMaxCount(data) { //可采购最大数量
		return get('/api/frontend/joint_purchase/super/branch/demand/calculate_max_purchase_num', { data })
	},
	
	
	
	demandProcess(data, id) { //需求状态进度
		return get('/api/frontend/joint_purchase/super/joint_log/demandProcess/' + id, { data })
	},
	
	
	
	demandProcessLog(data) { //操作日志
		return get('/api/frontend/joint_purchase/super/joint_log/lists', { data })
	},
	
	demandExamine(data, demandPurchaseId) { //审核需求单
		return post('/api/frontend/joint_purchase/super/branch/demand/examine/' + demandPurchaseId, { data })
	},
	
	demandEdit(data, demandId) { //编辑联采需求
		return post('/api/mobile/joint_purchase/super/branch/demand/edit/' + demandId, { data })
	},
	
	incompleteDemandList(data) { //不完整需求列表
		return get('/api/mobile/joint_purchase/super/branch/demand/lists', { data })
	}
	
	
}

export default apis