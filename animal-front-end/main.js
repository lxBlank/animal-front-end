import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'


Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView)
const app = new Vue({
    ...App
})
app.$mount()


