import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'login',
            meta: { title: '登录' },
            component: resolve => require(['@/pages/login'], resolve)
        },
        {
            path: '/print',
            name: 'print',
            meta: { title: '打印' },
            component: resolve => require(['@/pages/print'], resolve)
        },
        {
            path: '/home',
            name: 'home',
            redirect: '/home/index',
            component: resolve => require(['@/pages/home'], resolve),
            children: [{
                    path: '/home/index',
                    name: 'homeindex',
                    meta: { title: '首页' },

                    component: resolve => require(['@/pages/home/home-index'], resolve)
                },
                //订单管理
                {
                    path: '/home/order/manage',
                    name: 'ordermanage',
                    meta: { title: '订单管理' },
                    component: resolve => require(['@/pages/order/manage'], resolve)
                },
                {
                    path: '/home/order/clientInfo',
                    name: 'orderclientInfo',
                    meta: { title: '客户信息' },
                    component: resolve => require(['@/pages/order/clientInfo'], resolve)
                },
                //面料管理
                {
                    path: '/home/fabric/info',
                    name: 'fabricinfo',
                    meta: { title: '面料信息' },
                    component: resolve => require(['@/pages/fabric/info'], resolve)
                },
                {
                    path: '/home/fabric/price',
                    name: 'fabricprice',
                    meta: { title: '面料价格' },
                    component: resolve => require(['@/pages/fabric/price'], resolve)
                },
                {
                    path: '/home/fabric/goods',
                    name: 'goods',
                    meta: { title: '物料管理' },
                    component: resolve => require(['@/pages/fabric/goods'], resolve)
                },
                {
                    path: '/home/fabric/allot',
                    name: 'allot',
                    meta: { title: '调拨管理' },
                    component: resolve => require(['@/pages/fabric/allot'], resolve)
                },
                //档案管理
                {
                    path: '/home/record/craft',
                    name: 'recordcraft',
                    meta: { title: '工艺' },
                    component: resolve => require(['@/pages/record/craft2'], resolve)
                },
                {
                    path: '/home/record/system',
                    name: 'system',
                    meta: { title: '系统档案' },
                    component: resolve => require(['@/pages/record/system'], resolve)
                },
                {
                    path: '/home/record/embroid',
                    name: 'recordembroid',
                    meta: { title: '刺绣' },
                    component: resolve => require(['@/pages/record/embroid'], resolve)
                },
                {
                    path: '/home/record/bodyPart',
                    name: 'recordbodyPart',
                    meta: { title: '量体部位' },
                    component: resolve => require(['@/pages/record/bodyPart'], resolve)
                },
                {
                    path: '/home/record/special',
                    name: 'recordspecial',
                    meta: { title: '特体' },
                    component: resolve => require(['@/pages/record/special'], resolve)
                },
                {
                    path: '/home/record/attireStyle',
                    name: 'recordattireStyle',
                    meta: { title: '着装风格' },
                    component: resolve => require(['@/pages/record/attireStyle'], resolve)
                },
                {
                    path: '/home/record/accidentStyle',
                    name: 'recordaccidentStyle',
                    meta: { title: '长短款' },
                    component: resolve => require(['@/pages/record/accidentStyle'], resolve)
                },
                {
                    path: '/home/record/designStyle',
                    name: 'recorddesignStyle',
                    meta: { title: '款式风格' },
                    component: resolve => require(['@/pages/record/designStyle'], resolve)
                },
                {
                    path: '/home/record/size',
                    name: 'size',
                    meta: { title: '尺寸管理' },
                    component: resolve => require(['@/pages/record/size'], resolve)
                },
                //款式管理
                {
                    path: '/home/design/manage',
                    name: 'designmanage',
                    meta: { title: '款式管理' },
                    component: resolve => require(['@/pages/design/manage'], resolve)
                },
                //款式工艺
                {
                    path: '/home/design/styleCraft',
                    name: 'styleCraft',
                    meta: { title: '款式管理' },
                    component: resolve => require(['@/pages/design/styleCraft'], resolve)
                },
                //人体模型
                {
                    path: '/home/personModel/info',
                    name: 'personModelinfo',
                    meta: { title: '人体模型信息' },
                    component: resolve => require(['@/pages/personModel/info'], resolve)
                },

                //问题管理
                {
                    path: '/home/problem/manage',
                    name: 'problemmanage',
                    meta: { title: '问题管理' },
                    component: resolve => require(['@/pages/problem/manage'], resolve)
                },

                //模型管理
                {
                    path: '/home/modelManage/infoManage',
                    name: 'modelManageinfoManage',
                    meta: { title: '模型管理信息' },
                    component: resolve => require(['@/pages/modelManage/infoManage'], resolve)
                },
                {
                    path: '/home/modelManage/anchor',
                    name: 'modelManageinfoAnchor',
                    meta: { title: '锚点管理' },
                    component: resolve => require(['@/pages/modelManage/anchor'], resolve)
                },

                //系统管理
                {
                    path: '/home/system/user',
                    name: 'systemuser',
                    meta: { title: '用户管理' },
                    component: resolve => require(['@/pages/system/user'], resolve)
                },
                {
                    path: '/home/system/menu',
                    name: 'systemmenu',
                    meta: { title: '菜单管理' },
                    component: resolve => require(['@/pages/system/menu'], resolve)
                },
                {
                    path: '/home/system/part',
                    name: 'systempart',
                    meta: { title: '角色管理' },
                    component: resolve => require(['@/pages/system/part'], resolve)
                },
                {
                    path: '/home/example',
                    name: 'example',
                    meta: { title: '客户信息' },
                    component: resolve => require(['@/pages/example/example'], resolve)
                },
                {
                    path: '/home/cashier/cashier-form',
                    name: 'cashier-form',
                    meta: { title: '收银列表' },
                    component: resolve => require(['@/pages/cashier/cashier-form'], resolve)
                },
                {
                    path: '/home/cashier/cotal-list',
                    name: 'cashier-form',
                    meta: { title: '总单列表' },
                    component: resolve => require(['@/pages/cashier/cotal-list'], resolve)
                },
                {
                    path: '/home/cashier/cashier-staff',
                    name: 'cashier-staff',
                    meta: { title: '店员维护' },
                    component: resolve => require(['@/pages/cashier/cashier-staff'], resolve)
                },
                {
                    path: '/home/cashier/cashier-store',
                    name: 'cashier-store',
                    meta: { title: '门店维护' },
                    component: resolve => require(['@/pages/cashier/cashier-store'], resolve)
                },
                {
                    path: '/home/cashier/activity',
                    name: 'activity',
                    meta: { title: '推销活动管理' },
                    component: resolve => require(['@/pages/cashier/activity'], resolve)
                },
                {
                    path: '/home/cashier/coupon',
                    name: 'coupon',
                    meta: { title: '优惠券管理' },
                    component: resolve => require(['@/pages/cashier/coupon'], resolve)
                },
                {
                    path: '/home/examples',
                    name: 'examples',
                    meta: { title: '收银台' },
                    component: resolve => require(['@/pages/example/examples'], resolve)
                },
                {
                    path: '/home/money',
                    name: 'money',
                    meta: { title: '收银台' },
                    component: resolve => require(['@/pages/example/money'], resolve)
                },
                {
                    path: '/home/supplier/supplier-manage',
                    name: 'supplier-manage',
                    meta: { title: '供应商管理' },
                    component: resolve => require(['@/pages/supplier/supplier-manage'], resolve)
                },
                {
                    path: '/home/warehouse/warehouse-into',
                    name: 'warehouse-into',
                    meta: { title: '入库管理' },
                    component: resolve => require(['@/pages/warehouse/warehouse-into'], resolve)
                },
                {
                    path: '/home/warehouse/warehouse-out',
                    name: 'warehouse-out',
                    meta: { title: '出库管理' },
                    component: resolve => require(['@/pages/warehouse/warehouse-out'], resolve)
                },
                {
                    path: '/home/warehouse/case-tend',
                    name: 'case-tend',
                    meta: { title: '仓库维护' },
                    component: resolve => require(['@/pages/warehouse/case-tend'], resolve)
                },
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if (!sessionStorage.getItem('token') && to.name != 'login') {
        next('/');
    }
    next()
})


export default router