const app =  getApp();
const baseURL = app.globalData.requestUrl
/**
 * GET请求
 */
export const get = function(url,{data}={}) {
	return new Promise(function(resolve, reject) {
		var config = {
			method: 'GET',
		}
		// let token = wx.getStorageSync('token')
		let token = app.globalData.token
		config.url = baseURL + url;
		config.data = data;
		config.header = {Authorization: token}
		config.success = function(res) {
			if(res.statusCode == 401){
				wx.reLaunch({
					url: 'pages/login/login'
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
		// let token = wx.getStorageSync('token')
		let token = app.globalData.token
		config.url = baseURL + url;
    config.data = data;
		config.header = {Authorization: token}
		config.success = function(res) {
			if(res.statusCode == 401){
				wx.reLaunch({
					url: 'pages/login/login'
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
		// let token = wx.getStorageSync('token')
		let token = app.globalData.token
		config.url = baseURL + url;
    config.data = data;
		config.header = {Authorization: token}
		config.success = function(res) {
			if(res.statusCode == 401){
				wx.reLaunch({
					url: 'pages/login/login'
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
		// let token = wx.getStorageSync('token')
		let token = app.globalData.token
		config.url = baseURL + url;
    config.data = data;
		config.header = {Authorization: token}
		config.success = function(res) {
			if(res.statusCode == 401){
				wx.reLaunch({
					url: 'pages/login/login'
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