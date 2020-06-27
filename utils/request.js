// 封装请求方法
module.exports = (params = {}) => {
	let url = params.url;
	let method = params.method;
	let header = params.header || {};
	let data = params.data || {};
	
	// 判断请求方式
	if(method) {
		method = mothod.toUpperCase();
		if(method == "POST") {
			header = {"content-type": "application/x-www-form-urlencoded"};
		}
	}
	
	// 请求前加载动画
	if(!params.hideLoading) {
		uni.showLoading({
			title: "加载中..."
		});
	}
	console.log(method);
	// 发起网络请求
	uni.request({
		url: url,
		method: method || 'GET',
		header: header,
		data: data,
		success: (res) => {
			if (res.statusCode && res.statusCode != 200) {
				// api 请求错误
				uni.showModal({
					content: res.msg
				});
				return;
			}
			typeof params.success == "function" && params.success(res.data);
		},
		fail: (err) => {
			uni.showToast({
				content: err.msg
			});
			typeof params.fail == "function" && params.fail(err.data);
		},
		complete: () => {
			// 网络请求结束, 关闭加载动画
			uni.hideLoading();
			typeof params.complete == "function" && params.complete();
			return;
		}
	})
}