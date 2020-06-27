import Vue from 'vue'
import App from './App'

// 引入请求方法
import request from './utils/request.js'

Vue.prototype.$request = request;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
