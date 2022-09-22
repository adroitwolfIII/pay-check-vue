import router from './router'
import store from './store'
import Vue from 'vue'
// const whiteList = ['/register.html', '/index.html', '/admin/login.html', ];
import { getToken } from '@/util/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import userApi from '@/api/user'



router.beforeEach((to, from, next) => {
    NProgress.start();
    document.title = to.meta.title;
    let token = store.getters.token ? store.getters.token : getToken();
    if (token) { //判断是否已经登陆
        if (to.path === '/login.html') {
            next({ path: '/man' });
            NProgress.done()
            return;
        } else {
            if (store.getters.addRouters.length === 0) {
                userApi.info().then(res => {
                    store.dispatch('generateRoutes', res.data.type).then(addRouters => {
                        //生成路由信息
                        addRouters.forEach(element => {
                            router.addRoute(element)
                        });
                        // router.addRoutes(addRouters);

                        // 生成后台菜单
                        store.dispatch('generateMenu', addRouters);
                        //渲染页面
                        next({ ...to, replace: true });
                    }).catch(error => { //可能登陆凭证失效
                        next({ path: '/' })
                        return;
                    })
                })
            }else{
                next();
                return;
            }
        }
    }else { //如果没有token状态
        // 判断当前是否属于白名单
        console.log(to)
        console.log(to.matched.some(record => !record.meta.requiresAuth))
        if (to.matched.some(record => !record.meta.requiresAuth)) {
            next();
            return;
        } else {
            next({ path: '/' });
            return;
        }
    }
});
router.afterEach(() => {
    NProgress.done()
});