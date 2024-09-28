import { createMemoryHistory, createRouter } from 'vue-router'

import dashboard from '../components/DashboardUser.vue'
import login from '../components/Login.vue'

const routes = [
  { path: '/', component: login },
  { path: '/dashboard', component: dashboard },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;