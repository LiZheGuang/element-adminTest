
import axios from 'axios'
axios.interceptors.request.use(
	config => {
		// if (localStorage.JWT_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiYWRtaW4iLCJwYXNzd29yZCI6IjEyMyIsImlhdCI6MTU0NTAyMTc3MCwiZXhwIjoxNTQ1MTA4MTcwfQ.No_h3OjlgviT5yMT6Qe_rex62Jg7RYQgRjUWbJQemxM`;
		// }
		return config;
	},
	err => {
		return Promise.reject(err);
	});

// 订单列表
export const getOrderList = () => axios.get('/api/order/adminList?userId=5c17294a369caa1845d4a866')

// 商品列表 /commodity/list
export const getCommodityList = () => axios.get('/api/commodity/list')

// 创建商品 
export const postCommodityCreation = data => axios.post('/api/commodity/creation',data)

// 商品上架 
export const postEditStatus = data => axios.post('/api/commodity/editStatus',data)

// 用户列表
export const getUserList = ()=> axios.get('/api/user')

export const postIsAdmin = data => axios.post('/api/user/loginAdmin',data)