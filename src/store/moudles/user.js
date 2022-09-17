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
                    // const token = data.token;
                    // const roles = data.user.roles;
                    // console.log(roles);


                    commit('SET_TOKEN', token);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
};



export default { state, mutations, actions };