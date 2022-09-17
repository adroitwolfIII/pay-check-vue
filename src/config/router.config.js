
const component = {
    template: `
    <div class="component">
      <router-view></router-view>
    </div>
  `
}


/*基础路由 */
export const constantRouterMap = [{
    path: '/',
    redirect: '/index.html'
}, {
    path: '/login.html',
    meta: { title: '登陆', requiresAuth: false },
    name: 'Login',
    component: () =>
        import ('@/views/login')
}, {
    path: '/index.html',
    name: '工资查询',
    meta: { title: "工资查询", requiresAuth: false },
    component: () =>
        import ('@/views/check'),
}
]


// 动态路由

export const asyncRouterMap = [{
  path: '/manage',
  meta: { title: '员工薪资管理', requiresAuth: false, hideInMenu: true },
  name: '员工薪资管理',
  component: () =>
      import ('@/views/manage')
}]