
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
  meta: { title: '登陆', requiresAuth: false },
  name: 'Login',
  component: () =>
    import('@/views/login')
}, {
  path: '/register',
  meta: { title: '注册', requiresAuth: false },
  name: 'Register',
  component: ()=> import('@/views/register')
}
]


/* 普通管理员动态路由 */

/* 普通管理员动态路由 */

export const asyncAdminRouterMap = [
  {
    path: '/man',
    name: '后台主页',
    redirect: '/man/manage',
    component: () =>
      import('@/views/index'),
    meta: { title: '后台主页' },
    children: [{
      path: 'manage',
      meta: { title: '员工薪资管理', hideInMenu: true },
      name: '员工薪资管理',
      component: () =>
        import('@/views/manage')
    }]
  }]



export const asyncUserRouterMap = [

  {
    path: '/man',
    name: '后台主页',
    redirect: '/man/check',
    component: () =>
      import('@/views/index'),
    meta: { title: '后台主页' },
    children: [{
      path: 'check',
      name: '工资查询',
      meta: { title: "工资查询", requiresAuth: false },
      meta: { title: "工资查询", requiresAuth: false },
      component: () =>
        import('@/views/check'),
    }]
  }
]
