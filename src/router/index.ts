import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '登录页面',
    component: LoginView
  },
  {
    path: '/home',
    name: '首页',
    component: () => { return import((`@/views/HomeView.vue`)) },
    redirect: '/home/dashboard',
    children: [
      {
        path: '/home/dashboard',
        name: '仪表盘',
        component: () => { return import((`@/views/dashboard/DashboardView.vue`))}
      },


      {
        path: '/human/home',
        name: '员工信息管理',
        component: () => { return import((`@/views/human/HomeView.vue`))},
        redirect: '/human/human',
        children: [
          {
            path: '/human/human',
            name: '员工信息管理',
            component: () => { return import((`@/views/human/HumanView.vue`))}
          },
          {
            path: '/human/entry',
            name: '员工入职登记',
            component: () => { return import((`@/views/human/EntryView.vue`))}
          },
          {
            path: '/human/department',
            name: '部门信息管理',
            component: () => { return import((`@/views/human/DepartmentView.vue`))}
          },
          {
            path: '/human/position',
            name: '职位信息管理',
            component: () => { return import((`@/views/human/PositionView.vue`))}
          },
        ]
      },

      {
        path: '/product/home',
        name: '产品设计',
        component: () => { return import((`@/views/product/HomeView.vue`))},
        redirect: '/product/files',
        children: [
          {
            path: '/product/files',
            name: '产品设计档案管理',
            component: () => { return import((`@/views/product/FilesView.vue`))}
          },
          {
            path: '/product/hero',
            name: '产品分类管理',
            component: () => { return import((`@/views/product/HeroView.vue`))}
          },
          {
            path: '/product/materials',
            name: '产品物料管理',
            component: () => { return import((`@/views/product/MaterialsView.vue`))}
          },
          {
            path: '/product/input',
            name: '产品档案登记',
            component: () => { return import((`@/views/product/InputView.vue`))}
          },
          {
            path: '/product/file',
            name: '设计档案管理',
            component: () => { return import((`@/views/product/FileView.vue`))}
          },
        ]
      },

      {
        path: '/system/system',
        name: '系统管理',
        component: () => { return import((`@/views/system/SystemView.vue`))}
      },
      {
        path: '/system/user',
        name: '用户管理',
        component: () => { return import((`@/views/system/UserView.vue`))}
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
