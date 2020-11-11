import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueSocketIO from 'vue-socket.io'
Vue.config.productionTip = false
import './assets/styles/index.css';
import Notifications from 'vue-notification'
Vue.use(Notifications)
import Datetime from 'vue-datetime';

Vue.use(Datetime);



Vue.use(new VueSocketIO({
  debug: true,
  // connection: 'http://192.168.1.8:3000/',
  connection: 'http://646836d8989b.ngrok.io',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  // options: { path: "/my-app/" } //Optional options
}))

// import '@/assets/css/tailwind.css'
// import './assets/css/tailwind.css';


new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
