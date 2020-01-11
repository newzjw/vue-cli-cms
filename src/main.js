// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'styles/reset.css'
import 'styles/border.css'
// 导入 MUI 的样式
import mui from './lib/mui/js/mui.min.js'
import './lib/mui/css/mui.css'

// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'
// 导入 MUI 的样式
import '@/lib/mui/css/mui.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 导入格式化时间的插件 需要下载cnpm i moment -S
import moment from 'moment'
// 安装 图片预览插件
// import VuePreview from 'vue-preview'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Vue.use(Viewer)
Vue.use(MintUI)
Vue.prototype.mui = mui
// Vue.use(VuePreview)

Vue.config.productionTip = false

// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
