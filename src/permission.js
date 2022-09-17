import router from './router'
import store from './store'
import Vue from 'vue'
// const whiteList = ['/register.html', '/index.html', '/admin/login.html', ];
import { getToken } from '@/util/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'




router.beforeEach((to, from, next) => {
    NProgress.start();
    document.title = to.meta.title;
    let token = store.getters.token ? store.getters.token : getToken();
    if (token) { //判断是否已经登陆
        if (to.path === '/login.html') {
            next({ path: '/manage' });
            NProgress.done()
            return;
        } else {
            if (store.getters.addRouters.length === 0) {
                console.log(1)
                //尝试获取当前用户信息
                // try {
                store.dispatch('generateRoutes').then(addRouters => {
                    //生成路由信息
                    router.addRoutes(addRouters);
                    //渲染页面
                    next({ ...to, replace: true });
                }).catch(error => { //可能登陆凭证失效
                    console.log(error)
                    next({ path: '/' })
                    return;
                })
                return;

            } else {
                next();
                return;
            }
        }

    } else { //如果没有token状态
        // 判断当前是否属于白名单
        if (to.matched.some(record => !record.meta.requiresAuth)) {
            next();
            return;
        } else {
            next({ path: '/admin/login.html' });
            return;
        }
    }
});

router.afterEach(() => {
    NProgress.done()
});