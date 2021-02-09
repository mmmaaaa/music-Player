import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
Vue.config.productionTip = false
import VueRouter  from 'vue-router'
Vue.use(VueRouter)
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css';
import discovery from "@/views/discovery";
import playlists from "@/views/playlists";
import songs from "@/views/songs";
import mvs from "@/views/mvs";
import result from "@/views/05.result"
import playlist from "@/views/06.playlist"
import mv from "@/views/07.mv"
import './assets/index.css'
import axios from 'axios'
import moment from 'moment'
Vue.prototype.$moment = moment
moment.locale('zh-cn')
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
Vue.filter('formatDate', function(value) {
  return moment(value).format('YYYY-MM-DD')
})
Vue.filter('formatTime', function(value) {
  return moment(value).format('mm:ss')
})
let router = new VueRouter({
  routes:[
    {
      path:"/discovery",
      component:discovery
    },
    {
      path:"/",
      component:discovery
    },
    {
      path:"/playlists",
      component:playlists
    },
    {
      path:"/songs",
      component:songs
    },
    {
      path:"/result",
      component:result
    },
    {
      path:"/playlist",
      component:playlist
    },
    {
      path:"/mv",
      component:mv
    },
    {
      path:"/mvs",
      component:mvs
    },
  ]
})


// Vue.filter('datefmt', function (input, fmtstring) {
//   return moment.unix(input).format(fmtstring)
// })
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
