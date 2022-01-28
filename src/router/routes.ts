const routes: Array<any> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index/Index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/frame',
    name: 'Frame',
    component: () => import('@/views/frame/Frame.vue'),
    children: [
      {
        path: '/main',
        name: 'Main',
        component: () => import('@/views/main/Main.vue')
      },
      {
        path: '/employee',
        name: 'Employee',
        component: () => import('@/views/employee/Employee.vue')
      },
      {
        path: '/prize',
        name: 'Prize',
        component: () => import('@/views/prize/Prize.vue')
      },
      {
        path: '/none',
        name: 'None',
        component: () => import('@/views/none/None.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'None' }
  }
];

export default routes;
