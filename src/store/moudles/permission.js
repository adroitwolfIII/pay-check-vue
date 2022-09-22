import { asyncUserRouterMap,asyncAdminRouterMap} from "@/config/router.config"
const state = {
    addRouters: [],
    menu: []
}


const mutations = {
    SET_ROUTES(state, addRouters) {
        state.addRouters = addRouters;
    },
    SET_MENUS(state, menu) {
        state.menu = menu;
    }
}


const actions = {
    generateRoutes({ commit },role) { //roles = ['管理员','用户'。。。]
        return new Promise((resolve, reject) => {
            let accessRouters = [];
            if(0 == role){ // 管理员
                accessRouters = asyncAdminRouterMap 
            }else{
                accessRouters = asyncUserRouterMap
            }
            commit('SET_ROUTES', accessRouters)
            resolve(accessRouters);
        });
    },
    generateMenu({ commit }, asynRouter) {
        //  动态选择后台菜单
        let menu = [];
        let head = [];
        asynRouter.forEach(element => {
            if (!element.meta.hideInMenu) {
                head = element;
            }
        });
        head.children.forEach(router => {
            let item = router;
            item.path = head.path + '/' + router.path;
            menu.push(item);
        });
        console.log(menu)
        commit('SET_MENUS', menu);
    }
}



export default {
    state,
    mutations,
    actions
}