// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'

Vue.use(BootstrapVue)

Vue.use(Vuetify)

Vue.config.productionTip = false

// telling vue router sync to sync store to router
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // vue use store
  store,
  template: '<App/>',
  components: { App }
})
