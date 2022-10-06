import userApi from '@/api/user'


import { getToken, setToken, removeToken } from '@/util/auth'


const state = {
    token: null
};



const mutations = {

    SET_TOKEN: (state, token) => {
        setToken(token);
        state.token = token;
    }

};


const actions = {
    login({ commit }, { username, password }) {
        return new Promise((resolve, reject) => {
            userApi.login(username, password)
                .then(response => {
                    const token = response.data;
                   
                    commit('SET_TOKEN', token);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
    logout({ commit }) {
        //     return new Promise((resolve, reject) => {
        //         let autoToken = {};
        //         autoToken.accessToken = state.accessToken;
        //         autoToken.refreshToken = state.refreshToken;
        //         adminApi.logout(autoToken).then(response => {
        //             this.clear_Info();
        //         }).catch(error => {
        //             reject(error);
        //         })
        //     })
        // },
        // clear_Info({ commit }) {
        removeToken(); //删除cookie
        //清除用户信息
        commit("SET_TOKEN", '');
    },
};



export default { state, mutations, actions };