// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import validate from './public/validate.js'
import HeaderSlot from '@/components/public/head-slot'
import PageCurrent from '@/components/public/page-current'
import axios from '@/router/axios';
import 'iview/dist/styles/iview.css';
import './assets/iconfont.css';
import './assets/common.scss';
import './assets/commonality.css'
iView.Message.config({ duration: 3 });

Vue.use(iView);
/* eslint-disable no-new */
Vue.prototype.$http = axios;
Vue.prototype.$validate = validate;
Vue.config.productionTip = false;
Vue.component('header-slot', HeaderSlot);
Vue.component('page-current', PageCurrent);
Vue.directive('drag', //自定义指令JS
    {
        bind: function(el) {
            let self = this;
            let oDiv = el.children[1].children[0].children[0];
            let els = el.children[1].children[0].children[0].children[1];
            els.onmousedown = function(e) {
                let disX = e.clientX - oDiv.offsetLeft;
                let disY = e.clientY - oDiv.offsetTop;
                document.onmousemove = function(e) {
                    let l = e.clientX - disX;
                    let t = e.clientY - disY;
                    oDiv.style.left = l + 'px';
                    oDiv.style.top = t + 'px';
                    if (parseInt(els.getBoundingClientRect().top) < 0) {
                        oDiv.style.top = '-' + (parseInt(disY) - 40) + 'px';
                    }
                };
                document.onmouseup = function(e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                return false;
            };
        }
    }
);
Vue.directive('com', {
    bind: function(el) {
        setTimeout(() => {
            var a = document.getElementById('tableBox');
            var b = window.innerHeight;
            var c = document.getElementsByClassName('searchForm')[0].offsetHeight;
            if (a) {
                a.style.height = b - 146 - c + 'px';
            }
        }, 200)
    }
})
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }

})