import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters'
import permission from './moudles/permission'
import user from './moudles/user'


export default new Vuex.Store({
  modules: {
    user,
    permission
  },
  getters
})
