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
        path: '/design/home',
        name: '产品设计',
        component: () => { return import((`@/views/design/HomeView.vue`))},
        redirect: '/design/files',
        children: [
          {
            path: '/design/files',
            name: '产品设计档案管理',
            component: () => { return import((`@/views/design/FileView.vue`))}
          },
          {
            path: '/design/hero',
            name: '产品分类管理',
            component: () => { return import((`@/views/design/HeroView.vue`))}
          },
          {
            path: '/design/materials',
            name: '产品物料管理',
            component: () => { return import((`@/views/design/MaterialsView.vue`))}
          },
          {
            path: '/design/input',
            name: '产品档案登记',
            component: () => { return import((`@/views/design/InputView.vue`))}
          },
          {
            path: '/design/file',
            name: '设计档案管理',
            component: () => { return import((`@/views/design/FileView.vue`))}
          },
        ]
      },


      {
        path: '/product/home',
        name: '生产管理',
        component: () => { return import((`@/views/product/HomeView.vue`))},
        redirect: "/product/logistics",
        children: [
          {
            path: '/product/logistics',
            name: '生产计划设计',
            component: () => { return import((`@/views/product/LogisticsView.vue`))}
          },
          {
            path: '/product/planning',
            name: '生产计划管理',
            component: () => { return import((`@/views/product/PlanningView.vue`))}
          }
        ]
      },


      {
        path: '/mission/home',
        name: '我的任务',
        component: () => { return import((`@/views/mission/HomeView.vue`))},
        redirect: '/mission/review',
        children: [
          {
            path: '/mission/review',
            name: '产品档案设计审核',
            component: () => { return import((`@/views/mission/ReviewView.vue`))}
          },
          {
            path: '/mission/product',
            name: '生产计划设计审核',
            component: () => { return import((`@/views/mission/ProductView.vue`))}
          },
          {
            path: '/mission/applyFor',
            name: '入库申请提交',
            component: () => { return import((`@/views/mission/StorageApplyForView.vue`))}
          },
          {
            path: '/mission/examine',
            name: '入库申请审核',
            component: () => { return import((`@/views/mission/StorageExamineView.vue`))}
          }
        ]
      },

      {
        path: '/inventory/home',
        name: '库存管理',
        component: () => { return import((`@/views/inventory/HomeView.vue`))},
        redirect: "/inventory/stock",
        children: [
          {
            path: '/inventory/storage',
            name: '入库申请管理',
            component: () => { return import((`@/views/inventory/StorageView.vue`))}
          },
          {
            path: '/inventory/dispatch',
            name: '出入库调度管理',
            component: () => { return import((`@/views/inventory/DispatchView.vue`))}
          },
          {
            path: '/inventory/stock',
            name: '安全库存配置管理',
            component: () => { return import((`@/views/inventory/SafeStockView.vue`))}
          }
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
