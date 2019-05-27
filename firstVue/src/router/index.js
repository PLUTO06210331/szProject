import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/page/HelloWorld'
import firstChild from '@/page/firstChild'
import secondChild from '@/page/secondChild'


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/firstChild',
      name:'firstChild',
      component: firstChild,
      children:[
        {
          path:'/secondChild',
          name:'secondChild',
          component: secondChild,
        }
      ]
    }
  ]
})
