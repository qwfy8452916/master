// const DEVELOPMENT_URL = 'http://192.168.1.39:9012/ling'
const DEVELOPMENT_URL = 'http://192.168.1.64:9012/ling'
const PRODUCTION_URL = 'http://172.16.200.93:9012/ling'
let baseURL = ''

if(process.env.NODE_ENV === 'development'){
    baseURL = DEVELOPMENT_URL;
}else{
    baseURL = PRODUCTION_URL;
}

export { baseURL }

/**
 * GET请求
 * @param  {String} url 请求url
 * @param  {Object} options.data 请求参数
 * @param  {Object} options.header 请求头部
 * @return {Object} Promise对象
 */
export const get = function(url, {data, header}={}) {
	return new Promise(function(resolve, reject) {
		const config = {
			method: 'GET'
		};
		config.url = baseURL + url;
		if(data){
			config.data = data;
		}
		if(header){
			config.header = header;
		}
		config.success = function(res) {
			resolve(res)
		};
		config.fail = function(err) {
			reject(err)
		}
		uni.request(config)
	})
}
/**
 * POST请求
 * @param  {String} url 请求url
 * @param  {Object} options.data 请求参数
 * @param  {Object} options.header 请求头部
 * @return {Object} Promise对象
 */
export const post = function(url, {data, header}={}) {
	return new Promise(function(resolve, reject) {
		const config = {
			method: 'POST'
		};
		config.url = baseURL + url;
		if(data){
			config.data = data;
		}
		if(header){
			config.header = header;
		}
		config.success = function(res) {
			resolve(res)
		};
		config.fail = function(err) {
			reject(err)
		}
		uni.request(config)
	})
}

/**
 * PUT请求
 * @param  {String} url 请求url
 * @param  {Object} options.data 请求参数
 * @param  {Object} options.header 请求头部
 * @return {Object} Promise对象
 */
export const put = function(url, {data, header}={}) {
	return new Promise(function(resolve, reject) {
		const config = {
			method: 'PUT'
		};
		config.url = baseURL + url;
		if(data){
			config.data = data;
		}
		if(header){
			config.header = header;
		}
		config.success = function(res) {
			resolve(res)
		};
		config.fail = function(err) {
			reject(err)
		}
		uni.request(config)
	})
}

/**
 * DELETE请求
 * @param  {String} url 请求url
 * @param  {Object} options.data 请求参数
 * @param  {Object} options.header 请求头部
 * @return {Object} Promise对象
 */
export const del = function(url, {data, header}={}) {
	return new Promise(function(resolve, reject) {
		const config = {
			method: 'DELETE'
		};
		config.url = baseURL + url;
		if(data){
			config.data = data;
		}
		if(header){
			config.header = header;
		}
		config.success = function(res) {
			resolve(res)
		};
		config.fail = function(err) {
			reject(err)
		}
		uni.request(config)
	})
}