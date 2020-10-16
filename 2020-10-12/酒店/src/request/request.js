/*
 *axiox封装，请求、响应拦截，错误统一处理
 */
import axios from 'axios'
import { MessageBox } from 'element-ui'
import router from '../router'

// const development_url = 'http://192.168.1.122:9001/longan/api';
// const production_url = 'http://';

// if(process.env.NODE_ENV === 'development'){
// 	axios.defaults.baseURL = development_url;
// }else if(process.env.NODE_ENV === 'production'){
// 	axios.defaults.baseURL = production_url;
// }

let that =
	//请求超时时间
	axios.defaults.timeout = 15000;

//请求拦截器
axios.interceptors.request.use( //这里的config包含每次请求的内容
	config => {
		if (config.url == '/longan/api/user/login') {
			return config
		} else {
			const token = localStorage.getItem('Authorization');
			if (token) {
				config.headers.Authorization = token;
				return config
			}
			else {
				router.push({ name: 'login' });
				return config
			}
		}
	},
	error => {
		return Promise.reject(error)
	}
)

//响应拦截器
axios.interceptors.response.use(
	//状态码200
	response => {
		if (response) {
			if (response.status == 200) {
				return Promise.resolve(response);
			} else if (response.status == 401) {
				setTimeout(() => {
					router.replace({
						path: '/login',
					})
				}, 1500)
				// MessageBox({
				// 	title: '提示',
				// 	message: '登录过期，请重新登录',
				// 	type: 'warning',
				// 	showClose: false,
				// 	closeOnClickModal: false,
				// 	callback: function () {
				// 		// event.stopPropagation();
				// 	}
				// })
				response = "检测到您未登录，请登录!"
			} else {
				return Promise.reject(response);
			}
		} else {
			setTimeout(() => {
				router.replace({
					path: '/login',
				})
			}, 1500)
			return Promise.reject("请求未响应！");
		}
	},
	//状态码非200
	error => {
		if (error.response) {
			if (error.response.status) {
				switch (error.response.status) {
					//403 token过期
					//清掉cookie中的token，跳转到登录页
					case 401:
						setTimeout(() => {
							router.replace({
								path: '/login',
							})
						}, 1500)
						// MessageBox({
						// 	title: '提示',
						// 	message: '登录过期，请重新登录',
						// 	type: 'warning',
						// 	showClose: false,
						// 	closeOnClickModal: false,
						// 	callback: function (action) {
						// 		// event.stopPropagation();
						// 		// console.log(action)
						// 	}
						// })
						error.response = "检测到您未登录，请登录!"
						break;
					case 403:
						window.$cookies.remove('token');
						// MessageBox({
						// 	title: '提示',
						// 	message: '登录过期，请重新登录',
						// 	type: 'warning',
						// 	showConfirmButton: false,
						// 	showClose: false,
						// 	closeOnClickModal: false
						// })
						error.response = "检测到您未登录，请登录!"
						setTimeout(() => {
							router.replace({
								path: '/login',
								query: { redirect: router.currentRoute.fullPath }
							})
						}, 1500)
						break;
					case 404:
						// MessageBox({
						// 	title: '提示',
						// 	message: '网络请求不存在',
						// 	type: 'warning',
						// 	showConfirmButton: false,
						// 	showClose: false,
						// 	closeOnClickModal: false
						// })
						error.response = "网络请求不存在"
						break;
					default:
						// MessageBox({
						// 	title: '提示',
						// 	message: error.response.data.msg||"报错了，请联系管理员！",
						// 	type: 'warning'
						// })
						setTimeout(() => {
							router.replace({
								path: '/login',
							})
						}, 1500)
						error.response = "网络请求错误，或者登录失效！"
						break;
				}
				return Promise.reject(error.response);
			}
		} else {
			setTimeout(() => {
				router.replace({
					path: '/login',
				})
			}, 1500)
			return Promise.reject("请求未响应！");
		}
	}
)

export default axios