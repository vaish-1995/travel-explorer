import { createRouter, createWebHistory } from 'vue-router';

// Import your view components
import HomeView from '../views/Home.vue';
import PackagesView from '../views/Packages.vue';
import AboutView from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/packages',
    name: 'Packages',
    component: PackagesView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
