import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserList from '../views/UserList.vue';
import UserDynamics from '../views/UserDynamics.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';
import UserRegister from '../views/UserRegister.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userlist/',
    name: 'userlist',
    component: UserList
  },
  {
    path: '/dynamics/:userId/',
    name: 'dynamics',
    component: UserDynamics
  },
  {
    path: '/login/',
    name: 'login',
    component: Login
  },
  {
    path: '/notfound/',
    name: 'notfound',
    component: NotFound
  },
  {
    path: '/register/',
    name: 'register',
    component: UserRegister
  },
  {
    path: '/:catchAll(.*)/',
    redirect: '/notfound/',
  }
];
 
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
