import { createRouter, createWebHistory, RouterView } from 'vue-router'
import AddCountry from '../views/AddCountry.vue'
import EditCountry from '../views/EditCountry.vue'
import CountryDetails from '../views/CountryDetails.vue'
import CountryListPage from '../views/CountryListPage.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Tr from '@/i18n/translation'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/:locale?',
      component: RouterView,
      beforeEnter: Tr.routeMiddleware,
      children: [
        {
          path: '',
          name: 'CountryListPage',
          component: CountryListPage
        },
        {
          path: 'AddCountry',
          name: 'AddCountry',
          component: AddCountry
        },
        {
          path: 'EditCountry/:CountryId',
          name: 'EditCountry',
          component: EditCountry
        },
        {
          path: 'view/:CountryId',
          name: 'CountryDetails',
          component: CountryDetails
        },
        {
          path: ':pathMatch(.*)*',
          name: 'PageNotFound',
          component: PageNotFound
        }
      ]
    }
  ]
})

export default router
