const getters = {
    token: state => state.user.token,
    addRouters: state => state.permission.addRouters,
    menus: state => state.permission.menu
}


export default getters