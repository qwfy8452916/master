/*
 *axiox封装，请求、响应拦截，错误统一处理
 */
import axios from 'axios'
import { MessageBox } from 'element-ui'
import router from '../router'

// const development_url = 'http://localhost:8080';
// const production_url = 'http://192.168.1.64:9012/ling';

// if(process.env.NODE_ENV === 'development') {
// 	axios.defaults.baseURL = development_url;
// }else if(process.env.NODE_ENV === 'production'){
// 	axios.defaults.baseURL = production_url;
// }

//请求超时时间
axios.defaults.timeout = 15000;

//响应拦截器
axios.interceptors.response.use(
	//状态码200
	response => {
		if(response.status == 200){
			return Promise.resolve(response);
		}else{
			return Promise.reject(response);
		}
	},
	//状态码非200
	error => {
		if(error.response.status){
			switch (error.response.status) {
				//403 token过期
				//清掉cookie中的token，跳转到登录页
				case 403:
					window.$cookies.remove();
					MessageBox({
						title: '提示',
						message: '登录过期，请重新登陆',
						type: 'warning',
						showConfirmButton: false,
						showClose: false,
						closeOnClickModal: false
					})
					setTimeout(() => {
						router.replace({
							path: '/login',
							query: {redirect: router.currentRoute.fullPath}
						})
					},1500)
					break;
				default:
					MessageBox({
						title: '提示',
						message: error.response.data.message,
						type: 'warning'
					})
					break;
			}
			return Promise.reject(error.response);
		}
	}
)

export default axios