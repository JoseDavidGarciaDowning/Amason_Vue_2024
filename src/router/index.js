import { createRouter, createWebHistory } from 'vue-router'



import SesionView from '../views/LoginViews/SesionView.vue'
import MainLayout from '../components/LayoutComponents/MainLayout.vue'
import MenuView from '../views/LoginViews/MenuView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
      {
        path: '/',
        name: 'sesion',
        component: SesionView
      },
      {
        path: '/Main',
        component: MainLayout,
        children: [
          {
            path: '/Menu',
            name: 'Menu',
            component: MenuView
          }
        ],
        
      },
    
      ]
})

export default router
