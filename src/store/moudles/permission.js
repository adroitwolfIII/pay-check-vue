import { asyncRouterMap, constantRouterMap } from "@/config/router.config"
const state = {
    addRouters: [],
}


const mutations = {
    SET_ROUTES(state, addRouters) {
        state.addRouters = addRouters;
    }
}


const actions = {
    generateRoutes({ commit },) { //roles = ['管理员','用户'。。。]
        return new Promise((resolve, reject) => {
            let accessRouters = [];
            for (var i = 0; i < asyncRouterMap.length; i++) {
                accessRouters.push(asyncRouterMap[i]);
            }
            commit('SET_ROUTES', accessRouters)
            resolve(accessRouters);
        });
    }
}



export default {
    state,
    mutations,
    actions
}