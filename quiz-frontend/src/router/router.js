import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../components/HomeView.vue'
import LoginView from '../components/LoginView.vue'
import SignupView from '../components/SignupView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/signup', component: SignupView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router