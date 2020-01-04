const app =  getApp();
const baseURL = app.globalData.apiUrl
/**
 * GET请求
 */
export const get = function(url,{data}={}) {
	return new Promise(function(resolve, reject) {
		var config = {
			method: 'GET',
		}
		let investorId = wx.getStorageSync('userAuth').id
		let token = wx.getStorageSync('token')
		config.url = baseURL + url;
		if(data){
			config.data = data;
			if(url != '/fs/investor/order/user'){
				config.data.investorId = investorId
			}
		}else{
			if(url != '/fs/cabinet/detail'){
				config.data = {investorId: investorId}
			}
		}
		config.header = {Authorization: token}
		config.success = function(res) {
			if(res.statusCode == 401){
				wx.showToast({
					title: '登录过期了,请重新打开小程序!',
					icon: 'none'
				})
			}
			resolve(res)
		};
		config.fail = function(err) {
			wx.showToast({
				title: '请求超时！请检查网络或稍后重试',
				icon: 'none',
				duration: 2000
			})
			reject(err)
		}
		wx.request(config)
	})
}
/**
 * POST请求
 */
export const post = function(url, {data}={}) {
	return new Promise(function(resolve, reject) {
		const config = {
			method: 'POST'
		};
		let investorId = wx.getStorageSync('userAuth').id
		let token = wx.getStorageSync('token')
		config.url = baseURL + url;
        config.data = data;
    	if (url != '/fs/investor/loginByWX' && url != '/fs/investor/order/pay' && url != '/fs/refound' && url != '/fs/investor/grantByWx'){
			config.data.investorId = investorId
		}
		config.header = {Authorization: token}
		config.success = function(res) {
			if(res.statusCode == 401){
				wx.showToast({
					title: '登录过期了,请重新打开小程序!',
					icon: 'none'
				})
			}
			resolve(res)
		};
		config.fail = function(err) {
			wx.showToast({
				title: '请求超时！请检查网络或稍后重试',				
				icon: 'none'
			})
			reject(err)
		}
		wx.request(config)
	})
}

/**
 * PUT请求
 */
export const put = function(url, {data}={}) {
	return new Promise(function(resolve, reject) {
		const config = {
			method: 'PUT'
		};
		let investorId = wx.getStorageSync('userAuth').id
		let token = wx.getStorageSync('token')
		config.url = baseURL + url;
		config.data = data;
		if(url == '/fs/investor/'){
			config.url += investorId
		}else if(url.indexOf("/specialEnvoyLevel/appl") == -1){
			config.data.investorId = investorId
		}
		config.header = {Authorization: token}
		config.success = function(res) {
			if(res.statusCode == 401){
				wx.showToast({
					title: '登录过期了,请重新打开小程序!',
					icon: 'none'
				})
			}
			resolve(res)
		};
		config.fail = function(err) {
			wx.showToast({
				title: '请求超时！请检查网络或稍后重试',				
				icon: 'none'
			})
			reject(err)
		}
		wx.request(config)
	})
}

/**
 * DELETE请求
 */
export const del = function(url, {data}={}) {
	return new Promise(function(resolve, reject) {
		const config = {
			method: 'DELETE'
		};
		let investorId = wx.getStorageSync('userAuth').id
		let token = wx.getStorageSync('token')
		config.url = baseURL + url;
		config.data = data;
		config.data.investorId = investorId		
		config.header = {Authorization: token}
		config.success = function(res) {
			if(res.statusCode == 401){
				wx.showToast({
					title: '登录过期了,请重新打开小程序!',
					icon: 'none'
				})
			}
			resolve(res)
		};
		config.fail = function(err) {
			wx.showToast({
				title: '请求超时！请检查网络或稍后重试',				
				icon: 'none'
			})
			reject(err)
		}
		wx.request(config)
	})
}