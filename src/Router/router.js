import { createMemoryHistory, createRouter } from 'vue-router'

import dashboard from '../components/DashboardAdmin.vue'
import dashboardVendor from '../components/DashboardUser.vue'
import login from '../components/Login.vue'

const routes = [
  { path: '/', component: login },
  { path: '/dashboard-admin', component: dashboard },
  { path: '/dashboard-user', component: dashboardVendor },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;