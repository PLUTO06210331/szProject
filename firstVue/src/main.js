// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import propMessage from '@/components/propMessage'
import game from '@/components/game'
import 'iview/dist/styles/iview.css';
import iView from 'iview';
import Vuex from 'vuex';
import bus from 'vue-bus';

Vue.use(bus);
Vue.use(iView);
Vue.use(Vuex);

Vue.component('prop-message',propMessage);
Vue.component('prop-game',game);
Vue.directive('drag',{
  inserted: function (el) {
    el.focus()
  }
});
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    count: 0,
    list: [1,5,6,10,30,50]
  },
 /* getters: {
    filteredList: state => {
      return state.list.filter(item => item < 10);
    },
    listCount: (state,getters) => {
      return getters.filteredList.length;
    }
  },*/
  mutations: {
    increment (state) {
      state.count++;
    },
    decrease (state) {
      state.count--;
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
