
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/register', component: () => import('pages/Register.vue') },
      {
        name: 'LoginIn',
        path: '/login',
        component: () => import('pages/Login.vue')
      },
      { path: '/admin', component: () => import('pages/admin/Index.vue'), meta: { requireLogin: true} },
      {
        name: 'catalog',
        path: '/catalog',
        component: () => import('pages/Products.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
