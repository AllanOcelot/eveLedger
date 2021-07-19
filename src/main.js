import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import vuetify from './plugins/vuetify'



Vue.config.productionTip = false


// Buefy 
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#content',
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
